// ─────────────────────────────────────────────────────────────────────────────
// mockRecommendations.js
// 160 recommendation cards for 40 cities (Location Master List)
// source: 'local' | 'traveller'
// tag: 'Experiences'|'Coworking'|'Eat & Drink'|'Nightlife'|'Outdoors'|'Cultural'|'Wellness'|'Events'
// image: Unsplash URL (1200px wide, auto format)
// ─────────────────────────────────────────────────────────────────────────────

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const RECOMMENDATIONS = [

  // ─── CHIANG MAI ───────────────────────────────────────────────
  { id:'cm-01', city:'Chiang Mai', country:'Thailand', source:'traveller', tag:'Coworking',   title:'Morning Work at Thesis Coffee',      subtitle:'Nimman area • Fast Wi-Fi, outlets, specialty brews',          time:'08:00 AM', image: U('photo-1514513255262-6a36cf26b4b8') },
  { id:'cm-02', city:'Chiang Mai', country:'Thailand', source:'traveller', tag:'Cultural',    title:'Old City Temple Trail',              subtitle:'Wat Phra Singh + Wat Chedi Luang • Golden Lanna ruins',       time:'10:30 AM', image: U('photo-1528360983277-13d401cdc186') },
  { id:'cm-03', city:'Chiang Mai', country:'Thailand', source:'local',     tag:'Eat & Drink', title:'Khao Soi — Northern Thai Curry',     subtitle:'Authentic curry noodles • Old city street stalls',           time:'01:00 PM', image: U('photo-1574484284002-952d92456975') },
  { id:'cm-04', city:'Chiang Mai', country:'Thailand', source:'traveller', tag:'Events',      title:'Sunday Night Walking Market',        subtitle:'Ratchadamnoen Road • Crafts, live music, street food',       time:'06:00 PM', image: U('photo-1578662996442-48f60103fc96') },

  // ─── LISBON ───────────────────────────────────────────────────
  { id:'li-01', city:'Lisbon', country:'Portugal', source:'traveller', tag:'Experiences', title:'Tram 28 Ride + Alfama Wander',     subtitle:'Historic yellow tram • Cobblestone alleys, viewpoints',   time:'08:00 AM', image: U('photo-1555881400-74d7acaacd8b') },
  { id:'li-02', city:'Lisbon', country:'Portugal', source:'local',     tag:'Coworking',   title:'Work at Quase Café',              subtitle:'Alfama • Riverside views, specialty coffee',              time:'11:00 AM', image: U('photo-1554118811-1e0d58224f24') },
  { id:'li-03', city:'Lisbon', country:'Portugal', source:'traveller', tag:'Outdoors',    title:'Miradouros Viewpoint Walk',       subtitle:'Santa Luzia + Senhora do Monte • Tagus River panoramas',  time:'02:00 PM', image: U('photo-1548707309-dcebeab9ea9b') },
  { id:'li-04', city:'Lisbon', country:'Portugal', source:'local',     tag:'Events',      title:'Fado Evening in Bairro Alto',     subtitle:'Authentic Portuguese music • Local wine + petiscos',      time:'07:30 PM', image: U('photo-1585208798174-6cedd4a6aabe') },

  // ─── BALI (CANGGU) ────────────────────────────────────────────
  { id:'ba-01', city:'Bali (Canggu)', country:'Indonesia', source:'traveller', tag:'Outdoors',    title:'Sunrise Surf at Batu Bolong',      subtitle:'Beginner-friendly waves • Catch the golden hour',         time:'06:30 AM', image: U('photo-1502680390469-be75c86b636f') },
  { id:'ba-02', city:'Bali (Canggu)', country:'Indonesia', source:'traveller', tag:'Coworking',   title:'Work at Crate Cafe',               subtitle:'Co-working upstairs • Açaí bowls, fast Wi-Fi',            time:'09:30 AM', image: U('photo-1559305616-3f99cd43e353') },
  { id:'ba-03', city:'Bali (Canggu)', country:'Indonesia', source:'local',     tag:'Outdoors',    title:'Rice Field Scooter Ride',          subtitle:'Green paddies inland from Canggu • Serene and scenic',    time:'01:00 PM', image: U('photo-1537953773345-d172ccf13cf4') },
  { id:'ba-04', city:'Bali (Canggu)', country:'Indonesia', source:'traveller', tag:'Nightlife',   title:"Sunset at Echo Beach + Old Man's", subtitle:'Happy hour cocktails • Surf culture + social vibes',      time:'06:30 PM', image: U('photo-1573843981267-be1480dde4c0') },

  // ─── BANGKOK ──────────────────────────────────────────────────
  { id:'bk-01', city:'Bangkok', country:'Thailand', source:'traveller', tag:'Cultural',    title:'Wat Pho & Wat Arun Temples',      subtitle:'Reclining Buddha + Temple of Dawn • Chao Phraya ferry',   time:'08:00 AM', image: U('photo-1563492065599-3520f775eeed') },
  { id:'bk-02', city:'Bangkok', country:'Thailand', source:'traveller', tag:'Coworking',   title:'Work at Kaizen Coffee Co.',       subtitle:'Modern cafe • Iced latte, Wi-Fi, creative crowd',         time:'12:00 PM', image: U('photo-1509042239860-f550ce710b93') },
  { id:'bk-03', city:'Bangkok', country:'Thailand', source:'local',     tag:'Eat & Drink', title:'Wang Lang Market Street Food',   subtitle:'Local riverside market • Pad Thai, mango sticky rice',    time:'02:30 PM', image: U('photo-1559314809-0d155014e29e') },
  { id:'bk-04', city:'Bangkok', country:'Thailand', source:'local',     tag:'Nightlife',   title:'Yaowarat Chinatown Night Feast',  subtitle:'Night street food paradise • Grilled seafood & noodles',  time:'07:00 PM', image: U('photo-1508009603885-50cf7c579365') },

  // ─── MEDELLÍN ─────────────────────────────────────────────────
  { id:'me-01', city:'Medellín', country:'Colombia', source:'traveller', tag:'Experiences', title:'Comuna 13 Guided Street Art Tour', subtitle:'Escalators + street art • Stories of resilience',          time:'09:00 AM', image: U('photo-1598887141338-571d7d5bcd68') },
  { id:'me-02', city:'Medellín', country:'Colombia', source:'local',     tag:'Eat & Drink', title:'Arepas + Local Bites in Comunas',  subtitle:'Colombian street food • Empanadas, fresh juices',         time:'12:30 PM', image: U('photo-1600891964092-4316c288032e') },
  { id:'me-03', city:'Medellín', country:'Colombia', source:'traveller', tag:'Outdoors',    title:'Metrocable Panoramic Ride',        subtitle:'Line K to Santo Domingo • City hillside views',           time:'02:00 PM', image: U('photo-1614159613205-f6a9f6ec57a6') },
  { id:'me-04', city:'Medellín', country:'Colombia', source:'traveller', tag:'Coworking',   title:'Pergamino Café + El Poblado',      subtitle:'Specialty coffee work session • Trendy nomad spot',       time:'07:00 PM', image: U('photo-1495474472287-4d71bcdd2085') },

  // ─── MEXICO CITY ──────────────────────────────────────────────
  { id:'mx-01', city:'Mexico City', country:'Mexico', source:'traveller', tag:'Coworking',   title:'Cafe Nin Morning Work',           subtitle:'Roma Norte • Guava roll at Panadería Rosetta',            time:'08:00 AM', image: U('photo-1600093463592-8e36ae95ef56') },
  { id:'mx-02', city:'Mexico City', country:'Mexico', source:'local',     tag:'Eat & Drink', title:'Al Pastor Street Tacos',          subtitle:"Tacos Álvaro al pastor • Roma Norte's legendary taco",    time:'12:00 PM', image: U('photo-1565299585323-38d6b0865b47') },
  { id:'mx-03', city:'Mexico City', country:'Mexico', source:'traveller', tag:'Cultural',    title:'Chapultepec Castle + Park',       subtitle:'Historic palace on a hill • Panoramic city views',        time:'01:30 PM', image: U('photo-1518638150340-f706e86654de') },
  { id:'mx-04', city:'Mexico City', country:'Mexico', source:'local',     tag:'Nightlife',   title:'Roma Norte Taco Hop + Bars',      subtitle:'Taquería Orinoco + Birrería • Lively nights',             time:'07:00 PM', image: U('photo-1568605114967-8130f3a36994') },

  // ─── CAPE TOWN ────────────────────────────────────────────────
  { id:'ct-01', city:'Cape Town', country:'South Africa', source:'traveller', tag:'Outdoors',    title:'Table Mountain Summit via Cable Car', subtitle:'Early morning summit • 360° views of the Cape',     time:'08:00 AM', image: U('photo-1580060839134-75a5edca2e99') },
  { id:'ct-02', city:'Cape Town', country:'South Africa', source:'traveller', tag:'Coworking',   title:'Work at Bootlegger Coffee',           subtitle:'V&A Waterfront Silo District • Espresso & Wi-Fi',   time:'12:30 PM', image: U('photo-1495474472287-4d71bcdd2085') },
  { id:'ct-03', city:'Cape Town', country:'South Africa', source:'traveller', tag:'Cultural',    title:'V&A Waterfront + Zeitz MOCAA',        subtitle:'Contemporary African art + Nobel Square views',      time:'02:00 PM', image: U('photo-1562898694-4c3ff98ca10b') },
  { id:'ct-04', city:'Cape Town', country:'South Africa', source:'local',     tag:'Eat & Drink', title:'Sunset Seafood Dinner',               subtitle:'Willoughby & Co • Mountain backdrop, freshest catch', time:'07:00 PM', image: U('photo-1504674900247-0877df9cc836') },

  // ─── TAIPEI ───────────────────────────────────────────────────
  { id:'tp-01', city:'Taipei', country:'Taiwan', source:'traveller', tag:'Cultural',    title:'Longshan Temple & CKS Memorial', subtitle:'Ancient Buddhist temple + guard ceremony',              time:'09:00 AM', image: U('photo-1470004914212-05527e49370b') },
  { id:'tp-02', city:'Taipei', country:'Taiwan', source:'traveller', tag:'Coworking',   title:'Work at Fika Fika Cafe',         subtitle:'Scandinavian-style • Minimalist interior, great lattes', time:'11:30 AM', image: U('photo-1611175694989-4870fafa4494') },
  { id:'tp-03', city:'Taipei', country:'Taiwan', source:'local',     tag:'Eat & Drink', title:'Yongkang Street Dumplings',      subtitle:'Din Tai Fung + noodle street • Foodie paradise',        time:'01:00 PM', image: U('photo-1563245372-f21724e3856d') },
  { id:'tp-04', city:'Taipei', country:'Taiwan', source:'local',     tag:'Events',      title:'Raohe Street Night Market',      subtitle:'Pepper pork buns + stinky tofu • Ciyou Temple lit up',  time:'07:00 PM', image: U('photo-1518729371765-043e855f1a8b') },

  // ─── BUDAPEST ────────────────────────────────────────────────
  { id:'bp-01', city:'Budapest', country:'Hungary', source:'traveller', tag:'Cultural',  title:"Buda Castle + Fisherman's Bastion", subtitle:'Gothic towers + Parliament views • Danube panoramas',  time:'09:00 AM', image: U('photo-1551867633-194f125bddfa') },
  { id:'bp-02', city:'Budapest', country:'Hungary', source:'traveller', tag:'Experiences', title:'Chain Bridge Walk + Parliament',  subtitle:'Iconic bridge + Shoes on the Danube memorial',         time:'12:30 PM', image: U('photo-1548694870-5f9de1b2c99a') },
  { id:'bp-03', city:'Budapest', country:'Hungary', source:'traveller', tag:'Coworking',  title:'Szimpla Kert Afternoon Work',      subtitle:'Ruin bar atmosphere • Eclectic decor, cold brew',      time:'02:30 PM', image: U('photo-1545569341-9eb8b30979d9') },
  { id:'bp-04', city:'Budapest', country:'Hungary', source:'local',     tag:'Nightlife',  title:'Jewish Quarter Ruin Bar Crawl',    subtitle:'Mazel Tov dinner + Instant-Fogas megabar',             time:'07:00 PM', image: U('photo-1558618666-fcd25c85cd64') },

  // ─── TBILISI ──────────────────────────────────────────────────
  { id:'tb-01', city:'Tbilisi', country:'Georgia', source:'traveller', tag:'Cultural',    title:'Old Town + Narikala Fortress',       subtitle:'Cable car to fortress • Ancient sulphur bath district',  time:'09:00 AM', image: U('photo-1602080858428-57798f8c9a87') },
  { id:'tb-02', city:'Tbilisi', country:'Georgia', source:'local',     tag:'Coworking',   title:'Work at Mtatsminda Summit Cafe',     subtitle:'Mountain-top cafe views • Georgian coffee culture',     time:'11:30 AM', image: U('photo-1516035069371-29a1b244cc32') },
  { id:'tb-03', city:'Tbilisi', country:'Georgia', source:'local',     tag:'Eat & Drink', title:'Georgian Wine + Khinkali Dumplings', subtitle:'Authentic dumplings + local natural wine tasting',      time:'02:00 PM', image: U('photo-1601314167099-232775e39e4a') },
  { id:'tb-04', city:'Tbilisi', country:'Georgia', source:'local',     tag:'Nightlife',   title:'Rustaveli Ave + Craft Bar Scene',    subtitle:'Vibrant evenings • Open-air terraces, creative crowd',  time:'07:00 PM', image: U('photo-1470770841072-f978cf4d019e') },

  // ─── VALENCIA ────────────────────────────────────────────────
  { id:'va-01', city:'Valencia', country:'Spain', source:'traveller', tag:'Cultural',    title:'City of Arts & Sciences',       subtitle:"Futuristic Calatrava architecture • Calatrava's masterpiece", time:'09:00 AM', image: U('photo-1558531304-a4773b7e3a9c') },
  { id:'va-02', city:'Valencia', country:'Spain', source:'local',     tag:'Coworking',   title:'Work at Café Berlin',           subtitle:'Central Valencia • Good Wi-Fi, strong espresso, locals',    time:'11:00 AM', image: U('photo-1517701604599-bb29b565090c') },
  { id:'va-03', city:'Valencia', country:'Spain', source:'traveller', tag:'Eat & Drink', title:'Authentic Valencian Paella',    subtitle:'Malvarrosa Beach restaurant • Original paella birthplace',  time:'02:00 PM', image: U('photo-1534422298391-e4f8c172dddb') },
  { id:'va-04', city:'Valencia', country:'Spain', source:'local',     tag:'Nightlife',   title:'El Carmen Tapas & Rooftop Wine', subtitle:'Historic quarter • Rooftop bars, live music, sangria',     time:'07:00 PM', image: U('photo-1555396273-367ea4eb4db5') },

  // ─── KUALA LUMPUR ────────────────────────────────────────────
  { id:'kl-01', city:'Kuala Lumpur', country:'Malaysia', source:'traveller', tag:'Cultural',    title:'Batu Caves + Petronas Towers',    subtitle:'Hindu temple + iconic skyline • Dawn at the cave stairs', time:'08:30 AM', image: U('photo-1596422846543-75c6fc197f07') },
  { id:'kl-02', city:'Kuala Lumpur', country:'Malaysia', source:'traveller', tag:'Coworking',   title:'Work at Common Ground KLCC',      subtitle:'Premium co-working • Views, café below, fast internet',   time:'11:00 AM', image: U('photo-1497366216548-37526070297c') },
  { id:'kl-03', city:'Kuala Lumpur', country:'Malaysia', source:'local',     tag:'Eat & Drink', title:'Jalan Alor Hawker Street',        subtitle:"Malaysia's best hawker street • Char kway teow, satay",  time:'01:30 PM', image: U('photo-1565299585323-38d6b0865b47') },
  { id:'kl-04', city:'Kuala Lumpur', country:'Malaysia', source:'traveller', tag:'Nightlife',   title:'Heli Lounge Rooftop Bar',         subtitle:'KLCC views from rooftop helipad • Cocktails + city glow', time:'07:00 PM', image: U('photo-1477959858617-67f85cf4f1df') },

  // ─── PORTO ───────────────────────────────────────────────────
  { id:'po-01', city:'Porto', country:'Portugal', source:'traveller', tag:'Cultural',    title:'Ribeira District + Douro Riverfront', subtitle:'UNESCO riverfront • Colorful azulejo tile facades',      time:'09:00 AM', image: U('photo-1555881400-74d7acaacd8b') },
  { id:'po-02', city:'Porto', country:'Portugal', source:'local',     tag:'Coworking',   title:'Work at Moustache Café',              subtitle:'Specialty coffee • Laptop-friendly, central Porto',     time:'11:00 AM', image: U('photo-1442975631115-c4f7b05b8a2c') },
  { id:'po-03', city:'Porto', country:'Portugal', source:'traveller', tag:'Experiences', title:'Livraria Lello + Clérigos Tower',     subtitle:"World's most beautiful bookshop + panoramic bell tower", time:'02:00 PM', image: U('photo-1529903384028-929ae5dccdf1') },
  { id:'po-04', city:'Porto', country:'Portugal', source:'traveller', tag:'Eat & Drink', title:'Port Wine Tasting at a Wine Cave',    subtitle:'Vila Nova de Gaia • Riverside wine cellar tour',        time:'07:00 PM', image: U('photo-1510812431401-41d2bd2722f3') },

  // ─── BUENOS AIRES ────────────────────────────────────────────
  { id:'ba2-01', city:'Buenos Aires', country:'Argentina', source:'traveller', tag:'Cultural',    title:'La Boca + San Telmo Market',       subtitle:'Colorful street art • Tango performances in plazas',    time:'09:00 AM', image: U('photo-1589909202802-8f4aadce1849') },
  { id:'ba2-02', city:'Buenos Aires', country:'Argentina', source:'local',     tag:'Coworking',   title:'Cafe Tortoni Afternoon Work',      subtitle:'Historic 1858 cafe • Art Nouveau interiors, cortado',   time:'11:30 AM', image: U('photo-1521017432531-fbd92d768814') },
  { id:'ba2-03', city:'Buenos Aires', country:'Argentina', source:'local',     tag:'Eat & Drink', title:'Parrilla Asado Lunch',             subtitle:'Traditional Argentinian BBQ • Malbec + chimichurri',    time:'02:00 PM', image: U('photo-1544025162-d76538b4de2f') },
  { id:'ba2-04', city:'Buenos Aires', country:'Argentina', source:'traveller', tag:'Nightlife',   title:'Palermo Soho Rooftop Bars',        subtitle:'Trendy bars + craft beer • Late-night tango shows',     time:'08:00 PM', image: U('photo-1470470882813-de03c6bca01a') },

  // ─── PLAYA DEL CARMEN ────────────────────────────────────────
  { id:'pl-01', city:'Playa del Carmen', country:'Mexico', source:'traveller', tag:'Outdoors',    title:'Cenote Morning Swim',             subtitle:'Crystal-clear jungle pools • Cenote Azul or Dos Ojos',   time:'07:00 AM', image: U('photo-1543158181-e6f9f6712055') },
  { id:'pl-02', city:'Playa del Carmen', country:'Mexico', source:'traveller', tag:'Coworking',   title:'Work at Café Corazón',            subtitle:'5th Ave area • Beachside vibes, reliable Wi-Fi',         time:'10:00 AM', image: U('photo-1554118811-1e0d58224f24') },
  { id:'pl-03', city:'Playa del Carmen', country:'Mexico', source:'local',     tag:'Eat & Drink', title:'Tacos al Pastor + Mezcal',        subtitle:'Street taco crawl on 12th St • Best tacos in Riviera',   time:'01:00 PM', image: U('photo-1565299585323-38d6b0865b47') },
  { id:'pl-04', city:'Playa del Carmen', country:'Mexico', source:'traveller', tag:'Nightlife',   title:'5th Ave Sunset + Beach Clubs',    subtitle:"Mamita's Beach Club • Sunset cocktails + DJ vibes",      time:'06:30 PM', image: U('photo-1507525428034-b723cf961d3e') },

  // ─── HVAR ────────────────────────────────────────────────────
  { id:'hv-01', city:'Hvar', country:'Croatia', source:'traveller', tag:'Outdoors',    title:'Hvar Fortress Sunrise Hike',        subtitle:'Spanish Fortress views • Lavender fields at dawn',       time:'07:30 AM', image: U('photo-1555993539-1732b0258235') },
  { id:'hv-02', city:'Hvar', country:'Croatia', source:'local',     tag:'Coworking',   title:'Work at Carpe Diem Bar Terrace',    subtitle:'Waterfront terrace • Sea breeze + good Adriatic coffee',  time:'10:00 AM', image: U('photo-1586023492125-27b2c045efd7') },
  { id:'hv-03', city:'Hvar', country:'Croatia', source:'local',     tag:'Eat & Drink', title:'Grilled Octopus at Old Town Port',  subtitle:'Fresh Adriatic seafood • Octopus + local white Plavac',   time:'01:00 PM', image: U('photo-1534482421-64566f976cfa') },
  { id:'hv-04', city:'Hvar', country:'Croatia', source:'traveller', tag:'Outdoors',    title:'Pakleni Islands Boat Trip + Swim',  subtitle:'Island sunset hopping • Starlit social evening swim',     time:'06:30 PM', image: U('photo-1519046904884-53103b34b206') },

  // ─── VALLETTA ────────────────────────────────────────────────
  { id:'vl-01', city:'Valletta', country:'Malta', source:'traveller', tag:'Cultural',    title:'Valletta UNESCO Heritage Walk',   subtitle:'Walled city • Baroque architecture + Grand Harbour',      time:'09:00 AM', image: U('photo-1514890547357-a9ee288728e0') },
  { id:'vl-02', city:'Valletta', country:'Malta', source:'local',     tag:'Coworking',   title:'Work at Caffe Cordina',           subtitle:'Famous 1837 cafe • Baroque arcade, outdoor seating',      time:'11:00 AM', image: U('photo-1521017432531-fbd92d768814') },
  { id:'vl-03', city:'Valletta', country:'Malta', source:'traveller', tag:'Outdoors',    title:'Blue Grotto Sea Cave Boat Trip',  subtitle:'Stunning turquoise sea caves • Mediterranean light',      time:'02:00 PM', image: U('photo-1506905925346-21bda4d32df4') },
  { id:'vl-04', city:'Valletta', country:'Malta', source:'local',     tag:'Events',      title:'Upper Barrakka Gardens Sunset',   subtitle:'Cannon salute + harbour views + local pastizzi',          time:'07:00 PM', image: U('photo-1507501336603-6544a3a0369e') },

  // ─── AMSTERDAM ───────────────────────────────────────────────
  { id:'am-01', city:'Amsterdam', country:'Netherlands', source:'traveller', tag:'Outdoors',    title:'Canal Bike + Jordaan District',      subtitle:'Bike hire near Anne Frank House • Stroopwafel + coffee', time:'08:30 AM', image: U('photo-1534351590666-13e3e96b5017') },
  { id:'am-02', city:'Amsterdam', country:'Netherlands', source:'local',     tag:'Coworking',   title:'Work at Lot Sixty One Coffee',       subtitle:'West Amsterdam • Single-origin specialty espresso',      time:'11:00 AM', image: U('photo-1611175694989-4870fafa4494') },
  { id:'am-03', city:'Amsterdam', country:'Netherlands', source:'traveller', tag:'Cultural',    title:'Rijksmuseum + Vondelpark Picnic',    subtitle:'Dutch masters + leisurely park afternoon',               time:'02:00 PM', image: U('photo-1595209173622-e17bfb71a3a2') },
  { id:'am-04', city:'Amsterdam', country:'Netherlands', source:'traveller', tag:'Nightlife',   title:'Heineken Experience + Leidseplein',  subtitle:'Brewery tour + lively square bars • Late-night vibes',   time:'07:00 PM', image: U('photo-1560472354-b33ff0c44a43') },

  // ─── SEVILLE ─────────────────────────────────────────────────
  { id:'sv-01', city:'Seville', country:'Spain', source:'traveller', tag:'Cultural',    title:'Alcázar Palace Gardens + Cathedral', subtitle:'Royal Moorish palace + Giralda Tower climb',            time:'09:00 AM', image: U('photo-1558642452-9d2a7deb7f62') },
  { id:'sv-02', city:'Seville', country:'Spain', source:'local',     tag:'Coworking',   title:'Work at Gaspar Coffee',              subtitle:'Santa Cruz quarter • Outdoor terrace, strong Wi-Fi',    time:'11:30 AM', image: U('photo-1554118811-1e0d58224f24') },
  { id:'sv-03', city:'Seville', country:'Spain', source:'local',     tag:'Eat & Drink', title:'Tapas Bar Crawl',                    subtitle:'Bodega Santa Cruz + El Rinconcillo • Jamón + sherry',  time:'02:00 PM', image: U('photo-1555396273-367ea4eb4db5') },
  { id:'sv-04', city:'Seville', country:'Spain', source:'traveller', tag:'Events',      title:'Flamenco Show in Triana',            subtitle:'Authentic tablao performance • Passionate dance + sangria', time:'08:00 PM', image: U('photo-1489749798305-4fea3ae63d43') },

  // ─── UBUD ────────────────────────────────────────────────────
  { id:'ub-01', city:'Ubud', country:'Indonesia', source:'traveller', tag:'Outdoors',  title:'Tegalalang Rice Terrace Sunrise', subtitle:'Iconic terraced paddies • Morning mist + birdsong',       time:'06:00 AM', image: U('photo-1537996194471-e657df975ab4') },
  { id:'ub-02', city:'Ubud', country:'Indonesia', source:'traveller', tag:'Coworking', title:'Work at Seniman Coffee',          subtitle:'Specialty coffee + jungle patio • Great Wi-Fi',           time:'09:00 AM', image: U('photo-1559305616-3f99cd43e353') },
  { id:'ub-03', city:'Ubud', country:'Indonesia', source:'local',     tag:'Wellness',  title:'Warungs Lunch + Yoga Barn Class', subtitle:'Local Balinese rice + traditional yoga class',            time:'01:00 PM', image: U('photo-1545205597-3d9d02c29597') },
  { id:'ub-04', city:'Ubud', country:'Indonesia', source:'traveller', tag:'Cultural',  title:'Tirta Empul Temple Purification', subtitle:'Sacred bathing ritual • Sunset at Pura Luhur Uluwatu',   time:'05:00 PM', image: U('photo-1555400038-63f5ba517a47') },

  // ─── RISHIKESH ───────────────────────────────────────────────
  { id:'ri-01', city:'Rishikesh', country:'India', source:'local',     tag:'Events',    title:'Morning Ganga Aarti at Triveni Ghat', subtitle:'Sunrise river ceremony • Bells, fire, Himalayan air',   time:'06:00 AM', image: U('photo-1583367735697-00a81c93e40f') },
  { id:'ri-02', city:'Rishikesh', country:'India', source:'traveller', tag:'Coworking', title:'Work at Cafe de Goa',                 subtitle:'Lakshman Jhula area • Riverside Wi-Fi cafe',            time:'09:00 AM', image: U('photo-1554118811-1e0d58224f24') },
  { id:'ri-03', city:'Rishikesh', country:'India', source:'traveller', tag:'Outdoors',  title:'White Water Rafting on the Ganges',   subtitle:'Grade 3-4 rapids • 16km stretch, guided adventure',     time:'01:00 PM', image: U('photo-1529963183134-61a90db47eaf') },
  { id:'ri-04', city:'Rishikesh', country:'India', source:'traveller', tag:'Wellness',  title:'Beatles Ashram Sunset + Yoga',        subtitle:'Maharishi ashram ruins • Evening yoga by the river',    time:'06:00 PM', image: U('photo-1545205597-3d9d02c29597') },

  // ─── UDAIPUR ─────────────────────────────────────────────────
  { id:'ud-01', city:'Udaipur', country:'India', source:'traveller', tag:'Cultural',    title:'City Palace + Lake Pichola Boat', subtitle:'Royal heritage • Mirrored palace, serene boat crossing',  time:'08:00 AM', image: U('photo-1587922546307-776227941871') },
  { id:'ud-02', city:'Udaipur', country:'India', source:'local',     tag:'Coworking',   title:'Work at Millets of Mewar',        subtitle:'Aesthetic rooftop cafe • Lake views, Wi-Fi',             time:'10:30 AM', image: U('photo-1414235077428-338989a2e8c0') },
  { id:'ud-03', city:'Udaipur', country:'India', source:'local',     tag:'Eat & Drink', title:'Dal Baati Churma Thali',          subtitle:'Royal Rajasthani thali at a heritage restaurant',         time:'01:00 PM', image: U('photo-1585937421612-70a008356fbe') },
  { id:'ud-04', city:'Udaipur', country:'India', source:'traveller', tag:'Events',      title:'Jagdish Temple Sunset Aarti',     subtitle:'Evening temple aarti ritual • Sunset over Lake Pichola',  time:'06:30 PM', image: U('photo-1466442929976-97f336a657be') },

  // ─── JAIPUR ──────────────────────────────────────────────────
  { id:'ja-01', city:'Jaipur', country:'India', source:'traveller', tag:'Cultural',    title:'Amber Fort + Elephant Stables',   subtitle:'Hilltop Mughal architecture • Early golden hour light',  time:'08:00 AM', image: U('photo-1599661046289-e31897846e41') },
  { id:'ja-02', city:'Jaipur', country:'India', source:'local',     tag:'Coworking',   title:'Work at Anokhi Cafe',             subtitle:'Boutique heritage cafe • Filtered coffee, quiet workspace', time:'11:00 AM', image: U('photo-1554118811-1e0d58224f24') },
  { id:'ja-03', city:'Jaipur', country:'India', source:'traveller', tag:'Cultural',    title:'Hawa Mahal + Pink City Market',   subtitle:'Wind Palace + Johari Bazaar • Gem + textile shopping',    time:'02:00 PM', image: U('photo-1477587458883-47145ed6736e') },
  { id:'ja-04', city:'Jaipur', country:'India', source:'local',     tag:'Events',      title:'Chokhi Dhani Folk Dinner',        subtitle:'Folk performances • Dal makhani under stars',              time:'07:00 PM', image: U('photo-1568605114967-8130f3a36994') },

  // ─── OLD MANALI ──────────────────────────────────────────────
  { id:'om-01', city:'Old Manali', country:'India', source:'traveller', tag:'Cultural',    title:'Hadimba Temple + Cedar Forest',    subtitle:'Pagoda temple in deodar forest • Morning mist silence', time:'07:00 AM', image: U('photo-1470770841072-f978cf4d019e') },
  { id:'om-02', city:'Old Manali', country:'India', source:'local',     tag:'Coworking',   title:'Work at Lazy Dog Cafe',            subtitle:'River-facing terrace • Himalayan backdrop, espresso',   time:'10:00 AM', image: U('photo-1442975631115-c4f7b05b8a2c') },
  { id:'om-03', city:'Old Manali', country:'India', source:'local',     tag:'Eat & Drink', title:'Tibetan Thukpa + Momos',           subtitle:'Authentic Tibetan kitchens • Warming & hearty',         time:'01:00 PM', image: U('photo-1563245372-f21724e3856d') },
  { id:'om-04', city:'Old Manali', country:'India', source:'traveller', tag:'Outdoors',    title:'Solang Valley Hike + Bonfire',     subtitle:'Paragliding viewpoint + social bonfire under stars',    time:'05:00 PM', image: U('photo-1506905925346-21bda4d32df4') },

  // ─── GOKARNA ─────────────────────────────────────────────────
  { id:'go-01', city:'Gokarna', country:'India', source:'traveller', tag:'Outdoors',  title:'Om Beach Sunrise + Kayaking',       subtitle:'Om-shaped beach • Crystal water, no crowds, kayaks',    time:'06:30 AM', image: U('photo-1507525428034-b723cf961d3e') },
  { id:'go-02', city:'Gokarna', country:'India', source:'local',     tag:'Coworking', title:'Work at Namaste Cafe',              subtitle:'Beachside hammock cafe • Jungle-to-sea Wi-Fi zone',     time:'10:00 AM', image: U('photo-1559305616-3f99cd43e353') },
  { id:'go-03', city:'Gokarna', country:'India', source:'traveller', tag:'Outdoors',  title:'Half Moon & Paradise Beach Trek',   subtitle:'2km cliff hike • Secluded beaches by foot/boat only',   time:'01:00 PM', image: U('photo-1519046904884-53103b34b206') },
  { id:'go-04', city:'Gokarna', country:'India', source:'local',     tag:'Events',    title:'Mahabaleshwar Temple + Campfire',   subtitle:'Ancient Shiva temple + beachside bonfire',              time:'06:30 PM', image: U('photo-1476514525535-07fb3b4ae5f1') },

  // ─── MYSORE ──────────────────────────────────────────────────
  { id:'my-01', city:'Mysore', country:'India', source:'traveller', tag:'Cultural',    title:'Mysore Palace Morning Tour',         subtitle:'Indo-Saracenic royal palace • Sunday illumination view', time:'08:30 AM', image: U('photo-1599661046289-e31897846e41') },
  { id:'my-02', city:'Mysore', country:'India', source:'local',     tag:'Coworking',   title:'Work at Infini Coffee Roasters',     subtitle:'Specialty coffee, garden seating • Excellent Wi-Fi',    time:'11:00 AM', image: U('photo-1495474472287-4d71bcdd2085') },
  { id:'my-03', city:'Mysore', country:'India', source:'local',     tag:'Eat & Drink', title:'Mysore Masala Dosa Breakfast',       subtitle:'Authentic Karnataka darshini • Local filter coffee',    time:'01:00 PM', image: U('photo-1585937421612-70a008356fbe') },
  { id:'my-04', city:'Mysore', country:'India', source:'traveller', tag:'Outdoors',    title:'Chamundi Hill 1000-Step Sunset',     subtitle:'1000-step stairway • Hilltop temple + city panorama',   time:'05:00 PM', image: U('photo-1533929736458-ca588d08c8be') },

  // ─── PUDUCHERRY ──────────────────────────────────────────────
  { id:'pu-01', city:'Puducherry', country:'India', source:'traveller', tag:'Cultural',    title:'French Quarter Walk + Promenade',  subtitle:'Colonial ochre facades • Beach promenade at sunrise',   time:'07:00 AM', image: U('photo-1552465011-b4e21bf6e79a') },
  { id:'pu-02', city:'Puducherry', country:'India', source:'local',     tag:'Coworking',   title:'Work at Le Café',                  subtitle:'Seafront government beach terrace • Breezy workspace',  time:'10:00 AM', image: U('photo-1554118811-1e0d58224f24') },
  { id:'pu-03', city:'Puducherry', country:'India', source:'local',     tag:'Eat & Drink', title:'Creole & Tamil Fusion Lunch',      subtitle:'Café des Arts • Indo-French cuisine',                   time:'01:00 PM', image: U('photo-1414235077428-338989a2e8c0') },
  { id:'pu-04', city:'Puducherry', country:'India', source:'traveller', tag:'Wellness',    title:'Auroville Sunset + Matrimandir',   subtitle:'Geodesic meditation sphere • Spiritual golden hour',    time:'05:00 PM', image: U('photo-1545205597-3d9d02c29597') },

  // ─── MCLEOD GANJ ─────────────────────────────────────────────
  { id:'mg-01', city:'McLeod Ganj', country:'India', source:'traveller', tag:'Outdoors',    title:'Bhagsu Nag Waterfall Hike',         subtitle:'Mountain trail • Tibetan prayer flags, cool forest',     time:'07:00 AM', image: U('photo-1464822759023-fed622ff2c3b') },
  { id:'mg-02', city:'McLeod Ganj', country:'India', source:'local',     tag:'Coworking',   title:'Work at Moonpeak Espresso',         subtitle:'Specialty Tibetan cafe • Mountain views, yak butter tea', time:'10:00 AM', image: U('photo-1495474472287-4d71bcdd2085') },
  { id:'mg-03', city:'McLeod Ganj', country:'India', source:'local',     tag:'Eat & Drink', title:'Tibetan Momos at Shambhala',        subtitle:'Dumplings + thukpa noodles • Cozy Tibetan kitchen',     time:'01:00 PM', image: U('photo-1563245372-f21724e3856d') },
  { id:'mg-04', city:'McLeod Ganj', country:'India', source:'traveller', tag:'Wellness',    title:'Dalai Lama Temple + Meditation',    subtitle:'Namgyal Monastery • Buddhist prayer flags sunset ritual', time:'05:00 PM', image: U('photo-1466921583968-f07aa80c526e') },

  // ─── SHILLONG ────────────────────────────────────────────────
  { id:'sh-01', city:'Shillong', country:'India', source:'traveller', tag:'Outdoors',    title:"Ward's Lake Morning Row",           subtitle:'Misty morning rowing • Colonial lakeside botanical garden', time:'07:00 AM', image: U('photo-1477950014900-c38d0d0d0c4e') },
  { id:'sh-02', city:'Shillong', country:'India', source:'local',     tag:'Coworking',   title:'Work at Cafe Shillong',             subtitle:'Indie cafe with rolling misty hills • Chai + local brews', time:'10:00 AM', image: U('photo-1554118811-1e0d58224f24') },
  { id:'sh-03', city:'Shillong', country:'India', source:'traveller', tag:'Outdoors',    title:'Elephant Falls + Don Bosco Museum', subtitle:'Triple-tier waterfall + Northeast tribal cultural museum', time:'01:00 PM', image: U('photo-1432405972618-c60b0225b8f9') },
  { id:'sh-04', city:'Shillong', country:'India', source:'local',     tag:'Eat & Drink', title:'Police Bazar Street Food Night',    subtitle:'Jadoh rice pork + local NE snacks • Evening street life', time:'06:00 PM', image: U('photo-1559314809-0d155014e29e') },

  // ─── DARJEELING ──────────────────────────────────────────────
  { id:'da-01', city:'Darjeeling', country:'India', source:'traveller', tag:'Outdoors',    title:'Tiger Hill Sunrise over Kanchenjunga', subtitle:'3rd highest peak glows at dawn • Iconic view',         time:'05:00 AM', image: U('photo-1470770841072-f978cf4d019e') },
  { id:'da-02', city:'Darjeeling', country:'India', source:'local',     tag:'Coworking',   title:"Work at Glenary's Café",              subtitle:"Heritage 1935 bakery-cafe • Terrace, Darjeeling tea",  time:'09:00 AM', image: U('photo-1442975631115-c4f7b05b8a2c') },
  { id:'da-03', city:'Darjeeling', country:'India', source:'traveller', tag:'Experiences', title:'Happy Valley Tea Estate Walk',        subtitle:'Working tea garden tour • Plucking and processing demo', time:'01:00 PM', image: U('photo-1523301343968-6a6ebf63c672') },
  { id:'da-04', city:'Darjeeling', country:'India', source:'traveller', tag:'Events',      title:'Toy Train Ride + Mall Road',          subtitle:'UNESCO Himalayan railway + local momos street dinner',  time:'05:00 PM', image: U('photo-1474418397713-7ede21d49118') },

  // ─── KOCHI ───────────────────────────────────────────────────
  { id:'ko-01', city:'Kochi', country:'India', source:'traveller', tag:'Cultural',    title:'Fort Kochi Heritage Walk',          subtitle:'Chinese fishing nets + Jewish Synagogue + antiques lane', time:'08:00 AM', image: U('photo-1557750255-c06826e74a0d') },
  { id:'ko-02', city:'Kochi', country:'India', source:'local',     tag:'Coworking',   title:'Work at Kashi Art Cafe',            subtitle:"Artist's cafe • Freshly ground Malabar coffee",          time:'11:00 AM', image: U('photo-1554118811-1e0d58224f24') },
  { id:'ko-03', city:'Kochi', country:'India', source:'traveller', tag:'Cultural',    title:'Mattancherry Palace + Spice Market', subtitle:'Dutch palace frescoes + fragrant spice bazaar',          time:'02:00 PM', image: U('photo-1536680989-1cd57d5c80f8') },
  { id:'ko-04', city:'Kochi', country:'India', source:'local',     tag:'Events',      title:'Kathakali Show + Seafood Dinner',    subtitle:'Classical Kerala dance + fresh prawn masala',           time:'07:00 PM', image: U('photo-1504674900247-0877df9cc836') },

  // ─── BIR BILLING ─────────────────────────────────────────────
  { id:'bb-01', city:'Bir Billing', country:'India', source:'traveller', tag:'Cultural',    title:'Bir Village + Tibetan Monastery',     subtitle:'Tibetan colony + morning monastery prayers ritual',      time:'08:00 AM', image: U('photo-1466421583534-44a1f8a69049') },
  { id:'bb-02', city:'Bir Billing', country:'India', source:'traveller', tag:'Outdoors',    title:'Paragliding from Billing Launch',     subtitle:'World paragliding capital • 2500m launch, 1–2hr flight',time:'10:00 AM', image: U('photo-1530870110042-98b2cb110834') },
  { id:'bb-03', city:'Bir Billing', country:'India', source:'local',     tag:'Coworking',   title:'Work at Illiterati Cafe',             subtitle:'Hippie-boho cafe • Mountain view, slow pour-over coffee', time:'01:00 PM', image: U('photo-1559305616-3f99cd43e353') },
  { id:'bb-04', city:'Bir Billing', country:'India', source:'local',     tag:'Events',      title:'Chögling Monastery Sunset Bonfire',   subtitle:'Monastery golden hour + bonfire with digital nomads',    time:'06:00 PM', image: U('photo-1476514525535-07fb3b4ae5f1') },

  // ─── ANDAMAN ISLANDS ─────────────────────────────────────────
  { id:'an-01', city:'Andaman Islands', country:'India', source:'traveller', tag:'Outdoors',    title:'Radhanagar Beach Sunrise',         subtitle:"Asia's finest beach at dawn • Jade water, pristine sand", time:'07:00 AM', image: U('photo-1507525428034-b723cf961d3e') },
  { id:'an-02', city:'Andaman Islands', country:'India', source:'traveller', tag:'Outdoors',    title:'Elephant Beach Snorkeling',        subtitle:'Coral reefs by speedboat • Sea turtles + fish schools',  time:'10:00 AM', image: U('photo-1544551763-46a013bb70d5') },
  { id:'an-03', city:'Andaman Islands', country:'India', source:'local',     tag:'Eat & Drink', title:'Seafood Shack Beachfront Lunch',   subtitle:'Grilled barracuda + coconut rice • Rustic beachfront',   time:'01:00 PM', image: U('photo-1504674900247-0877df9cc836') },
  { id:'an-04', city:'Andaman Islands', country:'India', source:'traveller', tag:'Outdoors',    title:'Limestone Bridge Sunset Night',    subtitle:'Neil Island sunset + bioluminescent beach experience',   time:'05:30 PM', image: U('photo-1566438480900-0609be27a4be') },

  // ─── JODHPUR ─────────────────────────────────────────────────
  { id:'jo-01', city:'Jodhpur', country:'India', source:'traveller', tag:'Cultural',    title:'Mehrangarh Fort Sunrise',           subtitle:'Towering blue city fortress • Golden morning first light', time:'08:00 AM', image: U('photo-1524492412937-b28074a5d7da') },
  { id:'jo-02', city:'Jodhpur', country:'India', source:'local',     tag:'Coworking',   title:'Work at Indique Terrace Cafe',      subtitle:'Fort-view terrace • Blue city panorama, coffee',          time:'11:00 AM', image: U('photo-1414235077428-338989a2e8c0') },
  { id:'jo-03', city:'Jodhpur', country:'India', source:'local',     tag:'Eat & Drink', title:'Clock Tower Spice Market',         subtitle:'Ghanta Ghar bazaar • Silver market, local street food',   time:'02:00 PM', image: U('photo-1585937421612-70a008356fbe') },
  { id:'jo-04', city:'Jodhpur', country:'India', source:'traveller', tag:'Events',      title:'Desert Camp Folk Dinner',          subtitle:'Folk music + fire dances • Laal maas under open sky',     time:'07:00 PM', image: U('photo-1476514525535-07fb3b4ae5f1') },

  // ─── VARANASI ────────────────────────────────────────────────
  { id:'vr-01', city:'Varanasi', country:'India', source:'local',     tag:'Events',    title:'Assi Ghat Sunrise Boat + Aarti', subtitle:'Sacred Ganga dawn boat ceremony • ₹200 per shared boat',    time:'05:00 AM', image: U('photo-1561361058-c24cecae35ca') },
  { id:'vr-02', city:'Varanasi', country:'India', source:'traveller', tag:'Coworking', title:'Work at Assi Ghat Cafe',         subtitle:'Backpacker breezy terrace • Chai, Wi-Fi, spiritual vibe',  time:'10:00 AM', image: U('photo-1554118811-1e0d58224f24') },
  { id:'vr-03', city:'Varanasi', country:'India', source:'traveller', tag:'Cultural',  title:'Kashi Vishwanath + Old City Walk', subtitle:'Sacred Shiva temple • Narrow gali photography trail',       time:'02:00 PM', image: U('photo-1466442929976-97f336a657be') },
  { id:'vr-04', city:'Varanasi', country:'India', source:'local',     tag:'Events',    title:'Dashashwamedh Evening Ganga Aarti', subtitle:'Grand river fire ritual • Bells, priests, incense',       time:'07:00 PM', image: U('photo-1561361058-c24cecae35ca') },

  // ─── COORG ───────────────────────────────────────────────────
  { id:'co-01', city:'Coorg', country:'India', source:'traveller', tag:'Outdoors',    title:'Abbey Falls + Coffee Plantation', subtitle:'Waterfall through coffee estate • Morning mist magic',    time:'07:00 AM', image: U('photo-1523301343968-6a6ebf63c672') },
  { id:'co-02', city:'Coorg', country:'India', source:'local',     tag:'Coworking',   title:'Work at Misty Woods Cafe',        subtitle:'Estate-side cafe • Plantation views, local filter coffee', time:'10:00 AM', image: U('photo-1442975631115-c4f7b05b8a2c') },
  { id:'co-03', city:'Coorg', country:'India', source:'local',     tag:'Eat & Drink', title:'Coorgi Pandi Curry Lunch',        subtitle:'Kodava local pork curry + kadambuttu • Authentic home', time:'01:00 PM', image: U('photo-1600891964092-4316c288032e') },
  { id:'co-04', city:'Coorg', country:'India', source:'traveller', tag:'Cultural',    title:'Namdroling Monastery Sunset',     subtitle:'Tibetan Buddhist golden temple • Ornate painted walls',  time:'05:00 PM', image: U('photo-1466421583534-44a1f8a69049') },

  // ─── AMRITSAR ────────────────────────────────────────────────
  { id:'am2-01', city:'Amritsar', country:'India', source:'local',     tag:'Events',    title:'Golden Temple Sunrise + Langar',    subtitle:'Harmandir Sahib at dawn • Free community breakfast',       time:'05:00 AM', image: U('photo-1587922546307-776227941871') },
  { id:'am2-02', city:'Amritsar', country:'India', source:'local',     tag:'Coworking', title:'Work at Heritage Street Cafe',      subtitle:'Calm morning cafe near Temple • Lassi + parathas',        time:'10:00 AM', image: U('photo-1554118811-1e0d58224f24') },
  { id:'am2-03', city:'Amritsar', country:'India', source:'traveller', tag:'Cultural',  title:'Jallianwala Bagh + Partition Museum', subtitle:'Sobering historical walk • Essential + emotional',      time:'01:00 PM', image: U('photo-1599661046289-e31897846e41') },
  { id:'am2-04', city:'Amritsar', country:'India', source:'traveller', tag:'Events',    title:'Wagah Border Retreat Ceremony',     subtitle:'Patriotic flag ceremony at Indo-Pak border • Iconic crowd', time:'05:00 PM', image: U('photo-1515091943-9d5c0ad475af') },

  // ─── PUSHKAR ─────────────────────────────────────────────────
  { id:'pk-01', city:'Pushkar', country:'India', source:'local',     tag:'Cultural',    title:'Brahma Temple + Sacred Lake Dawn',  subtitle:'Only Brahma temple in India • Purple dawn sky, holy dip', time:'07:00 AM', image: U('photo-1477959858617-67f85cf4f1df') },
  { id:'pk-02', city:'Pushkar', country:'India', source:'traveller', tag:'Coworking',   title:'Work at Out of the Blue Cafe',      subtitle:'Lakeside rooftop • Hippie travelers, chai, good signal',   time:'10:00 AM', image: U('photo-1559305616-3f99cd43e353') },
  { id:'pk-03', city:'Pushkar', country:'India', source:'local',     tag:'Eat & Drink', title:'Malpua & Rabri Rajasthani Sweets',  subtitle:'Pure veg sweets + thali at rooftop terrace restaurant',   time:'01:00 PM', image: U('photo-1585937421612-70a008356fbe') },
  { id:'pk-04', city:'Pushkar', country:'India', source:'traveller', tag:'Outdoors',    title:'Savitri Temple Hilltop Sunset',     subtitle:'Desert town panorama • Rope-way or 700-step hike',        time:'05:00 PM', image: U('photo-1506905925346-21bda4d32df4') },

  // ─── LEH ─────────────────────────────────────────────────────
  { id:'le-01', city:'Leh', country:'India', source:'traveller', tag:'Cultural',  title:'Shanti Stupa + Magnetic Hill',         subtitle:'Peace stupa sunrise + gravity optical illusion road',     time:'08:00 AM', image: U('photo-1506905925346-21bda4d32df4') },
  { id:'le-02', city:'Leh', country:'India', source:'local',     tag:'Coworking', title:"Work at Bon Appétit Cafe",              subtitle:'Old Leh market square • Himalayan backdrop, pour-over',   time:'11:00 AM', image: U('photo-1442975631115-c4f7b05b8a2c') },
  { id:'le-03', city:'Leh', country:'India', source:'traveller', tag:'Cultural',  title:'Leh Palace + Woolen Market',           subtitle:'Tibetan 9-storey palace ruins • Local crafts + shopping', time:'01:00 PM', image: U('photo-1524492412937-b28074a5d7da') },
  { id:'le-04', city:'Leh', country:'India', source:'traveller', tag:'Outdoors',  title:'Sangam — Indus & Zanskar Confluence',  subtitle:'Two rivers meet • Turquoise vs brown stunning contrast',  time:'05:00 PM', image: U('photo-1464822759023-fed622ff2c3b') },

  // ─── KASOL ───────────────────────────────────────────────────
  { id:'ka-01', city:'Kasol', country:'India', source:'traveller', tag:'Outdoors',  title:'Kheerganga Trek Start',         subtitle:'13km forest trek to hot spring at summit • Full day',     time:'08:00 AM', image: U('photo-1464822759023-fed622ff2c3b') },
  { id:'ka-02', city:'Kasol', country:'India', source:'traveller', tag:'Outdoors',  title:'Parvati Valley Pine Forest Walk', subtitle:'Mountain streams + pine foliage • Dhaba lunch on trail', time:'12:00 PM', image: U('photo-1470770841072-f978cf4d019e') },
  { id:'ka-03', city:'Kasol', country:'India', source:'local',     tag:'Coworking', title:'Work at Evergreen Cafe',         subtitle:'Israeli cafe culture • Shakshuka + freshly brewed coffee', time:'03:00 PM', image: U('photo-1554118811-1e0d58224f24') },
  { id:'ka-04', city:'Kasol', country:'India', source:'local',     tag:'Events',    title:'Chalal Village Bonfire Night',   subtitle:'Community bonfire, acoustic music, stars in the sky',    time:'06:30 PM', image: U('photo-1476514525535-07fb3b4ae5f1') },

  // ─── HAMPI ───────────────────────────────────────────────────
  { id:'hm-01', city:'Hampi', country:'India', source:'traveller', tag:'Cultural',  title:'Virupaksha Temple & Ruins', subtitle:'Ancient Vijayanagara empire • Chariot and elephant stables',   time:'09:30 AM', image: U('photo-1620766182966-c6eb5ed2b788') },
  { id:'hm-02', city:'Hampi', country:'India', source:'traveller', tag:'Outdoors',  title:'Matanga Hill Sunrise',      subtitle:'Panoramic boulder landscape • Breathtaking views at dawn',       time:'06:00 AM', image: U('photo-1610017163881-220a234371ae') },
  { id:'hm-03', city:'Hampi', country:'India', source:'local',     tag:'Eat & Drink', title:'Mango Tree Restaurant',   subtitle:'Riverside thali & banana flower curry • Relaxed traveler vibe',  time:'01:00 PM', image: U('photo-1585937421612-70a008356fbe') },
  { id:'hm-04', city:'Hampi', country:'India', source:'local',     tag:'Outdoors',    title:'Coracle Ride & Sunset',   subtitle:'Round boat river crossing • Hippie island sunset on Sanapur Lake', time:'05:00 PM', image: U('photo-1544551763-46a013bb70d5') },
];

