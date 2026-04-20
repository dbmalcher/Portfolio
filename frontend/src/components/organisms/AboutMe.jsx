import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import './AboutMe.css';

const skillsData = {
  en: [
    { category: 'languages', items: 'Portuguese (native), English (advanced)' },
    { category: 'design', items: 'High-Fidelity Prototyping, Design System, UX Writing' },
    { category: 'methodologies', items: 'SCRUM, Kanban, Design Thinking, Agile' },
    { category: 'research', items: 'Requirements Gathering, Personas, Journey Mapping, Usability Testing' },
    { category: 'tools', items: 'Figma, Adobe Photoshop, Adobe Illustrator, Clip Studio Paint, Miro, Notion' },
    { category: 'abilities', items: 'Assertive Communication, Squad Leadership, Backlog Prioritization, Self-Management' },
  ],
  pt: [
    { category: 'languages', items: 'Português (nativo), Inglês (avançado)' },
    { category: 'design', items: 'Prototipagem de Alta Fidelidade, Sistema de Design, UX Writing' },
    { category: 'methodologies', items: 'SCRUM, Kanban, Design Thinking, Agile' },
    { category: 'research', items: 'Levantamento de Requisitos, Personas, Mapeamento de Jornada, Teste de Usabilidade' },
    { category: 'tools', items: 'Figma, Adobe Photoshop, Adobe Illustrator, Clip Studio Paint, Miro, Notion' },
    { category: 'abilities', items: 'Comunicação Assertiva, Liderança de Squad, Priorização de Backlog, Autogerenciamento' },
  ],
};

