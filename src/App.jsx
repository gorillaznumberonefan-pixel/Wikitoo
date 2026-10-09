import { Routes, Route, Link, NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { articles, editorRequests, editors, reviewQueue } from './data/mockData';

function Header() {
  const [theme, setTheme] = useState(() => localStorage.getItem('wikitoo-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('wikitoo-theme', theme);
  }, [theme]);

  return (
    <header className="topbar">
      <div className="container nav-shell">
        <Link to="/" className="brand-wrap">
          <span className="brand-mark">W</span>
          <span className="brand">Wikitoo</span>
        </Link>

        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/editor">Editors</NavLink>
          <NavLink to="/review">Review Queue</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/request-editor">Request Editor</NavLink>
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
}

function HomePage() {
  const grouped = articles.reduce((acc, article) => {
    const group = article.category;
    if (!acc[group]) acc[group] = [];
    acc[group].push(article);
    return acc;
  }, {});

  return (
    <main className="container page-space">
      <section className="hero">
        <p className="eyebrow">Public wiki • reviewed by editors</p>
        <h1>Verified knowledge for curious minds.</h1>
        <p className="hero-copy">
          Wikitoo is a public knowledge base built around clear explanations, cited sources,
          editorial review, and fast discovery across topics.
        </p>
        <div className="hero-actions">
          <Link to="/request-editor" className="primary-btn">
            Request to be an editor
          </Link>
          <Link to="/editor" className="secondary-btn">
            Open editor dashboard
          </Link>
        </div>
      </section>

      <section className="search-panel">
        <label htmlFor="search" className="sr-only">
          Search articles
        </label>
        <input id="search" type="search" placeholder="Search articles by title, topic, or keyword" />
      </section>

      <section className="topic-grid">
        {Object.entries(grouped).map(([category, categoryArticles]) => (
          <div key={category} className="topic-card">
            <div className="topic-card-header">
              <span className="topic-badge">{categoryArticles.length}</span>
              <h2>{category}</h2>
            </div>
            <div className="article-list">
              {categoryArticles.map((article) => (
                <Link key={article.slug} to={`/article/${article.slug}`}>
                  {article.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((entry) => entry.slug === slug);

  if (!article) {
    return (
      <main className="container page-space">
        <h1>Article not found</h1>
      </main>
    );
  }

  return (
    <main className="container page-space article-page">
      <div className="article-header">
        <p className="eyebrow">{article.category}</p>
        <h1>{article.title}</h1>
        <p className="meta">By {article.author} • Last verified {article.lastVerified}</p>
      </div>

      <article className="article-body">
        {article.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>

      <section className="sources-panel">
        <h3>Sources</h3>
        <ul>
          {article.sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function EditorDashboard() {
  return (
    <main className="container page-space">
      <div className="page-heading">
        <p className="eyebrow">Editor tools</p>
        <h1>Editor Dashboard</h1>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <h2>My Drafts</h2>
          <ul className="stack-list">
            <li>How black holes form</li>
            <li>Cello maintenance and care</li>
            <li>History of paper manufacturing</li>
          </ul>
        </div>

        <div className="panel">
          <h2>Topic Access</h2>
          <ul className="stack-list">
            {editors.map((editor) => (
              <li key={editor.id}>
                <strong>{editor.name}</strong> — {editor.topics.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

function ReviewQueue() {
  return (
    <main className="container page-space">
      <div className="page-heading">
        <p className="eyebrow">Peer review</p>
        <h1>Review Queue</h1>
      </div>

      <div className="review-list">
        {reviewQueue.map((item) => (
          <article key={item.id} className="review-card">
            <div>
              <p className="eyebrow subtle">{item.status}</p>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </div>
            <div className="review-actions">
              <button className="primary-btn">Approve</button>
              <button className="secondary-btn">Reject</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function AdminPanel() {
  return (
    <main className="container page-space">
      <div className="page-heading">
        <p className="eyebrow">Control center</p>
        <h1>Admin Panel</h1>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <h2>Pending Editor Requests</h2>
          <ul className="stack-list">
            {editorRequests.map((request) => (
              <li key={request.id}>
                <strong>{request.name}</strong> — {request.topic} — {request.status}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h2>Access Control</h2>
          <ul className="stack-list">
            <li>Admin: full control</li>
            <li>Editors: topic-based permissions</li>
            <li>Reviewers: approval workflow</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

function RequestEditorPage() {
  return (
    <main className="container page-space">
      <div className="page-heading narrow">
        <p className="eyebrow">Join the team</p>
        <h1>Request to be an Editor</h1>
      </div>

      <form className="request-form">
        <label>
          Name
          <input type="text" placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <label>
          Topic interest
          <input type="text" placeholder="Science, Music, Plants..." />
        </label>
        <label>
          Why do you want to contribute?
          <textarea rows="5" placeholder="Tell us about your interests, expertise, and how you’d like to help." />
        </label>
        <button type="submit" className="primary-btn">
          Submit request
        </button>
      </form>
    </main>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/editor" element={<EditorDashboard />} />
        <Route path="/review" element={<ReviewQueue />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/request-editor" element={<RequestEditorPage />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
