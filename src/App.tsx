import React, { useState, useEffect, useRef } from 'react';
import { createClient, User } from '@supabase/supabase-js';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Upload,
  Trash2,
  LogIn,
  LogOut,
  Music,
  Search,
  Lock,
  X,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Copy,
  Check,
  HelpCircle,
  ExternalLink,
  UserPlus,
  Smartphone,
  Rocket,
  Globe,
  Home,
  Library,
  Plus,
  Heart,
  MoreVertical,
  Cast,
  Headphones,
  Bell,
  Clock,
  Battery,
  ArrowLeft,
  Shuffle,
  Download,
  Folder,
  Image as ImageIcon,
  Share2
} from 'lucide-react';

// ==========================================
// 1. CONFIGURACIÓN Y CLIENTE SUPABASE
// ==========================================
export const SUPABASE_URL = 'https://djqjagjaywphhaoonbdq.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_ksSF0e-Rml3_zgrbccACag_TVw6nhKw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface Song {
  id: string | number;
  titulo: string;
  artista: string;
  url: string;
  storage_path: string;
  created_at?: string | null;
  cover?: string;
}

export interface AudioFolder {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  coverKey: string;
  badge?: string;
  canciones: Song[];
}

export const carpetasAudio: AudioFolder[] = [
  {
    id: 'buchonass',
    titulo: 'buchonass',
    subtitulo: 'El Fantasma, Los Dos Carnales, Calibre 50, Peso Pluma',
    descripcion: 'Carpeta oficial de corridos, música bélica y regional mexicano de FINANCIERA AARON.',
    coverKey: 'cover_buchonass',
    badge: 'Corridos & Regional',
    canciones: [
      {
        id: 'buch_1',
        titulo: 'El Tóxico',
        artista: 'Grupo Firme & Carin Leon',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_2',
        titulo: 'El Envidioso',
        artista: 'Los Dos Carnales',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_3',
        titulo: 'Cabrón y Vago',
        artista: 'El Fantasma & Los Dos Carnales',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_4',
        titulo: 'Siempre Pendientes',
        artista: 'Peso Pluma & Luis R Conriquez',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_5',
        titulo: 'JGL',
        artista: 'La Adictiva & Luis R Conriquez',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_6',
        titulo: 'Ch y la Pizza',
        artista: 'Fuerza Regida & Natanael Cano',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_7',
        titulo: 'PRC',
        artista: 'Peso Pluma & Natanael Cano',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      }
    ]
  },
  {
    id: 'tus_me_gusta',
    titulo: 'Tus me gusta',
    subtitulo: 'Tus temas favoritos y canciones subidas a Supabase',
    descripcion: 'Carpeta personal y sincronizada en la nube. Todas las canciones que subas aparecerán aquí.',
    coverKey: 'cover_tus_me_gusta',
    badge: 'Favoritos & En la Nube',
    canciones: [
      {
        id: 'fav_1',
        titulo: '23 (Remix)',
        artista: 'Mike WiLL Made-It, Miley Cyrus, Wiz Khalifa',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        storage_path: '',
        cover: 'cover_23'
      },
      {
        id: 'fav_2',
        titulo: 'Safaera',
        artista: 'Bad Bunny, Jowell & Randy',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      },
      {
        id: 'fav_3',
        titulo: 'La Incondicional',
        artista: 'Luis Miguel',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      },
      {
        id: 'fav_4',
        titulo: 'No Se Va',
        artista: 'Grupo Frontera',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        storage_path: '',
        cover: 'cover_lob'
      }
    ]
  },
  {
    id: 'perreale',
    titulo: 'Perreale',
    subtitulo: 'Bad Bunny, Feid, Karol G, Miley Cyrus, Wiz Khalifa',
    descripcion: 'Carpeta de reggaetón, perreo intenso y ritmos urbanos latinos.',
    coverKey: 'cover_perreale',
    badge: 'Reggaetón & Perreo',
    canciones: [
      {
        id: 'perr_1',
        titulo: '23',
        artista: 'de-It, Miley Cyrus, Wiz Khalifa',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        storage_path: '',
        cover: 'cover_23'
      },
      {
        id: 'perr_2',
        titulo: 'Monaco',
        artista: 'Bad Bunny',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      },
      {
        id: 'perr_3',
        titulo: 'Classy 101',
        artista: 'Feid & Young Miko',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      },
      {
        id: 'perr_4',
        titulo: 'LALA',
        artista: 'Myke Towers',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      },
      {
        id: 'perr_5',
        titulo: 'TQG',
        artista: 'Karol G & Shakira',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      },
      {
        id: 'perr_6',
        titulo: 'Yandel 150',
        artista: 'Yandel & Feid',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      }
    ]
  },
  {
    id: 'lob_songs',
    titulo: 'LOB SONGS',
    subtitulo: 'Nueva Marca, Marca Registrada, Grupo Firme, Grupo Frontera',
    descripcion: 'Lo más nuevo de banda, campirano y sierreño en alta fidelidad.',
    coverKey: 'cover_lob',
    badge: 'Banda & Grupero',
    canciones: [
      {
        id: 'lob_1',
        titulo: 'No Se Va',
        artista: 'Grupo Frontera',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        storage_path: '',
        cover: 'cover_lob'
      },
      {
        id: 'lob_2',
        titulo: 'Ya Supérame',
        artista: 'Grupo Firme',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        storage_path: '',
        cover: 'cover_lob'
      },
      {
        id: 'lob_3',
        titulo: 'Di Que Sí',
        artista: 'Grupo Marca Registrada & Frontera',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        storage_path: '',
        cover: 'cover_lob'
      },
      {
        id: 'lob_4',
        titulo: 'El Rescate',
        artista: 'Grupo Marca Registrada & Junior H',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        storage_path: '',
        cover: 'cover_lob'
      },
      {
        id: 'lob_5',
        titulo: 'Bebé Dame',
        artista: 'Fuerza Regida & Grupo Frontera',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
        storage_path: '',
        cover: 'cover_lob'
      }
    ]
  },
  {
    id: 'los_2000',
    titulo: "los 2000'",
    subtitulo: 'High School Musical, Camp Rock, Jonas Brothers, Avril Lavigne',
    descripcion: 'Nostalgia pura de la década dorada de los 2000s Pop & Soundtracks.',
    coverKey: 'cover_2000',
    badge: 'Nostalgia Pop 2000s',
    canciones: [
      {
        id: '2000_1',
        titulo: 'Breaking Free',
        artista: 'High School Musical Cast',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        storage_path: '',
        cover: 'cover_2000'
      },
      {
        id: '2000_2',
        titulo: 'This Is Me',
        artista: 'Camp Rock & Demi Lovato',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        storage_path: '',
        cover: 'cover_2000'
      },
      {
        id: '2000_3',
        titulo: 'Year 3000',
        artista: 'Jonas Brothers',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        storage_path: '',
        cover: 'cover_2000'
      },
      {
        id: '2000_4',
        titulo: 'Complicated',
        artista: 'Avril Lavigne',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        storage_path: '',
        cover: 'cover_2000'
      },
      {
        id: '2000_5',
        titulo: 'Toxic',
        artista: 'Britney Spears',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
        storage_path: '',
        cover: 'cover_2000'
      }
    ]
  },
  {
    id: 'grwm',
    titulo: 'GRWM🍒💋⭐💍',
    subtitulo: 'Rihanna, Wiz Khalifa, Ariana Grande, Dua Lipa',
    descripcion: 'Get Ready With Me: Pop, Hip-Hop y R&B glamoroso para motivarte.',
    coverKey: 'cover_grwm',
    badge: 'Pop & Glam',
    canciones: [
      {
        id: 'grwm_1',
        titulo: 'Diamonds',
        artista: 'Rihanna',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        storage_path: '',
        cover: 'cover_grwm'
      },
      {
        id: 'grwm_2',
        titulo: '7 rings',
        artista: 'Ariana Grande',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        storage_path: '',
        cover: 'cover_grwm'
      },
      {
        id: 'grwm_3',
        titulo: 'Swalla',
        artista: 'Jason Derulo, Nicki Minaj & Ty Dolla $ign',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        storage_path: '',
        cover: 'cover_grwm'
      },
      {
        id: 'grwm_4',
        titulo: 'Young, Wild & Free',
        artista: 'Snoop Dogg & Wiz Khalifa',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
        storage_path: '',
        cover: 'cover_grwm'
      },
      {
        id: 'grwm_5',
        titulo: 'Levitating',
        artista: 'Dua Lipa',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        storage_path: '',
        cover: 'cover_grwm'
      }
    ]
  },
  {
    id: 'baladas',
    titulo: 'Baladas Románticas',
    subtitulo: 'Luis Miguel, Cristian Castro, Chayanne, Alejandro Fernández',
    descripcion: 'Las joyas románticas más apasionadas que marcaron generaciones.',
    coverKey: 'cover_baladas',
    badge: 'Clásicos Románticos',
    canciones: [
      {
        id: 'bal_1',
        titulo: 'La Incondicional',
        artista: 'Luis Miguel',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      },
      {
        id: 'bal_2',
        titulo: 'Por Amarte Así',
        artista: 'Cristian Castro',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      },
      {
        id: 'bal_3',
        titulo: 'Si Nos Dejan',
        artista: 'Luis Miguel',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      },
      {
        id: 'bal_4',
        titulo: 'Me Dediqué a Perderte',
        artista: 'Alejandro Fernández',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      },
      {
        id: 'bal_5',
        titulo: 'Dejaría Todo',
        artista: 'Chayanne',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      }
    ]
  },
  {
    id: 'la_reina',
    titulo: 'La Reina: Éxitos de la ...',
    subtitulo: 'Selena Quintanilla y Reinas de la Música Latina',
    descripcion: 'Homenaje a Selena y las grandes voces de la música hispana.',
    coverKey: 'cover_reina',
    badge: 'Tributo Legendario',
    canciones: [
      {
        id: 'reina_1',
        titulo: 'Amor Prohibido',
        artista: 'Selena',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        storage_path: '',
        cover: 'cover_reina'
      },
      {
        id: 'reina_2',
        titulo: 'Como La Flor',
        artista: 'Selena',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        storage_path: '',
        cover: 'cover_reina'
      },
      {
        id: 'reina_3',
        titulo: 'Bidi Bidi Bom Bom',
        artista: 'Selena',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        storage_path: '',
        cover: 'cover_reina'
      },
      {
        id: 'reina_4',
        titulo: 'Si Una Vez',
        artista: 'Selena',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
        storage_path: '',
        cover: 'cover_reina'
      },
      {
        id: 'reina_5',
        titulo: 'No Me Queda Más',
        artista: 'Selena',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        storage_path: '',
        cover: 'cover_reina'
      }
    ]
  },
  {
    id: 'audiolibro',
    titulo: 'Deja de ser tú (latino): La mente crea la real...',
    subtitulo: 'Dr. Joe Dispenza (Audiolibro Completo)',
    descripcion: 'Capítulos de audio para reprogramar tu mente y transformar tu realidad.',
    coverKey: 'cover_audiolibro',
    badge: 'Audiolibro Premium',
    canciones: [
      {
        id: 'audio_1',
        titulo: 'Capítulo 1: La mente cuántica y la realidad',
        artista: 'Dr. Joe Dispenza',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        storage_path: '',
        cover: 'cover_audiolibro'
      },
      {
        id: 'audio_2',
        titulo: 'Capítulo 2: Superar el entorno y las emociones',
        artista: 'Dr. Joe Dispenza',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        storage_path: '',
        cover: 'cover_audiolibro'
      },
      {
        id: 'audio_3',
        titulo: 'Capítulo 3: El hábito de ser tú mismo',
        artista: 'Dr. Joe Dispenza',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        storage_path: '',
        cover: 'cover_audiolibro'
      },
      {
        id: 'audio_4',
        titulo: 'Capítulo 4: Meditación para cambiar el cerebro',
        artista: 'Dr. Joe Dispenza',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
        storage_path: '',
        cover: 'cover_audiolibro'
      },
      {
        id: 'audio_5',
        titulo: 'Capítulo 5: Creando tu nuevo futuro hoy',
        artista: 'Dr. Joe Dispenza',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
        storage_path: '',
        cover: 'cover_audiolibro'
      }
    ]
  },
  {
    id: 'marco_antonio',
    titulo: 'Marco Antonio Solís',
    subtitulo: 'Franco De Vita, Chayanne y Los Bukis',
    descripcion: 'Las mejores poesías cantadas del maestro de maestros Marco Antonio Solís.',
    coverKey: 'cover_marco',
    badge: 'Maestros de la Música',
    canciones: [
      {
        id: 'mas_1',
        titulo: 'Si No Te Hubieras Ido',
        artista: 'Marco Antonio Solís',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        storage_path: '',
        cover: 'cover_marco'
      },
      {
        id: 'mas_2',
        titulo: '¿A Dónde Vamos A Parar?',
        artista: 'Marco Antonio Solís',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        storage_path: '',
        cover: 'cover_marco'
      },
      {
        id: 'mas_3',
        titulo: 'Más Que Tu Amigo',
        artista: 'Marco Antonio Solís',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        storage_path: '',
        cover: 'cover_marco'
      },
      {
        id: 'mas_4',
        titulo: 'Tu Cárcel',
        artista: 'Los Bukis',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        storage_path: '',
        cover: 'cover_marco'
      }
    ]
  },
  {
    id: 'mix_grupero',
    titulo: 'Mix de grupero',
    subtitulo: 'Eden Muñoz, Grupo Mojado, Kany García y más',
    descripcion: 'Pistas seleccionadas con la mejor energía grupera y sentimiento norteño.',
    coverKey: 'cover_grupero',
    badge: 'Mix Grupero Selección',
    canciones: [
      {
        id: 'grup_1',
        titulo: 'Chale',
        artista: 'Edén Muñoz',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        storage_path: '',
        cover: 'cover_grupero'
      },
      {
        id: 'grup_2',
        titulo: 'Tonta',
        artista: 'Grupo Mojado',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        storage_path: '',
        cover: 'cover_grupero'
      },
      {
        id: 'grup_3',
        titulo: 'Calidad',
        artista: 'Grupo Firme',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        storage_path: '',
        cover: 'cover_grupero'
      },
      {
        id: 'grup_4',
        titulo: 'Se Me Antoja Un Tiro',
        artista: 'Edén Muñoz',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        storage_path: '',
        cover: 'cover_grupero'
      }
    ]
  }
];

