import { useEffect, useState } from 'react';
import supabase from './supabase';

import './style.css';

const initialFacts = [
  {
    id: 1,
    text: 'React is being developed by Meta (formerly facebook)',
    source: 'https://opensource.fb.com/',
    category: 'technology',
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
    source:
      'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
    category: 'society',
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: 'Lisbon is the capital of Portugal',
    source: 'https://en.wikipedia.org/wiki/Lisbon',
    category: 'society',
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span style={{ fontSize: '40px' }}>{count}</span>
      <button className='btn btn-large' onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}

function SurpriseFact({ facts, setFacts }) {
  const [surpriseFact, setSurpriseFact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const getRandomFact = () => {
    setIsLoading(true);
    if (facts.length > 0) {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setSurpriseFact(facts[randomIndex]);
    }
    setIsLoading(false);
  };

  async function handleVote(columnName) {
    if (!surpriseFact) return;
    
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: surpriseFact[columnName] + 1 })
      .eq('id', surpriseFact.id)
      .select();
    setIsUpdating(false);

    if (!error) {
      setSurpriseFact(updatedFact[0]);
      setFacts((facts) =>
        facts.map((f) => (f.id === surpriseFact.id ? updatedFact[0] : f))
      );
    }
  }

  const buttonStyle = {
    transform: 'scale(1)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  };

  const hoverStyle = (e) => {
    e.target.style.transform = 'scale(1.15) rotate(5deg)';
    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
  };

  const leaveStyle = (e) => {
    e.target.style.transform = 'scale(1) rotate(0deg)';
    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
  };

  return (
    <div style={{ 
      marginBottom: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '30px',
      padding: '20px'
    }}>
      <button
        className='btn btn-large'
        onClick={getRandomFact}
        style={{
          background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1, #96C93D)',
          padding: '20px 40px',
          fontSize: '24px',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
          transform: 'scale(1)',
          transition: 'all 0.3s ease',
          animation: 'pulse 2s infinite'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1) rotate(-5deg)';
          e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1) rotate(0deg)';
          e.target.style.boxShadow = 'none';
        }}
      >
        ✨ Surprise Me! ✨
      </button>

      {isLoading && <p className='message'>Loading surprise...</p>}
      
      {surpriseFact && !isLoading && (
        <div
          style={{
            padding: '25px',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #FF61D2, #FE9090, #FFC876, #FFEC59)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            animation: 'fadeIn 0.5s ease-out',
            width: '100%',
            maxWidth: '800px'
          }}
        >
          <p style={{ 
            fontSize: '22px', 
            color: '#292524', 
            fontWeight: 'bold',
            marginBottom: '15px',
            fontFamily: 'Sono, sans-serif'
          }}>
            🎉 Your Surprise Fact:
          </p>
          <p style={{ 
            fontSize: '20px', 
            color: '#292524',
            lineHeight: '1.4',
            fontFamily: 'Sono, sans-serif'
          }}>
            {surpriseFact.text}
            <a 
              className='source' 
              href={surpriseFact.source} 
              target='_blank'
              style={{ color: '#1a1a1a' }}
            >
              (Source)
            </a>
          </p>
          <div style={{ 
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <span
              className='tag'
              style={{
                backgroundColor: CATEGORIES.find(
                  (cat) => cat.name === surpriseFact.category
                )?.color,
                padding: '8px 15px',
                fontSize: '16px'
              }}
            >
              {surpriseFact.category}
            </span>
            <div className='vote-buttons' style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={() => handleVote('votesInteresting')}
                disabled={isUpdating}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#78716c',
                  color: '#fafaf9',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '100px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
                onMouseEnter={hoverStyle}
                onMouseLeave={leaveStyle}
              >
                👍 {surpriseFact.votesInteresting}
              </button>
              <button
                onClick={() => handleVote('votesMindblowing')}
                disabled={isUpdating}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#78716c',
                  color: '#fafaf9',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '100px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
                onMouseEnter={hoverStyle}
                onMouseLeave={leaveStyle}
              >
                🤯 {surpriseFact.votesMindblowing}
              </button>
              <button
                onClick={() => handleVote('votesFalse')}
                disabled={isUpdating}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#78716c',
                  color: '#fafaf9',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '100px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
                onMouseEnter={hoverStyle}
                onMouseLeave={leaveStyle}
              >
                ⛔️ {surpriseFact.votesFalse}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from('facts').select('*');

        if (currentCategory !== 'all')
          query = query.eq('category', currentCategory);

        const { data: facts, error } = await query
          .order('votesInteresting', { ascending: false })
          .limit(1000);

        if (!error) setFacts(facts);
        else alert('There was a problem getting data');
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className='main'>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        <section>
          <SurpriseFact facts={facts} setFacts={setFacts} />
          {isLoading ? (
            <Loader />
          ) : (
            <FactList facts={facts} setFacts={setFacts} />
          )}
        </section>
      </main>
    </>
  );
}

function Loader() {
  return <p className='message'>Loading...</p>;
}

function Header({ showForm, setShowForm, searchQuery, setSearchQuery }) {
  const appTitle = 'Today I Learned';

  return (
    <header className='header'>
      <div className='logo'>
        <img src='logo.png' height='68' width='68' alt='Today I Learned Logo' />
        <h1>{appTitle}</h1>
      </div>

      <div className='search-container' style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <input
          type='text'
          placeholder='Search Facts'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='search-input'
          style={{
            padding: '16px 24px',
            borderRadius: '100px',
            border: 'none',
            outline: 'none',
            background: 'linear-gradient(135deg, #3b82f6, #ef4444, #16a34a, #eab308)',
            fontSize: '20px',
            color: 'rgb(250, 250, 249)',
            fontFamily: 'Coiny, sans-serif',
            fontWeight: '600',
            width: '240px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            '::placeholder': {
              color: 'rgb(250, 250, 249)',
              opacity: 1,
              textTransform: 'uppercase'
            }
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1) rotate(-2deg)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
        />
        <button
          className='btn btn-large btn-open'
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? 'Close' : 'Share a fact'}
        </button>
      </div>
    </header>
  );
}

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState('');
  // Fixed in a video text overlay
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    // 2. Check if data is valid. If so, create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. Create a new fact object
      // const newFact = {
      //   id: Math.round(Math.random() * 10000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. Upload fact to Supabase and receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // 4. Add the new fact to the UI: add the fact to state
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 5. Reset input fields
      setText('');
      setSource('');
      setCategory('');

      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className='fact-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Share a fact with the world...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type='text'
        placeholder='Trustworthy source...'
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value=''>Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large' disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className='category'>
          <button
            className='btn btn-all-categories'
            onClick={() => setCurrentCategory('all')}
          >
            All
          </button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className='category'>
            <button
              className='btn btn-category'
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0)
    return (
      <p className='message'>
        No facts for this category yet! Create the first one ✌️
      </p>
    );

  return (
    <section>
      <ul className='facts-list'>
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  const buttonStyle = {
    transform: 'scale(1)',
    transition: 'all 0.2s ease',
  };

  const hoverStyle = (e) => {
    e.target.style.transform = 'scale(1.15) rotate(5deg)';
    e.target.style.backgroundColor = '#292524';
    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
  };

  const leaveStyle = (e) => {
    e.target.style.transform = 'scale(1) rotate(0deg)';
    e.target.style.backgroundColor = '#78716c';
    e.target.style.boxShadow = 'none';
  };

  return (
    <li className='fact'>
      <p>
        {isDisputed ? <span className='disputed'>[⛔️ DISPUTED]</span> : null}
        {fact.text}
        <a className='source' href={fact.source} target='_blank'>
          (Source)
        </a>
      </p>
      <span
        className='tag'
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className='vote-buttons'>
        <button
          onClick={() => handleVote('votesInteresting')}
          disabled={isUpdating}
          style={buttonStyle}
          onMouseEnter={hoverStyle}
          onMouseLeave={leaveStyle}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote('votesMindblowing')}
          disabled={isUpdating}
          style={buttonStyle}
          onMouseEnter={hoverStyle}
          onMouseLeave={leaveStyle}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button
          onClick={() => handleVote('votesFalse')}
          disabled={isUpdating}
          style={buttonStyle}
          onMouseEnter={hoverStyle}
          onMouseLeave={leaveStyle}
        >
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