// ─── Utility Helpers ─────────────────────────────────────────────────────────

/** Get all recommendation cards for a city */
export const getRecommendationsForCity = (city) => {
  if (!city) return [];
  return RECOMMENDATIONS.filter(r =>
    r.city.toLowerCase() === city.toLowerCase() ||
    city.toLowerCase().includes(r.city.toLowerCase()) ||
    r.city.toLowerCase().includes(city.toLowerCase())
  );
};

/** Get recommendations filtered by source and/or tag */
export const filterRecommendations = (city, { source, tag } = {}) => {
  let results = getRecommendationsForCity(city);
  if (source) results = results.filter(r => r.source === source);
  if (tag) results = results.filter(r => r.tag === tag);
  return results;
};

/** All unique cities in the recommendations list */
export const RECOMMENDATION_CITIES = [...new Set(RECOMMENDATIONS.map(r => r.city))];

/** Tag colour map for rendering */
export const TAG_COLORS = {
  'Experiences': { bg: '#FFF3E0', text: '#E65100' },
  'Coworking':   { bg: '#E8F5E9', text: '#2E7D32' },
  'Eat & Drink': { bg: '#FFF8E1', text: '#F57F17' },
  'Nightlife':   { bg: '#EDE7F6', text: '#4527A0' },
  'Outdoors':    { bg: '#E0F2F1', text: '#00695C' },
  'Cultural':    { bg: '#E3F2FD', text: '#1565C0' },
  'Wellness':    { bg: '#FCE4EC', text: '#880E4F' },
  'Events':      { bg: '#F3E5F5', text: '#6A1B9A' },
};
