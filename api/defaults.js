// Shared default data — used by seed.js and api/index.js (reset endpoint)

const FUNCTIONS = [
  { key: 'seo', name: 'SEO', fullTime: 3, partTime: 3, partTimeHours: 20, totalHours: 180 },
  { key: 'paid_media', name: 'Paid Media', fullTime: 8, partTime: 3, partTimeHours: 20, totalHours: 380 },
  { key: 'creative_design', name: 'Creative/Design', fullTime: 3, partTime: 0, partTimeHours: 0, totalHours: 120 },
  { key: 'client_success', name: 'Client Success', fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 },
  { key: 'sales', name: 'Sales', fullTime: 2, partTime: 1, partTimeHours: 20, totalHours: 100 },
  { key: 'brand', name: 'Brand and Marketing', fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 },
  { key: 'operations', name: 'Operations', fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 },
  { key: 'recruiting', name: 'Recruiting', fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 },
  { key: 'finance', name: 'Finance', fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 },
];

// Maturity rubric descriptions per function per tier (from AI Fluency Table – Final Version)
const RUBRICS = {
  seo: {
    unacceptable: 'No AI tools in SEO workflow. All keyword research, content optimization, and technical audits performed manually.',
    capable: 'AI assists with keyword research and basic content briefs. Manual review still required for all outputs. Using AI for initial drafts only.',
    adaptive: 'AI-driven content optimization pipeline with automated technical audits. AI clusters keywords, generates briefs, and suggests schema markup with human oversight.',
    transformative: 'Fully autonomous SEO engine — AI handles research, content creation, technical audits, and performance monitoring. Humans focus on strategy and exception handling.',
  },
  paid_media: {
    unacceptable: 'No AI-driven optimization. Manual bid management, ad copy creation, and reporting across all campaigns.',
    capable: 'Using platform-native AI bidding (e.g., Target CPA/ROAS). AI generates ad copy drafts for human review. Basic automated reporting.',
    adaptive: 'AI manages bid strategies with custom rules and guardrails. Automated ad copy testing at scale. AI-generated performance insights surface optimization opportunities.',
    transformative: 'AI autonomously optimizes campaigns end-to-end — bidding, creative rotation, budget allocation, and audience targeting. Humans set strategy and constraints only.',
  },
  creative_design: {
    unacceptable: 'No AI in creative workflow. All design, copy, and asset production done manually from scratch.',
    capable: 'AI used for generating image variations and basic mockups. Designers use AI for initial concepts and iteration starting points.',
    adaptive: 'AI integrated into production pipeline — generates ad variations at scale, handles resizing/formatting, and suggests design improvements based on performance data.',
    transformative: 'AI-native creative factory — autonomous generation of on-brand assets, performance-driven creative optimization, and dynamic personalization at scale.',
  },
  client_success: {
    unacceptable: 'No AI in client management. All reporting, communication, and analysis done manually.',
    capable: 'AI assists with report generation and meeting prep. Auto-summarizes call notes and creates action items for human review.',
    adaptive: 'AI-powered client health scoring and proactive alerting. Automated performance narratives and recommendation generation. AI drafts client communications.',
    transformative: 'AI autonomously monitors client health, generates strategic recommendations, and manages routine communications. CSMs focus on relationship strategy and escalation.',
  },
  sales: {
    unacceptable: 'No AI in sales process. Manual lead qualification, outreach, proposal creation, and CRM management.',
    capable: 'AI assists with lead scoring, email drafts, and call transcription. Manual review required for all prospect-facing outputs.',
    adaptive: 'AI-driven pipeline management with automated outreach sequences, intelligent lead routing, and AI-generated proposals. Competitive intelligence automated.',
    transformative: 'AI autonomously manages top-of-funnel — scoring, outreach, scheduling, and qualification. Sales reps focus on high-value conversations and closing.',
  },
  brand: {
    unacceptable: 'No AI in brand or content marketing. All strategy, content creation, and distribution managed manually.',
    capable: 'AI assists with content drafting and social media post generation. Brand guidelines manually enforced on AI outputs.',
    adaptive: 'AI generates content across channels with brand voice consistency. Automated content calendar management and performance-driven distribution.',
    transformative: 'AI-native brand engine — autonomous multi-channel content creation, real-time brand sentiment monitoring, and dynamic messaging optimization.',
  },
  operations: {
    unacceptable: 'No AI in operations. All processes, workflows, and resource allocation managed manually.',
    capable: 'AI assists with documentation, process mapping, and basic workflow automation. Used for meeting summaries and task tracking.',
    adaptive: 'AI-powered project management with automated resource allocation, capacity planning, and workflow optimization. Predictive bottleneck detection.',
    transformative: 'AI autonomously manages operational workflows — resource allocation, process optimization, and cross-team coordination. Humans handle exceptions and strategy.',
  },
  recruiting: {
    unacceptable: 'No AI in recruiting. All sourcing, screening, scheduling, and candidate communication done manually.',
    capable: 'AI assists with job description writing, resume screening, and initial candidate outreach drafts. Human review at every stage.',
    adaptive: 'AI-powered candidate pipeline with automated screening, intelligent matching, and AI-driven interview scheduling. Predictive candidate fit scoring.',
    transformative: 'AI autonomously manages the recruiting funnel — sourcing, screening, scheduling, and initial engagement. Recruiters focus on final interviews and closing.',
  },
  finance: {
    unacceptable: 'No AI in financial operations. All forecasting, reporting, invoicing, and analysis done manually.',
    capable: 'AI assists with data entry, basic forecasting, and report generation. Used for automating repetitive calculations.',
    adaptive: 'AI-driven financial forecasting with anomaly detection. Automated invoice processing and expense categorization. Predictive budget modeling.',
    transformative: 'AI autonomously manages financial operations — real-time forecasting, automated reconciliation, and strategic financial modeling. CFO focuses on strategy.',
  },
};

// Primary metrics per function (from the PDF Primary Metrics Layer)
const PRIMARY_METRICS = {
  seo: 'Organic revenue per SEO team member',
  paid_media: 'Revenue per media dollar managed per person',
  creative_design: 'Creative assets produced per designer per week',
  client_success: 'Revenue retained per CSM',
  sales: 'Revenue closed per sales rep',
  brand: 'Brand content output per marketer',
  operations: 'Tasks completed per ops team member',
  recruiting: 'Hires per recruiter per quarter',
  finance: 'Transactions processed per finance team member',
};

// Efficiency metrics per function (from the PDF)
const EFFICIENCY_METRICS = {
  seo: 'Hours saved per keyword cluster processed',
  paid_media: 'Hours saved per campaign managed',
  creative_design: 'Hours saved per asset produced',
  client_success: 'Hours saved per client managed',
  sales: 'Hours saved per deal progressed',
  brand: 'Hours saved per content piece published',
  operations: 'Hours saved per process automated',
  recruiting: 'Hours saved per candidate processed',
  finance: 'Hours saved per transaction processed',
};

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

module.exports = { FUNCTIONS, IMPLEMENTATIONS, RUBRICS, PRIMARY_METRICS, EFFICIENCY_METRICS };
