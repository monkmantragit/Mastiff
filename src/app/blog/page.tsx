'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DirectusService, type Blog } from '@/lib/directus-service';

export default function BlogPage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        console.log('🔍 Fetching blog posts from Directus...');
        const fetchedPosts = await DirectusService.getBlogPosts();
        console.log('📊 Fetched posts:', fetchedPosts);
        console.log('📝 Number of posts:', fetchedPosts?.length || 0);
        setPosts(fetchedPosts || []);
      } catch (error) {
        console.error('❌ Error fetching blog posts:', error);
        setPosts([]);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category).filter((cat): cat is string => Boolean(cat))))];
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#F9A625] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Header */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full mb-8">
            <BookOpen className="w-5 h-5 text-[#F9A625]" />
            <span className="text-sm font-medium tracking-wide text-[#F9A625]">Insights & Vision</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-8 text-[#2A3959]">
            Where Ideas
            <br />
            <span className="text-[#F9A625]">Achieve Excellence</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 font-body max-w-4xl mx-auto text-neutral-600 leading-relaxed">
            Behind every exceptional event lies a revolutionary idea. Explore the insights, strategies, and visionary thinking 
            that transform ordinary occasions into extraordinary legacies.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category 
                    ? "bg-[#F9A625] text-black" 
                    : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 pb-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-2xl font-display text-neutral-600 mb-2">No posts found</h3>
            <p className="text-neutral-500">Check back later for new insights and articles.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full glass rounded-3xl hover:shadow-xl transition-all duration-500 group cursor-pointer border-neutral-200">
                  <Link href={`/blog/${post.slug || post.id}`}>
                    <div className="aspect-video overflow-hidden rounded-t-3xl relative">
                      {post.featured_image ? (
                        <Image
                          src={post.featured_image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#F9A625]/20 to-[#2A3959]/20 flex items-center justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#F9A625] to-[#2A3959] rounded-2xl flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      )}
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-black/50 text-white border-0 text-xs">
                            {post.category}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardHeader className="p-6">
                      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                        {post.read_time && (
                          <>
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4" />
                            {post.read_time}
                          </>
                        )}
                      </div>
                      
                      <CardTitle className="text-xl font-heading mb-4 text-[#2A3959] group-hover:text-[#F9A625] transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      
                      {post.excerpt && (
                        <CardDescription className="text-neutral-600 font-body leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </CardDescription>
                      )}
                      
                      {post.author && (
                        <div className="text-sm text-[#F9A625] font-medium">
                          By {post.author}
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent className="px-6 pb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags && post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} className="bg-[#F9A625]/10 border-[#F9A625]/30 text-[#F9A625] text-xs px-2 py-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <ArrowRight className="w-4 h-4 text-[#F9A625] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More - Future Enhancement */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black px-8 py-4 rounded-full">
              <span>Explore More Insights</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </section>

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
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-8">
                <BookOpen className="w-5 h-5 text-[#F9A625]" />
                <span className="text-sm font-medium tracking-wide">Need Event Help?</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-display mb-6 leading-tight">
                Get Professional Event <span className="text-[#F9A625]">Planning</span>
              </h3>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-body">
                Get a free consultation and see how we can handle your corporate event from start to finish.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-semibold px-8 py-4 rounded-full text-lg">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-[#2A3959] px-8 py-4 rounded-full text-lg"
                >
                  View Our Work
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}