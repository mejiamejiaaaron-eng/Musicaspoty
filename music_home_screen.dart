import 'package:flutter/material.dart';

void main() {
  runApp(const MusicApp());
}

class MusicApp extends StatelessWidget {
  const MusicApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Music App UI',
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF121212),
        fontFamily: 'Roboto',
      ),
      home: const MusicHomeScreen(),
    );
  }
}

class MusicHomeScreen extends StatelessWidget {
  const MusicHomeScreen({super.key});

  static const Color colorFondo = Color(0xFF121212);          // Modo oscuro (#121212)
  static const Color colorAcento1Rosado = Color(0xFFFF007F);  // Rosa Fuerte (#FF007F)
  static const Color colorAcento2Azul = Color(0xFF00B0FF);    // Azul Eléctrico (#00B0FF)
  static const Color colorAcento3Rojo = Color(0xFFD32F2F);    // Rojo Intenso (#D32F2F)
  static const Color colorGrisTarjeta = Color(0xFF282828);    // Tarjetas secundarias (#282828)
  static const Color colorGrisTexto = Color(0xFFB3B3B3);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: colorFondo,
      body: SafeArea(
        bottom: false,
        child: Stack(
          children: [
            // Contenido principal con scroll
            SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              padding: const EdgeInsets.only(
                left: 16.0,
                right: 16.0,
                top: 8.0,
                bottom: 140.0, // Espacio suficiente para no solapar el Mini Player flotante
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // 1. BARRA SUPERIOR (Avatar + Chips / Píldoras)
                  _buildTopFilterBar(),
                  const SizedBox(height: 16.0),

                  // 2. GRID 2x4 (8 Tarjetas Rápidas)
                  _buildQuickAccessGrid(),
                  const SizedBox(height: 32.0),

                  // 3. SECCIÓN AUDIOLIBRO
                  _buildAudiobookSection(),
                  const SizedBox(height: 32.0),

                  // 4. SECCIÓN "SIGUE REPRODUCIENDO"
                  _buildKeepPlayingSection(),
                  const SizedBox(height: 16.0),
                ],
              ),
            ),

            // 5. MINI REPRODUCTOR FLOTANTE (Posicionado sobre la BottomNavigationBar)
            Positioned(
              left: 8.0,
              right: 8.0,
              bottom: 8.0,
              child: _buildMiniPlayer(),
            ),
          ],
        ),
      ),

      // 6. BARRA DE NAVEGACIÓN INFERIOR
      bottomNavigationBar: _buildBottomNavigationBar(),
    );
  }

  // ==========================================
  // 1. BARRA SUPERIOR: Avatar y Filtros Píldora
  // ==========================================
  Widget _buildTopFilterBar() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      physics: const BouncingScrollPhysics(),
      child: Row(
        children: [
          // Avatar Circular
          Container(
            width: 38.0,
            height: 38.0,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: Color(0xFF3E3E3E),
            ),
            child: const Icon(
              Icons.person,
              color: Colors.white70,
              size: 22.0,
            ),
          ),
          const SizedBox(width: 10.0),

          // Píldora activa "Todas" (Fondo Rosado, texto negro)
          _buildFilterChip(
            title: 'Todas',
            isActive: true,
          ),
          const SizedBox(width: 8.0),

          // Píldoras inactivas (Fondo gris oscuro, texto blanco)
          _buildFilterChip(title: 'Música', isActive: false),
          const SizedBox(width: 8.0),
          _buildFilterChip(title: 'Podcasts', isActive: false),
          const SizedBox(width: 8.0),
          _buildFilterChip(title: 'Audiolibros', isActive: false),
        ],
      ),
    );
  }

  Widget _buildFilterChip({required String title, required bool isActive}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      decoration: BoxDecoration(
        color: isActive ? colorAcento1Rosado : colorGrisTarjeta,
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Text(
        title,
        style: TextStyle(
          color: isActive ? Colors.black : Colors.white,
          fontSize: 13.0,
          fontWeight: isActive ? FontWeight.w700 : FontWeight.w400,
        ),
      ),
    );
  }

  // ==========================================
  // 2. GRID (CUADRÍCULA 2x4: 8 TARJETAS)
  // ==========================================
  Widget _buildQuickAccessGrid() {
    final List<Map<String, dynamic>> items = [
      {'title': 'buchonass', 'isLikes': false},
      {'title': 'Tus me gusta', 'isLikes': true},
      {'title': 'Perreale', 'isLikes': false},
      {'title': 'LOB SONGS', 'isLikes': false},
      {'title': "los 2000'", 'isLikes': false},
      {'title': 'GRWM 🍒💋⭐️', 'isLikes': false},
      {'title': 'Baladas Románticas', 'isLikes': false},
      {'title': 'La Reina: Éxitos de la ...', 'isLikes': false},
    ];

    return GridView.builder(
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      itemCount: items.length,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 8.0,
        mainAxisSpacing: 8.0,
        mainAxisExtent: 56.0, // Altura fija de cada tarjeta compacta
      ),
      itemBuilder: (context, index) {
        final item = items[index];
        final bool isLikesCard = item['isLikes'] as bool;

        return Container(
          decoration: BoxDecoration(
            color: colorGrisTarjeta,
            borderRadius: BorderRadius.circular(4.0),
            // La tarjeta "Tus me gusta" lleva degradado de Azul a Rosado
            gradient: isLikesCard
                ? const LinearGradient(
                    colors: [colorAcento2Azul, colorAcento1Rosado],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  )
                : null,
          ),
          clipBehavior: Clip.antiAlias,
          child: Row(
            children: [
              // Cuadro de imagen o icono
              Container(
                width: 56.0,
                height: 56.0,
                color: isLikesCard ? Colors.transparent : const Color(0xFF383838),
                child: Center(
                  child: Icon(
                    isLikesCard ? Icons.favorite : Icons.music_note,
                    color: Colors.white,
                    size: 24.0,
                  ),
                ),
              ),

              // Título de la tarjeta
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10.0),
                  child: Text(
                    item['title'] as String,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 13.0,
                      fontWeight: FontWeight.w700,
                      height: 1.2,
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  // ==========================================
  // 3. SECCIÓN AUDIOLIBRO
  // ==========================================
  Widget _buildAudiobookSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Sumérgete en un audiolibro',
          style: TextStyle(
            color: Colors.white,
            fontSize: 22.0,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.5,
          ),
        ),
        const SizedBox(height: 14.0),

        // Tarjeta Ancha Oscura del Audiolibro
        Container(
          height: 140.0,
          decoration: BoxDecoration(
            color: const Color(0xFF1E1E1E),
            borderRadius: BorderRadius.circular(8.0),
          ),
          clipBehavior: Clip.antiAlias,
          child: Row(
            children: [
              // Portada izquierda con icono grande de micrófono
              Container(
                width: 140.0,
                height: 140.0,
                color: const Color(0xFF2C2C2C),
                child: const Center(
                  child: Icon(
                    Icons.podcasts,
                    color: Color(0xFF8E8E8E),
                    size: 64.0,
                  ),
                ),
              ),

              // Contenido a la derecha
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Cabecera: "Incluido en Premium" + Menú 3 puntos
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: const [
                          Text(
                            'Incluido en Premium',
                            style: TextStyle(
                              color: colorAcento1Rosado,
                              fontSize: 12.0,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          Icon(
                            Icons.more_vert,
                            color: Colors.white60,
                            size: 20.0,
                          ),
                        ],
                      ),

                      // Título del Audiolibro
                      const Text(
                        'Deja de ser tú (latino):\nLa mente crea la real...',
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 14.0,
                          fontWeight: FontWeight.w700,
                          height: 1.25,
                        ),
                      ),

                      // Fila Inferior: Botón (+) y Botón circular Play Azul
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Icon(
                            Icons.add_circle_outline,
                            color: Colors.white60,
                            size: 26.0,
                          ),
                          Container(
                            width: 38.0,
                            height: 38.0,
                            decoration: const BoxDecoration(
                              shape: BoxShape.circle,
                              color: colorAcento2Azul,
                            ),
                            child: const Center(
                              child: Icon(
                                Icons.play_arrow,
                                color: Colors.white,
                                size: 26.0,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // ==========================================
  // 4. SECCIÓN "SIGUE REPRODUCIENDO"
  // ==========================================
  Widget _buildKeepPlayingSection() {
    final List<Map<String, String>> items = [
      {
        'title': 'Marco Antonio Solís',
        'subtitle': 'Franco De Vita, Chayanne y Los Bukis',
      },
      {
        'title': 'Mix de grupero',
        'subtitle': 'Eden Muñoz, Grupo Mojado, Kany García',
      },
      {
        'title': 'Éxitos Populares',
        'subtitle': 'Varios Artistas',
      },
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Sigue reproduciendo',
          style: TextStyle(
            color: Colors.white,
            fontSize: 22.0,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.5,
          ),
        ),
        const SizedBox(height: 14.0),

        // Carrusel Horizontal
        SizedBox(
          height: 220.0,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            itemCount: items.length,
            separatorBuilder: (_, __) => const SizedBox(width: 14.0),
            itemBuilder: (context, index) {
              final item = items[index];

              return SizedBox(
                width: 154.0,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Tarjeta cuadrada con placeholder de imagen
                    Container(
                      width: 154.0,
                      height: 154.0,
                      decoration: BoxDecoration(
                        color: const Color(0xFF282828),
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      child: Stack(
                        children: [
                          const Center(
                            child: Icon(
                              Icons.album,
                              color: Color(0xFF484848),
                              size: 54.0,
                            ),
                          ),
                          Positioned(
                            top: 8.0,
                            left: 8.0,
                            child: Container(
                              padding: const EdgeInsets.all(4.0),
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Colors.black45,
                              ),
                              child: const Icon(
                                Icons.graphic_eq,
                                color: Colors.white70,
                                size: 14.0,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 8.0),

                    // Título bold
                    Text(
                      item['title']!,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 13.0,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 3.0),

                    // Subtítulo normal
                    Text(
                      item['subtitle']!,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: colorGrisTexto,
                        fontSize: 11.5,
                        fontWeight: FontWeight.w400,
                        height: 1.2,
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  // ==========================================
  // 5. MINI REPRODUCTOR (FLOTANTE - COLOR ROJO #D32F2F)
  // ==========================================
  Widget _buildMiniPlayer() {
    return Container(
      height: 58.0,
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      decoration: BoxDecoration(
        color: colorAcento3Rojo, // Color Rojo #D32F2F requerido
        borderRadius: BorderRadius.circular(8.0),
        boxShadow: const [
          BoxShadow(
            color: Colors.black54,
            blurRadius: 10.0,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          // Cuadro pequeño de carátula
          Container(
            width: 40.0,
            height: 40.0,
            decoration: BoxDecoration(
              color: const Color(0xFFB71C1C),
              borderRadius: BorderRadius.circular(4.0),
              border: Border.all(color: Colors.white24, width: 1.0),
            ),
            child: const Center(
              child: Text(
                '23',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 16.0,
                ),
              ),
            ),
          ),
          const SizedBox(width: 10.0),

          // Título y Artistas
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  '23',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 13.0,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                SizedBox(height: 2.0),
                Text(
                  'de-It, Miley Cyrus, Wiz Ki...',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: Color(0xFFE0E0E0),
                    fontSize: 11.5,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ],
            ),
          ),

          // Icono Cast / Dispositivos
          const Icon(
            Icons.devices_outlined,
            color: Colors.white,
            size: 22.0,
          ),
          const SizedBox(width: 14.0),

          // Círculo Azul con check blanco dentro
          Container(
            width: 22.0,
            height: 22.0,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: colorAcento2Azul, // Color Azul requerido
            ),
            child: const Center(
              child: Icon(
                Icons.check,
                color: Colors.white,
                size: 15.0,
              ),
            ),
          ),
          const SizedBox(width: 14.0),

          // Botón Play blanco
          const Icon(
            Icons.play_arrow,
            color: Colors.white,
            size: 30.0,
          ),
          const SizedBox(width: 4.0),
        ],
      ),
    );
  }

  // ==========================================
  // 6. BARRA DE NAVEGACIÓN INFERIOR
  // ==========================================
  Widget _buildBottomNavigationBar() {
    return BottomNavigationBar(
      backgroundColor: Colors.black, // Fondo negro sólido #000000
      type: BottomNavigationBarType.fixed,
      selectedItemColor: colorAcento1Rosado, // Inicio activo en Rosado
      unselectedItemColor: Colors.white,      // Demás iconos en blanco
      selectedFontSize: 11.0,
      unselectedFontSize: 11.0,
      currentIndex: 0, // "Inicio" seleccionado
      items: const [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Inicio',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.search),
          label: 'Buscar',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.collections_bookmark_outlined),
          label: 'Tu biblioteca',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.add),
          label: 'Crear',
        ),
      ],
    );
  }
}
