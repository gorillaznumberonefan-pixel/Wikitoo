import { Routes, Route, Link, NavLink, useParams } from 'react-router-dom';
import { articles, editorRequests, editors, reviewQueue } from './data/mockData';

function Header() {
  return (
    <header className="topbar">
      <div className="container nav-shell">
        <Link to="/" className="brand">
          Wikitoo
        </Link>

        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/editor">Editors</NavLink>
          <NavLink to="/review">Review Queue</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/request-editor">Request Editor</NavLink>
        </nav>
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
        <p className="eyebrow">Public wiki</p>
        <h1>Explore verified knowledge.</h1>
        <p className="hero-copy">
          Wikitoo is built for well-sourced thinking, peer-reviewed content, and clean,
          easy browsing across topics.
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
        <input id="search" type="search" placeholder="Search articles by title or topic" />
      </section>

      <section className="topic-grid">
        {Object.entries(grouped).map(([category, categoryArticles]) => (
          <div key={category} className="topic-card">
            <h2>{category}</h2>
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
      <h1>Editor Dashboard</h1>
      <div className="dashboard-grid">
        <div className="panel">
          <h2>My Drafts</h2>
          <ul>
            <li>How black holes form</li>
            <li>Cello maintenance and care</li>
            <li>History of paper manufacturing</li>
          </ul>
        </div>

        <div className="panel">
          <h2>Topic Access</h2>
          <ul>
            {editors.map((editor) => (
              <li key={editor.id}>
                {editor.name} — {editor.topics.join(', ')}
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
      <h1>Peer Review Queue</h1>
      <div className="review-list">
        {reviewQueue.map((item) => (
          <article key={item.id} className="review-card">
            <div>
              <p className="eyebrow">{item.status}</p>
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
      <h1>Admin Panel</h1>
      <div className="dashboard-grid">
        <div className="panel">
          <h2>Pending Editor Requests</h2>
          <ul>
            {editorRequests.map((request) => (
              <li key={request.id}>
                {request.name} — {request.topic} — {request.status}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h2>Access Control</h2>
          <ul>
            <li>Admin: full control</li>
            <li>Editors: topic-specific permissions</li>
            <li>Reviewers: approval rights</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

function RequestEditorPage() {
  return (
    <main className="container page-space">
      <h1>Request to be an Editor</h1>
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
          <textarea rows="5" placeholder="Tell us about yourself and your interests." />
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
