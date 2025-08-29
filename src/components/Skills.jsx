import React from 'react';

const Skills = ({ isDarkMode, theme }) => {
  const skills = [
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 90 },
    { name: 'JavaScript', level: 75 },
    { name: 'Tailwind', level: 85 },
    { name: 'React JS', level: 70 },
    { name: 'Express/Node.Js', level: 90 },
    { name: 'Next Js', level: 80 }
  ];

  return (
    <section id="skills" className={`py-20 ${theme.cardBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.text}`}>Skills</h2>
          <p className={`text-lg ${theme.textSecondary}`}>Technologies I work with</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-2">
                <span className={`font-medium ${theme.text}`}>{skill.name}</span>
                <span className={theme.textSecondary}>{skill.level}%</span>
              </div>
              <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{width: `${skill.level}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;