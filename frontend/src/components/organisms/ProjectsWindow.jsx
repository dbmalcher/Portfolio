import { useState, useEffect, useMemo, useCallback } from 'react';
import { CaretLeft, CaretRight, Folder, Folders, Star, Devices, Books, PenNib, CaretDown, CaretRight as NextIcon, CaretLeft as PrevIcon } from '@phosphor-icons/react';
import { useLanguage } from '../../i18n/LanguageContext';
import './ProjectsWindow.css';

const projectData = {
  en: [
    { id: 1, name: 'Atomic Design System', category: 'design-systems', isFavorite: true, image: '/projects/atomic-design-system/thumbnail.png', context: 'Development of an Atomic Design-based Design System, with creation of tokens, reusable components and structuring of a React library. The project aimed to accelerate the front-end team\'s work, reduce inconsistencies between products and strengthen collaboration between design and engineering. To develop the components, MiniMax 2.5 was used in OpenCode.', link: 'https://github.com/ThiagoJezini/Web_Design_Atomic', problem: 'The development team used a no-code model and needed an easy and practical way to maintain visual standards and efficiency in the transition to traditional programming.', role: 'Design team leader', result: 'The library was widely used and updated with additional components to better cover the projects that emerged, accelerating development and reducing costs with requests', gallery: ['/projects/atomic-design-system/slide-1.png', '/projects/atomic-design-system/slide-2.png', '/projects/atomic-design-system/slide-3.png', '/projects/atomic-design-system/slide-4.png', '/projects/atomic-design-system/slide-5.png'] },
    { id: 2, name: 'BPMS', category: 'uiux', isFavorite: false, image: '/projects/bpms/thumbnail.png', context: 'The BPMS project is aimed at digitizing the process in which it is named (Business Process Management Suite). Initially made to order, it was thought of in its development to become an end product that could be used by companies in business management and internal production.', problem: 'The contracting company needed a way to generate KPIs to analyze its effectiveness.', role: 'Product Designer and UI & UX Designer, working directly on controlling activities and deliveries of the development team.', result: 'The system was completed and met the demand to generate KPIs on production, meeting the client demand and generating an internal product ready to be commercialized.', gallery: ['/projects/bpms/slide-1.png', '/projects/bpms/slide-2.png', '/projects/bpms/slide-3.png', '/projects/bpms/slide-4.png', '/projects/bpms/slide-5.png', '/projects/bpms/slide-6.png', '/projects/bpms/slide-7.png'] },
  ],
  pt: [
    { id: 1, name: 'Atomic Design System', category: 'design-systems', isFavorite: true, image: '/projects/atomic-design-system/thumbnail.png', context: 'Desenvolvimento de um Design System baseado em Atomic Design, com criação de tokens, componentes reutilizáveis e estruturação de uma biblioteca em React. O projeto teve como objetivo acelerar o trabalho do time de front-end, reduzir inconsistências entre produtos e fortalecer a colaboração entre design e engenharia. Para desenvolver os componentes, foi utilizado MiniMax 2.5 no OpenCode.', link: 'https://github.com/ThiagoJezini/Web_Design_Atomic', problem: 'O time de desenvolvimento utilizava modelo no-code e precisava de uma maneira fácil e prática de manter o padrão visual e eficiência na transição para programação tradicional.', role: 'Líder da equipe de design', result: 'A biblioteca foi amplamente utilizada e atualizada com componentes adicionais para melhor abranger os projetos que surgiram, acelerando o desenvolvimento e diminuindo custos com requisições', gallery: ['/projects/atomic-design-system/slide-1.png', '/projects/atomic-design-system/slide-2.png', '/projects/atomic-design-system/slide-3.png', '/projects/atomic-design-system/slide-4.png', '/projects/atomic-design-system/slide-5.png'] },
    { id: 2, name: 'BPMS', category: 'uiux', isFavorite: false, image: '/projects/bpms/thumbnail.png', context: 'O projeto BPMS é voltado para digitalizar o processo na qual é nomeado (Business Process Management Suite). Inicialmente feito sob encomenda, foi pensado em seu desenvolvimento a tornar-se um produto final que pudesse ser utilizado por empresas no gerenciamento de negócios e produção interna.', problem: 'A empresa contratante precisava de uma maneira de gerar KPIs para analisar sua efetividade.', role: 'Product Designer e UI & UX Designer, trabalhando diretamente no controle de atividades e entregas do time de desenvolvimento.', result: 'O sistema chegou a ser finalizado e supriu a demanda de gerar KPIs em cima da produção, suprindo a demanda do cliente e gerando um produto interno pronto a ser comercializado.', gallery: ['/projects/bpms/slide-1.png', '/projects/bpms/slide-2.png', '/projects/bpms/slide-3.png', '/projects/bpms/slide-4.png', '/projects/bpms/slide-5.png', '/projects/bpms/slide-6.png', '/projects/bpms/slide-7.png'] },
  ],
};