// Canciones iniciales y de referencia visual de la pantalla
const initialDemoSongs: Song[] = [
  {
    id: 'demo_23',
    titulo: '23',
    artista: 'de-It, Miley Cyrus, Wiz Kh...',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    storage_path: '',
    cover: 'cover_23'
  },
  {
    id: 'demo_buchonass',
    titulo: 'buchonass',
    artista: 'El Fantasma, Los Dos Carnales, Calibre 50',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    storage_path: '',
    cover: 'cover_buchonass'
  },
  {
    id: 'demo_tus_me_gusta',
    titulo: 'Tus me gusta',
    artista: 'Lista de canciones favoritas',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    storage_path: '',
    cover: 'cover_tus_me_gusta'
  },
  {
    id: 'demo_perreale',
    titulo: 'Perreale',
    artista: 'Bad Bunny, Feid, Karol G, Anuel AA',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    storage_path: '',
    cover: 'cover_perreale'
  },
  {
    id: 'demo_lob_songs',
    titulo: 'LOB SONGS',
    artista: 'Nueva Marca, Marca Registrada, Grupo Firme',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    storage_path: '',
    cover: 'cover_lob'
  },
  {
    id: 'demo_los_2000',
    titulo: "los 2000'",
    artista: 'High School Musical, Camp Rock, Jonas Brothers',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    storage_path: '',
    cover: 'cover_2000'
  },
  {
    id: 'demo_grwm',
    titulo: 'GRWM🍒💋⭐💍',
    artista: 'Rihanna, Wiz Khalifa, Ariana Grande',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    storage_path: '',
    cover: 'cover_grwm'
  },
  {
    id: 'demo_baladas',
    titulo: 'Baladas Románticas',
    artista: 'Luis Miguel, Cristian Castro, Chayanne',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    storage_path: '',
    cover: 'cover_baladas'
  },
  {
    id: 'demo_la_reina',
    titulo: 'La Reina: Éxitos de la ...',
    artista: 'Grandes Éxitos de la Música',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    storage_path: '',
    cover: 'cover_reina'
  },
  {
    id: 'demo_audiolibro',
    titulo: 'Deja de ser tú (latino): La mente crea la real...',
    artista: 'Dr. Joe Dispenza (Audiolibro)',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    storage_path: '',
    cover: 'cover_audiolibro'
  },
  {
    id: 'demo_marco_antonio',
    titulo: 'Marco Antonio Solís',
    artista: 'Franco De Vita, Chayanne y Los Bukis',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    storage_path: '',
    cover: 'cover_marco'
  },
  {
    id: 'demo_mix_grupero',
    titulo: 'Mix de grupero',
    artista: 'Eden Muñoz, Grupo Mojado, Kany García y...',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    storage_path: '',
    cover: 'cover_grupero'
  }
];

