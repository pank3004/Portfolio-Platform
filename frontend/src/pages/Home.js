import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem' }}>
            Hi, I’m{' '}
            <span style={{ color: '#4f46e5' }}>Pankaj Kumawat</span>
          </h1>

          {/* TYPEWRITER TEXT */}
          <h2
            style={{
              fontSize: '1.5rem',
              marginTop: '1rem',
              color: '#374151',
              minHeight: '2rem'
            }}
          >
            <Typewriter
              words={[
                'AI Enthusiast 🤖',
                'Machine Learning Engineer',
                'Deep Learning Practitioner',
                'Generative AI Developer',
                'Agentic AI Explorer'
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h2>

          <div style={{ marginTop: '2.5rem' }}>
            <a href="/resume.pdf" className="btn btn-primary" download>
              Download Resume
            </a>
            <a
              href="/contact"
              className="btn btn-secondary"
              style={{ marginLeft: '1rem' }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What I Do</h2>

          <div className="card-grid">
            <div className="card">
              <div className="card-content">
                <h3 className="card-title">🤖 AI & Machine Learning</h3>
                <p className="card-description">
                  Designing intelligent systems using Python, Scikit-learn,
                  TensorFlow, and PyTorch.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">🧠 Deep Learning</h3>
                <p className="card-description">
                  Building neural networks for NLP, computer vision, and
                  real-world problem solving.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">✨ Generative AI</h3>
                <p className="card-description">
                  Working with LLMs, prompt engineering, RAG systems, and
                  Agentic AI workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ratings & Reviews */}
      <section className="section" style={{ background: '#f9fafb' }}>
        <div className="container">
          <h2 className="section-title">What People Say</h2>

          <div className="card-grid">
            <div className="card">
              <div className="card-content">
                <p className="card-description">
                  “Strong understanding of Machine Learning concepts and very
                  practical approach to problem solving.”
                </p>
                <p style={{ marginTop: '1rem' }}>
                  ⭐⭐⭐⭐⭐ <br />
                  <strong>Mentor</strong>
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <p className="card-description">
                  “His GenAI projects show real industry-level thinking.
                  Clean code and good explanations.”
                </p>
                <p style={{ marginTop: '1rem' }}>
                  ⭐⭐⭐⭐⭐ <br />
                  <strong>Peer Developer</strong>
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <p className="card-description">
                  “Very passionate about AI and continuously learning new
                  technologies.”
                </p>
                <p style={{ marginTop: '1rem' }}>
                  ⭐⭐⭐⭐☆ <br />
                  <strong>Reviewer</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Let’s Build Something Intelligent</h2>
          <p style={{ marginBottom: '2rem' }}>
            Open to internships, full-time roles, and exciting AI projects.
          </p>
          <a href="/contact" className="btn btn-primary">
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;






// // Home Page Component
// // Landing page with hero section

// import React from 'react';

// function Home() {
//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="container">
//           <h1>Welcome to My Portfolio</h1>
//           <p>AI Enthusiast | Machine Learning | Deep Learning | Generative AI</p>
//           <p style={{ marginTop: '2rem' }}>
//             <a href="/resume.pdf" className="btn btn-primary" download>
//               Download Resume
//             </a>
//           </p>
//         </div>
//       </section>

//       {/* Quick Intro */}
//       <section className="section">
//         <div className="container">
//           <h2 className="section-title">What I Do</h2>
//           <div className="card-grid">
//             <div className="card">
//               <div className="card-content">
//                 <h3 className="card-title">🤖 AI & Machine Learning</h3>
//                 <p className="card-description">
//                   Building intelligent systems with Python, TensorFlow, and PyTorch
//                 </p>
//               </div>
//             </div>
//             <div className="card">
//               <div className="card-content">
//                 <h3 className="card-title">🧠 Deep Learning</h3>
//                 <p className="card-description">
//                   Creating neural networks for computer vision and NLP tasks
//                 </p>
//               </div>
//             </div>
//             <div className="card">
//               <div className="card-content">
//                 <h3 className="card-title">✨ Generative AI</h3>
//                 <p className="card-description">
//                   Working with LLMs, ChatGPT, and other generative models
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;