const experienceData = {
  en: [
    {
      company: 'SASI Agile Communication',
      role: 'Product Designer & UI/UX',
      location: 'Manaus, AM',
      period: 'August 2024 - Currently',
      description: '• Interface Design: Development of intuitive and accessible interfaces for smart sanitation system, ensuring excellent user experience\n• Requirements Gathering: Gathering and documentation of functional and non-functional requirements through stakeholder interviews and process analysis\n• Team Leadership: Leadership and coordination of multidisciplinary team, conducting agile rituals and ensuring on-time deliveries\n• Project Documentation: Elaboration and maintenance of technical and product documentation, including design specifications and style guides\n• AI Optimization: Implementation of artificial intelligence tools for workflow optimization and automation of repetitive tasks in the design process, reducing manual task time by 60%',
    },
    {
      company: 'Smart Security FEMTOLAB',
      role: 'Product Designer & UI/UX',
      location: 'Manaus, AM',
      period: 'March 2023 - March 2024',
      description: '• End-to-End Product Design: Full leadership of product lifecycle, from conception to implementation\n• Research & Discovery: Stakeholder interviews, persona definition and user journey mapping\n• Interface Design: Creation of interfaces in Figma with validated prototypes and own design system\n• Product Strategy: Roadmap definition, feature prioritization and scope management with clients\n• Team Leadership: Leadership of Front-End team, conducting agile rituals and code reviews\n• Multidisciplinary Communication: Point of contact between software, hardware teams and clients for expectation alignment\n• Foreign Client Communication: Direct communication in English with international clients for expectation alignment and delivery presentations',
    },
    {
      company: 'Smart Line Pos CalComp',
      role: 'Identity Designer & 3D Modeler',
      location: 'Manaus, AM',
      period: 'April 2023 - October 2023',
      description: '• Immersive Experience: Development of Virtual Reality experiences for Vive Focus 3, creating interactive trainings for industrial clients\n• 3D Modeling: Modeling of 3D assets optimized for industrial training in Blender, reducing production costs of educational materials\n• Creative Direction: Visual identity definition and art direction for immersive projects, ensuring brand visual coherence\n• Foreign Client Communication: Direct communication in English with international clients for expectation alignment and delivery presentations',
    },
    {
      company: 'BPMS FEMTOLAB',
      role: 'UI/UX Designer',
      location: 'Manaus, AM',
      period: 'January 2023 - April 2023',
      description: '• Design System: Creation and implementation of unified design system for component standardization, reducing inconsistencies and development time\n• Team Management: Leadership and distribution of activities for 3-person Front-End team, ensuring on-time delivery\n• Interface Consistency: Ensuring visual and interaction consistency across all system screens, resulting in unified user experience',
    },
    {
      company: 'Lively IoT Catheter FEMTOLAB',
      role: 'Full-Stack Developer',
      location: 'Manaus, AM',
      period: 'August 2022 - December 2022',
      description: '• Full-Stack Development: Development of web system with IoT integration for medical equipment, ensuring real-time communication\n• Technologies: TypeScript, Node.JS, HTML, CSS, PostgreSQL\n• Problem Solving: Solving complex hardware-software integration problems, ensuring system stability',
    },
  ],
  pt: [
    {
      company: 'SASI Agile Communication',
      role: 'Product Designer & UI/UX',
      location: 'Manaus, AM',
      period: 'Agosto 2024 - Atual',
      description: '• Interface Design: Desenvolvimento de interfaces intuitivas e acessíveis para sistema de saneamento inteligente, garantindo excelente experiência do usuário\n• Levantamento de Requisitos: Coleta e documentação de requisitos funcionais e não funcionais através de entrevistas com stakeholders e análise de processos\n• Liderança de Equipe: Liderança e coordenação de equipe multidisciplinar, conduzindo rituais ágeis e garantizando entregas no prazo\n• Documentação de Projetos: Elaboração e manutenção de documentação técnica e de produto, incluindo especificações de design e guias de estilo\n• Otimização com IA: Implementação de ferramentas de inteligência artificial para otimização de fluxos de trabalho e automação de tarefas repetitivas no processo de design, reduzindo o tempo de tarefas manuais em 60%',
    },
    {
      company: 'Smart Security FEMTOLAB',
      role: 'Product Designer & UI/UX',
      location: 'Manaus, AM',
      period: 'Março 2023 - Março 2024',
      description: '• Design de Produto End-to-End: Liderança completa do ciclo de vida do produto, da concepção à implementação\n• Pesquisa & Discovery: Entrevistas com stakeholders, definição de personas e mapeamento de jornada do usuário\n• Interface Design: Criação de interfaces no Figma com protótipos validados e sistema de design próprio\n• Estratégia de Produto: Definição de roadmap, priorização de funcionalidades e gestão de escopo com clientes\n• Liderança de Equipe: Liderança do time de Front-End, conduzindo rituais ágeis e code reviews\n• Comunicação Multidisciplinar: Ponto de contato entre equipes de software, hardware e clientes para alinhamento de expectativas\n• Comunicação com Cliente Estrangeiro: Comunicação direta em inglês com clientes internacionais para alinhamento de expectativas e apresentações de entrega',
    },
    {
      company: 'Smart Line Pos CalComp',
      role: 'Identity Designer & 3D Modeler',
      location: 'Manaus, AM',
      period: 'Abril 2023 - Outubro 2023',
      description: '• Experiência Imersiva: Desenvolvimento de experiências de Realidade Virtual para Vive Focus 3, criando treinamentos interativos para clientes industriais\n• Modelagem 3D: Modelagem de assets 3D otimizados para treinamentos industriais no Blender, reduzindo custos de produção de materiais educacionais\n• Direção Criativa: Definição de identidade visual e direção de arte para projetos imersivos, garantindo coerência visual da marca\n• Comunicação com Cliente Estrangeiro: Comunicação direta em inglês com clientes internacionais para alinhamento de expectativas e apresentações de entrega',
    },
    {
      company: 'BPMS FEMTOLAB',
      role: 'UI/UX Designer',
      location: 'Manaus, AM',
      period: 'Janeiro 2023 - Abril 2023',
      description: '• Sistema de Design: Criação e implementação de sistema de design unificado para padronização de componentes, reduzindo inconsistências e tempo de desenvolvimento\n• Gestão de Equipe: Liderança e distribuição de atividades para equipe de 3 pessoas de Front-End, garantindo entrega no prazo\n• Consistência de Interface: Garantia de consistência visual e de interação em todas as telas do sistema, resultando em experiência de usuário unificada',
    },
    {
      company: 'Lively IoT Catheter FEMTOLAB',
      role: 'Full-Stack Developer',
      location: 'Manaus, AM',
      period: 'Agosto 2022 - Dezembro 2022',
      description: '• Desenvolvimento Full-Stack: Desenvolvimento de sistema web com integração IoT para equipamentos médicos, garantindo comunicação em tempo real\n• Tecnologias: TypeScript, Node.JS, HTML, CSS, PostgreSQL\n• Resolução de Problemas: Resolução de problemas complexos de integração hardware-software, garantindo estabilidade do sistema',
    },
  ],
};

