import React from 'react';
import { Code, Award, Eye } from 'lucide-react';

const About = ({ isDarkMode, theme }) => {
  return (
    <section id="about" className={`py-20 relative ${theme.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.text}`}>About Me</h2>
          <p className={`text-lg max-w-3xl mx-auto ${theme.textSecondary}`}>
            I'm a passionate Web Developer and Computer Science student with a strong interest in building scalable, user-friendly, and impactful digital solutions. My journey so far has been focused on mastering modern web technologies like JavaScript, React, and TailwindCSS, while also strengthening my problem-solving skills through Data Structures and Algorithms. I enjoy the process of turning ideas into reality whether it's designing responsive interfaces, optimizing performance, or crafting clean and maintainable code. Driven by curiosity and consistency, I aim to contribute to innovative projects in top tech companies, dynamic startups, or service-based organizations where technology creates real value.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Code, title: 'Frontend Development', desc: 'HTMl, CSS, JavaScript, Tailwind' },
            { icon: Award, title: 'Backend Development', desc: 'Node.js, PostgreSQL, MongoDB' },
            { icon: Eye, title: 'UI/UX Design', desc: 'Figma, Framer, Responsive Design' }
          ].map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div key={index} className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${theme.cardBg}`}>
                <IconComponent className={`h-12 w-12 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>{skill.title}</h3>
                <p className={theme.textSecondary}>{skill.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;