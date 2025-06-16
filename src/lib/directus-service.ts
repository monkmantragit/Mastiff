import { directus, type Blog, type Page } from './directus';
import { readItems } from '@directus/sdk';

export class DirectusService {
  /**
   * Get all published blog posts
   */
  static async getBlogPosts() {
    try {
      const posts = await directus.request(
        readItems('blog', {
          filter: {
            status: { _eq: 'published' }
          },
          sort: ['-published_date'],
          limit: 10,
          fields: [
            'id',
            'title',
            'content',
            'slug',
            'featured_image',
            'published_date',
            'status',
            'excerpt',
            'tags'
          ]
        })
      );
      return posts;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  /**
   * Get a single blog post by slug
   */
  static async getBlogPost(slug: string) {
    try {
      const posts = await directus.request(
        readItems('blog', {
          filter: {
            slug: { _eq: slug },
            status: { _eq: 'published' }
          },
          limit: 1
        })
      );
      return posts[0] || null;
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get all published pages
   */
  static async getPages() {
    try {
      const pages = await directus.request(
        readItems('pages', {
          filter: {
            status: { _eq: 'published' }
          },
          sort: ['title'],
          fields: [
            'id',
            'title',
            'content',
            'slug',
            'status',
            'meta_description',
            'featured_image'
          ]
        })
      );
      return pages;
    } catch (error) {
      console.error('Error fetching pages:', error);
      return [];
    }
  }

  /**
   * Get a single page by slug
   */
  static async getPage(slug: string) {
    try {
      const pages = await directus.request(
        readItems('pages', {
          filter: {
            slug: { _eq: slug },
            status: { _eq: 'published' }
          },
          limit: 1
        })
      );
      return pages[0] || null;
    } catch (error) {
      console.error(`Error fetching page with slug ${slug}:`, error);
      return null;
    }
  }

  /**
   * Search blog posts by title or content
   */
  static async searchBlogPosts(query: string) {
    try {
      const posts = await directus.request(
        readItems('blog', {
          filter: {
            _and: [
              { status: { _eq: 'published' } },
              {
                _or: [
                  { title: { _icontains: query } },
                  { content: { _icontains: query } },
                  { excerpt: { _icontains: query } }
                ]
              }
            ]
          },
          sort: ['-published_date'],
          limit: 20,
          fields: [
            'id',
            'title',
            'content',
            'slug',
            'featured_image',
            'published_date',
            'excerpt',
            'tags'
          ]
        })
      );
      return posts;
    } catch (error) {
      console.error(`Error searching blog posts with query "${query}":`, error);
      return [];
    }
  }

  /**
   * Get blog posts by tag
   */
  static async getBlogPostsByTag(tag: string) {
    try {
      const posts = await directus.request(
        readItems('blog', {
          filter: {
            _and: [
              { status: { _eq: 'published' } },
              // @ts-expect-error - Directus SDK type issue with array filters
              { tags: { _in: [tag] } }
            ]
          },
          sort: ['-published_date'],
          fields: [
            'id',
            'title',
            'content',
            'slug',
            'featured_image',
            'published_date',
            'excerpt',
            'tags'
          ]
        })
      );
      return posts;
    } catch (error) {
      console.error(`Error fetching blog posts with tag "${tag}":`, error);
      return [];
    }
  }
}

// Export types for easy import
export type { Blog, Page }; 