const educationData = {
  en: {
    degrees: [
      {
        institution: 'Presbyterian University of Mackenzie',
        degree: 'Postgraduate in Product Design',
        location: 'Manaus, AM',
        period: '2025 - Currently',
        highlight: 'Focus: UX Research, Agile Methodologies, Information Architecture',
      },
      {
        institution: 'State University of Amazonas - School of Technology',
        degree: "Bachelor's Degree in Computer Engineering",
        location: 'Manaus, AM',
        period: '2018 - 2025',
        highlight: 'Technical training in software and systems development',
      },
      {
        institution: 'UniCesumar Campus Vieiralves',
        degree: 'Graphic Design',
        location: 'Manaus, AM',
        period: '2024 - Currently',
        highlight: 'Focus: Visual Identity, Typography, Composition',
      },
    ],
    courses: [
      {
        institution: 'Moto Academy',
        course: 'WEB FULLSTACK Training Course',
        period: '',
        description: 'ELDORADO',
        highlight: 'Learning: Complete fullstack web development, starting with GitHub and versioning, passing through HTML, CSS and JavaScript, following with Angular and Node.js frameworks. The course concluded with a hands-on practical project that was deployed on Google Cloud as the final project.',
      },
    ],
  },
pt: {
    degrees: [
      {
        institution: 'Universidade Presbiteriana Mackenzie',
        degree: 'Pós-graduação em Product Design',
        location: 'Manaus, AM',
        period: '2025 - Atualmente',
        highlight: 'Foco: UX Research, Metodologias Ágeis, Arquitetura da Informação',
      },
      {
        institution: 'Universidade do Estado do Amazonas - Escola de Tecnologia',
        degree: 'Bacharelado em Engenharia de Computação',
        location: 'Manaus, AM',
        period: '2018 - 2025',
        highlight: 'Formação técnica em desenvolvimento de software e sistemas',
      },
      {
        institution: 'UniCesumar Campus Vieiralves',
        degree: 'Design Gráfico',
        location: 'Manaus, AM',
        period: '2024 - Currently',
        highlight: 'Foco: Identidade Visual, Tipografia, Composição',
      },
    ],
    courses: [
      {
        institution: 'Moto Academy',
        course: 'Treinamento WEB FULLSTACK',
        period: '',
        description: 'ELDORADO',
        highlight: 'Aprendizado: Desenvolvimento web fullstack completo, começando com GitHub e versionamento, passando por HTML, CSS e JavaScript, seguindo com frameworks Angular e Node.js. O curso conclusion com um projeto prático Hands-on que foi implantado no Google Cloud como projeto final.',
      },
    ],
  },
};

function AboutMe() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('about');
  const skills = skillsData[language];
  const experiences = experienceData[language];
  const education = educationData[language];

  const tabs = [
    { id: 'about', label: t('tabAbout') },
    { id: 'experience', label: t('tabExperience') },
    { id: 'education', label: t('tabEducation') },
  ];

  return (
    <div className="about-me">
      <div className="about-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="about-container">
        <div className="about-tab-content">
          {activeTab === 'about' && (
            <>
              <div className="about-header">
                <div className="about-photo">
                  <span className="photo-placeholder">📷</span>
                </div>
                <div className="about-info">
                  <h2 className="about-name">Daniel Benoliel Malcher</h2>
                  <p className="about-role">{t('productDesigner')}</p>
                </div>
              </div>
              <div className="about-content">
                <p className="about-description">
                  {t('aboutDescription')}
                </p>
              </div>
              <div className="about-skills">
                <h3 className="about-skills-title">{t('aboutSkillsTitle')}</h3>
                <div className="skills-grid">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <span className="skill-category">{t(skill.category)}:</span>
                      <span className="skill-items">{skill.items}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

{activeTab === 'experience' && (
          <div className="experience-section">
            <h3 className="section-title">{t('professionalExperience')}</h3>
            <div className="timeline with-line">
              {experiences.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-period">{exp.period}</span>
                    <h4 className="timeline-role">{exp.role}</h4>
                    <p className="timeline-company">{exp.company} · {exp.location}</p>
                    <p className="timeline-tasks">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

          {activeTab === 'education' && (
            <div className="education-section">
              <div className="education-group">
                <h3 className="section-title">{t('degrees')}</h3>
                <div className="timeline">
                  {education.degrees.map((deg, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <span className="timeline-period">{deg.period}</span>
                        <h4 className="timeline-role">{deg.degree}</h4>
                        <p className="timeline-company">{deg.institution} · {deg.location}</p>
                        {deg.highlight && <p className="timeline-tasks">{deg.highlight}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="education-group">
                <h3 className="section-title">{t('courses')}</h3>
                <div className="timeline">
                  {education.courses.map((course, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <span className="timeline-period">{course.period}</span>
                        <h4 className="timeline-role">{course.course}</h4>
                        <p className="timeline-company">{course.institution} · {course.description}</p>
                        {course.highlight && <p className="timeline-tasks">{course.highlight}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