const currentProjects = projectData.en;
const sectionLabels = {
  all: { en: 'All', pt: 'Todos' },
  favorites: { en: 'Favorites', pt: 'Favoritos' },
  uiux: { en: 'UI & UX', pt: 'UI & UX' },
  'design-systems': { en: 'Design Systems', pt: 'Sistemas de Design' },
  branding: { en: 'Branding', pt: 'Branding' },
};

function ProjectsWindow() {
  const { t, language } = useLanguage();
  const [currentProjects, setCurrentProjects] = useState(projectData.en);
  const [history, setHistory] = useState(() => [
    { path: ['My Projects', 'Projects'], section: 'all', expanded: null }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    setCurrentProjects(projectData[language] || projectData.en);
  }, [language]);

  useEffect(() => {
    if (history.length === 1 && history[0].path[0] === 'My Projects') {
      setHistory([{ path: [t('myProjects'), t('projects')], section: 'all', expanded: null }]);
    }
  }, [language]);

  const currentState = history[historyIndex];
  const currentPath = currentState.path;
  const selectedSection = currentState.section;
  const expandedSection = currentState.expanded;
  const currentProjectId = currentState.projectId;

  const getProjectById = (id) => currentProjects.find(p => p.id === id);
  const currentProject = currentProjectId ? getProjectById(currentProjectId) : null;

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const navigateToBreadcrumb = (index) => {
    if (index >= 0 && index <= historyIndex) {
      setHistoryIndex(index);
    }
  };

  const handleProjectClick = (projectId) => {
    const project = currentProjects.find(p => p.id === projectId);
    if (!project) return;

    const newPath = [...currentPath, project.name];

    const newState = {
      path: newPath,
      section: selectedSection,
      expanded: expandedSection,
      projectId: project.id
    };

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    setCurrentSlide(0);
  }, [currentProjectId]);

  const galleryImages = currentProject?.gallery || [];
  const totalSlides = galleryImages.length || 3;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getSectionLabel = (key) => {
    return sectionLabels[key]?.[language] || key;
  };

  const displayedProjects = useMemo(() => {
    if (expandedSection) {
      return currentProjects.filter(p => p.category === expandedSection);
    }
    if (selectedSection === 'all') {
      return currentProjects;
    }
    if (selectedSection === 'favorites') {
      return currentProjects.filter(p => p.isFavorite);
    }
    return currentProjects;
  }, [currentProjects, expandedSection, selectedSection]);

  const currentSlideImage = useMemo(() => {
    if (!galleryImages.length) return null;
    return galleryImages[currentSlide];
  }, [galleryImages, currentSlide]);

  const handleSectionClick = (sectionKey, hasChevron = false) => {
    if (!hasChevron && sectionKey === selectedSection && !currentProjectId) return;
    
    let newExpanded = null;
    let newSection = sectionKey;
    
    if (hasChevron) {
      newExpanded = expandedSection === sectionKey ? null : sectionKey;
      newSection = selectedSection;
    }
    
    const newPath = hasChevron && newExpanded
      ? [t('myProjects'), t('projects'), getSectionLabel(sectionKey)]
      : hasChevron && !newExpanded
        ? [t('myProjects'), t('projects')]
        : [t('myProjects'), t('projects'), getSectionLabel(sectionKey)];
    
    const newState = {
      path: newPath,
      section: newSection,
      expanded: newExpanded,
      projectId: null
    };
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  return (
    <div className="projects-window">
      <div className="projects-navigation">
        <div className="nav-arrows">
          <button 
            className="nav-arrow" 
            onClick={goBack}
            disabled={historyIndex <= 0}
            title="Voltar"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <button 
            className="nav-arrow" 
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            title="Avançar"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        </div>
        <div className="breadcrumb">
          <Folder size={18} weight="fill" className="breadcrumb-icon" />
          {currentPath.map((step, index) => (
            <span key={index}>
              {index > 0 && <span className="breadcrumb-sep">›</span>}
              <button 
                className="breadcrumb-step clickable"
                onClick={() => navigateToBreadcrumb(index)}
              >
                {step}
              </button>
            </span>
          ))}
        </div>
      </div>
      
      <div className="projects-body">
        <div className="projects-sidebar">
          <div className="sidebar-section">
            <div 
              className={`sidebar-button ${selectedSection === 'all' && !expandedSection ? 'selected' : ''}`}
              onClick={() => handleSectionClick('all', false)}
            >
              <Folder size={18} weight="fill" className="button-icon" />
              <span className="button-label">{t('all') || 'All'}</span>
            </div>
            <div 
              className={`sidebar-button ${selectedSection === 'favorites' && !expandedSection ? 'selected' : ''}`}
              onClick={() => handleSectionClick('favorites', false)}
            >
              <Star size={18} weight="fill" className="button-icon" />
              <span className="button-label">{t('favorites') || 'Favorites'}</span>
            </div>
          </div>
          
          <div className="sidebar-section">
            <div 
              className={`sidebar-button ${expandedSection === 'uiux' ? 'selected' : ''}`}
              onClick={() => handleSectionClick('uiux', true)}
            >
              <Devices size={18} weight="fill" className="button-icon" />
              <span className="button-label">UI & UX</span>
              <CaretDown size={14} weight="bold" className={`button-chevron ${expandedSection === 'uiux' ? 'rotated' : ''}`} />
            </div>
            {expandedSection === 'uiux' && (
              <div className="sidebar-submenu">
                {currentProjects.filter(p => p.category === 'uiux').map((project) => (
                  <div key={project.id} className="sidebar-subitem">
                    <Folder size={16} weight="fill" className="subitem-icon" />
                    <span className="subitem-label">{project.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="sidebar-section">
            <div 
              className={`sidebar-button ${expandedSection === 'design-systems' ? 'selected' : ''}`}
              onClick={() => handleSectionClick('design-systems', true)}
            >
              <Books size={18} weight="fill" className="button-icon" />
              <span className="button-label">Design Systems</span>
              <CaretDown size={14} weight="bold" className={`button-chevron ${expandedSection === 'design-systems' ? 'rotated' : ''}`} />
            </div>
            {expandedSection === 'design-systems' && (
              <div className="sidebar-submenu">
                {currentProjects.filter(p => p.category === 'design-systems').map((project) => (
                  <div key={project.id} className="sidebar-subitem">
                    <Folder size={16} weight="fill" className="subitem-icon" />
                    <span className="subitem-label">{project.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="sidebar-section">
            <div 
              className={`sidebar-button ${expandedSection === 'branding' ? 'selected' : ''}`}
              onClick={() => handleSectionClick('branding', true)}
            >
              <PenNib size={18} weight="fill" className="button-icon" />
              <span className="button-label">Branding</span>
              <CaretDown size={14} weight="bold" className={`button-chevron ${expandedSection === 'branding' ? 'rotated' : ''}`} />
            </div>
            {expandedSection === 'branding' && (
              <div className="sidebar-submenu">
                {currentProjects.filter(p => p.category === 'branding').map((project) => (
                  <div key={project.id} className="sidebar-subitem">
                    <Folder size={16} weight="fill" className="subitem-icon" />
                    <span className="subitem-label">{project.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="projects-thumbnails">
          {currentProject ? (
            <div className="project-detail">
              <div className="project-detail-header">
                <div className="project-detail-image">
                  {currentProject.image ? (
                    <img src={currentProject.image} alt={currentProject.name} loading="lazy" />
                  ) : (
                    <div className="project-detail-image-placeholder"></div>
                  )}
                </div>
                <div className="project-detail-info">
                  <h2 className="project-detail-name">{currentProject.name}</h2>
                  <p className="project-detail-context">{currentProject.context || 'No description available.'}</p>
                  {currentProject.link && (
                    <a href={currentProject.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      {t('projectLink') || 'View Project'} →
                    </a>
                  )}
                </div>
              </div>
              
              <div className="project-detail-sections">
                <div className="project-section">
                  <h3 className="project-section-title">{t('problem') || 'Problem'}</h3>
                  <p className="project-section-text">{currentProject.problem || 'No problem description available.'}</p>
                </div>
                <div className="project-section">
                  <h3 className="project-section-title">{t('myRole') || 'My Role'}</h3>
                  <p className="project-section-text">{currentProject.role || 'No role description available.'}</p>
                </div>
                <div className="project-section">
                  <h3 className="project-section-title">{t('result') || 'Result'}</h3>
                  <p className="project-section-text">{currentProject.result || 'No result description available.'}</p>
                </div>
              </div>
              
              <div className="project-detail-gallery">
                <h3 className="gallery-title">{t('projectPresentation') || 'Project Presentation'}</h3>
                {galleryImages.length > 0 ? (
                  <div className="gallery-carousel">
                    <button className="gallery-nav gallery-prev" onClick={prevSlide} disabled={galleryImages.length <= 1}>
                      <PrevIcon size={24} weight="bold" />
                    </button>
                    <div className="gallery-slide">
                      {galleryImages[currentSlide].startsWith('#') ? (
                        <div className="gallery-color-slide" style={{ backgroundColor: galleryImages[currentSlide] }}></div>
                      ) : (
                        <img src={galleryImages[currentSlide]} alt={`Slide ${currentSlide + 1}`} loading="lazy" />
                      )}
                    </div>
                    <button className="gallery-nav gallery-next" onClick={nextSlide} disabled={galleryImages.length <= 1}>
                      <NextIcon size={24} weight="bold" />
                    </button>
                  </div>
                ) : (
                  <div className="gallery-placeholder"></div>
                )}
                {galleryImages.length > 0 && (
                  <>
                    <div className="gallery-counter">
                      {currentSlide + 1} / {galleryImages.length}
                    </div>
                    <div className="gallery-thumbnails">
                      {galleryImages.map((img, idx) => (
                        <button 
                          key={idx} 
                          className={`gallery-thumb ${idx === currentSlide ? 'active' : ''}`}
                          onClick={() => setCurrentSlide(idx)}
                        >
                          {img.startsWith('#') ? (
                            <div className="gallery-thumb-color" style={{ backgroundColor: img }}></div>
                          ) : (
                            <img src={img} alt={`Thumb ${idx + 1}`} loading="lazy" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="thumbnails-grid">
              {displayedProjects.map((project) => (
                <div key={project.id} className="thumbnail-card" onClick={() => handleProjectClick(project.id)}>
                  <div className="thumbnail-image">
                    {project.image ? (
                      <img src={project.image} alt={project.name} />
                    ) : null}
                  </div>
                  <span className="thumbnail-name">{project.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="projects-footer">
        <Folders size={20} weight="fill" className="footer-icon" />
        <span className="footer-count">{displayedProjects.length} {t('items')}</span>
      </div>
    </div>
  );
}

export default ProjectsWindow;