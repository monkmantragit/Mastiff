'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ArrowRight,
  Share2,
  BookOpen,
  Tag
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DirectusService, type Blog } from '@/lib/directus-service';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const fetchedPost = await DirectusService.getBlogPost(resolvedParams.slug);
      setPost(fetchedPost);

      if (fetchedPost) {
        // Fetch related posts based on tags or category
        const related = await DirectusService.getBlogPosts();
        setRelatedPosts(related.filter(p => p.id !== fetchedPost.id).slice(0, 3));
      }
      setLoading(false);
    };

    fetchPost();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#F9A625] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-[#2A3959] mb-4">Post Not Found</h1>
          <Link href="/blog">
            <Button className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Breadcrumbs */}
      <section className="container mx-auto px-4 pt-24 pb-4">
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 text-sm text-neutral-600"
        >
          <Link href="/" className="hover:text-[#F9A625] transition-colors">
            Home
          </Link>
          <span className="text-neutral-400">/</span>
          <Link href="/blog" className="hover:text-[#F9A625] transition-colors">
            Blog
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-[#2A3959] font-medium truncate max-w-xs">
            {post.title}
          </span>
        </motion.nav>
      </section>

      {/* Article Header */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
            {/* Article Header */}
            <div className="text-center mb-12">
              {post.category && (
                <Badge className="mb-6 bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/30 px-4 py-2">
                  {post.category}
                </Badge>
              )}
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-[#2A3959] mb-6 leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500 mb-8">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>By {post.author}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.published_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                {post.read_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.read_time}</span>
                  </div>
                )}
              </div>

              {/* Featured Image */}
              {post.featured_image && (
                <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}
            </div>

        </motion.div>
      </section>

      {/* Article Content */}
      <section className="container mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="font-body text-neutral-700 leading-relaxed text-lg">
                {post.content ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="prose-headings:text-[#2A3959] prose-headings:font-display prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:mb-4 prose-li:mb-2"
                  />
                ) : post.excerpt ? (
                  <p className="text-xl leading-relaxed mb-8 text-neutral-800">
                    {post.excerpt}
                  </p>
                ) : (
                  <p className="text-neutral-600 bg-neutral-50 p-6 rounded-lg border-l-4 border-[#F9A625]">
                    <strong>Note:</strong> Content is being loaded...
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tags and Share */}
      <section className="container mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 md:p-12">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="flex items-center text-sm text-neutral-500 mr-4">
                  <Tag className="w-4 h-4 mr-2" />
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="border-[#F9A625]/30 text-[#F9A625]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <div className="border-t border-neutral-200 pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-neutral-500">Share this article:</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-[#F9A625]/30 text-[#F9A625] hover:bg-[#F9A625] hover:text-black"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <BookOpen className="w-4 h-4" />
                  <span>White Massif Insights</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-4 py-20 border-t border-neutral-200">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-[#2A3959] text-center mb-12">
              Related Insights
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="glass rounded-2xl hover:shadow-xl transition-all duration-500 group cursor-pointer">
                  <Link href={`/blog/${relatedPost.slug || relatedPost.id}`}>
                    <div className="aspect-video overflow-hidden rounded-t-2xl relative">
                      {relatedPost.featured_image ? (
                        <Image
                          src={relatedPost.featured_image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#F9A625]/20 to-[#2A3959]/20 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-[#2A3959]" />
                        </div>
                      )}
                      {relatedPost.category && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-black/50 text-white border-0 text-xs">
                            {relatedPost.category}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-heading text-lg text-[#2A3959] mb-3 group-hover:text-[#F9A625] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      {relatedPost.excerpt && (
                        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(relatedPost.published_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        
                        <ArrowRight className="w-4 h-4 text-[#F9A625] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-[#2A3959] via-[#1a2332] to-[#2A3959] text-white border-0 rounded-3xl">
            <CardContent className="p-12 text-center">
              <h3 className="text-4xl md:text-5xl font-display mb-6 leading-tight">
                Ready to Create Your <span className="text-[#F9A625]">Masterpiece?</span>
              </h3>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Don&apos;t just read about exceptional events. Create them. Let our insights inspire your next vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-semibold px-8 py-4 rounded-full text-lg">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Link href="/blog">
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-[#2A3959] px-8 py-4 rounded-full text-lg"
                  >
                    More Insights
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}