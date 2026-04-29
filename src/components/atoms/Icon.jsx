import { User, UserCircle, EnvelopeSimple, Folder, PaintBrush, Globe, Door, House, SpeakerSimpleHigh, SpeakerSimpleX, SpeakerSimpleSlash, SpeakerSimpleLow, GithubLogo, LinkedinLogo, Phone, ChatsCircle } from '@phosphor-icons/react';

const iconMap = {
  user: User,
  'user-circle': UserCircle,
  mailbox: EnvelopeSimple,
  folder: Folder,
  paintbrush: PaintBrush,
  globe: Globe,
  door: Door,
  house: House,
  'speaker-high': SpeakerSimpleHigh,
  'speaker-x': SpeakerSimpleX,
  'speaker-slash': SpeakerSimpleSlash,
  'speaker-low': SpeakerSimpleLow,
  email: EnvelopeSimple,
  github: GithubLogo,
  linkedin: LinkedinLogo,
  phone: Phone,
  whatsapp: ChatsCircle,
};

function Icon({ name, size = 32, className = '', weight = 'fill' }) {
  const PhosphorIcon = iconMap[name];
  
  if (!PhosphorIcon) {
    return <span className={`icon ${className}`}>?</span>;
  }
  
  return <PhosphorIcon size={size} weight={weight} className={className} />;
}

export default Icon;