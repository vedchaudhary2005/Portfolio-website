import React, { useState } from 'react';
import { Search, Eye, ExternalLink } from 'lucide-react';

const Portfolio = ({ theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    { 
      id: 1,
      title: 'Ai-Assistant', 
      category: 'web', 
      tech: 'ReactJs, TailwindCSS', 
      image: 'from-purple-400 to-pink-400',
      liveUrl: 'https://cryptro.netlify.app/',
      github: 'https://github.com/vedchaudhary2005/Ai-assistant'
    },
    { 
      id: 2,
      title: 'Landing-page',
      category: 'design',
      tech: 'HTML, CSS , JavaScript',
      image: 'from-green-400 to-blue-400',
      github: 'https://github.com/vedchaudhary2005/landing-page',
      liveUrl: 'https://pagessssssssssssssssssssssssssssssss.netlify.app/'
    },
    { 
      id: 3,
      title: 'Portfolio Design',
      category: 'design,web, mobile',
      tech: 'UI/UX Design', 
      image: 'from-pink-400 to-red-400',
      liveUrl: 'https://vedportfolioo.netlify.app/',
      github: ''
    },
    { 
      id: 4,
      title: 'Todo-list',
      category: 'web,mobile',
      tech: 'ReactJs, TailwindCSS',
      image: 'from-yellow-400 to-red-400',
      liveUrl:'https://planifys.netlify.app/',
      github:'https://github.com/vedchaudhary2005/Todo-List'
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'all' || project.category === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.tech.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="portfolio" className={`py-20 ${theme.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.text}`}>Portfolio</h2>
          <p className={`text-lg mb-8 ${theme.textSecondary}`}>Some of my recent work</p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme.textSecondary}`} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-full border transition-colors duration-200 ${theme.inputBg} ${theme.inputBorder} ${theme.text}`}
              />
            </div>
            
            <div className="flex gap-2">
              {['all', 'web', 'mobile', 'design'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedFilter === filter
                      ? 'bg-blue-600 text-white'
                      : `${theme.cardBg} ${theme.text} hover:bg-blue-100 ${theme.isDarkMode ? 'hover:bg-gray-700' : ''}`
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${theme.cardBgAlt}`}>
              <div className={`h-48 bg-gradient-to-br ${project.image} relative group`}>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <button 
                      onClick={()=>window.open(project.liveUrl, '_blank')}
                      className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors duration-200">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={()=>window.open(project.github,'_blank')}
                      className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors duration-200">
                      <ExternalLink className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>{project.title}</h3>
                <p className={`mb-4 ${theme.textSecondary}`}>{project.tech}</p>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${theme.cardBg} ${theme.textSecondary}`}>
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;