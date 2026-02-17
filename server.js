const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========================
// DATA PERSISTENCE
// ========================
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Error loading data file:', e.message);
  }
  return getDefaultData();
}

function saveDataToFile(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function getDefaultData() {
  return {
    functionData: {
      seo: {
        name: 'SEO',
        teamConfig: { fullTime: 3, partTime: 3, partTimeHours: 20, totalHours: 180 },
        implementations: [
          { id: 's1', name: 'AI Content Briefs', complexity: 5, roi: 5000, owner: 'Content Lead', description: 'AI generates comprehensive content briefs with keyword clusters, competitor analysis, and outline suggestions.', impact: 'Brief creation time reduced from 2 hours to 20 minutes', timeSaved: 5, unit: 'hours/week', frequency: 0 },
          { id: 's2', name: 'Automated Technical Audits', complexity: 7, roi: 8000, owner: 'Technical SEO', description: 'AI-powered crawling and analysis identifies technical issues and prioritizes fixes by impact.', impact: 'Audit time cut by 60%, catches issues humans miss', timeSaved: 8, unit: 'hours/week', frequency: 0 },
          { id: 's3', name: 'AI-Assisted Content Optimization', complexity: 5, roi: 6000, owner: 'Content Team', description: 'AI analyzes top-ranking content and suggests optimization changes for existing pages.', impact: 'Improved rankings on 40% of optimized pages within 3 months', timeSaved: 20, unit: 'minutes/occurrence', frequency: 10 },
          { id: 's4', name: 'Schema Markup Generator', complexity: 6, roi: 4000, owner: 'Technical SEO', description: 'AI generates structured data markup based on page content analysis.', impact: 'Rich snippet appearance increased by 50%', timeSaved: 30, unit: 'minutes/occurrence', frequency: 8 },
          { id: 's5', name: 'Keyword Clustering Engine', complexity: 6, roi: 7000, owner: 'SEO Strategist', description: 'AI clusters thousands of keywords into topical groups and maps to content strategy.', impact: 'Reduced keyword research time by 70%, better content coverage', timeSaved: 4, unit: 'hours/week', frequency: 0 }
        ],
        metrics: { primary: '', primaryLevel: '' }
      },
      paid_media: {
        name: 'Paid Media',
        teamConfig: { fullTime: 8, partTime: 3, partTimeHours: 20, totalHours: 380 },
        implementations: [
          { id: 'p1', name: 'Automated Bid Adjustments', complexity: 3, roi: 800, owner: 'PPC Manager', description: 'Using platform AI bidding with custom rules and guardrails for campaign optimization.', impact: 'Improved ROAS by 15% while reducing manual bid management time', timeSaved: 4, unit: 'hours/week', frequency: 0 },
          { id: 'p2', name: 'AI Ad Copy Variations', complexity: 2, roi: 500, owner: 'PPC Copywriter', description: 'AI generates multiple ad copy variations for A/B testing across campaigns.', impact: 'More copy variants tested, found higher-performing combinations faster', timeSaved: 3, unit: 'hours/week', frequency: 0 },
          { id: 'p3', name: 'Automated Reporting Dashboards', complexity: 3, roi: 600, owner: 'Analytics', description: 'AI summarizes campaign performance with natural language insights in weekly reports.', impact: 'Reporting time cut from 4 hours to 1 hour per week per client', timeSaved: 3, unit: 'hours/week', frequency: 0 }
        ],
        metrics: { primary: '', primaryLevel: '' }
      },
      creative_design: {
        name: 'Creative/Design',
        teamConfig: { fullTime: 3, partTime: 0, partTimeHours: 0, totalHours: 120 },
        implementations: [
          { id: 'c1', name: 'AI Image Variations', complexity: 2, roi: 400, owner: 'Design Lead', description: 'Using AI tools to generate image variations and mockups for ad creative testing.', impact: 'Faster iteration on ad creatives, more variants tested per campaign', timeSaved: 3, unit: 'hours/week', frequency: 0 }
        ],
        metrics: { primary: '', primaryLevel: '' }
      },
      client_success: { name: 'Client Success', teamConfig: { fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 }, implementations: [], metrics: { primary: '', primaryLevel: '' } },
      sales: {
        name: 'Sales',
        teamConfig: { fullTime: 2, partTime: 1, partTimeHours: 20, totalHours: 100 },
        implementations: [
          { id: 'sl1', name: 'AI-Powered Lead Scoring', complexity: 9, roi: 25000, owner: 'Sales Ops', description: 'ML model scores inbound leads based on firmographics, behavior, and intent signals. Replaces manual qualification.', impact: 'Reduced lead qualification time by 80%, improved conversion rate by 35%', timeSaved: 8, unit: 'hours/week', frequency: 0 },
          { id: 'sl2', name: 'Automated Outreach Sequences', complexity: 5, roi: 8000, owner: 'SDR Team', description: 'AI generates personalized email sequences based on prospect data and engagement patterns.', impact: 'Doubled reply rates, reduced sequence creation from 2hr to 15min', timeSaved: 5, unit: 'hours/week', frequency: 0 },
          { id: 'sl3', name: 'Call Summary & CRM Logging', complexity: 4, roi: 5000, owner: 'AE Team', description: 'AI transcribes sales calls and auto-generates summaries, action items, and CRM updates.', impact: 'Saves 30 min per call in admin work, improved CRM data quality', timeSaved: 30, unit: 'minutes/occurrence', frequency: 15 },
          { id: 'sl4', name: 'Competitive Intelligence Alerts', complexity: 6, roi: 3000, owner: 'Sales Ops', description: 'AI monitors competitor activity and surfaces relevant insights before prospect meetings.', impact: 'Better win rates in competitive deals, reps feel more prepared', timeSaved: 2, unit: 'hours/week', frequency: 0 },
          { id: 'sl5', name: 'Proposal Template Generation', complexity: 3, roi: 2000, owner: 'AE Team', description: 'AI pre-fills proposal templates with prospect data pulled from CRM and meeting notes.', impact: 'Cuts proposal creation time in half', timeSaved: 45, unit: 'minutes/occurrence', frequency: 4 }
        ],
        metrics: { primary: '', primaryLevel: '' }
      },
      brand: { name: 'Brand and Marketing', teamConfig: { fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 }, implementations: [], metrics: { primary: '', primaryLevel: '' } },
      operations: { name: 'Operations', teamConfig: { fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 }, implementations: [], metrics: { primary: '', primaryLevel: '' } },
      recruiting: { name: 'Recruiting', teamConfig: { fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 }, implementations: [], metrics: { primary: '', primaryLevel: '' } },
      finance: { name: 'Finance', teamConfig: { fullTime: 0, partTime: 0, partTimeHours: 0, totalHours: 0 }, implementations: [], metrics: { primary: '', primaryLevel: '' } }
    }
  };
}

let appData = loadData();

// ========================
// API ROUTES
// ========================

// Get all function data
app.get('/api/functions', (req, res) => {
  res.json(appData.functionData);
});

// Get single function
app.get('/api/functions/:key', (req, res) => {
  const fd = appData.functionData[req.params.key];
  if (!fd) return res.status(404).json({ error: 'Function not found' });
  res.json(fd);
});

// Update team config
app.put('/api/functions/:key/team', (req, res) => {
  const fd = appData.functionData[req.params.key];
  if (!fd) return res.status(404).json({ error: 'Function not found' });
  fd.teamConfig = { ...fd.teamConfig, ...req.body };
  saveDataToFile(appData);
  res.json(fd);
});

// Update primary metric
app.put('/api/functions/:key/metrics', (req, res) => {
  const fd = appData.functionData[req.params.key];
  if (!fd) return res.status(404).json({ error: 'Function not found' });
  fd.metrics = { ...fd.metrics, ...req.body };
  saveDataToFile(appData);
  res.json(fd);
});

// Add implementation
app.post('/api/functions/:key/implementations', (req, res) => {
  const fd = appData.functionData[req.params.key];
  if (!fd) return res.status(404).json({ error: 'Function not found' });
  const impl = { id: uid(), ...req.body };
  fd.implementations.push(impl);
  saveDataToFile(appData);
  res.status(201).json(impl);
});

// Update implementation level
app.put('/api/functions/:key/implementations/:implId', (req, res) => {
  const fd = appData.functionData[req.params.key];
  if (!fd) return res.status(404).json({ error: 'Function not found' });
  const impl = fd.implementations.find(i => i.id === req.params.implId);
  if (!impl) return res.status(404).json({ error: 'Implementation not found' });
  Object.assign(impl, req.body);
  saveDataToFile(appData);
  res.json(impl);
});

// Delete implementation
app.delete('/api/functions/:key/implementations/:implId', (req, res) => {
  const fd = appData.functionData[req.params.key];
  if (!fd) return res.status(404).json({ error: 'Function not found' });
  fd.implementations = fd.implementations.filter(i => i.id !== req.params.implId);
  saveDataToFile(appData);
  res.json({ success: true });
});

// Export all data as JSON
app.get('/api/export', (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename=ai-fluency-data.json');
  res.json(appData);
});

// Reset to defaults
app.post('/api/reset', (req, res) => {
  appData = getDefaultData();
  saveDataToFile(appData);
  res.json({ success: true });
});

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ========================
// START
// ========================
app.listen(PORT, () => {
  console.log(`\n  AI Fluency Dashboard running at: http://localhost:${PORT}\n`);
  console.log('  Open this URL in your browser to view the dashboard.\n');
});