export default function App() {
  // Estado de autenticación
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('mejiamejiaaaron@gmail.com');
  const [password, setPassword] = useState<string>('Admin2026*');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Navegación por pestañas y filtros idénticos al screenshot
  const [activeTab, setActiveTab] = useState<'inicio' | 'buscar' | 'biblioteca'>('inicio');
  const [activeFilter, setActiveFilter] = useState<'Todas' | 'Música' | 'Podcasts' | 'Audiolibros'>('Todas');

  // Estado de canciones y reproductor
  const [canciones, setCanciones] = useState<Song[]>(initialDemoSongs);
  const [currentSong, setCurrentSong] = useState<Song | null>(initialDemoSongs[0]); // Pista 23 por defecto
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(215); // Duración ejemplo 3:35
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Estado del formulario de subida
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customArtist, setCustomArtist] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modales adicionales y Navegación de Carpetas
  const [selectedFolder, setSelectedFolder] = useState<AudioFolder | null>(null);
  const [folderLiked, setFolderLiked] = useState<Record<string, boolean>>({});
  const [showRlsModal, setShowRlsModal] = useState<boolean>(false);
  const [sqlCopied, setSqlCopied] = useState<boolean>(false);
  const [showDeployModal, setShowDeployModal] = useState<boolean>(false);
  const [showInstallGuideModal, setShowInstallGuideModal] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // SQL para resolver el error de RLS de Supabase Storage
  const rlsSql = `-- 1. Permitir que cualquier usuario autenticado o anónimo suba archivos al bucket "musica":
CREATE POLICY "Permitir subida a bucket musica"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'musica');

-- 2. Permitir lectura pública de las canciones:
CREATE POLICY "Permitir lectura en bucket musica"
ON storage.objects FOR SELECT
USING (bucket_id = 'musica');

-- 3. Permitir eliminar archivos del bucket:
CREATE POLICY "Permitir eliminar en bucket musica"
ON storage.objects FOR DELETE
USING (bucket_id = 'musica');`;

  const copyRlsSql = () => {
    navigator.clipboard.writeText(rlsSql);
    setSqlCopied(true);
    triggerToast('¡SQL copiado al portapapeles!', 'success');
    setTimeout(() => setSqlCopied(false), 3000);
  };

  // ==========================================
  // INICIALIZACIÓN: SESIÓN & CARGAR CANCIONES
  // ==========================================
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    cargarCanciones();

    const channel = supabase
      .channel('canciones-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'canciones' }, () => {
        cargarCanciones();
      })
      .subscribe();

    const checkStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(checkStandalone);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 's' || e.key === 'u' || e.key === 'p')) || e.key === 'F12') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        triggerToast('¡FINANCIERA AARON se ha instalado en tu pantalla de inicio!', 'success');
        setDeferredPrompt(null);
      }
    } else {
      setShowInstallGuideModal(true);
    }
  };

  const cargarCanciones = async () => {
    try {
      const { data, error } = await supabase
        .from('canciones')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Mezclar las canciones de Supabase con las canciones de la UI
        const supabaseSongs: Song[] = data.map((d) => ({
          ...d,
          cover: 'cover_supabase'
        }));
        setCanciones([...supabaseSongs, ...initialDemoSongs]);
        return;
      }

      // Si la tabla no tiene datos aún, listar archivos del bucket musica
      const { data: storageList } = await supabase.storage.from('musica').list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      });

      if (storageList && storageList.length > 0) {
        const cancionesBucket: Song[] = storageList
          .filter((item) => !item.name.startsWith('.'))
          .map((item) => {
            const { data: urlData } = supabase.storage.from('musica').getPublicUrl(item.name);
            const cleanName = item.name.replace(/^\d+_/, '').replace(/\.[^/.]+$/, '');
            return {
              id: item.id || item.name,
              titulo: cleanName || 'Pista Supabase',
              artista: 'Artista Supabase',
              url: urlData.publicUrl,
              storage_path: item.name,
              created_at: item.created_at,
              cover: 'cover_supabase'
            };
          });

        if (cancionesBucket.length > 0) {
          setCanciones([...cancionesBucket, ...initialDemoSongs]);
        }
      }
    } catch (err) {
      console.warn('Nota al cargar canciones:', err);
    }
  };

  // ==========================================
  // AUTENTICACIÓN
  // ==========================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError(null);

    try {
      if (isSignUpMode) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });
        if (error) {
          setAuthError(error.message);
          triggerToast(`Error al registrar: ${error.message}`, 'error');
          return;
        }
        if (data?.user) {
          setUser(data.user);
          setShowLoginModal(false);
          triggerToast(`¡Usuario conectado: ${data.user.email}!`, 'success');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          setAuthError(error.message);
          triggerToast(`Error de login: ${error.message}`, 'error');
          return;
        }

        if (data?.user) {
          setUser(data.user);
          setShowLoginModal(false);
          triggerToast(`¡Bienvenido, ${data.user.email}!`, 'success');
        }
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setAuthError(errMsg);
      triggerToast(`Error: ${errMsg}`, 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    triggerToast('Sesión cerrada correctamente', 'success');
  };

  // ==========================================
  // SUBIDA AL STORAGE SUPABASE
  // ==========================================
  async function subirCancion(file: File) {
    if (!user) {
      alert('Debes iniciar sesión con una cuenta para poder subir música a Supabase.');
      setShowLoginModal(true);
      return;
    }

    if (!file) {
      alert('Por favor selecciona un archivo de audio MP3.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Subiendo archivo al bucket musica...');

    const songTitle =
      customTitle.trim() ||
      file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
    const songArtist = customArtist.trim() || 'Desconocido';

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const ruta = `${Date.now()}_${sanitizedName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('musica')
        .upload(ruta, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type || 'audio/mpeg'
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from('musica')
        .getPublicUrl(ruta);

      const publicUrl = urlData?.publicUrl;
      if (!publicUrl) {
        throw new Error('No se pudo generar la URL pública del archivo subido.');
      }

      const nuevaCancion: Song = {
        id: uploadData?.path || ruta,
        titulo: songTitle,
        artista: songArtist,
        url: publicUrl,
        storage_path: ruta,
        created_at: new Date().toISOString(),
        cover: 'cover_supabase'
      };

      try {
        const { data: dbData, error: dbErr } = await supabase
          .from('canciones')
          .insert([
            {
              titulo: songTitle,
              artista: songArtist,
              url: publicUrl,
              storage_path: ruta,
              created_at: new Date().toISOString()
            }
          ])
          .select();

        if (!dbErr && dbData && dbData.length > 0) {
          nuevaCancion.id = dbData[0].id;
        }
      } catch (dbError) {
        console.warn('Aviso en tabla canciones:', dbError);
      }

      setCanciones((prev) => [nuevaCancion, ...prev]);
      setCurrentSong(nuevaCancion);
      setIsPlaying(true);

      triggerToast('¡Canción subida y lista para reproducir!', 'success');
      setShowUploadModal(false);
      setSelectedFile(null);
      setCustomTitle('');
      setCustomArtist('');
    } catch (error: any) {
      console.error('Error en subirCancion:', error);
      alert(JSON.stringify(error));

      const errStr = JSON.stringify(error) || '';
      const isRlsViolation =
        error?.message?.includes('row-level security') ||
        errStr.includes('row-level security') ||
        error?.statusCode === '42501' ||
        error?.status === 403;

      if (isRlsViolation) {
        setShowRlsModal(true);
      }

      const localAudioUrl = URL.createObjectURL(file);
      const cancionRespaldo: Song = {
        id: 'local_' + Date.now(),
        titulo: `${songTitle} (Audio Local)`,
        artista: songArtist,
        url: localAudioUrl,
        storage_path: '',
        created_at: new Date().toISOString(),
        cover: 'cover_supabase'
      };

      setCanciones((prev) => [cancionRespaldo, ...prev]);
      setCurrentSong(cancionRespaldo);
      setIsPlaying(true);

      setShowUploadModal(false);
      setSelectedFile(null);
      setCustomTitle('');
      setCustomArtist('');
      triggerToast('Audio cargado en reproductor local', 'success');
    } finally {
      setIsUploading(false);
      setUploadStatus('');
    }
  }

  // ==========================================
  // ELIMINAR CANCIÓN
  // ==========================================
  const eliminarCancion = async (song: Song, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      alert('Debes iniciar sesión para realizar esta acción.');
      return;
    }

    const confirmar = window.confirm(`¿Estás seguro de eliminar "${song.titulo}"?`);
    if (!confirmar) return;

    try {
      if (song.storage_path) {
        await supabase.storage.from('musica').remove([song.storage_path]);
      }
      if (typeof song.id === 'number' || !String(song.id).startsWith('local_')) {
        await supabase.from('canciones').delete().eq('id', song.id);
      }

      setCanciones((prev) => prev.filter((item) => item.id !== song.id));
      if (currentSong?.id === song.id) {
        setCurrentSong(initialDemoSongs[0]);
        setIsPlaying(false);
      }
      triggerToast('Canción eliminada correctamente.', 'success');
    } catch (err: unknown) {
      alert(JSON.stringify(err));
    }
  };

  // ==========================================
  // CONTROLES DE REPRODUCCIÓN
  // ==========================================
  const seleccionarCancion = (song: Song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Error al reproducir audio:', err));
    }
  };

  const reproducirSiguiente = () => {
    if (canciones.length === 0) return;
    const currentIndex = canciones.findIndex((s) => s.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % canciones.length;
    setCurrentSong(canciones[nextIndex]);
    setIsPlaying(true);
  };

  const reproducirAnterior = () => {
    if (canciones.length === 0) return;
    const currentIndex = canciones.findIndex((s) => s.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + canciones.length) % canciones.length;
    setCurrentSong(canciones[prevIndex]);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.85;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (segundos: number) => {
    if (isNaN(segundos)) return '00:00';
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current && currentSong?.url) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.warn('Reproducción diferida:', e));
      }
    }
  }, [currentSong]);

  const filteredSongs = canciones.filter(
    (c) =>
      c.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.artista.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==========================================
  // ARTWORK THUMBNAILS (COVERS IDÉNTICOS AL SCREENSHOT)
  // ==========================================
  const renderCover = (coverType?: string, className: string = 'w-14 h-14') => {
    switch (coverType) {
      case 'cover_buchonass':
        return (
          <div className={`${className} grid grid-cols-2 grid-rows-2 shrink-0 bg-neutral-900 rounded-l-md overflow-hidden relative shadow`}>
            <div className="bg-[#b45309] text-[7px] font-black text-amber-200 flex items-center justify-center p-0.5 text-center leading-tight">
              EL TÓXICO
            </div>
            <div className="bg-[#1e3a8a] text-[7px] font-black text-blue-200 flex items-center justify-center p-0.5 text-center leading-tight">
              RECODITOS
            </div>
            <div className="bg-[#451a03] text-[7px] font-black text-amber-100 flex items-center justify-center p-0.5 text-center leading-tight">
              PUERTO
            </div>
            <div className="bg-[#172554] text-[7px] font-black text-white flex items-center justify-center p-0.5 text-center leading-tight">
              FANTASÍA
            </div>
          </div>
        );

      case 'cover_tus_me_gusta':
        return (
          <div className={`${className} bg-gradient-to-br from-[#4c1d95] via-[#6366f1] to-[#3b82f6] flex items-center justify-center shrink-0 rounded-l-md shadow`}>
            <Heart className="w-6 h-6 text-white fill-current drop-shadow" />
          </div>
        );

      case 'cover_perreale':
        return (
          <div className={`${className} grid grid-cols-2 grid-rows-2 shrink-0 bg-neutral-950 rounded-l-md overflow-hidden shadow`}>
            <div className="bg-red-700 text-[6px] font-black text-yellow-300 flex items-center justify-center">PLAYER</div>
            <div className="bg-neutral-900 text-[8px] font-black text-red-500 flex items-center justify-center">23</div>
            <div className="bg-pink-700 text-[6px] font-black text-white flex items-center justify-center">PERREO</div>
            <div className="bg-red-600 text-[6px] font-black text-white flex items-center justify-center">GUETTA</div>
          </div>
        );

      case 'cover_lob':
        return (
          <div className={`${className} grid grid-cols-2 grid-rows-2 shrink-0 bg-[#1c1917] rounded-l-md overflow-hidden shadow`}>
            <div className="bg-[#292524] text-[6px] font-bold text-amber-300 flex items-center justify-center">NUEVA</div>
            <div className="bg-[#44403c] text-[6px] font-bold text-white flex items-center justify-center">COVERS</div>
            <div className="bg-[#1c1917] text-[6px] font-bold text-amber-400 flex items-center justify-center">REGISTRADA</div>
            <div className="bg-[#0c0a09] text-[6px] font-bold text-yellow-500 flex items-center justify-center">FIRME</div>
          </div>
        );

      case 'cover_2000':
        return (
          <div className={`${className} grid grid-cols-2 grid-rows-2 shrink-0 bg-neutral-900 rounded-l-md overflow-hidden shadow`}>
            <div className="bg-rose-600 text-[6px] font-black text-white flex items-center justify-center">HSM</div>
            <div className="bg-amber-500 text-[6px] font-black text-neutral-900 flex items-center justify-center">CAMP</div>
            <div className="bg-cyan-600 text-[6px] font-black text-white flex items-center justify-center">POP</div>
            <div className="bg-indigo-600 text-[6px] font-black text-white flex items-center justify-center">ROCK</div>
          </div>
        );

      case 'cover_grwm':
        return (
          <div className={`${className} grid grid-cols-2 grid-rows-2 shrink-0 bg-neutral-950 rounded-l-md overflow-hidden shadow`}>
            <div className="bg-neutral-800 text-[6px] font-bold text-gray-300 flex items-center justify-center">DERULO</div>
            <div className="bg-neutral-900 text-[6px] font-bold text-pink-400 flex items-center justify-center">RIHANNA</div>
            <div className="bg-stone-900 text-[6px] font-bold text-amber-200 flex items-center justify-center">YOUNG</div>
            <div className="bg-neutral-800 text-[6px] font-bold text-white flex items-center justify-center">WIZ</div>
          </div>
        );

      case 'cover_baladas':
        return (
          <div className={`${className} bg-gradient-to-tr from-[#881337] via-[#e11d48] to-[#9f1239] flex flex-col items-center justify-center p-1 shrink-0 rounded-l-md shadow relative`}>
            <div className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-white/40 flex items-center justify-center text-[5px]">●</div>
            <span className="text-[7px] text-white font-extrabold text-center leading-none mt-2">
              Baladas<br />Románticas
            </span>
          </div>
        );

      case 'cover_reina':
        return (
          <div className={`${className} bg-[#262626] border border-white/5 flex items-center justify-center shrink-0 rounded-l-md shadow`}>
            <ImageIcon className="w-6 h-6 text-gray-400 stroke-[1.5]" />
          </div>
        );

      case 'cover_23':
        return (
          <div className={`${className} bg-[#881337] border border-white/20 flex flex-col items-center justify-center p-1 shrink-0 rounded shadow`}>
            <span className="text-[14px] font-black text-white tracking-tighter leading-none">23</span>
            <span className="text-[6px] font-bold text-red-200 uppercase tracking-widest mt-0.5">MIKE WILL</span>
          </div>
        );

      default:
        return (
          <div className={`${className} bg-gradient-to-br from-[#1E90FF] to-[#E91E63] flex items-center justify-center shrink-0 rounded-l-md shadow`}>
            <Music className="w-6 h-6 text-white" />
          </div>
        );
    }
  };
  // ==========================================
  // GESTIÓN DE CARPETAS DE AUDIOS (PLAYLISTS)
  // ==========================================
  const obtenerCancionesCarpeta = (folder: AudioFolder): Song[] => {
    if (folder.id === 'tus_me_gusta') {
      const cancionesSubidas = canciones.filter(
        (c) => !initialDemoSongs.some((demo) => demo.id === c.id)
      );
      return [...cancionesSubidas, ...folder.canciones];
    }
    return folder.canciones;
  };

  const toggleLikeFolder = (folderId: string) => {
    setFolderLiked((prev) => {
      const nextVal = !prev[folderId];
      triggerToast(
        nextVal ? 'Carpeta guardada en tus favoritas' : 'Carpeta eliminada de favoritas',
        'success'
      );
      return { ...prev, [folderId]: nextVal };
    });
  };

  // Renderizar la vista detallada de la carpeta de audios
  const renderFolderView = (folder: AudioFolder) => {
    const cancionesCarpeta = obtenerCancionesCarpeta(folder);
    const estaReproduciendoCarpeta = cancionesCarpeta.some(
      (c) => c.id === currentSong?.id && isPlaying
    );

    return (
      <div className="space-y-5 animate-fade-in pb-12">
        {/* Barra superior de navegación dentro de la carpeta */}
        <div className="flex items-center justify-between sticky top-0 bg-[#121212]/95 backdrop-blur-md py-2.5 z-20 border-b border-white/5">
          <button
            onClick={() => setSelectedFolder(null)}
            className="flex items-center gap-2 text-xs font-bold text-gray-200 hover:text-white bg-[#222222] hover:bg-[#2e2e2e] px-3 py-1.5 rounded-full transition shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Volver a Inicio</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {folder.badge || 'Carpeta de Audios'}
            </span>
          </div>
        </div>

        {/* Encabezado / Hero de la Carpeta */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 pt-1">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-2xl shrink-0 ring-1 ring-white/10 flex items-center justify-center bg-[#1c1c1e]">
            {renderCover(folder.coverKey, 'w-full h-full object-cover')}
          </div>

          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
              FINANCIERA AARON • CARPETA DE AUDIO
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight tracking-tight">
              {folder.titulo}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1.5 font-medium line-clamp-2">
              {folder.subtitulo}
            </p>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {folder.descripcion}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-400 mt-3 font-medium">
              <span className="text-white font-bold">{cancionesCarpeta.length} audios</span>
              <span>•</span>
              <span>Audio HQ 320kbps</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Reproducción Inmediata</span>
            </div>
          </div>
        </div>

        {/* Barra de Controles de la Carpeta */}
        <div className="flex items-center gap-4 py-2 border-y border-white/5">
          {/* Botón Play gigante estilo Spotify */}
          <button
            onClick={() => {
              if (cancionesCarpeta.length > 0) {
                seleccionarCancion(cancionesCarpeta[0]);
              }
            }}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#1ED760] hover:bg-[#1db954] text-black flex items-center justify-center shadow-xl active:scale-95 transition"
            title="Reproducir todos los audios"
          >
            {estaReproduciendoCarpeta ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            )}
          </button>

          {/* Botón Like de Carpeta */}
          <button
            onClick={() => toggleLikeFolder(folder.id)}
            className={`p-2.5 rounded-full border transition ${
              folderLiked[folder.id]
                ? 'text-[#1ED760] border-[#1ED760]/40 bg-emerald-500/10'
                : 'text-gray-400 hover:text-white border-white/10 hover:border-white/30'
            }`}
            title="Guardar en favoritos"
          >
            <Heart className={`w-5 h-5 ${folderLiked[folder.id] ? 'fill-current' : ''}`} />
          </button>

          {/* Botón Descarga / Offline */}
          <button
            onClick={() => triggerToast('Audios optimizados para reproducción offline en la app', 'success')}
            className="p-2.5 rounded-full border border-white/10 text-gray-400 hover:text-white transition"
            title="Disponible offline"
          >
            <Download className="w-5 h-5" />
          </button>

          {/* Botón Subir Canción a esta Carpeta */}
          <button
            onClick={() => {
              setCustomArtist(folder.titulo);
              setShowUploadModal(true);
            }}
            className="ml-auto px-3.5 py-2 rounded-full text-xs font-bold bg-[#282828] hover:bg-[#323232] text-white border border-white/15 flex items-center gap-1.5 shadow transition active:scale-95"
            title="Subir un archivo MP3 directamente a esta carpeta"
          >
            <Upload className="w-3.5 h-3.5 text-[#1ED760]" />
            <span>+ Subir a esta carpeta</span>
          </button>
        </div>

        {/* Lista de Pistas / Audios de la Carpeta */}
        <div className="space-y-1">
          <div className="px-3 py-1.5 flex items-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5">
            <span className="w-8 text-center">#</span>
            <span className="flex-1">Título</span>
            <span className="w-16 text-right pr-2">Duración</span>
          </div>

          {cancionesCarpeta.length === 0 ? (
            <div className="p-8 text-center bg-[#181818] rounded-xl border border-white/5 text-gray-400">
              <Folder className="w-10 h-10 mx-auto text-gray-500 mb-2" />
              <p className="text-sm font-bold text-white">Esta carpeta aún no tiene canciones</p>
              <p className="text-xs mt-1">Usa el botón &quot;+ Subir a esta carpeta&quot; para agregar tus MP3.</p>
            </div>
          ) : (
            cancionesCarpeta.map((cancion, idx) => {
              const esActual = currentSong?.id === cancion.id;
              const sonando = esActual && isPlaying;

              return (
                <div
                  key={cancion.id}
                  onClick={() => seleccionarCancion(cancion)}
                  className={`group flex items-center px-3 py-2.5 rounded-xl cursor-pointer transition select-none ${
                    esActual
                      ? 'bg-white/10 text-white'
                      : 'hover:bg-white/5 text-gray-200'
                  }`}
                >
                  {/* Número o Indicador de reproducción */}
                  <div className="w-8 flex items-center justify-center shrink-0">
                    {sonando ? (
                      <div className="flex items-end gap-0.5 h-3.5">
                        <span className="w-1 bg-[#1ED760] h-full animate-bounce rounded-full" />
                        <span className="w-1 bg-[#1ED760] h-2 animate-bounce rounded-full [animation-delay:0.2s]" />
                        <span className="w-1 bg-[#1ED760] h-3 animate-bounce rounded-full [animation-delay:0.4s]" />
                      </div>
                    ) : (
                      <span className={`text-xs font-semibold ${esActual ? 'text-[#1ED760]' : 'text-gray-400 group-hover:hidden'}`}>
                        {idx + 1}
                      </span>
                    )}
                    {!sonando && (
                      <Play className="w-3.5 h-3.5 text-white hidden group-hover:block ml-0.5 fill-current" />
                    )}
                  </div>

                  {/* Portada miniatura */}
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 mx-2 shadow bg-neutral-800">
                    {renderCover(cancion.cover || folder.coverKey, 'w-full h-full object-cover')}
                  </div>

                  {/* Datos de la Pista */}
                  <div className="flex-1 min-w-0 pr-2">
                    <p
                      className={`text-xs sm:text-sm font-bold truncate leading-tight ${
                        esActual ? 'text-[#1ED760]' : 'text-white'
                      }`}
                    >
                      {cancion.titulo}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">
                      {cancion.artista}
                    </p>
                  </div>

                  {/* Duración y controles */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-gray-400 font-mono">
                      {esActual && duration ? formatTime(duration) : '3:20'}
                    </span>

                    {/* Botón eliminar si es canción subida por el usuario */}
                    {cancion.storage_path && (
                      <button
                        onClick={(e) => eliminarCancion(cancion, e)}
                        className="text-gray-400 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition"
                        title="Eliminar de Supabase"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col h-screen w-screen bg-[#121212] text-white font-sans overflow-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Elemento de Audio Nativo HTML5 */}
      <audio
        ref={audioRef}
        src={currentSong?.url ? currentSong.url : undefined}
        controlsList="nodownload noplaybackrate"
        onTimeUpdate={handleTimeUpdate}
        onEnded={reproducirSiguiente}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* ==========================================
          BARRA DE ESTADO ANDROID (IDÉNTICA AL SCREENSHOT: 7:24, POSPUESTO HASTA, 99%)
          ========================================== */}
      <div className="w-full bg-[#121212] px-4 pt-2 pb-1.5 flex items-center justify-between text-xs text-gray-300 font-semibold shrink-0 z-30">
        <div className="text-sm font-bold text-white tracking-tight">7:24</div>

        {/* Píldora de alarma central del screenshot */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e293b]/70 border border-slate-700/60 text-slate-200 text-[11px] shadow-sm">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium truncate max-w-[150px]">Pospuesto hasta</span>
        </div>

        {/* Notificaciones e Icono de Financiera Aaron + Batería 99% */}
        <div className="flex items-center gap-2">
          {/* Badge Monograma FA */}
          <div
            onClick={() => setShowDeployModal(true)}
            className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-600 to-blue-600 flex items-center justify-center text-[9px] font-black text-white cursor-pointer ring-1 ring-white/30"
            title="Publicar en tu propia URL / Opciones"
          >
            FA
          </div>
          <div className="flex items-center gap-0.5 text-white text-[11px] font-bold">
            <span>99</span>
          </div>
        </div>
      </div>

      {/* ==========================================
          BARRA SUPERIOR DE FILTROS (AVATAR + TODAS + MÚSICA + PODCASTS + AUDIOLIBROS)
          ========================================== */}
      <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 z-20">
        {/* Avatar Usuario */}
        <div
          onClick={() => {
            if (!user) setShowLoginModal(true);
            else setShowDeployModal(true);
          }}
          className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 cursor-pointer border border-white/20 active:scale-95 transition"
          title={user ? user.email : 'Iniciar Sesión'}
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Usuario"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Píldora "Todas" (Verde brillante Spotify #1ED760 con texto negro) */}
        <button
          onClick={() => setActiveFilter('Todas')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
            activeFilter === 'Todas'
              ? 'bg-[#1ED760] text-black shadow-sm'
              : 'bg-[#2A2A2A] text-white hover:bg-[#333333]'
          }`}
        >
          Todas
        </button>

        {/* Píldora "Música" */}
        <button
          onClick={() => setActiveFilter('Música')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
            activeFilter === 'Música'
              ? 'bg-[#1ED760] text-black shadow-sm font-bold'
              : 'bg-[#2A2A2A] text-white hover:bg-[#333333]'
          }`}
        >
          Música
        </button>

        {/* Píldora "Podcasts" */}
        <button
          onClick={() => setActiveFilter('Podcasts')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
            activeFilter === 'Podcasts'
              ? 'bg-[#1ED760] text-black shadow-sm font-bold'
              : 'bg-[#2A2A2A] text-white hover:bg-[#333333]'
          }`}
        >
          Podcasts
        </button>

        {/* Píldora "Audiolibros" */}
        <button
          onClick={() => setActiveFilter('Audiolibros')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
            activeFilter === 'Audiolibros'
              ? 'bg-[#1ED760] text-black shadow-sm font-bold'
              : 'bg-[#2A2A2A] text-white hover:bg-[#333333]'
          }`}
        >
          Audiolibros
        </button>

        {/* Botón rápido Instalar PWA en Celular */}
        <button
          onClick={handleInstallPWA}
          className="ml-auto px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1ED760]/10 hover:bg-[#1ED760]/20 text-[#1ED760] border border-[#1ED760]/40 flex items-center gap-1 shrink-0 transition shadow-sm active:scale-95"
          title="Instalar en celular Android con su propio icono"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#1ED760]" />
          <span>Instalar App</span>
        </button>

        {/* Botón rápido publicar URL independiente */}
        <button
          onClick={() => setShowDeployModal(true)}
          className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 hover:text-white border border-blue-500/40 flex items-center gap-1 shrink-0 transition active:scale-95 shadow-sm"
          title="Publicar en tu propia URL independiente fuera de AI Studio"
        >
          <Rocket className="w-3.5 h-3.5 text-blue-400" />
          <span>Web Propia</span>
        </button>
      </div>

      {/* ==========================================
          CONTENEDOR PRINCIPAL SCROLLABLE (PANTALLA DE INICIO SPOTIFY O VISTA DE CARPETA)
          ========================================== */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 pb-36 pt-1 space-y-6">
        {selectedFolder ? (
          renderFolderView(selectedFolder)
        ) : activeTab === 'inicio' ? (
          <>
            {/* ==========================================
                1. GRID 2x4 DE ACCESO RÁPIDO (8 CARPETAS DE AUDIOS IDÉNTICAS AL SCREENSHOT)
                ========================================== */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {/* Tarjeta 1: buchonass */}
              <div
                onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'buchonass') || null)}
                className="group flex items-center bg-[#282828] hover:bg-[#323232] rounded-md overflow-hidden cursor-pointer transition active:scale-[0.98] shadow-sm hover:ring-1 hover:ring-white/20"
                title="Abrir carpeta de audios buchonass"
              >
                {renderCover('cover_buchonass', 'w-14 h-14')}
                <div className="flex-1 px-2.5 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight">
                    buchonass
                  </span>
                </div>
              </div>

              {/* Tarjeta 2: Tus me gusta */}
              <div
                onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'tus_me_gusta') || null)}
                className="group flex items-center bg-[#282828] hover:bg-[#323232] rounded-md overflow-hidden cursor-pointer transition active:scale-[0.98] shadow-sm hover:ring-1 hover:ring-white/20"
                title="Abrir carpeta de Tus me gusta y audios en Supabase"
              >
                {renderCover('cover_tus_me_gusta', 'w-14 h-14')}
                <div className="flex-1 px-2.5 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight">
                    Tus me gusta
                  </span>
                </div>
              </div>

              {/* Tarjeta 3: Perreale */}
              <div
                onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'perreale') || null)}
                className="group flex items-center bg-[#282828] hover:bg-[#323232] rounded-md overflow-hidden cursor-pointer transition active:scale-[0.98] shadow-sm hover:ring-1 hover:ring-white/20"
                title="Abrir carpeta de audios Perreale"
              >
                {renderCover('cover_perreale', 'w-14 h-14')}
                <div className="flex-1 px-2.5 min-w-0 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    Perreale
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold shrink-0">•••</span>
                </div>
              </div>

              {/* Tarjeta 4: LOB SONGS */}
              <div
                onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'lob_songs') || null)}
                className="group flex items-center bg-[#282828] hover:bg-[#323232] rounded-md overflow-hidden cursor-pointer transition active:scale-[0.98] shadow-sm hover:ring-1 hover:ring-white/20"
                title="Abrir carpeta de audios LOB SONGS"
              >
                {renderCover('cover_lob', 'w-14 h-14')}
                <div className="flex-1 px-2.5 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight">
                    LOB SONGS
                  </span>
                </div>
              </div>

              {/* Tarjeta 5: los 2000' */}
              <div
                onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'los_2000') || null)}
                className="group flex items-center bg-[#282828] hover:bg-[#323232] rounded-md overflow-hidden cursor-pointer transition active:scale-[0.98] shadow-sm hover:ring-1 hover:ring-white/20"
                title="Abrir carpeta de audios los 2000'"
              >
                {renderCover('cover_2000', 'w-14 h-14')}
                <div className="flex-1 px-2.5 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight">
                    los 2000&apos;
                  </span>
                </div>
              </div>

              {/* Tarjeta 6: GRWM🍒💋⭐💍 */}
              <div
                onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'grwm') || null)}
                className="group flex items-center bg-[#282828] hover:bg-[#323232] rounded-md overflow-hidden cursor-pointer transition active:scale-[0.98] shadow-sm hover:ring-1 hover:ring-white/20"
                title="Abrir carpeta de audios GRWM"
              >
                {renderCover('cover_grwm', 'w-14 h-14')}
                <div className="flex-1 px-2.5 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight">
                    GRWM🍒💋⭐💍
                  </span>
                </div>
              </div>

              {/* Tarjeta 7: Baladas Románticas */}
              <div
                onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'baladas') || null)}
                className="group flex items-center bg-[#282828] hover:bg-[#323232] rounded-md overflow-hidden cursor-pointer transition active:scale-[0.98] shadow-sm hover:ring-1 hover:ring-white/20"
                title="Abrir carpeta de audios Baladas Románticas"
              >
                {renderCover('cover_baladas', 'w-14 h-14')}
                <div className="flex-1 px-2.5 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight">
                    Baladas Románticas
                  </span>
                </div>
              </div>

              {/* Tarjeta 8: La Reina: Éxitos de la ... */}
              <div
                onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'la_reina') || null)}
                className="group flex items-center bg-[#282828] hover:bg-[#323232] rounded-md overflow-hidden cursor-pointer transition active:scale-[0.98] shadow-sm hover:ring-1 hover:ring-white/20"
                title="Abrir carpeta de audios La Reina"
              >
                {renderCover('cover_reina', 'w-14 h-14')}
                <div className="flex-1 px-2.5 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight">
                    La Reina: Éxitos de la ...
                  </span>
                </div>
              </div>
            </div>

            {/* ==========================================
                2. SECCIÓN: SUMÉRGETE EN UN AUDIOLIBRO (CARPETA DE AUDIOLIBRO)
                ========================================== */}
            <div className="space-y-3 pt-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Sumérgete en un audiolibro
              </h2>

              <div
                onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'audiolibro') || null)}
                className="bg-[#242424] hover:bg-[#2b2b2b] rounded-xl p-3 sm:p-4 flex gap-3.5 sm:gap-4 items-center cursor-pointer transition shadow-lg relative group hover:ring-1 hover:ring-white/10"
                title="Abrir audiolibro completo con todos sus capítulos"
              >
                {/* Portada grande con icono de audiolibro/antena */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-[#202020] border border-white/5 rounded-lg flex items-center justify-center shrink-0 shadow-inner">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center relative">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    </div>
                    {/* Antena / soporte inferior */}
                    <div className="absolute -bottom-2 w-1 h-3 bg-gray-400" />
                  </div>
                </div>

                {/* Detalles del Audiolibro */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1ED760]">
                        Incluido en Premium
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFolder(carpetasAudio.find((f) => f.id === 'audiolibro') || null);
                        }}
                        className="text-gray-400 hover:text-white p-1"
                        title="Ver capítulos"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white mt-1 leading-snug line-clamp-2">
                      Deja de ser tú (latino): La mente crea la real...
                    </h3>
                  </div>

                  {/* Botones inferiores: (+) y Play redondo blanco con triángulo negro */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerToast('Guardado en Tu Biblioteca', 'success');
                      }}
                      className="text-gray-300 hover:text-white p-1 rounded-full transition"
                      title="Agregar a tu biblioteca"
                    >
                      <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
                        <Plus className="w-4 h-4" />
                      </div>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const folder = carpetasAudio.find((f) => f.id === 'audiolibro');
                        if (folder && folder.canciones.length > 0) {
                          seleccionarCancion(folder.canciones[0]);
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 text-black flex items-center justify-center shadow-lg active:scale-95 transition"
                      title="Reproducir audiolibro"
                    >
                      {currentSong?.id === 'audio_1' && isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================
                3. SECCIÓN: SIGUE REPRODUCIENDO (CARRUSEL HORIZONTAL DE CARPETAS)
                ========================================== */}
            <div className="space-y-3 pt-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Sigue reproduciendo
              </h2>

              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 pt-1">
                {/* Tarjeta Carrusel 1: Marco Antonio Solís */}
                <div
                  onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'marco_antonio') || null)}
                  className="w-44 sm:w-48 shrink-0 bg-[#181818] hover:bg-[#222222] p-3 rounded-xl cursor-pointer transition shadow group"
                  title="Abrir carpeta de Marco Antonio Solís"
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden relative mb-2.5 bg-neutral-800">
                    <img
                      src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80"
                      alt="Marco Antonio Solís"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {/* Marca de agua Spotify idéntica al screenshot */}
                    <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Music className="w-3 h-3 text-[#1ED760]" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate">Marco Antonio Solís</h4>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    Franco De Vita, Chayanne y Los Bukis
                  </p>
                </div>

                {/* Tarjeta Carrusel 2: Mix de grupero */}
                <div
                  onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'mix_grupero') || null)}
                  className="w-44 sm:w-48 shrink-0 bg-[#181818] hover:bg-[#222222] p-3 rounded-xl cursor-pointer transition shadow group"
                  title="Abrir carpeta de Mix de grupero"
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden relative mb-2.5 bg-neutral-800">
                    <img
                      src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80"
                      alt="Mix de grupero"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {/* Marca de agua Spotify idéntica al screenshot */}
                    <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Music className="w-3 h-3 text-[#1ED760]" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate">Mix de grupero</h4>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    Eden Muñoz, Grupo Mojado, Kany García y...
                  </p>
                </div>

                {/* Tarjeta Carrusel 3: Tus Canciones en Supabase */}
                <div
                  onClick={() => setActiveTab('biblioteca')}
                  className="w-44 sm:w-48 shrink-0 bg-[#181818] hover:bg-[#222222] p-3 rounded-xl cursor-pointer transition shadow group flex flex-col justify-between"
                  title="Ver canciones subidas a Supabase"
                >
                  <div className="w-full aspect-square rounded-lg bg-gradient-to-tr from-blue-700 via-pink-600 to-red-600 flex items-center justify-center mb-2.5 relative shadow-inner">
                    <Music className="w-12 h-12 text-white animate-pulse" />
                    <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white truncate">Tu Nube Supabase</h4>
                    <p className="text-xs text-blue-400 truncate mt-0.5 font-medium">
                      {canciones.filter((c) => c.storage_path).length} pistas subidas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* ==========================================
            PESTAÑA: BUSCAR
            ========================================== */}
        {activeTab === 'buscar' && (
          <div className="space-y-4 pt-1">
            <h2 className="text-2xl font-black text-white">Buscar</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="¿Qué deseas escuchar?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#242424] border border-[#333333] rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#1ED760] transition"
              />
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-gray-300">Pistas y Artistas disponibles</h3>
              {filteredSongs.map((cancion) => (
                <div
                  key={cancion.id}
                  onClick={() => seleccionarCancion(cancion)}
                  className="flex items-center justify-between p-2.5 bg-[#1C1C1C] hover:bg-[#242424] rounded-lg cursor-pointer transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {renderCover(cancion.cover, 'w-10 h-10')}
                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate ${currentSong?.id === cancion.id ? 'text-[#1ED760]' : 'text-white'}`}>
                        {cancion.titulo}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{cancion.artista}</p>
                    </div>
                  </div>
                  <Play className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            PESTAÑA: TU BIBLIOTECA (SUPABASE STORAGE)
            ========================================== */}
        {activeTab === 'biblioteca' && (
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Tu biblioteca</h2>
                <p className="text-xs text-blue-400 font-medium">Supabase Bucket: musica</p>
              </div>
              <button
                onClick={() => {
                  if (!user) setShowLoginModal(true);
                  else setShowUploadModal(true);
                }}
                className="px-3 py-1.5 rounded-full bg-[#1ED760] hover:bg-[#1db954] text-black font-bold text-xs flex items-center gap-1 shadow"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Subir MP3</span>
              </button>
            </div>

            {/* Tarjeta de estado de sesión admin */}
            <div className="p-3 bg-[#1C1C1E] border border-white/10 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white">
                    {user ? user.email : 'Modo Visitante'}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {user ? 'Sesión de Administrador iniciada' : 'Inicia sesión para administrar archivos'}
                  </p>
                </div>
              </div>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-red-950/60 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/60 transition"
                >
                  Cerrar
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                >
                  Ingresar
                </button>
              )}
            </div>

            {/* Lista de canciones de Supabase */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-gray-300">Pistas en la nube</h3>
              {canciones.map((cancion) => {
                const isSelected = currentSong?.id === cancion.id;
                const isCustom = Boolean(cancion.storage_path);
                return (
                  <div
                    key={cancion.id}
                    onClick={() => seleccionarCancion(cancion)}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition ${
                      isSelected ? 'bg-[#202020] border border-[#1ED760]/60' : 'bg-[#181818] hover:bg-[#222222]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {renderCover(cancion.cover, 'w-11 h-11')}
                      <div className="min-w-0">
                        <p className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-[#1ED760]' : 'text-white'}`}>
                          {cancion.titulo}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">{cancion.artista}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCustom && user && (
                        <button
                          onClick={(e) => eliminarCancion(cancion, e)}
                          className="p-1.5 text-gray-400 hover:text-red-400 rounded transition"
                          title="Eliminar de Supabase"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          seleccionarCancion(cancion);
                        }}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition"
                      >
                        {isSelected && isPlaying ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ==========================================
          MINI PLAYER FLOTANTE (IDÉNTICO AL SCREENSHOT)
          Fondo Rojo Oscuro/Vino (#580816), Carátula 23, Icono Dispositivo, Check Verde y Play
          ========================================== */}
      <div className="fixed bottom-14 left-2 right-2 sm:left-4 sm:right-4 z-40">
        <div
          onClick={togglePlay}
          className="bg-[#580816] hover:bg-[#640a1b] rounded-lg p-2 sm:p-2.5 flex items-center justify-between shadow-2xl cursor-pointer transition border border-red-900/40 relative overflow-hidden"
        >
          {/* Barra de progreso sutil en la parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/40">
            <div
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Cuadro de portada 23 (Rojo fuerte idéntico al screenshot) */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded bg-[#881337] border border-white/25 flex flex-col items-center justify-center shrink-0 shadow">
              <span className="text-[13px] font-black text-white tracking-tighter leading-none">23</span>
              <span className="text-[5px] font-bold text-red-200 uppercase tracking-widest mt-0.5">MIKE</span>
            </div>

            {/* Título y Artistas */}
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-extrabold text-white truncate leading-tight">
                {currentSong ? currentSong.titulo : '23'}
              </p>
              <p className="text-[11px] text-red-200/90 truncate font-medium">
                {currentSong ? currentSong.artista : 'de-It, Miley Cyrus, Wiz Kh...'}
              </p>
            </div>
          </div>

          {/* Controles del screenshot: Dispositivo, Check verde de Spotify Connect y Play */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Icono de dispositivo conectado */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeployModal(true);
              }}
              className="text-red-200 hover:text-white transition"
              title="Dispositivos disponibles"
            >
              <Cast className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Círculo verde brillante con checkmark idéntico al screenshot */}
            <div
              className="w-5 h-5 rounded-full bg-[#1ED760] flex items-center justify-center text-black shrink-0 shadow-sm"
              title="Spotify Connect Activo"
            >
              <Check className="w-3.5 h-3.5 stroke-[3.5]" />
            </div>

            {/* Botón de Play / Pausa idéntico */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="text-white hover:scale-105 p-1 transition"
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================
          BARRA DE NAVEGACIÓN INFERIOR (NEGRA #000000 IDÉNTICA AL SCREENSHOT)
          Inicio, Buscar, Tu biblioteca, Crear
          ========================================== */}
      <footer className="fixed bottom-0 left-0 right-0 h-14 bg-black border-t border-neutral-900 px-4 flex items-center justify-around z-40 select-none">
        {/* Tab 1: Inicio */}
        <button
          onClick={() => {
            setActiveTab('inicio');
            setSelectedFolder(null);
          }}
          className={`flex flex-col items-center justify-center gap-1 transition ${
            activeTab === 'inicio' && !selectedFolder ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-200 font-medium'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'inicio' && !selectedFolder ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px]">Inicio</span>
        </button>

        {/* Tab 2: Buscar */}
        <button
          onClick={() => setActiveTab('buscar')}
          className={`flex flex-col items-center justify-center gap-1 transition ${
            activeTab === 'buscar' ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-200 font-medium'
          }`}
        >
          <Search className={`w-5 h-5 ${activeTab === 'buscar' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px]">Buscar</span>
        </button>

        {/* Tab 3: Tu biblioteca */}
        <button
          onClick={() => setActiveTab('biblioteca')}
          className={`flex flex-col items-center justify-center gap-1 transition ${
            activeTab === 'biblioteca' ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-200 font-medium'
          }`}
        >
          <Library className={`w-5 h-5 ${activeTab === 'biblioteca' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px]">Tu biblioteca</span>
        </button>

        {/* Tab 4: Crear (+ Subir Canción a Supabase) */}
        <button
          onClick={() => {
            if (!user) setShowLoginModal(true);
            else setShowUploadModal(true);
          }}
          className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-white transition font-medium"
        >
          <Plus className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px]">Crear</span>
        </button>
      </footer>

      {/* ==========================================
          MODAL: SUBIR CANCIÓN A SUPABASE
          ========================================== */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] border border-[#383838] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => {
                if (!isUploading) setShowUploadModal(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#1ED760]/20 text-[#1ED760] flex items-center justify-center">
                <Upload className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Subir Canción a Supabase</h3>
                <p className="text-xs text-[#1ED760] font-medium">Bucket: &quot;musica&quot;</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (selectedFile) {
                  subirCancion(selectedFile);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-1.5">
                  Archivo de audio MP3 <span className="text-pink-500">*</span>
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#383838] hover:border-[#1ED760] rounded-xl p-4 text-center cursor-pointer transition bg-[#141414]"
                >
                  <Music className="w-8 h-8 text-[#1ED760] mx-auto mb-2" />
                  {selectedFile ? (
                    <div>
                      <p className="text-xs font-semibold text-emerald-400 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-gray-200 font-medium">Haz clic para seleccionar tu MP3</p>
                      <p className="text-[11px] text-gray-500 mt-1">
                        Formatos soportados: audio/mpeg, .mp3
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/mpeg,audio/mp3,.mp3"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setSelectedFile(f);
                      if (!customTitle) {
                        setCustomTitle(f.name.replace(/\.[^/.]+$/, ''));
                      }
                    }
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-1">
                  Título de la canción
                </label>
                <input
                  type="text"
                  placeholder="Ej: Mi Canción Favorita"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#333333] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#1ED760]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-1">
                  Artista
                </label>
                <input
                  type="text"
                  placeholder="Ej: Aaron"
                  value={customArtist}
                  onChange={(e) => setCustomArtist(e.target.value)}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#333333] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#1ED760]"
                />
              </div>

              {isUploading && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-[#1ED760]/40 flex items-center gap-2 text-xs text-emerald-200">
                  <div className="w-4 h-4 border-2 border-[#1ED760] border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>{uploadStatus || 'Subiendo archivo...'}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2 text-xs font-semibold bg-[#282828] hover:bg-[#333333] text-gray-200 rounded-xl transition disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="flex-1 py-2 text-xs font-bold bg-[#1ED760] hover:bg-[#1db954] text-black rounded-xl shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Subiendo...</span>
                    </>
                  ) : (
                    <span>Subir Canción</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: INICIAR SESIÓN / REGISTRO ADMIN
          ========================================== */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] border border-[#383838] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                {isSignUpMode ? <UserPlus className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {isSignUpMode ? 'Registrar Administrador' : 'Acceso Administrador'}
                </h3>
                <p className="text-xs text-gray-400">Autenticación con Supabase Auth</p>
              </div>
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-red-950/50 border border-red-500/40 rounded-xl flex items-start gap-2 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <div className="flex-1">
                  <span>{authError}</span>
                  {authError.includes('Invalid login credentials') && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUpMode(true);
                        setAuthError(null);
                      }}
                      className="block mt-1 text-blue-400 hover:underline font-semibold"
                    >
                      ¿El usuario no existe? Crear cuenta aquí.
                    </button>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#333333] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#333333] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-2.5 text-xs font-bold bg-[#1ED760] hover:bg-[#1db954] text-black rounded-xl shadow transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>{isSignUpMode ? 'Registrando...' : 'Verificando...'}</span>
                    </>
                  ) : (
                    <span>{isSignUpMode ? 'Crear Cuenta' : 'Iniciar Sesión'}</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSignUpMode(!isSignUpMode);
                    setAuthError(null);
                  }}
                  className="text-center text-[11px] text-gray-300 hover:text-blue-400 transition font-medium"
                >
                  {isSignUpMode
                    ? '¿Ya tienes cuenta? Iniciar sesión'
                    : '¿Primera vez? Registrar cuenta en Supabase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: PUBLICAR EN TU PROPIA URL INDEPENDIENTE (VERCEL / NETLIFY)
          ========================================== */}
      {showDeployModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowDeployModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#2C2C2E] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Publicar FINANCIERA AARON en tu propia URL Web
                </h3>
                <p className="text-xs text-blue-400 font-medium">
                  Guía paso a paso para abrirla e instalarla en Android sin Google AI Studio
                </p>
              </div>
            </div>

            <div className="space-y-5 text-xs text-gray-200">
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-300">¡Tu proyecto ya está 100% listo para producción!</p>
                  <p className="text-[11px] text-emerald-200/80 mt-0.5">
                    Las credenciales de Supabase (<code className="font-mono text-emerald-300">djqjagjaywphhaoonbdq.supabase.co</code>),
                    el reproductor, el almacenamiento de canciones y el manifest PWA ya están configurados.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Elige tu plataforma de publicación gratuita:</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-2">
                  <div className="p-4 rounded-xl bg-[#242426] border border-[#38383A] hover:border-blue-500/60 transition space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">Opción A: Vercel</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold">
                        Recomendado
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300">
                      Conecta tu GitHub. Actualizaciones automáticas y dominio propio gratis (.vercel.app o .com).
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-[11px] text-gray-300 pt-1">
                      <li>Sube el código a tu GitHub.</li>
                      <li>Entra en <strong className="text-white">vercel.com</strong> &gt; <em>&quot;Add New Project&quot;</em>.</li>
                      <li>Detecta Vite: Build <code className="text-blue-300 font-mono">npm run build</code>, Output <code className="text-blue-300 font-mono">dist</code>.</li>
                      <li>Presiona <strong>&quot;Deploy&quot;</strong>.</li>
                    </ol>
                  </div>

                  <div className="p-4 rounded-xl bg-[#242426] border border-[#38383A] hover:border-emerald-500/60 transition space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">Opción B: Netlify Drop</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                        Sin consola (1 min)
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300">
                      Arrastra la carpeta <strong className="text-white">dist</strong> generada con <code className="font-mono text-emerald-300">npm run build</code>.
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-[11px] text-gray-300 pt-1">
                      <li>Ejecuta <code className="text-emerald-300 font-mono">npm run build</code>.</li>
                      <li>Abre: <strong className="text-white">app.netlify.com/drop</strong>.</li>
                      <li>Arrastra la carpeta <strong className="text-white">dist</strong>.</li>
                      <li>¡Listo! Tu URL pública HTTPS estará lista al instante.</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={() => {
                    setShowDeployModal(false);
                    setShowInstallGuideModal(true);
                  }}
                  className="flex-1 py-2.5 text-xs font-bold bg-[#282828] hover:bg-[#333333] text-gray-200 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Pasos para instalar en Android</span>
                </button>
                <button
                  onClick={() => setShowDeployModal(false)}
                  className="flex-1 py-2.5 text-xs font-bold bg-[#1ED760] hover:bg-[#1db954] text-black rounded-xl shadow transition"
                >
                  ¡Entendido!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: GUÍA DE INSTALACIÓN EN ANDROID / IOS
          ========================================== */}
      {showInstallGuideModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setShowInstallGuideModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#2C2C2E] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Instalar en tu Celular</h3>
                <p className="text-xs text-emerald-400 font-medium">Agregar a la pantalla de inicio con su icono</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-gray-200">
              <div className="p-3.5 rounded-xl bg-[#242426] border border-[#38383A] space-y-2">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  <span>En Celulares Android (Google Chrome):</span>
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-gray-300 text-[11px] pl-1">
                  <li>Abre tu URL pública en <strong className="text-white">Google Chrome</strong>.</li>
                  <li>Toca el menú de <strong className="text-white">tres puntos verticales (⋮)</strong> en la esquina superior derecha.</li>
                  <li>Toca en <strong className="text-emerald-400">&quot;Instalar aplicación&quot;</strong> o <strong className="text-emerald-400">&quot;Agregar a la pantalla principal&quot;</strong>.</li>
                  <li>Confirma presionando <strong className="text-white">&quot;Instalar&quot;</strong>.</li>
                  <li>¡Se creará el icono oficial de <strong className="text-white">FINANCIERA AARON</strong> en tu celular y se abrirá como app independiente!</li>
                </ol>
              </div>

              <button
                onClick={() => setShowInstallGuideModal(false)}
                className="w-full py-2.5 text-xs font-bold bg-[#1ED760] hover:bg-[#1db954] text-black rounded-xl shadow transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: GUÍA DE CONFIGURACIÓN RLS SUPABASE
          ========================================== */}
      {showRlsModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] border border-[#383838] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowRlsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Permitir subidas en Supabase Storage (RLS)
                </h3>
                <p className="text-xs text-blue-400">
                  Resuelve el error: &quot;new row violates row-level security policy&quot;
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-gray-300">
              <p>
                Para habilitar subida y lectura en el bucket{' '}
                <code className="text-emerald-400 bg-neutral-900 px-1 py-0.5 rounded font-mono font-bold">musica</code>
                , ejecuta este SQL en tu panel de Supabase:
              </p>

              <div className="relative">
                <pre className="p-3 bg-[#121212] border border-[#333333] rounded-xl font-mono text-[11px] text-emerald-400 overflow-x-auto leading-relaxed">
                  {rlsSql}
                </pre>
                <button
                  onClick={copyRlsSql}
                  className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#282828] hover:bg-[#383838] text-white text-[11px] font-semibold transition shadow"
                >
                  {sqlCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar SQL</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => setShowRlsModal(false)}
                className="w-full py-2.5 text-xs font-bold bg-[#1ED760] hover:bg-[#1db954] text-black rounded-xl shadow transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TOAST FEEDBACK
          ========================================== */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold ${
            toast.type === 'success'
              ? 'bg-[#181818] border-[#1ED760] text-white'
              : 'bg-[#181818] border-red-500 text-red-200'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#1ED760] shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}