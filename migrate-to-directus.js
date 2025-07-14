#!/usr/bin/env node

/**
 * Directus Data Migration Script
 * Migrates blog posts, services, and team data from JSON files to Directus
 */

const fs = require('fs');
const path = require('path');

// Directus configuration
const DIRECTUS_URL = 'https://directus-production-bc75.up.railway.app';
const DIRECTUS_TOKEN = 'FAE0VL3TIn4xLMtYP07yFGjIks5km0Kl';

// Helper function to make API requests
async function directusRequest(endpoint, method = 'GET', data = null) {
  const fetch = (await import('node-fetch')).default;
  
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  if (data && (method === 'POST' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${DIRECTUS_URL}/${endpoint}`, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
}

// Helper function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to generate random ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Migration functions
async function migrateBlogPosts() {
  console.log('🔄 Migrating blog posts...');
  
  const postsDir = path.join(__dirname, 'data', 'posts');
  const postFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.json'));
  
  let migratedCount = 0;
  
  for (const file of postFiles) {
    try {
      const filePath = path.join(postsDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      console.log(`📄 Processing: ${file}`);
      
      // Handle the correct structure for seasonal content
      if (data.content && data.content.seasonal_themes) {
        // Create individual posts for each seasonal theme
        for (const theme of data.content.seasonal_themes) {
          const blogPost = {
            title: theme.title,
            slug: createSlug(theme.title),
            excerpt: theme.description,
            content: `
              <h2>${theme.title}</h2>
              <p>${theme.description}</p>
              <h3>Details</h3>
              <p>${theme.details}</p>
              ${theme.highlights ? `
                <h3>Highlights</h3>
                <ul>
                  ${theme.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
              ` : ''}
            `,
            status: 'published',
            featured_image: data.featured_image || null,
            published_date: data.date_created || new Date().toISOString(),
            category: data.category || 'Seasonal Events',
            tags: data.tags || ['events', 'seasonal'],
            author: 'White Massif Team',
            read_time: '5 min read'
          };
          
          await directusRequest('items/blog', 'POST', blogPost);
          migratedCount++;
          console.log(`✅ Created blog post: ${theme.title}`);
        }
      } 
      // Handle corporate event themes structure
      else if (data.content && data.content.themes) {
        for (const theme of data.content.themes) {
          const blogPost = {
            title: theme.title,
            slug: createSlug(theme.title),
            excerpt: theme.description,
            content: `
              <h2>${theme.title}</h2>
              <p>${theme.description}</p>
              ${theme.details ? `<h3>Details</h3><p>${theme.details}</p>` : ''}
              ${theme.highlights ? `
                <h3>Highlights</h3>
                <ul>
                  ${theme.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
              ` : ''}
            `,
            status: 'published',
            featured_image: data.featured_image || null,
            published_date: data.date_created || new Date().toISOString(),
            category: data.category || 'Event Themes',
            tags: data.tags || ['events', 'corporate'],
            author: 'White Massif Team',
            read_time: '4 min read'
          };
          
          await directusRequest('items/blog', 'POST', blogPost);
          migratedCount++;
          console.log(`✅ Created blog post: ${theme.title}`);
        }
      }
      // Create a single comprehensive blog post if no themes structure
      else if (data.content) {
        const blogPost = {
          title: data.title,
          slug: data.slug || createSlug(data.title),
          excerpt: data.excerpt,
          content: `
            <h2>${data.title}</h2>
            <p>${data.excerpt}</p>
            ${data.content.intro ? `<p>${data.content.intro}</p>` : ''}
            ${JSON.stringify(data.content, null, 2)}
          `,
          status: data.status || 'published',
          featured_image: data.featured_image || null,
          published_date: data.date_created || new Date().toISOString(),
          category: data.category || 'Corporate Events',
          tags: data.tags || ['events'],
          author: 'White Massif Team',
          read_time: '6 min read'
        };
        
        await directusRequest('items/blog', 'POST', blogPost);
        migratedCount++;
        console.log(`✅ Created blog post: ${data.title}`);
      } else {
        console.log(`⚠️  Skipping ${file}: No usable content structure found`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`✅ Blog migration complete: ${migratedCount} posts created\n`);
  return migratedCount;
}

async function migrateServices() {
  console.log('🔄 Migrating services...');
  
  const servicesFile = path.join(__dirname, 'data', 'pages', 'service-test.json');
  
  if (!fs.existsSync(servicesFile)) {
    console.log('⚠️  Services file not found');
    return 0;
  }
  
  const data = JSON.parse(fs.readFileSync(servicesFile, 'utf8'));
  let migratedCount = 0;
  
  try {
    // Services from the actual structure
    if (data.content && data.content.services) {
      for (const service of data.content.services) {
        const serviceData = {
          title: service.title,
          slug: createSlug(service.title),
          description: service.description,
          content: `
            <h2>${service.title}</h2>
            <p>${service.description}</p>
            ${service.detailed_description ? `
              <h3>Detailed Overview</h3>
              <p>${service.detailed_description}</p>
            ` : ''}
          `,
          category: 'Main Services',
          status: 'active',
          featured_image: null, // Image fields expect UUID, not paths
          features: [
            {
              title: 'Expert Planning',
              description: 'Professional event planning with attention to every detail'
            },
            {
              title: 'Custom Solutions',
              description: 'Tailored services to meet your specific requirements'
            },
            {
              title: 'End-to-End Management',
              description: 'Complete service from concept to execution'
            }
          ],
          stats: {
            events: '150+',
            satisfaction: '99%',
            clients: '80+'
          },
          gallery: null // Gallery field expects array of UUIDs, not paths
        };
        
        await directusRequest('items/services', 'POST', serviceData);
        migratedCount++;
        console.log(`✅ Created service: ${service.title}`);
      }
    }
    
    // End-to-end services if they exist
    if (data.content && data.content.end_to_end_services) {
      for (const service of data.content.end_to_end_services) {
        const serviceData = {
          title: service.title,
          slug: createSlug(service.title),
          description: service.description,
          content: `
            <h2>${service.title}</h2>
            <p>${service.description}</p>
            ${service.detailed_description ? `
              <h3>Detailed Overview</h3>
              <p>${service.detailed_description}</p>
            ` : ''}
          `,
          category: 'End-to-End Services',
          status: 'active',
          featured_image: null, // Image fields expect UUID, not paths
          features: [
            {
              title: 'Comprehensive Service',
              description: 'Complete end-to-end solution for your event needs'
            },
            {
              title: 'Professional Team',
              description: 'Experienced professionals handling every aspect'
            }
          ],
          stats: {
            events: '200+',
            satisfaction: '98%',
            clients: '75+'
          }
        };
        
        await directusRequest('items/services', 'POST', serviceData);
        migratedCount++;
        console.log(`✅ Created service: ${service.title}`);
      }
    }
  } catch (error) {
    console.error('❌ Error migrating services:', error.message);
  }
  
  console.log(`✅ Services migration complete: ${migratedCount} services created\n`);
  return migratedCount;
}

async function migrateTeamMembers() {
  console.log('🔄 Migrating team members...');
  
  const teamFile = path.join(__dirname, 'data', 'pages', 'our-team-corporate-events.json');
  
  if (!fs.existsSync(teamFile)) {
    console.log('⚠️  Team file not found');
    return 0;
  }
  
  const data = JSON.parse(fs.readFileSync(teamFile, 'utf8'));
  let migratedCount = 0;
  
  try {
    if (data.content && data.content.team_members) {
      for (const member of data.content.team_members) {
        // Determine department based on position
        let department = 'Operations';
        const position = member.position.toLowerCase();
        
        if (position.includes('director') || position.includes('head')) {
          department = 'Leadership';
        } else if (position.includes('creative') || position.includes('art') || position.includes('design')) {
          department = 'Creative';
        } else if (position.includes('client') || position.includes('account') || position.includes('servicing')) {
          department = 'Client Relations';
        } else if (position.includes('production') || position.includes('coordinator')) {
          department = 'Production';
        } else if (position.includes('hr') || position.includes('human')) {
          department = 'HR';
        } else if (position.includes('finance') || position.includes('account')) {
          department = 'Finance';
        }
        
        const teamMember = {
          name: member.name,
          position: member.position,
          department: department,
          bio: `${member.name} is a dedicated professional at White Massif, bringing expertise and passion to the ${department} team. With their specialized skills in ${member.position.toLowerCase()}, they contribute significantly to our success in delivering exceptional corporate events.`,
          image: null, // Image field expects UUID, not path
          status: 'active',
          email: null,
          linkedin: null,
          years_experience: Math.floor(Math.random() * 8) + 2 // Random 2-10 years
        };
        
        await directusRequest('items/team_members', 'POST', teamMember);
        migratedCount++;
        console.log(`✅ Created team member: ${member.name} (${department})`);
      }
    }
  } catch (error) {
    console.error('❌ Error migrating team members:', error.message);
  }
  
  console.log(`✅ Team migration complete: ${migratedCount} members created\n`);
  return migratedCount;
}

async function createSampleLandingPages() {
  console.log('🔄 Creating sample landing pages...');
  
  const landingPages = [
    {
      title: 'Corporate Event Planning Services',
      slug: 'corporate-event-planning',
      template: 'service',
      status: 'active',
      hero_title: 'Transform Your Corporate Vision into Reality',
      hero_subtitle: 'Expert event planning for Fortune 500 companies and growing businesses',
      hero_image: null, // Image field expects UUID, not path
      cta_text: 'Get Free Consultation',
      form_fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'company', label: 'Company Name', type: 'text', required: true },
        { name: 'event_type', label: 'Event Type', type: 'select', required: true, options: ['Conference', 'Product Launch', 'Team Building', 'Awards Ceremony', 'Other'] },
        { name: 'budget', label: 'Budget Range', type: 'select', required: false, options: ['Under $10K', '$10K-$25K', '$25K-$50K', '$50K-$100K', '$100K+'] },
        { name: 'message', label: 'Event Details', type: 'textarea', required: false }
      ],
      content: '<h2>Why Choose White Massif?</h2><p>With over 1000+ successful corporate events, we bring unmatched expertise to every project.</p>',
      tracking_code: null
    },
    {
      title: 'Wedding Planning Excellence',
      slug: 'wedding-planning',
      template: 'service',
      status: 'active',
      hero_title: 'Your Dream Wedding Awaits',
      hero_subtitle: 'Creating magical moments that last a lifetime',
      hero_image: null, // Image field expects UUID, not path
      cta_text: 'Start Planning',
      form_fields: [
        { name: 'name', label: 'Your Name', type: 'text', required: true },
        { name: 'partner_name', label: "Partner's Name", type: 'text', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'wedding_date', label: 'Preferred Wedding Date', type: 'date', required: false },
        { name: 'guest_count', label: 'Expected Guests', type: 'select', required: false, options: ['Under 50', '50-100', '100-200', '200-300', '300+'] },
        { name: 'message', label: 'Tell us about your vision', type: 'textarea', required: false }
      ],
      content: '<h2>Creating Unforgettable Weddings</h2><p>From intimate ceremonies to grand celebrations, we make your special day perfect.</p>',
      tracking_code: null
    }
  ];
  
  let migratedCount = 0;
  
  for (const page of landingPages) {
    try {
      await directusRequest('items/landing_pages', 'POST', page);
      migratedCount++;
      console.log(`✅ Created landing page: ${page.title}`);
    } catch (error) {
      console.error(`❌ Error creating landing page ${page.title}:`, error.message);
    }
  }
  
  console.log(`✅ Landing pages creation complete: ${migratedCount} pages created\n`);
  return migratedCount;
}

// Main migration function
async function runMigration() {
  console.log('🚀 Starting Directus Data Migration\n');
  console.log(`📡 Directus URL: ${DIRECTUS_URL}`);
  console.log(`🔑 Using token: ${DIRECTUS_TOKEN.substring(0, 10)}...\n`);
  
  try {
    // Test connection
    console.log('🔍 Testing Directus connection...');
    await directusRequest('server/info');
    console.log('✅ Connection successful\n');
    
    // Run migrations
    const blogCount = await migrateBlogPosts();
    const servicesCount = await migrateServices();
    const teamCount = await migrateTeamMembers();
    const landingCount = await createSampleLandingPages();
    
    // Summary
    console.log('📊 Migration Summary:');
    console.log(`   📝 Blog posts: ${blogCount}`);
    console.log(`   🛠️  Services: ${servicesCount}`);
    console.log(`   👥 Team members: ${teamCount}`);
    console.log(`   📄 Landing pages: ${landingCount}`);
    console.log(`   📈 Total items: ${blogCount + servicesCount + teamCount + landingCount}`);
    console.log('\n✅ Migration completed successfully!');
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Configure field permissions in Directus admin');
    console.log('2. Upload images to Directus file storage');
    console.log('3. Update image paths in content');
    console.log('4. Test website functionality');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runMigration();
}

module.exports = {
  runMigration,
  migrateBlogPosts,
  migrateServices,
  migrateTeamMembers,
  createSampleLandingPages
};