// Shared default data — used by seed.js and api/index.js (reset endpoint)

const FUNCTIONS = [
  { key: 'seo', name: 'SEO', fullTime: 3, partTime: 3, partTimeHours: 20, totalHours: 180 },
  { key: 'paid_media', name: 'Paid Media', fullTime: 8, partTime: 3, partTimeHours: 20, totalHours: 380 },
  { key: 'creative_design', name: 'Creative/Design', fullTime: 3, partTime: 0, partTimeHours: 0, totalHours: 120 },
  { key: 'client_success', name: 'Client Success', fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 },
  { key: 'sales', name: 'Sales', fullTime: 2, partTime: 1, partTimeHours: 20, totalHours: 100 },
  { key: 'brand', name: 'Brand', fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 },
  { key: 'operations', name: 'Operations', fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 },
  { key: 'recruiting', name: 'Recruiting', fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 },
  { key: 'finance', name: 'Finance', fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 },
];

const IMPLEMENTATIONS = [
  // SEO
  { id: 's1', functionKey: 'seo', name: 'AI Content Briefs', complexity: 5, roi: 5000, owner: 'Content Lead', description: 'AI generates comprehensive content briefs with keyword clusters, competitor analysis, and outline suggestions.', impact: 'Brief creation time reduced from 2 hours to 20 minutes', timeSaved: 5, unit: 'hours/week', frequency: 0 },
  { id: 's2', functionKey: 'seo', name: 'Automated Technical Audits', complexity: 7, roi: 8000, owner: 'Technical SEO', description: 'AI-powered crawling and analysis identifies technical issues and prioritizes fixes by impact.', impact: 'Audit time cut by 60%, catches issues humans miss', timeSaved: 8, unit: 'hours/week', frequency: 0 },
  { id: 's3', functionKey: 'seo', name: 'AI-Assisted Content Optimization', complexity: 5, roi: 6000, owner: 'Content Team', description: 'AI analyzes top-ranking content and suggests optimization changes for existing pages.', impact: 'Improved rankings on 40% of optimized pages within 3 months', timeSaved: 20, unit: 'minutes/occurrence', frequency: 10 },
  { id: 's4', functionKey: 'seo', name: 'Schema Markup Generator', complexity: 6, roi: 4000, owner: 'Technical SEO', description: 'AI generates structured data markup based on page content analysis.', impact: 'Rich snippet appearance increased by 50%', timeSaved: 30, unit: 'minutes/occurrence', frequency: 8 },
  { id: 's5', functionKey: 'seo', name: 'Keyword Clustering Engine', complexity: 6, roi: 7000, owner: 'SEO Strategist', description: 'AI clusters thousands of keywords into topical groups and maps to content strategy.', impact: 'Reduced keyword research time by 70%, better content coverage', timeSaved: 4, unit: 'hours/week', frequency: 0 },
  // Paid Media
  { id: 'p1', functionKey: 'paid_media', name: 'Automated Bid Adjustments', complexity: 3, roi: 800, owner: 'PPC Manager', description: 'Using platform AI bidding with custom rules and guardrails for campaign optimization.', impact: 'Improved ROAS by 15% while reducing manual bid management time', timeSaved: 4, unit: 'hours/week', frequency: 0 },
  { id: 'p2', functionKey: 'paid_media', name: 'AI Ad Copy Variations', complexity: 2, roi: 500, owner: 'PPC Copywriter', description: 'AI generates multiple ad copy variations for A/B testing across campaigns.', impact: 'More copy variants tested, found higher-performing combinations faster', timeSaved: 3, unit: 'hours/week', frequency: 0 },
  { id: 'p3', functionKey: 'paid_media', name: 'Automated Reporting Dashboards', complexity: 3, roi: 600, owner: 'Analytics', description: 'AI summarizes campaign performance with natural language insights in weekly reports.', impact: 'Reporting time cut from 4 hours to 1 hour per week per client', timeSaved: 3, unit: 'hours/week', frequency: 0 },
  // Creative/Design
  { id: 'c1', functionKey: 'creative_design', name: 'AI Image Variations', complexity: 2, roi: 400, owner: 'Design Lead', description: 'Using AI tools to generate image variations and mockups for ad creative testing.', impact: 'Faster iteration on ad creatives, more variants tested per campaign', timeSaved: 3, unit: 'hours/week', frequency: 0 },
  // Sales
  { id: 'sl1', functionKey: 'sales', name: 'AI-Powered Lead Scoring', complexity: 9, roi: 25000, owner: 'Sales Ops', description: 'ML model scores inbound leads based on firmographics, behavior, and intent signals. Replaces manual qualification.', impact: 'Reduced lead qualification time by 80%, improved conversion rate by 35%', timeSaved: 8, unit: 'hours/week', frequency: 0 },
  { id: 'sl2', functionKey: 'sales', name: 'Automated Outreach Sequences', complexity: 5, roi: 8000, owner: 'SDR Team', description: 'AI generates personalized email sequences based on prospect data and engagement patterns.', impact: 'Doubled reply rates, reduced sequence creation from 2hr to 15min', timeSaved: 5, unit: 'hours/week', frequency: 0 },
  { id: 'sl3', functionKey: 'sales', name: 'Call Summary & CRM Logging', complexity: 4, roi: 5000, owner: 'AE Team', description: 'AI transcribes sales calls and auto-generates summaries, action items, and CRM updates.', impact: 'Saves 30 min per call in admin work, improved CRM data quality', timeSaved: 30, unit: 'minutes/occurrence', frequency: 15 },
  { id: 'sl4', functionKey: 'sales', name: 'Competitive Intelligence Alerts', complexity: 6, roi: 3000, owner: 'Sales Ops', description: 'AI monitors competitor activity and surfaces relevant insights before prospect meetings.', impact: 'Better win rates in competitive deals, reps feel more prepared', timeSaved: 2, unit: 'hours/week', frequency: 0 },
  { id: 'sl5', functionKey: 'sales', name: 'Proposal Template Generation', complexity: 3, roi: 2000, owner: 'AE Team', description: 'AI pre-fills proposal templates with prospect data pulled from CRM and meeting notes.', impact: 'Cuts proposal creation time in half', timeSaved: 45, unit: 'minutes/occurrence', frequency: 4 },
];

module.exports = { FUNCTIONS, IMPLEMENTATIONS };
