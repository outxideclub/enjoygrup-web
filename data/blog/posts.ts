export interface BlogLocalizedText {
  es: string;
  en: string;
  de?: string;
  fr?: string;
  it?: string;
}

export interface BlogPost {
  slug: string;
  title: BlogLocalizedText;
  excerpt: BlogLocalizedText;
  content: BlogLocalizedText;
  author: string;
  date: string;
  image: string;
  tags: string[];
  venue?: "enjoy" | "outxide" | "hiru" | "general";
  readingTime: number;
}

export type BlogLocale = "es" | "en" | "de" | "fr" | "it";

export function toBlogLocale(locale: string): BlogLocale {
  if (locale === "en") return "en";
  if (locale === "de") return "de";
  if (locale === "fr") return "fr";
  if (locale === "it") return "it";
  return "es";
}

export function getPostText(
  text: BlogLocalizedText,
  locale: BlogLocale
): string {
  return text[locale] || text.es;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "mejores-restaurantes-alcudia-mallorca",
    title: {
      es: "Mejores Restaurantes en Alcudia: Donde Comer Bien en 2026",
      en: "Best Restaurants in Alcudia: Where to Eat in Mallorca (2026)",
      de: "Beste Restaurants in Alcudia: Wo man auf Mallorca gut essen kann (2026)",
      fr: "Meilleurs Restaurants a Alcudia : Ou Bien Manger a Majorque (2026)",
      it: "Migliori Ristoranti ad Alcudia: Dove Mangiare Bene a Maiorca (2026)",
    },
    excerpt: {
      es: "Descubre los mejores restaurantes en Alcudia y Port d'Alcudia: paella, cocina mediterranea, terraza, marisco y mucho mas. Guia actualizada con donde comer en Alcudia, Mallorca.",
      en: "Discover the best restaurants in Alcudia and Port d'Alcudia: paella, Mediterranean cuisine, terrace dining, seafood and more. Updated guide on where to eat in Alcudia, Mallorca.",
      de: "Entdecken Sie die besten Restaurants in Alcudia und Port d'Alcudia: Paella, mediterrane Kueche, Terrassen-Restaurants, Meeresfruechte und mehr. Aktueller Guide zum Essen auf Mallorca.",
      fr: "Decouvrez les meilleurs restaurants a Alcudia et Port d'Alcudia : paella, cuisine mediterraneenne, terrasse, fruits de mer et plus. Guide actualise pour manger a Alcudia, Majorque.",
      it: "Scopri i migliori ristoranti ad Alcudia e Port d'Alcudia: paella, cucina mediterranea, terrazza, frutti di mare e molto altro. Guida aggiornata su dove mangiare ad Alcudia, Maiorca.",
    },
    content: {
      es: `<p>Si te preguntas donde comer en Alcudia, estas en el lugar correcto. El norte de Mallorca se ha consolidado como uno de los destinos gastronomicos mas interesantes de la isla, con una oferta que va desde arroces y paellas frente al mar hasta cocina de autor con producto local de primera. En esta guia repasamos los mejores restaurantes en Alcudia y Port d'Alcudia para que aciertes en cada comida de tus vacaciones.</p>

<h2>1. Hiru Food &amp; Drinks: la referencia gastronomica de Alcudia</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> se ha convertido en el restaurante imprescindible de Port d'Alcudia. Ubicado en la Ctra. d'Arta 40, Hiru combina cocina a la brasa de alto nivel con un ambiente moderno y relajado que funciona tanto para una comida familiar como para una cena romantica o una celebracion con amigos.</p>
<h3>Que hace especial a Hiru</h3>
<p>La cocina de Hiru gira en torno al fuego y al producto de calidad. Sus carnes maduradas dry-aged son una de las grandes especialidades: piezas seleccionadas que se maduran durante semanas para conseguir un sabor y una textura excepcionales. Los arroces son otro pilar fundamental de la carta. La paella de marisco, elaborada con producto fresco de la lonja, es uno de los platos mas demandados. Tambien destacan los arroces caldosos con bogavante y los arroces negros. El pescado del Mediterraneo, cocinado a la brasa, completa una propuesta gastronomica redonda.</p>
<h3>Terraza y ambiente</h3>
<p>Hiru cuenta con una amplia terraza que es el lugar perfecto para una cena de verano al aire libre. El interior mantiene una estetica contemporanea y acogedora. Ademas, su cocktail bar ofrece combinados de autor y una carta de vinos bien pensada. El restaurante esta abierto hasta tarde, lo que lo convierte en el punto de partida ideal para continuar la noche en Port d'Alcudia.</p>
<p><strong>Horario:</strong> De 12:00 a 23:30 (viernes y sabado hasta la 1:00). Cierra los martes. Reservar mesa en Alcudia es muy recomendable, especialmente en temporada alta.</p>

<h2>Donde Comer Paella en Alcudia</h2>
<p>La paella es, sin duda, uno de los platos que todo visitante quiere probar en Mallorca. En Alcudia hay varias opciones para disfrutar de un buen arroz, pero no todos los restaurantes la preparan con el mismo cuidado. Aqui van nuestras recomendaciones para comer paella en Alcudia.</p>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> encabeza la lista por una razon clara: sus arroces se preparan con caldo casero, marisco fresco de la lonja local y el punto justo de coccion que marca la diferencia entre una paella correcta y una memorable. La paella de marisco y el arroz caldoso con bogavante son los favoritos de quienes repiten.</p>

<h3>2. Can Costa</h3>
<p>Un clasico de la zona con anos de trayectoria. Especializado en cocina mallorquina y arroces. Buen sitio para probar platos tipicos de la isla en un ambiente familiar. Se encuentra en el casco antiguo de Alcudia.</p>

<h3>3. Bistro Mar</h3>
<p>Restaurante frente al paseo maritimo de Port d'Alcudia con vistas al mar. Ofrece paellas y fideuaes con marisco ademas de pescado fresco. Terraza agradable para comidas con brisa marina. Cocina de perfil mediterraneo.</p>

<h2>Restaurantes con Terraza en Alcudia</h2>
<p>Comer en terraza es casi obligatorio cuando visitas Mallorca. El buen clima del norte de la isla permite disfrutar de comidas y cenas al aire libre desde abril hasta bien entrado octubre. Estos son los mejores restaurantes con terraza en Alcudia.</p>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> tiene una de las terrazas mas agradables de Port d'Alcudia: espaciosa, bien ambientada y perfecta tanto para comidas como para cenas. Combinar una cena en su terraza con cocteles en <a href="/enjoy">Enjoy Terrace</a> es uno de los mejores planes de la zona.</p>

<h3>4. Sa Plaça</h3>
<p>Situado en la plaza principal del casco antiguo de Alcudia, ofrece cocina mediterranea con toques mallorquines. La terraza con vistas a la muralla medieval es especialmente encantadora al atardecer. Tapas, ensaladas y platos de temporada.</p>

<h3>5. El Patio de Alcudia</h3>
<p>Restaurante con un bonito patio interior ajardinado en el centro historico. Cocina fusion con base mediterranea. Ambiente intimo y cuidado. Ideal para cenas especiales o citas romanticas.</p>

<h2>Cocina Internacional en Port d'Alcudia</h2>

<h3>6. Ristorante Da Vinci</h3>
<p>Un restaurante italiano con buena pasta fresca, pizzas en horno de lena y una carta de vinos italianos. Ubicado cerca del puerto, tiene terraza y un ambiente familiar. Buena opcion para quienes buscan algo distinto al mediterraneo.</p>

<h3>7. Sushi Alcudia</h3>
<p>Para los amantes de la cocina asiatica, esta opcion ofrece sushi, sashimi y platos wok en un local moderno del paseo maritimo. Calidad decente del pescado y buena relacion calidad-precio para la zona.</p>

<h2>Tapas y Raciones</h2>

<h3>8. Bar Ponent</h3>
<p>Bar de tapas con sabor local en el casco antiguo. Raciones generosas de jamon iberico, pulpo a la gallega, gambas al ajillo y quesos artesanos. Terraza pequena pero con mucho encanto en una callejuela tranquila.</p>

<h3>9. Bodega d'es Port</h3>
<p>Una bodega con caracter marinero junto al puerto deportivo. Especializada en tapas de marisco y vinos locales. Buena opcion para un aperitivo antes de una cena mas formal. Ambiente informal y animado.</p>

<h2>Marisquerias y Pescado Fresco</h2>

<h3>10. Ca'n Lliro</h3>
<p>Restaurante familiar con decadas de historia en Port d'Alcudia. Pescado fresco del dia cocinado de forma sencilla pero eficaz: a la plancha, al horno o frito. Los calderetas de langosta y las fritures de peix son sus platos estrella. Ambiente tradicional y precio medio-alto.</p>

<h2>Por que Hiru es la mejor opcion para una experiencia completa</h2>
<p>Si tuvieras que elegir un solo restaurante en Alcudia, <a href="/hiru">Hiru Food &amp; Drinks</a> ofrece la experiencia gastronomica mas completa del norte de Mallorca. Combina cocina a la brasa con producto premium, arroces elaborados con marisco fresco, una carta de cocteles de autor, terraza para cenar al aire libre y un horario amplio que permite desde comidas familiares hasta cenas tardias.</p>
<p>Ademas, su ubicacion en Port d'Alcudia lo convierte en el punto de partida perfecto para una noche redonda: cena en Hiru, cocteles al atardecer en <a href="/enjoy">Enjoy Terrace</a> y, si es jueves, viernes o sabado, fiesta en <a href="/outxide">Outxide Club</a>. Es la combinacion que los locales ya conocen y que cada vez mas visitantes descubren.</p>
<p>No olvides reservar mesa en Alcudia con antelacion, especialmente en junio, julio y agosto. La mejor forma de asegurar tu sitio en los mejores restaurantes de Port d'Alcudia es planificar con tiempo.</p>

<h2>Lectura Recomendada</h2>
<p>Lee nuestro articulo completo sobre <a href="/blog/hiru-food-drinks-restaurante-alcudia">Hiru Food &amp; Drinks: el restaurante de referencia en Alcudia</a>. Tambien te puede interesar nuestra guia de <a href="/blog/donde-cenar-tarde-port-alcudia">donde cenar tarde en Port d'Alcudia</a> y la seleccion de <a href="/blog/cocteles-shisha-terraza-alcudia">cocteles y shisha en Alcudia</a> para despues de cenar.</p>`,

      en: `<p>If you are wondering where to eat in Alcudia, you are in the right place. Northern Mallorca has established itself as one of the island's most exciting dining destinations, offering everything from seafood paella by the sea to creative cuisine with top-quality local produce. This guide covers the best restaurants in Alcudia and Port d'Alcudia so you can eat well on every meal of your holiday.</p>

<h2>1. Hiru Food &amp; Drinks: Alcudia's Culinary Benchmark</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> has become the must-visit restaurant in Port d'Alcudia. Located on Ctra. d'Arta 40, Hiru pairs high-level charcoal-grill cooking with a modern, relaxed atmosphere that works equally well for a family lunch, a romantic dinner or a celebration with friends.</p>
<h3>What Makes Hiru Special</h3>
<p>Hiru's kitchen revolves around fire and quality produce. Their dry-aged meats are one of the standout specialities: hand-selected cuts matured for weeks to achieve exceptional flavour and tenderness. Rice dishes are another cornerstone of the menu. The seafood paella, made with fish-market-fresh shellfish, is one of the most requested plates. The lobster caldoso rice and black rice also draw consistent praise. Mediterranean fish cooked over charcoal rounds out a rock-solid culinary offering.</p>
<h3>Terrace and Atmosphere</h3>
<p>Hiru boasts a generous terrace that is the perfect setting for an al-fresco summer dinner. The interior keeps a contemporary, welcoming aesthetic. The cocktail bar serves signature drinks alongside a well-curated wine list. The restaurant stays open late, making it the ideal starting point for a night out in Port d'Alcudia.</p>
<p><strong>Hours:</strong> 12:00 to 23:30 (Friday and Saturday until 01:00). Closed on Tuesdays. Booking a table is highly recommended, especially in high season.</p>

<h2>Where to Eat Paella in Alcudia</h2>
<p>Paella is undoubtedly one of the dishes every visitor wants to try in Mallorca. Alcudia has several options, but not every restaurant prepares it with the same care. Here are our recommendations for paella in Alcudia.</p>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> leads the list for a clear reason: their rice dishes are prepared with homemade stock, fresh seafood from the local fish market and the precise cooking point that separates a good paella from a memorable one. The seafood paella and lobster caldoso rice are favourites among returning guests.</p>

<h3>2. Can Costa</h3>
<p>A long-established classic in the area specialising in Mallorcan cuisine and rice dishes. Good spot for trying traditional island dishes in a family-friendly setting. Located in Alcudia's old town.</p>

<h3>3. Bistro Mar</h3>
<p>A seafront restaurant on Port d'Alcudia's promenade with sea views. Offers paellas and seafood fideuaes alongside fresh fish. Pleasant terrace for meals with a sea breeze. Mediterranean profile.</p>

<h2>Best Terrace Restaurants in Alcudia</h2>
<p>Dining al fresco is practically mandatory when visiting Mallorca. The northern coast's mild climate allows for outdoor meals from April well into October. These are the best terrace restaurants in Alcudia.</p>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> has one of the finest terraces in Port d'Alcudia: spacious, well-designed and perfect for both lunch and dinner. Pairing a terrace dinner at Hiru with cocktails at <a href="/enjoy">Enjoy Terrace</a> is one of the best plans in the area.</p>

<h3>4. Sa Placa</h3>
<p>Set on Alcudia old town's main square, serving Mediterranean cuisine with Mallorcan touches. The terrace overlooking the medieval walls is especially charming at sunset. Tapas, salads and seasonal plates.</p>

<h3>5. El Patio de Alcudia</h3>
<p>A restaurant with a lovely garden courtyard in the historic centre. Fusion cuisine with a Mediterranean base. Intimate, carefully designed setting. Ideal for special dinners or romantic dates.</p>

<h2>International Cuisine in Port d'Alcudia</h2>

<h3>6. Ristorante Da Vinci</h3>
<p>An Italian restaurant with good fresh pasta, wood-fired pizzas and an Italian wine list. Located near the port, it has a terrace and a family-friendly feel. A solid choice for those seeking something beyond Mediterranean.</p>

<h3>7. Sushi Alcudia</h3>
<p>For Asian-food enthusiasts, this spot offers sushi, sashimi and wok dishes in a modern promenade venue. Decent fish quality and good value for the area.</p>

<h2>Tapas and Small Plates</h2>

<h3>8. Bar Ponent</h3>
<p>A local-flavoured tapas bar in the old town. Generous portions of Iberian ham, Galician-style octopus, garlic prawns and artisan cheeses. Small terrace with plenty of charm on a quiet lane.</p>

<h3>9. Bodega d'es Port</h3>
<p>A bodega with nautical character beside the marina. Specialising in seafood tapas and local wines. Great option for an aperitif before a more formal dinner. Casual, lively atmosphere.</p>

<h2>Seafood Restaurants</h2>

<h3>10. Ca'n Lliro</h3>
<p>A family-run restaurant with decades of history in Port d'Alcudia. Daily-fresh fish cooked simply but effectively: grilled, oven-baked or fried. The lobster stew and mixed fish fry are their signature dishes. Traditional setting, mid-to-high price range.</p>

<h2>Why Hiru Is the Best Choice for a Complete Dining Experience</h2>
<p>If you had to pick just one restaurant in Alcudia, <a href="/hiru">Hiru Food &amp; Drinks</a> delivers the most complete culinary experience in northern Mallorca. It combines charcoal-grill cooking with premium produce, rice dishes made with fresh seafood, a signature cocktail menu, a terrace for outdoor dining and long opening hours that accommodate everything from family lunches to late dinners.</p>
<p>Its Port d'Alcudia location also makes it the perfect launchpad for a stellar night: dinner at Hiru, sunset cocktails at <a href="/enjoy">Enjoy Terrace</a> and, on Thursday, Friday or Saturday, dancing at <a href="/outxide">Outxide Club</a>. It is the combination locals already know and more visitors discover every season.</p>
<p>Remember to book your table in advance, especially in June, July and August. Planning ahead is the best way to secure your spot at the best restaurants in Port d'Alcudia.</p>`,

      de: `<p>Sie fragen sich, wo man in Alcudia gut essen kann? Dann sind Sie hier genau richtig. Der Norden Mallorcas hat sich zu einem der spannendsten gastronomischen Ziele der Insel entwickelt. Das Angebot reicht von Paella mit Meeresfruechten direkt am Meer bis hin zu kreativer Kueche mit erstklassigen lokalen Produkten. In diesem Guide stellen wir Ihnen die besten Restaurants in Alcudia und Port d'Alcudia vor, damit Sie bei jedem Essen im Urlaub die richtige Wahl treffen.</p>

<h2>1. Hiru Food &amp; Drinks: Das beste Restaurant in Alcudia</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> hat sich zum gastronomischen Pflichtbesuch in Port d'Alcudia entwickelt. An der Ctra. d'Arta 40 gelegen, verbindet Hiru Grillkueche auf hoechstem Niveau mit einer modernen, entspannten Atmosphaere, die sowohl fuer ein Familienessen als auch fuer ein romantisches Dinner oder eine Feier mit Freunden perfekt passt.</p>
<h3>Was Hiru besonders macht</h3>
<p>Hirus Kueche dreht sich um Feuer und Qualitaetsprodukte. Die Dry-Aged-Fleischspezialitaeten gehoeren zu den absoluten Highlights: handverlesene Stuecke, die wochenlang gereift werden, um einen aussergewoehnlichen Geschmack und eine perfekte Textur zu erreichen. Reisgerichte sind eine weitere Saeuele der Speisekarte. Die Meeresfruechte-Paella, zubereitet mit fangfrischen Produkten vom lokalen Fischmarkt, ist eines der meistbestellten Gerichte. Der Hummer-Reistopf (Arroz Caldoso) und der schwarze Reis ueberzeugen ebenfalls. Mediterraner Fisch vom Holzkohlegrill rundet das erstklassige kulinarische Angebot ab.</p>
<h3>Terrasse und Ambiente</h3>
<p>Hiru verfuegt ueber eine grosszuegige Terrasse, die den perfekten Rahmen fuer ein Sommerabendessen unter freiem Himmel bietet. Der Innenbereich besticht durch zeitgenoessisches, einladendes Design. Die Cocktailbar serviert Signature-Drinks und eine durchdachte Weinkarte. Das Restaurant hat bis spaet abends geoeffnet und ist damit der ideale Ausgangspunkt fuer einen Abend in Port d'Alcudia.</p>
<p><strong>Oeffnungszeiten:</strong> 12:00 bis 23:30 Uhr (Freitag und Samstag bis 01:00 Uhr). Dienstags geschlossen. Eine Tischreservierung wird dringend empfohlen, besonders in der Hochsaison.</p>

<h2>Wo kann man Paella in Alcudia essen?</h2>
<p>Paella ist zweifellos eines der Gerichte, das jeder Mallorca-Besucher probieren moechte. In Alcudia gibt es mehrere Moeglichkeiten, aber nicht jedes Restaurant bereitet sie mit der gleichen Sorgfalt zu. Hier sind unsere Empfehlungen fuer Paella in Alcudia.</p>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> fuehrt die Liste aus gutem Grund an: Die Reisgerichte werden mit hausgemachter Bruehe, frischen Meeresfruechten vom lokalen Fischmarkt und dem praezisen Garpunkt zubereitet, der eine gute Paella von einer unvergesslichen unterscheidet. Die Meeresfruechte-Paella und der Hummer-Reistopf sind die Favoriten der Stammgaeste.</p>

<h3>2. Can Costa</h3>
<p>Ein etablierter Klassiker in der Gegend, spezialisiert auf mallorquinische Kueche und Reisgerichte. Guter Ort, um traditionelle Inselgerichte in familiaerer Atmosphaere zu probieren. Im Altstadtkern von Alcudia gelegen.</p>

<h3>3. Bistro Mar</h3>
<p>Restaurant an der Strandpromenade von Port d'Alcudia mit Meerblick. Bietet Paellas und Meeresfruechte-Fideuas neben frischem Fisch. Angenehme Terrasse fuer Mahlzeiten mit Meeresbrise. Mediterranes Profil.</p>

<h2>Beste Terrassen-Restaurants in Alcudia</h2>
<p>Draussen essen gehoert auf Mallorca praktisch zum Pflichtprogramm. Das milde Klima an der Nordkueste ermoeglicht Mahlzeiten im Freien von April bis weit in den Oktober hinein. Das sind die besten Terrassen-Restaurants in Alcudia.</p>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> bietet eine der schoensten Terrassen in Port d'Alcudia: weitlaeufig, stilvoll gestaltet und perfekt sowohl fuer Mittag- als auch Abendessen. Ein Terrassenabendessen bei Hiru mit anschliessendem Cocktailgenuss in der <a href="/enjoy">Enjoy Terrace</a> ist einer der besten Plaene, die die Region zu bieten hat.</p>

<h3>4. Sa Placa</h3>
<p>Am Hauptplatz der Altstadt von Alcudia gelegen, mit mediterraner Kueche und mallorquinischen Akzenten. Die Terrasse mit Blick auf die mittelalterliche Stadtmauer ist besonders bei Sonnenuntergang bezaubernd. Tapas, Salate und saisonale Gerichte.</p>

<h3>5. El Patio de Alcudia</h3>
<p>Restaurant mit einem huebschen Garteninnenhof im historischen Zentrum. Fusionskueche auf mediterraner Basis. Intimes, sorgfaeltig gestaltetes Ambiente. Ideal fuer besondere Abendessen oder romantische Dates.</p>

<h2>Internationale Kueche in Port d'Alcudia</h2>

<h3>6. Ristorante Da Vinci</h3>
<p>Italienisches Restaurant mit guter frischer Pasta, Holzofenpizzen und italienischer Weinkarte. In Hafennaehe gelegen, mit Terrasse und familienfreundlichem Flair. Eine solide Wahl fuer alle, die ueber die mediterrane Kueche hinausschauen moechten.</p>

<h3>7. Sushi Alcudia</h3>
<p>Fuer Liebhaber der asiatischen Kueche bietet dieses Lokal Sushi, Sashimi und Wok-Gerichte in einem modernen Ambiente an der Promenade. Ordentliche Fischqualitaet und gutes Preis-Leistungs-Verhaeltnis fuer die Gegend.</p>

<h2>Tapas und kleine Gerichte</h2>

<h3>8. Bar Ponent</h3>
<p>Tapas-Bar mit lokalem Flair in der Altstadt. Grosszuegige Portionen Iberico-Schinken, Pulpo a la Gallega, Knoblauchgarnelen und handwerklich hergestellter Kaese. Kleine Terrasse mit viel Charme in einer ruhigen Gasse.</p>

<h3>9. Bodega d'es Port</h3>
<p>Bodega mit maritimem Charakter am Yachthafen. Spezialisiert auf Meeresfruechte-Tapas und lokale Weine. Tolle Option fuer einen Aperitif vor einem gehobeneren Abendessen. Ungezwungene, lebhafte Atmosphaere.</p>

<h2>Fischrestaurants und Meeresfruechte</h2>

<h3>10. Ca'n Lliro</h3>
<p>Familienrestaurant mit jahrzehntelanger Geschichte in Port d'Alcudia. Tagesfrischer Fisch, schlicht aber wirkungsvoll zubereitet: gegrillt, aus dem Ofen oder frittiert. Der Hummereintopf und die gemischte Fischplatte sind die Spezialitaeten des Hauses. Traditionelles Ambiente, mittlere bis gehobene Preisklasse.</p>

<h2>Warum Hiru die beste Wahl fuer ein vollstaendiges Restauranterlebnis ist</h2>
<p>Wenn Sie nur ein Restaurant in Alcudia waehlen koennten, bietet <a href="/hiru">Hiru Food &amp; Drinks</a> das umfassendste kulinarische Erlebnis im Norden Mallorcas. Es vereint Grillkueche mit Premium-Produkten, Reisgerichte mit frischen Meeresfruechten, eine Signature-Cocktailkarte, eine Terrasse fuer Mahlzeiten unter freiem Himmel und grosszuegige Oeffnungszeiten, die vom Familienmittagessen bis zum spaeten Abendessen alles abdecken.</p>
<p>Die Lage in Port d'Alcudia macht Hiru ausserdem zum perfekten Startpunkt fuer einen grossartigen Abend auf Mallorca: Abendessen bei Hiru, Cocktails bei Sonnenuntergang in der <a href="/enjoy">Enjoy Terrace</a> und donnerstags, freitags oder samstags Tanzen im <a href="/outxide">Outxide Club</a>. Es ist die Kombination, die Einheimische laengst kennen und die immer mehr Urlauber entdecken.</p>
<p>Denken Sie daran, Ihren Tisch rechtzeitig zu reservieren, besonders im Juni, Juli und August. Vorausplanung ist der beste Weg, um sich Ihren Platz in den besten Restaurants von Port d'Alcudia zu sichern.</p>`,

      fr: `<p>Vous vous demandez ou manger a Alcudia ? Vous etes au bon endroit. Le nord de Majorque s'est impose comme l'une des destinations gastronomiques les plus interessantes de l'ile, avec une offre allant de la paella aux fruits de mer face a la mer jusqu'a la cuisine creative a base de produits locaux de premier choix. Ce guide passe en revue les meilleurs restaurants d'Alcudia et de Port d'Alcudia pour que chaque repas de vos vacances soit une reussite.</p>

<h2>1. Hiru Food &amp; Drinks : la reference gastronomique d'Alcudia</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> s'est impose comme le restaurant incontournable de Port d'Alcudia. Situe Ctra. d'Arta 40, Hiru allie cuisine au grill de haut niveau et ambiance moderne et decontractee, aussi adaptee a un dejeuner en famille qu'a un diner romantique ou une fete entre amis.</p>
<h3>Ce qui rend Hiru special</h3>
<p>La cuisine d'Hiru tourne autour du feu et des produits de qualite. Les viandes maturees dry-aged comptent parmi les grandes specialites : des pieces selectionnees muries pendant des semaines pour obtenir une saveur et une texture exceptionnelles. Les plats de riz constituent un autre pilier de la carte. La paella aux fruits de mer, preparee avec des produits frais de la criee locale, est l'un des plats les plus demandes. Le riz caldoso au homard et le riz noir sont egalement excellents. Le poisson mediterraneen grille au charbon de bois complete une offre culinaire remarquable.</p>
<h3>Terrasse et ambiance</h3>
<p>Hiru dispose d'une grande terrasse, cadre ideal pour un diner estival en plein air. L'interieur conserve une esthetique contemporaine et accueillante. Le bar a cocktails sert des creations maison et une carte des vins bien pensee. Le restaurant reste ouvert tard, ce qui en fait le point de depart ideal pour prolonger la soiree a Port d'Alcudia.</p>
<p><strong>Horaires :</strong> 12h00 a 23h30 (vendredi et samedi jusqu'a 01h00). Ferme le mardi. La reservation est vivement conseillee, surtout en haute saison.</p>

<h2>Ou manger une paella a Alcudia</h2>
<p>La paella est sans doute le plat que tout visiteur souhaite gouter a Majorque. Alcudia offre plusieurs possibilites, mais tous les restaurants ne la preparent pas avec le meme soin. Voici nos recommandations pour la paella a Alcudia.</p>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> arrive en tete pour une raison simple : les plats de riz sont prepares avec un bouillon maison, des fruits de mer frais du marche local et le point de cuisson precis qui fait la difference entre une bonne paella et une paella inoubliable. La paella aux fruits de mer et le riz caldoso au homard sont les favoris des habitues.</p>

<h3>2. Can Costa</h3>
<p>Un classique bien etabli dans la zone, specialise dans la cuisine majorquine et les plats de riz. Bon endroit pour gouter les plats traditionnels de l'ile dans un cadre familial. Situe dans la vieille ville d'Alcudia.</p>

<h3>3. Bistro Mar</h3>
<p>Restaurant en front de mer sur la promenade de Port d'Alcudia avec vue sur la mer. Propose des paellas et des fideuaes aux fruits de mer ainsi que du poisson frais. Terrasse agreable pour des repas avec la brise marine. Profil mediterraneen.</p>

<h2>Meilleurs restaurants avec terrasse a Alcudia</h2>
<p>Manger en terrasse est quasiment obligatoire a Majorque. Le climat doux de la cote nord permet de profiter de repas en plein air d'avril a octobre. Voici les meilleurs restaurants avec terrasse a Alcudia.</p>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> possede l'une des plus belles terrasses de Port d'Alcudia : spacieuse, bien amenagee et parfaite tant pour le dejeuner que pour le diner. Combiner un diner en terrasse chez Hiru avec des cocktails a l'<a href="/enjoy">Enjoy Terrace</a> est l'un des meilleurs plans de la region.</p>

<h3>4. Sa Placa</h3>
<p>Sur la place principale de la vieille ville d'Alcudia, cuisine mediterraneenne avec des touches majorquines. La terrasse face aux remparts medievaux est particulierement charmante au coucher du soleil. Tapas, salades et plats de saison.</p>

<h3>5. El Patio de Alcudia</h3>
<p>Restaurant avec un joli patio-jardin dans le centre historique. Cuisine fusion a base mediterraneenne. Ambiance intime et soignee. Ideal pour un diner special ou une soiree romantique.</p>

<h2>Cuisine internationale a Port d'Alcudia</h2>

<h3>6. Ristorante Da Vinci</h3>
<p>Restaurant italien avec de bonnes pates fraiches, des pizzas au feu de bois et une carte de vins italiens. Situe pres du port, avec terrasse et ambiance familiale. Bonne option pour ceux qui cherchent autre chose que le mediterraneen.</p>

<h3>7. Sushi Alcudia</h3>
<p>Pour les amateurs de cuisine asiatique, cette adresse propose sushis, sashimis et plats au wok dans un local moderne sur la promenade. Qualite correcte du poisson et bon rapport qualite-prix pour la zone.</p>

<h2>Tapas et portions a partager</h2>

<h3>8. Bar Ponent</h3>
<p>Bar a tapas au caractere local dans la vieille ville. Portions genereuses de jambon iberique, poulpe a la galicienne, crevettes a l'ail et fromages artisanaux. Petite terrasse pleine de charme dans une ruelle tranquille.</p>

<h3>9. Bodega d'es Port</h3>
<p>Bodega au caractere marin pres du port de plaisance. Specialisee dans les tapas de fruits de mer et les vins locaux. Bonne option pour un aperitif avant un diner plus formel. Ambiance decontractee et animee.</p>

<h2>Poissons et fruits de mer</h2>

<h3>10. Ca'n Lliro</h3>
<p>Restaurant familial avec des decennies d'histoire a Port d'Alcudia. Poisson frais du jour cuisine simplement mais efficacement : grille, au four ou frit. Le ragoet de homard et la friture de poissons sont les specialites. Cadre traditionnel, gamme de prix moyenne a elevee.</p>

<h2>Pourquoi Hiru est le meilleur choix pour une experience complete</h2>
<p>Si vous ne deviez choisir qu'un seul restaurant a Alcudia, <a href="/hiru">Hiru Food &amp; Drinks</a> offre l'experience culinaire la plus complete du nord de Majorque. Il allie cuisine au grill avec des produits premium, plats de riz aux fruits de mer frais, carte de cocktails signatures, terrasse pour diner en plein air et horaires etendus qui conviennent aussi bien aux dejeuners familiaux qu'aux diners tardifs.</p>
<p>Sa situation a Port d'Alcudia en fait aussi le point de depart ideal pour une soiree reussie : diner chez Hiru, cocktails au coucher du soleil a l'<a href="/enjoy">Enjoy Terrace</a> et, le jeudi, vendredi ou samedi, danse a l'<a href="/outxide">Outxide Club</a>. C'est la combinaison que les locaux connaissent deja et que de plus en plus de visiteurs decouvrent.</p>
<p>N'oubliez pas de reserver votre table a l'avance, surtout en juin, juillet et aout. Anticiper est la meilleure facon de s'assurer une place dans les meilleurs restaurants de Port d'Alcudia.</p>`,

      it: `<p>Vi state chiedendo dove mangiare ad Alcudia? Siete nel posto giusto. Il nord di Maiorca si e' affermato come una delle destinazioni gastronomiche piu' interessanti dell'isola, con un'offerta che spazia dalla paella di pesce in riva al mare alla cucina creativa con prodotti locali di prima qualita'. Questa guida passa in rassegna i migliori ristoranti di Alcudia e Port d'Alcudia perche' ogni pasto delle vostre vacanze sia azzeccato.</p>

<h2>1. Hiru Food &amp; Drinks: il punto di riferimento gastronomico di Alcudia</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> e' diventato il ristorante imprescindibile di Port d'Alcudia. Situato in Ctra. d'Arta 40, Hiru unisce cucina alla brace di alto livello con un'atmosfera moderna e rilassata, perfetta sia per un pranzo in famiglia sia per una cena romantica o una festa tra amici.</p>
<h3>Cosa rende speciale Hiru</h3>
<p>La cucina di Hiru ruota attorno al fuoco e ai prodotti di qualita'. Le carni frollate dry-aged sono una delle grandi specialita': tagli selezionati a mano, maturati per settimane per raggiungere un sapore e una consistenza eccezionali. I piatti di riso sono un altro pilastro del menu. La paella di frutti di mare, preparata con prodotto fresco della pescheria locale, e' uno dei piatti piu' richiesti. Eccellenti anche il riso brodoso all'astice e il riso nero. Il pesce mediterraneo cotto alla brace completa un'offerta culinaria di prim'ordine.</p>
<h3>Terrazza e atmosfera</h3>
<p>Hiru dispone di un'ampia terrazza, cornice ideale per una cena estiva all'aperto. L'interno mantiene un design contemporaneo e accogliente. Il cocktail bar serve drink d'autore e una carta dei vini ben curata. Il ristorante resta aperto fino a tardi, il che lo rende il punto di partenza ideale per una serata a Port d'Alcudia.</p>
<p><strong>Orari:</strong> dalle 12:00 alle 23:30 (venerdi' e sabato fino all'01:00). Chiuso il martedi'. La prenotazione e' fortemente consigliata, soprattutto in alta stagione.</p>

<h2>Dove mangiare la paella ad Alcudia</h2>
<p>La paella e' senza dubbio uno dei piatti che ogni visitatore vuole assaggiare a Maiorca. Ad Alcudia ci sono diverse opzioni, ma non tutti i ristoranti la preparano con la stessa cura. Ecco le nostre raccomandazioni per la paella ad Alcudia.</p>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> guida la classifica per un motivo chiaro: i piatti di riso sono preparati con brodo fatto in casa, frutti di mare freschi dal mercato ittico locale e il punto di cottura preciso che fa la differenza tra una buona paella e una indimenticabile. La paella di frutti di mare e il riso all'astice sono i preferiti di chi torna.</p>

<h3>2. Can Costa</h3>
<p>Un classico consolidato nella zona, specializzato in cucina maiorchina e piatti di riso. Buon posto per provare i piatti tradizionali dell'isola in un ambiente familiare. Situato nel centro storico di Alcudia.</p>

<h3>3. Bistro Mar</h3>
<p>Ristorante sul lungomare di Port d'Alcudia con vista sul mare. Offre paellas e fideuaes di frutti di mare oltre a pesce fresco. Terrazza piacevole per pasti con brezza marina. Profilo mediterraneo.</p>

<h2>Migliori ristoranti con terrazza ad Alcudia</h2>
<p>Mangiare all'aperto e' praticamente obbligatorio quando si visita Maiorca. Il clima mite della costa nord consente pasti en plein air da aprile fino a ottobre inoltrato. Questi sono i migliori ristoranti con terrazza ad Alcudia.</p>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> vanta una delle terrazze piu' belle di Port d'Alcudia: spaziosa, curata nel design e perfetta sia per il pranzo che per la cena. Abbinare una cena in terrazza da Hiru con cocktail all'<a href="/enjoy">Enjoy Terrace</a> e' uno dei migliori piani della zona.</p>

<h3>4. Sa Placa</h3>
<p>Nella piazza principale del centro storico di Alcudia, con cucina mediterranea e tocchi maiorchini. La terrazza affacciata sulle mura medievali e' particolarmente affascinante al tramonto. Tapas, insalate e piatti stagionali.</p>

<h3>5. El Patio de Alcudia</h3>
<p>Ristorante con un grazioso cortile-giardino nel centro storico. Cucina fusion su base mediterranea. Ambiente intimo e curato. Ideale per cene speciali o appuntamenti romantici.</p>

<h2>Cucina internazionale a Port d'Alcudia</h2>

<h3>6. Ristorante Da Vinci</h3>
<p>Ristorante italiano con buona pasta fresca, pizze cotte nel forno a legna e carta dei vini italiani. Situato vicino al porto, con terrazza e atmosfera familiare. Buona scelta per chi cerca qualcosa oltre il mediterraneo.</p>

<h3>7. Sushi Alcudia</h3>
<p>Per gli amanti della cucina asiatica, questo locale offre sushi, sashimi e piatti al wok in un ambiente moderno sul lungomare. Qualita' discreta del pesce e buon rapporto qualita'-prezzo per la zona.</p>

<h2>Tapas e piatti da condividere</h2>

<h3>8. Bar Ponent</h3>
<p>Tapas bar dal sapore locale nel centro storico. Porzioni generose di prosciutto iberico, polpo alla galiziana, gamberi all'aglio e formaggi artigianali. Piccola terrazza ricca di fascino in una viuzza tranquilla.</p>

<h3>9. Bodega d'es Port</h3>
<p>Bodega dal carattere marinaro accanto al porto turistico. Specializzata in tapas di pesce e vini locali. Ottima opzione per un aperitivo prima di una cena piu' formale. Atmosfera informale e vivace.</p>

<h2>Pesce e frutti di mare</h2>

<h3>10. Ca'n Lliro</h3>
<p>Ristorante familiare con decenni di storia a Port d'Alcudia. Pesce fresco del giorno cucinato in modo semplice ma efficace: alla griglia, al forno o fritto. Lo stufato di aragosta e il fritto misto di pesce sono i piatti simbolo. Ambiente tradizionale, fascia di prezzo media-alta.</p>

<h2>Perche' Hiru e' la scelta migliore per un'esperienza completa</h2>
<p>Se doveste scegliere un solo ristorante ad Alcudia, <a href="/hiru">Hiru Food &amp; Drinks</a> offre l'esperienza culinaria piu' completa del nord di Maiorca. Unisce cucina alla brace con prodotti premium, piatti di riso con frutti di mare freschi, una carta cocktail d'autore, una terrazza per cenare all'aperto e orari ampi che vanno dal pranzo in famiglia alla cena tardiva.</p>
<p>La sua posizione a Port d'Alcudia lo rende inoltre il punto di partenza perfetto per una serata indimenticabile: cena da Hiru, cocktail al tramonto all'<a href="/enjoy">Enjoy Terrace</a> e, il giovedi', venerdi' o sabato, ballo all'<a href="/outxide">Outxide Club</a>. E' la combinazione che i locali gia' conoscono e che sempre piu' turisti scoprono.</p>
<p>Ricordatevi di prenotare il tavolo in anticipo, soprattutto a giugno, luglio e agosto. Pianificare in anticipo e' il modo migliore per assicurarsi un posto nei migliori ristoranti di Port d'Alcudia.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-27",
    image: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
    tags: ["alcudia", "restaurants", "mallorca", "paella", "hiru", "gastronomy"],
    venue: "hiru",
    readingTime: 10,
  },
  {
    slug: "vida-nocturna-mallorca-guia",
    title: {
      es: "Vida Nocturna en Mallorca: Guia Completa de Fiestas y Clubs en 2026",
      en: "Mallorca Nightlife: Complete Guide to Parties and Clubs in 2026",
      de: "Nachtleben auf Mallorca: Kompletter Guide zu Partys und Clubs 2026",
      fr: "Vie Nocturne a Majorque : Guide Complet des Fetes et Clubs en 2026",
      it: "Vita Notturna a Maiorca: Guida Completa a Feste e Club nel 2026",
    },
    excerpt: {
      es: "Guia completa de la vida nocturna en Mallorca: discotecas en Alcudia, Palma y Magaluf, cocktail bars, fiestas y como organizar tu noche perfecta en la isla.",
      en: "Complete guide to Mallorca nightlife: clubs in Alcudia, Palma and Magaluf, cocktail bars, parties and how to plan your perfect night out on the island.",
      de: "Kompletter Guide zum Nachtleben auf Mallorca: Diskotheken in Alcudia, Palma und Magaluf, Cocktailbars, Partys und wie Sie Ihre perfekte Nacht auf der Insel planen.",
      fr: "Guide complet de la vie nocturne a Majorque : discothèques a Alcudia, Palma et Magaluf, bars a cocktails, fetes et comment organiser votre soiree parfaite sur l'ile.",
      it: "Guida completa alla vita notturna a Maiorca: discoteche ad Alcudia, Palma e Magaluf, cocktail bar, feste e come organizzare la vostra serata perfetta sull'isola.",
    },
    content: {
      es: `<p>Mallorca no es solo playas y cultura. Cuando cae el sol, la isla se transforma en uno de los destinos de fiesta mas vibrantes del Mediterraneo. Desde las macrodiscotecas de Magaluf hasta los clubs con personalidad del norte, pasando por los cocktail bars con terraza y las fiestas en barco, hay vida nocturna en Mallorca para todos los gustos. Esta guia te cuenta todo lo que necesitas saber para disfrutar de la noche mallorquina en 2026.</p>

<h2>Zonas de Fiesta en Mallorca</h2>
<p>Mallorca tiene varias zonas de fiesta bien diferenciadas, cada una con su propio caracter. Elegir la zona adecuada es clave para que tu noche sea exactamente lo que buscas.</p>

<h3>Palma de Mallorca</h3>
<p>La capital de la isla concentra la mayor variedad de opciones nocturnas. El Paseo Maritimo es la zona clasica de clubs y discotecas, con locales de todos los estilos musicales. Santa Catalina se ha convertido en el barrio de moda para cocteles, vino y cenas tardias. La Lonja y el casco antiguo ofrecen bares con encanto y terrazas en callejuelas medievales. Palma es la opcion mas cosmopolita y diversa.</p>

<h3>Magaluf</h3>
<p>La zona de fiesta mas conocida internacionalmente. Grandes discotecas, fiestas tematicas, pool parties y un ambiente orientado al turismo britanico y nordico. Si buscas macrofiestas y DJs internacionales de primer nivel, BCM y otros grandes locales de la franja de Punta Ballena son el destino. El ambiente es intenso y muy orientado a la fiesta masiva.</p>

<h3>Alcudia y Port d'Alcudia: la alternativa premium</h3>
<p>El norte de Mallorca ofrece una vida nocturna diferente: mas selecta, menos masificada y con una calidad muy por encima de la media. Port d'Alcudia se ha posicionado como la alternativa para quienes quieren disfrutar de la noche sin las multitudes y el caos de las zonas mas turisticas del sur. Aqui la noche tiene estilo, buen sonido y un ambiente donde prima la calidad sobre la cantidad.</p>

<h2>Discotecas en Alcudia: Outxide Club</h2>
<p>Si hay un nombre que define el clubbing en el norte de Mallorca, ese es <a href="/outxide">Outxide Club</a>. Situado en Port d'Alcudia, Outxide se ha convertido en la discoteca de referencia para quienes buscan una experiencia de club de verdad fuera de las zonas masificadas del sur de la isla.</p>
<h3>Que hace unico a Outxide</h3>
<p>Outxide destaca por su sistema de sonido profesional de primer nivel, una produccion visual y de iluminacion que transforma cada noche en un espectaculo, y una programacion de DJs que mezcla talento nacional e internacional. La seleccion musical abarca house, tech house, techno y sesiones especiales que se anuncian en sus redes sociales. El club cuida cada detalle: desde la acustica hasta la distribucion del espacio, pasando por un servicio de barra eficiente y un equipo de seguridad profesional.</p>
<h3>Informacion practica</h3>
<p>Outxide abre de jueves a sabado, de mayo a octubre, a partir de las 23:00. Las entradas estan disponibles a traves de FourVenues (plataforma oficial) o en la puerta, aunque comprar online suele ofrecer mejor precio. El dress code es smart casual: se busca un ambiente cuidado sin caer en la rigidez. La mejor noche suele ser el sabado, aunque los jueves de verano tienen un ambiente local muy autentico.</p>

<h2>Mejores Cocktail Bars en Mallorca</h2>
<p>Un buen coctel es el comienzo perfecto para cualquier noche en Mallorca. Estos son los cocktail bars que marcan la diferencia.</p>

<h3>Enjoy Terrace: el rey del pre-party en Alcudia</h3>
<p><a href="/enjoy">Enjoy Terrace</a>, situado en Av. Tucan 1 de Port d'Alcudia, es el cocktail bar que ha redefinido las noches en el norte de Mallorca. Con una terraza que se llena cada atardecer, Enjoy combina cocteles de autor elaborados con tecnicas de mixologia avanzada, shisha premium y un ambiente sofisticado que atrae tanto a locales como a visitantes internacionales. Abre todos los dias a partir de las 17:00 y se convierte en el punto de encuentro natural antes de salir de fiesta.</p>
<p>Lo que distingue a Enjoy Terrace es su capacidad para crear ambiente sin necesidad de volumen excesivo. La musica esta cuidada, la iluminacion es perfecta y el servicio es atento sin ser intrusivo. Es el tipo de lugar donde una copa se convierte facilmente en tres y donde empiezas la noche con buen pie.</p>

<h3>Otros cocktail bars destacados</h3>
<p>En Palma, Ginbo y Aqua forman parte de la escena coctelera mas reconocida. En Santa Catalina, varios bares de vinos naturales y cocteles artesanales han ganado popularidad. En la zona de Alcudia, sin embargo, <a href="/enjoy">Enjoy Terrace</a> no tiene rival directo en cuanto a calidad, ambiente y ubicacion.</p>

<h2>Como Organizar Tu Noche Perfecta en Mallorca</h2>
<p>Organizar una buena noche en Mallorca es cuestion de combinar los momentos adecuados. Aqui va nuestra recomendacion para la noche perfecta en el norte de la isla, la formula que los que saben ya han adoptado.</p>

<h3>Paso 1: Cena en Hiru Food &amp; Drinks (20:00 - 22:00)</h3>
<p>Empieza la noche con una cena memorable. <a href="/hiru">Hiru Food &amp; Drinks</a> ofrece carnes maduradas dry-aged, paella de marisco, arroces caldosos y pescado a la brasa en un ambiente moderno y relajado. Su terraza es ideal para cenar al aire libre en las noches de verano. Reserva mesa con antelacion, especialmente viernes y sabado.</p>

<h3>Paso 2: Cocteles en Enjoy Terrace (22:00 - 00:00)</h3>
<p>Tras la cena, un paseo corto te lleva a <a href="/enjoy">Enjoy Terrace</a>. Aqui es donde la noche empieza a tomar forma: cocteles de autor, shisha, buena musica y un ambiente que sube progresivamente. Es el pre-party perfecto y el lugar donde los grupos se reencuentran antes de ir al club.</p>

<h3>Paso 3: Fiesta en Outxide Club (00:00 - 05:00)</h3>
<p>Cuando la energia esta al maximo, <a href="/outxide">Outxide Club</a> abre sus puertas. Sonido de primer nivel, produccion visual espectacular y sesiones que se alargan hasta las 5:00 o mas. Es el broche perfecto para una noche completa en el norte de Mallorca.</p>

<h2>Consejos Practicos para la Vida Nocturna en Mallorca</h2>

<h3>Dress code</h3>
<p>En la mayoria de clubs de calidad en Mallorca, el dress code es smart casual. Evita chanclas, camisetas de tirantes y ropa de playa. En Outxide Club, se espera un look cuidado pero sin excesiva formalidad. Zapatillas limpias, pantalon largo o corto elegante y camisa o camiseta de calidad funcionan bien.</p>

<h3>Transporte</h3>
<p>En Port d'Alcudia todo esta cerca y se puede ir andando entre Hiru, Enjoy Terrace y Outxide Club. Para volver al hotel, taxis y VTCs estan disponibles toda la noche. Si vienes desde Palma o Magaluf, el coche es la opcion mas practica (designa un conductor o usa un servicio de conductor privado). En verano hay servicios de bus nocturno en algunas rutas.</p>

<h3>Mejores noches</h3>
<p>En el norte de Mallorca, los sabados son la noche grande. Los jueves y viernes en verano tambien tienen muy buen ambiente, especialmente en julio y agosto. En Palma, hay opciones cada noche de la semana en temporada alta.</p>

<h3>Presupuesto orientativo</h3>
<p>Cena completa con bebida en un buen restaurante: 30-60 EUR por persona. Cocteles: 10-15 EUR cada uno. Entrada a club: 15-30 EUR dependiendo de la noche y si compras online o en puerta. Una noche completa de cena, cocteles y club puede rondar los 80-120 EUR por persona, una inversion razonable para una experiencia de primer nivel.</p>

<h2>Por que el norte de Mallorca es la mejor opcion para salir de fiesta</h2>
<p>Mientras que Magaluf y Palma tienen su publico, cada vez mas personas descubren que el norte de Mallorca ofrece una experiencia nocturna superior. Menos aglomeraciones, mejor calidad en todos los aspectos, un ambiente mas autentico y maduro, y la posibilidad de combinar gastronomia de alto nivel con fiesta de calidad en un radio de pocos minutos a pie. La combinacion de <a href="/hiru">Hiru Food &amp; Drinks</a>, <a href="/enjoy">Enjoy Terrace</a> y <a href="/outxide">Outxide Club</a> ofrece todo lo que necesitas para una noche perfecta en Mallorca, sin masificaciones y con mucho estilo.</p>`,

      en: `<p>Mallorca is not just beaches and culture. When the sun goes down, the island transforms into one of the most vibrant party destinations in the Mediterranean. From the mega-clubs of Magaluf to the character-filled venues up north, taking in terrace cocktail bars and boat parties along the way, there is nightlife in Mallorca for every taste. This guide tells you everything you need to know to enjoy the Mallorcan night in 2026.</p>

<h2>Party Zones in Mallorca</h2>
<p>Mallorca has several distinct party zones, each with its own personality. Choosing the right area is key to having the night you are looking for.</p>

<h3>Palma de Mallorca</h3>
<p>The island capital offers the widest variety of nightlife options. The Paseo Maritimo is the classic strip for clubs and discos, with venues covering every music style. Santa Catalina has become the trendy neighbourhood for cocktails, wine and late dinners. La Lonja and the old town have charming bars and terraces tucked into medieval lanes. Palma is the most cosmopolitan and diverse choice.</p>

<h3>Magaluf</h3>
<p>The internationally best-known party zone. Large clubs, themed parties, pool parties and an atmosphere geared towards British and Nordic tourism. If you want mega-events and world-class DJs, BCM and the other big venues on the Punta Ballena strip are the destination. The vibe is intense and squarely focused on mass partying.</p>

<h3>Alcudia and Port d'Alcudia: The Premium Alternative</h3>
<p>Northern Mallorca offers a different kind of nightlife: more curated, less crowded and with quality well above the average. Port d'Alcudia has positioned itself as the alternative for those who want to enjoy the night without the crowds and chaos of the more touristy southern zones. Here, nightlife has style, great sound and an atmosphere where quality trumps quantity.</p>

<h2>Clubs in Alcudia: Outxide Club</h2>
<p>If one name defines clubbing in northern Mallorca, it is <a href="/outxide">Outxide Club</a>. Located in Port d'Alcudia, Outxide has become the go-to club for anyone seeking a genuine club experience away from the overcrowded southern zones.</p>
<h3>What Makes Outxide Unique</h3>
<p>Outxide stands out for its top-tier professional sound system, a visual and lighting production that turns every night into a spectacle, and a DJ line-up blending national and international talent. The musical selection spans house, tech house, techno and special sessions announced on their social channels. The club sweats the details: from acoustics to spatial layout, efficient bar service and a professional security team.</p>
<h3>Practical Information</h3>
<p>Outxide opens Thursday to Saturday, May to October, from 23:00. Tickets are available through FourVenues (the official platform) or at the door, though buying online typically gets you a better price. The dress code is smart casual: a polished look without being stuffy. Saturday is usually the biggest night, though summer Thursdays have a very authentic local atmosphere.</p>

<h2>Best Cocktail Bars in Mallorca</h2>
<p>A great cocktail is the perfect opening act for any Mallorca night. These are the cocktail bars that make the difference.</p>

<h3>Enjoy Terrace: The Pre-Party King in Alcudia</h3>
<p><a href="/enjoy">Enjoy Terrace</a>, at Av. Tucan 1 in Port d'Alcudia, is the cocktail bar that has redefined nights in northern Mallorca. With a terrace that fills up every sunset, Enjoy blends signature cocktails crafted with advanced mixology techniques, premium shisha and a sophisticated atmosphere that draws locals and international visitors alike. Open daily from 17:00, it naturally becomes the meeting point before heading out to party.</p>
<p>What sets Enjoy Terrace apart is its ability to build atmosphere without excessive volume. The music is curated, the lighting is on point and the service is attentive without being intrusive. It is the kind of place where one drink easily becomes three and where your night starts on the right note.</p>

<h3>Other Notable Cocktail Bars</h3>
<p>In Palma, Ginbo and Aqua are part of the most recognised cocktail scene. In Santa Catalina, several natural wine and craft cocktail bars have gained popularity. In the Alcudia area, however, <a href="/enjoy">Enjoy Terrace</a> has no direct rival in terms of quality, atmosphere and location.</p>

<h2>How to Plan Your Perfect Night in Mallorca</h2>
<p>Planning a great night in Mallorca comes down to combining the right moments. Here is our recommendation for the perfect night in the north of the island, the formula those in the know have already adopted.</p>

<h3>Step 1: Dinner at Hiru Food &amp; Drinks (20:00 - 22:00)</h3>
<p>Start your night with a memorable dinner. <a href="/hiru">Hiru Food &amp; Drinks</a> serves dry-aged meats, seafood paella, caldoso rice and charcoal-grilled fish in a modern, relaxed setting. The terrace is ideal for outdoor dining on summer nights. Book ahead, especially on Fridays and Saturdays.</p>

<h3>Step 2: Cocktails at Enjoy Terrace (22:00 - 00:00)</h3>
<p>After dinner, a short walk brings you to <a href="/enjoy">Enjoy Terrace</a>. This is where the night starts to take shape: signature cocktails, shisha, great music and an atmosphere that builds steadily. It is the perfect pre-party and the spot where groups reunite before heading to the club.</p>

<h3>Step 3: Party at Outxide Club (00:00 - 05:00)</h3>
<p>When the energy peaks, <a href="/outxide">Outxide Club</a> opens its doors. Top-level sound, spectacular visual production and sets that run until 05:00 or beyond. It is the perfect finale to a complete night out in northern Mallorca.</p>

<h2>Practical Tips for Mallorca Nightlife</h2>

<h3>Dress Code</h3>
<p>At most quality clubs in Mallorca, the dress code is smart casual. Skip flip-flops, vest tops and beachwear. At Outxide Club, a polished look is expected but without excessive formality. Clean trainers, smart shorts or trousers and a quality shirt or tee work well.</p>

<h3>Getting Around</h3>
<p>In Port d'Alcudia everything is within walking distance between Hiru, Enjoy Terrace and Outxide Club. Taxis and ride-hailing services are available all night for the journey back to your hotel. If coming from Palma or Magaluf, driving is the most practical option (designate a driver or use a private driver service). Some night bus services run on certain routes during summer.</p>

<h3>Best Nights</h3>
<p>In northern Mallorca, Saturday is the big night. Thursdays and Fridays during summer also have a strong atmosphere, especially in July and August. In Palma, there are options every night of the week in high season.</p>

<h3>Budget Guide</h3>
<p>A full dinner with drinks at a good restaurant: 30-60 EUR per person. Cocktails: 10-15 EUR each. Club entry: 15-30 EUR depending on the night and whether you buy online or at the door. A complete night of dinner, cocktails and clubbing can come to around 80-120 EUR per person, a reasonable investment for a top-level experience.</p>

<h2>Why Northern Mallorca Is the Best Place to Party</h2>
<p>While Magaluf and Palma have their audience, more and more people are discovering that northern Mallorca offers a superior night out. Fewer crowds, better quality across the board, a more authentic and mature atmosphere, and the ability to combine high-level dining with quality clubbing within a few minutes' walk. The combination of <a href="/hiru">Hiru Food &amp; Drinks</a>, <a href="/enjoy">Enjoy Terrace</a> and <a href="/outxide">Outxide Club</a> delivers everything you need for a perfect night in Mallorca, without the masses and with plenty of style.</p>`,

      de: `<p>Mallorca ist nicht nur Straende und Kultur. Wenn die Sonne untergeht, verwandelt sich die Insel in eines der lebendigsten Partyziele im Mittelmeerraum. Von den Mega-Clubs in Magaluf ueber die charaktervollen Clubs im Norden bis hin zu Cocktailbars mit Terrasse und Bootspartys gibt es Nachtleben auf Mallorca fuer jeden Geschmack. Dieser Guide verraet Ihnen alles, was Sie wissen muessen, um die mallorquinische Nacht 2026 in vollen Zuegen zu geniessen.</p>

<h2>Partyzonen auf Mallorca</h2>
<p>Mallorca hat mehrere klar unterschiedliche Partyzonen, jede mit eigenem Charakter. Die richtige Zone zu waehlen ist entscheidend dafuer, dass Ihre Nacht genau so wird, wie Sie es sich vorstellen.</p>

<h3>Palma de Mallorca</h3>
<p>Die Inselhauptstadt bietet die groesste Vielfalt an Moeglichkeiten fuer das Nachtleben. Der Paseo Maritimo ist die klassische Meile fuer Clubs und Diskotheken mit Lokalen fuer jeden Musikgeschmack. Santa Catalina hat sich zum Trendviertel fuer Cocktails, Wein und spaete Abendessen entwickelt. La Lonja und die Altstadt bieten charmante Bars und Terrassen in mittelalterlichen Gassen. Palma ist die kosmopolitischste und vielseitigste Wahl.</p>

<h3>Magaluf</h3>
<p>Die international bekannteste Partyzone Mallorcas. Grosse Diskotheken, Themenpartys, Poolpartys und ein Ambiente, das auf britischen und skandinavischen Tourismus ausgerichtet ist. Wenn Sie Grossveranstaltungen und erstklassige internationale DJs suchen, sind BCM und die anderen grossen Lokale an der Punta Ballena die richtige Adresse. Die Stimmung ist intensiv und ganz auf Massenpartys ausgelegt.</p>

<h3>Alcudia und Port d'Alcudia: Die Premium-Alternative fuer Nachtleben auf Mallorca</h3>
<p>Der Norden Mallorcas bietet ein anderes Nachtleben: gewaehlt, weniger ueberlaufen und mit einer Qualitaet deutlich ueber dem Durchschnitt. Port d'Alcudia hat sich als Alternative fuer diejenigen positioniert, die die Nacht geniessen wollen, ohne die Menschenmassen und das Chaos der touristischeren Zonen im Sueden. Hier hat das Nachtleben Stil, guten Sound und eine Atmosphaere, in der Qualitaet ueber Quantitaet geht. Fuer viele deutsche Mallorca-Urlauber ist genau das der entscheidende Unterschied.</p>

<h2>Diskotheken in Alcudia: Outxide Club</h2>
<p>Wenn ein Name das Clubbing im Norden Mallorcas definiert, dann ist es <a href="/outxide">Outxide Club</a>. Im Herzen von Port d'Alcudia gelegen, hat sich Outxide zur Referenz-Diskothek fuer alle entwickelt, die ein echtes Club-Erlebnis abseits der ueberfuellten Zonen im Sueden der Insel suchen.</p>
<h3>Was Outxide einzigartig macht</h3>
<p>Outxide ueberzeugt mit einer professionellen Soundanlage auf hoechstem Niveau, einer visuellen Produktion und Lichtshow, die jede Nacht in ein Spektakel verwandelt, und einem DJ-Line-up, das nationales und internationales Talent vereint. Die musikalische Auswahl umfasst House, Tech House, Techno und Spezialsessions, die auf den Social-Media-Kanaelen angekuendigt werden. Der Club achtet auf jedes Detail: von der Akustik ueber das Raumkonzept bis hin zu effizientem Barservice und professionellem Sicherheitsteam.</p>
<h3>Praktische Informationen</h3>
<p>Outxide oeffnet donnerstags bis samstags, von Mai bis Oktober, ab 23:00 Uhr. Tickets sind ueber FourVenues (offizielle Plattform) oder an der Abendkasse erhaeltlich, wobei der Online-Kauf in der Regel guenstiger ist. Der Dresscode ist Smart Casual: ein gepflegtes Erscheinungsbild ohne uebertriebene Formalitaet. Der Samstag ist in der Regel die groesste Nacht, wobei die Donnerstage im Sommer eine sehr authentische lokale Atmosphaere bieten. Fuer Liebhaber guter Diskotheken auf Mallorca ist Outxide ein absolutes Muss.</p>

<h2>Beste Cocktailbars auf Mallorca</h2>
<p>Ein guter Cocktail ist der perfekte Auftakt fuer jede Nacht auf Mallorca. Das sind die Cocktailbars, die den Unterschied machen.</p>

<h3>Enjoy Terrace: Der Koenig des Pre-Partys in Alcudia</h3>
<p><a href="/enjoy">Enjoy Terrace</a>, in der Av. Tucan 1 in Port d'Alcudia, ist die Cocktailbar, die die Naechte im Norden Mallorcas neu definiert hat. Mit einer Terrasse, die sich jeden Abend bei Sonnenuntergang fuellt, verbindet Enjoy Signature-Cocktails mit fortgeschrittenen Mixology-Techniken, Premium-Shisha und ein anspruchsvolles Ambiente, das gleichermassen Einheimische wie internationale Besucher anzieht. Taeglich ab 17:00 Uhr geoeffnet, wird Enjoy zum natuerlichen Treffpunkt, bevor es zum Feiern geht.</p>
<p>Was die Enjoy Terrace auszeichnet, ist ihre Faehigkeit, Atmosphaere zu schaffen, ohne auf uebertriebene Lautstaerke zu setzen. Die Musik ist sorgfaeltig ausgewaehlt, die Beleuchtung perfekt und der Service aufmerksam, ohne aufdringlich zu sein. Es ist die Art von Ort, an dem aus einem Drink schnell drei werden und an dem Ihre Nacht genau richtig beginnt.</p>

<h3>Weitere empfehlenswerte Cocktailbars</h3>
<p>In Palma gehoeren Ginbo und Aqua zur bekanntesten Cocktailszene. In Santa Catalina haben mehrere Naturwein- und Craft-Cocktail-Bars an Popularitaet gewonnen. In der Gegend von Alcudia hat <a href="/enjoy">Enjoy Terrace</a> jedoch keinen direkten Konkurrenten, was Qualitaet, Atmosphaere und Lage betrifft.</p>

<h2>So Planen Sie Ihre Perfekte Nacht auf Mallorca</h2>
<p>Eine grossartige Nacht auf Mallorca zu planen bedeutet, die richtigen Momente zu kombinieren. Hier ist unsere Empfehlung fuer die perfekte Nacht im Norden der Insel, die Formel, die Kenner laengst fuer sich entdeckt haben.</p>

<h3>Schritt 1: Abendessen im Hiru Food &amp; Drinks (20:00 - 22:00)</h3>
<p>Starten Sie die Nacht mit einem unvergesslichen Abendessen. <a href="/hiru">Hiru Food &amp; Drinks</a> serviert Dry-Aged-Fleisch, Meeresfruechte-Paella, Arroz Caldoso und Holzkohlegrillfish in einem modernen, entspannten Ambiente. Die Terrasse ist ideal fuer Sommerabende unter freiem Himmel. Reservieren Sie vorab, besonders freitags und samstags.</p>

<h3>Schritt 2: Cocktails in der Enjoy Terrace (22:00 - 00:00)</h3>
<p>Nach dem Essen fuehrt ein kurzer Spaziergang zur <a href="/enjoy">Enjoy Terrace</a>. Hier nimmt die Nacht Gestalt an: Signature-Cocktails, Shisha, gute Musik und eine Atmosphaere, die stetig aufbaut. Es ist das perfekte Pre-Party und der Ort, an dem sich Gruppen treffen, bevor es in den Club geht.</p>

<h3>Schritt 3: Party im Outxide Club (00:00 - 05:00)</h3>
<p>Wenn die Energie ihren Hoehepunkt erreicht, oeffnet <a href="/outxide">Outxide Club</a> seine Tueren. Erstklassiger Sound, spektakulaere visuelle Produktion und Sets, die bis 05:00 Uhr oder laenger laufen. Der perfekte Abschluss einer kompletten Nacht im Norden Mallorcas. Wer das beste Nachtleben auf Mallorca abseits der Massen sucht, findet hier genau das Richtige.</p>

<h2>Praktische Tipps fuer das Nachtleben auf Mallorca</h2>

<h3>Dresscode</h3>
<p>In den meisten Qualitaets-Clubs auf Mallorca gilt Smart Casual als Dresscode. Vermeiden Sie Flipflops, Traegershirts und Strandkleidung. Im Outxide Club wird ein gepflegter Look erwartet, aber ohne uebertriebene Formalitaet. Saubere Sneaker, eine elegante Hose oder Shorts und ein hochwertiges Hemd oder T-Shirt passen bestens.</p>

<h3>Anreise und Transport</h3>
<p>In Port d'Alcudia liegt alles in Gehdistanz: Hiru, Enjoy Terrace und Outxide Club. Fuer die Rueckfahrt zum Hotel stehen die ganze Nacht Taxis und Fahrdienstleister zur Verfuegung. Wenn Sie aus Palma oder Magaluf kommen, ist das Auto die praktischste Option (bestimmen Sie einen Fahrer oder nutzen Sie einen privaten Fahrservice). Im Sommer verkehren auf einigen Strecken Nachtbusse.</p>

<h3>Beste Naechte</h3>
<p>Im Norden Mallorcas ist der Samstag die grosse Nacht. Donnerstage und Freitage im Sommer haben ebenfalls eine starke Atmosphaere, besonders im Juli und August. In Palma gibt es in der Hochsaison jeden Abend der Woche Angebote.</p>

<h3>Orientierungsbudget</h3>
<p>Komplettes Abendessen mit Getraenk in einem guten Restaurant: 30-60 EUR pro Person. Cocktails: 10-15 EUR pro Stueck. Clubeintritt: 15-30 EUR je nach Abend und ob online oder an der Abendkasse gekauft. Eine komplette Nacht mit Abendessen, Cocktails und Club liegt bei etwa 80-120 EUR pro Person, eine vernuenftige Investition fuer ein erstklassiges Erlebnis.</p>

<h2>Warum der Norden Mallorcas der beste Ort zum Feiern ist</h2>
<p>Waehrend Magaluf und Palma ihr Publikum haben, entdecken immer mehr Menschen, dass der Norden Mallorcas ein ueberlegenes Nachtleben bietet. Weniger Gedraenge, bessere Qualitaet in allen Bereichen, eine authentischere und reifere Atmosphaere und die Moeglichkeit, gehobene Gastronomie mit erstklassigem Clubbing innerhalb weniger Gehminuten zu verbinden. Die Kombination aus <a href="/hiru">Hiru Food &amp; Drinks</a>, <a href="/enjoy">Enjoy Terrace</a> und <a href="/outxide">Outxide Club</a> bietet alles, was Sie fuer eine perfekte Nacht auf Mallorca brauchen, ohne Massentourismus und mit viel Stil. Fuer deutsche Urlauber, die Mallorca abseits der Ballermann-Klischees erleben wollen, ist der Norden die klare Nummer eins.</p>`,

      fr: `<p>Majorque ne se resume pas aux plages et a la culture. Quand le soleil se couche, l'ile se transforme en l'une des destinations festives les plus vibrantes de la Mediterranee. Des mega-clubs de Magaluf aux clubs a forte personnalite du nord, en passant par les bars a cocktails en terrasse et les soirees en bateau, la vie nocturne a Majorque a de quoi satisfaire tous les gouts. Ce guide vous dit tout ce qu'il faut savoir pour profiter de la nuit majorquine en 2026.</p>

<h2>Zones de Fete a Majorque</h2>
<p>Majorque compte plusieurs zones de fete bien distinctes, chacune avec son propre caractere. Choisir la bonne zone est essentiel pour que votre soiree soit exactement ce que vous recherchez.</p>

<h3>Palma de Majorque</h3>
<p>La capitale de l'ile concentre la plus grande variete d'options nocturnes. Le Paseo Maritimo est le boulevard classique des clubs et discotheques, avec des etablissements couvrant tous les styles musicaux. Santa Catalina est devenu le quartier tendance pour les cocktails, le vin et les diners tardifs. La Lonja et la vieille ville proposent des bars pleins de charme et des terrasses nichees dans les ruelles medievales. Palma est le choix le plus cosmopolite et diversifie.</p>

<h3>Magaluf</h3>
<p>La zone de fete la plus connue a l'international. Grandes discotheques, soirees a theme, pool parties et une ambiance orientee vers le tourisme britannique et nordique. Si vous cherchez des mega-evenements et des DJs internationaux de premier plan, BCM et les autres grands etablissements de la bande de Punta Ballena sont la destination. L'ambiance est intense et entierement dediee a la fete de masse.</p>

<h3>Alcudia et Port d'Alcudia : l'alternative premium</h3>
<p>Le nord de Majorque offre une vie nocturne differente : plus selecte, moins bondee et d'une qualite nettement superieure a la moyenne. Port d'Alcudia s'est positionne comme l'alternative pour ceux qui veulent profiter de la nuit sans les foules et le chaos des zones plus touristiques du sud. Ici, la nuit a du style, un bon son et une atmosphere ou la qualite prime sur la quantite.</p>

<h2>Discotheques a Alcudia : Outxide Club</h2>
<p>S'il y a un nom qui definit le clubbing dans le nord de Majorque, c'est <a href="/outxide">Outxide Club</a>. Situe a Port d'Alcudia, Outxide est devenu la discotheque de reference pour tous ceux qui recherchent une veritable experience de club en dehors des zones surchargees du sud de l'ile.</p>
<h3>Ce qui rend Outxide unique</h3>
<p>Outxide se distingue par son systeme son professionnel de premier ordre, une production visuelle et lumineuse qui transforme chaque nuit en spectacle, et une programmation de DJs melant talents nationaux et internationaux. La selection musicale couvre house, tech house, techno et sessions speciales annoncees sur les reseaux sociaux. Le club soigne chaque detail : de l'acoustique a l'agencement de l'espace, en passant par un service au bar efficace et une equipe de securite professionnelle.</p>
<h3>Informations pratiques</h3>
<p>Outxide ouvre du jeudi au samedi, de mai a octobre, a partir de 23h00. Les billets sont disponibles via FourVenues (plateforme officielle) ou a l'entree, bien que l'achat en ligne offre generalement un meilleur tarif. Le dress code est smart casual : un look soigne sans exces de formalite. Le samedi est generalement la grande nuit, bien que les jeudis d'ete aient une ambiance locale tres authentique.</p>

<h2>Meilleurs Bars a Cocktails a Majorque</h2>
<p>Un bon cocktail est le debut parfait de toute nuit majorquine. Voici les bars a cocktails qui font la difference.</p>

<h3>Enjoy Terrace : le roi du pre-party a Alcudia</h3>
<p><a href="/enjoy">Enjoy Terrace</a>, Av. Tucan 1 a Port d'Alcudia, est le bar a cocktails qui a redéfini les nuits dans le nord de Majorque. Avec une terrasse qui se remplit chaque soir au coucher du soleil, Enjoy associe cocktails signatures elabores avec des techniques de mixologie avancees, chicha premium et une ambiance sophistiquee qui attire autant les locaux que les visiteurs internationaux. Ouvert tous les jours a partir de 17h00, il devient naturellement le point de rencontre avant de sortir.</p>
<p>Ce qui distingue l'Enjoy Terrace, c'est sa capacite a creer une ambiance sans volume excessif. La musique est soignee, l'eclairage parfait et le service attentif sans etre intrusif. C'est le genre d'endroit ou un verre en appelle facilement trois et ou votre nuit commence du bon pied.</p>

<h3>Autres bars a cocktails remarquables</h3>
<p>A Palma, Ginbo et Aqua font partie de la scene cocktail la plus reconnue. A Santa Catalina, plusieurs bars a vins naturels et cocktails artisanaux ont gagne en popularite. Dans la zone d'Alcudia, cependant, l'<a href="/enjoy">Enjoy Terrace</a> n'a pas de rival direct en termes de qualite, d'ambiance et d'emplacement.</p>

<h2>Comment Organiser Votre Soiree Parfaite a Majorque</h2>
<p>Organiser une grande soiree a Majorque revient a combiner les bons moments. Voici notre recommandation pour la soiree parfaite dans le nord de l'ile, la formule que les connaisseurs ont deja adoptee.</p>

<h3>Etape 1 : Diner au Hiru Food &amp; Drinks (20h00 - 22h00)</h3>
<p>Commencez la soiree par un diner memorable. <a href="/hiru">Hiru Food &amp; Drinks</a> propose viandes maturees dry-aged, paella aux fruits de mer, riz caldoso et poisson grille au charbon dans un cadre moderne et decontracte. La terrasse est ideale pour diner en plein air les soirs d'ete. Reservez a l'avance, surtout les vendredis et samedis.</p>

<h3>Etape 2 : Cocktails a l'Enjoy Terrace (22h00 - 00h00)</h3>
<p>Apres le diner, une courte promenade vous mene a l'<a href="/enjoy">Enjoy Terrace</a>. C'est la que la nuit prend forme : cocktails signatures, chicha, bonne musique et une ambiance qui monte progressivement. C'est le pre-party parfait et le lieu ou les groupes se retrouvent avant d'aller au club.</p>

<h3>Etape 3 : Fete a l'Outxide Club (00h00 - 05h00)</h3>
<p>Quand l'energie est a son comble, l'<a href="/outxide">Outxide Club</a> ouvre ses portes. Son de premier plan, production visuelle spectaculaire et sets qui s'etirent jusqu'a 05h00 ou plus. La fin parfaite d'une nuit complete dans le nord de Majorque.</p>

<h2>Conseils Pratiques pour la Vie Nocturne a Majorque</h2>

<h3>Dress code</h3>
<p>Dans la plupart des clubs de qualite a Majorque, le dress code est smart casual. Evitez les tongs, les debardeurs et les vetements de plage. A l'Outxide Club, un look soigne est attendu mais sans formalite excessive. Des baskets propres, un pantalon ou bermuda elegant et une chemise ou un t-shirt de qualite conviennent parfaitement.</p>

<h3>Se deplacer</h3>
<p>A Port d'Alcudia, tout est a distance de marche entre Hiru, Enjoy Terrace et Outxide Club. Taxis et VTC sont disponibles toute la nuit pour le retour a l'hotel. Si vous venez de Palma ou Magaluf, la voiture est l'option la plus pratique (designez un conducteur ou utilisez un service de chauffeur prive). En ete, des services de bus de nuit fonctionnent sur certains itineraires.</p>

<h3>Meilleures nuits</h3>
<p>Dans le nord de Majorque, le samedi est la grande nuit. Les jeudis et vendredis en ete ont egalement une tres bonne ambiance, surtout en juillet et aout. A Palma, des options existent tous les soirs de la semaine en haute saison.</p>

<h3>Budget indicatif</h3>
<p>Diner complet avec boisson dans un bon restaurant : 30-60 EUR par personne. Cocktails : 10-15 EUR piece. Entree en club : 15-30 EUR selon la nuit et l'achat en ligne ou sur place. Une nuit complete diner, cocktails et club revient a environ 80-120 EUR par personne, un investissement raisonnable pour une experience haut de gamme.</p>

<h2>Pourquoi le nord de Majorque est le meilleur endroit pour sortir</h2>
<p>Alors que Magaluf et Palma ont leur public, de plus en plus de personnes decouvrent que le nord de Majorque offre une experience nocturne superieure. Moins de foule, meilleure qualite a tous les niveaux, une ambiance plus authentique et mature, et la possibilite de combiner gastronomie de haut niveau et clubbing de qualite en quelques minutes a pied. La combinaison <a href="/hiru">Hiru Food &amp; Drinks</a>, <a href="/enjoy">Enjoy Terrace</a> et <a href="/outxide">Outxide Club</a> offre tout ce qu'il faut pour une nuit parfaite a Majorque, sans les masses et avec beaucoup de style.</p>`,

      it: `<p>Maiorca non e' solo spiagge e cultura. Quando il sole tramonta, l'isola si trasforma in una delle destinazioni festive piu' vibranti del Mediterraneo. Dalle mega-discoteche di Magaluf ai club dal forte carattere del nord, passando per cocktail bar con terrazza e feste in barca, la vita notturna a Maiorca ha qualcosa per tutti i gusti. Questa guida vi racconta tutto cio' che dovete sapere per godervi la notte maiorchina nel 2026.</p>

<h2>Zone della Movida a Maiorca</h2>
<p>Maiorca ha diverse zone della movida ben distinte, ciascuna con la propria personalita'. Scegliere la zona giusta e' fondamentale perche' la vostra serata sia esattamente cio' che cercate.</p>

<h3>Palma di Maiorca</h3>
<p>Il capoluogo dell'isola concentra la maggiore varieta' di opzioni per la vita notturna. Il Paseo Maritimo e' la zona classica di club e discoteche, con locali per ogni genere musicale. Santa Catalina e' diventato il quartiere alla moda per cocktail, vino e cene tardive. La Lonja e il centro storico offrono bar pieni di fascino e terrazze nascoste nei vicoli medievali. Palma e' la scelta piu' cosmopolita e variegata.</p>

<h3>Magaluf</h3>
<p>La zona festiva piu' conosciuta a livello internazionale. Grandi discoteche, serate a tema, pool party e un'atmosfera orientata al turismo britannico e nordico. Se cercate mega-eventi e DJ internazionali di primo livello, BCM e gli altri grandi locali della striscia di Punta Ballena sono la meta. Il clima e' intenso e totalmente dedicato alla festa di massa.</p>

<h3>Alcudia e Port d'Alcudia: l'alternativa premium</h3>
<p>Il nord di Maiorca offre una vita notturna diversa: piu' selezionata, meno affollata e con una qualita' nettamente superiore alla media. Port d'Alcudia si e' posizionato come l'alternativa per chi vuole godersi la notte senza la folla e il caos delle zone piu' turistiche del sud. Qui la notte ha stile, buon suono e un'atmosfera dove la qualita' prevale sulla quantita'.</p>

<h2>Discoteche ad Alcudia: Outxide Club</h2>
<p>Se un nome definisce il clubbing nel nord di Maiorca, quello e' <a href="/outxide">Outxide Club</a>. Situato a Port d'Alcudia, Outxide e' diventato la discoteca di riferimento per chi cerca un'autentica esperienza da club lontano dalle zone sovraffollate del sud dell'isola.</p>
<h3>Cosa rende unico Outxide</h3>
<p>Outxide si distingue per il suo impianto audio professionale di primo livello, una produzione visiva e di illuminazione che trasforma ogni serata in uno spettacolo, e una programmazione di DJ che mescola talento nazionale e internazionale. La selezione musicale spazia da house a tech house, techno e sessioni speciali annunciate sui canali social. Il club cura ogni dettaglio: dall'acustica alla distribuzione dello spazio, passando per un servizio al bancone efficiente e un team di sicurezza professionale.</p>
<h3>Informazioni pratiche</h3>
<p>Outxide apre da giovedi' a sabato, da maggio a ottobre, dalle 23:00. I biglietti sono disponibili tramite FourVenues (piattaforma ufficiale) o alla porta, anche se l'acquisto online offre solitamente un prezzo migliore. Il dress code e' smart casual: un look curato senza eccessi di formalita'. Il sabato e' di solito la serata piu' importante, anche se i giovedi' estivi hanno un'atmosfera locale molto autentica.</p>

<h2>Migliori Cocktail Bar a Maiorca</h2>
<p>Un buon cocktail e' l'inizio perfetto di qualsiasi notte a Maiorca. Questi sono i cocktail bar che fanno la differenza.</p>

<h3>Enjoy Terrace: il re del pre-party ad Alcudia</h3>
<p><a href="/enjoy">Enjoy Terrace</a>, in Av. Tucan 1 a Port d'Alcudia, e' il cocktail bar che ha ridefinito le notti nel nord di Maiorca. Con una terrazza che si riempie ogni sera al tramonto, Enjoy unisce cocktail d'autore elaborati con tecniche di mixologia avanzata, shisha premium e un'atmosfera sofisticata che attrae sia locali che visitatori internazionali. Aperto tutti i giorni dalle 17:00, diventa naturalmente il punto d'incontro prima di uscire a fare festa.</p>
<p>Cio' che distingue l'Enjoy Terrace e' la sua capacita' di creare atmosfera senza volumi eccessivi. La musica e' curata, l'illuminazione e' perfetta e il servizio e' attento senza essere invadente. E' il tipo di posto dove un drink diventa facilmente tre e dove la vostra serata inizia con il piede giusto.</p>

<h3>Altri cocktail bar degni di nota</h3>
<p>A Palma, Ginbo e Aqua fanno parte della scena cocktail piu' riconosciuta. A Santa Catalina, diversi bar di vini naturali e cocktail artigianali hanno guadagnato popolarita'. Nella zona di Alcudia, pero', l'<a href="/enjoy">Enjoy Terrace</a> non ha rivali diretti in termini di qualita', atmosfera e posizione.</p>

<h2>Come Organizzare la Vostra Serata Perfetta a Maiorca</h2>
<p>Organizzare una grande serata a Maiorca significa combinare i momenti giusti. Ecco la nostra raccomandazione per la serata perfetta nel nord dell'isola, la formula che chi sa ha gia' adottato.</p>

<h3>Passo 1: Cena da Hiru Food &amp; Drinks (20:00 - 22:00)</h3>
<p>Iniziate la serata con una cena memorabile. <a href="/hiru">Hiru Food &amp; Drinks</a> serve carni frollate dry-aged, paella di frutti di mare, riso caldoso e pesce alla brace in un ambiente moderno e rilassato. La terrazza e' ideale per cenare all'aperto nelle sere d'estate. Prenotate in anticipo, specialmente il venerdi' e il sabato.</p>

<h3>Passo 2: Cocktail all'Enjoy Terrace (22:00 - 00:00)</h3>
<p>Dopo cena, una breve passeggiata vi porta all'<a href="/enjoy">Enjoy Terrace</a>. E' qui che la serata inizia a prendere forma: cocktail d'autore, shisha, buona musica e un'atmosfera che sale progressivamente. E' il pre-party perfetto e il luogo dove i gruppi si ritrovano prima di andare in discoteca.</p>

<h3>Passo 3: Festa all'Outxide Club (00:00 - 05:00)</h3>
<p>Quando l'energia e' al massimo, l'<a href="/outxide">Outxide Club</a> apre le sue porte. Suono di primo livello, produzione visiva spettacolare e set che si prolungano fino alle 05:00 o oltre. Il finale perfetto di una notte completa nel nord di Maiorca.</p>

<h2>Consigli Pratici per la Vita Notturna a Maiorca</h2>

<h3>Dress code</h3>
<p>Nella maggior parte dei club di qualita' a Maiorca, il dress code e' smart casual. Evitate infradito, canottiere e abbigliamento da spiaggia. All'Outxide Club ci si aspetta un look curato ma senza eccessiva formalita'. Sneakers pulite, pantaloni o bermuda eleganti e una camicia o maglietta di qualita' vanno benissimo.</p>

<h3>Come muoversi</h3>
<p>A Port d'Alcudia tutto e' raggiungibile a piedi: Hiru, Enjoy Terrace e Outxide Club. Taxi e servizi di noleggio con conducente sono disponibili tutta la notte per il rientro in hotel. Se venite da Palma o Magaluf, l'auto e' l'opzione piu' pratica (designate un guidatore o usate un servizio di autista privato). In estate funzionano servizi di bus notturno su alcuni percorsi.</p>

<h3>Serate migliori</h3>
<p>Nel nord di Maiorca il sabato e' la serata clou. Giovedi' e venerdi' in estate hanno anch'essi un'ottima atmosfera, specialmente a luglio e agosto. A Palma ci sono opzioni ogni sera della settimana in alta stagione.</p>

<h3>Budget indicativo</h3>
<p>Cena completa con bevanda in un buon ristorante: 30-60 EUR a persona. Cocktail: 10-15 EUR ciascuno. Ingresso in discoteca: 15-30 EUR a seconda della serata e dell'acquisto online o alla porta. Una notte completa di cena, cocktail e discoteca si aggira intorno agli 80-120 EUR a persona, un investimento ragionevole per un'esperienza di primo livello.</p>

<h2>Perche' il nord di Maiorca e' il posto migliore per uscire la sera</h2>
<p>Mentre Magaluf e Palma hanno il loro pubblico, sempre piu' persone scoprono che il nord di Maiorca offre un'esperienza notturna superiore. Meno folla, qualita' migliore sotto ogni aspetto, un'atmosfera piu' autentica e matura, e la possibilita' di combinare alta gastronomia e clubbing di qualita' nel raggio di pochi minuti a piedi. La combinazione di <a href="/hiru">Hiru Food &amp; Drinks</a>, <a href="/enjoy">Enjoy Terrace</a> e <a href="/outxide">Outxide Club</a> offre tutto cio' che serve per una notte perfetta a Maiorca, senza masse e con molto stile.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-25",
    image: "/images/outxide/DSCF8103-9.jpg",
    tags: ["nightlife", "mallorca", "outxide", "clubs", "alcudia", "cocktails", "enjoy"],
    venue: "outxide",
    readingTime: 12,
  },
  {
    slug: "que-hacer-alcudia-mallorca",
    title: {
      es: "Que Hacer en Alcudia: 15 Planes Imprescindibles en 2026",
      en: "15 Best Things to Do in Alcudia, Mallorca (2026 Guide)",
      de: "Was kann man in Alcudia unternehmen: 15 Aktivitaten fur 2026",
      fr: "Que Faire a Alcudia : 15 Activites Incontournables en 2026",
      it: "Cosa Fare ad Alcudia: 15 Attivita Imperdibili nel 2026",
    },
    excerpt: {
      es: "Descubre que hacer en Alcudia, Mallorca: playas, casco antiguo, mercados, deportes acuaticos, ciclismo, excursiones en barco, senderismo y la mejor vida nocturna del norte de la isla.",
      en: "Discover the best things to do in Alcudia, Mallorca: beaches, old town, markets, water sports, cycling, boat trips, hiking and the best nightlife in northern Mallorca.",
      de: "Entdecke die besten Aktivitaten in Alcudia, Mallorca: Strande, Altstadt, Markte, Wassersport, Radfahren, Bootsausfluge, Wandern und das beste Nachtleben im Norden der Insel.",
      fr: "Decouvrez les meilleures activites a Alcudia, Majorque : plages, vieille ville, marches, sports nautiques, cyclisme, excursions en bateau, randonnees et la meilleure vie nocturne du nord de l'ile.",
      it: "Scopri le migliori cose da fare ad Alcudia, Maiorca: spiagge, centro storico, mercati, sport acquatici, ciclismo, gite in barca, escursionismo e la migliore vita notturna del nord dell'isola.",
    },
    content: {
      es: `<p>Alcudia es uno de los destinos mas completos de Mallorca. Situada en el extremo norte de la isla, esta ciudad combina historia medieval, playas espectaculares, naturaleza protegida y una oferta gastronomica y de ocio que no deja de crecer. Si te preguntas que hacer en Alcudia, aqui tienes 15 planes imprescindibles que cubren desde la manana hasta bien entrada la noche.</p>

<h2>1. Recorrer el casco antiguo amurallado</h2>
<p>El casco antiguo de Alcudia es uno de los mejor conservados de Mallorca. La muralla medieval del siglo XIV rodea un laberinto de calles empedradas con casas senoriales, iglesias goticas y rincones con encanto. No te pierdas la Puerta de Mallorca, la Puerta del Moll, la iglesia de Sant Jaume y el Ayuntamiento. El paseo por encima de la muralla ofrece vistas panoramicas al puerto, la bahia y las montanas de la Serra de Tramuntana.</p>
<p><strong>Consejo local:</strong> Llega temprano por la manana o al atardecer para evitar el calor y disfrutar de la luz mas bonita para fotos. El recorrido completo por la muralla toma unos 30 minutos.</p>

<h2>2. Relajarte en la Platja d'Alcudia</h2>
<p>Con mas de 7 kilometros de arena fina y aguas turquesas poco profundas, la playa de Alcudia es una de las mejores de Mallorca. Es perfecta para familias gracias a su entrada gradual al mar y su equipamiento completo: hamacas, sombrillas, chiringuitos y zonas de deportes acuaticos. La parte norte, cerca de la Ciudad Blanca, es la mas tranquila.</p>
<p><strong>Como llegar:</strong> Desde el centro de Port d'Alcudia, la playa esta a menos de 5 minutos a pie. Hay aparcamiento publico en la avenida principal, aunque en temporada alta conviene llegar antes de las 10:00.</p>

<h2>3. Visitar las ruinas romanas de Pollentia</h2>
<p>Justo a las afueras del casco antiguo se encuentran las ruinas de Pollentia, la ciudad romana mas importante de Mallorca, fundada en el 123 a.C. Puedes recorrer el foro, las viviendas patricias y el pequeno teatro romano. El Museu Monografic de Pollentia, dentro del casco historico, complementa la visita con piezas encontradas en las excavaciones.</p>
<p><strong>Datos practicos:</strong> Abierto de martes a sabado, de 10:00 a 16:00 en temporada alta. La entrada combinada ruinas + museo cuesta unos 4 EUR.</p>

<h2>4. Perderte en el mercado de los martes y domingos</h2>
<p>El mercado semanal de Alcudia se celebra los martes y domingos por la manana en las calles del casco antiguo. Es uno de los mas grandes de Mallorca y una explosion de color: frutas y verduras locales, embutido mallorquin (sobrasada, botifarron), quesos de Mahon, aceitunas, ensaimadas recien hechas, ceramica artesanal, ropa y complementos. Es el lugar perfecto para comprar productos tipicos y sumergirte en la cultura local.</p>
<p><strong>Consejo local:</strong> Llega entre las 8:30 y las 10:00 para disfrutarlo sin aglomeraciones. Los domingos el mercado es mas pequeno pero menos turistico.</p>

<h2>5. Hacer deportes acuaticos en la bahia</h2>
<p>La bahia de Alcudia es un paraiso para los deportes acuaticos. Las aguas tranquilas y el viento constante la convierten en un spot ideal para paddle surf, kayak, windsurf y kitesurf. Varias escuelas en la playa ofrecen clases para principiantes y alquiler de material. Tambien puedes probar el parasailing, el jet ski o el banana boat para una dosis extra de adrenalina.</p>
<p><strong>Mejor momento:</strong> Las mananas suelen ser mas tranquilas para paddle surf y kayak. Por la tarde sube el viento, ideal para windsurf y kite.</p>

<h2>6. Excursion en barco a la Formentor y cuevas marinas</h2>
<p>Desde el puerto de Alcudia salen excursiones en barco que te llevan a la espectacular peninsula de Formentor, con sus acantilados verticales, calas escondidas y aguas cristalinas. Algunas rutas incluyen paradas para nadar en calas solo accesibles por mar y visitas a cuevas marinas. Es una de las experiencias mas memorables que puedes vivir en el norte de Mallorca.</p>
<p><strong>Opciones:</strong> Hay desde catamaranes para grupos grandes hasta lanchas privadas para experiencias mas exclusivas. Las salidas suelen ser a las 10:00 y duran entre 3 y 6 horas. Reserva con antelacion en temporada alta.</p>

<h2>7. Ciclismo por las rutas del norte</h2>
<p>Alcudia es la capital del ciclismo en Mallorca. Miles de ciclistas profesionales y aficionados eligen la zona como base de entrenamiento cada ano. Las rutas van desde paseos llanos por la bahia y el parque natural de s'Albufera hasta ascensiones epicas como el Cap de Formentor, el Coll de Sa Batalla o el Puig Major. Hay tiendas de alquiler de bicicletas de carretera, gravel y mountain bike por toda la zona.</p>
<p><strong>Ruta recomendada para principiantes:</strong> Alcudia - Can Picafort por la via verde costera (30 km ida y vuelta, totalmente llano, vistas al mar todo el trayecto).</p>

<h2>8. Senderismo en la Victoria</h2>
<p>La peninsula de la Victoria, al este de Alcudia, es un tesoro para los amantes del senderismo. La ruta mas popular es la subida a la Talaia d'Alcudia (444 metros), con vistas de 360 grados sobre la bahia, la peninsula de Formentor y, en dias claros, hasta Menorca. Tambien puedes caminar hasta la Cala des Coll Baix, una de las playas mas bonitas y salvajes de Mallorca, accesible solo a pie o en barco.</p>
<p><strong>Datos practicos:</strong> La subida a la Talaia toma unas 2 horas ida y vuelta. Lleva agua, proteccion solar y calzado adecuado. El camino a Coll Baix es mas exigente (unos 45 minutos de bajada con tramos de roca).</p>

<h2>9. Explorar el Parc Natural de s'Albufera</h2>
<p>S'Albufera es el humedal mas grande de las Baleares y uno de los mejores lugares de Europa para la observacion de aves. Mas de 300 especies han sido registradas aqui, incluyendo aguila pescadora, flamencos, garzas y numerosas aves migratorias. Los senderos del parque son llanos y accesibles, con observatorios estrategicamente situados. La entrada es gratuita y hay un centro de visitantes con informacion sobre la fauna y flora.</p>
<p><strong>Consejo:</strong> Las primeras horas de la manana y el atardecer son los mejores momentos para ver aves. Lleva prismaticos si puedes.</p>

<h2>10. Cenar a la brasa con producto local</h2>
<p>Despues de un dia explorando Alcudia, nada mejor que una buena cena con producto fresco y cocinado a la brasa. <a href="/hiru">Hiru Food &amp; Drinks</a>, en la Ctra. d'Arta 40 de Port d'Alcudia, se ha convertido en la referencia gastronomica de la zona. Su cocina se basa en carnes maduradas seleccionadas, arroces elaborados con pescado y marisco de la lonja local, y pescados del Mediterraneo cocinados al punto perfecto sobre carbon. El ambiente es moderno y relajado, perfecto para una cena larga con buena compania.</p>
<p><strong>Horario:</strong> Abierto de 12:00 a 23:30 (viernes y sabado hasta la 1:00). Cierra los martes. Reservar mesa es recomendable, especialmente en fin de semana.</p>

<h2>11. Cocteles al atardecer con vistas</h2>
<p>Alcudia tiene algunos de los atardeceres mas bonitos de Mallorca, y no hay mejor forma de disfrutarlos que con un buen coctel en la mano. <a href="/enjoy">Enjoy Terrace</a>, en Av. Tucan 1 de Port d'Alcudia, es el lugar donde locales y visitantes se reúnen cada tarde para ver caer el sol. La carta de cocteles de autor, combinada con shisha premium y un ambiente sofisticado, hace que sea facil quedarse hasta bien entrada la noche. Abre todos los dias a partir de las 17:00.</p>
<p><strong>Consejo:</strong> Llega unos 30 minutos antes del atardecer para coger buen sitio. Los bartenders te pueden recomendar combinaciones segun tus gustos.</p>

<h2>12. Vida nocturna de nivel</h2>
<p>La noche en Port d'Alcudia tiene un nombre propio: <a href="/outxide">Outxide Club</a>. Es la referencia del clubbing en el norte de Mallorca, con sonido profesional de primer nivel, DJs nacionales e internacionales y una produccion visual espectacular. Abre de jueves a sabado a partir de las 23:00, de mayo a octubre. La ubicacion es perfecta para combinar con una cena en Hiru y cocteles en Enjoy Terrace antes de entrar al club.</p>
<p><strong>Entradas:</strong> Disponibles a traves de FourVenues (plataforma oficial) o en la puerta. Comprar online suele tener mejor precio.</p>

<h2>13. Visitar la Cueva de Sant Marti</h2>
<p>Cerca de la Ermita de la Victoria, la Cueva de Sant Marti es una gruta natural convertida en capilla que merece una visita. Las dos salas excavadas en la roca albergan altares y pinturas antiguas. El entorno es espectacular, rodeado de bosque de pinos y con vistas al mar. La visita es gratuita y se combina perfectamente con la ruta de senderismo a la Talaia.</p>

<h2>14. Alquilar un barco y explorar la costa</h2>
<p>Si quieres libertad total para explorar la costa norte de Mallorca, alquilar un barco sin titulacion es una opcion cada vez mas popular en Alcudia. Hay empresas que alquilan lanchas de hasta 15 CV que no requieren licencia, perfectas para recorrer la bahia, fondear en calas escondidas y llegar a playas como Coll Baix, Cala Morella o la costa de Formentor. Para embarcaciones mas grandes, necesitaras licencia o un patron incluido.</p>
<p><strong>Donde:</strong> En el puerto deportivo de Alcudia hay varias empresas de charter. Los precios varian segun el tipo de embarcacion y la temporada.</p>

<h2>15. Recorrer Alcudia en segway o bicicleta electrica</h2>
<p>Para quienes prefieren una actividad mas relajada, los tours en segway o bicicleta electrica son una forma divertida de explorar Port d'Alcudia, el paseo maritimo y los alrededores del parque de s'Albufera sin esfuerzo. Varias empresas ofrecen rutas guiadas que incluyen paradas en miradores y puntos de interes historico.</p>

<h2>Tu dia perfecto en Alcudia</h2>
<p>Si tuvieras que elegir un solo dia, aqui va nuestra recomendacion: empieza con una visita al casco antiguo y el mercado (si es martes o domingo), banate en la playa de Alcudia por la manana, come un arroz de lonja en <a href="/hiru">Hiru Food &amp; Drinks</a>, dedica la tarde a una excursion en barco o senderismo en la Victoria, disfruta del atardecer con cocteles en <a href="/enjoy">Enjoy Terrace</a>, y si es jueves, viernes o sabado, cierra la noche bailando en <a href="/outxide">Outxide Club</a>. Alcudia lo tiene todo, concentrado y a tu alcance.</p>`,
      en: `<p>Alcudia is one of the most complete destinations in Mallorca. Perched on the northern tip of the island, this town blends medieval history, spectacular beaches, protected natural areas and an ever-growing food and entertainment scene. If you are wondering what to do in Alcudia, here are 15 essential plans that cover everything from early morning to late at night.</p>

<h2>1. Walk the medieval walled old town</h2>
<p>Alcudia's old town boasts some of the best-preserved medieval walls in Mallorca. The 14th-century fortifications encircle a maze of cobblestone streets lined with stately homes, Gothic churches and hidden corners. Do not miss the Porta de Mallorca, the Porta del Moll, the church of Sant Jaume and the Town Hall. Walking along the top of the wall rewards you with panoramic views across the harbour, the bay and the Tramuntana mountains.</p>
<p><strong>Local tip:</strong> Arrive early in the morning or at sunset to beat the heat and catch the best light for photos. A full circuit along the ramparts takes around 30 minutes.</p>

<h2>2. Relax at Platja d'Alcudia</h2>
<p>Stretching over 7 kilometres of fine white sand with shallow turquoise waters, Alcudia beach ranks among the finest on the island. It is ideal for families thanks to the gentle slope into the sea and full facilities including sunbeds, parasols, beach bars and water-sport stations. The northern end near Ciudad Blanca is the quietest stretch.</p>
<p><strong>How to get there:</strong> From central Port d'Alcudia the beach is less than a five-minute walk. Public car parks line the main avenue, but during peak season aim to arrive before 10:00.</p>

<h2>3. Visit the Roman ruins of Pollentia</h2>
<p>Just outside the old-town walls lie the remains of Pollentia, the most important Roman settlement in Mallorca, founded in 123 BC. You can explore the forum, patrician houses and a small Roman theatre. The Museu Monografic de Pollentia inside the historic centre complements the visit with artefacts unearthed during excavations.</p>
<p><strong>Practical info:</strong> Open Tuesday to Saturday, 10:00 to 16:00 in high season. A combined ticket for the ruins and the museum costs around 4 EUR.</p>

<h2>4. Browse the Tuesday and Sunday markets</h2>
<p>Alcudia's weekly market takes over the old-town streets every Tuesday and Sunday morning. It is one of the largest on the island and a riot of colour: local fruit and vegetables, Mallorcan charcuterie (sobrasada, botifarron), Mahon cheese, olives, freshly baked ensaimadas, handmade ceramics, clothing and accessories. It is the perfect place to pick up authentic local produce and soak up the culture.</p>
<p><strong>Local tip:</strong> Arrive between 08:30 and 10:00 to enjoy the market without the crowds. The Sunday edition is smaller but far less touristy.</p>

<h2>5. Try water sports in the bay</h2>
<p>The Bay of Alcudia is a paradise for water sports. Calm waters and steady wind make it an ideal spot for stand-up paddleboarding, kayaking, windsurfing and kitesurfing. Several schools along the beach offer beginner lessons and equipment hire. For an extra adrenaline hit, parasailing, jet-skiing and banana-boat rides are also on the menu.</p>
<p><strong>Best time:</strong> Mornings tend to be calmer for paddleboarding and kayaking. The afternoon breeze picks up nicely for windsurfing and kiting.</p>

<h2>6. Take a boat trip to Formentor and sea caves</h2>
<p>Boat excursions depart from Alcudia harbour and head for the dramatic Formentor peninsula, with its sheer cliffs, hidden coves and crystal-clear water. Some routes include swimming stops at coves only reachable by sea and visits to marine caves. It is one of the most memorable experiences in northern Mallorca.</p>
<p><strong>Options:</strong> You can choose anything from large catamarans to private speedboats for a more exclusive outing. Departures are usually around 10:00 and last between three and six hours. Book ahead in high season.</p>

<h2>7. Cycling on the northern routes</h2>
<p>Alcudia is the cycling capital of Mallorca. Thousands of professional and amateur riders choose the area as a training base every year. Routes range from flat bay-side spins and laps through the s'Albufera nature reserve to epic climbs such as Cap de Formentor, Coll de Sa Batalla and Puig Major. Road-bike, gravel-bike and mountain-bike hire shops are plentiful throughout the area.</p>
<p><strong>Recommended beginner route:</strong> Alcudia to Can Picafort on the coastal greenway (30 km round trip, completely flat, sea views the whole way).</p>

<h2>8. Hike on the Victoria peninsula</h2>
<p>The Victoria peninsula east of Alcudia is a gem for hikers. The most popular route climbs to the Talaia d'Alcudia (444 metres), offering 360-degree views across the bay, the Formentor peninsula and, on clear days, as far as Menorca. You can also walk down to Cala des Coll Baix, one of the most beautiful and wild beaches in Mallorca, accessible only on foot or by boat.</p>
<p><strong>Practical info:</strong> The Talaia round trip takes about two hours. Carry water, sun protection and proper footwear. The trail to Coll Baix is more demanding (around 45 minutes downhill with rocky sections).</p>

<h2>9. Explore the s'Albufera nature reserve</h2>
<p>S'Albufera is the largest wetland in the Balearic Islands and one of the best birdwatching sites in Europe. More than 300 species have been recorded here, including osprey, flamingo, heron and numerous migratory birds. Trails are flat and accessible, with strategically placed hides. Entry is free and there is a visitors' centre with information on local wildlife and flora.</p>
<p><strong>Tip:</strong> Early morning and late afternoon are the best times for birdwatching. Bring binoculars if you can.</p>

<h2>10. Dine on charcoal-grilled local produce</h2>
<p>After a day exploring Alcudia, nothing beats a proper sit-down dinner with fresh local ingredients cooked over charcoal. <a href="/hiru">Hiru Food &amp; Drinks</a>, on Ctra. d'Arta 40 in Port d'Alcudia, has become the gastronomic benchmark of the area. The kitchen revolves around hand-selected aged meats, rice dishes prepared with fish and shellfish from the local market, and Mediterranean fish grilled to perfection over charcoal. The atmosphere is modern and relaxed, ideal for a long dinner with good company.</p>
<p><strong>Hours:</strong> Open 12:00 to 23:30 (Friday and Saturday until 01:00). Closed Tuesdays. Booking is recommended, especially at weekends.</p>

<h2>11. Sunset cocktails with a view</h2>
<p>Alcudia enjoys some of the most stunning sunsets in Mallorca, and there is no better way to savour them than with a quality cocktail in hand. <a href="/enjoy">Enjoy Terrace</a>, at Av. Tucan 1 in Port d'Alcudia, is where locals and visitors gather every evening to watch the sun dip below the horizon. The menu of signature cocktails, paired with premium shisha and a sophisticated ambiance, makes it easy to stay well into the night. Open daily from 17:00.</p>
<p><strong>Tip:</strong> Arrive about 30 minutes before sunset to grab a good spot. The bartenders are happy to recommend combinations based on your taste.</p>

<h2>12. World-class nightlife</h2>
<p>When it comes to after-dark action in Port d'Alcudia, <a href="/outxide">Outxide Club</a> is the undisputed reference. It is the top clubbing destination in northern Mallorca, with professional-grade sound, national and international DJs and spectacular visual production. Open Thursday to Saturday from 23:00, May through October. The location is perfect for combining a dinner at Hiru and cocktails at Enjoy Terrace before heading into the club.</p>
<p><strong>Tickets:</strong> Available through FourVenues (the official platform) or at the door. Buying online usually means a better price.</p>

<h2>13. Visit the Cave of Sant Marti</h2>
<p>Near the Ermita de la Victoria, the Cave of Sant Marti is a natural grotto converted into a chapel that is well worth a visit. Two chambers carved into the rock house ancient altars and paintings. The setting is spectacular, surrounded by pine forest with sea views. Entry is free and the visit combines perfectly with the Talaia hiking route.</p>

<h2>14. Rent a boat and explore the coastline</h2>
<p>If you want total freedom to discover the northern Mallorcan coast, renting a boat without a licence is an increasingly popular option in Alcudia. Companies hire out small motorboats of up to 15 HP that require no licence, ideal for cruising the bay, anchoring in hidden coves and reaching beaches such as Coll Baix, Cala Morella and the Formentor coast. For larger vessels you will need a licence or a skipper included in the hire.</p>
<p><strong>Where:</strong> Several charter companies operate from Alcudia marina. Prices vary depending on the boat type and the season.</p>

<h2>15. Discover Alcudia by Segway or e-bike</h2>
<p>For a more laid-back activity, Segway or electric-bike tours are a fun way to explore Port d'Alcudia, the seafront promenade and the s'Albufera surroundings without breaking a sweat. Several operators run guided routes with stops at viewpoints and historical landmarks.</p>

<h2>Your perfect day in Alcudia</h2>
<p>If you only had one day, here is our recommendation: start with the old town and the market (if it is Tuesday or Sunday), swim at Alcudia beach in the morning, have a seafood rice dish for lunch at <a href="/hiru">Hiru Food &amp; Drinks</a>, spend the afternoon on a boat trip or hiking on the Victoria peninsula, enjoy sunset cocktails at <a href="/enjoy">Enjoy Terrace</a>, and if it is Thursday, Friday or Saturday, close the night dancing at <a href="/outxide">Outxide Club</a>. Alcudia has it all, compact and within reach.</p>`,
      de: `<p>Alcudia ist eines der vielseitigsten Reiseziele auf Mallorca. An der Nordspitze der Insel gelegen, vereint die Stadt mittelalterliche Geschichte, spektakulare Strande, geschutzte Naturgebiete und ein stetig wachsendes Gastronomie- und Freizeitangebot. Wenn du dich fragst, was man in Alcudia unternehmen kann, findest du hier 15 unverzichtbare Aktivitaten, die vom fruhen Morgen bis tief in die Nacht reichen.</p>

<h2>1. Die mittelalterliche Altstadt erkunden</h2>
<p>Die Altstadt von Alcudia besitzt eine der am besten erhaltenen mittelalterlichen Stadtmauern Mallorcas. Die Befestigungen aus dem 14. Jahrhundert umschliessen ein Labyrinth aus Kopfsteinpflastergassen mit herrschaftlichen Hausern, gotischen Kirchen und versteckten Winkeln. Besonders sehenswert sind die Porta de Mallorca, die Porta del Moll, die Kirche Sant Jaume und das Rathaus. Ein Spaziergang auf der Mauer belohnt dich mit Panoramablicken uber den Hafen, die Bucht und das Tramuntana-Gebirge.</p>
<p><strong>Tipp:</strong> Komm frueh morgens oder zum Sonnenuntergang, um der Hitze auszuweichen und das schoenste Licht fur Fotos zu erwischen. Ein kompletter Rundgang auf der Mauer dauert etwa 30 Minuten.</p>

<h2>2. Am Strand von Alcudia entspannen</h2>
<p>Mit uber 7 Kilometern feinem weissen Sand und turkisfarbenem, flach abfallendem Wasser gehort der Strand von Alcudia zu den besten der Insel. Er ist ideal fur Familien dank des sanften Einstiegs ins Meer und der kompletten Ausstattung mit Liegen, Sonnenschirmen, Strandbars und Wassersportstationen. Der noerdliche Abschnitt nahe der Ciudad Blanca ist am ruhigsten.</p>
<p><strong>Anfahrt:</strong> Vom Zentrum von Port d'Alcudia ist der Strand weniger als funf Gehminuten entfernt. Oeffentliche Parkplatze gibt es an der Hauptstrasse, aber in der Hochsaison solltest du vor 10:00 Uhr kommen.</p>

<h2>3. Die roemischen Ruinen von Pollentia besichtigen</h2>
<p>Direkt vor den Altstadtmauern liegen die Ruinen von Pollentia, der wichtigsten roemischen Siedlung Mallorcas, gegrundet 123 v. Chr. Du kannst das Forum, Patrizierhaeuser und ein kleines roemisches Theater erkunden. Das Museu Monografic de Pollentia im historischen Zentrum ergaenzt den Besuch mit Fundstucken aus den Ausgrabungen.</p>
<p><strong>Praktische Infos:</strong> Geoeffnet Dienstag bis Samstag, 10:00 bis 16:00 Uhr in der Hauptsaison. Ein Kombiticket fur Ruinen und Museum kostet ca. 4 EUR.</p>

<h2>4. Den Dienstags- und Sonntagsmarkt besuchen</h2>
<p>Der Wochenmarkt von Alcudia findet jeden Dienstag und Sonntag morgens in den Gassen der Altstadt statt. Er ist einer der groessten der Insel und ein Farbenmeer: lokales Obst und Gemuese, mallorquinische Wurstspezialitaeten (Sobrasada, Botifarron), Mahon-Kaese, Oliven, frisch gebackene Ensaimadas, handgefertigte Keramik, Kleidung und Accessoires. Der perfekte Ort, um authentische lokale Produkte zu kaufen und in die Kultur einzutauchen.</p>
<p><strong>Tipp:</strong> Komm zwischen 8:30 und 10:00 Uhr, um den Markt ohne Gedraenge zu geniessen. Die Sonntagsausgabe ist kleiner, aber deutlich weniger touristisch.</p>

<h2>5. Wassersport in der Bucht</h2>
<p>Die Bucht von Alcudia ist ein Paradies fur Wassersport. Ruhiges Wasser und bestaendiger Wind machen sie zum idealen Spot fur Stand-Up-Paddling, Kajakfahren, Windsurfen und Kitesurfen. Mehrere Schulen am Strand bieten Anfaengerkurse und Materialverleih an. Fur einen Extra-Adrenalinkick gibt es auch Parasailing, Jetski und Bananenbootfahrten.</p>
<p><strong>Beste Zeit:</strong> Vormittags ist es ruhiger fur Paddleboarding und Kajak. Nachmittags frischt der Wind auf, ideal zum Windsurfen und Kiten.</p>

<h2>6. Bootsausflug nach Formentor und zu den Meereshoehlen</h2>
<p>Vom Hafen Alcudia starten Bootsausfluege zur spektakulaeren Halbinsel Formentor mit ihren senkrechten Klippen, versteckten Buchten und kristallklarem Wasser. Einige Routen beinhalten Badestopps in Buchten, die nur vom Meer aus erreichbar sind, und Besuche von Meereshoehlen. Es ist eines der unvergesslichsten Erlebnisse im Norden Mallorcas.</p>
<p><strong>Optionen:</strong> Du kannst zwischen grossen Katamaranen und privaten Schnellbooten fur ein exklusiveres Erlebnis waehlen. Abfahrten sind normalerweise um 10:00 Uhr, Dauer zwischen 3 und 6 Stunden. In der Hochsaison vorher reservieren.</p>

<h2>7. Radfahren auf den Nordrouten</h2>
<p>Alcudia ist die Radsporthauptstadt Mallorcas. Tausende Profi- und Hobbyradfahrer waehlen die Gegend jedes Jahr als Trainingsbasis. Die Routen reichen von flachen Touren entlang der Bucht und durch den Naturpark s'Albufera bis zu legendaeren Anstiegen wie dem Cap de Formentor, dem Coll de Sa Batalla oder dem Puig Major. Verleihe fur Rennraeder, Gravelbikes und Mountainbikes gibt es ueberall in der Gegend.</p>
<p><strong>Empfohlene Anfaengerroute:</strong> Alcudia nach Can Picafort auf dem Kuesten-Radweg (30 km Rundstrecke, komplett flach, Meerblick die gesamte Strecke).</p>

<h2>8. Wandern auf der Halbinsel Victoria</h2>
<p>Die Halbinsel Victoria oestlich von Alcudia ist ein Juwel fur Wanderer. Die beliebteste Route fuhrt auf die Talaia d'Alcudia (444 Meter), mit 360-Grad-Panoramablick uber die Bucht, die Halbinsel Formentor und an klaren Tagen bis nach Menorca. Du kannst auch hinunter zur Cala des Coll Baix wandern, einem der schoensten und wildesten Straende Mallorcas, der nur zu Fuss oder per Boot erreichbar ist.</p>
<p><strong>Praktische Infos:</strong> Die Talaia-Rundwanderung dauert etwa 2 Stunden. Nimm Wasser, Sonnenschutz und geeignetes Schuhwerk mit. Der Weg zum Coll Baix ist anspruchsvoller (ca. 45 Minuten Abstieg mit felsigen Abschnitten).</p>

<h2>9. Den Naturpark s'Albufera erkunden</h2>
<p>S'Albufera ist das groesste Feuchtgebiet der Balearen und einer der besten Orte Europas zur Vogelbeobachtung. Uber 300 Arten wurden hier registriert, darunter Fischadler, Flamingos, Reiher und zahlreiche Zugvoegel. Die Wege im Park sind flach und barrierefrei, mit strategisch platzierten Beobachtungshuetten. Der Eintritt ist frei, ein Besucherzentrum informiert uber Fauna und Flora.</p>
<p><strong>Tipp:</strong> Die fruehen Morgenstunden und der spaete Nachmittag sind die besten Zeiten zur Vogelbeobachtung. Bring ein Fernglas mit, wenn moeglich.</p>

<h2>10. Am Holzkohlegrill dinieren mit lokalen Produkten</h2>
<p>Nach einem Tag voller Erkundungen in Alcudia gibt es nichts Besseres als ein ordentliches Abendessen mit frischen, regionalen Zutaten vom Holzkohlegrill. <a href="/hiru">Hiru Food &amp; Drinks</a> an der Ctra. d'Arta 40 in Port d'Alcudia hat sich zum gastronomischen Massstab der Gegend entwickelt. Die Kueche dreht sich um handverlesenes gereiftes Fleisch, Reisgerichte mit Fisch und Meeresfruechten vom lokalen Fischmarkt und mediterrane Fische, die ueber Holzkohle perfekt gegrillt werden. Das Ambiente ist modern und entspannt, ideal fur ein langes Abendessen in guter Gesellschaft.</p>
<p><strong>Oeffnungszeiten:</strong> 12:00 bis 23:30 Uhr (Freitag und Samstag bis 1:00 Uhr). Dienstags geschlossen. Reservierung empfohlen, besonders am Wochenende.</p>

<h2>11. Cocktails bei Sonnenuntergang mit Aussicht</h2>
<p>Alcudia bietet einige der schoensten Sonnenuntergaenge Mallorcas, und es gibt keinen besseren Weg, sie zu geniessen, als mit einem erstklassigen Cocktail in der Hand. <a href="/enjoy">Enjoy Terrace</a> in der Av. Tucan 1 in Port d'Alcudia ist der Treffpunkt, an dem Einheimische und Besucher jeden Abend zusammenkommen, um die Sonne untergehen zu sehen. Die Karte mit Signature-Cocktails, gepaart mit Premium-Shisha und anspruchsvollem Ambiente, macht es leicht, bis tief in die Nacht zu bleiben. Taeglich geoeffnet ab 17:00 Uhr.</p>
<p><strong>Tipp:</strong> Komm etwa 30 Minuten vor Sonnenuntergang, um einen guten Platz zu ergattern. Die Bartender empfehlen dir gerne Kombinationen nach deinem Geschmack.</p>

<h2>12. Nachtleben auf Top-Niveau</h2>
<p>Wenn es um Nachtleben in Port d'Alcudia geht, ist <a href="/outxide">Outxide Club</a> die unangefochtene Nummer eins. Er ist die Top-Clubbing-Adresse im Norden Mallorcas mit professionellem Sound, nationalen und internationalen DJs und spektakulaerer visueller Produktion. Geoeffnet Donnerstag bis Samstag ab 23:00 Uhr, von Mai bis Oktober. Die Lage ist perfekt, um ein Abendessen im Hiru und Cocktails in der Enjoy Terrace mit einem Clubbesuch zu kombinieren.</p>
<p><strong>Tickets:</strong> Erhaeltlich ueber FourVenues (offizielle Plattform) oder an der Abendkasse. Online-Kauf bietet in der Regel einen besseren Preis.</p>

<h2>13. Die Hoehle von Sant Marti besuchen</h2>
<p>In der Naehe der Ermita de la Victoria ist die Hoehle von Sant Marti eine natuerliche Grotte, die in eine Kapelle umgewandelt wurde und einen Besuch wert ist. Zwei in den Fels gehauene Raeume beherbergen alte Altaere und Malereien. Die Umgebung ist spektakulaer, umgeben von Pinienwald mit Meerblick. Der Eintritt ist frei und der Besuch laesst sich hervorragend mit der Talaia-Wanderroute verbinden.</p>

<h2>14. Ein Boot mieten und die Kuste erkunden</h2>
<p>Wenn du die noerdliche Mallorca-Kuste in voelliger Freiheit entdecken moechtest, ist das Mieten eines fuehrerscheinfreien Bootes eine immer beliebtere Option in Alcudia. Unternehmen vermieten kleine Motorboote bis 15 PS, die keinen Fuehrerschein erfordern und ideal sind, um die Bucht zu erkunden, in versteckten Buchten zu ankern und Straende wie Coll Baix, Cala Morella und die Formentor-Kuste zu erreichen. Fuer groessere Boote brauchst du einen Fuehrerschein oder einen Skipper ist inklusive.</p>
<p><strong>Wo:</strong> Im Sporthafen von Alcudia gibt es mehrere Charterunternehmen. Die Preise variieren je nach Bootstyp und Saison.</p>

<h2>15. Alcudia per Segway oder E-Bike entdecken</h2>
<p>Fur eine entspanntere Aktivitaet sind Segway- oder E-Bike-Touren eine unterhaltsame Moeglichkeit, Port d'Alcudia, die Strandpromenade und die Umgebung von s'Albufera ohne Anstrengung zu erkunden. Mehrere Anbieter bieten gefuehrte Routen mit Stopps an Aussichtspunkten und historischen Sehenswuerdigkeiten an.</p>

<h2>Dein perfekter Tag in Alcudia</h2>
<p>Wenn du nur einen Tag haettest, hier ist unsere Empfehlung: Starte mit der Altstadt und dem Markt (falls Dienstag oder Sonntag), schwimm am Strand von Alcudia am Vormittag, iss mittags ein Reisgericht mit Fisch und Meeresfruechten im <a href="/hiru">Hiru Food &amp; Drinks</a>, verbringe den Nachmittag mit einem Bootsausflug oder einer Wanderung auf der Victoria-Halbinsel, geniesse Cocktails bei Sonnenuntergang auf der <a href="/enjoy">Enjoy Terrace</a>, und wenn es Donnerstag, Freitag oder Samstag ist, lass die Nacht tanzend im <a href="/outxide">Outxide Club</a> ausklingen. Alcudia hat alles, kompakt und in Reichweite.</p>`,
      fr: `<p>Alcudia est l'une des destinations les plus completes de Majorque. Situee a la pointe nord de l'ile, cette ville allie histoire medievale, plages spectaculaires, espaces naturels proteges et une offre gastronomique et de loisirs en pleine expansion. Si vous vous demandez que faire a Alcudia, voici 15 activites incontournables, du petit matin jusqu'au bout de la nuit.</p>

<h2>1. Parcourir la vieille ville fortifiee</h2>
<p>La vieille ville d'Alcudia possede l'une des enceintes medievales les mieux conservees de Majorque. Les fortifications du XIVe siecle entourent un dedale de ruelles pavees bordees de maisons seigneuriales, d'eglises gothiques et de recoins pleins de charme. Ne manquez pas la Porta de Mallorca, la Porta del Moll, l'eglise de Sant Jaume et l'hotel de ville. La promenade sur les remparts offre des vues panoramiques sur le port, la baie et la Serra de Tramuntana.</p>
<p><strong>Conseil local :</strong> Arrivez tot le matin ou au coucher du soleil pour eviter la chaleur et profiter de la plus belle lumiere pour les photos. Le tour complet des remparts prend environ 30 minutes.</p>

<h2>2. Se detendre a la Platja d'Alcudia</h2>
<p>Avec plus de 7 kilometres de sable fin et d'eaux turquoise peu profondes, la plage d'Alcudia est l'une des plus belles de Majorque. Elle est ideale pour les familles grace a son entree progressive dans la mer et ses equipements complets : transats, parasols, bars de plage et stations de sports nautiques. Le secteur nord, pres de la Ciudad Blanca, est le plus calme.</p>
<p><strong>Comment y aller :</strong> Depuis le centre de Port d'Alcudia, la plage est a moins de cinq minutes a pied. Des parkings publics bordent l'avenue principale, mais en haute saison, arrivez avant 10h00.</p>

<h2>3. Visiter les ruines romaines de Pollentia</h2>
<p>Juste a l'exterieur des murailles, se trouvent les vestiges de Pollentia, la plus importante cite romaine de Majorque, fondee en 123 av. J.-C. Vous pouvez explorer le forum, les maisons patriciennes et un petit theatre romain. Le Museu Monografic de Pollentia, dans le centre historique, complete la visite avec des pieces decouvertes lors des fouilles.</p>
<p><strong>Infos pratiques :</strong> Ouvert du mardi au samedi, de 10h00 a 16h00 en haute saison. Le billet combine ruines et musee coute environ 4 EUR.</p>

<h2>4. Flaner au marche du mardi et du dimanche</h2>
<p>Le marche hebdomadaire d'Alcudia envahit les rues de la vieille ville chaque mardi et dimanche matin. C'est l'un des plus grands de l'ile et une explosion de couleurs : fruits et legumes locaux, charcuterie majorquine (sobrasada, botifarron), fromage de Mahon, olives, ensaimadas fraichement cuites, ceramique artisanale, vetements et accessoires. L'endroit parfait pour acheter des produits authentiques et s'immerger dans la culture locale.</p>
<p><strong>Conseil :</strong> Arrivez entre 8h30 et 10h00 pour en profiter sans la foule. L'edition du dimanche est plus petite mais nettement moins touristique.</p>

<h2>5. Sports nautiques dans la baie</h2>
<p>La baie d'Alcudia est un paradis pour les sports nautiques. Des eaux calmes et un vent regulier en font un spot ideal pour le paddle, le kayak, la planche a voile et le kitesurf. Plusieurs ecoles sur la plage proposent des cours debutants et la location de materiel. Pour une dose supplementaire d'adrenaline, le parasailing, le jet ski et la bouee tractee sont aussi au programme.</p>
<p><strong>Meilleur moment :</strong> Les matinees sont plus calmes pour le paddle et le kayak. L'apres-midi, le vent se leve, ideal pour la planche a voile et le kite.</p>

<h2>6. Excursion en bateau vers Formentor et les grottes marines</h2>
<p>Du port d'Alcudia partent des excursions en bateau vers la spectaculaire peninsule de Formentor, avec ses falaises vertigineuses, ses criques cachees et ses eaux limpides. Certains itineraires incluent des arrets baignade dans des criques accessibles uniquement par la mer et des visites de grottes marines. C'est l'une des experiences les plus memorables du nord de Majorque.</p>
<p><strong>Options :</strong> Du grand catamaran au hors-bord prive pour une sortie plus exclusive. Les departs sont generalement a 10h00, duree entre 3 et 6 heures. Reservez a l'avance en haute saison.</p>

<h2>7. Cyclisme sur les routes du nord</h2>
<p>Alcudia est la capitale du cyclisme a Majorque. Des milliers de cyclistes professionnels et amateurs choisissent la region comme base d'entrainement chaque annee. Les itineraires vont des balades plates le long de la baie et dans le parc naturel de s'Albufera aux ascensions mythiques comme le Cap de Formentor, le Coll de Sa Batalla ou le Puig Major. Des magasins de location de velos de route, gravel et VTT sont presents partout dans la zone.</p>
<p><strong>Itineraire debutant recommande :</strong> Alcudia - Can Picafort par la voie verte cotiere (30 km aller-retour, entierement plat, vue sur la mer tout le trajet).</p>

<h2>8. Randonnee sur la peninsule de la Victoria</h2>
<p>La peninsule de la Victoria, a l'est d'Alcudia, est un tresor pour les randonneurs. L'itineraire le plus populaire monte a la Talaia d'Alcudia (444 metres), offrant une vue a 360 degres sur la baie, la peninsule de Formentor et, par temps clair, jusqu'a Minorque. Vous pouvez aussi descendre jusqu'a la Cala des Coll Baix, l'une des plus belles plages sauvages de Majorque, accessible uniquement a pied ou en bateau.</p>
<p><strong>Infos pratiques :</strong> L'aller-retour de la Talaia prend environ 2 heures. Emportez de l'eau, une protection solaire et des chaussures adaptees. Le chemin vers Coll Baix est plus exigeant (environ 45 minutes de descente avec des passages rocheux).</p>

<h2>9. Explorer le parc naturel de s'Albufera</h2>
<p>S'Albufera est la plus grande zone humide des Baleares et l'un des meilleurs sites d'observation ornithologique d'Europe. Plus de 300 especes y ont ete repertoriees, dont le balbuzard pecheur, le flamant rose, le heron et de nombreux oiseaux migrateurs. Les sentiers du parc sont plats et accessibles, avec des observatoires strategiquement places. L'entree est gratuite et un centre d'accueil informe sur la faune et la flore.</p>
<p><strong>Conseil :</strong> Le petit matin et la fin d'apres-midi sont les meilleurs moments pour l'observation. Apportez des jumelles si possible.</p>

<h2>10. Diner au grill avec des produits locaux</h2>
<p>Apres une journee d'exploration a Alcudia, rien de mieux qu'un diner de qualite avec des ingredients frais cuits au charbon de bois. <a href="/hiru">Hiru Food &amp; Drinks</a>, sur la Ctra. d'Arta 40 a Port d'Alcudia, s'est impose comme la reference gastronomique de la zone. La cuisine tourne autour de viandes maturees selectionnees, de plats de riz prepares avec le poisson et les fruits de mer du marche local, et de poissons mediterraneens grilles a la perfection sur charbon. L'ambiance est moderne et decontractee, ideale pour un diner prolonge en bonne compagnie.</p>
<p><strong>Horaires :</strong> 12h00 a 23h30 (vendredi et samedi jusqu'a 1h00). Ferme le mardi. Reservation recommandee, surtout le week-end.</p>

<h2>11. Cocktails au coucher du soleil</h2>
<p>Alcudia offre certains des plus beaux couchers de soleil de Majorque, et il n'y a pas de meilleure facon d'en profiter qu'avec un cocktail de qualite a la main. <a href="/enjoy">Enjoy Terrace</a>, Av. Tucan 1 a Port d'Alcudia, est le point de rendez-vous ou locaux et visiteurs se retrouvent chaque soir pour regarder le soleil se coucher. La carte de cocktails signatures, associee a une chicha premium et une ambiance raffinee, rend facile d'y rester jusqu'au bout de la nuit. Ouvert tous les jours a partir de 17h00.</p>
<p><strong>Conseil :</strong> Arrivez environ 30 minutes avant le coucher du soleil pour avoir une bonne place. Les bartenders se feront un plaisir de vous recommander des combinaisons selon vos gouts.</p>

<h2>12. Vie nocturne haut de gamme</h2>
<p>Cote nuit a Port d'Alcudia, <a href="/outxide">Outxide Club</a> est la reference incontestee. C'est la premiere destination clubbing du nord de Majorque, avec un son professionnel, des DJ nationaux et internationaux et une production visuelle spectaculaire. Ouvert du jeudi au samedi a partir de 23h00, de mai a octobre. L'emplacement est parfait pour enchaîner un diner chez Hiru, des cocktails a l'Enjoy Terrace puis une soiree au club.</p>
<p><strong>Billets :</strong> Disponibles via FourVenues (plateforme officielle) ou sur place. L'achat en ligne offre generalement un meilleur tarif.</p>

<h2>13. Visiter la grotte de Sant Marti</h2>
<p>Pres de l'Ermita de la Victoria, la grotte de Sant Marti est une cavite naturelle transformee en chapelle qui merite le detour. Deux salles creusees dans la roche abritent des autels anciens et des peintures. Le cadre est spectaculaire, entoure de pinede avec vue sur la mer. L'entree est gratuite et la visite se combine parfaitement avec la randonnee de la Talaia.</p>

<h2>14. Louer un bateau et explorer la cote</h2>
<p>Pour une liberte totale dans l'exploration de la cote nord de Majorque, la location de bateau sans permis est une option de plus en plus prisee a Alcudia. Des societes louent des petits bateaux a moteur jusqu'a 15 CV ne necessitant aucun permis, parfaits pour parcourir la baie, mouiller dans des criques cachees et rejoindre des plages comme Coll Baix, Cala Morella ou la cote de Formentor. Pour des embarcations plus grandes, il vous faudra un permis ou un skipper inclus.</p>
<p><strong>Ou :</strong> Plusieurs societes de charter operent depuis le port de plaisance d'Alcudia. Les tarifs varient selon le type de bateau et la saison.</p>

<h2>15. Decouvrir Alcudia en Segway ou velo electrique</h2>
<p>Pour une activite plus tranquille, les tours en Segway ou velo electrique sont une facon amusante d'explorer Port d'Alcudia, le front de mer et les alentours de s'Albufera sans effort. Plusieurs operateurs proposent des circuits guides avec des arrets aux points de vue et sites historiques.</p>

<h2>Votre journee parfaite a Alcudia</h2>
<p>Si vous n'aviez qu'une journee, voici notre recommandation : commencez par la vieille ville et le marche (si c'est mardi ou dimanche), baignez-vous a la plage d'Alcudia le matin, dejeuner d'un riz aux fruits de mer au <a href="/hiru">Hiru Food &amp; Drinks</a>, passez l'apres-midi en excursion en bateau ou en randonnee sur la Victoria, savourez des cocktails au coucher du soleil a la <a href="/enjoy">Enjoy Terrace</a>, et si c'est jeudi, vendredi ou samedi, terminez la nuit en dansant a l'<a href="/outxide">Outxide Club</a>. Alcudia a tout, compact et a portee de main.</p>`,
      it: `<p>Alcudia e' una delle destinazioni piu' complete di Maiorca. Situata sulla punta settentrionale dell'isola, questa citta' unisce storia medievale, spiagge spettacolari, aree naturali protette e un'offerta gastronomica e di svago in continua crescita. Se ti chiedi cosa fare ad Alcudia, ecco 15 attivita' imperdibili che coprono dalla mattina presto fino a notte fonda.</p>

<h2>1. Passeggiare nel centro storico medievale</h2>
<p>Il centro storico di Alcudia vanta una delle cinte murarie medievali meglio conservate di Maiorca. Le fortificazioni del XIV secolo racchiudono un labirinto di stradine acciottolate fiancheggiate da palazzi signorili, chiese gotiche e angoli nascosti. Da non perdere la Porta de Mallorca, la Porta del Moll, la chiesa di Sant Jaume e il Municipio. Una passeggiata lungo le mura regala viste panoramiche sul porto, la baia e le montagne della Serra de Tramuntana.</p>
<p><strong>Consiglio locale:</strong> Arriva al mattino presto o al tramonto per evitare il caldo e cogliere la luce migliore per le foto. Il giro completo delle mura richiede circa 30 minuti.</p>

<h2>2. Rilassarsi alla Platja d'Alcudia</h2>
<p>Con oltre 7 chilometri di sabbia fine e acque turchesi poco profonde, la spiaggia di Alcudia e' tra le piu' belle dell'isola. E' ideale per le famiglie grazie al fondale dolcemente digradante e ai servizi completi: lettini, ombrelloni, chiringuitos e postazioni per sport acquatici. Il tratto nord, vicino alla Ciudad Blanca, e' il piu' tranquillo.</p>
<p><strong>Come arrivare:</strong> Dal centro di Port d'Alcudia la spiaggia e' a meno di cinque minuti a piedi. Parcheggi pubblici si trovano lungo il viale principale, ma in alta stagione conviene arrivare prima delle 10:00.</p>

<h2>3. Visitare le rovine romane di Pollentia</h2>
<p>Appena fuori dalle mura della citta' vecchia si trovano i resti di Pollentia, il piu' importante insediamento romano di Maiorca, fondato nel 123 a.C. Puoi esplorare il foro, le case patrizie e un piccolo teatro romano. Il Museu Monografic de Pollentia nel centro storico completa la visita con reperti rinvenuti durante gli scavi.</p>
<p><strong>Info pratiche:</strong> Aperto da martedi' a sabato, 10:00-16:00 in alta stagione. Il biglietto combinato rovine + museo costa circa 4 EUR.</p>

<h2>4. Perdersi nel mercato del martedi' e della domenica</h2>
<p>Il mercato settimanale di Alcudia invade le strade del centro storico ogni martedi' e domenica mattina. E' uno dei piu' grandi dell'isola e un'esplosione di colori: frutta e verdura locale, salumi maiorchini (sobrasada, botifarron), formaggio di Mahon, olive, ensaimadas appena sfornate, ceramiche artigianali, abbigliamento e accessori. Il luogo perfetto per acquistare prodotti autentici e immergersi nella cultura locale.</p>
<p><strong>Consiglio:</strong> Arriva tra le 8:30 e le 10:00 per goderti il mercato senza la folla. L'edizione domenicale e' piu' piccola ma molto meno turistica.</p>

<h2>5. Sport acquatici nella baia</h2>
<p>La baia di Alcudia e' un paradiso per gli sport acquatici. Acque calme e vento costante la rendono uno spot ideale per stand-up paddle, kayak, windsurf e kitesurf. Diverse scuole sulla spiaggia offrono corsi per principianti e noleggio attrezzature. Per una dose extra di adrenalina ci sono anche parasailing, moto d'acqua e banana boat.</p>
<p><strong>Momento migliore:</strong> Le mattine sono piu' calme per il paddle e il kayak. Nel pomeriggio si alza il vento, perfetto per windsurf e kite.</p>

<h2>6. Escursione in barca a Formentor e alle grotte marine</h2>
<p>Dal porto di Alcudia partono escursioni in barca verso la spettacolare penisola di Formentor, con le sue scogliere a picco, calette nascoste e acque cristalline. Alcuni itinerari includono soste per nuotare in calette raggiungibili solo via mare e visite a grotte marine. E' una delle esperienze piu' indimenticabili del nord di Maiorca.</p>
<p><strong>Opzioni:</strong> Si va dai grandi catamarani ai motoscafi privati per un'esperienza piu' esclusiva. Le partenze sono di solito alle 10:00, durata tra 3 e 6 ore. In alta stagione, prenota in anticipo.</p>

<h2>7. Ciclismo sulle strade del nord</h2>
<p>Alcudia e' la capitale del ciclismo a Maiorca. Migliaia di ciclisti professionisti e amatoriali scelgono la zona come base di allenamento ogni anno. I percorsi spaziano dalle pedalate pianeggianti lungo la baia e nel parco naturale di s'Albufera alle salite leggendarie come il Cap de Formentor, il Coll de Sa Batalla e il Puig Major. Negozi di noleggio bici da strada, gravel e mountain bike sono diffusi in tutta la zona.</p>
<p><strong>Percorso consigliato per principianti:</strong> Alcudia - Can Picafort sulla ciclabile costiera (30 km andata e ritorno, completamente pianeggiante, vista mare per tutto il tragitto).</p>

<h2>8. Trekking sulla penisola della Victoria</h2>
<p>La penisola della Victoria, a est di Alcudia, e' un gioiello per gli escursionisti. Il percorso piu' popolare sale alla Talaia d'Alcudia (444 metri), con vista a 360 gradi sulla baia, la penisola di Formentor e, nelle giornate limpide, fino a Minorca. Puoi anche scendere fino alla Cala des Coll Baix, una delle spiagge piu' belle e selvagge di Maiorca, raggiungibile solo a piedi o in barca.</p>
<p><strong>Info pratiche:</strong> L'andata e ritorno dalla Talaia richiede circa 2 ore. Porta acqua, protezione solare e scarpe adeguate. Il sentiero per Coll Baix e' piu' impegnativo (circa 45 minuti di discesa con tratti rocciosi).</p>

<h2>9. Esplorare il parco naturale di s'Albufera</h2>
<p>S'Albufera e' la zona umida piu' grande delle Baleari e uno dei migliori siti di birdwatching d'Europa. Oltre 300 specie sono state registrate, tra cui falco pescatore, fenicottero, airone e numerosi uccelli migratori. I sentieri del parco sono pianeggianti e accessibili, con capanni di osservazione strategicamente posizionati. L'ingresso e' gratuito e un centro visitatori fornisce informazioni sulla fauna e la flora.</p>
<p><strong>Consiglio:</strong> Le prime ore del mattino e il tardo pomeriggio sono i momenti migliori per il birdwatching. Porta un binocolo se puoi.</p>

<h2>10. Cenare alla griglia con prodotti locali</h2>
<p>Dopo una giornata di esplorazioni ad Alcudia, niente batte una cena come si deve con ingredienti freschi locali cotti alla brace. <a href="/hiru">Hiru Food &amp; Drinks</a>, in Ctra. d'Arta 40 a Port d'Alcudia, e' diventato il punto di riferimento gastronomico della zona. La cucina ruota attorno a carni frollate selezionate, risotti preparati con pesce e frutti di mare del mercato locale e pesci mediterranei grigliati alla perfezione su carbone. L'atmosfera e' moderna e rilassata, ideale per una cena lunga in buona compagnia.</p>
<p><strong>Orari:</strong> 12:00-23:30 (venerdi' e sabato fino all'1:00). Chiuso il martedi'. Prenotazione consigliata, specialmente nel fine settimana.</p>

<h2>11. Cocktail al tramonto con vista</h2>
<p>Alcudia regala alcuni dei tramonti piu' belli di Maiorca, e non c'e' modo migliore di goderseli che con un cocktail di qualita' in mano. <a href="/enjoy">Enjoy Terrace</a>, in Av. Tucan 1 a Port d'Alcudia, e' il punto d'incontro dove locali e visitatori si ritrovano ogni sera per guardare il sole scendere all'orizzonte. Il menu di cocktail d'autore, abbinato a shisha premium e un'atmosfera raffinata, rende facile restare fino a tarda notte. Aperto tutti i giorni dalle 17:00.</p>
<p><strong>Consiglio:</strong> Arriva circa 30 minuti prima del tramonto per assicurarti un buon posto. I bartender saranno felici di consigliarti combinazioni in base ai tuoi gusti.</p>

<h2>12. Vita notturna di alto livello</h2>
<p>Quando si parla di notte a Port d'Alcudia, <a href="/outxide">Outxide Club</a> e' il riferimento indiscusso. E' la prima destinazione per il clubbing nel nord di Maiorca, con impianto audio professionale, DJ nazionali e internazionali e una produzione visiva spettacolare. Aperto da giovedi' a sabato dalle 23:00, da maggio a ottobre. La posizione e' perfetta per combinare una cena da Hiru e cocktail all'Enjoy Terrace prima di entrare in discoteca.</p>
<p><strong>Biglietti:</strong> Disponibili tramite FourVenues (piattaforma ufficiale) o alla porta. L'acquisto online offre di solito un prezzo migliore.</p>

<h2>13. Visitare la grotta di Sant Marti</h2>
<p>Vicino all'Ermita de la Victoria, la grotta di Sant Marti e' una cavita' naturale trasformata in cappella che merita una visita. Due sale scavate nella roccia ospitano altari antichi e dipinti. Il contesto e' spettacolare, circondato da pineta con vista sul mare. L'ingresso e' gratuito e la visita si abbina perfettamente al trekking della Talaia.</p>

<h2>14. Noleggiare una barca ed esplorare la costa</h2>
<p>Se vuoi la totale liberta' di scoprire la costa nord di Maiorca, noleggiare una barca senza patente e' un'opzione sempre piu' popolare ad Alcudia. Aziende noleggiano piccoli motoscafi fino a 15 CV che non richiedono patente, perfetti per esplorare la baia, ancorare in calette nascoste e raggiungere spiagge come Coll Baix, Cala Morella e la costa di Formentor. Per imbarcazioni piu' grandi servira' la patente o uno skipper incluso.</p>
<p><strong>Dove:</strong> Nel porto turistico di Alcudia operano diverse societa' di charter. I prezzi variano in base al tipo di barca e alla stagione.</p>

<h2>15. Scoprire Alcudia in Segway o e-bike</h2>
<p>Per un'attivita' piu' rilassata, i tour in Segway o bici elettrica sono un modo divertente di esplorare Port d'Alcudia, il lungomare e i dintorni di s'Albufera senza fatica. Diversi operatori propongono percorsi guidati con soste ai punti panoramici e ai siti storici.</p>

<h2>La tua giornata perfetta ad Alcudia</h2>
<p>Se avessi un solo giorno, ecco il nostro consiglio: inizia con il centro storico e il mercato (se e' martedi' o domenica), fai il bagno alla spiaggia di Alcudia la mattina, pranza con un riso ai frutti di mare da <a href="/hiru">Hiru Food &amp; Drinks</a>, dedica il pomeriggio a un'escursione in barca o al trekking sulla Victoria, goditi i cocktail al tramonto all'<a href="/enjoy">Enjoy Terrace</a>, e se e' giovedi', venerdi' o sabato, chiudi la notte ballando all'<a href="/outxide">Outxide Club</a>. Alcudia ha tutto, compatto e a portata di mano.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    image: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
    tags: ["alcudia", "mallorca", "activities", "guide"],
    venue: "general",
    readingTime: 12,
  },
  {
    slug: "playas-alcudia-guia-completa",
    title: {
      es: "Playas de Alcudia: Guia Completa de las Mejores Playas en 2026",
      en: "Alcudia Beaches: Complete Guide to the Best Beaches in 2026",
      de: "Strande in Alcudia: Kompletter Guide zu den schoensten Stranden 2026",
      fr: "Plages d'Alcudia : Guide Complet des Plus Belles Plages en 2026",
      it: "Spiagge di Alcudia: Guida Completa alle Migliori Spiagge nel 2026",
    },
    excerpt: {
      es: "Guia completa de las mejores playas de Alcudia: Platja d'Alcudia, Platja de Muro, Cala Sant Vicenc, Es Coll Baix y mas. Como llegar, servicios y planes despues de la playa.",
      en: "Complete guide to the best Alcudia beaches: Platja d'Alcudia, Platja de Muro, Cala Sant Vicenc, Es Coll Baix and more. How to get there, facilities and after-beach plans.",
      de: "Kompletter Guide zu den schoensten Straenden in Alcudia: Platja d'Alcudia, Platja de Muro, Cala Sant Vicenc, Es Coll Baix und mehr. Anfahrt, Ausstattung und Plane nach dem Strand.",
      fr: "Guide complet des plus belles plages d'Alcudia : Platja d'Alcudia, Platja de Muro, Cala Sant Vicenc, Es Coll Baix et plus. Comment y aller, equipements et plans apres la plage.",
      it: "Guida completa alle migliori spiagge di Alcudia: Platja d'Alcudia, Platja de Muro, Cala Sant Vicenc, Es Coll Baix e altre. Come arrivare, servizi e piani dopo la spiaggia.",
    },
    content: {
      es: `<p>La zona de Alcudia, en el norte de Mallorca, concentra algunas de las playas mas espectaculares de las Islas Baleares. Desde la interminable franja de arena blanca de la Platja d'Alcudia hasta calas escondidas solo accesibles a pie o en barco, hay una playa para cada tipo de viajero. Esta guia te lleva por las mejores playas de Alcudia con toda la informacion practica que necesitas para disfrutarlas al maximo.</p>

<h2>Platja d'Alcudia: la playa principal</h2>
<p>La Platja d'Alcudia es la playa estrella del norte de Mallorca y una de las mas grandes de la isla, con mas de 3,5 kilometros de arena fina y dorada. El agua es cristalina, poco profunda y con un fondo de arena que permite caminar varios metros mar adentro sin perder pie, lo que la convierte en la favorita de las familias con ninos pequenos.</p>

<h3>Como es</h3>
<p>Arena fina y dorada, aguas turquesas tranquilas. La playa es ancha y tiene espacio de sobra incluso en temporada alta. La zona norte (cerca de la Ciudad Blanca) es mas tranquila, mientras que la parte central, frente al paseo maritimo, es la mas animada con chiringuitos, restaurantes y tiendas.</p>

<h3>Como llegar</h3>
<p>Desde el centro de Port d'Alcudia, la playa esta a menos de 5 minutos a pie por cualquiera de las calles que bajan hacia el mar. En coche, hay aparcamiento gratuito en las calles paralelas al paseo maritimo y un parking publico junto al puerto. En temporada alta, llega antes de las 10:00 para encontrar sitio facilmente.</p>

<h3>Servicios</h3>
<p>Hamacas y sombrillas de alquiler, duchas, aseos publicos, chiringuitos, socorristas en temporada alta, zonas de deportes acuaticos (paddle surf, kayak, banana boat, parasailing), acceso adaptado para personas con movilidad reducida en varios puntos.</p>

<h3>Mejor momento para visitarla</h3>
<p>De junio a septiembre para banarte. Las mananas de entre semana son las mas tranquilas. Al atardecer, la luz es espectacular para paseos por la orilla. Fuera de temporada (abril-mayo, octubre) la playa esta practicamente desierta y es perfecta para caminar o correr.</p>

<h2>Platja de Muro: el paraiso de arena blanca</h2>
<p>Tecnicamnete en el municipio de Muro, pero continuacion directa de la playa de Alcudia hacia el sur, la Platja de Muro es donde la arena se vuelve aun mas blanca y fina y el agua alcanza tonos caribenos. Es una de las playas mas fotografiadas de Mallorca y aparece regularmente en los rankings de mejores playas de Europa.</p>

<h3>Como es</h3>
<p>Arena blanca y finisima, aguas poco profundas de un turquesa intenso. La playa se divide en sectores: la zona 1 es la mas cercana a Alcudia y la mas equipada; las zonas 2 y 3 estan dentro del parque natural de s'Albufera y son progresivamente mas tranquilas y salvajes, con dunas protegidas y vegetacion baja.</p>

<h3>Como llegar</h3>
<p>En coche, toma la carretera Ma-12 direccion Can Picafort. Hay varios accesos senalizados con parking (de pago en zona 1, gratuito en zonas 2 y 3). En bicicleta, la via verde costera conecta Port d'Alcudia con la playa de Muro (unos 15 minutos pedaleando). Tambien hay un autobus local que conecta ambas zonas en verano.</p>

<h3>Servicios</h3>
<p>Zona 1: hamacas, sombrillas, chiringuitos, aseos, socorristas. Zonas 2 y 3: servicios muy limitados o inexistentes. Lleva tu propia agua y comida si vas a las zonas mas alejadas.</p>

<h3>Mejor momento para visitarla</h3>
<p>De mayo a octubre. Las mananas de entre semana, especialmente en las zonas 2 y 3, ofrecen una experiencia casi privada. Si buscas ambiente, la zona 1 en julio y agosto es la mas animada.</p>

<h2>Cala Sant Vicenc: las calas de postal</h2>
<p>A unos 15 minutos en coche de Alcudia, Cala Sant Vicenc es en realidad un conjunto de cuatro pequeñas calas rodeadas de montanas y pinares: Cala Barques, Cala Clara, Cala Molins y Cala Carbó. Cada una tiene su personalidad, pero todas comparten aguas cristalinas y un entorno natural espectacular.</p>

<h3>Las cuatro calas</h3>
<ul>
<li><strong>Cala Barques:</strong> la mas grande y accesible, con arena y roca, buen snorkel en los laterales. Tiene chiringuito y alquiler de hamacas.</li>
<li><strong>Cala Clara:</strong> pequena y recogida, ideal para parejas. Agua transparente sobre fondo de roca.</li>
<li><strong>Cala Molins:</strong> la mas popular, con arena fina, restaurante en primera linea y ambiente familiar. Aparcamiento cercano.</li>
<li><strong>Cala Carbo:</strong> la mas salvaje y pequena, sin servicios. Acceso por un sendero corto entre pinos. Perfecta para quien busca tranquilidad absoluta.</li>
</ul>

<h3>Como llegar</h3>
<p>Desde Alcudia, toma la Ma-2200 hacia Pollenca y luego la Ma-2210 hasta Cala Sant Vicenc. El trayecto es de unos 15 minutos. Hay parking publico (limitado en verano, llega temprano). No hay transporte publico directo; el coche o la bicicleta son las mejores opciones.</p>

<h3>Mejor momento para visitarla</h3>
<p>De junio a septiembre para banarte. Llega antes de las 10:00 en verano para aparcar bien. Fuera de temporada es perfecta para senderismo por los acantilados entre las calas.</p>

<h2>Es Coll Baix: la playa salvaje</h2>
<p>Es Coll Baix es una de las playas mas espectaculares y salvajes de Mallorca. Encajonada entre acantilados de mas de 200 metros de altura y solo accesible a pie por un sendero exigente o en barco, es el destino perfecto para los amantes de la naturaleza que no les importa caminar para encontrar un lugar unico.</p>

<h3>Como es</h3>
<p>Playa de piedras y grava gruesa, rodeada de paredes verticales de roca. El agua es de un azul profundo y cristalino. No hay sombra natural ni servicios de ningun tipo. Es un lugar completamente virgen donde la naturaleza manda.</p>

<h3>Como llegar a pie</h3>
<p>El sendero parte del final de la carretera de la Ermita de la Victoria (hay un pequeno parking). La bajada toma unos 40-50 minutos por un camino rocoso con tramos empinados. Necesitas calzado de senderismo, agua abundante y proteccion solar. La subida de vuelta es exigente. No es apta para ninos pequenos ni personas con movilidad reducida.</p>

<h3>Como llegar en barco</h3>
<p>Desde el puerto de Alcudia, varias empresas ofrecen excursiones que incluyen parada en Es Coll Baix. Tambien puedes alquilar un barco sin licencia y llegar por tu cuenta. Esta opcion te permite disfrutar de la playa sin el esfuerzo de la caminata.</p>

<h3>Mejor momento para visitarla</h3>
<p>De mayo a septiembre. Madruga para ir a pie (sal a las 8:00-9:00 para evitar el calor). Si vas en barco, cualquier hora de la manana es buena. Evita los dias de mucho viento, ya que el mar puede estar agitado en esta zona.</p>

<h2>Platja des Coll Baix (Platja des Coll Baix Petit)</h2>
<p>No hay que confundirla con Es Coll Baix. La Platja des Coll Baix, tambien llamada Coll Baix Petit, es una pequena playa de grava accesible por un sendero diferente desde la zona de la Victoria. Es mas pequena y menos visitada que su vecina famosa, lo que la convierte en una opcion interesante para quienes buscan soledad absoluta.</p>

<h3>Como llegar</h3>
<p>El acceso es por un sendero que parte de la carretera de la Victoria, antes de llegar al parking de Es Coll Baix. La bajada es mas corta pero igualmente rocosa. Lleva calzado adecuado y agua.</p>

<h3>Mejor momento para visitarla</h3>
<p>Las mismas recomendaciones que para Es Coll Baix. Al ser menos conocida, encontraras menos gente incluso en temporada alta.</p>

<h2>S'Illot: el islote frente a la playa</h2>
<p>S'Illot es un pequeno islote rocoso situado justo frente a la Platja d'Alcudia, en su extremo norte. Se puede llegar nadando o caminando con el agua por la cintura (la distancia es de unos 50 metros). Es un punto popular para hacer snorkel, ya que las rocas del islote albergan una rica vida marina con peces de colores, erizos y estrellas de mar.</p>

<h3>Como llegar</h3>
<p>Desde la parte norte de la Platja d'Alcudia, camina hacia el extremo donde la arena termina en una zona rocosa. Desde ahi, el islote esta a pocos metros. Puedes caminar o nadar dependiendo de la marea.</p>

<h3>Consejo</h3>
<p>Lleva gafas de snorkel y escarpines. El fondo entre la playa y el islote tiene tramos de roca y posidonia. La zona es especialmente bonita por la manana, cuando el agua esta mas tranquila y la visibilidad es maxima.</p>

<h2>Despues de la playa: tus planes en Alcudia</h2>
<p>Un gran dia de playa merece un gran final. Aqui van nuestras recomendaciones para completar la jornada:</p>

<h3>Para comer o cenar</h3>
<p>Despues de horas al sol, el cuerpo pide una buena comida. <a href="/hiru">Hiru Food &amp; Drinks</a> (Ctra. d'Arta 40, Port d'Alcudia) es la eleccion perfecta: arroces elaborados con pescado y marisco de la lonja, carnes maduradas a la brasa y pescados del Mediterraneo. Abierto desde las 12:00, es ideal tanto para un almuerzo largo como para una cena relajada despues de la playa. Cierra los martes.</p>

<h3>Para tomar algo al atardecer</h3>
<p>Sal de la playa, date una ducha y dirigete a <a href="/enjoy">Enjoy Terrace</a> (Av. Tucan 1, Port d'Alcudia). Cocteles de autor, shisha premium y un ambiente que combina perfectamente con el atardecer de Alcudia. Abre a las 17:00 cada dia y es el lugar donde la tarde se convierte en noche de forma natural.</p>

<h3>Para salir de noche</h3>
<p>Si es jueves, viernes o sabado, la noche continua en <a href="/outxide">Outxide Club</a>, en la misma Av. Tucan 1. DJs de primer nivel, sonido profesional y una produccion visual que transforma cada noche en una experiencia unica. Abre a las 23:00 de mayo a octubre.</p>

<h2>Consejos practicos para las playas de Alcudia</h2>
<ul>
<li><strong>Proteccion solar:</strong> el sol de Mallorca es intenso, especialmente entre las 12:00 y las 16:00. Usa SPF 50 y reaplica despues de cada bano.</li>
<li><strong>Agua y comida:</strong> las playas equipadas tienen chiringuitos, pero para las calas salvajes (Es Coll Baix, Cala Carbo) lleva tu propia provision.</li>
<li><strong>Calzado:</strong> escarpines o sandalias acuaticas son imprescindibles para las playas de grava y roca.</li>
<li><strong>Medioambiente:</strong> respeta la posidonia (las algas que a veces se acumulan en la orilla). Es un ecosistema protegido vital para la salud del Mediterraneo.</li>
<li><strong>Temporada de bandera azul:</strong> las playas principales tienen bandera azul y socorristas de junio a septiembre.</li>
</ul>`,
      en: `<p>The Alcudia area in northern Mallorca is home to some of the most spectacular beaches in the Balearic Islands. From the seemingly endless strip of white sand at Platja d'Alcudia to hidden coves reachable only on foot or by boat, there is a beach for every type of traveller. This guide takes you through the best Alcudia beaches with all the practical information you need to make the most of them.</p>

<h2>Platja d'Alcudia: the main beach</h2>
<p>Platja d'Alcudia is the flagship beach of northern Mallorca and one of the largest on the island, stretching over 3.5 kilometres of fine golden sand. The water is crystal clear, shallow and sandy-bottomed, allowing you to wade out a long way without losing your footing, which makes it a firm favourite with families with young children.</p>

<h3>What it is like</h3>
<p>Fine golden sand, calm turquoise waters. The beach is wide and has plenty of room even in peak season. The northern end (near Ciudad Blanca) is quieter, while the central section opposite the promenade is the liveliest with beach bars, restaurants and shops.</p>

<h3>How to get there</h3>
<p>From central Port d'Alcudia the beach is less than a five-minute walk down any of the streets heading towards the sea. By car, there is free parking on the streets running parallel to the promenade and a public car park next to the harbour. In high season, arrive before 10:00 to find a spot easily.</p>

<h3>Facilities</h3>
<p>Sunbed and parasol hire, showers, public toilets, beach bars, lifeguards in high season, water-sport areas (paddleboarding, kayaking, banana boat, parasailing), disabled-access ramps at several points.</p>

<h3>Best time to visit</h3>
<p>June to September for swimming. Weekday mornings are the quietest. Sunsets provide spectacular light for walks along the shoreline. Outside the main season (April-May, October) the beach is virtually deserted and perfect for walking or running.</p>

<h2>Platja de Muro: white-sand paradise</h2>
<p>Technically in the municipality of Muro but a direct continuation of Alcudia beach heading south, Platja de Muro is where the sand turns even whiter and finer and the water takes on Caribbean shades. It is one of the most photographed beaches in Mallorca and regularly features in European best-beach rankings.</p>

<h3>What it is like</h3>
<p>Brilliant white, ultra-fine sand, shallow turquoise water. The beach is split into sectors: zone 1 is closest to Alcudia and has the most facilities; zones 2 and 3 fall within the s'Albufera nature reserve and become progressively quieter and wilder, with protected dunes and low vegetation.</p>

<h3>How to get there</h3>
<p>By car, take the Ma-12 towards Can Picafort. Several signposted access points have parking (paid in zone 1, free in zones 2 and 3). By bike, the coastal greenway connects Port d'Alcudia to Playa de Muro in about 15 minutes of cycling. A local bus also links the two areas in summer.</p>

<h3>Facilities</h3>
<p>Zone 1: sunbeds, parasols, beach bars, toilets, lifeguards. Zones 2 and 3: very limited or no facilities. Bring your own water and food if heading to the further sections.</p>

<h3>Best time to visit</h3>
<p>May to October. Weekday mornings, especially in zones 2 and 3, offer an almost private experience. If you want atmosphere, zone 1 in July and August is the liveliest.</p>

<h2>Cala Sant Vicenc: picture-postcard coves</h2>
<p>About 15 minutes by car from Alcudia, Cala Sant Vicenc is actually a group of four small coves framed by mountains and pine forest: Cala Barques, Cala Clara, Cala Molins and Cala Carbo. Each has its own character, but all share crystal-clear water and a stunning natural setting.</p>

<h3>The four coves</h3>
<ul>
<li><strong>Cala Barques:</strong> the largest and most accessible, a mix of sand and rock with good snorkelling along the sides. Beach bar and sunbed hire available.</li>
<li><strong>Cala Clara:</strong> small and sheltered, ideal for couples. Transparent water over a rocky bottom.</li>
<li><strong>Cala Molins:</strong> the most popular, with fine sand, a front-row restaurant and a family-friendly atmosphere. Parking nearby.</li>
<li><strong>Cala Carbo:</strong> the wildest and smallest, with no facilities. Reached by a short path through the pines. Perfect for total peace and quiet.</li>
</ul>

<h3>How to get there</h3>
<p>From Alcudia, take the Ma-2200 towards Pollenca and then the Ma-2210 to Cala Sant Vicenc. The drive takes about 15 minutes. There is a public car park (limited in summer, arrive early). No direct public transport; car or bicycle are the best options.</p>

<h3>Best time to visit</h3>
<p>June to September for swimming. Arrive before 10:00 in summer for easy parking. Outside the season the cliffs between the coves are great for hiking.</p>

<h2>Es Coll Baix: the wild beach</h2>
<p>Es Coll Baix is one of the most spectacular and unspoilt beaches in Mallorca. Hemmed in by cliffs rising over 200 metres and reachable only by a demanding trail on foot or by boat, it is the ultimate destination for nature lovers who do not mind a hike to find somewhere truly special.</p>

<h3>What it is like</h3>
<p>A beach of stones and coarse gravel surrounded by sheer rock walls. The water is a deep, crystal-clear blue. There is no natural shade and absolutely no facilities. It is a completely untouched place where nature is in charge.</p>

<h3>Getting there on foot</h3>
<p>The trail starts at the end of the road to the Ermita de la Victoria (small car park available). The descent takes about 40 to 50 minutes along a rocky path with steep sections. You will need hiking shoes, plenty of water and sun protection. The climb back up is strenuous. Not suitable for young children or anyone with limited mobility.</p>

<h3>Getting there by boat</h3>
<p>From Alcudia harbour, several companies run excursions that stop at Es Coll Baix. You can also hire a no-licence boat and make your own way there. This option lets you enjoy the beach without the effort of the hike.</p>

<h3>Best time to visit</h3>
<p>May to September. Start early if going on foot (set off at 08:00 to 09:00 to beat the heat). By boat, any time in the morning works well. Avoid very windy days, as the sea can get rough in this area.</p>

<h2>Platja des Coll Baix (Coll Baix Petit)</h2>
<p>Not to be confused with Es Coll Baix. Platja des Coll Baix, also called Coll Baix Petit, is a small pebble beach reached by a different trail from the Victoria area. It is smaller and far less visited than its famous neighbour, making it an interesting option for anyone seeking absolute solitude.</p>

<h3>How to get there</h3>
<p>Access is via a path that branches off the Victoria road before the Es Coll Baix car park. The descent is shorter but equally rocky. Wear proper footwear and carry water.</p>

<h3>Best time to visit</h3>
<p>The same recommendations as for Es Coll Baix apply. Because it is less well known, you will find fewer people even in peak season.</p>

<h2>S'Illot: the islet off the beach</h2>
<p>S'Illot is a small rocky islet sitting just off the northern end of Platja d'Alcudia. You can reach it by swimming or wading (the distance is around 50 metres). It is a popular snorkelling spot, as the rocks around the islet harbour rich marine life including colourful fish, sea urchins and starfish.</p>

<h3>How to get there</h3>
<p>From the northern end of Platja d'Alcudia, walk to the point where the sand gives way to a rocky area. From there the islet is just metres away. You can walk or swim depending on the tide.</p>

<h3>Tip</h3>
<p>Bring a snorkel mask and reef shoes. The seabed between the beach and the islet has patches of rock and posidonia seagrass. The area is particularly beautiful in the morning, when the water is calmest and visibility is at its best.</p>

<h2>After the beach: your plans in Alcudia</h2>
<p>A great beach day deserves a great finish. Here are our recommendations for rounding off the day:</p>

<h3>For lunch or dinner</h3>
<p>After hours in the sun, your body craves a proper meal. <a href="/hiru">Hiru Food &amp; Drinks</a> (Ctra. d'Arta 40, Port d'Alcudia) is the ideal choice: rice dishes prepared with fish and seafood from the local market, charcoal-grilled aged meats and Mediterranean fish. Open from 12:00, it works perfectly for a long lunch or a relaxed post-beach dinner. Closed Tuesdays.</p>

<h3>For sunset drinks</h3>
<p>Leave the beach, take a shower and head to <a href="/enjoy">Enjoy Terrace</a> (Av. Tucan 1, Port d'Alcudia). Signature cocktails, premium shisha and an ambiance that pairs perfectly with an Alcudia sunset. Open from 17:00 daily, it is the place where the afternoon naturally turns into evening.</p>

<h3>For nightlife</h3>
<p>If it is Thursday, Friday or Saturday, the night carries on at <a href="/outxide">Outxide Club</a>, at the same Av. Tucan 1. Top-tier DJs, professional sound and visual production that turns every night into a unique experience. Open from 23:00, May to October.</p>

<h2>Practical tips for Alcudia's beaches</h2>
<ul>
<li><strong>Sun protection:</strong> The Mallorcan sun is fierce, especially between 12:00 and 16:00. Use SPF 50 and reapply after every swim.</li>
<li><strong>Water and food:</strong> Equipped beaches have beach bars, but for wild coves (Es Coll Baix, Cala Carbo) bring your own supplies.</li>
<li><strong>Footwear:</strong> Reef shoes or aqua sandals are essential for pebble and rocky beaches.</li>
<li><strong>Environment:</strong> Respect the posidonia seagrass that sometimes washes up on shore. It is a protected ecosystem vital to the health of the Mediterranean.</li>
<li><strong>Blue Flag season:</strong> The main beaches hold Blue Flag status and have lifeguards from June to September.</li>
</ul>`,
      de: `<p>Die Region um Alcudia im Norden Mallorcas beherbergt einige der spektakulaersten Straende der Balearen. Von der scheinbar endlosen weissen Sandflaeche der Platja d'Alcudia bis hin zu versteckten Buchten, die nur zu Fuss oder per Boot erreichbar sind, gibt es fur jeden Reisetyp den passenden Strand. Dieser Guide fuehrt dich durch die besten Straende in Alcudia mit allen praktischen Informationen, die du brauchst.</p>

<h2>Platja d'Alcudia: der Hauptstrand</h2>
<p>Die Platja d'Alcudia ist der Vorzeigestrand des Nordens von Mallorca und einer der laengsten der Insel mit ueber 3,5 Kilometern feinem, goldenem Sand. Das Wasser ist kristallklar, flach und sandig, sodass du weit ins Meer hineinlaufen kannst, ohne den Boden zu verlieren. Das macht ihn zum absoluten Favoriten fuer Familien mit kleinen Kindern.</p>

<h3>Wie der Strand ist</h3>
<p>Feiner goldener Sand, ruhiges tuerkisfarbenes Wasser. Der Strand ist breit und bietet selbst in der Hochsaison reichlich Platz. Der noerdliche Abschnitt (nahe der Ciudad Blanca) ist ruhiger, waehrend der zentrale Bereich gegenueber der Strandpromenade am belebtesten ist, mit Strandbars, Restaurants und Geschaeften.</p>

<h3>Anfahrt</h3>
<p>Vom Zentrum von Port d'Alcudia ist der Strand weniger als fuenf Gehminuten entfernt, einfach eine der Strassen Richtung Meer hinunterlaufen. Mit dem Auto gibt es kostenloses Parken in den Strassen parallel zur Promenade und einen oeffentlichen Parkplatz am Hafen. In der Hochsaison solltest du vor 10:00 Uhr kommen, um problemlos einen Platz zu finden.</p>

<h3>Ausstattung</h3>
<p>Liegen- und Sonnenschirmverleih, Duschen, oeffentliche Toiletten, Strandbars, Rettungsschwimmer in der Hochsaison, Wassersportbereiche (Stand-Up-Paddling, Kajak, Bananenboot, Parasailing), barrierefreie Zugaenge an mehreren Stellen.</p>

<h3>Beste Besuchszeit</h3>
<p>Juni bis September zum Baden. Wochentags morgens ist es am ruhigsten. Bei Sonnenuntergang ist das Licht spektakulaer fuer Spaziergaenge am Wasser. Ausserhalb der Saison (April-Mai, Oktober) ist der Strand fast menschenleer und perfekt zum Spazierengehen oder Joggen.</p>

<h2>Platja de Muro: das Paradies aus weissem Sand</h2>
<p>Technisch gesehen in der Gemeinde Muro gelegen, aber eine direkte Fortsetzung des Strands von Alcudia nach Sueden, ist die Platja de Muro der Ort, wo der Sand noch weisser und feiner wird und das Wasser karibische Toene annimmt. Es ist einer der meistfotografierten Straende Mallorcas und taucht regelmaessig in den Rankings der besten Straende Europas auf.</p>

<h3>Wie der Strand ist</h3>
<p>Strahlend weisser, ultrafeiner Sand, flaches tuerkisfarbenes Wasser. Der Strand ist in Zonen unterteilt: Zone 1 liegt am naechsten zu Alcudia und hat die meisten Einrichtungen; die Zonen 2 und 3 gehoeren zum Naturpark s'Albufera und werden zunehmend ruhiger und wilder, mit geschuetzten Duenen und niedriger Vegetation.</p>

<h3>Anfahrt</h3>
<p>Mit dem Auto die Ma-12 Richtung Can Picafort nehmen. Es gibt mehrere ausgeschilderte Zufahrten mit Parkplaetzen (kostenpflichtig in Zone 1, kostenlos in den Zonen 2 und 3). Mit dem Fahrrad verbindet der Kuesten-Radweg Port d'Alcudia mit dem Strand von Muro in etwa 15 Minuten. Im Sommer gibt es auch einen lokalen Bus zwischen beiden Bereichen.</p>

<h3>Ausstattung</h3>
<p>Zone 1: Liegen, Sonnenschirme, Strandbars, Toiletten, Rettungsschwimmer. Zonen 2 und 3: sehr begrenzte oder keine Einrichtungen. Bringe dein eigenes Wasser und Essen mit, wenn du in die entfernteren Abschnitte gehst.</p>

<h3>Beste Besuchszeit</h3>
<p>Mai bis Oktober. Wochentags morgens, besonders in den Zonen 2 und 3, bieten ein fast privates Erlebnis. Wer Stimmung sucht, findet sie in Zone 1 im Juli und August.</p>

<h2>Cala Sant Vicenc: Postkartenbuchten</h2>
<p>Etwa 15 Autominuten von Alcudia entfernt, ist Cala Sant Vicenc eigentlich eine Gruppe von vier kleinen Buchten, eingerahmt von Bergen und Pinienwaelder: Cala Barques, Cala Clara, Cala Molins und Cala Carbo. Jede hat ihren eigenen Charakter, aber alle teilen kristallklares Wasser und eine atemberaubende natuerliche Kulisse.</p>

<h3>Die vier Buchten</h3>
<ul>
<li><strong>Cala Barques:</strong> Die groesste und am besten zugaengliche, mit Sand und Felsen, gut zum Schnorcheln an den Seiten. Strandbar und Liegenverleih vorhanden.</li>
<li><strong>Cala Clara:</strong> Klein und geschuetzt, ideal fuer Paare. Glasklares Wasser ueber felsigem Grund.</li>
<li><strong>Cala Molins:</strong> Die beliebteste, mit feinem Sand, einem Restaurant in erster Reihe und familienfreundlicher Atmosphaere. Parkplatz in der Naehe.</li>
<li><strong>Cala Carbo:</strong> Die wildeste und kleinste, ohne jegliche Einrichtungen. Zugang ueber einen kurzen Pfad durch die Pinien. Perfekt fuer absolute Ruhe.</li>
</ul>

<h3>Anfahrt</h3>
<p>Von Alcudia die Ma-2200 Richtung Pollenca nehmen, dann die Ma-2210 nach Cala Sant Vicenc. Die Fahrt dauert etwa 15 Minuten. Es gibt einen oeffentlichen Parkplatz (im Sommer begrenzt, frueh kommen). Kein direkter oeffentlicher Nahverkehr; Auto oder Fahrrad sind die besten Optionen.</p>

<h3>Beste Besuchszeit</h3>
<p>Juni bis September zum Baden. Im Sommer vor 10:00 Uhr kommen, um gut zu parken. Ausserhalb der Saison eignen sich die Klippen zwischen den Buchten hervorragend zum Wandern.</p>

<h2>Es Coll Baix: der wilde Strand</h2>
<p>Es Coll Baix ist einer der spektakulaersten und unberuehrtesten Straende Mallorcas. Eingekeilt zwischen ueber 200 Meter hohen Klippen und nur ueber einen anspruchsvollen Wanderweg oder per Boot erreichbar, ist er das ultimative Ziel fuer Naturliebhaber, die nicht scheuen, fuer einen einzigartigen Ort zu wandern.</p>

<h3>Wie der Strand ist</h3>
<p>Ein Strand aus Steinen und grobem Kies, umgeben von senkrechten Felswanden. Das Wasser hat ein tiefes, kristallklares Blau. Es gibt keinen natuerlichen Schatten und keinerlei Infrastruktur. Ein voellig unberuehrter Ort, an dem die Natur das Sagen hat.</p>

<h3>Zu Fuss hingelangen</h3>
<p>Der Wanderweg beginnt am Ende der Strasse zur Ermita de la Victoria (kleiner Parkplatz vorhanden). Der Abstieg dauert etwa 40 bis 50 Minuten ueber einen felsigen Pfad mit steilen Abschnitten. Du brauchst Wanderschuhe, reichlich Wasser und Sonnenschutz. Der Aufstieg zurueck ist anstrengend. Nicht geeignet fuer kleine Kinder oder Personen mit eingeschraenkter Mobilitaet.</p>

<h3>Per Boot hingelangen</h3>
<p>Vom Hafen Alcudia bieten mehrere Unternehmen Ausfluege mit Halt an Es Coll Baix an. Du kannst auch ein Boot ohne Fuehrerschein mieten und auf eigene Faust hinfahren. Diese Option ermoeglicht es dir, den Strand ohne den Aufwand der Wanderung zu geniessen.</p>

<h3>Beste Besuchszeit</h3>
<p>Mai bis September. Starte frueh, wenn du zu Fuss gehst (Aufbruch zwischen 8:00 und 9:00 Uhr, um der Hitze zu entgehen). Per Boot ist jeder Morgen gut. Vermeide sehr windige Tage, da das Meer in dieser Gegend unruhig werden kann.</p>

<h2>Platja des Coll Baix (Coll Baix Petit)</h2>
<p>Nicht zu verwechseln mit Es Coll Baix. Die Platja des Coll Baix, auch Coll Baix Petit genannt, ist ein kleiner Kiesstrand, der ueber einen anderen Wanderweg vom Victoria-Gebiet aus erreichbar ist. Er ist kleiner und weit weniger besucht als sein beruehmter Nachbar, was ihn zu einer interessanten Option fuer alle macht, die absolute Einsamkeit suchen.</p>

<h3>Anfahrt</h3>
<p>Der Zugang erfolgt ueber einen Pfad, der von der Victoria-Strasse abzweigt, bevor man den Parkplatz von Es Coll Baix erreicht. Der Abstieg ist kuerzer, aber ebenso felsig. Trage geeignetes Schuhwerk und nimm Wasser mit.</p>

<h3>Beste Besuchszeit</h3>
<p>Die gleichen Empfehlungen wie fuer Es Coll Baix gelten. Da der Strand weniger bekannt ist, triffst du selbst in der Hochsaison auf weniger Menschen.</p>

<h2>S'Illot: die kleine Felsinsel vor dem Strand</h2>
<p>S'Illot ist eine kleine Felsinsel direkt vor dem noerdlichen Ende der Platja d'Alcudia. Du kannst sie schwimmend oder watend erreichen (die Entfernung betraegt etwa 50 Meter). Es ist ein beliebter Schnorchelspot, denn die Felsen rund um die Insel beherbergen eine reiche Unterwasserwelt mit bunten Fischen, Seeigeln und Seesternen.</p>

<h3>Wie du hinkommst</h3>
<p>Vom noerdlichen Ende der Platja d'Alcudia gehe bis zu dem Punkt, wo der Sand in einen felsigen Bereich uebergeht. Von dort ist die Insel nur wenige Meter entfernt. Je nach Gezeit kannst du laufen oder schwimmen.</p>

<h3>Tipp</h3>
<p>Bringe eine Schnorchelmaske und Badeschuhe mit. Der Meeresboden zwischen Strand und Insel hat Abschnitte mit Felsen und Posidonia-Seegras. Die Gegend ist besonders schoen am Morgen, wenn das Wasser am ruhigsten ist und die Sicht am besten.</p>

<h2>Nach dem Strand: deine Plane in Alcudia</h2>
<p>Ein grossartiger Strandtag verdient einen grossartigen Abschluss. Hier sind unsere Empfehlungen, um den Tag abzurunden:</p>

<h3>Zum Mittag- oder Abendessen</h3>
<p>Nach Stunden in der Sonne verlangt der Koerper nach einer ordentlichen Mahlzeit. <a href="/hiru">Hiru Food &amp; Drinks</a> (Ctra. d'Arta 40, Port d'Alcudia) ist die ideale Wahl: Reisgerichte mit Fisch und Meeresfruechten vom lokalen Markt, gereiftes Fleisch vom Holzkohlegrill und mediterrane Fische. Ab 12:00 Uhr geoeffnet, perfekt sowohl fuer ein ausgiebiges Mittagessen als auch fuer ein entspanntes Abendessen nach dem Strand. Dienstags geschlossen.</p>

<h3>Fuer Drinks bei Sonnenuntergang</h3>
<p>Verlasse den Strand, dusche dich und geh zur <a href="/enjoy">Enjoy Terrace</a> (Av. Tucan 1, Port d'Alcudia). Signature-Cocktails, Premium-Shisha und ein Ambiente, das perfekt zum Sonnenuntergang in Alcudia passt. Taeglich ab 17:00 Uhr geoeffnet, ist es der Ort, an dem der Nachmittag ganz natuerlich in den Abend uebergeht.</p>

<h3>Fuer das Nachtleben</h3>
<p>Wenn es Donnerstag, Freitag oder Samstag ist, geht die Nacht im <a href="/outxide">Outxide Club</a> weiter, in der gleichen Av. Tucan 1. Erstklassige DJs, professioneller Sound und eine visuelle Produktion, die jede Nacht in ein einzigartiges Erlebnis verwandelt. Ab 23:00 Uhr geoeffnet, von Mai bis Oktober.</p>

<h2>Praktische Tipps fuer die Straende in Alcudia</h2>
<ul>
<li><strong>Sonnenschutz:</strong> Die Sonne auf Mallorca ist intensiv, besonders zwischen 12:00 und 16:00 Uhr. Verwende LSF 50 und trage nach jedem Bad erneut auf.</li>
<li><strong>Wasser und Essen:</strong> Ausgestattete Straende haben Strandbars, aber fuer wilde Buchten (Es Coll Baix, Cala Carbo) bringe deinen eigenen Proviant mit.</li>
<li><strong>Schuhwerk:</strong> Badeschuhe oder Aquasandalen sind unverzichtbar fuer Kies- und Felsenstraende.</li>
<li><strong>Umwelt:</strong> Respektiere das Posidonia-Seegras, das manchmal am Ufer angespuelt wird. Es ist ein geschuetztes Oekosystem, das fuer die Gesundheit des Mittelmeers lebenswichtig ist.</li>
<li><strong>Blaue-Flagge-Saison:</strong> Die Hauptstraende tragen das Blaue-Flagge-Siegel und haben von Juni bis September Rettungsschwimmer.</li>
</ul>`,
      fr: `<p>La region d'Alcudia, au nord de Majorque, abrite certaines des plages les plus spectaculaires des Baleares. De l'immense bande de sable blanc de la Platja d'Alcudia aux criques cachees accessibles uniquement a pied ou en bateau, il y a une plage pour chaque type de voyageur. Ce guide vous emmene a travers les meilleures plages d'Alcudia avec toutes les informations pratiques dont vous avez besoin.</p>

<h2>Platja d'Alcudia : la plage principale</h2>
<p>La Platja d'Alcudia est la plage phare du nord de Majorque et l'une des plus grandes de l'ile, avec plus de 3,5 kilometres de sable fin et dore. L'eau est cristalline, peu profonde et a fond sableux, ce qui permet de marcher loin dans la mer sans perdre pied. C'est la favorite des familles avec de jeunes enfants.</p>

<h3>A quoi elle ressemble</h3>
<p>Sable fin et dore, eaux turquoise calmes. La plage est large et offre suffisamment d'espace meme en haute saison. L'extremite nord (pres de la Ciudad Blanca) est plus calme, tandis que la section centrale face a la promenade est la plus animee avec ses bars de plage, restaurants et commerces.</p>

<h3>Comment y aller</h3>
<p>Depuis le centre de Port d'Alcudia, la plage est a moins de cinq minutes a pied en descendant n'importe quelle rue vers la mer. En voiture, parking gratuit dans les rues paralleles a la promenade et un parking public pres du port. En haute saison, arrivez avant 10h00 pour trouver une place facilement.</p>

<h3>Equipements</h3>
<p>Location de transats et parasols, douches, toilettes publiques, bars de plage, maitres-nageurs en haute saison, zones de sports nautiques (paddle, kayak, bouee tractee, parasailing), acces handicapes a plusieurs endroits.</p>

<h3>Meilleur moment pour la visiter</h3>
<p>De juin a septembre pour la baignade. Les matinees en semaine sont les plus calmes. Au coucher du soleil, la lumiere est spectaculaire pour les promenades au bord de l'eau. Hors saison (avril-mai, octobre), la plage est pratiquement deserte et parfaite pour marcher ou courir.</p>

<h2>Platja de Muro : le paradis de sable blanc</h2>
<p>Techniquement dans la commune de Muro mais prolongement direct de la plage d'Alcudia vers le sud, la Platja de Muro est l'endroit ou le sable devient encore plus blanc et fin et ou l'eau prend des teintes caribeennes. C'est l'une des plages les plus photographiees de Majorque, regulierement classee parmi les meilleures plages d'Europe.</p>

<h3>A quoi elle ressemble</h3>
<p>Sable blanc eclatant et ultrafin, eau turquoise peu profonde. La plage est divisee en secteurs : la zone 1 est la plus proche d'Alcudia et la plus equipee ; les zones 2 et 3 font partie du parc naturel de s'Albufera et deviennent progressivement plus calmes et sauvages, avec des dunes protegees et une vegetation basse.</p>

<h3>Comment y aller</h3>
<p>En voiture, prendre la Ma-12 direction Can Picafort. Plusieurs acces flechees disposent de parkings (payant en zone 1, gratuit en zones 2 et 3). A velo, la voie verte cotiere relie Port d'Alcudia a la plage de Muro en environ 15 minutes. Un bus local dessert egalement les deux zones en ete.</p>

<h3>Equipements</h3>
<p>Zone 1 : transats, parasols, bars de plage, toilettes, maitres-nageurs. Zones 2 et 3 : equipements tres limites ou inexistants. Apportez votre propre eau et nourriture si vous allez dans les sections eloignees.</p>

<h3>Meilleur moment pour la visiter</h3>
<p>De mai a octobre. Les matinees en semaine, surtout en zones 2 et 3, offrent une experience presque privee. Pour l'ambiance, la zone 1 en juillet-aout est la plus animee.</p>

<h2>Cala Sant Vicenc : les criques de carte postale</h2>
<p>A environ 15 minutes en voiture d'Alcudia, Cala Sant Vicenc est en realite un ensemble de quatre petites criques encadrees par des montagnes et des pinedes : Cala Barques, Cala Clara, Cala Molins et Cala Carbo. Chacune a son propre caractere, mais toutes partagent des eaux cristallines et un cadre naturel epoustouflant.</p>

<h3>Les quatre criques</h3>
<ul>
<li><strong>Cala Barques :</strong> la plus grande et la plus accessible, melange de sable et de roche, bon snorkeling sur les cotes. Bar de plage et location de transats disponibles.</li>
<li><strong>Cala Clara :</strong> petite et abritee, ideale pour les couples. Eau transparente sur fond rocheux.</li>
<li><strong>Cala Molins :</strong> la plus populaire, avec du sable fin, un restaurant en premiere ligne et une ambiance familiale. Parking a proximite.</li>
<li><strong>Cala Carbo :</strong> la plus sauvage et la plus petite, sans aucun equipement. Acces par un court sentier a travers les pins. Parfaite pour une tranquillite absolue.</li>
</ul>

<h3>Comment y aller</h3>
<p>Depuis Alcudia, prendre la Ma-2200 vers Pollenca puis la Ma-2210 jusqu'a Cala Sant Vicenc. Le trajet dure environ 15 minutes. Parking public (limite en ete, arrivez tot). Pas de transport en commun direct ; la voiture ou le velo sont les meilleures options.</p>

<h3>Meilleur moment pour la visiter</h3>
<p>De juin a septembre pour la baignade. Arrivez avant 10h00 en ete pour le parking. Hors saison, les falaises entre les criques sont ideales pour la randonnee.</p>

<h2>Es Coll Baix : la plage sauvage</h2>
<p>Es Coll Baix est l'une des plages les plus spectaculaires et les plus preservees de Majorque. Encaissee entre des falaises de plus de 200 metres de haut et accessible uniquement par un sentier exigeant a pied ou en bateau, c'est la destination ultime pour les amoureux de la nature prets a marcher pour trouver un endroit vraiment unique.</p>

<h3>A quoi elle ressemble</h3>
<p>Une plage de galets et de gravier grossier entouree de parois rocheuses verticales. L'eau est d'un bleu profond et cristallin. Il n'y a pas d'ombre naturelle ni aucun equipement. Un lieu completement vierge ou la nature est reine.</p>

<h3>Y aller a pied</h3>
<p>Le sentier part du bout de la route menant a l'Ermita de la Victoria (petit parking disponible). La descente prend environ 40 a 50 minutes sur un chemin rocheux avec des passages raides. Il vous faut des chaussures de randonnee, beaucoup d'eau et une protection solaire. La remontee est eprouvante. Deconseille aux jeunes enfants et aux personnes a mobilite reduite.</p>

<h3>Y aller en bateau</h3>
<p>Depuis le port d'Alcudia, plusieurs compagnies proposent des excursions avec arret a Es Coll Baix. Vous pouvez aussi louer un bateau sans permis et y aller par vos propres moyens. Cette option permet de profiter de la plage sans l'effort de la randonnee.</p>

<h3>Meilleur moment pour la visiter</h3>
<p>De mai a septembre. Partez tot si vous y allez a pied (depart entre 8h00 et 9h00 pour eviter la chaleur). En bateau, toute la matinee convient. Evitez les jours de grand vent, car la mer peut etre agitee dans ce secteur.</p>

<h2>Platja des Coll Baix (Coll Baix Petit)</h2>
<p>A ne pas confondre avec Es Coll Baix. La Platja des Coll Baix, aussi appelee Coll Baix Petit, est une petite plage de galets accessible par un sentier different depuis la zone de la Victoria. Plus petite et bien moins frequentee que sa celebre voisine, c'est une option interessante pour ceux qui recherchent une solitude absolue.</p>

<h3>Comment y aller</h3>
<p>L'acces se fait par un sentier qui bifurque de la route de la Victoria avant le parking d'Es Coll Baix. La descente est plus courte mais tout aussi rocheuse. Portez des chaussures adaptees et emportez de l'eau.</p>

<h3>Meilleur moment pour la visiter</h3>
<p>Les memes recommandations que pour Es Coll Baix. Etant moins connue, vous y croiserez moins de monde meme en pleine saison.</p>

<h2>S'Illot : l'ilot face a la plage</h2>
<p>S'Illot est un petit ilot rocheux situe juste en face de l'extremite nord de la Platja d'Alcudia. On peut l'atteindre a la nage ou en marchant dans l'eau (la distance est d'environ 50 metres). C'est un spot de snorkeling populaire, car les rochers autour de l'ilot abritent une riche vie marine avec des poissons colores, des oursins et des etoiles de mer.</p>

<h3>Comment y aller</h3>
<p>Depuis l'extremite nord de la Platja d'Alcudia, marchez jusqu'au point ou le sable laisse place a une zone rocheuse. De la, l'ilot n'est qu'a quelques metres. Vous pouvez y aller a pied ou a la nage selon la maree.</p>

<h3>Conseil</h3>
<p>Apportez un masque de snorkeling et des chaussures aquatiques. Le fond entre la plage et l'ilot presente des zones de roche et de posidonie. L'endroit est particulierement beau le matin, quand l'eau est la plus calme et la visibilite maximale.</p>

<h2>Apres la plage : vos plans a Alcudia</h2>
<p>Une belle journee de plage merite une belle fin. Voici nos recommandations pour terminer la journee en beaute :</p>

<h3>Pour dejeuner ou diner</h3>
<p>Apres des heures au soleil, le corps reclame un bon repas. <a href="/hiru">Hiru Food &amp; Drinks</a> (Ctra. d'Arta 40, Port d'Alcudia) est le choix ideal : plats de riz prepares avec le poisson et les fruits de mer du marche local, viandes maturees au grill et poissons mediterraneens. Ouvert des 12h00, parfait aussi bien pour un long dejeuner que pour un diner decontracte apres la plage. Ferme le mardi.</p>

<h3>Pour un verre au coucher du soleil</h3>
<p>Quittez la plage, prenez une douche et dirigez-vous vers <a href="/enjoy">Enjoy Terrace</a> (Av. Tucan 1, Port d'Alcudia). Cocktails signatures, chicha premium et une ambiance qui s'accorde parfaitement avec le coucher du soleil d'Alcudia. Ouvert tous les jours a partir de 17h00, c'est l'endroit ou l'apres-midi se transforme naturellement en soiree.</p>

<h3>Pour sortir le soir</h3>
<p>Si c'est jeudi, vendredi ou samedi, la nuit continue a l'<a href="/outxide">Outxide Club</a>, a la meme Av. Tucan 1. DJs de premier plan, son professionnel et production visuelle qui transforment chaque nuit en une experience unique. Ouvert a partir de 23h00, de mai a octobre.</p>

<h2>Conseils pratiques pour les plages d'Alcudia</h2>
<ul>
<li><strong>Protection solaire :</strong> le soleil de Majorque est intense, surtout entre 12h00 et 16h00. Utilisez un SPF 50 et reappliquez apres chaque bain.</li>
<li><strong>Eau et nourriture :</strong> les plages equipees ont des bars de plage, mais pour les criques sauvages (Es Coll Baix, Cala Carbo), apportez vos propres provisions.</li>
<li><strong>Chaussures :</strong> des chaussures aquatiques sont indispensables pour les plages de galets et de rochers.</li>
<li><strong>Environnement :</strong> respectez la posidonie qui s'echoue parfois sur le rivage. C'est un ecosysteme protege vital pour la sante de la Mediterranee.</li>
<li><strong>Saison Pavillon Bleu :</strong> les plages principales arborent le Pavillon Bleu et disposent de maitres-nageurs de juin a septembre.</li>
</ul>`,
      it: `<p>La zona di Alcudia, nel nord di Maiorca, ospita alcune delle spiagge piu' spettacolari delle Isole Baleari. Dall'interminabile striscia di sabbia bianca della Platja d'Alcudia alle calette nascoste raggiungibili solo a piedi o in barca, c'e' una spiaggia per ogni tipo di viaggiatore. Questa guida ti accompagna attraverso le migliori spiagge di Alcudia con tutte le informazioni pratiche di cui hai bisogno.</p>

<h2>Platja d'Alcudia: la spiaggia principale</h2>
<p>La Platja d'Alcudia e' la spiaggia di punta del nord di Maiorca e una delle piu' grandi dell'isola, con oltre 3,5 chilometri di sabbia fine e dorata. L'acqua e' cristallina, bassa e con fondale sabbioso, permettendo di camminare a lungo in mare senza perdere piede. Questo la rende la preferita delle famiglie con bambini piccoli.</p>

<h3>Com'e'</h3>
<p>Sabbia fine e dorata, acque turchesi calme. La spiaggia e' ampia e offre spazio a sufficienza anche in alta stagione. Il tratto nord (vicino alla Ciudad Blanca) e' piu' tranquillo, mentre la sezione centrale di fronte al lungomare e' la piu' vivace con chiringuitos, ristoranti e negozi.</p>

<h3>Come arrivare</h3>
<p>Dal centro di Port d'Alcudia la spiaggia e' a meno di cinque minuti a piedi scendendo per una qualsiasi delle strade verso il mare. In auto, parcheggio gratuito nelle strade parallele al lungomare e un parcheggio pubblico accanto al porto. In alta stagione, arriva prima delle 10:00 per trovare posto facilmente.</p>

<h3>Servizi</h3>
<p>Noleggio lettini e ombrelloni, docce, bagni pubblici, chiringuitos, bagnini in alta stagione, zone sport acquatici (paddle surf, kayak, banana boat, parasailing), accessi per disabili in diversi punti.</p>

<h3>Momento migliore per visitarla</h3>
<p>Da giugno a settembre per fare il bagno. Le mattine infrasettimanali sono le piu' tranquille. Al tramonto, la luce e' spettacolare per passeggiate lungo la riva. Fuori stagione (aprile-maggio, ottobre) la spiaggia e' praticamente deserta e perfetta per camminare o correre.</p>

<h2>Platja de Muro: il paradiso di sabbia bianca</h2>
<p>Tecnicamente nel comune di Muro ma proseguimento diretto della spiaggia di Alcudia verso sud, la Platja de Muro e' il punto dove la sabbia diventa ancora piu' bianca e fine e l'acqua assume tonalita' caraibiche. E' una delle spiagge piu' fotografate di Maiorca e compare regolarmente nelle classifiche delle migliori spiagge d'Europa.</p>

<h3>Com'e'</h3>
<p>Sabbia bianca splendente e ultrafine, acqua turchese poco profonda. La spiaggia e' divisa in settori: la zona 1 e' la piu' vicina ad Alcudia e la piu' attrezzata; le zone 2 e 3 rientrano nel parco naturale di s'Albufera e diventano progressivamente piu' tranquille e selvagge, con dune protette e vegetazione bassa.</p>

<h3>Come arrivare</h3>
<p>In auto, prendere la Ma-12 direzione Can Picafort. Ci sono diversi accessi segnalati con parcheggio (a pagamento in zona 1, gratuito nelle zone 2 e 3). In bicicletta, la ciclabile costiera collega Port d'Alcudia alla spiaggia di Muro in circa 15 minuti. In estate c'e' anche un autobus locale che collega le due zone.</p>

<h3>Servizi</h3>
<p>Zona 1: lettini, ombrelloni, chiringuitos, bagni, bagnini. Zone 2 e 3: servizi molto limitati o inesistenti. Porta acqua e cibo se vai nelle sezioni piu' lontane.</p>

<h3>Momento migliore per visitarla</h3>
<p>Da maggio a ottobre. Le mattine infrasettimanali, specialmente nelle zone 2 e 3, offrono un'esperienza quasi privata. Per l'atmosfera, la zona 1 in luglio e agosto e' la piu' vivace.</p>

<h2>Cala Sant Vicenc: le calette da cartolina</h2>
<p>A circa 15 minuti d'auto da Alcudia, Cala Sant Vicenc e' in realta' un gruppo di quattro piccole calette incorniciate da montagne e pinete: Cala Barques, Cala Clara, Cala Molins e Cala Carbo. Ognuna ha il suo carattere, ma tutte condividono acque cristalline e uno scenario naturale mozzafiato.</p>

<h3>Le quattro calette</h3>
<ul>
<li><strong>Cala Barques:</strong> la piu' grande e accessibile, mix di sabbia e roccia, buono snorkeling ai lati. Chiringuito e noleggio lettini disponibili.</li>
<li><strong>Cala Clara:</strong> piccola e riparata, ideale per le coppie. Acqua trasparente su fondale roccioso.</li>
<li><strong>Cala Molins:</strong> la piu' popolare, con sabbia fine, ristorante in prima fila e atmosfera familiare. Parcheggio nelle vicinanze.</li>
<li><strong>Cala Carbo:</strong> la piu' selvaggia e piccola, senza alcun servizio. Accesso tramite un breve sentiero tra i pini. Perfetta per la tranquillita' assoluta.</li>
</ul>

<h3>Come arrivare</h3>
<p>Da Alcudia, prendere la Ma-2200 verso Pollenca e poi la Ma-2210 fino a Cala Sant Vicenc. Il tragitto dura circa 15 minuti. Parcheggio pubblico (limitato in estate, arriva presto). Nessun trasporto pubblico diretto; auto o bicicletta sono le opzioni migliori.</p>

<h3>Momento migliore per visitarla</h3>
<p>Da giugno a settembre per il bagno. In estate, arriva prima delle 10:00 per parcheggiare bene. Fuori stagione, le scogliere tra le calette sono ottime per il trekking.</p>

<h2>Es Coll Baix: la spiaggia selvaggia</h2>
<p>Es Coll Baix e' una delle spiagge piu' spettacolari e incontaminate di Maiorca. Incastonata tra scogliere di oltre 200 metri d'altezza e raggiungibile solo tramite un sentiero impegnativo a piedi o in barca, e' la destinazione definitiva per gli amanti della natura disposti a camminare per trovare un luogo davvero unico.</p>

<h3>Com'e'</h3>
<p>Spiaggia di ciottoli e ghiaia grossa, circondata da pareti rocciose verticali. L'acqua e' di un blu profondo e cristallino. Non c'e' ombra naturale ne' alcun servizio. Un luogo completamente incontaminato dove la natura comanda.</p>

<h3>Arrivarci a piedi</h3>
<p>Il sentiero parte dalla fine della strada per l'Ermita de la Victoria (piccolo parcheggio disponibile). La discesa richiede circa 40-50 minuti su un percorso roccioso con tratti ripidi. Servono scarpe da trekking, acqua abbondante e protezione solare. La risalita e' impegnativa. Non adatta a bambini piccoli o persone con mobilita' ridotta.</p>

<h3>Arrivarci in barca</h3>
<p>Dal porto di Alcudia, diverse compagnie offrono escursioni con sosta a Es Coll Baix. Puoi anche noleggiare una barca senza patente e andarci per conto tuo. Questa opzione ti permette di goderti la spiaggia senza la fatica dell'escursione.</p>

<h3>Momento migliore per visitarla</h3>
<p>Da maggio a settembre. Parti presto se vai a piedi (partenza tra le 8:00 e le 9:00 per evitare il caldo). In barca, qualsiasi orario della mattina va bene. Evita le giornate molto ventose, perche' il mare puo' essere agitato in questa zona.</p>

<h2>Platja des Coll Baix (Coll Baix Petit)</h2>
<p>Da non confondere con Es Coll Baix. La Platja des Coll Baix, chiamata anche Coll Baix Petit, e' una piccola spiaggia di ciottoli raggiungibile tramite un sentiero diverso dalla zona della Victoria. Piu' piccola e molto meno visitata della sua celebre vicina, e' un'opzione interessante per chi cerca solitudine assoluta.</p>

<h3>Come arrivare</h3>
<p>L'accesso avviene tramite un sentiero che si stacca dalla strada della Victoria prima del parcheggio di Es Coll Baix. La discesa e' piu' breve ma altrettanto rocciosa. Indossa scarpe adeguate e porta acqua.</p>

<h3>Momento migliore per visitarla</h3>
<p>Le stesse raccomandazioni di Es Coll Baix. Essendo meno conosciuta, troverai meno persone anche in alta stagione.</p>

<h2>S'Illot: l'isolotto di fronte alla spiaggia</h2>
<p>S'Illot e' un piccolo isolotto roccioso situato appena al largo dell'estremita' nord della Platja d'Alcudia. Si puo' raggiungere nuotando o camminando nell'acqua (la distanza e' di circa 50 metri). E' un punto popolare per lo snorkeling, poiche' le rocce intorno all'isolotto ospitano una ricca vita marina con pesci colorati, ricci di mare e stelle marine.</p>

<h3>Come arrivarci</h3>
<p>Dall'estremita' nord della Platja d'Alcudia, cammina fino al punto in cui la sabbia lascia posto a una zona rocciosa. Da li', l'isolotto e' a pochi metri. Puoi camminare o nuotare a seconda della marea.</p>

<h3>Consiglio</h3>
<p>Porta maschera da snorkeling e scarpette da scoglio. Il fondale tra la spiaggia e l'isolotto presenta tratti di roccia e posidonia. La zona e' particolarmente bella al mattino, quando l'acqua e' piu' calma e la visibilita' e' massima.</p>

<h2>Dopo la spiaggia: i tuoi piani ad Alcudia</h2>
<p>Una grande giornata di mare merita un gran finale. Ecco i nostri consigli per completare la giornata:</p>

<h3>Per pranzo o cena</h3>
<p>Dopo ore al sole, il corpo chiede un pasto come si deve. <a href="/hiru">Hiru Food &amp; Drinks</a> (Ctra. d'Arta 40, Port d'Alcudia) e' la scelta ideale: risotti preparati con pesce e frutti di mare del mercato locale, carni frollate alla brace e pesci mediterranei. Aperto dalle 12:00, perfetto sia per un pranzo lungo sia per una cena rilassata dopo la spiaggia. Chiuso il martedi'.</p>

<h3>Per un drink al tramonto</h3>
<p>Esci dalla spiaggia, fatti una doccia e dirigiti all'<a href="/enjoy">Enjoy Terrace</a> (Av. Tucan 1, Port d'Alcudia). Cocktail d'autore, shisha premium e un'atmosfera che si sposa perfettamente con il tramonto di Alcudia. Aperto tutti i giorni dalle 17:00, e' il luogo dove il pomeriggio si trasforma naturalmente in serata.</p>

<h3>Per uscire la sera</h3>
<p>Se e' giovedi', venerdi' o sabato, la notte prosegue all'<a href="/outxide">Outxide Club</a>, nella stessa Av. Tucan 1. DJ di primo livello, audio professionale e produzione visiva che trasformano ogni serata in un'esperienza unica. Aperto dalle 23:00, da maggio a ottobre.</p>

<h2>Consigli pratici per le spiagge di Alcudia</h2>
<ul>
<li><strong>Protezione solare:</strong> il sole di Maiorca e' intenso, specialmente tra le 12:00 e le 16:00. Usa SPF 50 e riapplica dopo ogni bagno.</li>
<li><strong>Acqua e cibo:</strong> le spiagge attrezzate hanno chiringuitos, ma per le calette selvagge (Es Coll Baix, Cala Carbo) porta le tue provviste.</li>
<li><strong>Calzature:</strong> scarpette da scoglio o sandali acquatici sono indispensabili per le spiagge di ciottoli e roccia.</li>
<li><strong>Ambiente:</strong> rispetta la posidonia che a volte si accumula sulla riva. E' un ecosistema protetto vitale per la salute del Mediterraneo.</li>
<li><strong>Stagione Bandiera Blu:</strong> le spiagge principali hanno la Bandiera Blu e bagnini da giugno a settembre.</li>
</ul>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-26",
    image: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
    tags: ["alcudia", "mallorca", "activities", "guide"],
    venue: "general",
    readingTime: 10,
  },
  {
    slug: "guia-vida-nocturna-alcudia",
    title: {
      es: "Guía Completa de Vida Nocturna en Alcúdia 2026",
      en: "Complete Guide to Nightlife in Alcudia 2026",
      de: "Kompletter Guide zum Nachtleben in Alcudia 2026",
      fr: "Guide Complet de la Vie Nocturne a Alcudia 2026",
      it: "Guida Completa alla Vita Notturna di Alcudia 2026",
    },
    excerpt: {
      es: "Todo lo que necesitas saber para disfrutar la noche en Alcúdia: desde terrazas con cócteles hasta clubs con los mejores DJs. Horarios, consejos y cómo moverte.",
      en: "Everything you need to know to enjoy nightlife in Alcudia: from cocktail terraces to clubs with the best DJs. Hours, tips and how to get around.",
      de: "Alles, was du wissen musst, um die Nacht in Alcudia zu erleben: von Cocktailterrassen bis zu Clubs mit den besten DJs. Öffnungszeiten, Tipps und wie du dich fortbewegst.",
      fr: "Tout ce que vous devez savoir pour profiter de la nuit a Alcudia : des terrasses a cocktails aux clubs avec les meilleurs DJs. Horaires, conseils et comment se deplacer.",
      it: "Tutto quello che devi sapere per goderti la notte ad Alcudia: dalle terrazze con cocktail ai club con i migliori DJ. Orari, consigli e come muoverti.",
    },
    content: {
      es: `<p>Port d'Alcúdia se ha consolidado como el destino de vida nocturna más atractivo del norte de Mallorca. Ubicado junto a 7 km de playa de arena blanca, este rincón de la isla ofrece un ecosistema de ocio nocturno que va de las terrazas de cocktails al mejor club de la zona. Si planeas una noche en Alcúdia, esta guía te cuenta todo lo que necesitas saber.</p>

<h2>Dónde empieza la noche: Enjoy Terrace</h2>
<p>Toda buena noche en Alcúdia comienza en una terraza. <a href="/enjoy">Enjoy Terrace</a>, en Av. Tucán 1, Port d'Alcúdia, abre cada día a las 17:00 y es el punto de inicio perfecto. La terraza combina cócteles de autor con shisha premium en un ambiente sofisticado. Los bartenders trabajan con ingredientes locales y técnicas modernas para crear combinaciones que marcan la diferencia. Con una valoración de 4.5/5 en Google (318 opiniones), es un referente en la zona.</p>

<h3>Qué pedir en Enjoy Terrace</h3>
<ul>
<li><strong>Cócteles signature:</strong> creaciones exclusivas con ingredientes mediterráneos</li>
<li><strong>Shisha premium:</strong> amplia variedad de sabores, desde frutales clásicos hasta mezclas especiadas</li>
<li><strong>Gin tonics artesanales:</strong> selección curada de ginebras y tónicas premium</li>
</ul>

<h2>La hora del club: Outxide Club</h2>
<p>A partir de las 23:00 de jueves a sábado, <a href="/outxide">Outxide Club</a> abre sus puertas en la misma Av. Tucán 1. Es la referencia absoluta del clubbing en el norte de Mallorca: sonido profesional de primer nivel, DJs nacionales e internacionales, y una producción visual que transforma cada noche en un espectáculo. La temporada se extiende de mayo a octubre, con eventos temáticos y fiestas especiales cada semana.</p>

<h3>Comprar entradas</h3>
<p>La forma más cómoda de conseguir tu entrada es a través de <strong>FourVenues</strong>, la plataforma oficial de venta de entradas del club. Comprar online te garantiza acceso y, en muchos eventos, un precio reducido respecto a taquilla. También puedes adquirir tu entrada en la puerta la misma noche del evento.</p>

<h3>Código de vestimenta</h3>
<p>Outxide Club aplica una política de vestimenta <strong>smart casual</strong>. No se permite ropa de playa, chanclas ni camisetas de tirantes. Un look cuidado pero relajado es la mejor elección.</p>

<h2>Consejos prácticos para tu noche</h2>

<h3>Cómo moverte</h3>
<p>La zona de ocio de Port d'Alcúdia es compacta y se recorre fácilmente a pie. Enjoy Terrace y Outxide Club están literalmente uno al lado del otro, así que la transición entre terraza y club es inmediata. Si te alojas en hoteles más alejados, hay servicio de taxi disponible hasta primeras horas de la mañana.</p>

<h3>Precios orientativos</h3>
<ul>
<li>Cóctel en terraza: 10-15 EUR</li>
<li>Copa en bar: 8-12 EUR</li>
<li>Entrada a club: 15-25 EUR (algunas noches incluyen consumición)</li>
<li>Mesa VIP: consultar según evento</li>
</ul>

<h2>Por qué Alcúdia es diferente</h2>
<p>Lo que hace única la noche en Port d'Alcúdia es la proximidad de todo. Puedes empezar con cócteles al atardecer, cenar en un restaurante a la brasa como <a href="/hiru">Hiru Food &amp; Drinks</a>, volver a la terraza para una shisha y terminar bailando en el club. Todo en la misma zona, a pocos pasos. Eso, combinado con la brisa del Mediterráneo, el ambiente internacional y una oferta de calidad, convierte a Alcúdia en un destino nocturno que no tiene nada que envidiar al sur de la isla.</p>

<h2>Sigue leyendo</h2>
<p>Conoce a fondo <a href="/blog/outxide-club-discoteca-alcudia-mallorca">Outxide Club: la discoteca de referencia en Alcudia</a>, descubre todo sobre <a href="/blog/enjoy-terrace-cocktails-shisha-port-alcudia">Enjoy Terrace: cocteles y shisha en Port d'Alcudia</a> y consulta los <a href="/blog/fiestas-eventos-verano-alcudia-2026">mejores eventos del verano 2026</a>.</p>`,
      en: `<p>Port d'Alcudia has established itself as the most attractive nightlife destination in northern Mallorca. Located alongside 7 km of white sand beach, this corner of the island offers a nightlife ecosystem that spans cocktail terraces to the best club in the area. If you are planning a night out in Alcudia, this guide covers everything you need to know.</p>

<h2>Where the night begins: Enjoy Terrace</h2>
<p>Every great night in Alcudia starts on a terrace. <a href="/enjoy">Enjoy Terrace</a>, at Av. Tucan 1, Port d'Alcudia, opens daily from 17:00 and is the perfect starting point. The terrace pairs signature cocktails with premium shisha in a sophisticated setting. The bartenders work with local ingredients and modern techniques to craft combinations that stand out. Rated 4.5/5 on Google (318 reviews), it is a benchmark in the area.</p>

<h3>What to order at Enjoy Terrace</h3>
<ul>
<li><strong>Signature cocktails:</strong> exclusive creations with Mediterranean ingredients</li>
<li><strong>Premium shisha:</strong> wide variety of flavours, from classic fruity to spiced blends</li>
<li><strong>Artisan gin and tonics:</strong> curated selection of premium gins and tonics</li>
</ul>

<h2>Club time: Outxide Club</h2>
<p>From 23:00, Thursday to Saturday, <a href="/outxide">Outxide Club</a> opens its doors at the same Av. Tucan 1. It is the definitive clubbing reference in northern Mallorca: top-tier professional sound, national and international DJs, and visual production that turns every night into a show. The season runs from May to October, with themed events and special parties every week.</p>

<h3>Buying tickets</h3>
<p>The most convenient way to get your ticket is through <strong>FourVenues</strong>, the club's official ticketing platform. Buying online guarantees entry and often offers a reduced price compared to the door. You can also purchase your ticket at the venue on the night of the event.</p>

<h3>Dress code</h3>
<p>Outxide Club enforces a <strong>smart casual</strong> dress code. Beachwear, flip-flops and vest tops are not permitted. A polished but relaxed look is the best choice.</p>

<h2>Practical tips for your night out</h2>

<h3>Getting around</h3>
<p>Port d'Alcudia's nightlife zone is compact and easily walkable. Enjoy Terrace and Outxide Club are literally next to each other, so the transition from terrace to club is seamless. If you are staying at hotels further out, taxi services run into the early morning hours.</p>

<h3>Approximate prices</h3>
<ul>
<li>Cocktail on a terrace: 10-15 EUR</li>
<li>Drink at a bar: 8-12 EUR</li>
<li>Club entry: 15-25 EUR (some nights include a drink)</li>
<li>VIP table: check availability per event</li>
</ul>

<h2>Why Alcudia is different</h2>
<p>What makes Port d'Alcudia's nightlife unique is the proximity of everything. You can start with sunset cocktails, dine at a charcoal grill restaurant like <a href="/hiru">Hiru Food &amp; Drinks</a>, return to the terrace for shisha and end up dancing at the club. All in the same area, just steps apart. That, combined with the Mediterranean breeze, the international atmosphere and a quality offering, makes Alcudia a nightlife destination that rivals the south of the island.</p>`,
      de: `<p>Port d'Alcudia hat sich als das attraktivste Nachtleben-Ziel im Norden Mallorcas etabliert. Direkt an 7 km weißem Sandstrand gelegen, bietet diese Ecke der Insel ein Nachtleben-Ökosystem, das von Cocktailterrassen bis zum besten Club der Gegend reicht. Wenn du eine Nacht in Alcudia planst, findest du hier alles, was du wissen musst.</p>

<h2>Wo die Nacht beginnt: Enjoy Terrace</h2>
<p>Jede gute Nacht in Alcudia beginnt auf einer Terrasse. <a href="/enjoy">Enjoy Terrace</a> in der Av. Tucán 1, Port d'Alcudia, öffnet täglich um 17:00 Uhr und ist der perfekte Startpunkt. Die Terrasse verbindet Signature-Cocktails mit Premium-Shisha in einem anspruchsvollen Ambiente. Die Bartender arbeiten mit lokalen Zutaten und modernen Techniken, um Kreationen zu entwickeln, die den Unterschied ausmachen. Mit einer Bewertung von 4.5/5 bei Google (318 Bewertungen) ist sie eine feste Größe in der Gegend.</p>

<h3>Was du in der Enjoy Terrace bestellen solltest</h3>
<ul>
<li><strong>Signature-Cocktails:</strong> exklusive Kreationen mit mediterranen Zutaten</li>
<li><strong>Premium-Shisha:</strong> große Auswahl an Geschmacksrichtungen, von klassisch-fruchtig bis zu würzigen Mischungen</li>
<li><strong>Handgemachte Gin Tonics:</strong> kuratierte Auswahl an Premium-Gins und Tonics</li>
</ul>

<h2>Zeit für den Club: Outxide Club</h2>
<p>Ab 23:00 Uhr von Donnerstag bis Samstag öffnet <a href="/outxide">Outxide Club</a> seine Türen in der gleichen Av. Tucán 1. Er ist die absolute Clubbing-Referenz im Norden Mallorcas: erstklassiger professioneller Sound, nationale und internationale DJs und eine visuelle Produktion, die jede Nacht in eine Show verwandelt. Die Saison läuft von Mai bis Oktober, mit Themenevents und Spezialpartys jede Woche.</p>

<h3>Tickets kaufen</h3>
<p>Der bequemste Weg, dein Ticket zu bekommen, ist über <strong>FourVenues</strong>, die offizielle Ticketplattform des Clubs. Online kaufen garantiert dir den Eintritt und bietet bei vielen Events einen reduzierten Preis gegenüber der Abendkasse. Du kannst dein Ticket auch an der Tür am Abend des Events kaufen.</p>

<h3>Dresscode</h3>
<p>Im Outxide Club gilt eine <strong>smart casual</strong> Kleiderordnung. Strandkleidung, Flip-Flops und Tanktops sind nicht erlaubt. Ein gepflegter, aber entspannter Look ist die beste Wahl.</p>

<h2>Praktische Tipps für deine Nacht</h2>

<h3>Wie du dich fortbewegst</h3>
<p>Das Ausgehviertel in Port d'Alcudia ist kompakt und gut zu Fuß erreichbar. Enjoy Terrace und Outxide Club liegen buchstäblich nebeneinander, sodass der Übergang von der Terrasse zum Club nahtlos ist. Wenn du in weiter entfernten Hotels übernachtest, stehen Taxis bis in die frühen Morgenstunden zur Verfügung.</p>

<h3>Ungefähre Preise</h3>
<ul>
<li>Cocktail auf der Terrasse: 10-15 EUR</li>
<li>Drink an der Bar: 8-12 EUR</li>
<li>Clubeintritt: 15-25 EUR (an manchen Abenden inklusive Getränk)</li>
<li>VIP-Tisch: auf Anfrage je nach Event</li>
</ul>

<h2>Warum Alcudia anders ist</h2>
<p>Was die Nacht in Port d'Alcudia einzigartig macht, ist die Nähe von allem. Du kannst mit Cocktails bei Sonnenuntergang starten, in einem Grillrestaurant wie <a href="/hiru">Hiru Food &amp; Drinks</a> essen, zurück auf die Terrasse für eine Shisha und den Abend tanzend im Club ausklingen lassen. Alles in der gleichen Gegend, nur wenige Schritte voneinander entfernt. Das, kombiniert mit der Mittelmeerbrise, der internationalen Atmosphäre und einem hochwertigen Angebot, macht Alcudia zu einem Nachtleben-Ziel, das dem Süden der Insel in nichts nachsteht.</p>`,
      fr: `<p>Port d'Alcudia s'est impose comme la destination de vie nocturne la plus attractive du nord de Majorque. Situe le long de 7 km de plage de sable blanc, ce coin de l'ile offre un ecosysteme de loisirs nocturnes allant des terrasses a cocktails au meilleur club de la region. Si vous prevoyez une sortie nocturne a Alcudia, ce guide vous dit tout ce que vous devez savoir.</p>

<h2>Ou commence la nuit : Enjoy Terrace</h2>
<p>Toute bonne soiree a Alcudia commence sur une terrasse. <a href="/enjoy">Enjoy Terrace</a>, au Av. Tucan 1, Port d'Alcudia, ouvre chaque jour a 17h00 et constitue le point de depart ideal. La terrasse associe des cocktails signatures a une chicha premium dans un cadre sophistique. Les bartenders travaillent avec des ingredients locaux et des techniques modernes pour creer des combinaisons qui font la difference. Avec une note de 4.5/5 sur Google (318 avis), c'est une reference dans la zone.</p>

<h3>Que commander a Enjoy Terrace</h3>
<ul>
<li><strong>Cocktails signatures :</strong> creations exclusives aux ingredients mediterraneens</li>
<li><strong>Chicha premium :</strong> large variete de saveurs, des fruites classiques aux melanges epices</li>
<li><strong>Gin tonics artisanaux :</strong> selection soignee de gins et tonics premium</li>
</ul>

<h2>L'heure du club : Outxide Club</h2>
<p>A partir de 23h00, du jeudi au samedi, <a href="/outxide">Outxide Club</a> ouvre ses portes au meme Av. Tucan 1. C'est la reference absolue du clubbing dans le nord de Majorque : un systeme son professionnel haut de gamme, des DJs nationaux et internationaux, et une production visuelle qui transforme chaque nuit en spectacle. La saison s'etend de mai a octobre, avec des evenements thematiques et des soirees speciales chaque semaine.</p>

<h3>Acheter des billets</h3>
<p>Le moyen le plus pratique d'obtenir votre billet est via <strong>FourVenues</strong>, la plateforme officielle de billetterie du club. L'achat en ligne vous garantit l'acces et, pour de nombreux evenements, un tarif reduit par rapport a la caisse. Vous pouvez egalement acheter votre billet sur place le soir de l'evenement.</p>

<h3>Code vestimentaire</h3>
<p>Outxide Club applique une politique vestimentaire <strong>smart casual</strong>. Les vetements de plage, tongs et debardeurs ne sont pas autorises. Un look soigne mais decontracte est le meilleur choix.</p>

<h2>Conseils pratiques pour votre soiree</h2>

<h3>Comment se deplacer</h3>
<p>La zone de loisirs de Port d'Alcudia est compacte et se parcourt facilement a pied. Enjoy Terrace et Outxide Club sont litteralement l'un a cote de l'autre, la transition entre la terrasse et le club est donc immediate. Si vous logez dans des hotels plus eloignes, un service de taxi est disponible jusqu'aux premieres heures du matin.</p>

<h3>Prix indicatifs</h3>
<ul>
<li>Cocktail en terrasse : 10-15 EUR</li>
<li>Verre au bar : 8-12 EUR</li>
<li>Entree en club : 15-25 EUR (certaines soirees incluent une consommation)</li>
<li>Table VIP : sur demande selon l'evenement</li>
</ul>

<h2>Pourquoi Alcudia est differente</h2>
<p>Ce qui rend la nuit a Port d'Alcudia unique, c'est la proximite de tout. Vous pouvez commencer par des cocktails au coucher du soleil, diner dans un restaurant au grill comme <a href="/hiru">Hiru Food &amp; Drinks</a>, revenir sur la terrasse pour une chicha et terminer en dansant au club. Le tout dans la meme zone, a quelques pas. Cela, combine a la brise mediterraneenne, a l'ambiance internationale et a une offre de qualite, fait d'Alcudia une destination nocturne qui n'a rien a envier au sud de l'ile.</p>`,
      it: `<p>Port d'Alcudia si e' affermata come la destinazione piu' attraente per la vita notturna nel nord di Maiorca. Situata lungo 7 km di spiaggia di sabbia bianca, questo angolo dell'isola offre un ecosistema di divertimento notturno che spazia dalle terrazze con cocktail al miglior club della zona. Se stai pianificando una serata ad Alcudia, questa guida ti racconta tutto quello che devi sapere.</p>

<h2>Dove inizia la serata: Enjoy Terrace</h2>
<p>Ogni grande serata ad Alcudia inizia in terrazza. <a href="/enjoy">Enjoy Terrace</a>, in Av. Tucan 1, Port d'Alcudia, apre ogni giorno alle 17:00 ed e' il punto di partenza perfetto. La terrazza abbina cocktail d'autore a shisha premium in un ambiente sofisticato. I bartender lavorano con ingredienti locali e tecniche moderne per creare combinazioni che fanno la differenza. Con una valutazione di 4.5/5 su Google (318 recensioni), e' un punto di riferimento nella zona.</p>

<h3>Cosa ordinare da Enjoy Terrace</h3>
<ul>
<li><strong>Cocktail signature:</strong> creazioni esclusive con ingredienti mediterranei</li>
<li><strong>Shisha premium:</strong> ampia varieta' di gusti, dai fruttati classici alle miscele speziate</li>
<li><strong>Gin tonic artigianali:</strong> selezione curata di gin e toniche premium</li>
</ul>

<h2>L'ora del club: Outxide Club</h2>
<p>A partire dalle 23:00, da giovedi' a sabato, <a href="/outxide">Outxide Club</a> apre le sue porte nella stessa Av. Tucan 1. E' il riferimento assoluto del clubbing nel nord di Maiorca: impianto audio professionale di primo livello, DJ nazionali e internazionali, e una produzione visiva che trasforma ogni serata in uno spettacolo. La stagione va da maggio a ottobre, con eventi a tema e feste speciali ogni settimana.</p>

<h3>Acquistare i biglietti</h3>
<p>Il modo piu' comodo per ottenere il tuo biglietto e' attraverso <strong>FourVenues</strong>, la piattaforma ufficiale di vendita biglietti del club. Acquistare online ti garantisce l'accesso e, per molti eventi, un prezzo ridotto rispetto alla cassa. Puoi anche acquistare il biglietto alla porta la sera stessa dell'evento.</p>

<h3>Dress code</h3>
<p>Outxide Club applica una politica di abbigliamento <strong>smart casual</strong>. Non sono ammessi abbigliamento da spiaggia, infradito o canottiere. Un look curato ma rilassato e' la scelta migliore.</p>

<h2>Consigli pratici per la tua serata</h2>

<h3>Come muoverti</h3>
<p>La zona del divertimento di Port d'Alcudia e' compatta e si percorre facilmente a piedi. Enjoy Terrace e Outxide Club sono letteralmente uno accanto all'altro, quindi il passaggio dalla terrazza al club e' immediato. Se alloggi in hotel piu' lontani, il servizio taxi e' disponibile fino alle prime ore del mattino.</p>

<h3>Prezzi indicativi</h3>
<ul>
<li>Cocktail in terrazza: 10-15 EUR</li>
<li>Drink al bar: 8-12 EUR</li>
<li>Ingresso al club: 15-25 EUR (alcune serate includono una consumazione)</li>
<li>Tavolo VIP: consultare in base all'evento</li>
</ul>

<h2>Perche' Alcudia e' diversa</h2>
<p>Cio' che rende unica la notte a Port d'Alcudia e' la vicinanza di tutto. Puoi iniziare con cocktail al tramonto, cenare in un ristorante alla brace come <a href="/hiru">Hiru Food &amp; Drinks</a>, tornare in terrazza per una shisha e finire ballando in discoteca. Tutto nella stessa zona, a pochi passi. Questo, unito alla brezza del Mediterraneo, all'atmosfera internazionale e a un'offerta di qualita', rende Alcudia una destinazione notturna che non ha nulla da invidiare al sud dell'isola.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-04-15",
    image: "/images/outxide/DSCF8230-13.jpg",
    tags: ["nightlife", "alcudia", "mallorca", "outxide"],
    venue: "outxide",
    readingTime: 5,
  },
  {
    slug: "mejores-restaurantes-alcudia",
    title: {
      es: "Los Mejores Restaurantes de Alcúdia: Dónde Comer en 2026",
      en: "Best Restaurants in Alcudia: Where to Eat in 2026",
      de: "Die besten Restaurants in Alcudia: Wo man 2026 essen geht",
      fr: "Les Meilleurs Restaurants d'Alcudia : Ou Manger en 2026",
      it: "I Migliori Ristoranti di Alcudia: Dove Mangiare nel 2026",
    },
    excerpt: {
      es: "Descubre dónde comer en Alcúdia y Port d'Alcúdia: desde cocina mallorquina a la brasa hasta arroces de lonja, carnes maduradas y gastronomía mediterránea.",
      en: "Discover where to eat in Alcudia and Port d'Alcudia: from Mallorcan charcoal grill cuisine to fresh-catch rice dishes, aged meats and Mediterranean gastronomy.",
      de: "Entdecke, wo man in Alcudia und Port d'Alcudia essen geht: von mallorquinischer Grillküche über frische Reisgerichte vom Fischmarkt bis zu gereiftem Fleisch und mediterraner Gastronomie.",
      fr: "Decouvrez ou manger a Alcudia et Port d'Alcudia : de la cuisine majorquine au grill jusqu'aux riz de la criee, viandes maturees et gastronomie mediterraneenne.",
      it: "Scopri dove mangiare ad Alcudia e Port d'Alcudia: dalla cucina maiorchina alla brace ai risi di pesce fresco, carni frollate e gastronomia mediterranea.",
    },
    content: {
      es: `<p>Alcúdia no es solo playa y vida nocturna. La oferta gastronómica de Port d'Alcúdia y su casco antiguo ha madurado hasta convertirse en una de las más interesantes del norte de Mallorca. Desde cocina tradicional mallorquina hasta propuestas de autor a la brasa, aquí encontrarás dónde comer bien sea cual sea tu estilo.</p>

<h2>Hiru Food &amp; Drinks: la referencia en cocina a la brasa</h2>
<p>En Ctra. d'Artà 40, Port d'Alcúdia, <a href="/hiru">Hiru Food &amp; Drinks</a> se ha convertido en el restaurante de referencia para quienes buscan una experiencia gastronómica completa. Su cocina se basa en la brasa de carbón con producto fresco: carnes maduradas seleccionadas, arroces elaborados con pescado y marisco de la lonja local, y pescados del Mediterráneo cocinados al punto perfecto.</p>

<h3>Lo que hace especial a Hiru</h3>
<ul>
<li><strong>Carnes maduradas a la brasa:</strong> selección de cortes premium cocinados sobre carbón de leña, con texturas y sabores que solo el fuego real consigue</li>
<li><strong>Arroces de lonja:</strong> preparados con el pescado y marisco fresco del día, desde arroces caldosos hasta paellas de marisco</li>
<li><strong>Pescados del Mediterráneo:</strong> lubina, dorada y capturas locales a la parrilla, servidos con guarniciones de temporada</li>
<li><strong>Cócteles de autor:</strong> la experiencia no termina con el postre. Hiru ofrece una carta de cocktails para alargar la velada</li>
</ul>

<h3>Datos prácticos</h3>
<ul>
<li><strong>Horario:</strong> 12:00 a 23:30 (viernes y sábado hasta la 1:00). Martes cerrado</li>
<li><strong>Dirección:</strong> Ctra. d'Artà, 40, Port d'Alcúdia</li>
<li><strong>Valoración:</strong> 4.9/5 en Google (132 opiniones)</li>
<li><strong>Reservas:</strong> recomendable, especialmente fines de semana. Online o al 971 853 932</li>
</ul>

<h2>Cocina mallorquina: platos que debes probar</h2>
<p>Si visitas Alcúdia, hay platos que no puedes dejar de probar. La gastronomía de la isla se basa en producto local, sabores intensos y recetas transmitidas de generación en generación.</p>
<ul>
<li><strong>Pa amb oli:</strong> pan rústico con tomate ramallet, aceite de oliva y acompañamiento de jamón, queso o sobrasada</li>
<li><strong>Tumbet:</strong> la versión mallorquina del ratatouille, con patata, berenjena y pimiento</li>
<li><strong>Arròs brut:</strong> arroz caldoso con carnes, verduras y especias</li>
<li><strong>Sobrasada:</strong> el embutido emblemático de Mallorca, perfecto untado en pan caliente</li>
</ul>

<h2>Restaurantes junto al mar</h2>
<p>El paseo marítimo de Port d'Alcúdia ofrece restaurantes con vistas al agua donde disfrutar de pescado fresco, paella y cocina mediterránea. La brisa marina y las puestas de sol elevan cualquier cena. El puerto deportivo también alberga opciones más informales, ideales para comidas casuales.</p>

<h2>Cenar hasta tarde y conectar con la noche</h2>
<p>Una de las grandes ventajas de Alcúdia es que varios restaurantes mantienen horarios amplios, especialmente en verano. Hiru Food &amp; Drinks sirve cenas hasta las 23:30 entre semana y hasta la 1:00 los fines de semana, lo que permite una transición natural hacia el ocio nocturno. Después de cenar, <a href="/enjoy">Enjoy Terrace</a> está a pocos minutos para cócteles y shisha, y <a href="/outxide">Outxide Club</a> para quienes quieran bailar hasta el amanecer.</p>

<h2>Consejos para comer bien en Alcúdia</h2>
<ul>
<li>Reserva con antelación en temporada alta, especialmente viernes y sábados</li>
<li>Pregunta siempre por el pescado del día y el producto de temporada</li>
<li>Los arroces suelen requerir un pedido mínimo de dos personas</li>
<li>No te limites a la primera línea: explora el casco antiguo dentro de las murallas medievales</li>
</ul>`,
      en: `<p>Alcudia is much more than beach and nightlife. The dining scene in Port d'Alcudia and its old town has matured into one of the most compelling in northern Mallorca. From traditional Mallorcan cooking to signature charcoal grill cuisine, you will find great places to eat whatever your style.</p>

<h2>Hiru Food &amp; Drinks: the benchmark for grill cuisine</h2>
<p>At Ctra. d'Arta 40, Port d'Alcudia, <a href="/hiru">Hiru Food &amp; Drinks</a> has become the go-to restaurant for those seeking a complete gastronomic experience. The kitchen centres on charcoal grill cooking with fresh produce: hand-selected aged meats, rice dishes made with fish and shellfish from the local market, and Mediterranean fish cooked to perfection.</p>

<h3>What makes Hiru special</h3>
<ul>
<li><strong>Aged meats on the grill:</strong> premium cuts cooked over wood-fired charcoal, delivering textures and flavours only real fire can achieve</li>
<li><strong>Market-fresh rice dishes:</strong> prepared with the day's freshest fish and shellfish, from brothy rice to seafood paella</li>
<li><strong>Mediterranean fish:</strong> sea bass, sea bream and local catches grilled and served with seasonal garnishes</li>
<li><strong>Signature cocktails:</strong> the experience does not end at dessert. Hiru offers a cocktail menu for those who want to linger</li>
</ul>

<h3>Practical details</h3>
<ul>
<li><strong>Hours:</strong> 12:00 to 23:30 (Friday and Saturday until 1:00). Tuesday closed</li>
<li><strong>Address:</strong> Ctra. d'Arta, 40, Port d'Alcudia</li>
<li><strong>Rating:</strong> 4.9/5 on Google (132 reviews)</li>
<li><strong>Reservations:</strong> recommended, especially at weekends. Book online or call 971 853 932</li>
</ul>

<h2>Mallorcan cuisine: dishes you must try</h2>
<p>If you are visiting Alcudia, certain dishes are not to be missed. The island's gastronomy is built on local produce, bold flavours and recipes handed down through generations.</p>
<ul>
<li><strong>Pa amb oli:</strong> rustic bread with ramallet tomato, olive oil and accompaniments of ham, cheese or sobrasada</li>
<li><strong>Tumbet:</strong> Mallorca's version of ratatouille with potato, aubergine and pepper</li>
<li><strong>Arros brut:</strong> a hearty rice broth with mixed meats, vegetables and spices</li>
<li><strong>Sobrasada:</strong> Mallorca's iconic cured sausage, perfect spread on warm bread</li>
</ul>

<h2>Restaurants by the sea</h2>
<p>Port d'Alcudia's promenade offers restaurants with waterfront views serving fresh fish, paella and Mediterranean cuisine. The sea breeze and sunsets elevate any dinner. The marina area also has more informal options, ideal for casual lunches.</p>

<h2>Late dining and connecting with the nightlife</h2>
<p>One of Alcudia's great advantages is that several restaurants keep extended hours, especially in summer. Hiru Food &amp; Drinks serves dinner until 23:30 on weekdays and until 1:00 at weekends, allowing a natural transition into nightlife. After dinner, <a href="/enjoy">Enjoy Terrace</a> is minutes away for cocktails and shisha, and <a href="/outxide">Outxide Club</a> awaits those who want to dance until sunrise.</p>

<h2>Tips for eating well in Alcudia</h2>
<ul>
<li>Book ahead during peak season, especially Fridays and Saturdays</li>
<li>Always ask about the catch of the day and seasonal produce</li>
<li>Rice dishes usually require a minimum order for two</li>
<li>Do not limit yourself to the seafront: explore the old town within the medieval walls</li>
</ul>`,
      de: `<p>Alcudia ist nicht nur Strand und Nachtleben. Die Gastronomieszene in Port d'Alcudia und der Altstadt hat sich zu einer der spannendsten im Norden Mallorcas entwickelt. Von traditioneller mallorquinischer Küche bis zu Signature-Grillgerichten -- hier findest du großartige Restaurants, egal welchen Stil du bevorzugst.</p>

<h2>Hiru Food &amp; Drinks: die Referenz für Grillküche</h2>
<p>In der Ctra. d'Artà 40, Port d'Alcudia, hat sich <a href="/hiru">Hiru Food &amp; Drinks</a> zum Referenzrestaurant für alle entwickelt, die ein komplettes gastronomisches Erlebnis suchen. Die Küche basiert auf Holzkohlegrill mit frischen Zutaten: ausgewähltes gereiftes Fleisch, Reisgerichte mit Fisch und Meeresfrüchten vom lokalen Markt und mediterrane Fische, perfekt auf den Punkt gegart.</p>

<h3>Was Hiru besonders macht</h3>
<ul>
<li><strong>Gereiftes Fleisch vom Grill:</strong> Premium-Stücke über Holzkohle gegrillt, mit Texturen und Aromen, die nur echtes Feuer erzeugen kann</li>
<li><strong>Reisgerichte vom Fischmarkt:</strong> zubereitet mit dem tagesfrischen Fisch und Meeresfrüchten, von brühartigen Reisgerichten bis zur Meeresfrüchte-Paella</li>
<li><strong>Mediterrane Fische:</strong> Wolfsbarsch, Dorade und lokale Tagesfänge gegrillt und mit saisonalen Beilagen serviert</li>
<li><strong>Signature-Cocktails:</strong> das Erlebnis endet nicht beim Dessert. Hiru bietet eine Cocktailkarte, um den Abend zu verlängern</li>
</ul>

<h3>Praktische Infos</h3>
<ul>
<li><strong>Öffnungszeiten:</strong> 12:00 bis 23:30 Uhr (Freitag und Samstag bis 1:00 Uhr). Dienstag geschlossen</li>
<li><strong>Adresse:</strong> Ctra. d'Artà, 40, Port d'Alcudia</li>
<li><strong>Bewertung:</strong> 4.9/5 bei Google (132 Bewertungen)</li>
<li><strong>Reservierung:</strong> empfohlen, besonders am Wochenende. Online oder unter 971 853 932</li>
</ul>

<h2>Mallorquinische Küche: Gerichte, die du probieren musst</h2>
<p>Wenn du Alcudia besuchst, gibt es Gerichte, die du auf keinen Fall verpassen solltest. Die Gastronomie der Insel basiert auf lokalen Produkten, intensiven Aromen und Rezepten, die von Generation zu Generation weitergegeben werden.</p>
<ul>
<li><strong>Pa amb oli:</strong> rustikales Brot mit Ramallet-Tomate, Olivenöl und Beilagen wie Schinken, Käse oder Sobrasada</li>
<li><strong>Tumbet:</strong> die mallorquinische Version des Ratatouille mit Kartoffel, Aubergine und Paprika</li>
<li><strong>Arros brut:</strong> ein herzhafter Reis-Eintopf mit verschiedenen Fleischsorten, Gemüse und Gewürzen</li>
<li><strong>Sobrasada:</strong> die legendäre mallorquinische Rohwurst, perfekt auf warmem Brot gestrichen</li>
</ul>

<h2>Restaurants am Meer</h2>
<p>Die Strandpromenade von Port d'Alcudia bietet Restaurants mit Blick aufs Wasser, wo du frischen Fisch, Paella und mediterrane Küche genießen kannst. Die Meeresbrise und die Sonnenuntergänge machen jedes Abendessen zu etwas Besonderem. Der Yachthafen bietet auch ungezwungenere Optionen, ideal für ein lockeres Mittagessen.</p>

<h2>Spät essen und ins Nachtleben eintauchen</h2>
<p>Einer der großen Vorteile von Alcudia ist, dass viele Restaurants großzügige Öffnungszeiten haben, besonders im Sommer. Hiru Food &amp; Drinks serviert unter der Woche bis 23:30 Uhr und am Wochenende bis 1:00 Uhr -- das ermöglicht einen natürlichen Übergang ins Nachtleben. Nach dem Abendessen ist die <a href="/enjoy">Enjoy Terrace</a> nur wenige Minuten entfernt für Cocktails und Shisha, und der <a href="/outxide">Outxide Club</a> wartet auf alle, die bis zum Morgengrauen tanzen wollen.</p>

<h2>Tipps für gutes Essen in Alcudia</h2>
<ul>
<li>Reserviere in der Hochsaison rechtzeitig, besonders freitags und samstags</li>
<li>Frag immer nach dem Tagesfang und saisonalen Produkten</li>
<li>Reisgerichte erfordern in der Regel eine Mindestbestellung für zwei Personen</li>
<li>Beschränke dich nicht auf die erste Reihe am Meer: erkunde die Altstadt innerhalb der mittelalterlichen Mauern</li>
</ul>`,
      fr: `<p>Alcudia ne se resume pas a la plage et a la vie nocturne. L'offre gastronomique de Port d'Alcudia et de sa vieille ville a muri jusqu'a devenir l'une des plus interessantes du nord de Majorque. De la cuisine traditionnelle majorquine aux propositions d'auteur au grill, vous trouverez ici ou bien manger quel que soit votre style.</p>

<h2>Hiru Food &amp; Drinks : la reference de la cuisine au grill</h2>
<p>Au Ctra. d'Arta 40, Port d'Alcudia, <a href="/hiru">Hiru Food &amp; Drinks</a> s'est impose comme le restaurant de reference pour ceux qui recherchent une experience gastronomique complete. Sa cuisine repose sur la braise au charbon de bois avec des produits frais : viandes maturees selectionnees, riz prepares avec du poisson et des fruits de mer de la criee locale, et poissons de Mediterranee cuits a la perfection.</p>

<h3>Ce qui rend Hiru special</h3>
<ul>
<li><strong>Viandes maturees au grill :</strong> selection de pieces premium cuites sur charbon de bois, avec des textures et saveurs que seul le feu veritable permet d'obtenir</li>
<li><strong>Riz de la criee :</strong> prepares avec le poisson et les fruits de mer frais du jour, des riz en bouillon aux paellas de fruits de mer</li>
<li><strong>Poissons de Mediterranee :</strong> bar, dorade et prises locales grillees, servis avec des garnitures de saison</li>
<li><strong>Cocktails signatures :</strong> l'experience ne s'arrete pas au dessert. Hiru propose une carte de cocktails pour prolonger la soiree</li>
</ul>

<h3>Informations pratiques</h3>
<ul>
<li><strong>Horaires :</strong> 12h00 a 23h30 (vendredi et samedi jusqu'a 1h00). Ferme le mardi</li>
<li><strong>Adresse :</strong> Ctra. d'Arta, 40, Port d'Alcudia</li>
<li><strong>Note :</strong> 4.9/5 sur Google (132 avis)</li>
<li><strong>Reservations :</strong> recommandees, surtout le week-end. En ligne ou au 971 853 932</li>
</ul>

<h2>Cuisine majorquine : les plats a ne pas manquer</h2>
<p>Si vous visitez Alcudia, certains plats sont incontournables. La gastronomie de l'ile repose sur des produits locaux, des saveurs intenses et des recettes transmises de generation en generation.</p>
<ul>
<li><strong>Pa amb oli :</strong> pain rustique avec tomate ramallet, huile d'olive et accompagnement de jambon, fromage ou sobrasada</li>
<li><strong>Tumbet :</strong> la version majorquine de la ratatouille, avec pomme de terre, aubergine et poivron</li>
<li><strong>Arros brut :</strong> riz en bouillon avec viandes, legumes et epices</li>
<li><strong>Sobrasada :</strong> la charcuterie emblematique de Majorque, parfaite tartinee sur du pain chaud</li>
</ul>

<h2>Restaurants en bord de mer</h2>
<p>La promenade maritime de Port d'Alcudia offre des restaurants avec vue sur l'eau ou deguster du poisson frais, de la paella et de la cuisine mediterraneenne. La brise marine et les couchers de soleil subliment n'importe quel diner. Le port de plaisance abrite egalement des options plus informelles, ideales pour des repas decontractes.</p>

<h2>Diner tard et enchainer avec la nuit</h2>
<p>L'un des grands avantages d'Alcudia est que plusieurs restaurants maintiennent des horaires etendus, surtout en ete. Hiru Food &amp; Drinks sert le diner jusqu'a 23h30 en semaine et jusqu'a 1h00 le week-end, ce qui permet une transition naturelle vers les loisirs nocturnes. Apres le diner, <a href="/enjoy">Enjoy Terrace</a> est a quelques minutes pour des cocktails et une chicha, et <a href="/outxide">Outxide Club</a> pour ceux qui veulent danser jusqu'a l'aube.</p>

<h2>Conseils pour bien manger a Alcudia</h2>
<ul>
<li>Reservez a l'avance en haute saison, surtout les vendredis et samedis</li>
<li>Demandez toujours le poisson du jour et les produits de saison</li>
<li>Les riz necessitent generalement une commande minimum pour deux personnes</li>
<li>Ne vous limitez pas au front de mer : explorez la vieille ville dans l'enceinte des remparts medievaux</li>
</ul>`,
      it: `<p>Alcudia non e' solo spiaggia e vita notturna. L'offerta gastronomica di Port d'Alcudia e del suo centro storico e' maturata fino a diventare una delle piu' interessanti del nord di Maiorca. Dalla cucina tradizionale maiorchina alle proposte d'autore alla brace, qui troverai dove mangiare bene qualunque sia il tuo stile.</p>

<h2>Hiru Food &amp; Drinks: il riferimento nella cucina alla brace</h2>
<p>In Ctra. d'Arta 40, Port d'Alcudia, <a href="/hiru">Hiru Food &amp; Drinks</a> e' diventato il ristorante di riferimento per chi cerca un'esperienza gastronomica completa. La sua cucina si basa sulla brace a carbone con prodotto fresco: carni frollate selezionate, risi elaborati con pesce e frutti di mare del mercato locale, e pesci del Mediterraneo cotti alla perfezione.</p>

<h3>Cosa rende speciale Hiru</h3>
<ul>
<li><strong>Carni frollate alla brace:</strong> selezione di tagli premium cotti su carbone di legna, con consistenze e sapori che solo il fuoco vero riesce a ottenere</li>
<li><strong>Risi del mercato:</strong> preparati con il pesce e i frutti di mare freschi del giorno, dai risi brodosi alle paelle di mare</li>
<li><strong>Pesci del Mediterraneo:</strong> spigola, orata e pescato locale alla griglia, serviti con contorni di stagione</li>
<li><strong>Cocktail d'autore:</strong> l'esperienza non finisce con il dessert. Hiru offre una carta di cocktail per prolungare la serata</li>
</ul>

<h3>Informazioni pratiche</h3>
<ul>
<li><strong>Orario:</strong> 12:00 - 23:30 (venerdi' e sabato fino all'1:00). Martedi' chiuso</li>
<li><strong>Indirizzo:</strong> Ctra. d'Arta, 40, Port d'Alcudia</li>
<li><strong>Valutazione:</strong> 4.9/5 su Google (132 recensioni)</li>
<li><strong>Prenotazioni:</strong> consigliata, soprattutto nei fine settimana. Online o al 971 853 932</li>
</ul>

<h2>Cucina maiorchina: piatti da provare assolutamente</h2>
<p>Se visiti Alcudia, ci sono piatti che non puoi perdere. La gastronomia dell'isola si basa su prodotti locali, sapori intensi e ricette tramandate di generazione in generazione.</p>
<ul>
<li><strong>Pa amb oli:</strong> pane rustico con pomodoro ramallet, olio d'oliva e accompagnamento di prosciutto, formaggio o sobrasada</li>
<li><strong>Tumbet:</strong> la versione maiorchina della ratatouille, con patata, melanzana e peperone</li>
<li><strong>Arros brut:</strong> riso brodoso con carni, verdure e spezie</li>
<li><strong>Sobrasada:</strong> l'insaccato emblematico di Maiorca, perfetto spalmato su pane caldo</li>
</ul>

<h2>Ristoranti sul mare</h2>
<p>Il lungomare di Port d'Alcudia offre ristoranti con vista sull'acqua dove gustare pesce fresco, paella e cucina mediterranea. La brezza marina e i tramonti elevano qualsiasi cena. Il porto turistico ospita anche opzioni piu' informali, ideali per pranzi casual.</p>

<h2>Cenare fino a tardi e collegarsi con la vita notturna</h2>
<p>Uno dei grandi vantaggi di Alcudia e' che diversi ristoranti mantengono orari ampi, specialmente in estate. Hiru Food &amp; Drinks serve cene fino alle 23:30 durante la settimana e fino all'1:00 nei fine settimana, permettendo una transizione naturale verso il divertimento notturno. Dopo cena, <a href="/enjoy">Enjoy Terrace</a> e' a pochi minuti per cocktail e shisha, e <a href="/outxide">Outxide Club</a> per chi vuole ballare fino all'alba.</p>

<h2>Consigli per mangiare bene ad Alcudia</h2>
<ul>
<li>Prenota con anticipo in alta stagione, specialmente venerdi' e sabato</li>
<li>Chiedi sempre del pesce del giorno e del prodotto di stagione</li>
<li>I risi di solito richiedono un ordine minimo di due persone</li>
<li>Non limitarti alla prima linea: esplora il centro storico all'interno delle mura medievali</li>
</ul>`,
    },
    author: "Grupo Enjoy",
    date: "2026-03-28",
    image: "/images/hiru/673547411_122294638466201104_4294441832152685275_n.jpg",
    tags: ["restaurants", "alcudia", "food", "hiru"],
    venue: "hiru",
    readingTime: 5,
  },
  {
    slug: "cocteles-shisha-terraza-alcudia",
    title: {
      es: "Cócteles y Shisha en Alcúdia: La Experiencia Enjoy Terrace",
      en: "Cocktails and Shisha in Alcudia: The Enjoy Terrace Experience",
      de: "Cocktails und Shisha in Alcudia: Das Enjoy Terrace Erlebnis",
      fr: "Cocktails et Chicha a Alcudia : L'Experience Enjoy Terrace",
      it: "Cocktail e Shisha ad Alcudia: L'Esperienza Enjoy Terrace",
    },
    excerpt: {
      es: "La mejor terraza de Alcúdia: cócteles de autor, shisha premium y el ambiente perfecto para empezar la noche. Descubre Enjoy Terrace en Port d'Alcúdia.",
      en: "The best terrace in Alcudia: signature cocktails, premium shisha and the perfect atmosphere to start the night. Discover Enjoy Terrace in Port d'Alcudia.",
      de: "Die beste Terrasse in Alcudia: Signature-Cocktails, Premium-Shisha und die perfekte Atmosphäre, um die Nacht einzuläuten. Entdecke die Enjoy Terrace in Port d'Alcudia.",
      fr: "La meilleure terrasse d'Alcudia : cocktails signatures, chicha premium et l'ambiance parfaite pour commencer la soiree. Decouvrez Enjoy Terrace a Port d'Alcudia.",
      it: "La migliore terrazza di Alcudia: cocktail d'autore, shisha premium e l'atmosfera perfetta per iniziare la serata. Scopri Enjoy Terrace a Port d'Alcudia.",
    },
    content: {
      es: `<p>Hay noches que se definen por un cóctel bien hecho, el aroma de una shisha premium y la brisa del Mediterráneo. En Port d'Alcúdia, <a href="/enjoy">Enjoy Terrace</a> ha creado exactamente esa experiencia: un espacio donde la mixología de autor, la shisha y un ambiente cuidado al detalle se combinan para marcar el inicio de las mejores noches de Mallorca.</p>

<h2>Enjoy Terrace: donde empieza la noche en Alcúdia</h2>
<p>Ubicada en Av. Tucán 1, Port d'Alcúdia, Enjoy Terrace abre sus puertas cada día a las 17:00 y no cierra hasta las 05:30. Es el lugar de referencia para quienes buscan más que un bar: una experiencia completa de terraza con carta de cócteles renovada por temporada, shisha premium y un ambiente que evoluciona según avanza la noche.</p>

<h3>Los números hablan</h3>
<ul>
<li><strong>Valoración:</strong> 4.5 sobre 5 en Google, con 318 opiniones</li>
<li><strong>Horario:</strong> abierto todos los días de 17:00 a 05:30</li>
<li><strong>Ubicación:</strong> Av. Tucán, 1, Port d'Alcúdia</li>
</ul>

<h2>La carta de cócteles</h2>
<p>El equipo de bartenders de Enjoy Terrace trabaja con producto fresco y técnicas de mixología contemporánea. La carta se renueva cada temporada, pero siempre mantiene el equilibrio entre clásicos bien ejecutados y creaciones propias que sorprenden. Ingredientes locales como cítricos mallorquines, hierbas aromáticas del campo y frutas de temporada son la base de cócteles que no encontrarás en otro sitio.</p>

<h3>Tendencias que encontrarás</h3>
<ul>
<li><strong>Ingredientes locales:</strong> hierbas aromáticas del campo mallorquín, almendra de la isla y fruta de temporada</li>
<li><strong>Técnicas modernas:</strong> infusiones en frío, espumas, ahumados y clarificados</li>
<li><strong>Presentación cuidada:</strong> cristalería seleccionada, hielo artesanal y garnishes que aportan sabor y estética</li>
<li><strong>Opciones low-alcohol y mocktails:</strong> para quienes prefieren beber menos sin renunciar al sabor</li>
</ul>

<h2>La experiencia shisha</h2>
<p>La shisha en Enjoy Terrace no es un complemento: es parte central de la experiencia. La selección de sabores va desde frutales clásicos como manzana y melocotón hasta mezclas más complejas con menta, especias o flores. El equipo asesora sobre la mejor combinación con tu cóctel para crear un maridaje perfecto.</p>

<h3>Cómo disfrutar la shisha</h3>
<ul>
<li><strong>Elige bien el sabor:</strong> pide consejo al equipo si es tu primera vez</li>
<li><strong>Tómate tu tiempo:</strong> una buena sesión dura entre 45 minutos y una hora</li>
<li><strong>Marida con el cóctel:</strong> los sabores cítricos y frutales funcionan especialmente bien</li>
<li><strong>Comparte:</strong> la shisha es una experiencia social, perfecta para disfrutar en grupo</li>
</ul>

<h2>El ambiente perfecto</h2>
<p>Enjoy Terrace ha sido diseñada para ofrecer algo más que un espacio bonito. La iluminación cambia según avanza la noche, la música ambiente evoluciona de lo chill a algo más enérgico, y el mobiliario está pensado para veladas largas. Hay zonas de sofás para grupos, mesas para parejas y rincones más íntimos.</p>

<h2>La transición perfecta a la noche</h2>
<p>Una de las grandes ventajas de Enjoy Terrace es su ubicación. Justo al lado está <a href="/outxide">Outxide Club</a>, que abre a las 23:00 de jueves a sábado. Así que puedes pasar una tarde entera de cócteles y shisha y, cuando la noche suba de nivel, simplemente caminar unos metros hasta el mejor club de Alcúdia. Es la transición más natural y cómoda que vas a encontrar en Mallorca.</p>

<h2>Sigue leyendo</h2>
<p>Lee nuestro articulo completo sobre <a href="/blog/enjoy-terrace-cocktails-shisha-port-alcudia">Enjoy Terrace: la terraza de cocteles y shisha de Port d'Alcudia</a>. Tambien te puede interesar nuestra <a href="/blog/guia-vida-nocturna-alcudia">guia de vida nocturna en Alcudia</a> y la seleccion de los <a href="/blog/shisha-bar-terraza-lounge-mallorca">mejores shisha bars de Mallorca</a>.</p>`,
      en: `<p>There are nights defined by a well-crafted cocktail, the aroma of premium shisha and the Mediterranean breeze. In Port d'Alcudia, <a href="/enjoy">Enjoy Terrace</a> has created exactly that experience: a space where signature mixology, shisha and an atmosphere crafted down to the last detail combine to set the stage for the best nights in Mallorca.</p>

<h2>Enjoy Terrace: where the night begins in Alcudia</h2>
<p>Located at Av. Tucan 1, Port d'Alcudia, Enjoy Terrace opens its doors daily from 17:00 and stays open until 05:30. It is the go-to venue for those looking for more than a bar: a complete terrace experience with a cocktail menu refreshed each season, premium shisha and an atmosphere that evolves as the night progresses.</p>

<h3>The numbers speak</h3>
<ul>
<li><strong>Rating:</strong> 4.5 out of 5 on Google, with 318 reviews</li>
<li><strong>Hours:</strong> open daily from 17:00 to 05:30</li>
<li><strong>Location:</strong> Av. Tucan, 1, Port d'Alcudia</li>
</ul>

<h2>The cocktail menu</h2>
<p>The bartending team at Enjoy Terrace works with fresh produce and contemporary mixology techniques. The menu is refreshed each season but always maintains the balance between well-executed classics and house creations that surprise. Local ingredients such as Mallorcan citrus, aromatic countryside herbs and seasonal fruits form the base of cocktails you will not find elsewhere.</p>

<h3>Trends you will find</h3>
<ul>
<li><strong>Local ingredients:</strong> aromatic herbs from the Mallorcan countryside, island-grown almonds and seasonal fruit</li>
<li><strong>Modern techniques:</strong> cold infusions, foams, smoked elements and clarifications</li>
<li><strong>Considered presentation:</strong> selected glassware, artisan ice and garnishes that enhance flavour and aesthetics</li>
<li><strong>Low-alcohol and mocktails:</strong> for those who prefer less alcohol without sacrificing flavour</li>
</ul>

<h2>The shisha experience</h2>
<p>Shisha at Enjoy Terrace is not an afterthought: it is a central part of the experience. The flavour selection ranges from classic fruity options like apple and peach to more complex blends with mint, spices or florals. The team advises on the best pairing with your cocktail to create a perfect match.</p>

<h3>How to enjoy shisha</h3>
<ul>
<li><strong>Choose the right flavour:</strong> ask the team for guidance if it is your first time</li>
<li><strong>Take your time:</strong> a good session lasts between 45 minutes and an hour</li>
<li><strong>Pair with your cocktail:</strong> citrus and fruity flavours work especially well</li>
<li><strong>Share the experience:</strong> shisha is a social ritual, perfect for groups</li>
</ul>

<h2>The perfect atmosphere</h2>
<p>Enjoy Terrace has been designed to offer more than a beautiful space. The lighting shifts as the night progresses, the ambient music evolves from chill to something more energetic, and the furniture is built for long evenings. There are sofa areas for groups, tables for couples and more intimate corners.</p>

<h2>The perfect transition into the night</h2>
<p>One of Enjoy Terrace's great advantages is its location. Right next door is <a href="/outxide">Outxide Club</a>, which opens at 23:00 from Thursday to Saturday. So you can spend an entire evening of cocktails and shisha and, when the night steps up a gear, simply walk a few metres to the best club in Alcudia. It is the most natural and convenient transition you will find in Mallorca.</p>`,
      de: `<p>Es gibt Nächte, die von einem perfekt zubereiteten Cocktail, dem Aroma einer Premium-Shisha und der Mittelmeerbrise geprägt sind. In Port d'Alcudia hat <a href="/enjoy">Enjoy Terrace</a> genau dieses Erlebnis geschaffen: ein Ort, an dem Signature-Mixologie, Shisha und eine bis ins Detail durchdachte Atmosphäre zusammenkommen, um den Auftakt für die besten Nächte Mallorcas zu setzen.</p>

<h2>Enjoy Terrace: wo die Nacht in Alcudia beginnt</h2>
<p>In der Av. Tucán 1, Port d'Alcudia, öffnet die Enjoy Terrace täglich um 17:00 Uhr und schließt erst um 05:30 Uhr. Sie ist die erste Adresse für alle, die mehr als eine Bar suchen: ein komplettes Terrassenerlebnis mit einer saisonal erneuerten Cocktailkarte, Premium-Shisha und einer Atmosphäre, die sich im Laufe der Nacht weiterentwickelt.</p>

<h3>Die Zahlen sprechen für sich</h3>
<ul>
<li><strong>Bewertung:</strong> 4.5 von 5 bei Google, mit 318 Bewertungen</li>
<li><strong>Öffnungszeiten:</strong> täglich geöffnet von 17:00 bis 05:30 Uhr</li>
<li><strong>Standort:</strong> Av. Tucán, 1, Port d'Alcudia</li>
</ul>

<h2>Die Cocktailkarte</h2>
<p>Das Bartender-Team der Enjoy Terrace arbeitet mit frischen Produkten und zeitgenössischen Mixologie-Techniken. Die Karte wird jede Saison erneuert, behält aber immer das Gleichgewicht zwischen perfekt umgesetzten Klassikern und hauseigenen Kreationen, die überraschen. Lokale Zutaten wie mallorquinische Zitrusfrüchte, aromatische Kräuter vom Land und saisonale Früchte bilden die Basis für Cocktails, die du nirgendwo anders findest.</p>

<h3>Trends, die dich erwarten</h3>
<ul>
<li><strong>Lokale Zutaten:</strong> aromatische Kräuter vom mallorquinischen Land, Inselmandeln und saisonales Obst</li>
<li><strong>Moderne Techniken:</strong> Kaltinfusionen, Schäume, Raucheffekte und Klärungen</li>
<li><strong>Durchdachte Präsentation:</strong> ausgewählte Gläser, handgemachtes Eis und Garnituren, die Geschmack und Ästhetik vereinen</li>
<li><strong>Low-Alcohol und Mocktails:</strong> für alle, die weniger Alkohol bevorzugen, ohne auf Geschmack zu verzichten</li>
</ul>

<h2>Das Shisha-Erlebnis</h2>
<p>Die Shisha in der Enjoy Terrace ist kein Beiwerk -- sie ist ein zentraler Teil des Erlebnisses. Die Geschmacksauswahl reicht von klassisch-fruchtigen Sorten wie Apfel und Pfirsich bis hin zu komplexeren Mischungen mit Minze, Gewürzen oder Blüten. Das Team berät dich zur besten Kombination mit deinem Cocktail für ein perfektes Pairing.</p>

<h3>So genießt du die Shisha</h3>
<ul>
<li><strong>Wähle den richtigen Geschmack:</strong> frag das Team um Rat, wenn es dein erstes Mal ist</li>
<li><strong>Nimm dir Zeit:</strong> eine gute Session dauert zwischen 45 Minuten und einer Stunde</li>
<li><strong>Kombiniere mit dem Cocktail:</strong> Zitrus- und Fruchtaromen harmonieren besonders gut</li>
<li><strong>Teile das Erlebnis:</strong> Shisha ist ein soziales Ritual, perfekt für Gruppen</li>
</ul>

<h2>Die perfekte Atmosphäre</h2>
<p>Die Enjoy Terrace wurde so gestaltet, dass sie mehr bietet als einen schönen Ort. Die Beleuchtung verändert sich im Laufe der Nacht, die Hintergrundmusik entwickelt sich von Chill zu etwas Energischerem, und das Mobiliar ist für lange Abende gemacht. Es gibt Sofabereiche für Gruppen, Tische für Paare und intimere Ecken.</p>

<h2>Der perfekte Übergang in die Nacht</h2>
<p>Einer der großen Vorteile der Enjoy Terrace ist ihre Lage. Direkt nebenan befindet sich <a href="/outxide">Outxide Club</a>, der von Donnerstag bis Samstag um 23:00 Uhr öffnet. Du kannst also einen ganzen Abend mit Cocktails und Shisha verbringen und, wenn die Nacht an Fahrt aufnimmt, einfach ein paar Meter zum besten Club in Alcudia laufen. Es ist der natürlichste und bequemste Übergang, den du auf Mallorca finden wirst.</p>`,
      fr: `<p>Il y a des soirees qui se definissent par un cocktail bien prepare, l'arome d'une chicha premium et la brise mediterraneenne. A Port d'Alcudia, <a href="/enjoy">Enjoy Terrace</a> a cree exactement cette experience : un espace ou la mixologie d'auteur, la chicha et une ambiance soignee dans les moindres details se combinent pour donner le ton des plus belles nuits de Majorque.</p>

<h2>Enjoy Terrace : la ou la nuit commence a Alcudia</h2>
<p>Situee au Av. Tucan 1, Port d'Alcudia, Enjoy Terrace ouvre ses portes chaque jour a 17h00 et ne ferme qu'a 05h30. C'est le lieu de reference pour ceux qui recherchent plus qu'un bar : une experience complete de terrasse avec une carte de cocktails renouvelee chaque saison, une chicha premium et une ambiance qui evolue au fil de la nuit.</p>

<h3>Les chiffres parlent</h3>
<ul>
<li><strong>Note :</strong> 4.5 sur 5 sur Google, avec 318 avis</li>
<li><strong>Horaires :</strong> ouvert tous les jours de 17h00 a 05h30</li>
<li><strong>Emplacement :</strong> Av. Tucan, 1, Port d'Alcudia</li>
</ul>

<h2>La carte des cocktails</h2>
<p>L'equipe de bartenders d'Enjoy Terrace travaille avec des produits frais et des techniques de mixologie contemporaine. La carte est renouvelee chaque saison mais maintient toujours l'equilibre entre des classiques bien executes et des creations maison qui surprennent. Des ingredients locaux comme les agrumes majorquins, les herbes aromatiques de la campagne et les fruits de saison constituent la base de cocktails que vous ne trouverez nulle part ailleurs.</p>

<h3>Tendances que vous decouvrirez</h3>
<ul>
<li><strong>Ingredients locaux :</strong> herbes aromatiques de la campagne majorquine, amandes de l'ile et fruits de saison</li>
<li><strong>Techniques modernes :</strong> infusions a froid, mousses, fumages et clarifications</li>
<li><strong>Presentation soignee :</strong> verrerie selectionnee, glace artisanale et garnitures qui apportent saveur et esthetique</li>
<li><strong>Options faibles en alcool et mocktails :</strong> pour ceux qui preferent boire moins sans renoncer a la saveur</li>
</ul>

<h2>L'experience chicha</h2>
<p>La chicha a Enjoy Terrace n'est pas un complement : c'est une partie centrale de l'experience. La selection de saveurs va des fruites classiques comme la pomme et la peche jusqu'a des melanges plus complexes avec de la menthe, des epices ou des fleurs. L'equipe conseille sur le meilleur accord avec votre cocktail pour creer un mariage parfait.</p>

<h3>Comment profiter de la chicha</h3>
<ul>
<li><strong>Choisissez bien la saveur :</strong> demandez conseil a l'equipe si c'est votre premiere fois</li>
<li><strong>Prenez votre temps :</strong> une bonne session dure entre 45 minutes et une heure</li>
<li><strong>Accordez avec votre cocktail :</strong> les saveurs d'agrumes et de fruits fonctionnent particulierement bien</li>
<li><strong>Partagez :</strong> la chicha est une experience sociale, parfaite a savourer en groupe</li>
</ul>

<h2>L'ambiance parfaite</h2>
<p>Enjoy Terrace a ete concue pour offrir bien plus qu'un bel espace. L'eclairage change au fil de la nuit, la musique d'ambiance evolue du chill vers quelque chose de plus energique, et le mobilier est pense pour de longues soirees. Il y a des espaces canapes pour les groupes, des tables pour les couples et des coins plus intimes.</p>

<h2>La transition parfaite vers la nuit</h2>
<p>L'un des grands avantages d'Enjoy Terrace est son emplacement. Juste a cote se trouve <a href="/outxide">Outxide Club</a>, qui ouvre a 23h00 du jeudi au samedi. Vous pouvez ainsi passer tout un apres-midi de cocktails et de chicha et, quand la nuit monte en intensite, simplement marcher quelques metres jusqu'au meilleur club d'Alcudia. C'est la transition la plus naturelle et pratique que vous trouverez a Majorque.</p>`,
      it: `<p>Ci sono serate definite da un cocktail ben fatto, l'aroma di una shisha premium e la brezza del Mediterraneo. A Port d'Alcudia, <a href="/enjoy">Enjoy Terrace</a> ha creato esattamente questa esperienza: uno spazio dove la mixology d'autore, la shisha e un'atmosfera curata nei minimi dettagli si combinano per segnare l'inizio delle migliori serate di Maiorca.</p>

<h2>Enjoy Terrace: dove inizia la serata ad Alcudia</h2>
<p>Situata in Av. Tucan 1, Port d'Alcudia, Enjoy Terrace apre le sue porte ogni giorno alle 17:00 e non chiude fino alle 05:30. E' il locale di riferimento per chi cerca piu' di un bar: un'esperienza completa di terrazza con carta cocktail rinnovata stagionalmente, shisha premium e un'atmosfera che evolve con l'avanzare della serata.</p>

<h3>I numeri parlano</h3>
<ul>
<li><strong>Valutazione:</strong> 4.5 su 5 su Google, con 318 recensioni</li>
<li><strong>Orario:</strong> aperto tutti i giorni dalle 17:00 alle 05:30</li>
<li><strong>Posizione:</strong> Av. Tucan, 1, Port d'Alcudia</li>
</ul>

<h2>La carta dei cocktail</h2>
<p>Il team di bartender di Enjoy Terrace lavora con prodotti freschi e tecniche di mixology contemporanea. La carta si rinnova ogni stagione, ma mantiene sempre l'equilibrio tra classici ben eseguiti e creazioni originali che sorprendono. Ingredienti locali come agrumi maiorchini, erbe aromatiche della campagna e frutta di stagione sono la base di cocktail che non troverai da nessun'altra parte.</p>

<h3>Tendenze che troverai</h3>
<ul>
<li><strong>Ingredienti locali:</strong> erbe aromatiche della campagna maiorchina, mandorle dell'isola e frutta di stagione</li>
<li><strong>Tecniche moderne:</strong> infusioni a freddo, schiume, affumicature e chiarificazioni</li>
<li><strong>Presentazione curata:</strong> bicchieri selezionati, ghiaccio artigianale e guarnizioni che apportano sapore ed estetica</li>
<li><strong>Opzioni low-alcohol e mocktail:</strong> per chi preferisce bere meno senza rinunciare al gusto</li>
</ul>

<h2>L'esperienza shisha</h2>
<p>La shisha da Enjoy Terrace non e' un complemento: e' parte centrale dell'esperienza. La selezione di gusti va dai fruttati classici come mela e pesca a miscele piu' complesse con menta, spezie o fiori. Il team consiglia il miglior abbinamento con il tuo cocktail per creare un pairing perfetto.</p>

<h3>Come godersi la shisha</h3>
<ul>
<li><strong>Scegli bene il gusto:</strong> chiedi consiglio al team se e' la tua prima volta</li>
<li><strong>Prenditi il tuo tempo:</strong> una buona sessione dura tra i 45 minuti e un'ora</li>
<li><strong>Abbina al cocktail:</strong> i gusti agrumati e fruttati funzionano particolarmente bene</li>
<li><strong>Condividi:</strong> la shisha e' un'esperienza sociale, perfetta da gustare in compagnia</li>
</ul>

<h2>L'atmosfera perfetta</h2>
<p>Enjoy Terrace e' stata progettata per offrire qualcosa di piu' di uno spazio bello. L'illuminazione cambia con l'avanzare della serata, la musica ambient evolve dal chill a qualcosa di piu' energico, e l'arredamento e' pensato per serate lunghe. Ci sono zone con divani per gruppi, tavoli per coppie e angoli piu' intimi.</p>

<h2>La transizione perfetta verso la notte</h2>
<p>Uno dei grandi vantaggi di Enjoy Terrace e' la sua posizione. Proprio accanto si trova <a href="/outxide">Outxide Club</a>, che apre alle 23:00 da giovedi' a sabato. Cosi' puoi trascorrere un intero pomeriggio di cocktail e shisha e, quando la serata sale di livello, semplicemente camminare pochi metri fino al miglior club di Alcudia. E' la transizione piu' naturale e comoda che troverai a Maiorca.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-10",
    image: "/images/enjoy/486794569_1387780529291617_4160677529187971189_n.jpg",
    tags: ["cocktails", "shisha", "enjoy", "terrace"],
    venue: "enjoy",
    readingTime: 5,
  },
  {
    slug: "planes-alcudia-mallorca",
    title: {
      es: "Qué Hacer en Alcúdia: 10 Planes Imprescindibles en Mallorca",
      en: "Things to Do in Alcudia: 10 Must-Do Activities in Mallorca",
      de: "Was man in Alcudia unternehmen kann: 10 unverzichtbare Aktivitäten auf Mallorca",
      fr: "Que Faire a Alcudia : 10 Activites Incontournables a Majorque",
      it: "Cosa Fare ad Alcudia: 10 Attivita' Imperdibili a Maiorca",
    },
    excerpt: {
      es: "Desde la playa de 7 km hasta el casco antiguo medieval, deportes acuáticos y la mejor vida nocturna. Los 10 planes imprescindibles en Alcúdia, Mallorca.",
      en: "From the 7 km beach to the medieval old town, water sports and the best nightlife. The 10 must-do activities in Alcudia, Mallorca.",
      de: "Vom 7 km langen Strand über die mittelalterliche Altstadt bis zu Wassersport und dem besten Nachtleben. Die 10 unverzichtbaren Aktivitäten in Alcudia, Mallorca.",
      fr: "De la plage de 7 km a la vieille ville medievale, sports nautiques et meilleure vie nocturne. Les 10 activites incontournables a Alcudia, Majorque.",
      it: "Dalla spiaggia di 7 km al centro storico medievale, sport acquatici e la migliore vita notturna. Le 10 attivita' imperdibili ad Alcudia, Maiorca.",
    },
    content: {
      es: `<p>Alcúdia es uno de los destinos más completos de Mallorca. Situada en el norte de la isla, esta localidad combina naturaleza, historia, gastronomía y vida nocturna en un radio sorprendentemente compacto. Aquí tienes los 10 planes imprescindibles si visitas Alcúdia.</p>

<h2>1. La playa de Alcúdia</h2>
<p>Con más de 7 km de arena fina y aguas cristalinas, la playa de Alcúdia es una de las más extensas de Mallorca. Su pendiente suave la hace perfecta para familias, mientras que la zona norte, más tranquila, es ideal para quienes buscan relax. Los meses de junio a septiembre ofrecen condiciones perfectas para bañarse.</p>

<h2>2. El casco antiguo medieval</h2>
<p>La Alcúdia histórica, dentro de las murallas medievales del siglo XIV, es un laberinto de calles estrechas, plazas con encanto y edificios de piedra. No te pierdas la iglesia de Sant Jaume, la Porta del Moll y las vistas desde lo alto de la muralla. Los domingos y martes hay mercado con productos locales.</p>

<h2>3. Cap de Formentor</h2>
<p>A menos de una hora en coche desde Alcúdia, el Cap de Formentor ofrece acantilados espectaculares, calas escondidas y el faro más fotografiado de Mallorca. La carretera es una experiencia en sí misma, con miradores que quitan el aliento. Recomendable ir a primera hora para evitar aglomeraciones.</p>

<h2>4. Deportes acuáticos</h2>
<p>La bahía de Alcúdia es un paraíso para los deportes náuticos. Desde paddle surf y kayak hasta windsurf y kitesurf, hay opciones para todos los niveles. Varios centros en la playa ofrecen alquiler de material y clases. El snorkel en las zonas rocosas del norte revela una vida marina sorprendente.</p>

<h2>5. Ciclismo por el norte de Mallorca</h2>
<p>Alcúdia es un punto de partida privilegiado para rutas en bicicleta. La zona llana del puerto es perfecta para paseos familiares, mientras que las carreteras hacia la sierra de Tramuntana ofrecen desafíos para ciclistas experimentados. Hay numerosas empresas de alquiler de bicicletas en la zona.</p>

<h2>6. El parque natural de s'Albufera</h2>
<p>El humedal más grande de las Islas Baleares está a las afueras de Alcúdia. S'Albufera es un paraíso para los amantes de la naturaleza y la ornitología, con rutas señalizadas que permiten observar más de 200 especies de aves. La entrada es gratuita y el parque abre de 9:00 a 18:00.</p>

<h2>7. Cenar en Hiru Food &amp; Drinks</h2>
<p>Para una experiencia gastronómica que va más allá de lo convencional, <a href="/hiru">Hiru Food &amp; Drinks</a> en Ctra. d'Artà 40 ofrece cocina mallorquina a la brasa con producto fresco: carnes maduradas, arroces de lonja y pescados del Mediterráneo. Con una valoración de 4.9/5 en Google, es una de las mejores mesas de la zona.</p>

<h2>8. Cócteles y shisha al atardecer</h2>
<p>El ritual perfecto para la transición del día a la noche. <a href="/enjoy">Enjoy Terrace</a>, en Av. Tucán 1, abre a las 17:00 y ofrece una carta de cócteles de autor y shisha premium con vistas privilegiadas. Es el plan ideal para disfrutar del atardecer mallorquín con una copa en la mano.</p>

<h2>9. Vida nocturna en Outxide Club</h2>
<p>Para los amantes del clubbing, <a href="/outxide">Outxide Club</a> abre de jueves a sábado a partir de las 23:00 con DJs nacionales e internacionales, producción visual de primer nivel y opciones VIP. Las entradas se pueden comprar online a través de FourVenues o en la puerta.</p>

<h2>10. Mercados locales y compras</h2>
<p>Los mercados de Alcúdia son una inmersión en la cultura local. El mercado de los domingos y martes en el casco antiguo ofrece productos frescos, artesanía y souvenirs. Para compras más variadas, la zona comercial de Port d'Alcúdia tiene tiendas de moda, deportes y recuerdos.</p>

<h2>Alcúdia: un destino completo</h2>
<p>Lo que hace especial a Alcúdia es que concentra todo lo que buscas en unas vacaciones en Mallorca: playa, naturaleza, cultura, gastronomía y ocio nocturno. Cada día puede ser diferente, y la transición de planes diurnos a nocturnos es tan natural como dar un paseo por el puerto. Con los tres espacios de <a href="/">Grupo Enjoy</a> (Hiru Food &amp; Drinks, Enjoy Terrace y Outxide Club), las noches están resueltas.</p>`,
      en: `<p>Alcudia is one of the most complete destinations in Mallorca. Located in the north of the island, this town combines nature, history, gastronomy and nightlife within a surprisingly compact radius. Here are the 10 must-do activities if you are visiting Alcudia.</p>

<h2>1. Alcudia Beach</h2>
<p>With over 7 km of fine sand and crystal-clear waters, Alcudia beach is one of the longest in Mallorca. Its gentle slope makes it perfect for families, while the quieter northern section is ideal for those seeking relaxation. The months from June to September offer perfect swimming conditions.</p>

<h2>2. The medieval old town</h2>
<p>Historic Alcudia, within its 14th-century medieval walls, is a labyrinth of narrow streets, charming squares and stone buildings. Do not miss the Sant Jaume church, Porta del Moll gateway and the views from the top of the wall. Sundays and Tuesdays bring a market with local products.</p>

<h2>3. Cap de Formentor</h2>
<p>Less than an hour's drive from Alcudia, Cap de Formentor offers spectacular cliffs, hidden coves and Mallorca's most photographed lighthouse. The road itself is an experience, with breathtaking viewpoints. Recommended to visit early to avoid crowds.</p>

<h2>4. Water sports</h2>
<p>Alcudia Bay is a paradise for water sports. From stand-up paddleboarding and kayaking to windsurfing and kitesurfing, there are options for all levels. Several centres on the beach offer equipment hire and lessons. Snorkelling in the rocky areas to the north reveals surprising marine life.</p>

<h2>5. Cycling in northern Mallorca</h2>
<p>Alcudia is a prime starting point for cycling routes. The flat area around the port is perfect for family rides, while the roads towards the Serra de Tramuntana offer challenges for experienced cyclists. Numerous bike hire shops operate in the area.</p>

<h2>6. S'Albufera Nature Reserve</h2>
<p>The largest wetland in the Balearic Islands lies just outside Alcudia. S'Albufera is a paradise for nature lovers and birdwatchers, with marked trails offering sightings of over 200 bird species. Entry is free and the park opens from 9:00 to 18:00.</p>

<h2>7. Dinner at Hiru Food &amp; Drinks</h2>
<p>For a gastronomic experience beyond the ordinary, <a href="/hiru">Hiru Food &amp; Drinks</a> at Ctra. d'Arta 40 serves Mallorcan charcoal grill cuisine with fresh produce: aged meats, market-fresh rice dishes and Mediterranean fish. Rated 4.9/5 on Google, it is one of the best tables in the area.</p>

<h2>8. Cocktails and shisha at sunset</h2>
<p>The perfect ritual for the day-to-night transition. <a href="/enjoy">Enjoy Terrace</a>, at Av. Tucan 1, opens at 17:00 and offers a signature cocktail menu and premium shisha in a privileged setting. It is the ideal plan for enjoying a Mallorcan sunset with a drink in hand.</p>

<h2>9. Nightlife at Outxide Club</h2>
<p>For clubbing lovers, <a href="/outxide">Outxide Club</a> opens Thursday to Saturday from 23:00 with national and international DJs, top-tier visual production and VIP options. Tickets can be purchased online through FourVenues or at the door.</p>

<h2>10. Local markets and shopping</h2>
<p>Alcudia's markets are an immersion in local culture. The Sunday and Tuesday market in the old town offers fresh produce, crafts and souvenirs. For more varied shopping, Port d'Alcudia's commercial area has fashion, sports and gift shops.</p>

<h2>Alcudia: a complete destination</h2>
<p>What makes Alcudia special is that it concentrates everything you look for on a Mallorca holiday: beach, nature, culture, gastronomy and nightlife. Every day can be different, and the transition from daytime to evening plans is as natural as a stroll along the port. With <a href="/">Grupo Enjoy</a>'s three venues (<a href="/hiru">Hiru Food &amp; Drinks</a>, <a href="/enjoy">Enjoy Terrace</a> and <a href="/outxide">Outxide Club</a>), your evenings are sorted.</p>`,
      de: `<p>Alcudia ist eines der vielseitigsten Reiseziele auf Mallorca. Im Norden der Insel gelegen, vereint dieser Ort Natur, Geschichte, Gastronomie und Nachtleben auf überraschend kompaktem Raum. Hier sind die 10 unverzichtbaren Aktivitäten, wenn du Alcudia besuchst.</p>

<h2>1. Der Strand von Alcudia</h2>
<p>Mit über 7 km feinem Sand und kristallklarem Wasser ist der Strand von Alcudia einer der längsten auf Mallorca. Seine sanfte Neigung macht ihn perfekt für Familien, während der ruhigere nördliche Abschnitt ideal für Erholungssuchende ist. Die Monate Juni bis September bieten perfekte Badebedingungen.</p>

<h2>2. Die mittelalterliche Altstadt</h2>
<p>Das historische Alcudia innerhalb der mittelalterlichen Mauern aus dem 14. Jahrhundert ist ein Labyrinth aus engen Gassen, charmanten Plätzen und Steingebäuden. Verpasse nicht die Kirche Sant Jaume, das Tor Porta del Moll und den Blick von der Mauerkrone. Sonntags und dienstags gibt es einen Markt mit lokalen Produkten.</p>

<h2>3. Cap de Formentor</h2>
<p>Weniger als eine Autostunde von Alcudia entfernt bietet das Cap de Formentor spektakuläre Klippen, versteckte Buchten und den meistfotografierten Leuchtturm Mallorcas. Die Straße ist ein Erlebnis für sich, mit atemberaubenden Aussichtspunkten. Empfehlenswert ist ein Besuch am frühen Morgen, um Menschenmengen zu vermeiden.</p>

<h2>4. Wassersport</h2>
<p>Die Bucht von Alcudia ist ein Paradies für Wassersportler. Von Stand-Up-Paddling und Kajakfahren bis zu Windsurfen und Kitesurfen gibt es Angebote für alle Niveaus. Mehrere Zentren am Strand bieten Materialverleih und Kurse an. Schnorcheln in den felsigen Bereichen im Norden offenbart eine erstaunliche Unterwasserwelt.</p>

<h2>5. Radfahren im Norden Mallorcas</h2>
<p>Alcudia ist ein erstklassiger Ausgangspunkt für Radtouren. Die flache Gegend rund um den Hafen ist perfekt für Familienausflüge, während die Straßen Richtung Serra de Tramuntana Herausforderungen für erfahrene Radfahrer bieten. In der Gegend gibt es zahlreiche Fahrradverleihe.</p>

<h2>6. Der Naturpark S'Albufera</h2>
<p>Das größte Feuchtgebiet der Balearen liegt direkt vor den Toren Alcudias. S'Albufera ist ein Paradies für Naturliebhaber und Vogelbeobachter, mit markierten Wegen, auf denen über 200 Vogelarten gesichtet werden können. Der Eintritt ist frei und der Park ist von 9:00 bis 18:00 Uhr geöffnet.</p>

<h2>7. Abendessen bei Hiru Food &amp; Drinks</h2>
<p>Für ein gastronomisches Erlebnis jenseits des Gewöhnlichen bietet <a href="/hiru">Hiru Food &amp; Drinks</a> in der Ctra. d'Artà 40 mallorquinische Grillküche mit frischen Zutaten: gereiftes Fleisch, Reisgerichte vom Fischmarkt und mediterrane Fische. Mit einer Bewertung von 4.9/5 bei Google gehört es zu den besten Tischen der Gegend.</p>

<h2>8. Cocktails und Shisha bei Sonnenuntergang</h2>
<p>Das perfekte Ritual für den Übergang vom Tag in die Nacht. <a href="/enjoy">Enjoy Terrace</a> in der Av. Tucán 1 öffnet um 17:00 Uhr und bietet eine Karte mit Signature-Cocktails und Premium-Shisha in privilegierter Lage. Der ideale Plan, um den mallorquinischen Sonnenuntergang mit einem Drink in der Hand zu genießen.</p>

<h2>9. Nachtleben im Outxide Club</h2>
<p>Für Clubbing-Fans öffnet <a href="/outxide">Outxide Club</a> von Donnerstag bis Samstag ab 23:00 Uhr mit nationalen und internationalen DJs, erstklassiger visueller Produktion und VIP-Optionen. Tickets können online über FourVenues oder an der Abendkasse gekauft werden.</p>

<h2>10. Lokale Märkte und Shopping</h2>
<p>Die Märkte von Alcudia sind ein Eintauchen in die lokale Kultur. Der Sonntags- und Dienstagsmarkt in der Altstadt bietet frische Produkte, Kunsthandwerk und Souvenirs. Für ein breiteres Einkaufsangebot hat das Geschäftsviertel von Port d'Alcudia Mode-, Sport- und Geschenkeläden.</p>

<h2>Alcudia: ein komplettes Reiseziel</h2>
<p>Was Alcudia besonders macht, ist dass es alles vereint, was man im Mallorca-Urlaub sucht: Strand, Natur, Kultur, Gastronomie und Nachtleben. Jeder Tag kann anders sein, und der Übergang von Tages- zu Abendplänen ist so natürlich wie ein Spaziergang am Hafen. Mit den drei Locations von <a href="/">Grupo Enjoy</a> (Hiru Food &amp; Drinks, Enjoy Terrace und Outxide Club) sind deine Abende bestens versorgt.</p>`,
      fr: `<p>Alcudia est l'une des destinations les plus completes de Majorque. Situee dans le nord de l'ile, cette localite combine nature, histoire, gastronomie et vie nocturne dans un rayon etonnamment compact. Voici les 10 activites incontournables si vous visitez Alcudia.</p>

<h2>1. La plage d'Alcudia</h2>
<p>Avec plus de 7 km de sable fin et d'eaux cristallines, la plage d'Alcudia est l'une des plus etendues de Majorque. Sa pente douce la rend parfaite pour les familles, tandis que la partie nord, plus tranquille, est ideale pour ceux qui cherchent la detente. Les mois de juin a septembre offrent des conditions parfaites pour la baignade.</p>

<h2>2. La vieille ville medievale</h2>
<p>L'Alcudia historique, a l'interieur de ses remparts medievaux du XIVe siecle, est un labyrinthe de ruelles etroites, de places charmantes et de batiments en pierre. Ne manquez pas l'eglise de Sant Jaume, la Porta del Moll et les vues depuis le sommet des remparts. Les dimanches et mardis, un marche propose des produits locaux.</p>

<h2>3. Cap de Formentor</h2>
<p>A moins d'une heure de route d'Alcudia, le Cap de Formentor offre des falaises spectaculaires, des criques cachees et le phare le plus photographie de Majorque. La route est une experience en soi, avec des belvederes a couper le souffle. Il est recommande d'y aller tot le matin pour eviter la foule.</p>

<h2>4. Sports nautiques</h2>
<p>La baie d'Alcudia est un paradis pour les sports nautiques. Du paddle et du kayak a la planche a voile et au kitesurf, il y a des options pour tous les niveaux. Plusieurs centres sur la plage proposent la location de materiel et des cours. Le snorkeling dans les zones rocheuses du nord revele une vie marine surprenante.</p>

<h2>5. Cyclisme dans le nord de Majorque</h2>
<p>Alcudia est un point de depart privilegie pour les circuits a velo. La zone plate du port est parfaite pour les balades en famille, tandis que les routes vers la Serra de Tramuntana offrent des defis pour les cyclistes experimentes. De nombreuses entreprises de location de velos sont presentes dans la zone.</p>

<h2>6. Le parc naturel de S'Albufera</h2>
<p>La plus grande zone humide des iles Baleares se trouve aux portes d'Alcudia. S'Albufera est un paradis pour les amoureux de la nature et de l'ornithologie, avec des sentiers balises permettant d'observer plus de 200 especes d'oiseaux. L'entree est gratuite et le parc est ouvert de 9h00 a 18h00.</p>

<h2>7. Diner a Hiru Food &amp; Drinks</h2>
<p>Pour une experience gastronomique qui va au-dela du conventionnel, <a href="/hiru">Hiru Food &amp; Drinks</a> au Ctra. d'Arta 40 propose une cuisine majorquine au grill avec des produits frais : viandes maturees, riz de la criee et poissons de Mediterranee. Avec une note de 4.9/5 sur Google, c'est l'une des meilleures tables de la region.</p>

<h2>8. Cocktails et chicha au coucher du soleil</h2>
<p>Le rituel parfait pour la transition du jour a la nuit. <a href="/enjoy">Enjoy Terrace</a>, au Av. Tucan 1, ouvre a 17h00 et propose une carte de cocktails signatures et une chicha premium dans un cadre privilegie. C'est le plan ideal pour profiter du coucher de soleil majorquin un verre a la main.</p>

<h2>9. Vie nocturne a Outxide Club</h2>
<p>Pour les amateurs de clubbing, <a href="/outxide">Outxide Club</a> ouvre du jeudi au samedi a partir de 23h00 avec des DJs nationaux et internationaux, une production visuelle haut de gamme et des options VIP. Les billets peuvent etre achetes en ligne via FourVenues ou sur place.</p>

<h2>10. Marches locaux et shopping</h2>
<p>Les marches d'Alcudia sont une immersion dans la culture locale. Le marche des dimanches et mardis dans la vieille ville propose des produits frais, de l'artisanat et des souvenirs. Pour des achats plus varies, la zone commerciale de Port d'Alcudia offre des boutiques de mode, de sport et de souvenirs.</p>

<h2>Alcudia : une destination complete</h2>
<p>Ce qui rend Alcudia speciale, c'est qu'elle concentre tout ce que l'on recherche pour des vacances a Majorque : plage, nature, culture, gastronomie et loisirs nocturnes. Chaque jour peut etre different, et la transition des activites diurnes aux sorties nocturnes est aussi naturelle qu'une promenade le long du port. Avec les trois espaces de <a href="/">Grupo Enjoy</a> (Hiru Food &amp; Drinks, Enjoy Terrace et Outxide Club), vos soirees sont assurees.</p>`,
      it: `<p>Alcudia e' una delle destinazioni piu' complete di Maiorca. Situata nel nord dell'isola, questa localita' combina natura, storia, gastronomia e vita notturna in un raggio sorprendentemente compatto. Ecco le 10 attivita' imperdibili se visiti Alcudia.</p>

<h2>1. La spiaggia di Alcudia</h2>
<p>Con piu' di 7 km di sabbia fine e acque cristalline, la spiaggia di Alcudia e' una delle piu' estese di Maiorca. La sua pendenza dolce la rende perfetta per le famiglie, mentre la zona nord, piu' tranquilla, e' ideale per chi cerca relax. I mesi da giugno a settembre offrono condizioni perfette per fare il bagno.</p>

<h2>2. Il centro storico medievale</h2>
<p>L'Alcudia storica, all'interno delle mura medievali del XIV secolo, e' un labirinto di stradine, piazze incantevoli e edifici in pietra. Da non perdere la chiesa di Sant Jaume, la Porta del Moll e la vista dall'alto delle mura. La domenica e il martedi' c'e' il mercato con prodotti locali.</p>

<h2>3. Cap de Formentor</h2>
<p>A meno di un'ora di macchina da Alcudia, il Cap de Formentor offre scogliere spettacolari, calette nascoste e il faro piu' fotografato di Maiorca. La strada stessa e' un'esperienza, con belvedere mozzafiato. Si consiglia di andare la mattina presto per evitare la folla.</p>

<h2>4. Sport acquatici</h2>
<p>La baia di Alcudia e' un paradiso per gli sport nautici. Dal paddle surf e kayak al windsurf e kitesurf, ci sono opzioni per tutti i livelli. Diversi centri sulla spiaggia offrono noleggio attrezzatura e lezioni. Lo snorkeling nelle zone rocciose del nord rivela una vita marina sorprendente.</p>

<h2>5. Ciclismo nel nord di Maiorca</h2>
<p>Alcudia e' un punto di partenza privilegiato per percorsi in bicicletta. La zona pianeggiante del porto e' perfetta per passeggiate in famiglia, mentre le strade verso la Serra de Tramuntana offrono sfide per ciclisti esperti. Nella zona ci sono numerose attivita' di noleggio biciclette.</p>

<h2>6. Il parco naturale di s'Albufera</h2>
<p>La zona umida piu' grande delle Isole Baleari si trova alle porte di Alcudia. S'Albufera e' un paradiso per gli amanti della natura e del birdwatching, con percorsi segnalati che permettono di osservare piu' di 200 specie di uccelli. L'ingresso e' gratuito e il parco e' aperto dalle 9:00 alle 18:00.</p>

<h2>7. Cena da Hiru Food &amp; Drinks</h2>
<p>Per un'esperienza gastronomica che va oltre il convenzionale, <a href="/hiru">Hiru Food &amp; Drinks</a> in Ctra. d'Arta 40 offre cucina maiorchina alla brace con prodotto fresco: carni frollate, risi del mercato e pesci del Mediterraneo. Con una valutazione di 4.9/5 su Google, e' una delle migliori tavole della zona.</p>

<h2>8. Cocktail e shisha al tramonto</h2>
<p>Il rituale perfetto per la transizione dal giorno alla notte. <a href="/enjoy">Enjoy Terrace</a>, in Av. Tucan 1, apre alle 17:00 e offre una carta di cocktail d'autore e shisha premium in una location privilegiata. E' il piano ideale per godersi il tramonto maiorchino con un drink in mano.</p>

<h2>9. Vita notturna all'Outxide Club</h2>
<p>Per gli amanti del clubbing, <a href="/outxide">Outxide Club</a> apre da giovedi' a sabato a partire dalle 23:00 con DJ nazionali e internazionali, produzione visiva di primo livello e opzioni VIP. I biglietti si possono acquistare online tramite FourVenues o alla porta.</p>

<h2>10. Mercati locali e shopping</h2>
<p>I mercati di Alcudia sono un'immersione nella cultura locale. Il mercato della domenica e del martedi' nel centro storico offre prodotti freschi, artigianato e souvenir. Per acquisti piu' vari, la zona commerciale di Port d'Alcudia ha negozi di moda, sport e articoli da regalo.</p>

<h2>Alcudia: una destinazione completa</h2>
<p>Cio' che rende speciale Alcudia e' che concentra tutto cio' che cerchi in una vacanza a Maiorca: spiaggia, natura, cultura, gastronomia e divertimento notturno. Ogni giorno puo' essere diverso, e la transizione dai programmi diurni a quelli serali e' naturale come una passeggiata al porto. Con i tre spazi di <a href="/">Grupo Enjoy</a> (Hiru Food &amp; Drinks, Enjoy Terrace e Outxide Club), le serate sono assicurate.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-22",
    image: "/images/enjoy/488868117_1397746394961697_7225834553688619345_n.jpg",
    tags: ["alcudia", "mallorca", "activities", "guide"],
    venue: "general",
    readingTime: 6,
  },

  // ── NEW POSTS ──────────────────────────────────────────────────────────

  {
    slug: "mejores-discotecas-clubs-alcudia",
    title: {
      es: "Mejores Discotecas y Clubs en Alcúdia, Mallorca",
      en: "Best Nightclubs and Clubs in Alcudia, Mallorca",
      de: "Die besten Nachtclubs und Diskotheken in Alcudia, Mallorca",
      fr: "Meilleures Discotheques et Clubs a Alcudia, Majorque",
      it: "Le Migliori Discoteche e Club ad Alcudia, Maiorca",
    },
    excerpt: {
      es: "Descubre las mejores discotecas de Alcúdia y Port d'Alcúdia. Guía completa con horarios, códigos de vestimenta, mejores noches y cómo conseguir entradas.",
      en: "Discover the best nightclubs in Alcudia and Port d'Alcudia. Complete guide with hours, dress codes, best nights and how to get tickets.",
      de: "Entdecke die besten Nachtclubs in Alcudia und Port d'Alcudia. Kompletter Guide mit Öffnungszeiten, Dresscodes, besten Abenden und Ticketkauf.",
      fr: "Decouvrez les meilleures discotheques d'Alcudia et Port d'Alcudia. Guide complet avec horaires, codes vestimentaires, meilleures soirees et comment obtenir des billets.",
      it: "Scopri le migliori discoteche di Alcudia e Port d'Alcudia. Guida completa con orari, dress code, serate migliori e come acquistare i biglietti.",
    },
    content: {
      es: `<p>Port d'Alcúdia es el epicentro de la vida nocturna del norte de Mallorca. Mientras que Palma y Magaluf acaparan la atención mediática, los que conocen bien la isla saben que Alcúdia ofrece una escena de clubs más exclusiva, con mejor sonido y un público internacional que busca calidad sobre cantidad. Si estás planificando una noche de discoteca en Alcúdia, esta guía te lo cuenta todo.</p>

<h2>Outxide Club: la referencia del clubbing en el norte</h2>
<p><a href="/outxide">Outxide Club</a>, situado en Av. Tucán 1, Port d'Alcúdia, es sin duda el club más destacado de toda la zona norte de Mallorca. Abre de jueves a sábado a partir de las 23:00 durante la temporada de mayo a octubre. Lo que lo diferencia del resto es la combinación de un sistema de sonido profesional de primer nivel, una producción visual espectacular con juegos de luces y LED, y una programación de DJs que incluye tanto talento nacional como nombres internacionales.</p>

<h3>Mejores noches en Outxide Club</h3>
<ul>
<li><strong>Jueves:</strong> noche de apertura semanal, ambiente más relajado, ideal para empezar el fin de semana temprano</li>
<li><strong>Viernes:</strong> la noche más internacional, con público de toda Europa que llena la pista</li>
<li><strong>Sábado:</strong> la gran noche. Eventos temáticos, DJs especiales y la pista a reventar</li>
</ul>

<h3>Código de vestimenta y entradas</h3>
<p>Outxide Club aplica una política <strong>smart casual</strong>: prohibida la ropa de playa, chanclas y camisetas de tirantes. Las entradas se pueden adquirir con antelación en <strong>FourVenues</strong>, la plataforma oficial, lo que suele garantizar mejor precio y acceso directo. También se venden en la puerta.</p>

<h2>La zona de Dollar Street y Av. Tucán</h2>
<p>La Av. Tucán, conocida coloquialmente como Dollar Street, es el eje del ocio nocturno en Port d'Alcúdia. A lo largo de esta calle y sus alrededores encontrarás bares, terrazas y locales de copas que crean un ambiente animado desde las primeras horas de la noche. Es la zona perfecta para ir de bar en bar antes de entrar en un club.</p>

<h2>Antes del club: cócteles en Enjoy Terrace</h2>
<p>La mejor forma de empezar la noche es en <a href="/enjoy">Enjoy Terrace</a>, justo al lado de Outxide Club. Abre desde las 17:00 con cócteles de autor, shisha premium y un ambiente que va subiendo de intensidad. Muchos combinan una sesión de terraza con la entrada al club a partir de las 23:00, la transición más natural de la noche alcudiense.</p>

<h2>Cenar antes de salir</h2>
<p>Si buscas cenar antes de la discoteca, <a href="/hiru">Hiru Food &amp; Drinks</a> en Ctra. d'Artà 40 sirve cenas hasta las 23:30 entre semana y hasta la 1:00 los viernes y sábados. Su cocina a la brasa con carnes maduradas y arroces de lonja es la opción perfecta para cargar energías antes de la noche.</p>

<h2>Consejos prácticos para salir de noche en Alcúdia</h2>
<ul>
<li><strong>Transporte:</strong> la zona de ocio es compacta y se recorre a pie. Taxis disponibles hasta la madrugada</li>
<li><strong>Horarios:</strong> los clubs suelen cerrar entre las 5:00 y las 6:00. La noche empieza tarde, no llegues antes de las 00:00</li>
<li><strong>Entradas:</strong> comprar online siempre es más barato y evitas colas</li>
<li><strong>Efectivo y tarjeta:</strong> la mayoría de locales aceptan tarjeta, pero lleva algo de efectivo por si acaso</li>
<li><strong>Temporada:</strong> la temporada fuerte va de junio a septiembre, pero mayo y octubre también tienen buena programación</li>
</ul>

<h2>Por qué elegir Alcúdia sobre el sur de Mallorca</h2>
<p>Alcúdia ofrece una alternativa más sofisticada al sur de la isla. Menos masificación, mejor calidad en la oferta de ocio y un entorno natural privilegiado hacen que cada vez más turistas elijan el norte para sus noches de fiesta. Además, la proximidad de todo, desde la playa hasta la discoteca, hace que la experiencia sea cómoda y sin complicaciones.</p>`,
      en: `<p>Port d'Alcudia is the epicentre of nightlife in northern Mallorca. While Palma and Magaluf grab the media spotlight, those who know the island well understand that Alcudia offers a more exclusive club scene, with better sound and an international crowd that values quality over quantity. If you are planning a club night in Alcudia, this guide covers everything.</p>

<h2>Outxide Club: the clubbing benchmark in the north</h2>
<p><a href="/outxide">Outxide Club</a>, located at Av. Tucan 1, Port d'Alcudia, is without question the standout club in all of northern Mallorca. It opens Thursday to Saturday from 23:00 during the May to October season. What sets it apart is the combination of a top-tier professional sound system, spectacular visual production with lighting rigs and LED displays, and a DJ programme that features both national talent and international names.</p>

<h3>Best nights at Outxide Club</h3>
<ul>
<li><strong>Thursday:</strong> the weekly opener, a more relaxed vibe, perfect for starting the weekend early</li>
<li><strong>Friday:</strong> the most international night, with visitors from all over Europe filling the dance floor</li>
<li><strong>Saturday:</strong> the big night. Themed events, special DJs and a packed house</li>
</ul>

<h3>Dress code and tickets</h3>
<p>Outxide Club enforces a <strong>smart casual</strong> policy: beachwear, flip-flops and vest tops are not allowed. Tickets can be purchased in advance on <strong>FourVenues</strong>, the official platform, which usually guarantees a better price and direct entry. They are also sold at the door.</p>

<h2>The Dollar Street and Av. Tucan area</h2>
<p>Av. Tucan, colloquially known as Dollar Street, is the main nightlife axis in Port d'Alcudia. Along this street and its surroundings you will find bars, terraces and late-night venues that create a lively atmosphere from the early evening hours. It is the perfect area for bar-hopping before heading to a club.</p>

<h2>Before the club: cocktails at Enjoy Terrace</h2>
<p>The best way to start the night is at <a href="/enjoy">Enjoy Terrace</a>, right next to Outxide Club. It opens from 17:00 with signature cocktails, premium shisha and an atmosphere that builds in intensity. Many combine a terrace session with club entry from 23:00 onwards, the most natural transition of the Alcudia night.</p>

<h2>Dinner before going out</h2>
<p>If you want dinner before the club, <a href="/hiru">Hiru Food &amp; Drinks</a> at Ctra. d'Arta 40 serves dinner until 23:30 on weekdays and until 1:00 on Fridays and Saturdays. Their charcoal grill cuisine with aged meats and market-fresh rice dishes is the perfect way to fuel up before the night ahead.</p>

<h2>Practical tips for a night out in Alcudia</h2>
<ul>
<li><strong>Transport:</strong> the nightlife zone is compact and walkable. Taxis run until the early hours</li>
<li><strong>Hours:</strong> clubs usually close between 5:00 and 6:00. The night starts late, so do not arrive before midnight</li>
<li><strong>Tickets:</strong> buying online is always cheaper and avoids queues</li>
<li><strong>Cash and card:</strong> most venues accept cards, but carry some cash just in case</li>
<li><strong>Season:</strong> peak season runs from June to September, but May and October also have solid programming</li>
</ul>

<h2>Why choose Alcudia over the south of Mallorca</h2>
<p>Alcudia offers a more sophisticated alternative to the south of the island. Less overcrowding, higher quality nightlife and a privileged natural setting mean that more and more tourists are choosing the north for their party nights. Plus, the proximity of everything, from the beach to the club, makes the experience comfortable and hassle-free.</p>`,
      de: `<p>Port d'Alcudia ist das Zentrum des Nachtlebens im Norden Mallorcas. Während Palma und Magaluf die meiste Aufmerksamkeit bekommen, wissen Kenner der Insel, dass Alcudia eine exklusivere Clubszene bietet -- mit besserem Sound und einem internationalen Publikum, das Qualität über Quantität stellt. Wenn du einen Clubabend in Alcudia planst, findest du hier alles Wichtige.</p>

<h2>Outxide Club: die Clubbing-Referenz im Norden</h2>
<p><a href="/outxide">Outxide Club</a> in der Av. Tucán 1, Port d'Alcudia, ist zweifellos der herausragende Club im gesamten Norden Mallorcas. Er öffnet von Donnerstag bis Samstag ab 23:00 Uhr während der Saison von Mai bis Oktober. Was ihn auszeichnet, ist die Kombination aus einer erstklassigen professionellen Soundanlage, spektakulärer visueller Produktion mit Lichtshows und LED-Displays sowie einem DJ-Programm mit nationalen und internationalen Namen.</p>

<h3>Die besten Nächte im Outxide Club</h3>
<ul>
<li><strong>Donnerstag:</strong> Wochenauftakt mit entspannter Atmosphäre, perfekt um das Wochenende früh einzuläuten</li>
<li><strong>Freitag:</strong> die internationalste Nacht, Besucher aus ganz Europa füllen die Tanzfläche</li>
<li><strong>Samstag:</strong> die große Nacht. Themenevents, Special-DJs und ein volles Haus</li>
</ul>

<h3>Dresscode und Tickets</h3>
<p>Im Outxide Club gilt <strong>Smart Casual</strong>: Strandkleidung, Flip-Flops und Tanktops sind nicht erlaubt. Tickets kannst du vorab über <strong>FourVenues</strong>, die offizielle Plattform, kaufen -- das garantiert meist einen besseren Preis und direkten Einlass. Karten gibt es auch an der Abendkasse.</p>

<h2>Die Dollar Street und die Av. Tucán</h2>
<p>Die Av. Tucán, umgangssprachlich als Dollar Street bekannt, ist die Hauptachse des Nachtlebens in Port d'Alcudia. Entlang dieser Straße und in der Umgebung findest du Bars, Terrassen und Nachtlokale, die ab den frühen Abendstunden für Stimmung sorgen. Ideal für Bar-Hopping, bevor es in den Club geht.</p>

<h2>Vor dem Club: Cocktails in der Enjoy Terrace</h2>
<p>Der beste Einstieg in die Nacht ist die <a href="/enjoy">Enjoy Terrace</a> direkt neben dem Outxide Club. Ab 17:00 Uhr gibt es Signature-Cocktails, Premium-Shisha und eine Atmosphäre, die sich stetig steigert. Viele kombinieren einen Terrassenabend mit dem Clubeintritt ab 23:00 -- der natürlichste Übergang der Nacht in Alcudia.</p>

<h2>Abendessen vor dem Ausgehen</h2>
<p>Wenn du vor der Disco essen möchtest, serviert <a href="/hiru">Hiru Food &amp; Drinks</a> in der Ctra. d'Artà 40 unter der Woche bis 23:30 Uhr und freitags und samstags bis 1:00 Uhr. Die Grillküche mit gereiftem Fleisch und frischen Reisgerichten ist die perfekte Stärkung für die Nacht.</p>

<h2>Praktische Tipps für eine Partynacht in Alcudia</h2>
<ul>
<li><strong>Transport:</strong> das Ausgehviertel ist kompakt und gut zu Fuß erreichbar. Taxis fahren bis in die frühen Morgenstunden</li>
<li><strong>Öffnungszeiten:</strong> Clubs schließen meist zwischen 5:00 und 6:00 Uhr. Die Nacht startet spät -- komm nicht vor Mitternacht</li>
<li><strong>Tickets:</strong> Online-Kauf ist immer günstiger und erspart Warteschlangen</li>
<li><strong>Bezahlung:</strong> die meisten Lokale akzeptieren Karten, aber nimm etwas Bargeld mit</li>
<li><strong>Saison:</strong> Hochsaison ist Juni bis September, aber auch Mai und Oktober bieten gutes Programm</li>
</ul>

<h2>Warum Alcudia statt dem Süden Mallorcas?</h2>
<p>Alcudia bietet eine anspruchsvollere Alternative zum Süden der Insel. Weniger Massentourismus, höhere Qualität im Nachtleben und eine privilegierte Naturkulisse sorgen dafür, dass immer mehr Urlauber den Norden für ihre Partynächte wählen. Außerdem macht die Nähe von allem -- vom Strand bis zum Club -- das Erlebnis unkompliziert und angenehm.</p>`,
      fr: `<p>Port d'Alcudia est l'epicentre de la vie nocturne du nord de Majorque. Tandis que Palma et Magaluf captent l'attention mediatique, les connaisseurs de l'ile savent qu'Alcudia offre une scene de clubs plus exclusive, avec un meilleur son et un public international qui privilegie la qualite a la quantite. Si vous planifiez une soiree en discotheque a Alcudia, ce guide vous dit tout.</p>

<h2>Outxide Club : la reference du clubbing dans le nord</h2>
<p><a href="/outxide">Outxide Club</a>, situe au Av. Tucan 1, Port d'Alcudia, est sans conteste le club le plus remarquable de tout le nord de Majorque. Il ouvre du jeudi au samedi a partir de 23h00 pendant la saison de mai a octobre. Ce qui le distingue du reste, c'est la combinaison d'un systeme son professionnel haut de gamme, d'une production visuelle spectaculaire avec jeux de lumieres et LED, et d'une programmation de DJs incluant aussi bien des talents nationaux que des noms internationaux.</p>

<h3>Meilleures soirees a Outxide Club</h3>
<ul>
<li><strong>Jeudi :</strong> soiree d'ouverture hebdomadaire, ambiance plus detendue, ideale pour commencer le week-end en avance</li>
<li><strong>Vendredi :</strong> la soiree la plus internationale, avec un public venu de toute l'Europe qui remplit la piste</li>
<li><strong>Samedi :</strong> la grande soiree. Evenements thematiques, DJs speciaux et piste de danse bondee</li>
</ul>

<h3>Code vestimentaire et billets</h3>
<p>Outxide Club applique une politique <strong>smart casual</strong> : les vetements de plage, tongs et debardeurs sont interdits. Les billets peuvent etre achetes a l'avance sur <strong>FourVenues</strong>, la plateforme officielle, ce qui garantit generalement un meilleur tarif et un acces direct. Ils sont egalement en vente sur place.</p>

<h2>La zone de Dollar Street et Av. Tucan</h2>
<p>L'Av. Tucan, connue familierement sous le nom de Dollar Street, est l'axe principal des loisirs nocturnes a Port d'Alcudia. Le long de cette rue et dans ses environs, vous trouverez des bars, des terrasses et des etablissements de nuit qui creent une ambiance animee des les premieres heures de la soiree. C'est la zone parfaite pour aller de bar en bar avant d'entrer en club.</p>

<h2>Avant le club : cocktails a Enjoy Terrace</h2>
<p>La meilleure facon de commencer la soiree est a <a href="/enjoy">Enjoy Terrace</a>, juste a cote d'Outxide Club. Ouvert des 17h00 avec des cocktails signatures, une chicha premium et une ambiance qui monte en intensite. Beaucoup combinent une session en terrasse avec l'entree au club a partir de 23h00, la transition la plus naturelle de la nuit a Alcudia.</p>

<h2>Diner avant de sortir</h2>
<p>Si vous cherchez a diner avant la discotheque, <a href="/hiru">Hiru Food &amp; Drinks</a> au Ctra. d'Arta 40 sert le diner jusqu'a 23h30 en semaine et jusqu'a 1h00 les vendredis et samedis. Sa cuisine au grill avec viandes maturees et riz de la criee est l'option parfaite pour faire le plein d'energie avant la nuit.</p>

<h2>Conseils pratiques pour sortir la nuit a Alcudia</h2>
<ul>
<li><strong>Transport :</strong> la zone de loisirs est compacte et se parcourt a pied. Taxis disponibles jusqu'au petit matin</li>
<li><strong>Horaires :</strong> les clubs ferment generalement entre 5h00 et 6h00. La nuit commence tard, n'arrivez pas avant minuit</li>
<li><strong>Billets :</strong> acheter en ligne est toujours moins cher et evite les files d'attente</li>
<li><strong>Especes et carte :</strong> la plupart des etablissements acceptent la carte, mais prevoyez un peu d'especes au cas ou</li>
<li><strong>Saison :</strong> la haute saison va de juin a septembre, mais mai et octobre offrent egalement une bonne programmation</li>
</ul>

<h2>Pourquoi choisir Alcudia plutot que le sud de Majorque</h2>
<p>Alcudia offre une alternative plus sophistiquee au sud de l'ile. Moins de foule, une meilleure qualite dans l'offre de loisirs et un cadre naturel privilegie font que de plus en plus de touristes choisissent le nord pour leurs nuits festives. De plus, la proximite de tout, de la plage a la discotheque, rend l'experience confortable et sans complications.</p>`,
      it: `<p>Port d'Alcudia e' l'epicentro della vita notturna nel nord di Maiorca. Mentre Palma e Magaluf catturano l'attenzione mediatica, chi conosce bene l'isola sa che Alcudia offre una scena di club piu' esclusiva, con un suono migliore e un pubblico internazionale che cerca qualita' piuttosto che quantita'. Se stai pianificando una serata in discoteca ad Alcudia, questa guida ti racconta tutto.</p>

<h2>Outxide Club: il riferimento del clubbing nel nord</h2>
<p><a href="/outxide">Outxide Club</a>, situato in Av. Tucan 1, Port d'Alcudia, e' senza dubbio il club piu' importante di tutto il nord di Maiorca. Apre da giovedi' a sabato a partire dalle 23:00 durante la stagione da maggio a ottobre. Cio' che lo distingue dal resto e' la combinazione di un impianto audio professionale di primo livello, una produzione visiva spettacolare con giochi di luce e LED, e una programmazione di DJ che include sia talento nazionale che nomi internazionali.</p>

<h3>Le serate migliori all'Outxide Club</h3>
<ul>
<li><strong>Giovedi':</strong> serata di apertura settimanale, atmosfera piu' rilassata, ideale per iniziare il fine settimana in anticipo</li>
<li><strong>Venerdi':</strong> la serata piu' internazionale, con pubblico da tutta Europa che riempie la pista</li>
<li><strong>Sabato:</strong> la grande serata. Eventi a tema, DJ speciali e pista strapiena</li>
</ul>

<h3>Dress code e biglietti</h3>
<p>Outxide Club applica una politica <strong>smart casual</strong>: vietati abbigliamento da spiaggia, infradito e canottiere. I biglietti si possono acquistare in anticipo su <strong>FourVenues</strong>, la piattaforma ufficiale, che di solito garantisce un prezzo migliore e accesso diretto. Si vendono anche alla porta.</p>

<h2>La zona di Dollar Street e Av. Tucan</h2>
<p>L'Av. Tucan, conosciuta colloquialmente come Dollar Street, e' l'asse principale del divertimento notturno a Port d'Alcudia. Lungo questa strada e nei dintorni troverai bar, terrazze e locali che creano un'atmosfera vivace fin dalle prime ore della sera. E' la zona perfetta per fare il giro dei bar prima di entrare in un club.</p>

<h2>Prima del club: cocktail da Enjoy Terrace</h2>
<p>Il modo migliore per iniziare la serata e' da <a href="/enjoy">Enjoy Terrace</a>, proprio accanto a Outxide Club. Apre dalle 17:00 con cocktail d'autore, shisha premium e un'atmosfera che cresce di intensita'. Molti combinano una sessione in terrazza con l'ingresso al club a partire dalle 23:00, la transizione piu' naturale della notte alcudiana.</p>

<h2>Cenare prima di uscire</h2>
<p>Se cerchi di cenare prima della discoteca, <a href="/hiru">Hiru Food &amp; Drinks</a> in Ctra. d'Arta 40 serve cene fino alle 23:30 durante la settimana e fino all'1:00 il venerdi' e il sabato. La sua cucina alla brace con carni frollate e risi del mercato e' l'opzione perfetta per ricaricare le energie prima della serata.</p>

<h2>Consigli pratici per uscire la sera ad Alcudia</h2>
<ul>
<li><strong>Trasporto:</strong> la zona del divertimento e' compatta e si percorre a piedi. Taxi disponibili fino a tarda notte</li>
<li><strong>Orari:</strong> i club di solito chiudono tra le 5:00 e le 6:00. La serata inizia tardi, non arrivare prima di mezzanotte</li>
<li><strong>Biglietti:</strong> acquistare online e' sempre piu' economico e si evitano le code</li>
<li><strong>Contanti e carta:</strong> la maggior parte dei locali accetta carta, ma porta un po' di contanti per sicurezza</li>
<li><strong>Stagione:</strong> l'alta stagione va da giugno a settembre, ma anche maggio e ottobre offrono buona programmazione</li>
</ul>

<h2>Perche' scegliere Alcudia rispetto al sud di Maiorca</h2>
<p>Alcudia offre un'alternativa piu' sofisticata al sud dell'isola. Meno affollamento, migliore qualita' nell'offerta di intrattenimento e un contesto naturale privilegiato fanno si' che sempre piu' turisti scelgano il nord per le loro serate di festa. Inoltre, la vicinanza di tutto, dalla spiaggia alla discoteca, rende l'esperienza comoda e senza complicazioni.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-04-20",
    image: "/images/outxide/PIC06225-3.jpg",
    tags: ["nightlife", "alcudia", "mallorca", "clubs"],
    venue: "outxide",
    readingTime: 6,
  },
  {
    slug: "restaurante-brasa-parrilla-mallorca",
    title: {
      es: "Restaurante de Brasa y Parrilla en Mallorca: Cocina Mediterránea",
      en: "Charcoal Grill Restaurant in Mallorca: Mediterranean Cuisine",
      de: "Grillrestaurant auf Mallorca: Mediterrane Küche vom Holzkohlegrill",
      fr: "Restaurant Grill et Braise a Majorque : Cuisine Mediterraneenne",
      it: "Ristorante alla Brace e Griglia a Maiorca: Cucina Mediterranea",
    },
    excerpt: {
      es: "Descubre por qué la cocina a la brasa es especial en Mallorca. Carnes maduradas, arroces de lonja y producto fresco mediterráneo en Hiru Food & Drinks.",
      en: "Discover why charcoal grill cooking is special in Mallorca. Aged meats, market-fresh rice dishes and Mediterranean produce at Hiru Food & Drinks.",
      de: "Entdecke, warum die Holzkohlegrillküche auf Mallorca so besonders ist. Gereiftes Fleisch, Reisgerichte vom Fischmarkt und frische mediterrane Zutaten bei Hiru Food & Drinks.",
      fr: "Decouvrez pourquoi la cuisine au grill est speciale a Majorque. Viandes maturees, riz de la criee et produits frais mediterraneens chez Hiru Food & Drinks.",
      it: "Scopri perche' la cucina alla brace e' speciale a Maiorca. Carni frollate, risi del mercato e prodotto fresco mediterraneo da Hiru Food & Drinks.",
    },
    content: {
      es: `<p>La cocina a la brasa es mucho más que un método de cocción: es una filosofía gastronómica que conecta con lo más primitivo del acto de cocinar. En Mallorca, donde el producto fresco del Mediterráneo se combina con tradiciones centenarias, cocinar a la brasa de carbón eleva cada ingrediente a su máxima expresión. Y en Port d'Alcúdia, hay un restaurante que ha convertido esta técnica en su seña de identidad.</p>

<h2>Hiru Food &amp; Drinks: la brasa como arte</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a>, en Ctra. d'Artà 40, Port d'Alcúdia, ha construido su cocina en torno al fuego real. No hay atajos: carbón de leña seleccionado, temperaturas controladas con precisión y producto fresco que llega cada día. El resultado son platos con sabores intensos, texturas que solo el fuego directo consigue y una experiencia gastronómica que apela a todos los sentidos.</p>

<h3>La magia del carbón de leña</h3>
<p>La diferencia entre cocinar a la brasa de carbón y cualquier otro método es el sabor. El carbón de leña aporta matices ahumados sutiles que impregnan la carne y el pescado sin dominarlos. La alta temperatura sella el exterior, creando una costra caramelizada mientras el interior se mantiene jugoso y tierno. Es una técnica que requiere experiencia y atención constante, y que en Hiru se ejecuta con maestría.</p>

<h2>Los pilares de la carta</h2>

<h3>Carnes maduradas a la brasa</h3>
<p>La selección de carnes de Hiru se basa en cortes premium sometidos a un proceso de maduración cuidadoso. Este proceso concentra los sabores y mejora la textura, y al combinarse con la brasa de carbón, el resultado es espectacular. Desde chuletones hasta cortes más selectos, cada pieza se cocina respetando su punto óptimo.</p>

<h3>Arroces de lonja</h3>
<p>El pescado y el marisco llegan cada día de la lonja local de Alcúdia. Los arroces de Hiru aprovechan esta frescura al máximo: caldosos, melosos o secos, cada arroz se prepara con caldo casero y el producto más fresco del Mediterráneo. Los arroces de marisco son una experiencia que merece cada minuto de espera.</p>

<h3>Pescados del Mediterráneo</h3>
<p>Lubina, dorada y las capturas del día se cocinan a la parrilla con sencillez y respeto por el producto. Guarniciones de temporada acompañan cada plato, desde verduras asadas hasta ensaladas frescas con ingredientes locales.</p>

<h2>Producto local, cocina honesta</h2>
<p>Mallorca es una isla privilegiada en cuanto a producto. Los tomates ramallet, el aceite de oliva de la sierra de Tramuntana, las almendras de la isla y las hierbas aromáticas del campo mallorquín son protagonistas en la cocina de Hiru. Esta filosofía de proximidad se nota en cada plato: ingredientes que no necesitan esconderse porque su calidad habla por sí sola.</p>

<h2>La experiencia completa</h2>
<p>Hiru no es solo un restaurante de brasa. La carta de cócteles permite alargar la velada después del postre, y el ambiente del local combina calidez y diseño contemporáneo. Con una valoración de 4.9/5 en Google y horarios amplios (hasta la 1:00 los viernes y sábados), es un lugar para tomarse la cena con calma.</p>

<h2>De la cena a la noche</h2>
<p>Después de cenar en Hiru, la noche en Alcúdia está al alcance de la mano. <a href="/enjoy">Enjoy Terrace</a> ofrece cócteles de autor y shisha premium a pocos minutos, y <a href="/outxide">Outxide Club</a> abre sus puertas para quienes quieran seguir la fiesta hasta el amanecer. La transición de una cena memorable a una gran noche nunca fue tan fácil.</p>`,
      en: `<p>Charcoal grill cooking is much more than a method: it is a gastronomic philosophy that connects with the most primal act of cooking. In Mallorca, where fresh Mediterranean produce meets centuries-old traditions, cooking over charcoal elevates every ingredient to its fullest expression. And in Port d'Alcudia, one restaurant has made this technique its defining feature.</p>

<h2>Hiru Food &amp; Drinks: the grill as art</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a>, at Ctra. d'Arta 40, Port d'Alcudia, has built its kitchen around real fire. There are no shortcuts: hand-selected wood charcoal, precisely controlled temperatures and fresh produce that arrives daily. The result is dishes with intense flavours, textures that only direct fire can achieve and a gastronomic experience that engages every sense.</p>

<h3>The magic of wood charcoal</h3>
<p>The difference between cooking over wood charcoal and any other method is flavour. Wood charcoal imparts subtle smoky nuances that infuse meat and fish without overpowering them. The high temperature sears the exterior, creating a caramelised crust while the interior stays juicy and tender. It is a technique that demands experience and constant attention, and at Hiru it is executed with mastery.</p>

<h2>The pillars of the menu</h2>

<h3>Aged meats on the grill</h3>
<p>Hiru's meat selection is built on premium cuts subjected to a careful ageing process. This process concentrates flavours and improves texture, and when combined with the charcoal grill, the result is spectacular. From ribeye to more select cuts, each piece is cooked to its optimal point.</p>

<h3>Market-fresh rice dishes</h3>
<p>Fish and shellfish arrive daily from the local Alcudia market. Hiru's rice dishes make the most of this freshness: brothy, creamy or dry, each rice is prepared with homemade stock and the freshest Mediterranean produce. The seafood rice dishes are an experience worth every minute of the wait.</p>

<h3>Mediterranean fish</h3>
<p>Sea bass, sea bream and the catch of the day are grilled simply and with respect for the ingredient. Seasonal garnishes accompany each dish, from roasted vegetables to fresh salads with local produce.</p>

<h2>Local produce, honest cooking</h2>
<p>Mallorca is a privileged island when it comes to produce. Ramallet tomatoes, olive oil from the Serra de Tramuntana, island-grown almonds and aromatic herbs from the Mallorcan countryside all play starring roles in Hiru's kitchen. This philosophy of locality shows in every dish: ingredients that need no disguise because their quality speaks for itself.</p>

<h2>The complete experience</h2>
<p>Hiru is not just a grill restaurant. The cocktail menu allows you to extend the evening after dessert, and the restaurant's ambience blends warmth with contemporary design. With a 4.9/5 rating on Google and extended hours (until 1:00 on Fridays and Saturdays), it is a place to take your time over dinner.</p>

<h2>From dinner to the night</h2>
<p>After dining at Hiru, the Alcudia night is within easy reach. <a href="/enjoy">Enjoy Terrace</a> offers signature cocktails and premium shisha just minutes away, and <a href="/outxide">Outxide Club</a> opens its doors for those who want to continue the party until sunrise. The transition from a memorable dinner to a great night out has never been easier.</p>`,
      de: `<p>Kochen über Holzkohle ist viel mehr als eine Garmethode -- es ist eine gastronomische Philosophie, die an den ursprünglichsten Akt des Kochens anknüpft. Auf Mallorca, wo frische mediterrane Produkte auf jahrhundertealte Traditionen treffen, bringt das Grillen über Holzkohle jede Zutat zu ihrer vollen Entfaltung. Und in Port d'Alcudia hat ein Restaurant diese Technik zu seinem Markenzeichen gemacht.</p>

<h2>Hiru Food &amp; Drinks: der Grill als Kunst</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> in der Ctra. d'Artà 40, Port d'Alcudia, hat seine Küche rund um echtes Feuer aufgebaut. Keine Abkürzungen: handverlesene Holzkohle, präzise kontrollierte Temperaturen und frische Zutaten, die täglich geliefert werden. Das Ergebnis sind Gerichte mit intensivem Geschmack, Texturen, die nur direktes Feuer erzeugen kann, und ein gastronomisches Erlebnis, das alle Sinne anspricht.</p>

<h3>Die Magie der Holzkohle</h3>
<p>Der Unterschied zwischen dem Grillen über Holzkohle und jeder anderen Methode ist der Geschmack. Holzkohle verleiht subtile Rauchnuancen, die Fleisch und Fisch durchdringen, ohne sie zu überdecken. Die hohe Temperatur versiegelt die Außenseite und erzeugt eine karamellisierte Kruste, während das Innere saftig und zart bleibt. Es ist eine Technik, die Erfahrung und ständige Aufmerksamkeit erfordert -- und bei Hiru meisterhaft beherrscht wird.</p>

<h2>Die Säulen der Speisekarte</h2>

<h3>Gereiftes Fleisch vom Grill</h3>
<p>Die Fleischauswahl bei Hiru basiert auf Premium-Stücken, die einem sorgfältigen Reifungsprozess unterzogen werden. Dieser Prozess konzentriert die Aromen und verbessert die Textur -- kombiniert mit dem Holzkohlegrill ist das Ergebnis spektakulär. Vom Ribeye bis zu ausgesuchten Teilstücken wird jedes Stück auf den optimalen Punkt gegart.</p>

<h3>Reisgerichte vom Fischmarkt</h3>
<p>Fisch und Meeresfrüchte kommen täglich frisch vom lokalen Markt in Alcudia. Hirus Reisgerichte nutzen diese Frische maximal: brühartig, cremig oder trocken -- jeder Reis wird mit hausgemachter Brühe und den frischesten mediterranen Zutaten zubereitet. Die Meeresfrüchte-Reisgerichte sind ein Erlebnis, das jede Minute Wartezeit wert ist.</p>

<h3>Mediterrane Fische</h3>
<p>Wolfsbarsch, Dorade und der Tagesfang werden schlicht und respektvoll gegrillt. Saisonale Beilagen begleiten jedes Gericht, von geröstetem Gemüse bis hin zu frischen Salaten mit lokalen Zutaten.</p>

<h2>Lokale Produkte, ehrliche Küche</h2>
<p>Mallorca ist eine privilegierte Insel, was Produkte betrifft. Ramallet-Tomaten, Olivenöl aus der Serra de Tramuntana, Inselmandeln und aromatische Kräuter vom mallorquinischen Land spielen Hauptrollen in Hirus Küche. Diese Philosophie der Regionalität zeigt sich in jedem Gericht: Zutaten, die sich nicht verstecken müssen, weil ihre Qualität für sich spricht.</p>

<h2>Das komplette Erlebnis</h2>
<p>Hiru ist nicht nur ein Grillrestaurant. Die Cocktailkarte ermöglicht es, den Abend nach dem Dessert zu verlängern, und das Ambiente verbindet Wärme mit zeitgenössischem Design. Mit einer Bewertung von 4.9/5 bei Google und langen Öffnungszeiten (bis 1:00 Uhr freitags und samstags) ist es ein Ort, an dem man sich beim Abendessen Zeit lassen kann.</p>

<h2>Vom Abendessen in die Nacht</h2>
<p>Nach dem Essen bei Hiru liegt die Nacht in Alcudia zum Greifen nah. Die <a href="/enjoy">Enjoy Terrace</a> bietet nur wenige Minuten entfernt Signature-Cocktails und Premium-Shisha, und der <a href="/outxide">Outxide Club</a> öffnet seine Türen für alle, die bis zum Sonnenaufgang weiterfeiern wollen. Der Übergang von einem unvergesslichen Abendessen zu einer großartigen Nacht war noch nie so einfach.</p>`,
      fr: `<p>La cuisine au grill est bien plus qu'une methode de cuisson : c'est une philosophie gastronomique qui renoue avec l'acte le plus primitif de cuisiner. A Majorque, ou les produits frais de la Mediterranee se combinent avec des traditions centenaires, la cuisson au charbon de bois sublime chaque ingredient a son expression maximale. Et a Port d'Alcudia, un restaurant a fait de cette technique sa marque de fabrique.</p>

<h2>Hiru Food &amp; Drinks : la braise comme art</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a>, au Ctra. d'Arta 40, Port d'Alcudia, a construit sa cuisine autour du feu veritable. Pas de raccourcis : charbon de bois selectionne, temperatures controlees avec precision et produits frais livres chaque jour. Le resultat : des plats aux saveurs intenses, des textures que seul le feu direct permet d'obtenir et une experience gastronomique qui fait appel a tous les sens.</p>

<h3>La magie du charbon de bois</h3>
<p>La difference entre la cuisson au charbon de bois et toute autre methode, c'est la saveur. Le charbon de bois apporte des nuances fumees subtiles qui impregnent la viande et le poisson sans les dominer. La haute temperature saisit l'exterieur, creant une croute caramelisee tandis que l'interieur reste juteux et tendre. C'est une technique qui exige de l'experience et une attention constante, et qui chez Hiru est executee avec maitrise.</p>

<h2>Les piliers de la carte</h2>

<h3>Viandes maturees au grill</h3>
<p>La selection de viandes de Hiru repose sur des pieces premium soumises a un processus de maturation soigneux. Ce processus concentre les saveurs et ameliore la texture, et combine au grill au charbon de bois, le resultat est spectaculaire. De la cote de boeuf aux pieces les plus selectes, chaque morceau est cuit a son point optimal.</p>

<h3>Riz de la criee</h3>
<p>Le poisson et les fruits de mer arrivent chaque jour de la criee locale d'Alcudia. Les riz de Hiru exploitent cette fraicheur au maximum : en bouillon, cremeux ou secs, chaque riz est prepare avec un fond maison et les produits les plus frais de la Mediterranee. Les riz aux fruits de mer sont une experience qui merite chaque minute d'attente.</p>

<h3>Poissons de Mediterranee</h3>
<p>Bar, dorade et prises du jour sont grilles avec simplicite et respect du produit. Des garnitures de saison accompagnent chaque plat, des legumes rotis aux salades fraiches avec des ingredients locaux.</p>

<h2>Produit local, cuisine honnete</h2>
<p>Majorque est une ile privilegiee en matiere de produits. Les tomates ramallet, l'huile d'olive de la Serra de Tramuntana, les amandes de l'ile et les herbes aromatiques de la campagne majorquine sont les vedettes de la cuisine de Hiru. Cette philosophie de proximite se retrouve dans chaque plat : des ingredients qui n'ont pas besoin de se cacher car leur qualite parle d'elle-meme.</p>

<h2>L'experience complete</h2>
<p>Hiru n'est pas seulement un restaurant grill. La carte de cocktails permet de prolonger la soiree apres le dessert, et l'ambiance du lieu associe chaleur et design contemporain. Avec une note de 4.9/5 sur Google et des horaires etendus (jusqu'a 1h00 les vendredis et samedis), c'est un endroit ou prendre le temps de savourer son diner.</p>

<h2>Du diner a la nuit</h2>
<p>Apres avoir dine chez Hiru, la nuit a Alcudia est a portee de main. <a href="/enjoy">Enjoy Terrace</a> propose des cocktails signatures et une chicha premium a quelques minutes, et <a href="/outxide">Outxide Club</a> ouvre ses portes pour ceux qui veulent prolonger la fete jusqu'a l'aube. La transition d'un diner memorable a une grande soiree n'a jamais ete aussi facile.</p>`,
      it: `<p>La cucina alla brace e' molto piu' di un metodo di cottura: e' una filosofia gastronomica che si ricollega all'atto piu' primitivo del cucinare. A Maiorca, dove il prodotto fresco del Mediterraneo si combina con tradizioni centenarie, cucinare sulla brace di carbone esalta ogni ingrediente alla sua massima espressione. E a Port d'Alcudia, c'e' un ristorante che ha fatto di questa tecnica il suo marchio di fabbrica.</p>

<h2>Hiru Food &amp; Drinks: la brace come arte</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a>, in Ctra. d'Arta 40, Port d'Alcudia, ha costruito la sua cucina attorno al fuoco vero. Non ci sono scorciatoie: carbone di legna selezionato, temperature controllate con precisione e prodotto fresco che arriva ogni giorno. Il risultato sono piatti dai sapori intensi, consistenze che solo il fuoco diretto riesce a ottenere e un'esperienza gastronomica che coinvolge tutti i sensi.</p>

<h3>La magia del carbone di legna</h3>
<p>La differenza tra cucinare sulla brace di carbone e qualsiasi altro metodo e' il sapore. Il carbone di legna apporta sfumature affumicate sottili che impregnano la carne e il pesce senza sovrastarli. L'alta temperatura sigilla l'esterno, creando una crosta caramellata mentre l'interno resta succoso e tenero. E' una tecnica che richiede esperienza e attenzione costante, e che da Hiru viene eseguita con maestria.</p>

<h2>I pilastri del menu</h2>

<h3>Carni frollate alla brace</h3>
<p>La selezione di carni di Hiru si basa su tagli premium sottoposti a un accurato processo di frollatura. Questo processo concentra i sapori e migliora la consistenza, e combinandosi con la brace di carbone, il risultato e' spettacolare. Dalla costata ai tagli piu' selezionati, ogni pezzo viene cotto rispettando il suo punto ottimale.</p>

<h3>Risi del mercato</h3>
<p>Il pesce e i frutti di mare arrivano ogni giorno dal mercato locale di Alcudia. I risi di Hiru sfruttano al massimo questa freschezza: brodosi, cremosi o asciutti, ogni riso viene preparato con brodo fatto in casa e il prodotto piu' fresco del Mediterraneo. I risi di mare sono un'esperienza che vale ogni minuto di attesa.</p>

<h3>Pesci del Mediterraneo</h3>
<p>Spigola, orata e il pescato del giorno vengono cotti alla griglia con semplicita' e rispetto per il prodotto. Contorni di stagione accompagnano ogni piatto, dalle verdure arrostite alle insalate fresche con ingredienti locali.</p>

<h2>Prodotto locale, cucina onesta</h2>
<p>Maiorca e' un'isola privilegiata in quanto a prodotti. I pomodori ramallet, l'olio d'oliva della Serra de Tramuntana, le mandorle dell'isola e le erbe aromatiche della campagna maiorchina sono protagonisti nella cucina di Hiru. Questa filosofia di prossimita' si nota in ogni piatto: ingredienti che non hanno bisogno di nascondersi perche' la loro qualita' parla da sola.</p>

<h2>L'esperienza completa</h2>
<p>Hiru non e' solo un ristorante alla brace. La carta dei cocktail permette di prolungare la serata dopo il dessert, e l'ambiente del locale combina calore e design contemporaneo. Con una valutazione di 4.9/5 su Google e orari ampi (fino all'1:00 il venerdi' e il sabato), e' un luogo dove prendersi il tempo per cenare con calma.</p>

<h2>Dalla cena alla notte</h2>
<p>Dopo aver cenato da Hiru, la notte ad Alcudia e' a portata di mano. <a href="/enjoy">Enjoy Terrace</a> offre cocktail d'autore e shisha premium a pochi minuti, e <a href="/outxide">Outxide Club</a> apre le sue porte per chi vuole continuare la festa fino all'alba. Il passaggio da una cena memorabile a una grande serata non e' mai stato cosi' facile.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-04-05",
    image: "/images/hiru/489278271_122224698272201104_2709257958875125484_n.jpg",
    tags: ["food", "restaurants", "mallorca", "hiru"],
    venue: "hiru",
    readingTime: 5,
  },
  {
    slug: "fiestas-eventos-verano-alcudia-2026",
    title: {
      es: "Fiestas y Eventos de Verano en Alcúdia 2026",
      en: "Summer Festivals and Events in Alcudia 2026",
      de: "Sommerfeste und Veranstaltungen in Alcudia 2026",
      fr: "Fetes et Evenements d'Ete a Alcudia 2026",
      it: "Feste ed Eventi Estivi ad Alcudia 2026",
    },
    excerpt: {
      es: "Calendario de fiestas en Alcúdia verano 2026: Sant Jaume, La Gran Verbena, Nit de Foc, Feria de la Sepia y CIRCAIRE. Todo lo que necesitas saber.",
      en: "Alcudia summer 2026 festival calendar: Sant Jaume, La Gran Verbena, Nit de Foc, Sepia Fair and CIRCAIRE. Everything you need to know.",
      de: "Festkalender Alcudia Sommer 2026: Sant Jaume, La Gran Verbena, Nit de Foc, Sepia-Fest und CIRCAIRE. Alles, was du wissen musst.",
      fr: "Calendrier des fetes a Alcudia ete 2026 : Sant Jaume, La Gran Verbena, Nit de Foc, Foire a la Seiche et CIRCAIRE. Tout ce que vous devez savoir.",
      it: "Calendario delle feste ad Alcudia estate 2026: Sant Jaume, La Gran Verbena, Nit de Foc, Fiera della Seppia e CIRCAIRE. Tutto quello che devi sapere.",
    },
    content: {
      es: `<p>Alcúdia no es solo playa y gastronomía: es un municipio con una vida cultural vibrante que se intensifica durante los meses de verano. Desde fiestas patronales con siglos de historia hasta festivales contemporáneos, el calendario de eventos de Alcúdia en 2026 está repleto de planes para todos los gustos. Aquí tienes una guía completa para no perderte nada.</p>

<h2>Sant Jaume: las fiestas patronales (semana del 25 de julio)</h2>
<p>Las fiestas de Sant Jaume son el evento más importante del año en Alcúdia. Durante la semana del 25 de julio, el casco antiguo se transforma con procesiones tradicionales, conciertos en la plaza, espectáculos de fuego, correfocs (correr con fuegos artificiales) y la tradicional verbena popular. Es la esencia de la cultura mallorquina concentrada en una semana de celebración intensa.</p>
<ul>
<li><strong>Fechas:</strong> semana del 25 de julio de 2026</li>
<li><strong>Dónde:</strong> casco antiguo de Alcúdia y alrededores</li>
<li><strong>Imprescindible:</strong> los correfocs (jueves), el concierto en la plaza (viernes) y la verbena del sábado</li>
<li><strong>Consejo:</strong> reserva restaurante con antelación, la demanda se dispara durante Sant Jaume</li>
</ul>

<h2>La Gran Verbena del Verano (19 de julio)</h2>
<p>Uno de los eventos musicales más esperados del verano en la zona norte de Mallorca. La Gran Verbena del Verano se celebra el 19 de julio con tres escenarios simultáneos que cubren diferentes estilos musicales. Desde música electrónica hasta pop en directo y sesiones de DJ, es una noche pensada para que todos encuentren su ritmo.</p>
<ul>
<li><strong>Fecha:</strong> 19 de julio de 2026</li>
<li><strong>Formato:</strong> 3 escenarios con diferentes estilos musicales</li>
<li><strong>Horario:</strong> desde las 21:00 hasta altas horas de la madrugada</li>
</ul>

<h2>Sant Joan y la Nit de Foc (23 de junio)</h2>
<p>La noche más mágica del año. La Nit de Foc del 23 de junio celebra el solsticio de verano con hogueras en la playa, fuegos artificiales y un ambiente festivo que recorre toda la costa de Port d'Alcúdia. La tradición dicta saltar las hogueras para purificarse y atraer buena suerte. Es una experiencia única que combina tradición, fuego y la noche más corta del año.</p>

<h2>Feria de la Sepia (abril)</h2>
<p>Cada primavera, Alcúdia celebra su tradición pesquera con la Feria de la Sepia. Este festival gastronómico reúne a los restaurantes del municipio en torno a un ingrediente estrella: la sepia fresca de la bahía de Alcúdia. Degustaciones, menús especiales y actividades culturales convierten esta feria en una cita imprescindible para los amantes de la buena cocina.</p>

<h2>CIRCAIRE: Festival Internacional de Circo (mayo)</h2>
<p>CIRCAIRE es el festival internacional de circo contemporáneo que tiene lugar en el casco antiguo de Alcúdia durante el mes de mayo. Compañías de circo de toda Europa actúan en las plazas y calles del pueblo, ofreciendo espectáculos gratuitos de acrobacia, malabares, teatro físico y artes aéreas. Es un evento familiar que transforma el casco histórico en un escenario al aire libre.</p>

<h2>Eventos especiales en Outxide Club</h2>
<p>Durante las semanas de festival, <a href="/outxide">Outxide Club</a> programa eventos especiales con DJs destacados y fiestas temáticas que complementan el calendario cultural de Alcúdia. Las noches de Sant Jaume y La Gran Verbena son especialmente memorables, con programaciones extendidas y una energía que multiplica la fiesta. Consulta la programación actualizada en la web del club.</p>

<h2>Cómo disfrutar los eventos al máximo</h2>
<ul>
<li><strong>Alojamiento:</strong> reserva con meses de antelación para Sant Jaume y la temporada alta de julio-agosto</li>
<li><strong>Cenar:</strong> <a href="/hiru">Hiru Food &amp; Drinks</a> es perfecto para cenar antes de cualquier evento nocturno, con horarios amplios y cocina mediterránea a la brasa</li>
<li><strong>Pre-evento:</strong> <a href="/enjoy">Enjoy Terrace</a> abre desde las 17:00, ideal para cócteles y shisha antes de las fiestas</li>
<li><strong>Transporte:</strong> durante las fiestas principales, se amplía el servicio de autobuses y taxis</li>
<li><strong>Idioma:</strong> Alcúdia es muy internacional, te manejarás bien en español, inglés y alemán</li>
</ul>

<h2>Un verano para recordar</h2>
<p>Alcúdia combina tradición y modernidad de una manera que pocos destinos consiguen. Puedes vivir la autenticidad de unas fiestas patronales centenarias por la tarde y terminar en un club con producción de primer nivel por la noche. Esa es la magia de este rincón del norte de Mallorca.</p>`,
      en: `<p>Alcudia is more than beach and gastronomy: it is a municipality with a vibrant cultural life that intensifies during the summer months. From centuries-old patron saint festivals to contemporary events, Alcudia's 2026 events calendar is packed with plans for every taste. Here is a complete guide so you do not miss a thing.</p>

<h2>Sant Jaume: the patron saint festival (week of 25 July)</h2>
<p>The Sant Jaume festivities are the most important event of the year in Alcudia. During the week of 25 July, the old town is transformed with traditional processions, concerts in the square, fire shows, correfocs (running with fireworks) and the traditional popular verbena. It is the essence of Mallorcan culture concentrated into one week of intense celebration.</p>
<ul>
<li><strong>Dates:</strong> week of 25 July 2026</li>
<li><strong>Where:</strong> Alcudia old town and surroundings</li>
<li><strong>Must-see:</strong> the correfocs (Thursday), the concert in the square (Friday) and the Saturday verbena</li>
<li><strong>Tip:</strong> book restaurants well in advance, demand surges during Sant Jaume</li>
</ul>

<h2>La Gran Verbena del Verano (19 July)</h2>
<p>One of the most anticipated music events of the summer in northern Mallorca. La Gran Verbena del Verano takes place on 19 July with three simultaneous stages covering different musical styles. From electronic music to live pop and DJ sessions, it is a night designed so everyone finds their rhythm.</p>
<ul>
<li><strong>Date:</strong> 19 July 2026</li>
<li><strong>Format:</strong> 3 stages with different musical styles</li>
<li><strong>Hours:</strong> from 21:00 into the early hours</li>
</ul>

<h2>Sant Joan and Nit de Foc (23 June)</h2>
<p>The most magical night of the year. Nit de Foc on 23 June celebrates the summer solstice with bonfires on the beach, fireworks and a festive atmosphere that stretches along the entire Port d'Alcudia coastline. Tradition holds that you jump over the bonfires for purification and good luck. It is a unique experience that blends tradition, fire and the shortest night of the year.</p>

<h2>Sepia Fair (April)</h2>
<p>Every spring, Alcudia celebrates its fishing tradition with the Feria de la Sepia. This gastronomic festival brings together the municipality's restaurants around a star ingredient: fresh cuttlefish from Alcudia Bay. Tastings, special menus and cultural activities make this fair an essential date for food lovers.</p>

<h2>CIRCAIRE: International Circus Festival (May)</h2>
<p>CIRCAIRE is the international contemporary circus festival held in Alcudia's old town during May. Circus companies from across Europe perform in the town's squares and streets, offering free shows featuring acrobatics, juggling, physical theatre and aerial arts. It is a family-friendly event that transforms the historic centre into an open-air stage.</p>

<h2>Special events at Outxide Club</h2>
<p>During festival weeks, <a href="/outxide">Outxide Club</a> programmes special events with top DJs and themed parties that complement Alcudia's cultural calendar. The Sant Jaume and Gran Verbena nights are especially memorable, with extended programming and an energy that amplifies the celebration. Check the club's website for the latest schedule.</p>

<h2>How to make the most of the events</h2>
<ul>
<li><strong>Accommodation:</strong> book months ahead for Sant Jaume and the July-August high season</li>
<li><strong>Dinner:</strong> <a href="/hiru">Hiru Food &amp; Drinks</a> is perfect for dining before any evening event, with extended hours and Mediterranean charcoal grill cuisine</li>
<li><strong>Pre-event:</strong> <a href="/enjoy">Enjoy Terrace</a> opens from 17:00, ideal for cocktails and shisha before the festivities</li>
<li><strong>Transport:</strong> during the main festivals, bus and taxi services are extended</li>
<li><strong>Language:</strong> Alcudia is very international; you will manage well in Spanish, English and German</li>
</ul>

<h2>A summer to remember</h2>
<p>Alcudia blends tradition and modernity in a way few destinations manage. You can experience the authenticity of centuries-old patron saint festivities in the afternoon and finish in a club with top-tier production at night. That is the magic of this corner of northern Mallorca.</p>`,
      de: `<p>Alcudia ist mehr als Strand und Gastronomie: Es ist eine Gemeinde mit einem lebendigen kulturellen Leben, das sich in den Sommermonaten intensiviert. Von jahrhundertealten Patronatsfesten bis zu zeitgenössischen Events ist der Veranstaltungskalender von Alcudia 2026 voller Pläne für jeden Geschmack. Hier findest du einen kompletten Guide, damit du nichts verpasst.</p>

<h2>Sant Jaume: das Patronatsfest (Woche vom 25. Juli)</h2>
<p>Die Sant-Jaume-Feiern sind das wichtigste Ereignis des Jahres in Alcudia. Während der Woche vom 25. Juli verwandelt sich die Altstadt mit traditionellen Prozessionen, Konzerten auf dem Platz, Feuershows, Correfocs (Laufen mit Feuerwerk) und der traditionellen Volksverbena. Es ist die Essenz der mallorquinischen Kultur, konzentriert in einer Woche intensiver Feierlichkeiten.</p>
<ul>
<li><strong>Termine:</strong> Woche vom 25. Juli 2026</li>
<li><strong>Wo:</strong> Altstadt von Alcudia und Umgebung</li>
<li><strong>Muss man sehen:</strong> die Correfocs (Donnerstag), das Konzert auf dem Platz (Freitag) und die Verbena am Samstag</li>
<li><strong>Tipp:</strong> reserviere Restaurants rechtzeitig, die Nachfrage steigt während Sant Jaume stark an</li>
</ul>

<h2>La Gran Verbena del Verano (19. Juli)</h2>
<p>Eines der meisterwarteten Musikevents des Sommers im Norden Mallorcas. Die Gran Verbena del Verano findet am 19. Juli statt, mit drei gleichzeitigen Bühnen für verschiedene Musikstile. Von elektronischer Musik über Live-Pop bis zu DJ-Sessions -- eine Nacht, in der jeder seinen Rhythmus findet.</p>
<ul>
<li><strong>Datum:</strong> 19. Juli 2026</li>
<li><strong>Format:</strong> 3 Bühnen mit verschiedenen Musikstilen</li>
<li><strong>Uhrzeiten:</strong> ab 21:00 Uhr bis in die frühen Morgenstunden</li>
</ul>

<h2>Sant Joan und die Nit de Foc (23. Juni)</h2>
<p>Die magischste Nacht des Jahres. Die Nit de Foc am 23. Juni feiert die Sommersonnenwende mit Lagerfeuern am Strand, Feuerwerk und einer festlichen Atmosphäre entlang der gesamten Küste von Port d'Alcudia. Die Tradition besagt, dass man über die Feuer springt zur Reinigung und für Glück. Ein einzigartiges Erlebnis, das Tradition, Feuer und die kürzeste Nacht des Jahres verbindet.</p>

<h2>Feria de la Sepia -- Sepia-Fest (April)</h2>
<p>Jeden Frühling feiert Alcudia seine Fischertradition mit der Feria de la Sepia. Dieses gastronomische Festival bringt die Restaurants der Gemeinde rund um eine Starzzutat zusammen: frische Sepia aus der Bucht von Alcudia. Verkostungen, spezielle Menüs und kulturelle Aktivitäten machen dieses Fest zu einem Pflichttermin für Feinschmecker.</p>

<h2>CIRCAIRE: Internationales Zirkusfestival (Mai)</h2>
<p>CIRCAIRE ist das internationale Festival für zeitgenössischen Zirkus, das im Mai in der Altstadt von Alcudia stattfindet. Zirkuskompanien aus ganz Europa treten auf den Plätzen und in den Gassen des Ortes auf und bieten kostenlose Shows mit Akrobatik, Jonglage, physischem Theater und Luftakrobatik. Ein familienfreundliches Event, das das historische Zentrum in eine Freiluftbühne verwandelt.</p>

<h2>Spezialevents im Outxide Club</h2>
<p>Während der Festwochen programmiert der <a href="/outxide">Outxide Club</a> Spezialevents mit Top-DJs und Themenpartys, die den Kulturkalender von Alcudia ergänzen. Die Nächte während Sant Jaume und der Gran Verbena sind besonders unvergesslich, mit erweitertem Programm und einer Energie, die die Feier vervielfacht. Schau auf der Website des Clubs nach dem aktuellen Programm.</p>

<h2>So holst du das Beste aus den Events</h2>
<ul>
<li><strong>Unterkunft:</strong> buche Monate im Voraus für Sant Jaume und die Hochsaison Juli-August</li>
<li><strong>Abendessen:</strong> <a href="/hiru">Hiru Food &amp; Drinks</a> ist perfekt für ein Essen vor abendlichen Events, mit langen Öffnungszeiten und mediterraner Grillküche</li>
<li><strong>Vor dem Event:</strong> die <a href="/enjoy">Enjoy Terrace</a> öffnet ab 17:00 Uhr, ideal für Cocktails und Shisha vor den Festlichkeiten</li>
<li><strong>Transport:</strong> während der Hauptfeste werden Bus- und Taxidienste erweitert</li>
<li><strong>Sprache:</strong> Alcudia ist sehr international; du kommst gut mit Spanisch, Englisch und Deutsch zurecht</li>
</ul>

<h2>Ein Sommer zum Erinnern</h2>
<p>Alcudia verbindet Tradition und Moderne auf eine Weise, die nur wenige Reiseziele schaffen. Du kannst nachmittags die Authentizität jahrhundertealter Patronatsfeste erleben und abends in einem Club mit erstklassiger Produktion feiern. Das ist die Magie dieser Ecke im Norden Mallorcas.</p>`,
      fr: `<p>Alcudia ne se resume pas a la plage et a la gastronomie : c'est une commune dotee d'une vie culturelle vibrante qui s'intensifie pendant les mois d'ete. Des fetes patronales seculaires aux festivals contemporains, le calendrier des evenements d'Alcudia en 2026 regorge de plans pour tous les gouts. Voici un guide complet pour ne rien manquer.</p>

<h2>Sant Jaume : les fetes patronales (semaine du 25 juillet)</h2>
<p>Les fetes de Sant Jaume sont l'evenement le plus important de l'annee a Alcudia. Pendant la semaine du 25 juillet, la vieille ville se transforme avec des processions traditionnelles, des concerts sur la place, des spectacles de feu, des correfocs (courses avec feux d'artifice) et la traditionnelle verbena populaire. C'est l'essence de la culture majorquine concentree en une semaine de celebrations intenses.</p>
<ul>
<li><strong>Dates :</strong> semaine du 25 juillet 2026</li>
<li><strong>Ou :</strong> vieille ville d'Alcudia et environs</li>
<li><strong>Incontournable :</strong> les correfocs (jeudi), le concert sur la place (vendredi) et la verbena du samedi</li>
<li><strong>Conseil :</strong> reservez au restaurant a l'avance, la demande explose pendant Sant Jaume</li>
</ul>

<h2>La Gran Verbena del Verano (19 juillet)</h2>
<p>L'un des evenements musicaux les plus attendus de l'ete dans le nord de Majorque. La Gran Verbena del Verano a lieu le 19 juillet avec trois scenes simultanees couvrant differents styles musicaux. De la musique electronique au pop en live en passant par des sessions DJ, c'est une soiree concue pour que chacun trouve son rythme.</p>
<ul>
<li><strong>Date :</strong> 19 juillet 2026</li>
<li><strong>Format :</strong> 3 scenes avec differents styles musicaux</li>
<li><strong>Horaires :</strong> a partir de 21h00 jusqu'au petit matin</li>
</ul>

<h2>Sant Joan et la Nit de Foc (23 juin)</h2>
<p>La nuit la plus magique de l'annee. La Nit de Foc du 23 juin celebre le solstice d'ete avec des feux de joie sur la plage, des feux d'artifice et une ambiance festive qui parcourt toute la cote de Port d'Alcudia. La tradition veut que l'on saute par-dessus les feux pour se purifier et attirer la bonne chance. C'est une experience unique qui allie tradition, feu et la nuit la plus courte de l'annee.</p>

<h2>Foire a la Seiche (avril)</h2>
<p>Chaque printemps, Alcudia celebre sa tradition de peche avec la Feria de la Sepia. Ce festival gastronomique reunit les restaurants de la commune autour d'un ingredient vedette : la seiche fraiche de la baie d'Alcudia. Degustations, menus speciaux et activites culturelles font de cette foire un rendez-vous incontournable pour les amateurs de bonne cuisine.</p>

<h2>CIRCAIRE : Festival International de Cirque (mai)</h2>
<p>CIRCAIRE est le festival international de cirque contemporain qui se tient dans la vieille ville d'Alcudia au mois de mai. Des compagnies de cirque de toute l'Europe se produisent sur les places et dans les rues du village, proposant des spectacles gratuits d'acrobatie, de jonglerie, de theatre physique et d'arts aeriens. C'est un evenement familial qui transforme le centre historique en scene a ciel ouvert.</p>

<h2>Evenements speciaux a Outxide Club</h2>
<p>Pendant les semaines de festival, <a href="/outxide">Outxide Club</a> programme des evenements speciaux avec des DJs de renom et des soirees thematiques qui completent le calendrier culturel d'Alcudia. Les nuits de Sant Jaume et de La Gran Verbena sont particulierement memorables, avec des programmations prolongees et une energie qui demultiplie la fete. Consultez la programmation actualisee sur le site du club.</p>

<h2>Comment profiter au maximum des evenements</h2>
<ul>
<li><strong>Hebergement :</strong> reservez des mois a l'avance pour Sant Jaume et la haute saison de juillet-aout</li>
<li><strong>Diner :</strong> <a href="/hiru">Hiru Food &amp; Drinks</a> est parfait pour diner avant tout evenement nocturne, avec des horaires etendus et une cuisine mediterraneenne au grill</li>
<li><strong>Avant l'evenement :</strong> <a href="/enjoy">Enjoy Terrace</a> ouvre des 17h00, ideal pour des cocktails et une chicha avant les festivites</li>
<li><strong>Transport :</strong> pendant les fetes principales, les services de bus et de taxi sont renforces</li>
<li><strong>Langue :</strong> Alcudia est tres internationale, vous vous en sortirez bien en espagnol, anglais et allemand</li>
</ul>

<h2>Un ete inoubliable</h2>
<p>Alcudia allie tradition et modernite d'une maniere que peu de destinations reussissent. Vous pouvez vivre l'authenticite de fetes patronales centenaires l'apres-midi et terminer dans un club avec une production haut de gamme le soir. C'est la magie de ce coin du nord de Majorque.</p>`,
      it: `<p>Alcudia non e' solo spiaggia e gastronomia: e' un comune con una vita culturale vibrante che si intensifica durante i mesi estivi. Dalle feste patronali con secoli di storia ai festival contemporanei, il calendario degli eventi di Alcudia nel 2026 e' ricco di proposte per tutti i gusti. Ecco una guida completa per non perderti nulla.</p>

<h2>Sant Jaume: le feste patronali (settimana del 25 luglio)</h2>
<p>Le feste di Sant Jaume sono l'evento piu' importante dell'anno ad Alcudia. Durante la settimana del 25 luglio, il centro storico si trasforma con processioni tradizionali, concerti in piazza, spettacoli di fuoco, correfocs (corse con fuochi d'artificio) e la tradizionale verbena popolare. E' l'essenza della cultura maiorchina concentrata in una settimana di celebrazione intensa.</p>
<ul>
<li><strong>Date:</strong> settimana del 25 luglio 2026</li>
<li><strong>Dove:</strong> centro storico di Alcudia e dintorni</li>
<li><strong>Imperdibile:</strong> i correfocs (giovedi'), il concerto in piazza (venerdi') e la verbena del sabato</li>
<li><strong>Consiglio:</strong> prenota il ristorante con anticipo, la domanda aumenta molto durante Sant Jaume</li>
</ul>

<h2>La Gran Verbena del Verano (19 luglio)</h2>
<p>Uno degli eventi musicali piu' attesi dell'estate nel nord di Maiorca. La Gran Verbena del Verano si celebra il 19 luglio con tre palchi simultanei che coprono diversi stili musicali. Dalla musica elettronica al pop dal vivo e sessioni DJ, e' una serata pensata perche' tutti trovino il proprio ritmo.</p>
<ul>
<li><strong>Data:</strong> 19 luglio 2026</li>
<li><strong>Formato:</strong> 3 palchi con diversi stili musicali</li>
<li><strong>Orario:</strong> dalle 21:00 fino a tarda notte</li>
</ul>

<h2>Sant Joan e la Nit de Foc (23 giugno)</h2>
<p>La notte piu' magica dell'anno. La Nit de Foc del 23 giugno celebra il solstizio d'estate con falo' sulla spiaggia, fuochi d'artificio e un'atmosfera festiva che percorre tutta la costa di Port d'Alcudia. La tradizione impone di saltare i falo' per purificarsi e attirare buona fortuna. E' un'esperienza unica che combina tradizione, fuoco e la notte piu' corta dell'anno.</p>

<h2>Fiera della Seppia (aprile)</h2>
<p>Ogni primavera, Alcudia celebra la sua tradizione marinara con la Fiera della Seppia. Questo festival gastronomico riunisce i ristoranti del comune attorno a un ingrediente protagonista: la seppia fresca della baia di Alcudia. Degustazioni, menu speciali e attivita' culturali rendono questa fiera un appuntamento imperdibile per gli amanti della buona cucina.</p>

<h2>CIRCAIRE: Festival Internazionale del Circo (maggio)</h2>
<p>CIRCAIRE e' il festival internazionale di circo contemporaneo che si svolge nel centro storico di Alcudia durante il mese di maggio. Compagnie circensi da tutta Europa si esibiscono nelle piazze e nelle strade del paese, offrendo spettacoli gratuiti di acrobazie, giocoleria, teatro fisico e arti aeree. E' un evento per tutta la famiglia che trasforma il centro storico in un palcoscenico all'aperto.</p>

<h2>Eventi speciali all'Outxide Club</h2>
<p>Durante le settimane dei festival, <a href="/outxide">Outxide Club</a> programma eventi speciali con DJ di spicco e feste a tema che completano il calendario culturale di Alcudia. Le serate di Sant Jaume e della Gran Verbena sono particolarmente memorabili, con programmazioni estese e un'energia che moltiplica la festa. Consulta la programmazione aggiornata sul sito del club.</p>

<h2>Come goderti gli eventi al massimo</h2>
<ul>
<li><strong>Alloggio:</strong> prenota con mesi di anticipo per Sant Jaume e l'alta stagione di luglio-agosto</li>
<li><strong>Cena:</strong> <a href="/hiru">Hiru Food &amp; Drinks</a> e' perfetto per cenare prima di qualsiasi evento serale, con orari ampi e cucina mediterranea alla brace</li>
<li><strong>Pre-evento:</strong> <a href="/enjoy">Enjoy Terrace</a> apre dalle 17:00, ideale per cocktail e shisha prima delle feste</li>
<li><strong>Trasporto:</strong> durante le feste principali, il servizio di autobus e taxi viene ampliato</li>
<li><strong>Lingua:</strong> Alcudia e' molto internazionale, ti muoverai bene in spagnolo, inglese e tedesco</li>
</ul>

<h2>Un'estate da ricordare</h2>
<p>Alcudia combina tradizione e modernita' in un modo che poche destinazioni riescono a ottenere. Puoi vivere l'autenticita' di feste patronali centenarie nel pomeriggio e finire in un club con produzione di primo livello la sera. Questa e' la magia di questo angolo del nord di Maiorca.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-25",
    image: "/images/enjoy/487828104_1394995181903485_876093983168073158_n.jpg",
    tags: ["activities", "alcudia", "mallorca", "events"],
    venue: "general",
    readingTime: 7,
  },
  {
    slug: "donde-cenar-tarde-port-alcudia",
    title: {
      es: "Dónde Cenar Tarde en Port d'Alcúdia",
      en: "Where to Eat Late in Port d'Alcudia",
      de: "Wo man in Port d'Alcudia spät essen kann",
      fr: "Ou Diner Tard a Port d'Alcudia",
      it: "Dove Cenare Tardi a Port d'Alcudia",
    },
    excerpt: {
      es: "Guía de restaurantes abiertos hasta tarde en Port d'Alcúdia. Cenar después de medianoche, cocina mediterránea a la brasa y la transición perfecta a la noche.",
      en: "Guide to late-night restaurants in Port d'Alcudia. Dinner after midnight, Mediterranean charcoal grill cuisine and the perfect transition into the night.",
      de: "Guide für Spätabend-Restaurants in Port d'Alcudia. Abendessen nach Mitternacht, mediterrane Grillküche und der perfekte Übergang ins Nachtleben.",
      fr: "Guide des restaurants ouverts tard a Port d'Alcudia. Diner apres minuit, cuisine mediterraneenne au grill et la transition parfaite vers la nuit.",
      it: "Guida ai ristoranti aperti fino a tardi a Port d'Alcudia. Cenare dopo mezzanotte, cucina mediterranea alla brace e la transizione perfetta verso la notte.",
    },
    content: {
      es: `<p>Uno de los grandes desafíos de las vacaciones de verano es encontrar dónde cenar tarde. Muchos restaurantes cierran la cocina a las 22:00 o incluso antes, justo cuando la noche empieza a despertar. En Port d'Alcúdia, sin embargo, hay opciones para quienes prefieren cenar con calma, sin prisas y a horas que el resto del mundo considera tardías.</p>

<h2>Hiru Food &amp; Drinks: cenas hasta la 1:00 los fines de semana</h2>
<p>Si buscas cenar tarde en Port d'Alcúdia sin sacrificar calidad, <a href="/hiru">Hiru Food &amp; Drinks</a> es la respuesta. Situado en Ctra. d'Artà 40, este restaurante mantiene la cocina abierta hasta las 23:30 de domingo a jueves y hasta la 1:00 de la madrugada los viernes y sábados. Eso significa que puedes llegar a las 23:00 un sábado y sentarte a disfrutar de una cena completa sin que nadie te meta prisa.</p>

<h3>La carta nocturna</h3>
<p>La carta de Hiru está disponible en su totalidad durante todo el horario de servicio. No hay carta reducida ni versión nocturna limitada: puedes pedir las mismas carnes maduradas a la brasa, los mismos arroces de lonja con pescado y marisco fresco, y los mismos pescados del Mediterráneo a la parrilla que a cualquier otra hora. Eso es una rareza en una zona turística donde muchos locales simplifican su oferta por la noche.</p>

<h3>Datos prácticos de Hiru</h3>
<ul>
<li><strong>Horario de cocina:</strong> 12:00 a 23:30 (viernes y sábado hasta 1:00). Martes cerrado</li>
<li><strong>Dirección:</strong> Ctra. d'Artà, 40, Port d'Alcúdia</li>
<li><strong>Reservas:</strong> muy recomendable para cenas tardías los fines de semana. Online o al 971 853 932</li>
<li><strong>Valoración:</strong> 4.9/5 en Google (132 opiniones)</li>
</ul>

<h2>Por qué cenar tarde tiene sentido en Mallorca</h2>
<p>El ritmo de vida en Mallorca durante el verano invita a cenar tarde. Los días son largos, el sol no se pone hasta las 21:30, y la temperatura es más agradable a partir de las 22:00. Cenar a las 23:00 no es una excentricidad: es adaptarse al ritmo natural de la isla. Además, si planeas salir de noche, cenar tarde te permite disfrutar del día completo en la playa o de excursión sin interrupciones.</p>

<h2>La cena como preludio de la noche</h2>
<p>Cenar tarde en Port d'Alcúdia es también una estrategia inteligente para la noche. Después de una buena cena, el siguiente paso natural es un cóctel o una copa. <a href="/enjoy">Enjoy Terrace</a>, a pocos minutos de Hiru, está abierta hasta las 05:30 con cócteles de autor y shisha premium. Y si la noche pide más, <a href="/outxide">Outxide Club</a> abre a las 23:00 de jueves a sábado.</p>

<h3>La secuencia perfecta para un viernes o sábado</h3>
<ul>
<li><strong>22:30 - 00:00:</strong> cena en Hiru Food &amp; Drinks con carnes a la brasa y un buen vino</li>
<li><strong>00:00 - 01:30:</strong> cócteles y shisha en Enjoy Terrace</li>
<li><strong>01:30 en adelante:</strong> baile en Outxide Club hasta el amanecer</li>
</ul>

<h2>Otras opciones para cenar tarde en la zona</h2>
<p>El paseo marítimo de Port d'Alcúdia tiene varios restaurantes que mantienen horarios amplios durante el verano, aunque pocos ofrecen cocina de la calidad de Hiru hasta tan tarde. Los bares de tapas y algunos restaurantes italianos de la zona también sirven platos ligeros hasta tarde. La zona del puerto deportivo tiene opciones informales para quienes buscan algo rápido.</p>

<h2>Consejos para cenar tarde en Alcúdia</h2>
<ul>
<li><strong>Reserva siempre:</strong> las mesas para cenas tardías los fines de semana se agotan rápido</li>
<li><strong>No tengas prisa:</strong> cenar tarde en Mallorca es un ritual, disfruta cada plato</li>
<li><strong>Pregunta por las sugerencias del día:</strong> el pescado y el producto fresco cambian a diario</li>
<li><strong>Lleva ropa cómoda pero arreglada:</strong> si piensas ir al club después, viste para ambas ocasiones</li>
</ul>`,
      en: `<p>One of the great challenges of a summer holiday is finding somewhere to eat late. Many restaurants close the kitchen at 22:00 or even earlier, just when the night is starting to come alive. In Port d'Alcudia, however, there are options for those who prefer to dine at a relaxed pace, without rushing, at hours the rest of the world considers late.</p>

<h2>Hiru Food &amp; Drinks: dinner until 1:00 at weekends</h2>
<p>If you are looking for a late dinner in Port d'Alcudia without sacrificing quality, <a href="/hiru">Hiru Food &amp; Drinks</a> is the answer. Located at Ctra. d'Arta 40, this restaurant keeps the kitchen open until 23:30 Sunday to Thursday and until 1:00 on Fridays and Saturdays. That means you can arrive at 23:00 on a Saturday and sit down to a full dinner without anyone rushing you.</p>

<h3>The evening menu</h3>
<p>Hiru's full menu is available throughout all service hours. There is no reduced menu or limited late-night version: you can order the same aged meats from the charcoal grill, the same market-fresh rice dishes with fish and shellfish, and the same Mediterranean fish from the grill as at any other hour. That is a rarity in a tourist area where many places simplify their offering at night.</p>

<h3>Practical details</h3>
<ul>
<li><strong>Kitchen hours:</strong> 12:00 to 23:30 (Friday and Saturday until 1:00). Tuesday closed</li>
<li><strong>Address:</strong> Ctra. d'Arta, 40, Port d'Alcudia</li>
<li><strong>Reservations:</strong> highly recommended for late weekend dinners. Book online or call 971 853 932</li>
<li><strong>Rating:</strong> 4.9/5 on Google (132 reviews)</li>
</ul>

<h2>Why late dining makes sense in Mallorca</h2>
<p>The pace of life in Mallorca during summer invites late dining. Days are long, the sun does not set until 21:30, and the temperature is more pleasant from 22:00 onwards. Eating at 23:00 is not eccentric: it is adapting to the island's natural rhythm. Moreover, if you are planning a night out, eating late allows you to enjoy a full day at the beach or on an excursion without interruption.</p>

<h2>Dinner as a prelude to the night</h2>
<p>Eating late in Port d'Alcudia is also a smart strategy for the night ahead. After a great dinner, the next natural step is a cocktail or a drink. <a href="/enjoy">Enjoy Terrace</a>, just minutes from Hiru, is open until 05:30 with signature cocktails and premium shisha. And if the night calls for more, <a href="/outxide">Outxide Club</a> opens at 23:00 from Thursday to Saturday.</p>

<h3>The perfect Friday or Saturday sequence</h3>
<ul>
<li><strong>22:30 - 00:00:</strong> dinner at Hiru Food &amp; Drinks with grilled meats and a fine wine</li>
<li><strong>00:00 - 01:30:</strong> cocktails and shisha at Enjoy Terrace</li>
<li><strong>01:30 onwards:</strong> dancing at Outxide Club until sunrise</li>
</ul>

<h2>Other late dining options in the area</h2>
<p>Port d'Alcudia's promenade has several restaurants that keep extended hours during summer, though few offer cuisine of Hiru's quality until that late. Tapas bars and some Italian restaurants in the area also serve lighter dishes late. The marina area has informal options for those seeking something quick.</p>

<h2>Tips for late dining in Alcudia</h2>
<ul>
<li><strong>Always book:</strong> tables for late weekend dinners sell out quickly</li>
<li><strong>Do not rush:</strong> late dining in Mallorca is a ritual, savour every course</li>
<li><strong>Ask about daily specials:</strong> the fish and fresh produce change daily</li>
<li><strong>Dress smart-casual:</strong> if you plan to hit the club afterwards, dress for both occasions</li>
</ul>`,
      de: `<p>Eine der großen Herausforderungen im Sommerurlaub ist es, spät am Abend noch ein gutes Restaurant zu finden. Viele Küchen schließen um 22:00 Uhr oder sogar früher -- genau dann, wenn die Nacht erst beginnt. In Port d'Alcudia gibt es jedoch Optionen für alle, die lieber in Ruhe und ohne Hektik zu Abend essen, auch zu Uhrzeiten, die anderswo als spät gelten.</p>

<h2>Hiru Food &amp; Drinks: Abendessen bis 1:00 Uhr am Wochenende</h2>
<p>Wenn du in Port d'Alcudia spät essen möchtest, ohne auf Qualität zu verzichten, ist <a href="/hiru">Hiru Food &amp; Drinks</a> die Antwort. In der Ctra. d'Artà 40 gelegen, hält dieses Restaurant die Küche von Sonntag bis Donnerstag bis 23:30 Uhr und freitags und samstags bis 1:00 Uhr offen. Das bedeutet, du kannst am Samstagabend um 23:00 Uhr kommen und dich ohne Zeitdruck an ein vollständiges Abendessen setzen.</p>

<h3>Die Abendkarte</h3>
<p>Die komplette Speisekarte von Hiru ist während der gesamten Servicezeit verfügbar. Es gibt keine reduzierte Karte und keine eingeschränkte Nachtversion: du kannst das gleiche gereifte Fleisch vom Holzkohlegrill bestellen, die gleichen frischen Reisgerichte mit Fisch und Meeresfrüchten und den gleichen mediterranen Grillfisch wie zu jeder anderen Uhrzeit. Das ist eine Seltenheit in einer Touristenregion, wo viele Lokale ihr Angebot abends vereinfachen.</p>

<h3>Praktische Details</h3>
<ul>
<li><strong>Küchenzeiten:</strong> 12:00 bis 23:30 Uhr (Freitag und Samstag bis 1:00 Uhr). Dienstag geschlossen</li>
<li><strong>Adresse:</strong> Ctra. d'Artà, 40, Port d'Alcudia</li>
<li><strong>Reservierung:</strong> sehr empfehlenswert für späte Wochenendessen. Online buchen oder anrufen: 971 853 932</li>
<li><strong>Bewertung:</strong> 4.9/5 bei Google (132 Bewertungen)</li>
</ul>

<h2>Warum spätes Essen auf Mallorca Sinn macht</h2>
<p>Der Lebensrhythmus auf Mallorca im Sommer lädt zum späten Essen ein. Die Tage sind lang, die Sonne geht erst um 21:30 Uhr unter, und die Temperatur wird ab 22:00 Uhr angenehmer. Um 23:00 Uhr zu essen ist keine Extravaganz: es ist die Anpassung an den natürlichen Rhythmus der Insel. Außerdem kannst du, wenn du abends ausgehen willst, den ganzen Tag am Strand oder bei einem Ausflug genießen, ohne Unterbrechung.</p>

<h2>Das Abendessen als Auftakt der Nacht</h2>
<p>Spät in Port d'Alcudia zu essen ist auch eine kluge Strategie für die Nacht. Nach einem guten Abendessen ist der nächste natürliche Schritt ein Cocktail oder ein Drink. Die <a href="/enjoy">Enjoy Terrace</a>, nur wenige Minuten von Hiru entfernt, hat bis 05:30 Uhr geöffnet mit Signature-Cocktails und Premium-Shisha. Und wenn die Nacht nach mehr ruft, öffnet der <a href="/outxide">Outxide Club</a> von Donnerstag bis Samstag ab 23:00 Uhr.</p>

<h3>Der perfekte Freitag- oder Samstagabend</h3>
<ul>
<li><strong>22:30 - 00:00:</strong> Abendessen bei Hiru Food &amp; Drinks mit Grillspezialitäten und einem guten Wein</li>
<li><strong>00:00 - 01:30:</strong> Cocktails und Shisha in der Enjoy Terrace</li>
<li><strong>Ab 01:30:</strong> tanzen im Outxide Club bis zum Sonnenaufgang</li>
</ul>

<h2>Weitere Möglichkeiten für spätes Essen in der Umgebung</h2>
<p>Die Strandpromenade von Port d'Alcudia hat einige Restaurants mit langen Öffnungszeiten im Sommer, obwohl nur wenige Küche von Hirus Qualität bis so spät anbieten. Tapas-Bars und einige italienische Restaurants in der Gegend servieren ebenfalls leichte Gerichte bis spät. Das Yachthafenviertel bietet informelle Optionen für alle, die etwas Schnelles suchen.</p>

<h2>Tipps für spätes Essen in Alcudia</h2>
<ul>
<li><strong>Immer reservieren:</strong> Tische für späte Wochenendessen sind schnell vergeben</li>
<li><strong>Keine Eile:</strong> spätes Essen auf Mallorca ist ein Ritual -- genieße jeden Gang</li>
<li><strong>Frag nach den Tagesempfehlungen:</strong> Fisch und frische Produkte wechseln täglich</li>
<li><strong>Smart-Casual anziehen:</strong> wenn du danach in den Club willst, kleide dich für beides passend</li>
</ul>`,
      fr: `<p>L'un des grands defis des vacances d'ete est de trouver ou diner tard. De nombreux restaurants ferment la cuisine a 22h00 voire plus tot, juste au moment ou la nuit commence a s'animer. A Port d'Alcudia, cependant, il existe des options pour ceux qui preferent diner tranquillement, sans se presser, a des heures que le reste du monde considere comme tardives.</p>

<h2>Hiru Food &amp; Drinks : diners jusqu'a 1h00 le week-end</h2>
<p>Si vous cherchez a diner tard a Port d'Alcudia sans sacrifier la qualite, <a href="/hiru">Hiru Food &amp; Drinks</a> est la reponse. Situe au Ctra. d'Arta 40, ce restaurant maintient la cuisine ouverte jusqu'a 23h30 du dimanche au jeudi et jusqu'a 1h00 du matin les vendredis et samedis. Cela signifie que vous pouvez arriver a 23h00 un samedi et vous installer pour un diner complet sans que personne ne vous presse.</p>

<h3>La carte du soir</h3>
<p>La carte de Hiru est disponible dans son integralite pendant toute la duree du service. Il n'y a pas de carte reduite ni de version nocturne limitee : vous pouvez commander les memes viandes maturees au grill, les memes riz de la criee avec poisson et fruits de mer frais, et les memes poissons de Mediterranee grilles qu'a n'importe quelle autre heure. C'est une rarete dans une zone touristique ou de nombreux etablissements simplifient leur offre le soir.</p>

<h3>Informations pratiques sur Hiru</h3>
<ul>
<li><strong>Horaires cuisine :</strong> 12h00 a 23h30 (vendredi et samedi jusqu'a 1h00). Ferme le mardi</li>
<li><strong>Adresse :</strong> Ctra. d'Arta, 40, Port d'Alcudia</li>
<li><strong>Reservations :</strong> tres recommandees pour les diners tardifs le week-end. En ligne ou au 971 853 932</li>
<li><strong>Note :</strong> 4.9/5 sur Google (132 avis)</li>
</ul>

<h2>Pourquoi diner tard a du sens a Majorque</h2>
<p>Le rythme de vie a Majorque en ete invite a diner tard. Les journees sont longues, le soleil ne se couche qu'a 21h30 et la temperature devient plus agreable a partir de 22h00. Diner a 23h00 n'est pas une excentricite : c'est s'adapter au rythme naturel de l'ile. De plus, si vous prevoyez de sortir le soir, diner tard vous permet de profiter pleinement de la journee a la plage ou en excursion sans interruption.</p>

<h2>Le diner comme prelude a la nuit</h2>
<p>Diner tard a Port d'Alcudia est aussi une strategie intelligente pour la nuit. Apres un bon diner, l'etape suivante naturelle est un cocktail ou un verre. <a href="/enjoy">Enjoy Terrace</a>, a quelques minutes de Hiru, est ouvert jusqu'a 05h30 avec des cocktails signatures et une chicha premium. Et si la nuit en redemande, <a href="/outxide">Outxide Club</a> ouvre a 23h00 du jeudi au samedi.</p>

<h3>La sequence parfaite pour un vendredi ou samedi</h3>
<ul>
<li><strong>22h30 - 00h00 :</strong> diner chez Hiru Food &amp; Drinks avec viandes grillees et un bon vin</li>
<li><strong>00h00 - 01h30 :</strong> cocktails et chicha a Enjoy Terrace</li>
<li><strong>A partir de 01h30 :</strong> danser a Outxide Club jusqu'a l'aube</li>
</ul>

<h2>Autres options pour diner tard dans la zone</h2>
<p>La promenade maritime de Port d'Alcudia compte plusieurs restaurants aux horaires etendus pendant l'ete, bien que peu offrent une cuisine de la qualite de Hiru aussi tard. Les bars a tapas et certains restaurants italiens de la zone servent egalement des plats legers tard le soir. La zone du port de plaisance propose des options informelles pour ceux qui cherchent quelque chose de rapide.</p>

<h2>Conseils pour diner tard a Alcudia</h2>
<ul>
<li><strong>Reservez toujours :</strong> les tables pour les diners tardifs du week-end partent vite</li>
<li><strong>Ne vous pressez pas :</strong> diner tard a Majorque est un rituel, savourez chaque plat</li>
<li><strong>Demandez les suggestions du jour :</strong> le poisson et les produits frais changent quotidiennement</li>
<li><strong>Habillez-vous smart-casual :</strong> si vous comptez aller en club ensuite, habillez-vous pour les deux occasions</li>
</ul>`,
      it: `<p>Una delle grandi sfide delle vacanze estive e' trovare dove cenare tardi. Molti ristoranti chiudono la cucina alle 22:00 o addirittura prima, proprio quando la notte inizia a prendere vita. A Port d'Alcudia, tuttavia, ci sono opzioni per chi preferisce cenare con calma, senza fretta e ad orari che il resto del mondo considera tardivi.</p>

<h2>Hiru Food &amp; Drinks: cene fino all'1:00 nel fine settimana</h2>
<p>Se cerchi di cenare tardi a Port d'Alcudia senza sacrificare la qualita', <a href="/hiru">Hiru Food &amp; Drinks</a> e' la risposta. Situato in Ctra. d'Arta 40, questo ristorante mantiene la cucina aperta fino alle 23:30 da domenica a giovedi' e fino all'1:00 di notte il venerdi' e il sabato. Questo significa che puoi arrivare alle 23:00 di sabato e sederti a gustare una cena completa senza che nessuno ti metta fretta.</p>

<h3>Il menu serale</h3>
<p>Il menu di Hiru e' disponibile nella sua totalita' durante tutto l'orario di servizio. Non c'e' menu ridotto ne' versione notturna limitata: puoi ordinare le stesse carni frollate alla brace, gli stessi risi del mercato con pesce e frutti di mare freschi, e gli stessi pesci del Mediterraneo alla griglia che a qualsiasi altra ora. Questa e' una rarita' in una zona turistica dove molti locali semplificano la loro offerta di sera.</p>

<h3>Informazioni pratiche su Hiru</h3>
<ul>
<li><strong>Orario cucina:</strong> 12:00 - 23:30 (venerdi' e sabato fino all'1:00). Martedi' chiuso</li>
<li><strong>Indirizzo:</strong> Ctra. d'Arta, 40, Port d'Alcudia</li>
<li><strong>Prenotazioni:</strong> molto consigliate per le cene tardive nel fine settimana. Online o al 971 853 932</li>
<li><strong>Valutazione:</strong> 4.9/5 su Google (132 recensioni)</li>
</ul>

<h2>Perche' cenare tardi ha senso a Maiorca</h2>
<p>Il ritmo di vita a Maiorca durante l'estate invita a cenare tardi. Le giornate sono lunghe, il sole non tramonta fino alle 21:30, e la temperatura e' piu' gradevole a partire dalle 22:00. Cenare alle 23:00 non e' un'eccentricita': e' adattarsi al ritmo naturale dell'isola. Inoltre, se hai in programma di uscire la sera, cenare tardi ti permette di goderti l'intera giornata in spiaggia o in escursione senza interruzioni.</p>

<h2>La cena come preludio della serata</h2>
<p>Cenare tardi a Port d'Alcudia e' anche una strategia intelligente per la serata. Dopo una buona cena, il passo successivo naturale e' un cocktail o un drink. <a href="/enjoy">Enjoy Terrace</a>, a pochi minuti da Hiru, e' aperta fino alle 05:30 con cocktail d'autore e shisha premium. E se la serata chiede di piu', <a href="/outxide">Outxide Club</a> apre alle 23:00 da giovedi' a sabato.</p>

<h3>La sequenza perfetta per un venerdi' o sabato</h3>
<ul>
<li><strong>22:30 - 00:00:</strong> cena da Hiru Food &amp; Drinks con carni alla brace e un buon vino</li>
<li><strong>00:00 - 01:30:</strong> cocktail e shisha da Enjoy Terrace</li>
<li><strong>Dall'01:30 in poi:</strong> ballare all'Outxide Club fino all'alba</li>
</ul>

<h2>Altre opzioni per cenare tardi nella zona</h2>
<p>Il lungomare di Port d'Alcudia ha diversi ristoranti che mantengono orari ampi durante l'estate, anche se pochi offrono cucina della qualita' di Hiru fino a cosi' tardi. I bar di tapas e alcuni ristoranti italiani della zona servono anche piatti leggeri fino a tardi. La zona del porto turistico ha opzioni informali per chi cerca qualcosa di veloce.</p>

<h2>Consigli per cenare tardi ad Alcudia</h2>
<ul>
<li><strong>Prenota sempre:</strong> i tavoli per le cene tardive nel fine settimana si esauriscono rapidamente</li>
<li><strong>Non avere fretta:</strong> cenare tardi a Maiorca e' un rituale, goditi ogni portata</li>
<li><strong>Chiedi dei suggerimenti del giorno:</strong> il pesce e il prodotto fresco cambiano quotidiennemente</li>
<li><strong>Vestiti in modo curato ma comodo:</strong> se pensi di andare in discoteca dopo, vestiti per entrambe le occasioni</li>
</ul>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-01",
    image: "/images/hiru/496940399_122233184186201104_8598588797519462132_n.jpg",
    tags: ["food", "restaurants", "alcudia", "nightlife"],
    venue: "hiru",
    readingTime: 5,
  },
  {
    slug: "shisha-bar-terraza-lounge-mallorca",
    title: {
      es: "Shisha Bar y Terraza Lounge en Mallorca",
      en: "Shisha Bar and Terrace Lounge in Mallorca",
      de: "Shisha-Bar und Terrassen-Lounge auf Mallorca",
      fr: "Shisha Bar et Terrasse Lounge a Majorque",
      it: "Shisha Bar e Terrazza Lounge a Maiorca",
    },
    excerpt: {
      es: "Descubre la experiencia de shisha premium en Enjoy Terrace, Alcúdia: sabores, cócteles, ambiente lounge y el mejor atardecer de Mallorca.",
      en: "Discover the premium shisha experience at Enjoy Terrace, Alcudia: flavours, cocktails, lounge atmosphere and the best sunset in Mallorca.",
      de: "Entdecke das Premium-Shisha-Erlebnis in der Enjoy Terrace, Alcudia: Aromen, Cocktails, Lounge-Atmosphäre und der schönste Sonnenuntergang Mallorcas.",
      fr: "Decouvrez l'experience chicha premium a Enjoy Terrace, Alcudia : saveurs, cocktails, ambiance lounge et le plus beau coucher de soleil de Majorque.",
      it: "Scopri l'esperienza shisha premium da Enjoy Terrace, Alcudia: gusti, cocktail, atmosfera lounge e il miglior tramonto di Maiorca.",
    },
    content: {
      es: `<p>La cultura de la shisha se ha convertido en una parte esencial de la escena de ocio en Mallorca. Cada vez más viajeros buscan un lugar donde disfrutar de una buena shisha al atardecer, combinada con cócteles de calidad y un ambiente cuidado. En Port d'Alcúdia, <a href="/enjoy">Enjoy Terrace</a> ha creado exactamente esa experiencia: la mejor shisha bar con terraza lounge del norte de Mallorca.</p>

<h2>La experiencia shisha en Enjoy Terrace</h2>
<p>Enjoy Terrace, situado en Av. Tucán 1, Port d'Alcúdia, no es un bar de shisha al uso. Es un espacio diseñado para convertir cada sesión en una experiencia sensorial completa. Desde la selección de tabaco premium hasta la preparación meticulosa de cada cachimba, todo está pensado para ofrecer el máximo disfrute.</p>

<h3>Variedad de sabores</h3>
<p>La carta de shisha de Enjoy Terrace incluye una amplia gama de sabores que se renueva por temporada. Encontrarás desde los clásicos más demandados hasta mezclas exclusivas creadas por el equipo.</p>
<ul>
<li><strong>Frutales clásicos:</strong> manzana, melocotón, sandía, uva y mango</li>
<li><strong>Mentolados y frescos:</strong> menta, hierbabuena y combinaciones con cítricos</li>
<li><strong>Mezclas especiadas:</strong> canela, cardamomo y toques orientales</li>
<li><strong>Creaciones de la casa:</strong> combinaciones exclusivas que cambian cada temporada</li>
</ul>

<h3>Maridaje shisha y cóctel</h3>
<p>Lo que distingue a Enjoy Terrace de otros locales de shisha es la posibilidad de maridar tu cachimba con un cóctel de autor. El equipo de bartenders crea combinaciones pensadas específicamente para complementar los sabores de la shisha. Un cóctel con cítricos y hierbas frescas potencia las notas frutales de la cachimba, mientras que un combinado más especiado acompaña de manera perfecta las mezclas orientales.</p>

<h2>El ambiente: terraza lounge al aire libre</h2>
<p>Enjoy Terrace ha sido diseñada como un espacio lounge al aire libre donde cada detalle contribuye a la experiencia. La iluminación ambiental crea una atmósfera íntima sin perder la conexión con el cielo mallorquín. El mobiliario, con sofás amplios y mesas bajas, está pensado para sesiones largas y conversaciones sin prisa.</p>

<h3>El atardecer en la terraza</h3>
<p>Los atardeceres en Enjoy Terrace son un espectáculo diario. A partir de las 19:00 en verano, la luz dorada del sol bajando sobre Alcúdia crea el escenario perfecto para una shisha y un cóctel. Es el momento más fotogénico del día y una de las razones por las que tantos visitantes regresan noche tras noche.</p>

<h2>Datos prácticos</h2>
<ul>
<li><strong>Horario:</strong> todos los días de 17:00 a 05:30</li>
<li><strong>Dirección:</strong> Av. Tucán, 1, Port d'Alcúdia</li>
<li><strong>Valoración:</strong> 4.5/5 en Google (318 opiniones)</li>
<li><strong>Reservas:</strong> no imprescindibles, pero recomendables para grupos y fines de semana</li>
</ul>

<h2>La shisha como experiencia social</h2>
<p>La shisha es, por naturaleza, una experiencia compartida. En Enjoy Terrace, verás grupos de amigos, parejas y familias disfrutando juntos de una cachimba mientras conversan y se relajan. Es una forma diferente de socializar, más pausada y sensorial que simplemente tomar una copa. El equipo siempre está disponible para guiarte en la elección del sabor y ayudarte a sacar el máximo partido de tu sesión.</p>

<h2>Después de la shisha: la noche continúa</h2>
<p>Una de las grandes ventajas de Enjoy Terrace es su ubicación estratégica. Para quienes quieran cenar, <a href="/hiru">Hiru Food &amp; Drinks</a> ofrece cocina mediterránea a la brasa a poca distancia. Y para los que buscan alargar la noche, <a href="/outxide">Outxide Club</a> está justo al lado, con las mejores sesiones de DJ del norte de Mallorca de jueves a sábado.</p>`,
      en: `<p>Shisha culture has become an essential part of the leisure scene in Mallorca. More and more travellers look for a place to enjoy quality shisha at sunset, paired with excellent cocktails and a carefully curated atmosphere. In Port d'Alcudia, <a href="/enjoy">Enjoy Terrace</a> has created exactly that experience: the best shisha bar with terrace lounge in northern Mallorca.</p>

<h2>The shisha experience at Enjoy Terrace</h2>
<p>Enjoy Terrace, at Av. Tucan 1, Port d'Alcudia, is not a typical shisha bar. It is a space designed to turn every session into a complete sensory experience. From the selection of premium tobacco to the meticulous preparation of each hookah, everything is crafted for maximum enjoyment.</p>

<h3>Flavour variety</h3>
<p>The Enjoy Terrace shisha menu includes a wide range of flavours that is refreshed seasonally. You will find everything from the most popular classics to exclusive blends created by the team.</p>
<ul>
<li><strong>Classic fruity:</strong> apple, peach, watermelon, grape and mango</li>
<li><strong>Menthol and fresh:</strong> mint, spearmint and citrus combinations</li>
<li><strong>Spiced blends:</strong> cinnamon, cardamom and oriental touches</li>
<li><strong>House creations:</strong> exclusive combinations that change each season</li>
</ul>

<h3>Shisha and cocktail pairing</h3>
<p>What sets Enjoy Terrace apart from other shisha venues is the possibility of pairing your hookah with a signature cocktail. The bartending team creates combinations specifically designed to complement shisha flavours. A cocktail with citrus and fresh herbs enhances the fruity notes of the hookah, while a spicier mix pairs perfectly with oriental blends.</p>

<h2>The atmosphere: open-air terrace lounge</h2>
<p>Enjoy Terrace has been designed as an open-air lounge where every detail contributes to the experience. Ambient lighting creates an intimate atmosphere without losing the connection to the Mallorcan sky. The furniture, with spacious sofas and low tables, is built for long sessions and unhurried conversation.</p>

<h3>Sunset on the terrace</h3>
<p>Sunsets at Enjoy Terrace are a daily spectacle. From 19:00 in summer, the golden light of the sun dropping over Alcudia creates the perfect backdrop for a shisha and a cocktail. It is the most photogenic moment of the day and one of the reasons so many visitors return night after night.</p>

<h2>Practical details</h2>
<ul>
<li><strong>Hours:</strong> daily from 17:00 to 05:30</li>
<li><strong>Address:</strong> Av. Tucan, 1, Port d'Alcudia</li>
<li><strong>Rating:</strong> 4.5/5 on Google (318 reviews)</li>
<li><strong>Reservations:</strong> not essential, but recommended for groups and weekends</li>
</ul>

<h2>Shisha as a social experience</h2>
<p>Shisha is, by nature, a shared experience. At Enjoy Terrace you will see groups of friends, couples and families enjoying a hookah together while they talk and unwind. It is a different way of socialising, more unhurried and sensory than simply having a drink. The team is always available to guide your flavour choice and help you get the most out of your session.</p>

<h2>After shisha: the night continues</h2>
<p>One of Enjoy Terrace's great advantages is its strategic location. For those wanting dinner, <a href="/hiru">Hiru Food &amp; Drinks</a> offers Mediterranean charcoal grill cuisine a short walk away. And for those looking to extend the night, <a href="/outxide">Outxide Club</a> is right next door, with the best DJ sessions in northern Mallorca from Thursday to Saturday.</p>`,
      de: `<p>Die Shisha-Kultur ist ein fester Bestandteil der Freizeitszene auf Mallorca geworden. Immer mehr Reisende suchen einen Ort, an dem sie bei Sonnenuntergang eine hochwertige Shisha genießen können, kombiniert mit erstklassigen Cocktails und einer sorgfältig gestalteten Atmosphäre. In Port d'Alcudia hat die <a href="/enjoy">Enjoy Terrace</a> genau dieses Erlebnis geschaffen: die beste Shisha-Bar mit Terrassen-Lounge im Norden Mallorcas.</p>

<h2>Das Shisha-Erlebnis in der Enjoy Terrace</h2>
<p>Die Enjoy Terrace in der Av. Tucán 1, Port d'Alcudia, ist keine gewöhnliche Shisha-Bar. Es ist ein Raum, der darauf ausgelegt ist, jede Session in ein vollständiges Sinneserlebnis zu verwandeln. Von der Auswahl des Premium-Tabaks bis zur sorgfältigen Zubereitung jeder Wasserpfeife ist alles auf maximalen Genuss ausgerichtet.</p>

<h3>Geschmacksvielfalt</h3>
<p>Die Shisha-Karte der Enjoy Terrace umfasst eine breite Palette von Aromen, die saisonal erneuert wird. Du findest alles von den beliebtesten Klassikern bis hin zu exklusiven Mischungen, die vom Team kreiert werden.</p>
<ul>
<li><strong>Fruchtige Klassiker:</strong> Apfel, Pfirsich, Wassermelone, Traube und Mango</li>
<li><strong>Menthol und Frische:</strong> Minze, Pfefferminze und Zitrus-Kombinationen</li>
<li><strong>Würzige Mischungen:</strong> Zimt, Kardamom und orientalische Noten</li>
<li><strong>Hauskreationen:</strong> exklusive Kombinationen, die sich jede Saison ändern</li>
</ul>

<h3>Shisha-Cocktail-Pairing</h3>
<p>Was die Enjoy Terrace von anderen Shisha-Lokalen unterscheidet, ist die Möglichkeit, deine Wasserpfeife mit einem Signature-Cocktail zu kombinieren. Das Bartender-Team kreiert Kombinationen, die speziell darauf abgestimmt sind, die Shisha-Aromen zu ergänzen. Ein Cocktail mit Zitrus und frischen Kräutern verstärkt die fruchtigen Noten der Shisha, während ein würzigerer Mix perfekt zu den orientalischen Mischungen passt.</p>

<h2>Die Atmosphäre: Freiluft-Terrassen-Lounge</h2>
<p>Die Enjoy Terrace wurde als Freiluft-Lounge konzipiert, in der jedes Detail zum Erlebnis beiträgt. Stimmungsvolle Beleuchtung schafft eine intime Atmosphäre, ohne die Verbindung zum mallorquinischen Himmel zu verlieren. Die Möblierung mit geräumigen Sofas und niedrigen Tischen ist für lange Sessions und entspannte Gespräche gemacht.</p>

<h3>Sonnenuntergang auf der Terrasse</h3>
<p>Die Sonnenuntergänge auf der Enjoy Terrace sind ein tägliches Spektakel. Ab 19:00 Uhr im Sommer erzeugt das goldene Licht der untergehenden Sonne über Alcudia die perfekte Kulisse für eine Shisha und einen Cocktail. Es ist der fotogenste Moment des Tages und einer der Gründe, warum so viele Besucher Abend für Abend wiederkommen.</p>

<h2>Praktische Details</h2>
<ul>
<li><strong>Öffnungszeiten:</strong> täglich von 17:00 bis 05:30 Uhr</li>
<li><strong>Adresse:</strong> Av. Tucán, 1, Port d'Alcudia</li>
<li><strong>Bewertung:</strong> 4.5/5 bei Google (318 Bewertungen)</li>
<li><strong>Reservierung:</strong> nicht zwingend, aber empfehlenswert für Gruppen und Wochenenden</li>
</ul>

<h2>Shisha als soziales Erlebnis</h2>
<p>Shisha ist von Natur aus ein gemeinsames Erlebnis. In der Enjoy Terrace siehst du Freundesgruppen, Paare und Familien, die zusammen eine Wasserpfeife genießen, sich unterhalten und entspannen. Es ist eine andere Art des Zusammenseins, ruhiger und sinnlicher als einfach nur etwas trinken zu gehen. Das Team steht immer bereit, dich bei der Geschmackswahl zu beraten und dir zu helfen, das Beste aus deiner Session herauszuholen.</p>

<h2>Nach der Shisha: die Nacht geht weiter</h2>
<p>Einer der großen Vorteile der Enjoy Terrace ist ihre strategische Lage. Wer Abendessen möchte, findet bei <a href="/hiru">Hiru Food &amp; Drinks</a> nur wenige Gehminuten entfernt mediterrane Grillküche. Und wer die Nacht verlängern will, hat mit dem <a href="/outxide">Outxide Club</a> direkt nebenan die besten DJ-Sessions im Norden Mallorcas, von Donnerstag bis Samstag.</p>`,
      fr: `<p>La culture de la chicha est devenue un element essentiel de la scene de loisirs a Majorque. De plus en plus de voyageurs recherchent un lieu ou profiter d'une bonne chicha au coucher du soleil, accompagnee de cocktails de qualite et d'une ambiance soignee. A Port d'Alcudia, <a href="/enjoy">Enjoy Terrace</a> a cree exactement cette experience : le meilleur shisha bar avec terrasse lounge du nord de Majorque.</p>

<h2>L'experience chicha a Enjoy Terrace</h2>
<p>Enjoy Terrace, situe au Av. Tucan 1, Port d'Alcudia, n'est pas un bar a chicha ordinaire. C'est un espace concu pour transformer chaque session en une experience sensorielle complete. De la selection du tabac premium a la preparation meticuleuse de chaque narguile, tout est pense pour offrir un plaisir maximal.</p>

<h3>Variete de saveurs</h3>
<p>La carte chicha d'Enjoy Terrace comprend une large gamme de saveurs renouvelee par saison. Vous y trouverez aussi bien les classiques les plus demandes que des melanges exclusifs crees par l'equipe.</p>
<ul>
<li><strong>Fruites classiques :</strong> pomme, peche, pasteque, raisin et mangue</li>
<li><strong>Mentholes et frais :</strong> menthe, menthe verte et combinaisons d'agrumes</li>
<li><strong>Melanges epices :</strong> cannelle, cardamome et touches orientales</li>
<li><strong>Creations maison :</strong> combinaisons exclusives qui changent chaque saison</li>
</ul>

<h3>Accord chicha et cocktail</h3>
<p>Ce qui distingue Enjoy Terrace des autres etablissements de chicha, c'est la possibilite d'accorder votre narguile avec un cocktail signature. L'equipe de bartenders cree des combinaisons specialement pensees pour complementer les saveurs de la chicha. Un cocktail aux agrumes et herbes fraiches rehausse les notes fruitees du narguile, tandis qu'un melange plus epice accompagne parfaitement les saveurs orientales.</p>

<h2>L'ambiance : terrasse lounge en plein air</h2>
<p>Enjoy Terrace a ete concue comme un espace lounge en plein air ou chaque detail contribue a l'experience. L'eclairage d'ambiance cree une atmosphere intime sans perdre la connexion avec le ciel majorquin. Le mobilier, avec ses canapes spacieux et tables basses, est pense pour de longues sessions et des conversations sans hate.</p>

<h3>Le coucher de soleil sur la terrasse</h3>
<p>Les couchers de soleil a Enjoy Terrace sont un spectacle quotidien. A partir de 19h00 en ete, la lumiere doree du soleil descendant sur Alcudia cree le decor parfait pour une chicha et un cocktail. C'est le moment le plus photogenique de la journee et l'une des raisons pour lesquelles tant de visiteurs reviennent soir apres soir.</p>

<h2>Informations pratiques</h2>
<ul>
<li><strong>Horaires :</strong> tous les jours de 17h00 a 05h30</li>
<li><strong>Adresse :</strong> Av. Tucan, 1, Port d'Alcudia</li>
<li><strong>Note :</strong> 4.5/5 sur Google (318 avis)</li>
<li><strong>Reservations :</strong> pas indispensables, mais recommandees pour les groupes et le week-end</li>
</ul>

<h2>La chicha comme experience sociale</h2>
<p>La chicha est, par nature, une experience partagee. A Enjoy Terrace, vous verrez des groupes d'amis, des couples et des familles profiter ensemble d'un narguile tout en discutant et en se detendant. C'est une facon differente de socialiser, plus posee et sensorielle que simplement prendre un verre. L'equipe est toujours disponible pour vous guider dans le choix de la saveur et vous aider a tirer le meilleur parti de votre session.</p>

<h2>Apres la chicha : la nuit continue</h2>
<p>L'un des grands avantages d'Enjoy Terrace est son emplacement strategique. Pour ceux qui souhaitent diner, <a href="/hiru">Hiru Food &amp; Drinks</a> propose une cuisine mediterraneenne au grill a quelques pas. Et pour ceux qui veulent prolonger la nuit, <a href="/outxide">Outxide Club</a> est juste a cote, avec les meilleures sessions DJ du nord de Majorque du jeudi au samedi.</p>`,
      it: `<p>La cultura della shisha e' diventata una parte essenziale della scena del tempo libero a Maiorca. Sempre piu' viaggiatori cercano un luogo dove godersi una buona shisha al tramonto, abbinata a cocktail di qualita' e un'atmosfera curata. A Port d'Alcudia, <a href="/enjoy">Enjoy Terrace</a> ha creato esattamente questa esperienza: il miglior shisha bar con terrazza lounge del nord di Maiorca.</p>

<h2>L'esperienza shisha da Enjoy Terrace</h2>
<p>Enjoy Terrace, situata in Av. Tucan 1, Port d'Alcudia, non e' un bar di shisha qualunque. E' uno spazio progettato per trasformare ogni sessione in un'esperienza sensoriale completa. Dalla selezione di tabacco premium alla preparazione meticolosa di ogni narghile', tutto e' pensato per offrire il massimo piacere.</p>

<h3>Varieta' di gusti</h3>
<p>La carta shisha di Enjoy Terrace include un'ampia gamma di gusti che si rinnova stagionalmente. Troverai dai classici piu' richiesti alle miscele esclusive create dal team.</p>
<ul>
<li><strong>Fruttati classici:</strong> mela, pesca, anguria, uva e mango</li>
<li><strong>Mentolati e freschi:</strong> menta, menta piperita e combinazioni con agrumi</li>
<li><strong>Miscele speziate:</strong> cannella, cardamomo e tocchi orientali</li>
<li><strong>Creazioni della casa:</strong> combinazioni esclusive che cambiano ogni stagione</li>
</ul>

<h3>Abbinamento shisha e cocktail</h3>
<p>Cio' che distingue Enjoy Terrace dagli altri locali di shisha e' la possibilita' di abbinare il tuo narghile' a un cocktail d'autore. Il team di bartender crea combinazioni pensate specificamente per completare i sapori della shisha. Un cocktail con agrumi ed erbe fresche esalta le note fruttate del narghile', mentre un drink piu' speziato accompagna perfettamente le miscele orientali.</p>

<h2>L'atmosfera: terrazza lounge all'aperto</h2>
<p>Enjoy Terrace e' stata progettata come uno spazio lounge all'aperto dove ogni dettaglio contribuisce all'esperienza. L'illuminazione ambientale crea un'atmosfera intima senza perdere la connessione con il cielo maiorchino. L'arredamento, con divani ampi e tavolini bassi, e' pensato per sessioni lunghe e conversazioni senza fretta.</p>

<h3>Il tramonto in terrazza</h3>
<p>I tramonti da Enjoy Terrace sono uno spettacolo quotidiano. A partire dalle 19:00 in estate, la luce dorata del sole che scende su Alcudia crea lo scenario perfetto per una shisha e un cocktail. E' il momento piu' fotogenico della giornata e una delle ragioni per cui cosi' tanti visitatori tornano sera dopo sera.</p>

<h2>Informazioni pratiche</h2>
<ul>
<li><strong>Orario:</strong> tutti i giorni dalle 17:00 alle 05:30</li>
<li><strong>Indirizzo:</strong> Av. Tucan, 1, Port d'Alcudia</li>
<li><strong>Valutazione:</strong> 4.5/5 su Google (318 recensioni)</li>
<li><strong>Prenotazioni:</strong> non indispensabili, ma consigliate per gruppi e fine settimana</li>
</ul>

<h2>La shisha come esperienza sociale</h2>
<p>La shisha e', per sua natura, un'esperienza condivisa. Da Enjoy Terrace vedrai gruppi di amici, coppie e famiglie che si godono insieme un narghile' mentre chiacchierano e si rilassano. E' un modo diverso di socializzare, piu' rilassato e sensoriale rispetto al semplice bere un drink. Il team e' sempre disponibile per guidarti nella scelta del gusto e aiutarti a ottenere il massimo dalla tua sessione.</p>

<h2>Dopo la shisha: la serata continua</h2>
<p>Uno dei grandi vantaggi di Enjoy Terrace e' la sua posizione strategica. Per chi desidera cenare, <a href="/hiru">Hiru Food &amp; Drinks</a> offre cucina mediterranea alla brace a poca distanza. E per chi cerca di prolungare la serata, <a href="/outxide">Outxide Club</a> e' proprio accanto, con le migliori sessioni DJ del nord di Maiorca da giovedi' a sabato.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-15",
    image: "/images/enjoy/490779000_1404590464277290_104140296793100193_n.jpg",
    tags: ["shisha", "cocktails", "enjoy", "mallorca"],
    venue: "enjoy",
    readingTime: 5,
  },
  {
    slug: "nachtleben-alcudia-mallorca-guide",
    title: {
      es: "Vida Nocturna en Alcúdia: Tu Guía Definitiva de Mallorca",
      en: "Nightlife in Alcudia: Your Ultimate Mallorca Guide",
      de: "Nachtleben in Alcudia: Dein ultimativer Mallorca-Guide",
      fr: "Vie Nocturne a Alcudia : Votre Guide Ultime de Majorque",
      it: "Vita Notturna ad Alcudia: La Tua Guida Definitiva di Maiorca",
    },
    excerpt: {
      es: "Guía completa de la vida nocturna en Alcúdia para el turista: de los cócteles al atardecer a la mejor discoteca del norte de Mallorca.",
      en: "Complete nightlife guide to Alcudia for tourists: from sunset cocktails to the best club in northern Mallorca.",
      de: "Kompletter Nachtleben-Guide für Alcudia: von Cocktails bei Sonnenuntergang bis zum besten Club im Norden Mallorcas. Alles, was du wissen musst.",
      fr: "Guide complet de la vie nocturne a Alcudia pour les touristes : des cocktails au coucher du soleil au meilleur club du nord de Majorque.",
      it: "Guida completa alla vita notturna di Alcudia per il turista: dai cocktail al tramonto alla migliore discoteca del nord di Maiorca.",
    },
    content: {
      es: `<p>Port d'Alcúdia se ha posicionado como el destino nocturno más completo del norte de Mallorca. Lejos del turismo masificado del sur, Alcúdia ofrece una escena de ocio nocturno que combina calidad, variedad y un ambiente internacional. Esta guía te lleva paso a paso por la noche perfecta en Alcúdia.</p>

<h2>El plan perfecto: de la terraza al club</h2>
<p>La noche en Alcúdia tiene un ritmo propio que merece la pena seguir. El plan ideal empieza al atardecer y puede extenderse hasta el amanecer.</p>

<h3>17:00 - Cócteles al atardecer en Enjoy Terrace</h3>
<p>La noche empieza en <a href="/enjoy">Enjoy Terrace</a>, en Av. Tucán 1. Abre a las 17:00 y es el lugar perfecto para empezar con un cóctel de autor y una shisha premium mientras el sol baja sobre Port d'Alcúdia. El ambiente es sofisticado pero relajado, con música chill y una terraza diseñada para disfrutar sin prisa.</p>

<h3>21:00 - Cena mediterránea en Hiru Food &amp; Drinks</h3>
<p>Para cenar, <a href="/hiru">Hiru Food &amp; Drinks</a> en Ctra. d'Artà 40 ofrece la mejor cocina a la brasa de la zona. Carnes maduradas, arroces de lonja y pescados del Mediterráneo en un restaurante con 4.9/5 en Google. Los viernes y sábados la cocina sirve hasta la 1:00.</p>

<h3>23:00 - Clubbing en Outxide Club</h3>
<p><a href="/outxide">Outxide Club</a>, justo al lado de Enjoy Terrace, abre de jueves a sábado a las 23:00. Sonido profesional de primer nivel, DJs nacionales e internacionales y una producción visual espectacular. Las entradas se compran en FourVenues o en la puerta.</p>

<h2>Las zonas de ocio nocturno</h2>

<h3>Av. Tucán / Dollar Street</h3>
<p>El epicentro de la noche en Port d'Alcúdia. Aquí se concentran los principales bares, terrazas y el propio Outxide Club. Es una zona compacta donde puedes moverte a pie entre todos los locales.</p>

<h3>El paseo marítimo y el puerto</h3>
<p>Para una experiencia más tranquila, el paseo marítimo ofrece bares con vistas al mar donde tomar una copa con la brisa marina. El puerto deportivo tiene opciones informales ideales para empezar la noche con calma.</p>

<h2>Consejos prácticos</h2>
<ul>
<li><strong>Código de vestimenta:</strong> smart casual para los clubs. Prohibida la ropa de playa</li>
<li><strong>Transporte:</strong> todo el centro nocturno se recorre a pie. Taxis disponibles toda la noche</li>
<li><strong>Dinero:</strong> la mayoría de locales aceptan tarjeta, pero lleva algo de efectivo</li>
<li><strong>Entradas online:</strong> comprar por adelantado en FourVenues ahorra dinero y colas</li>
<li><strong>Mejor época:</strong> junio a septiembre, aunque mayo y octubre también ofrecen buen ambiente</li>
</ul>

<h2>Lo que hace diferente a Alcúdia</h2>
<p>La gran ventaja de Alcúdia frente a otros destinos nocturnos de Mallorca es la concentración y la calidad. Terraza, restaurante y club están a metros unos de otros. No necesitas taxis entre locales ni planificar desplazamientos complicados. La noche fluye de manera natural, desde el primer cóctel hasta el último tema en la pista. Ese es el espíritu de <a href="/">Grupo Enjoy</a>: tres espacios, una experiencia completa.</p>`,
      en: `<p>Port d'Alcudia has established itself as the most complete nightlife destination in northern Mallorca. Far from the mass tourism of the south, Alcudia offers a nightlife scene that combines quality, variety and an international atmosphere. This guide takes you step by step through the perfect night in Alcudia.</p>

<h2>The perfect plan: from terrace to club</h2>
<p>Nightlife in Alcudia has its own rhythm worth following. The ideal plan starts at sunset and can stretch until sunrise.</p>

<h3>17:00 - Sunset cocktails at Enjoy Terrace</h3>
<p>The night begins at <a href="/enjoy">Enjoy Terrace</a>, at Av. Tucan 1. It opens at 17:00 and is the perfect place to start with a signature cocktail and premium shisha as the sun drops over Port d'Alcudia. The vibe is sophisticated yet relaxed, with chill music and a terrace designed for unhurried enjoyment.</p>

<h3>21:00 - Mediterranean dinner at Hiru Food &amp; Drinks</h3>
<p>For dinner, <a href="/hiru">Hiru Food &amp; Drinks</a> at Ctra. d'Arta 40 offers the best charcoal grill cuisine in the area. Aged meats, market-fresh rice dishes and Mediterranean fish in a restaurant rated 4.9/5 on Google. On Fridays and Saturdays the kitchen serves until 1:00.</p>

<h3>23:00 - Clubbing at Outxide Club</h3>
<p><a href="/outxide">Outxide Club</a>, right next to Enjoy Terrace, opens Thursday to Saturday at 23:00. Top-tier professional sound, national and international DJs and spectacular visual production. Tickets available on FourVenues or at the door.</p>

<h2>The nightlife zones</h2>

<h3>Av. Tucan / Dollar Street</h3>
<p>The epicentre of the night in Port d'Alcudia. This is where the main bars, terraces and Outxide Club itself are concentrated. It is a compact zone where you can walk between all the venues.</p>

<h3>The promenade and the marina</h3>
<p>For a more relaxed experience, the promenade offers bars with sea views where you can have a drink with the sea breeze. The marina has informal options ideal for starting the night at a calm pace.</p>

<h2>Practical tips</h2>
<ul>
<li><strong>Dress code:</strong> smart casual for clubs. Beachwear not permitted</li>
<li><strong>Transport:</strong> the entire nightlife centre is walkable. Taxis available all night</li>
<li><strong>Money:</strong> most venues accept cards, but carry some cash</li>
<li><strong>Online tickets:</strong> buying in advance on FourVenues saves money and queuing</li>
<li><strong>Best time:</strong> June to September, though May and October also offer a good atmosphere</li>
</ul>

<h2>What makes Alcudia different</h2>
<p>Alcudia's great advantage over other Mallorca nightlife destinations is the concentration and the quality. Terrace, restaurant and club are metres apart. You need no taxis between venues and no complicated travel plans. The night flows naturally from the first cocktail to the last track on the dance floor. That is the spirit of <a href="/">Grupo Enjoy</a>: three spaces, one complete experience.</p>`,
      de: `<p>Port d'Alcudia hat sich als das vielseitigste Nightlife-Ziel im Norden Mallorcas etabliert. Weit entfernt vom Massentourismus des Südens bietet Alcudia eine Ausgehszene, die Qualität, Vielfalt und internationales Flair vereint. Dieser Guide nimmt dich Schritt für Schritt mit durch die perfekte Nacht in Alcudia.</p>

<h2>Der perfekte Plan: von der Terrasse zum Club</h2>
<p>Das Nachtleben in Alcudia hat seinen eigenen Rhythmus, dem es sich lohnt zu folgen. Der ideale Abend beginnt bei Sonnenuntergang und kann bis zum Sonnenaufgang dauern.</p>

<h3>17:00 Uhr -- Cocktails zum Sonnenuntergang in der Enjoy Terrace</h3>
<p>Die Nacht beginnt in der <a href="/enjoy">Enjoy Terrace</a> in der Av. Tucán 1. Sie öffnet um 17:00 Uhr und ist der perfekte Ort, um mit einem Signature-Cocktail und Premium-Shisha zu starten, während die Sonne über Port d'Alcudia untergeht. Die Atmosphäre ist anspruchsvoll und trotzdem entspannt, mit Chillout-Musik und einer Terrasse, die zum Genießen ohne Zeitdruck einlädt.</p>

<h3>21:00 Uhr -- Mediterranes Abendessen bei Hiru Food &amp; Drinks</h3>
<p>Zum Abendessen bietet <a href="/hiru">Hiru Food &amp; Drinks</a> in der Ctra. d'Artà 40 die beste Grillküche der Gegend. Gereiftes Fleisch, Reisgerichte vom Fischmarkt und Mittelmeerfisch in einem Restaurant mit 4.9/5 bei Google. Freitags und samstags serviert die Küche bis 1:00 Uhr.</p>

<h3>23:00 Uhr -- Clubbing im Outxide Club</h3>
<p>Der <a href="/outxide">Outxide Club</a>, direkt neben der Enjoy Terrace, öffnet von Donnerstag bis Samstag um 23:00 Uhr. Erstklassiger professioneller Sound, nationale und internationale DJs sowie eine spektakuläre visuelle Produktion. Tickets gibt es über FourVenues oder an der Abendkasse.</p>

<h2>Die Ausgehviertel</h2>

<h3>Av. Tucán / Dollar Street</h3>
<p>Das Epizentrum der Nacht in Port d'Alcudia. Hier konzentrieren sich die wichtigsten Bars, Terrassen und der Outxide Club selbst. Es ist eine kompakte Zone, in der du zu Fuß zwischen allen Lokalen wechseln kannst.</p>

<h3>Die Strandpromenade und der Yachthafen</h3>
<p>Für ein entspannteres Erlebnis bietet die Promenade Bars mit Meerblick, wo du bei der Meeresbrise etwas trinken kannst. Der Yachthafen hat informelle Optionen, ideal um den Abend gemütlich zu beginnen.</p>

<h2>Praktische Tipps</h2>
<ul>
<li><strong>Dresscode:</strong> Smart Casual für die Clubs. Strandkleidung ist nicht erlaubt</li>
<li><strong>Transport:</strong> das gesamte Ausgehviertel ist zu Fuß erreichbar. Taxis die ganze Nacht verfügbar</li>
<li><strong>Geld:</strong> die meisten Lokale akzeptieren Karten, aber nimm etwas Bargeld mit</li>
<li><strong>Online-Tickets:</strong> Vorabkauf über FourVenues spart Geld und Wartezeit</li>
<li><strong>Beste Zeit:</strong> Juni bis September, aber auch Mai und Oktober bieten gutes Ambiente</li>
</ul>

<h2>Was Alcudia besonders macht</h2>
<p>Der große Vorteil von Alcudia gegenüber anderen Nightlife-Zielen auf Mallorca ist die Konzentration und Qualität. Terrasse, Restaurant und Club liegen nur Meter voneinander entfernt. Du brauchst keine Taxis zwischen den Lokalen und keine komplizierten Fahrpläne. Die Nacht fließt ganz natürlich vom ersten Cocktail bis zum letzten Track auf der Tanzfläche. Das ist der Geist von <a href="/">Grupo Enjoy</a>: drei Orte, ein komplettes Erlebnis.</p>

<h2>Alcudia vs. Palma und Magaluf</h2>
<p>Viele deutsche Urlauber fragen sich, ob sie für das Nachtleben nach Palma oder Magaluf fahren müssen. Die kurze Antwort: Nein. Alcudia bietet eine eigenständige Ausgehszene, die alles hat, was du brauchst -- ohne die Massen und langen Wege des Südens. Der Outxide Club bringt erstklassige DJs in den Norden, und die Kombination aus Enjoy Terrace, Hiru und dem Club macht eine Nacht komplett, ohne dass du je ein Taxi rufen musst.</p>

<h2>Für deutsche Urlauber: gut zu wissen</h2>
<p>Alcudia ist seit Jahrzehnten ein beliebtes Ziel für deutsche Urlauber, und das Nachtleben spiegelt das wider. Viele Lokale haben deutschsprachiges Personal, und du wirst dich sprachlich problemlos zurechtfinden. Die Direktflüge aus vielen deutschen Städten nach Palma machen die Anreise einfach, und vom Flughafen nach Alcudia sind es etwa 50 Minuten mit dem Transfer. Mallorca ist mehr als nur Ballermann -- und Alcudia beweist das jeden Abend.</p>`,
      fr: `<p>Port d'Alcudia s'est positionne comme la destination nocturne la plus complete du nord de Majorque. Loin du tourisme de masse du sud, Alcudia offre une scene de loisirs nocturnes qui allie qualite, variete et ambiance internationale. Ce guide vous emmene pas a pas a travers la soiree parfaite a Alcudia.</p>

<h2>Le plan parfait : de la terrasse au club</h2>
<p>La nuit a Alcudia a son propre rythme qui merite d'etre suivi. Le plan ideal commence au coucher du soleil et peut se prolonger jusqu'a l'aube.</p>

<h3>17h00 - Cocktails au coucher du soleil a Enjoy Terrace</h3>
<p>La nuit commence a <a href="/enjoy">Enjoy Terrace</a>, au Av. Tucan 1. Ouverture a 17h00, c'est l'endroit ideal pour commencer avec un cocktail signature et une chicha premium tandis que le soleil descend sur Port d'Alcudia. L'ambiance est sophistiquee mais decontractee, avec de la musique chill et une terrasse concue pour profiter sans se presser.</p>

<h3>21h00 - Diner mediterraneen a Hiru Food &amp; Drinks</h3>
<p>Pour le diner, <a href="/hiru">Hiru Food &amp; Drinks</a> au Ctra. d'Arta 40 propose la meilleure cuisine au grill de la region. Viandes maturees, riz de la criee et poissons de Mediterranee dans un restaurant note 4.9/5 sur Google. Les vendredis et samedis, la cuisine sert jusqu'a 1h00.</p>

<h3>23h00 - Clubbing a Outxide Club</h3>
<p><a href="/outxide">Outxide Club</a>, juste a cote d'Enjoy Terrace, ouvre du jeudi au samedi a 23h00. Son professionnel haut de gamme, DJs nationaux et internationaux et production visuelle spectaculaire. Billets disponibles sur FourVenues ou sur place.</p>

<h2>Les zones de vie nocturne</h2>

<h3>Av. Tucan / Dollar Street</h3>
<p>L'epicentre de la nuit a Port d'Alcudia. C'est ici que se concentrent les principaux bars, terrasses et le Outxide Club lui-meme. C'est une zone compacte ou vous pouvez vous deplacer a pied entre tous les etablissements.</p>

<h3>La promenade et le port</h3>
<p>Pour une experience plus tranquille, la promenade offre des bars avec vue sur la mer ou prendre un verre avec la brise marine. Le port de plaisance propose des options informelles ideales pour commencer la soiree en douceur.</p>

<h2>Conseils pratiques</h2>
<ul>
<li><strong>Code vestimentaire :</strong> smart casual pour les clubs. Les vetements de plage ne sont pas admis</li>
<li><strong>Transport :</strong> tout le centre nocturne se parcourt a pied. Taxis disponibles toute la nuit</li>
<li><strong>Argent :</strong> la plupart des etablissements acceptent la carte, mais prevoyez un peu d'especes</li>
<li><strong>Billets en ligne :</strong> acheter a l'avance sur FourVenues permet d'economiser et d'eviter les files d'attente</li>
<li><strong>Meilleure periode :</strong> de juin a septembre, bien que mai et octobre offrent egalement une bonne ambiance</li>
</ul>

<h2>Ce qui rend Alcudia differente</h2>
<p>Le grand avantage d'Alcudia par rapport aux autres destinations nocturnes de Majorque est la concentration et la qualite. Terrasse, restaurant et club sont a quelques metres les uns des autres. Pas besoin de taxi entre les etablissements ni de deplacements compliques a organiser. La nuit coule naturellement, du premier cocktail au dernier morceau sur la piste de danse. C'est l'esprit de <a href="/">Grupo Enjoy</a> : trois espaces, une experience complete.</p>`,
      it: `<p>Port d'Alcudia si e' posizionata come la destinazione notturna piu' completa del nord di Maiorca. Lontana dal turismo di massa del sud, Alcudia offre una scena di divertimento notturno che combina qualita', varieta' e un'atmosfera internazionale. Questa guida ti accompagna passo dopo passo attraverso la serata perfetta ad Alcudia.</p>

<h2>Il piano perfetto: dalla terrazza al club</h2>
<p>La notte ad Alcudia ha un ritmo proprio che vale la pena seguire. Il piano ideale inizia al tramonto e puo' estendersi fino all'alba.</p>

<h3>17:00 - Cocktail al tramonto da Enjoy Terrace</h3>
<p>La serata inizia da <a href="/enjoy">Enjoy Terrace</a>, in Av. Tucan 1. Apre alle 17:00 ed e' il luogo perfetto per iniziare con un cocktail d'autore e una shisha premium mentre il sole scende su Port d'Alcudia. L'atmosfera e' sofisticata ma rilassata, con musica chill e una terrazza progettata per godersi il momento senza fretta.</p>

<h3>21:00 - Cena mediterranea da Hiru Food &amp; Drinks</h3>
<p>Per cena, <a href="/hiru">Hiru Food &amp; Drinks</a> in Ctra. d'Arta 40 offre la migliore cucina alla brace della zona. Carni frollate, risi del mercato e pesci del Mediterraneo in un ristorante con 4.9/5 su Google. Il venerdi' e il sabato la cucina serve fino all'1:00.</p>

<h3>23:00 - Clubbing all'Outxide Club</h3>
<p><a href="/outxide">Outxide Club</a>, proprio accanto a Enjoy Terrace, apre da giovedi' a sabato alle 23:00. Impianto audio professionale di primo livello, DJ nazionali e internazionali e una produzione visiva spettacolare. I biglietti si acquistano su FourVenues o alla porta.</p>

<h2>Le zone del divertimento notturno</h2>

<h3>Av. Tucan / Dollar Street</h3>
<p>L'epicentro della notte a Port d'Alcudia. Qui si concentrano i principali bar, terrazze e lo stesso Outxide Club. E' una zona compatta dove puoi muoverti a piedi tra tutti i locali.</p>

<h3>Il lungomare e il porto</h3>
<p>Per un'esperienza piu' tranquilla, il lungomare offre bar con vista sul mare dove bere qualcosa con la brezza marina. Il porto turistico ha opzioni informali ideali per iniziare la serata con calma.</p>

<h2>Consigli pratici</h2>
<ul>
<li><strong>Dress code:</strong> smart casual per i club. Vietato l'abbigliamento da spiaggia</li>
<li><strong>Trasporto:</strong> tutto il centro notturno si percorre a piedi. Taxi disponibili tutta la notte</li>
<li><strong>Denaro:</strong> la maggior parte dei locali accetta carta, ma porta un po' di contanti</li>
<li><strong>Biglietti online:</strong> acquistare in anticipo su FourVenues fa risparmiare denaro e code</li>
<li><strong>Periodo migliore:</strong> da giugno a settembre, anche se maggio e ottobre offrono anch'essi una buona atmosfera</li>
</ul>

<h2>Cosa rende diversa Alcudia</h2>
<p>Il grande vantaggio di Alcudia rispetto ad altre destinazioni notturne di Maiorca e' la concentrazione e la qualita'. Terrazza, ristorante e club sono a pochi metri l'uno dall'altro. Non servono taxi tra i locali ne' spostamenti complicati. La serata scorre in modo naturale, dal primo cocktail all'ultima canzone in pista. Questo e' lo spirito di <a href="/">Grupo Enjoy</a>: tre spazi, un'esperienza completa.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-20",
    image: "/images/outxide/DSCF8271-14.jpg",
    tags: ["nightlife", "alcudia", "mallorca", "guide"],
    venue: "general",
    readingTime: 7,
  },
  {
    slug: "outxide-club-discoteca-alcudia-mallorca",
    title: {
      es: "Outxide Club: La Discoteca de Referencia en Alcudia, Mallorca",
      en: "Outxide Club: The Premier Nightclub in Alcudia, Mallorca",
      de: "Outxide Club: Der Top-Nachtclub in Alcudia, Mallorca",
      fr: "Outxide Club : La Discothèque de Référence à Alcudia, Majorque",
      it: "Outxide Club: La Discoteca di Riferimento ad Alcudia, Maiorca",
    },
    excerpt: {
      es: "Todo sobre Outxide Club, la discoteca numero uno del norte de Mallorca. Ubicacion, horarios, DJs residentes, sistema de sonido, mesas VIP y como comprar entradas para Outxide en Port d'Alcudia.",
      en: "Everything about Outxide Club, the number-one nightclub in northern Mallorca. Location, opening hours, resident DJs, sound system, VIP tables and how to buy tickets for Outxide in Port d'Alcudia.",
      de: "Alles ueber Outxide Club, den fuehrenden Nachtclub im Norden Mallorcas. Lage, Oeffnungszeiten, Resident-DJs, Soundsystem, VIP-Tische und Ticketkauf fuer Outxide in Port d'Alcudia.",
      fr: "Tout sur Outxide Club, la discothèque numero un du nord de Majorque. Emplacement, horaires, DJs residents, système sonore, tables VIP et achat de billets pour Outxide à Port d'Alcudia.",
      it: "Tutto su Outxide Club, la discoteca numero uno del nord di Maiorca. Posizione, orari, DJ residenti, impianto audio, tavoli VIP e come acquistare biglietti per Outxide a Port d'Alcudia.",
    },
    content: {
      es: `<p>Si buscas informacion sobre <strong>Outxide Club</strong>, has llegado al sitio correcto. Esta es la pagina oficial de Grupo Enjoy, la empresa que gestiona Outxide Club en Port d'Alcudia, Mallorca. Aqui encontraras todo lo que necesitas saber antes de visitarnos: desde como llegar hasta que esperar de una noche en Outxide.</p>

<h2>Que es Outxide Club</h2>
<p><a href="/outxide">Outxide Club</a> es la discoteca de referencia en el norte de Mallorca. Ubicada en la Av. Tucan 1, Port d'Alcudia, Outxide ofrece una experiencia de club premium que combina un sistema de sonido de primer nivel, produccion visual profesional y una seleccion musical cuidada que abarca house, tech house, techno y reggaeton. El club forma parte de <a href="/">Grupo Enjoy</a>, junto con <a href="/enjoy">Enjoy Terrace</a> y <a href="/hiru">Hiru Food &amp; Drinks</a>.</p>

<h2>Horarios y Dias de Apertura</h2>
<p>Outxide Club abre jueves, viernes y sabado de 23:30 a 06:00. En temporada alta (junio a septiembre) puede haber eventos especiales entre semana que se anuncian en nuestras redes sociales. Los horarios pueden variar en funcion de la programacion, asi que te recomendamos consultar nuestra pagina de <a href="/outxide">Outxide</a> antes de tu visita.</p>

<h2>Como Llegar a Outxide Club</h2>
<p>Outxide Club se encuentra en la Av. Tucan 1, en el corazon de la zona de ocio nocturno de Port d'Alcudia. Es facilmente accesible a pie desde cualquier hotel de la zona. Si vienes desde Palma, toma la autopista Ma-13 direccion Alcudia (aproximadamente 50 minutos). Hay aparcamiento disponible en las inmediaciones. Tambien puedes llegar en taxi desde cualquier punto de Alcudia.</p>

<h2>Sistema de Sonido y Produccion</h2>
<p>Una de las senas de identidad de Outxide Club es su sistema de sonido profesional, disenado para ofrecer una experiencia sonora envolvente en toda la pista. La produccion visual incluye iluminacion LED de ultima generacion, efectos laser y visuales sincronizados con la musica. Cada noche en Outxide es un espectaculo completo que va mucho mas alla de un simple DJ set.</p>

<h2>Musica y DJs</h2>
<p>La programacion musical de Outxide Club es eclectico y de calidad. Las noches de jueves suelen tener un perfil mas comercial con reggaeton y hits actuales. Los viernes y sabados la propuesta se orienta hacia house, tech house y techno, con DJs residentes y artistas invitados nacionales e internacionales. Consulta el calendario de eventos en nuestra <a href="/outxide">pagina de Outxide</a> para ver la programacion actualizada.</p>

<h2>Mesas VIP y Reservados</h2>
<p>Outxide ofrece un servicio VIP con mesas reservadas y servicio de botella. Las mesas VIP incluyen acceso prioritario, una zona exclusiva con vistas a la pista y atencion personalizada. Es la opcion ideal para celebraciones, cumpleanos o simplemente para disfrutar de la noche con mas comodidad. Puedes reservar tu mesa contactandonos directamente o a traves de nuestra web.</p>

<h2>Entradas y Precios</h2>
<p>Las entradas para Outxide Club se pueden comprar online a traves de FourVenues, lo que te permite acceder sin colas y a menudo con descuento respecto a la taquilla. Tambien hay entrada disponible en puerta. Los precios varian segun el evento y la noche. Te recomendamos comprar con antelacion para asegurar tu plaza en las noches mas demandadas.</p>

<h2>Fiestas Tematicas y Eventos Especiales</h2>
<p>A lo largo de la temporada, Outxide organiza fiestas tematicas, noches de artistas invitados especiales y eventos de apertura y cierre de temporada que se convierten en citas ineludibles del verano mallorquin. Siguenos en Instagram (<a href="https://www.instagram.com/enjoy.club.alcudia/" target="_blank" rel="noopener noreferrer">@enjoy.club.alcudia</a>) para no perderte ninguno.</p>

<h2>La Noche Perfecta en Port d'Alcudia</h2>
<p>La combinacion ganadora es empezar la noche con una cena en <a href="/hiru">Hiru Food &amp; Drinks</a>, continuar con cocktails al atardecer en <a href="/enjoy">Enjoy Terrace</a> y terminar la noche bailando en Outxide Club. Los tres locales estan a pocos metros de distancia, lo que hace que la noche fluya de forma natural sin necesidad de coches ni taxis entre locales.</p>

<h2>Outxide Club vs Otras Discotecas de Mallorca</h2>
<p>Frente a las macrodiscotecas de Magaluf o Palma, Outxide Club ofrece una alternativa premium: sonido de calidad, ambiente selecto, produccion cuidada y una ubicacion privilegiada junto al mar en Port d'Alcudia. No es una fiesta masiva; es una experiencia de club pensada para quienes valoran la calidad por encima de la cantidad.</p>

<h2>Mas Guias sobre Vida Nocturna en Alcudia</h2>
<p>Si quieres descubrir mas opciones de ocio nocturno, consulta nuestra <a href="/blog/guia-vida-nocturna-alcudia">guia completa de vida nocturna en Alcudia</a>, la seleccion de las <a href="/blog/mejores-discotecas-clubs-alcudia">mejores discotecas y clubs de Alcudia</a> y nuestro calendario de <a href="/blog/fiestas-eventos-verano-alcudia-2026">fiestas y eventos del verano 2026</a>. Y para cenar antes de la fiesta, no te pierdas la guia de los <a href="/blog/mejores-restaurantes-alcudia-mallorca">mejores restaurantes en Alcudia</a>.</p>

<p><strong>Outxide Club — Av. Tucan 1, Port d'Alcudia, Mallorca. Jueves, viernes y sabado. <a href="/outxide">Visita nuestra web para mas informacion y entradas.</a></strong></p>`,

      en: `<p>Looking for information about <strong>Outxide Club</strong>? You are on the official website of Grupo Enjoy, the company behind Outxide Club in Port d'Alcudia, Mallorca. Here you will find everything you need to know before your visit: from how to get here to what to expect from a night at Outxide.</p>

<h2>What Is Outxide Club</h2>
<p><a href="/outxide">Outxide Club</a> is the premier nightclub in northern Mallorca. Located at Av. Tucan 1, Port d'Alcudia, Outxide delivers a premium clubbing experience combining a top-tier sound system, professional visual production and a carefully curated music selection spanning house, tech house, techno and reggaeton. The club is part of <a href="/">Grupo Enjoy</a>, alongside <a href="/enjoy">Enjoy Terrace</a> and <a href="/hiru">Hiru Food &amp; Drinks</a>.</p>

<h2>Opening Hours and Days</h2>
<p>Outxide Club opens Thursday, Friday and Saturday from 23:30 to 06:00. During peak season (June to September) there may be midweek special events announced on our social media. Times may vary depending on the line-up, so we recommend checking our <a href="/outxide">Outxide page</a> before your visit.</p>

<h2>How to Get to Outxide Club</h2>
<p>Outxide Club is located at Av. Tucan 1, in the heart of Port d'Alcudia's nightlife area. It is easily walkable from any hotel in the area. Coming from Palma, take the Ma-13 motorway towards Alcudia (approximately 50 minutes). Parking is available nearby. You can also arrive by taxi from anywhere in Alcudia.</p>

<h2>Sound System and Production</h2>
<p>One of Outxide Club's hallmarks is its professional sound system, engineered to deliver an immersive sonic experience across the entire dance floor. Visual production includes cutting-edge LED lighting, laser effects and visuals synchronised with the music. Every night at Outxide is a complete show that goes far beyond a simple DJ set.</p>

<h2>Music and DJs</h2>
<p>Outxide Club's music programming is eclectic and high quality. Thursday nights tend to lean more commercial with reggaeton and current hits. Fridays and Saturdays focus on house, tech house and techno, featuring resident DJs and national and international guest artists. Check the events calendar on our <a href="/outxide">Outxide page</a> for the latest line-up.</p>

<h2>VIP Tables and Bottle Service</h2>
<p>Outxide offers a VIP service with reserved tables and bottle service. VIP tables include priority access, an exclusive area overlooking the dance floor and personalised attention. It is the ideal option for celebrations, birthdays or simply enjoying the night in greater comfort. You can book your table by contacting us directly or through our website.</p>

<h2>Tickets and Prices</h2>
<p>Tickets for Outxide Club can be purchased online through FourVenues, allowing you to skip queues and often at a discount compared to the door price. Door entry is also available. Prices vary by event and night. We recommend buying in advance to secure your spot on the busiest nights.</p>

<h2>Theme Nights and Special Events</h2>
<p>Throughout the season, Outxide hosts themed parties, special guest nights and opening and closing events that become unmissable dates on the Mallorcan summer calendar. Follow us on Instagram (<a href="https://www.instagram.com/enjoy.club.alcudia/" target="_blank" rel="noopener noreferrer">@enjoy.club.alcudia</a>) so you do not miss any of them.</p>

<h2>The Perfect Night Out in Port d'Alcudia</h2>
<p>The winning combination is to start the evening with dinner at <a href="/hiru">Hiru Food &amp; Drinks</a>, continue with sunset cocktails at <a href="/enjoy">Enjoy Terrace</a> and end the night dancing at Outxide Club. All three venues are just metres apart, making the night flow naturally without needing cars or taxis between spots.</p>

<h2>Outxide Club vs Other Mallorca Nightclubs</h2>
<p>Compared to the mega-clubs of Magaluf or Palma, Outxide Club offers a premium alternative: quality sound, a selective atmosphere, polished production and a privileged location by the sea in Port d'Alcudia. It is not a massive rave; it is a club experience designed for those who value quality over quantity.</p>

<h2>More Nightlife Guides for Alcudia</h2>
<p>Discover more options in our <a href="/blog/guia-vida-nocturna-alcudia">complete nightlife guide to Alcudia</a>, browse the <a href="/blog/mejores-discotecas-clubs-alcudia">best clubs and discos in Alcudia</a> and check out the <a href="/blog/fiestas-eventos-verano-alcudia-2026">summer 2026 events calendar</a>. For dinner before the party, see our guide to the <a href="/blog/mejores-restaurantes-alcudia-mallorca">best restaurants in Alcudia</a>.</p>

<p><strong>Outxide Club — Av. Tucan 1, Port d'Alcudia, Mallorca. Thursday, Friday and Saturday. <a href="/outxide">Visit our website for more information and tickets.</a></strong></p>`,

      de: `<p>Sie suchen Informationen ueber <strong>Outxide Club</strong>? Sie sind auf der offiziellen Website von Grupo Enjoy, dem Unternehmen hinter dem Outxide Club in Port d'Alcudia, Mallorca. Hier finden Sie alles, was Sie vor Ihrem Besuch wissen muessen: von der Anreise bis zu dem, was Sie bei einer Nacht im Outxide erwartet.</p>

<h2>Was ist der Outxide Club</h2>
<p><a href="/outxide">Outxide Club</a> ist der fuehrende Nachtclub im Norden Mallorcas. In der Av. Tucan 1, Port d'Alcudia gelegen, bietet Outxide ein Premium-Cluberlebnis mit erstklassigem Soundsystem, professioneller visueller Produktion und sorgfaeltig kuratierter Musik von House ueber Tech House und Techno bis Reggaeton. Der Club gehoert zu <a href="/">Grupo Enjoy</a>, zusammen mit <a href="/enjoy">Enjoy Terrace</a> und <a href="/hiru">Hiru Food &amp; Drinks</a>.</p>

<h2>Oeffnungszeiten</h2>
<p>Outxide Club oeffnet Donnerstag, Freitag und Samstag von 23:30 bis 06:00 Uhr. In der Hochsaison (Juni bis September) kann es unter der Woche Sonderveranstaltungen geben, die in unseren sozialen Medien angekuendigt werden. Die Zeiten koennen je nach Programm variieren — informieren Sie sich auf unserer <a href="/outxide">Outxide-Seite</a>.</p>

<h2>Anfahrt zum Outxide Club</h2>
<p>Outxide Club befindet sich in der Av. Tucan 1, im Herzen des Nachtlebens von Port d'Alcudia. Er ist von jedem Hotel in der Umgebung bequem zu Fuss erreichbar. Von Palma nehmen Sie die Autobahn Ma-13 Richtung Alcudia (ca. 50 Minuten). Parkplaetze sind in der Naehe vorhanden. Taxis stehen ebenfalls zur Verfuegung.</p>

<h2>Soundsystem und Produktion</h2>
<p>Eines der Markenzeichen des Outxide Club ist sein professionelles Soundsystem, das fuer ein immersives Klangerlebnis auf der gesamten Tanzflaeche sorgt. Die visuelle Produktion umfasst modernste LED-Beleuchtung, Lasereffekte und musiksynchronisierte Visuals. Jede Nacht im Outxide ist eine komplette Show.</p>

<h2>Musik und DJs</h2>
<p>Die Musikprogrammierung des Outxide Club ist vielseitig und hochwertig. Donnerstags ist das Profil eher kommerziell mit Reggaeton und aktuellen Hits. Freitags und samstags liegt der Fokus auf House, Tech House und Techno mit Resident-DJs und nationalen wie internationalen Gastartisten. Den aktuellen Veranstaltungskalender finden Sie auf unserer <a href="/outxide">Outxide-Seite</a>.</p>

<h2>VIP-Tische und Flaschenservice</h2>
<p>Outxide bietet einen VIP-Service mit reservierten Tischen und Flaschenservice. VIP-Tische beinhalten priorisiertem Einlass, einen exklusiven Bereich mit Blick auf die Tanzflaeche und persoenlichen Service. Ideal fuer Feiern, Geburtstage oder einfach eine komfortablere Nacht. Reservieren Sie direkt bei uns oder ueber unsere Website.</p>

<h2>Tickets und Preise</h2>
<p>Tickets fuer den Outxide Club koennen online ueber FourVenues erworben werden — ohne Warteschlange und oft guenstiger als an der Abendkasse. Einlass an der Tuer ist ebenfalls moeglich. Preise variieren je nach Event. Wir empfehlen, im Voraus zu kaufen, um sich Ihren Platz an den beliebtesten Abenden zu sichern.</p>

<h2>Die perfekte Nacht in Port d'Alcudia</h2>
<p>Die Gewinner-Kombination: Abendessen im <a href="/hiru">Hiru Food &amp; Drinks</a>, Cocktails auf der <a href="/enjoy">Enjoy Terrace</a> und danach tanzen im Outxide Club. Alle drei Locations liegen nur wenige Meter voneinander entfernt — die Nacht fliesst ganz natuerlich.</p>

<p><strong>Outxide Club — Av. Tucan 1, Port d'Alcudia, Mallorca. Donnerstag, Freitag und Samstag. <a href="/outxide">Besuchen Sie unsere Website fuer weitere Informationen und Tickets.</a></strong></p>`,

      fr: `<p>Vous cherchez des informations sur <strong>Outxide Club</strong> ? Vous etes sur le site officiel de Grupo Enjoy, l'entreprise derrière Outxide Club à Port d'Alcudia, Majorque. Voici tout ce que vous devez savoir avant votre visite : de comment y arriver à ce qui vous attend lors d'une soiree à Outxide.</p>

<h2>Qu'est-ce que Outxide Club</h2>
<p><a href="/outxide">Outxide Club</a> est la discothèque de reference dans le nord de Majorque. Situe Av. Tucan 1, Port d'Alcudia, Outxide offre une experience clubbing premium combinant un système sonore de premier plan, une production visuelle professionnelle et une selection musicale soignee allant de la house au tech house, techno et reggaeton. Le club fait partie de <a href="/">Grupo Enjoy</a>, aux cotes de <a href="/enjoy">Enjoy Terrace</a> et <a href="/hiru">Hiru Food &amp; Drinks</a>.</p>

<h2>Horaires d'ouverture</h2>
<p>Outxide Club ouvre jeudi, vendredi et samedi de 23h30 à 06h00. En haute saison (juin à septembre), des evenements speciaux en semaine peuvent etre annonces sur nos reseaux sociaux. Consultez notre <a href="/outxide">page Outxide</a> avant votre visite.</p>

<h2>Comment venir à Outxide Club</h2>
<p>Outxide Club se trouve Av. Tucan 1, au coeur de la zone de vie nocturne de Port d'Alcudia. Accessible à pied depuis n'importe quel hotel du quartier. Depuis Palma, prenez l'autoroute Ma-13 direction Alcudia (environ 50 minutes). Parking disponible à proximite. Taxis egalement disponibles.</p>

<h2>Système sonore et production</h2>
<p>L'un des atouts majeurs d'Outxide Club est son système sonore professionnel, concu pour offrir une experience sonore immersive sur toute la piste de danse. La production visuelle inclut eclairage LED de dernière generation, effets laser et visuels synchronises avec la musique.</p>

<h2>Musique et DJs</h2>
<p>La programmation musicale d'Outxide Club est eclectique et de qualite. Les jeudis ont un profil plus commercial avec reggaeton et hits actuels. Les vendredis et samedis s'orientent vers la house, la tech house et la techno, avec des DJs residents et des artistes invites. Consultez le calendrier des evenements sur notre <a href="/outxide">page Outxide</a>.</p>

<h2>Tables VIP et service bouteille</h2>
<p>Outxide propose un service VIP avec tables reservees et service bouteille. Les tables VIP incluent un accès prioritaire, une zone exclusive surplombant la piste et un service personalise. Ideal pour les celebrations. Reservez directement chez nous ou via notre site.</p>

<h2>La soiree parfaite à Port d'Alcudia</h2>
<p>La combinaison gagnante : diner au <a href="/hiru">Hiru Food &amp; Drinks</a>, cocktails au coucher du soleil sur la <a href="/enjoy">Enjoy Terrace</a> puis danser jusqu'au bout de la nuit à Outxide Club. Les trois etablissements sont à quelques mètres les uns des autres.</p>

<p><strong>Outxide Club — Av. Tucan 1, Port d'Alcudia, Majorque. Jeudi, vendredi et samedi. <a href="/outxide">Visitez notre site pour plus d'informations et billets.</a></strong></p>`,

      it: `<p>Cercate informazioni su <strong>Outxide Club</strong>? Siete sul sito ufficiale di Grupo Enjoy, l'azienda che gestisce Outxide Club a Port d'Alcudia, Maiorca. Qui troverete tutto cio' che dovete sapere prima della vostra visita: da come arrivare a cosa aspettarvi da una serata all'Outxide.</p>

<h2>Cos'e' Outxide Club</h2>
<p><a href="/outxide">Outxide Club</a> e' la discoteca di riferimento nel nord di Maiorca. Situato in Av. Tucan 1, Port d'Alcudia, Outxide offre un'esperienza di clubbing premium che combina un impianto audio di primo livello, produzione visiva professionale e una selezione musicale curata che spazia da house, tech house, techno e reggaeton. Il club fa parte di <a href="/">Grupo Enjoy</a>, insieme a <a href="/enjoy">Enjoy Terrace</a> e <a href="/hiru">Hiru Food &amp; Drinks</a>.</p>

<h2>Orari di apertura</h2>
<p>Outxide Club apre giovedi', venerdi' e sabato dalle 23:30 alle 06:00. In alta stagione (giugno-settembre) possono esserci eventi speciali infrasettimanali annunciati sui nostri social media. Consultate la nostra <a href="/outxide">pagina Outxide</a> prima della visita.</p>

<h2>Come arrivare a Outxide Club</h2>
<p>Outxide Club si trova in Av. Tucan 1, nel cuore della zona di vita notturna di Port d'Alcudia. Raggiungibile a piedi da qualsiasi hotel della zona. Da Palma, prendete l'autostrada Ma-13 direzione Alcudia (circa 50 minuti). Parcheggio disponibile nelle vicinanze. Taxi sempre disponibili.</p>

<h2>Impianto audio e produzione</h2>
<p>Uno dei tratti distintivi di Outxide Club e' il suo impianto audio professionale, progettato per offrire un'esperienza sonora immersiva su tutta la pista da ballo. La produzione visiva include illuminazione LED di ultima generazione, effetti laser e visual sincronizzati con la musica.</p>

<h2>Musica e DJ</h2>
<p>La programmazione musicale di Outxide Club e' eclettica e di qualita'. Il giovedi' ha un profilo piu' commerciale con reggaeton e hit attuali. Venerdi' e sabato si orientano verso house, tech house e techno, con DJ residenti e artisti ospiti. Consultate il calendario eventi sulla nostra <a href="/outxide">pagina Outxide</a>.</p>

<h2>Tavoli VIP e servizio bottiglia</h2>
<p>Outxide offre un servizio VIP con tavoli riservati e servizio bottiglia. I tavoli VIP includono accesso prioritario, un'area esclusiva con vista sulla pista e attenzione personalizzata. Ideale per celebrazioni. Prenotate direttamente con noi o tramite il nostro sito.</p>

<h2>La serata perfetta a Port d'Alcudia</h2>
<p>La combinazione vincente: cena al <a href="/hiru">Hiru Food &amp; Drinks</a>, cocktail al tramonto sulla <a href="/enjoy">Enjoy Terrace</a> e poi ballare tutta la notte all'Outxide Club. I tre locali sono a pochi metri l'uno dall'altro.</p>

<p><strong>Outxide Club — Av. Tucan 1, Port d'Alcudia, Maiorca. Giovedi', venerdi' e sabato. <a href="/outxide">Visitate il nostro sito per maggiori informazioni e biglietti.</a></strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    image: "/images/outxide/DSCF8530-21.jpg",
    tags: ["outxide", "clubs", "nightlife", "alcudia", "mallorca"],
    venue: "outxide",
    readingTime: 8,
  },
  {
    slug: "hiru-food-drinks-restaurante-alcudia",
    title: {
      es: "Hiru Food & Drinks: El Restaurante a la Brasa de Referencia en Alcudia",
      en: "Hiru Food & Drinks: Alcudia's Premier Charcoal Grill Restaurant",
      de: "Hiru Food & Drinks: Das Top-Grillrestaurant in Alcudia, Mallorca",
      fr: "Hiru Food & Drinks : Le Restaurant Grill de Référence à Alcudia",
      it: "Hiru Food & Drinks: Il Ristorante alla Brace di Riferimento ad Alcudia",
    },
    excerpt: {
      es: "Descubre Hiru Food & Drinks, el restaurante de referencia en Alcudia. Carnes maduradas dry-aged, paella de marisco, terraza al aire libre, cocktails de autor y reservas en Port d'Alcudia.",
      en: "Discover Hiru Food & Drinks, the benchmark restaurant in Alcudia. Dry-aged meats, seafood paella, open-air terrace, signature cocktails and reservations in Port d'Alcudia.",
      de: "Entdecken Sie Hiru Food & Drinks, das Referenzrestaurant in Alcudia. Dry-Aged-Fleisch, Meeresfruechte-Paella, Terrasse, Signature-Cocktails und Reservierungen in Port d'Alcudia.",
      fr: "Decouvrez Hiru Food & Drinks, le restaurant de reference à Alcudia. Viandes maturees dry-aged, paella de fruits de mer, terrasse en plein air, cocktails signature et reservations à Port d'Alcudia.",
      it: "Scoprite Hiru Food & Drinks, il ristorante di riferimento ad Alcudia. Carni frollate dry-aged, paella di frutti di mare, terrazza all'aperto, cocktail d'autore e prenotazioni a Port d'Alcudia.",
    },
    content: {
      es: `<p>Si buscas donde comer bien en Alcudia, <strong>Hiru Food &amp; Drinks</strong> es la respuesta. Esta es la web oficial de Grupo Enjoy, la empresa que gestiona Hiru en Port d'Alcudia, Mallorca. Aqui encontraras toda la informacion que necesitas: carta, horarios, ubicacion, terraza y como reservar mesa.</p>

<h2>Que es Hiru Food &amp; Drinks</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> es un restaurante de cocina a la brasa ubicado en la Carretera d'Arta 40, Alcudia. El nombre Hiru significa "tres" en euskera, reflejando la filosofia de tres pilares que define el restaurante: producto de primera, fuego como tecnica de coccion y un ambiente donde la gastronomia y el buen rato van de la mano. Hiru forma parte de <a href="/">Grupo Enjoy</a>, junto con <a href="/enjoy">Enjoy Terrace</a> y <a href="/outxide">Outxide Club</a>.</p>

<h2>La Carta: Cocina a la Brasa con Producto Premium</h2>
<h3>Carnes Maduradas Dry-Aged</h3>
<p>La gran especialidad de Hiru son las carnes maduradas dry-aged. Seleccionamos piezas de primera calidad que se maduran durante semanas en condiciones controladas para lograr un sabor concentrado y una textura excepcional. Chuleton, tomahawk, entrana y costilla son algunas de las opciones que encontraras en nuestra carta, todas cocinadas a la brasa con madera natural.</p>

<h3>Arroces y Paella de Marisco</h3>
<p>Los arroces son otro pilar de la cocina de Hiru. La paella de marisco, elaborada con caldo casero y producto fresco de la lonja de Alcudia, es uno de nuestros platos mas solicitados. Tambien ofrecemos arroz caldoso con bogavante, arroz negro con chipirones y arroz de verduras. Cada arroz se prepara al momento, por lo que te recomendamos pedirlo al llegar.</p>

<h3>Pescado del Mediterraneo</h3>
<p>Pescado fresco del Mediterraneo cocinado a la brasa: lubina, dorada, pulpo y otros ejemplares que varian segun la temporada y la captura del dia. La sencillez del fuego aplicada a un producto excepcional.</p>

<h3>Cocktails de Autor</h3>
<p>Hiru no es solo un restaurante. Nuestra barra de cocteles ofrece una carta de combinados de autor elaborados con destilados premium, jugos naturales e ingredientes de temporada. Desde clasicos revisitados hasta creaciones originales de nuestro equipo de cocteleria.</p>

<h2>Terraza al Aire Libre</h2>
<p>La terraza de Hiru es uno de sus grandes atractivos. Amplia, bien ambientada y perfecta tanto para comidas familiares como para cenas romanticas o reuniones de amigos. En verano, cenar al aire libre en Hiru es una experiencia que no te puedes perder.</p>

<h2>Horarios y Dias de Apertura</h2>
<p>Hiru Food &amp; Drinks esta abierto de lunes a domingo excepto los martes. Horarios: de 12:00 a 23:30 (viernes y sabado hasta la 01:00). Recomendamos reservar mesa con antelacion, especialmente en temporada alta (junio a septiembre).</p>

<h2>Ubicacion y Como Llegar</h2>
<p>Hiru se encuentra en la Carretera d'Arta 40, Alcudia 07400, Illes Balears. Esta a 5 minutos en coche del centro historico de Alcudia y a 2 minutos del paseo maritimo de Port d'Alcudia. Aparcamiento disponible en las cercanias. Si vienes desde Palma, toma la autopista Ma-13 (unos 50 minutos).</p>

<h2>Como Reservar Mesa</h2>
<p>Puedes reservar mesa en Hiru a traves de nuestra pagina de <a href="/contacto">contacto</a> o llamando al +34 971 85 39 32. En temporada alta la reserva es practicamente imprescindible, especialmente para cenas de viernes y sabado y para comidas en terraza los fines de semana.</p>

<h2>Por Que Elegir Hiru</h2>
<p>Hiru Food &amp; Drinks no es solo un restaurante: es el punto de partida para una experiencia gastronomica y de ocio completa en Port d'Alcudia. Cena en Hiru, cocktails en <a href="/enjoy">Enjoy Terrace</a> y, si la noche lo pide, fiesta en <a href="/outxide">Outxide Club</a>. Todo a pocos metros de distancia, sin necesidad de coche. Ese es el espiritu de <a href="/">Grupo Enjoy</a>.</p>

<h2>Mas Guias Gastronomicas de Alcudia</h2>
<p>Si buscas mas opciones donde comer, consulta nuestra guia de los <a href="/blog/mejores-restaurantes-alcudia-mallorca">mejores restaurantes en Alcudia</a>, descubre las mejores opciones para una <a href="/blog/donde-cenar-tarde-port-alcudia">cena tardia en Port d'Alcudia</a> o conoce lo mejor de la <a href="/blog/restaurante-brasa-parrilla-mallorca">cocina a la brasa en Mallorca</a>. Y si despues de cenar quieres cocktails, lee nuestra guia de <a href="/blog/cocteles-shisha-terraza-alcudia">cocteles y shisha en Alcudia</a>.</p>

<p><strong>Hiru Food &amp; Drinks — Ctra. d'Arta 40, Alcudia, Mallorca. Abierto a diario excepto martes. <a href="/hiru">Visita nuestra web para ver la carta y reservar.</a></strong></p>`,

      en: `<p>Looking for a great place to eat in Alcudia? <strong>Hiru Food &amp; Drinks</strong> is your answer. This is the official website of Grupo Enjoy, the company behind Hiru in Port d'Alcudia, Mallorca. Here you will find everything you need: menu, opening hours, location, terrace and how to book a table.</p>

<h2>What Is Hiru Food &amp; Drinks</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> is a charcoal-grill restaurant located on Carretera d'Arta 40, Alcudia. The name Hiru means "three" in Basque, reflecting the three-pillar philosophy that defines the restaurant: top-quality produce, fire as the cooking method and an atmosphere where great food and good times go hand in hand. Hiru is part of <a href="/">Grupo Enjoy</a>, alongside <a href="/enjoy">Enjoy Terrace</a> and <a href="/outxide">Outxide Club</a>.</p>

<h2>The Menu: Charcoal-Grill Cuisine with Premium Produce</h2>
<h3>Dry-Aged Meats</h3>
<p>Hiru's star speciality is dry-aged meat. We select premium cuts matured for weeks under controlled conditions to achieve concentrated flavour and exceptional texture. Ribeye, tomahawk, skirt steak and ribs are some of the options on our menu, all cooked over a natural-wood charcoal grill.</p>

<h3>Rice Dishes and Seafood Paella</h3>
<p>Rice dishes are another cornerstone of Hiru's kitchen. The seafood paella, made with homemade stock and fresh produce from Alcudia's fish market, is one of our most requested dishes. We also serve lobster caldoso rice, black rice with baby squid and vegetable rice. Each rice dish is prepared to order, so we recommend ordering on arrival.</p>

<h3>Mediterranean Fish</h3>
<p>Fresh Mediterranean fish grilled over charcoal: sea bass, bream, octopus and other catches that vary with the season. The simplicity of fire applied to exceptional produce.</p>

<h3>Signature Cocktails</h3>
<p>Hiru is not just a restaurant. Our cocktail bar offers a menu of signature drinks made with premium spirits, fresh juices and seasonal ingredients. From reimagined classics to original creations by our mixology team.</p>

<h2>Open-Air Terrace</h2>
<p>Hiru's terrace is one of its biggest draws. Spacious, well-designed and perfect for family lunches, romantic dinners or gatherings with friends. In summer, dining al fresco at Hiru is an experience you simply cannot miss.</p>

<h2>Opening Hours</h2>
<p>Hiru Food &amp; Drinks is open Monday to Sunday except Tuesdays. Hours: 12:00 to 23:30 (Friday and Saturday until 01:00). We recommend booking in advance, especially in high season (June to September).</p>

<h2>Location and How to Get Here</h2>
<p>Hiru is located on Carretera d'Arta 40, Alcudia 07400, Balearic Islands. It is a 5-minute drive from Alcudia's historic old town and 2 minutes from Port d'Alcudia's promenade. Parking is available nearby. From Palma, take the Ma-13 motorway (approximately 50 minutes).</p>

<h2>How to Book a Table</h2>
<p>You can reserve a table at Hiru through our <a href="/contacto">contact page</a> or by calling +34 971 85 39 32. In high season, booking is practically essential, especially for Friday and Saturday dinners and weekend terrace lunches.</p>

<h2>Why Choose Hiru</h2>
<p>Hiru Food &amp; Drinks is not just a restaurant: it is the starting point for a complete dining and leisure experience in Port d'Alcudia. Dinner at Hiru, cocktails at <a href="/enjoy">Enjoy Terrace</a> and, if the night calls for it, dancing at <a href="/outxide">Outxide Club</a>. All just metres apart, no car needed. That is the spirit of <a href="/">Grupo Enjoy</a>.</p>

<h2>More Restaurant Guides for Alcudia</h2>
<p>Explore more dining options in our guide to the <a href="/blog/mejores-restaurantes-alcudia-mallorca">best restaurants in Alcudia</a>, find the best spots for a <a href="/blog/donde-cenar-tarde-port-alcudia">late dinner in Port d'Alcudia</a> or discover top <a href="/blog/restaurante-brasa-parrilla-mallorca">charcoal grill restaurants in Mallorca</a>. After dinner, check out our <a href="/blog/cocteles-shisha-terraza-alcudia">cocktails and shisha guide for Alcudia</a>.</p>

<p><strong>Hiru Food &amp; Drinks — Ctra. d'Arta 40, Alcudia, Mallorca. Open daily except Tuesday. <a href="/hiru">Visit our website to see the menu and book.</a></strong></p>`,

      de: `<p>Sie suchen ein erstklassiges Restaurant in Alcudia? <strong>Hiru Food &amp; Drinks</strong> ist Ihre Antwort. Dies ist die offizielle Website von Grupo Enjoy, dem Unternehmen hinter Hiru in Port d'Alcudia, Mallorca. Hier finden Sie alles: Speisekarte, Oeffnungszeiten, Lage, Terrasse und Tischreservierung.</p>

<h2>Was ist Hiru Food &amp; Drinks</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> ist ein Grillrestaurant an der Carretera d'Arta 40, Alcudia. Der Name Hiru bedeutet "drei" auf Baskisch und spiegelt die Drei-Saeulen-Philosophie wider: erstklassige Produkte, Feuer als Garmethode und eine Atmosphaere, in der gutes Essen und gute Laune zusammengehoeren. Hiru gehoert zu <a href="/">Grupo Enjoy</a>, zusammen mit <a href="/enjoy">Enjoy Terrace</a> und <a href="/outxide">Outxide Club</a>.</p>

<h2>Die Karte: Grillkueche mit Premiumprodukten</h2>
<h3>Dry-Aged-Fleisch</h3>
<p>Die grosse Spezialitaet von Hiru ist Dry-Aged-Fleisch. Wir waehlen Premium-Stuecke aus, die wochenlang unter kontrollierten Bedingungen reifen, um konzentrierten Geschmack und aussergewoehnliche Textur zu erzielen. Ribeye, Tomahawk, Skirt Steak und Ribs, alles auf dem Holzkohlegrill zubereitet.</p>

<h3>Reisgerichte und Meeresfruechte-Paella</h3>
<p>Reisgerichte sind ein weiterer Eckpfeiler der Hiru-Kueche. Die Meeresfruechte-Paella, mit hausgemachter Bruehe und frischen Produkten vom Fischmarkt in Alcudia, ist eines unserer beliebtesten Gerichte. Dazu Hummer-Caldoso-Reis, schwarzer Reis mit Tintenfisch und Gemuesereis.</p>

<h3>Mittelmeer-Fisch</h3>
<p>Frischer Mittelmeerfisch vom Holzkohlegrill: Wolfsbarsch, Goldbrasse, Oktopus und weitere saisonale Faenge. Die Einfachheit des Feuers auf aussergewoehnliche Produkte angewendet.</p>

<h2>Terrasse</h2>
<p>Die Terrasse von Hiru ist einer der groessten Anziehungspunkte. Geraeumig, stilvoll und perfekt fuer Familienessen, romantische Abendessen oder Treffen mit Freunden. Im Sommer ist Essen im Freien bei Hiru ein unvergessliches Erlebnis.</p>

<h2>Oeffnungszeiten</h2>
<p>Hiru Food &amp; Drinks ist Montag bis Sonntag ausser Dienstag geoeffnet. Zeiten: 12:00 bis 23:30 (Freitag und Samstag bis 01:00). In der Hochsaison (Juni-September) empfehlen wir eine Reservierung.</p>

<h2>Lage und Anfahrt</h2>
<p>Hiru befindet sich an der Carretera d'Arta 40, Alcudia 07400, Balearen. 5 Autominuten von Alcudias Altstadt, 2 Minuten von der Strandpromenade von Port d'Alcudia. Von Palma nehmen Sie die Ma-13 (ca. 50 Min.).</p>

<h2>Warum Hiru waehlen</h2>
<p>Hiru Food &amp; Drinks ist nicht nur ein Restaurant: Es ist der Startpunkt fuer ein komplettes kulinarisches und Freizeiterlebnis in Port d'Alcudia. Abendessen bei Hiru, Cocktails auf der <a href="/enjoy">Enjoy Terrace</a> und dann Tanzen im <a href="/outxide">Outxide Club</a>. Alles nur Meter voneinander entfernt. Das ist der Geist von <a href="/">Grupo Enjoy</a>.</p>

<p><strong>Hiru Food &amp; Drinks — Ctra. d'Arta 40, Alcudia, Mallorca. Taeglich ausser Dienstag geoeffnet. <a href="/hiru">Besuchen Sie unsere Website fuer Speisekarte und Reservierung.</a></strong></p>`,

      fr: `<p>Vous cherchez un bon restaurant à Alcudia ? <strong>Hiru Food &amp; Drinks</strong> est la reponse. Ceci est le site officiel de Grupo Enjoy, l'entreprise derrière Hiru à Port d'Alcudia, Majorque. Voici tout ce dont vous avez besoin : carte, horaires, emplacement, terrasse et reservations.</p>

<h2>Qu'est-ce que Hiru Food &amp; Drinks</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> est un restaurant grill situe sur la Carretera d'Arta 40, Alcudia. Le nom Hiru signifie "trois" en basque, refletant la philosophie à trois piliers : produits de premiere qualite, le feu comme methode de cuisson et une ambiance ou gastronomie et convivialite vont de pair. Hiru fait partie de <a href="/">Grupo Enjoy</a>, avec <a href="/enjoy">Enjoy Terrace</a> et <a href="/outxide">Outxide Club</a>.</p>

<h2>La Carte : Cuisine au Grill avec Produits Premium</h2>
<h3>Viandes Maturees Dry-Aged</h3>
<p>La grande specialite de Hiru est la viande maturee dry-aged. Nous selectionnons des pièces premium maturees pendant des semaines pour une saveur concentree et une texture exceptionnelle. Entrecote, tomahawk, onglet et travers, le tout grille au charbon de bois naturel.</p>

<h3>Riz et Paella de Fruits de Mer</h3>
<p>Les riz sont un autre pilier de la cuisine de Hiru. La paella de fruits de mer, preparee avec un bouillon maison et des produits frais du marche aux poissons d'Alcudia, est l'un de nos plats les plus demandes.</p>

<h2>Terrasse en Plein Air</h2>
<p>La terrasse de Hiru est l'un de ses plus grands atouts. Spacieuse, bien amenagee et parfaite pour les dejeuners en famille, diners romantiques ou retrouvailles entre amis.</p>

<h2>Horaires</h2>
<p>Hiru Food &amp; Drinks est ouvert du lundi au dimanche sauf le mardi. Horaires : 12h00 à 23h30 (vendredi et samedi jusqu'à 01h00). Reservation recommandee en haute saison (juin à septembre).</p>

<h2>Pourquoi choisir Hiru</h2>
<p>Hiru Food &amp; Drinks n'est pas qu'un restaurant : c'est le point de depart d'une experience gastronomique et de loisirs complète à Port d'Alcudia. Diner au Hiru, cocktails à la <a href="/enjoy">Enjoy Terrace</a> puis danser à l'<a href="/outxide">Outxide Club</a>. Tout à quelques mètres. C'est l'esprit de <a href="/">Grupo Enjoy</a>.</p>

<p><strong>Hiru Food &amp; Drinks — Ctra. d'Arta 40, Alcudia, Majorque. Ouvert tous les jours sauf mardi. <a href="/hiru">Visitez notre site pour la carte et les reservations.</a></strong></p>`,

      it: `<p>Cercate un ottimo ristorante ad Alcudia? <strong>Hiru Food &amp; Drinks</strong> e' la risposta. Questo e' il sito ufficiale di Grupo Enjoy, l'azienda che gestisce Hiru a Port d'Alcudia, Maiorca. Qui troverete tutto: menu, orari, posizione, terrazza e come prenotare un tavolo.</p>

<h2>Cos'e' Hiru Food &amp; Drinks</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> e' un ristorante alla brace situato sulla Carretera d'Arta 40, Alcudia. Il nome Hiru significa "tre" in basco, riflettendo la filosofia a tre pilastri: prodotti di prima qualita', il fuoco come metodo di cottura e un'atmosfera dove gastronomia e buon umore vanno a braccetto. Hiru fa parte di <a href="/">Grupo Enjoy</a>, insieme a <a href="/enjoy">Enjoy Terrace</a> e <a href="/outxide">Outxide Club</a>.</p>

<h2>Il Menu: Cucina alla Brace con Prodotti Premium</h2>
<h3>Carni Frollate Dry-Aged</h3>
<p>La grande specialita' di Hiru sono le carni frollate dry-aged. Selezioniamo tagli premium frollati per settimane in condizioni controllate per ottenere un sapore concentrato e una consistenza eccezionale. Ribeye, tomahawk, skirt steak e costolette, tutto cotto alla griglia con carbone naturale.</p>

<h3>Risi e Paella di Frutti di Mare</h3>
<p>I piatti di riso sono un altro pilastro della cucina di Hiru. La paella di frutti di mare, preparata con brodo fatto in casa e prodotti freschi dal mercato del pesce di Alcudia, e' uno dei nostri piatti piu' richiesti.</p>

<h2>Terrazza all'Aperto</h2>
<p>La terrazza di Hiru e' uno dei suoi punti di forza. Spaziosa, elegante e perfetta per pranzi in famiglia, cene romantiche o incontri con amici.</p>

<h2>Orari</h2>
<p>Hiru Food &amp; Drinks e' aperto dal lunedi' alla domenica escluso il martedi'. Orari: dalle 12:00 alle 23:30 (venerdi' e sabato fino alle 01:00). Prenotazione consigliata in alta stagione (giugno-settembre).</p>

<h2>Perche' Scegliere Hiru</h2>
<p>Hiru Food &amp; Drinks non e' solo un ristorante: e' il punto di partenza per un'esperienza gastronomica e di svago completa a Port d'Alcudia. Cena da Hiru, cocktail sulla <a href="/enjoy">Enjoy Terrace</a> e poi ballare all'<a href="/outxide">Outxide Club</a>. Tutto a pochi metri di distanza. Questo e' lo spirito di <a href="/">Grupo Enjoy</a>.</p>

<p><strong>Hiru Food &amp; Drinks — Ctra. d'Arta 40, Alcudia, Maiorca. Aperto tutti i giorni tranne martedi'. <a href="/hiru">Visitate il nostro sito per il menu e le prenotazioni.</a></strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    image: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
    tags: ["hiru", "restaurants", "food", "alcudia", "mallorca"],
    venue: "hiru",
    readingTime: 8,
  },
  {
    slug: "enjoy-terrace-cocktails-shisha-port-alcudia",
    title: {
      es: "Enjoy Terrace: La Terraza de Cocteles y Shisha en Port d'Alcudia",
      en: "Enjoy Terrace: The Cocktail & Shisha Lounge in Port d'Alcudia",
      de: "Enjoy Terrace: Die Cocktail- & Shisha-Lounge in Port d'Alcudia",
      fr: "Enjoy Terrace : Le Lounge Cocktails & Chicha à Port d'Alcudia",
      it: "Enjoy Terrace: Il Cocktail & Shisha Lounge a Port d'Alcudia",
    },
    excerpt: {
      es: "Todo sobre Enjoy Terrace, la terraza de cocteles y shisha de referencia en Port d'Alcudia. Ubicacion, horarios, carta de cocteles, shisha premium y por que es el mejor plan para empezar la noche en Mallorca.",
      en: "Everything about Enjoy Terrace, the benchmark cocktail and shisha terrace in Port d'Alcudia. Location, opening hours, cocktail menu, premium shisha and why it is the best way to start your night in Mallorca.",
      de: "Alles ueber Enjoy Terrace, die fuehrende Cocktail- und Shisha-Terrasse in Port d'Alcudia. Lage, Oeffnungszeiten, Cocktailkarte, Premium-Shisha und warum es der beste Start in die Nacht auf Mallorca ist.",
      fr: "Tout sur Enjoy Terrace, la terrasse cocktails et chicha de reference à Port d'Alcudia. Emplacement, horaires, carte de cocktails, chicha premium et pourquoi c'est le meilleur plan pour commencer la soiree à Majorque.",
      it: "Tutto su Enjoy Terrace, la terrazza cocktail e shisha di riferimento a Port d'Alcudia. Posizione, orari, carta cocktail, shisha premium e perche' e' il miglior modo per iniziare la serata a Maiorca.",
    },
    content: {
      es: `<p>Si buscas la mejor terraza de cocteles en Port d'Alcudia, <strong>Enjoy Terrace</strong> es el lugar. Esta es la web oficial de Grupo Enjoy, la empresa que gestiona Enjoy Terrace en Mallorca. Aqui tienes toda la informacion que necesitas para visitarnos.</p>

<h2>Que es Enjoy Terrace</h2>
<p><a href="/enjoy">Enjoy Terrace</a> es un cocktail lounge y shisha bar premium ubicado en la Av. Tucan 1, Port d'Alcudia. Es el lugar donde las noches comienzan en el norte de Mallorca: una terraza al aire libre con ambiente sofisticado, los mejores cocteles de la zona y shisha premium mientras disfrutas del atardecer mediterraneo. Enjoy Terrace forma parte de <a href="/">Grupo Enjoy</a>, junto con <a href="/hiru">Hiru Food &amp; Drinks</a> y <a href="/outxide">Outxide Club</a>.</p>

<h2>Carta de Cocteles</h2>
<p>La carta de cocteles de Enjoy Terrace es una de las mas completas de Alcudia. Nuestro equipo de cocteleria elabora combinados de autor con destilados premium, jugos naturales frescos, siropes artesanales e ingredientes de temporada. Desde clasicos como el Aperol Spritz o el Mojito hasta creaciones originales que solo encontraras aqui. La carta rota por temporada para ofrecerte siempre algo nuevo.</p>

<h3>Sunset Cocktails</h3>
<p>La especialidad de Enjoy Terrace son los sunset cocktails: combinados pensados para disfrutar con la luz del atardecer, con sabores frescos, afrutados y tropicales. Pedir un coctel al atardecer en nuestra terraza es uno de los rituales mas apreciados del verano en Port d'Alcudia.</p>

<h2>Shisha Premium</h2>
<p>Enjoy Terrace ofrece un servicio de shisha premium con una amplia seleccion de sabores y mezclas. Utilizamos carbon natural y tabacos de primera calidad para una experiencia de shisha superior. Nuestro equipo te asesorara sobre las mejores combinaciones de sabores segun tus preferencias.</p>

<h2>Terraza y Ambiente</h2>
<p>La terraza de Enjoy es el corazon del local. Un espacio al aire libre disenado para crear el ambiente perfecto: iluminacion calida, musica cuidadosamente seleccionada, mobiliario comodo y una estetica que combina lo moderno con la calidez mediterranea. Es el lugar ideal para una primera cita, una reunion con amigos, un afterwork o simplemente para relajarte con un buen coctel.</p>

<h2>Horarios</h2>
<p>Enjoy Terrace abre todos los dias de 17:00 a 05:30. Si, has leido bien: esta abierto hasta altas horas de la madrugada, lo que lo convierte en el nexo perfecto entre la cena y la fiesta. Puedes empezar con cocktails al atardecer y quedarte hasta que quieras — o continuar la noche en <a href="/outxide">Outxide Club</a>, que esta literalmente al lado.</p>

<h2>Ubicacion</h2>
<p>Enjoy Terrace se encuentra en la Av. Tucan 1, Port d'Alcudia 07400, Mallorca. En la misma ubicacion que Outxide Club, en el corazon de la zona de ocio nocturno de Port d'Alcudia. Accesible a pie desde cualquier hotel de la zona. Aparcamiento disponible en las inmediaciones.</p>

<h2>Enjoy Terrace: Donde Comienza la Noche</h2>
<p>La filosofia de Enjoy Terrace es sencilla: ser el lugar donde quieres estar cuando cae el sol en Mallorca. No es un bar mas; es una experiencia. La combinacion de cocteles de calidad, shisha premium, musica ambiente y una terraza que invita a quedarse hacen de Enjoy el punto de encuentro natural antes de cualquier noche en Port d'Alcudia.</p>

<h2>El Plan Perfecto en Port d'Alcudia</h2>
<p>Los locales lo tienen claro: cena en <a href="/hiru">Hiru Food &amp; Drinks</a>, cocktails y shisha en <a href="/enjoy">Enjoy Terrace</a> y, si es jueves, viernes o sabado, la noche continua en <a href="/outxide">Outxide Club</a>. Todo a pocos metros, todo parte de la misma experiencia <a href="/">Grupo Enjoy</a>. Este es el plan que cada vez mas gente repite verano tras verano.</p>

<h2>Mas Guias de Ocio en Alcudia</h2>
<p>Explora mas planes en nuestra guia de <a href="/blog/cocteles-shisha-terraza-alcudia">cocteles y shisha en Alcudia</a>, descubre la <a href="/blog/guia-vida-nocturna-alcudia">vida nocturna de Alcudia al completo</a> o planifica tu dia con nuestra guia de <a href="/blog/que-hacer-alcudia-mallorca">que hacer en Alcudia</a>. Si buscas un plan con shisha, te gustara nuestra seleccion de los <a href="/blog/shisha-bar-terraza-lounge-mallorca">mejores shisha bars de Mallorca</a>.</p>

<p><strong>Enjoy Terrace — Av. Tucan 1, Port d'Alcudia, Mallorca. Abierto a diario desde las 17:00. <a href="/enjoy">Visita nuestra web para mas informacion.</a></strong></p>`,

      en: `<p>Looking for the best cocktail terrace in Port d'Alcudia? <strong>Enjoy Terrace</strong> is the place. This is the official website of Grupo Enjoy, the company behind Enjoy Terrace in Mallorca. Here is everything you need to know before your visit.</p>

<h2>What Is Enjoy Terrace</h2>
<p><a href="/enjoy">Enjoy Terrace</a> is a premium cocktail lounge and shisha bar located at Av. Tucan 1, Port d'Alcudia. It is where nights begin in northern Mallorca: an open-air terrace with a sophisticated atmosphere, the best cocktails in the area and premium shisha while you enjoy the Mediterranean sunset. Enjoy Terrace is part of <a href="/">Grupo Enjoy</a>, alongside <a href="/hiru">Hiru Food &amp; Drinks</a> and <a href="/outxide">Outxide Club</a>.</p>

<h2>Cocktail Menu</h2>
<p>Enjoy Terrace's cocktail menu is one of the most comprehensive in Alcudia. Our mixology team creates signature drinks with premium spirits, fresh natural juices, artisanal syrups and seasonal ingredients. From classics like Aperol Spritz and Mojito to original creations you will only find here. The menu rotates seasonally to always offer something new.</p>

<h3>Sunset Cocktails</h3>
<p>Enjoy Terrace's speciality is sunset cocktails: drinks designed to be enjoyed in the golden hour, with fresh, fruity and tropical flavours. Ordering a cocktail at sunset on our terrace is one of the most cherished rituals of summer in Port d'Alcudia.</p>

<h2>Premium Shisha</h2>
<p>Enjoy Terrace offers a premium shisha service with a wide selection of flavours and blends. We use natural charcoal and top-quality tobaccos for a superior shisha experience. Our team will advise you on the best flavour combinations based on your preferences.</p>

<h2>Terrace and Atmosphere</h2>
<p>The terrace is the heart of Enjoy. An open-air space designed to create the perfect atmosphere: warm lighting, carefully selected music, comfortable furniture and an aesthetic that blends modern style with Mediterranean warmth. The ideal spot for a first date, a catch-up with friends, after-work drinks or simply relaxing with a great cocktail.</p>

<h2>Opening Hours</h2>
<p>Enjoy Terrace is open every day from 17:00 to 05:30. Yes, you read that right: it stays open into the early hours, making it the perfect bridge between dinner and the dance floor. Start with sunset cocktails and stay as long as you like — or continue the night at <a href="/outxide">Outxide Club</a>, which is literally next door.</p>

<h2>Location</h2>
<p>Enjoy Terrace is at Av. Tucan 1, Port d'Alcudia 07400, Mallorca. Same location as Outxide Club, in the heart of Port d'Alcudia's nightlife zone. Walkable from any hotel in the area. Parking available nearby.</p>

<h2>Where the Night Begins</h2>
<p>Enjoy Terrace's philosophy is simple: be the place you want to be when the sun goes down in Mallorca. It is not just another bar; it is an experience. Quality cocktails, premium shisha, ambient music and a terrace that makes you want to stay — that is what makes Enjoy the natural meeting point before any night out in Port d'Alcudia.</p>

<h2>The Perfect Plan in Port d'Alcudia</h2>
<p>The locals have it figured out: dinner at <a href="/hiru">Hiru Food &amp; Drinks</a>, cocktails and shisha at <a href="/enjoy">Enjoy Terrace</a> and, on Thursday, Friday or Saturday, the night continues at <a href="/outxide">Outxide Club</a>. All within walking distance, all part of the same <a href="/">Grupo Enjoy</a> experience. This is the plan more and more people repeat summer after summer.</p>

<h2>More Leisure Guides for Alcudia</h2>
<p>Explore more plans in our <a href="/blog/cocteles-shisha-terraza-alcudia">cocktails and shisha guide for Alcudia</a>, discover <a href="/blog/guia-vida-nocturna-alcudia">the complete Alcudia nightlife scene</a> or plan your day with our <a href="/blog/que-hacer-alcudia-mallorca">things to do in Alcudia guide</a>. If you love shisha, check out the <a href="/blog/shisha-bar-terraza-lounge-mallorca">best shisha bars in Mallorca</a>.</p>

<p><strong>Enjoy Terrace — Av. Tucan 1, Port d'Alcudia, Mallorca. Open daily from 17:00. <a href="/enjoy">Visit our website for more information.</a></strong></p>`,

      de: `<p>Suchen Sie die beste Cocktail-Terrasse in Port d'Alcudia? <strong>Enjoy Terrace</strong> ist der richtige Ort. Dies ist die offizielle Website von Grupo Enjoy, dem Unternehmen hinter Enjoy Terrace auf Mallorca. Hier finden Sie alles Wissenswerte fuer Ihren Besuch.</p>

<h2>Was ist Enjoy Terrace</h2>
<p><a href="/enjoy">Enjoy Terrace</a> ist eine Premium-Cocktailbar und Shisha-Lounge an der Av. Tucan 1, Port d'Alcudia. Hier beginnen die Naechte im Norden Mallorcas: eine Freiluft-Terrasse mit gehobener Atmosphaere, die besten Cocktails der Gegend und Premium-Shisha zum mediterranen Sonnenuntergang. Enjoy Terrace gehoert zu <a href="/">Grupo Enjoy</a>, zusammen mit <a href="/hiru">Hiru Food &amp; Drinks</a> und <a href="/outxide">Outxide Club</a>.</p>

<h2>Cocktailkarte</h2>
<p>Die Cocktailkarte von Enjoy Terrace ist eine der umfangreichsten in Alcudia. Unser Mixologie-Team kreiert Signature-Drinks mit Premium-Spirituosen, frischen Saeften, hausgemachten Sirups und saisonalen Zutaten. Von Klassikern wie Aperol Spritz und Mojito bis zu exklusiven Eigenkreationen.</p>

<h3>Sunset-Cocktails</h3>
<p>Die Spezialitaet von Enjoy Terrace sind Sunset-Cocktails: Drinks fuer die goldene Stunde mit frischen, fruchtigen und tropischen Aromen. Ein Cocktail bei Sonnenuntergang auf unserer Terrasse gehoert zu den schoensten Ritualen des Sommers in Port d'Alcudia.</p>

<h2>Premium-Shisha</h2>
<p>Enjoy Terrace bietet Premium-Shisha mit einer grossen Auswahl an Geschmacksrichtungen und Mischungen. Wir verwenden Naturkohle und erstklassige Tabake fuer ein ueberlegenes Shisha-Erlebnis.</p>

<h2>Terrasse und Atmosphaere</h2>
<p>Die Terrasse ist das Herzstueck von Enjoy. Ein Freiluftbereich mit warmer Beleuchtung, sorgfaeltig ausgewaehlter Musik, bequemen Moebeln und einer Aesthetik, die modernen Stil mit mediterraner Waerme verbindet.</p>

<h2>Oeffnungszeiten</h2>
<p>Enjoy Terrace ist taeglich von 17:00 bis 05:30 Uhr geoeffnet. Ja, richtig gelesen: bis in die fruehen Morgenstunden, was es zur perfekten Bruecke zwischen Abendessen und Tanzflaeche macht. Beginnen Sie mit Sunset-Cocktails und bleiben Sie so lange Sie moechten — oder setzen Sie die Nacht im <a href="/outxide">Outxide Club</a> direkt nebenan fort.</p>

<h2>Der perfekte Plan in Port d'Alcudia</h2>
<p>Die Einheimischen wissen es: Abendessen im <a href="/hiru">Hiru Food &amp; Drinks</a>, Cocktails und Shisha auf der <a href="/enjoy">Enjoy Terrace</a> und donnerstags, freitags oder samstags geht die Nacht im <a href="/outxide">Outxide Club</a> weiter. Alles in Gehweite, alles Teil derselben <a href="/">Grupo Enjoy</a>-Erfahrung.</p>

<p><strong>Enjoy Terrace — Av. Tucan 1, Port d'Alcudia, Mallorca. Taeglich ab 17:00 Uhr geoeffnet. <a href="/enjoy">Besuchen Sie unsere Website fuer weitere Informationen.</a></strong></p>`,

      fr: `<p>Vous cherchez la meilleure terrasse cocktails à Port d'Alcudia ? <strong>Enjoy Terrace</strong> est l'endroit ideal. Ceci est le site officiel de Grupo Enjoy, l'entreprise derrière Enjoy Terrace à Majorque. Voici tout ce que vous devez savoir.</p>

<h2>Qu'est-ce qu'Enjoy Terrace</h2>
<p><a href="/enjoy">Enjoy Terrace</a> est un cocktail lounge et bar à chicha premium situe Av. Tucan 1, Port d'Alcudia. C'est là que les nuits commencent dans le nord de Majorque : une terrasse en plein air avec une ambiance sophistiquee, les meilleurs cocktails de la zone et une chicha premium face au coucher de soleil mediterraneen. Enjoy Terrace fait partie de <a href="/">Grupo Enjoy</a>, avec <a href="/hiru">Hiru Food &amp; Drinks</a> et <a href="/outxide">Outxide Club</a>.</p>

<h2>Carte des Cocktails</h2>
<p>La carte de cocktails d'Enjoy Terrace est l'une des plus complètes d'Alcudia. Notre equipe de mixologie cree des boissons signature avec des spiritueux premium, des jus frais, des sirops artisanaux et des ingredients de saison.</p>

<h2>Chicha Premium</h2>
<p>Enjoy Terrace propose un service de chicha premium avec une large selection de saveurs et de melanges. Charbon naturel et tabacs de première qualite pour une experience superieure.</p>

<h2>Terrasse et Ambiance</h2>
<p>La terrasse est le coeur d'Enjoy. Un espace en plein air avec eclairage chaleureux, musique soignee, mobilier confortable et une esthetique melant style moderne et chaleur mediterraneenne.</p>

<h2>Horaires</h2>
<p>Enjoy Terrace est ouvert tous les jours de 17h00 à 05h30. Le pont parfait entre le diner et le dancefloor. Commencez au coucher du soleil et prolongez au <a href="/outxide">Outxide Club</a> juste à cote.</p>

<h2>Le plan parfait à Port d'Alcudia</h2>
<p>Les habitues le savent : diner au <a href="/hiru">Hiru Food &amp; Drinks</a>, cocktails et chicha à la <a href="/enjoy">Enjoy Terrace</a>, puis la nuit continue à l'<a href="/outxide">Outxide Club</a>. Tout à quelques mètres. L'experience <a href="/">Grupo Enjoy</a>.</p>

<p><strong>Enjoy Terrace — Av. Tucan 1, Port d'Alcudia, Majorque. Ouvert tous les jours dès 17h00. <a href="/enjoy">Visitez notre site pour plus d'informations.</a></strong></p>`,

      it: `<p>Cercate la miglior terrazza cocktail a Port d'Alcudia? <strong>Enjoy Terrace</strong> e' il posto giusto. Questo e' il sito ufficiale di Grupo Enjoy, l'azienda che gestisce Enjoy Terrace a Maiorca. Ecco tutto quello che dovete sapere.</p>

<h2>Cos'e' Enjoy Terrace</h2>
<p><a href="/enjoy">Enjoy Terrace</a> e' un cocktail lounge e shisha bar premium situato in Av. Tucan 1, Port d'Alcudia. E' qui che le serate iniziano nel nord di Maiorca: una terrazza all'aperto con atmosfera sofisticata, i migliori cocktail della zona e shisha premium mentre godetevi il tramonto mediterraneo. Enjoy Terrace fa parte di <a href="/">Grupo Enjoy</a>, insieme a <a href="/hiru">Hiru Food &amp; Drinks</a> e <a href="/outxide">Outxide Club</a>.</p>

<h2>Carta Cocktail</h2>
<p>La carta cocktail di Enjoy Terrace e' una delle piu' complete di Alcudia. Il nostro team di mixology crea drink d'autore con distillati premium, succhi freschi, sciroppi artigianali e ingredienti stagionali.</p>

<h2>Shisha Premium</h2>
<p>Enjoy Terrace offre un servizio shisha premium con un'ampia selezione di gusti e miscele. Carbone naturale e tabacchi di prima qualita' per un'esperienza superiore.</p>

<h2>Terrazza e Atmosfera</h2>
<p>La terrazza e' il cuore di Enjoy. Uno spazio all'aperto con illuminazione calda, musica curata, arredi comodi e un'estetica che unisce stile moderno e calore mediterraneo.</p>

<h2>Orari</h2>
<p>Enjoy Terrace e' aperto tutti i giorni dalle 17:00 alle 05:30. Il ponte perfetto tra la cena e la pista da ballo. Iniziate al tramonto e proseguite all'<a href="/outxide">Outxide Club</a> proprio accanto.</p>

<h2>Il piano perfetto a Port d'Alcudia</h2>
<p>I locali lo sanno: cena al <a href="/hiru">Hiru Food &amp; Drinks</a>, cocktail e shisha sulla <a href="/enjoy">Enjoy Terrace</a>, poi la notte continua all'<a href="/outxide">Outxide Club</a>. Tutto a pochi metri. L'esperienza <a href="/">Grupo Enjoy</a>.</p>

<p><strong>Enjoy Terrace — Av. Tucan 1, Port d'Alcudia, Maiorca. Aperto tutti i giorni dalle 17:00. <a href="/enjoy">Visitate il nostro sito per maggiori informazioni.</a></strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    image: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
    tags: ["enjoy", "cocktails", "shisha", "terrace", "alcudia"],
    venue: "enjoy",
    readingTime: 7,
  },
  {
    slug: "despedida-soltera-soltero-alcudia-mallorca",
    title: {
      es: "Despedida de Soltera y Soltero en Alcudia: Guia Completa para una Fiesta Inolvidable",
      en: "Bachelor & Bachelorette Party in Alcudia: Complete Guide for an Unforgettable Celebration",
      de: "Junggesellenabschied in Alcudia: Kompletter Guide fuer eine unvergessliche Feier auf Mallorca",
      fr: "Enterrement de Vie de Jeune Fille et Garcon a Alcudia : Guide Complet pour une Fete Inoubliable",
      it: "Addio al Nubilato e Celibato ad Alcudia: Guida Completa per una Festa Indimenticabile",
    },
    excerpt: {
      es: "Organiza la mejor despedida de soltera o soltero en Alcudia y Port d'Alcudia. Cena en grupo, cocteles en terraza y fiesta en club: el plan perfecto en Mallorca para celebrar con amigos.",
      en: "Plan the ultimate bachelor or bachelorette party in Alcudia and Port d'Alcudia. Group dinner, terrace cocktails and club night: the perfect celebration plan in Mallorca.",
      de: "Plane den perfekten Junggesellenabschied in Alcudia und Port d'Alcudia. Gruppenessen, Cocktails auf der Terrasse und Clubnacht: der ideale Feierplan auf Mallorca.",
      fr: "Organisez le meilleur enterrement de vie de jeune fille ou garcon a Alcudia et Port d'Alcudia. Diner en groupe, cocktails en terrasse et soiree en club : le plan parfait a Majorque.",
      it: "Organizza il miglior addio al nubilato o celibato ad Alcudia e Port d'Alcudia. Cena di gruppo, cocktail in terrazza e serata in club: il piano perfetto a Maiorca.",
    },
    content: {
      es: `<p>Si estas organizando una despedida de soltera o soltero y buscas un destino que combine buena gastronomia, cocteles en terraza y una noche de fiesta memorable, <strong>Alcudia y Port d'Alcudia</strong> son tu respuesta. El norte de Mallorca ofrece todo lo que necesitas para celebrar con tu grupo de amigos: ambiente, calidad y locales de primer nivel, todo a pocos metros de distancia.</p>

<p>En esta guia te contamos como montar el plan perfecto de despedida en Alcudia paso a paso, desde la cena hasta el amanecer. Y lo mejor: no necesitas coche, porque todo esta en la misma zona.</p>

<h2>El plan perfecto de despedida en Alcudia</h2>

<p>Los mejores planes de despedida de soltera y soltero en Port d'Alcudia siguen una formula que funciona siempre: <strong>cena en grupo, cocteles y fiesta</strong>. Los tres locales de <a href="/">Grupo Enjoy</a> estan uno al lado del otro, asi que la logistica no es un problema.</p>

<h3>Paso 1: Cena en Hiru Food &amp; Drinks</h3>
<p>Toda buena despedida empieza con una gran cena. <a href="/hiru">Hiru Food &amp; Drinks</a> es el restaurante ideal para grupos grandes que quieren comer bien sin renunciar al ambiente festivo. Su terraza tiene capacidad para mesas amplias y el servicio esta acostumbrado a gestionar celebraciones.</p>
<p>Para despedidas, la <strong>paella de marisco para compartir</strong> es una de las opciones mas populares: un arrozon generoso que se sirve en el centro de la mesa y que siempre arranca aplausos. Tambien puedes optar por carnes a la brasa para compartir o por un menu de tapas variadas para que todo el grupo pique de todo. Hiru esta abierto hasta tarde, asi que no hay prisa.</p>
<p>Consejo: reserva mesa con antelacion e indica que sois un grupo de celebracion. El equipo de Hiru os ayudara a organizar la disposicion. Lee mas sobre la carta en nuestra <a href="/blog/hiru-food-drinks-restaurante-alcudia">guia completa de Hiru</a>.</p>

<h3>Paso 2: Cocteles en Enjoy Terrace</h3>
<p>Despues de cenar, el siguiente paso natural es cruzar a <a href="/enjoy">Enjoy Terrace</a>. Este cocktail lounge con terraza al aire libre es el sitio perfecto para que el grupo se relaje con cocteles de autor y shisha premium mientras la noche va subiendo de temperatura.</p>
<p>Enjoy Terrace funciona especialmente bien para despedidas porque el ambiente es sofisticado pero relajado, la musica crea atmosfera sin impedir la conversacion, y los cocteles son de los mejores de la zona. Ademas, si el grupo quiere, hay espacio para fotos de grupo en la terraza con esa estetica cuidada que queda genial en las redes.</p>
<p>Descubre la carta de cocteles y shisha en nuestro <a href="/blog/cocteles-shisha-terraza-alcudia">articulo sobre Enjoy Terrace</a>.</p>

<h3>Paso 3: Fiesta en Outxide Club</h3>
<p>Cuando el grupo esta listo para bailar, <a href="/outxide">Outxide Club</a> esta literalmente al lado. Es la discoteca de referencia del norte de Mallorca, con sesiones los jueves, viernes y sabados protagonizadas por DJs nacionales e internacionales, un sistema de sonido de primer nivel y una pista que se llena de energia.</p>
<p>Para despedidas, la opcion de <strong>reservar mesa VIP</strong> es la mejor decision. Tener vuestra propia zona con servicio de botellas garantiza que el grupo esta junto, bien atendido y con el mejor ambiente. Las mesas VIP de Outxide tienen vista directa a la pista y al DJ booth. Puedes consultar disponibilidad y comprar entradas anticipadas en la web de <a href="/outxide">Outxide Club</a>.</p>
<p>Si quieres saber mas sobre la experiencia, lee nuestra <a href="/blog/outxide-club-discoteca-alcudia-mallorca">guia de Outxide Club</a>.</p>

<h2>Mesas VIP en Outxide para grupos</h2>
<p>Si hay algo que marca la diferencia en una despedida de soltera o soltero es tener una <strong>zona VIP reservada</strong>. En Outxide Club, las mesas VIP estan situadas en posiciones privilegiadas con vision directa de la pista y el escenario. El servicio de botellas premium incluye atencion personalizada durante toda la noche.</p>
<p>Para grupos de despedida, recomendamos reservar con al menos una semana de antelacion, especialmente en julio y agosto. Contacta directamente a traves de la web de <a href="/outxide">Outxide Club</a> o por redes sociales para consultar opciones y disponibilidad.</p>

<h2>Cocteles de celebracion en Enjoy Terrace</h2>
<p>La <a href="/enjoy">Enjoy Terrace</a> es mucho mas que un bar de cocteles. Para grupos de celebracion, el equipo de Enjoy puede preparar rondas de cocteles especiales, shots de bienvenida y combinaciones personalizadas. La terraza permite que grupos de 10, 15 o 20 personas esten juntos en un ambiente elegante, con musica de fondo y las mejores shishas de Alcudia.</p>
<p>Si la despedida es en verano, llegar a Enjoy al atardecer es un acierto: los colores del cielo sobre Port d'Alcudia son el mejor decorado que puedas imaginar para las fotos del grupo.</p>

<h2>Cena de grupo en Hiru: paella de marisco para todos</h2>
<p>Una de las grandes ventajas de <a href="/hiru">Hiru Food &amp; Drinks</a> para despedidas es su capacidad de servir mesas grandes sin perder calidad. La <strong>paella de marisco</strong> se prepara con producto fresco de la lonja y se sirve en formato para compartir, ideal para que todo el grupo coma del mismo plato. Tambien hay opciones de carnes maduradas a la brasa y una seleccion de entrantes para picar entre todos.</p>
<p>El restaurante tiene cocktail bar propio, asi que los que quieran empezar con un gin-tonic o un combinado antes de cenar pueden hacerlo sin moverse de sitio.</p>

<h2>Consejos practicos para tu despedida en Alcudia</h2>
<p><strong>Alojamiento:</strong> Port d'Alcudia tiene una gran oferta de hoteles y apartamentos. Para despedidas, los apartamentos tipo villa con piscina son los mas populares, ya que permiten que el grupo este junto durante el dia. La zona de Bellevue y la Playa de Muro tienen buenas opciones.</p>
<p><strong>Transporte:</strong> La gran ventaja de organizar tu despedida con Grupo Enjoy es que <a href="/hiru">Hiru</a>, <a href="/enjoy">Enjoy</a> y <a href="/outxide">Outxide</a> estan en la misma calle, a pocos pasos el uno del otro. No necesitas taxis ni coches para moverte entre locales.</p>
<p><strong>Reservas:</strong> Reserva la mesa del restaurante y la zona VIP del club con antelacion. En temporada alta (junio-septiembre), la demanda es muy alta y los grupos grandes necesitan planificacion previa.</p>
<p><strong>Dia de la semana:</strong> Los viernes y sabados son los dias con mas ambiente en Outxide. Si prefieres algo mas relajado, los jueves tambien hay sesion y suele haber menos gente.</p>

<p>Si quieres mas ideas sobre que hacer en la zona, consulta nuestra <a href="/blog/guia-vida-nocturna-alcudia">guia de vida nocturna en Alcudia</a> y nuestro articulo sobre <a href="/blog/fiestas-eventos-verano-alcudia-2026">fiestas y eventos de verano 2026</a>.</p>

<p><strong>Grupo Enjoy — Hiru, Enjoy Terrace &amp; Outxide Club. Todo en Av. Tucan / Ctra. d'Arta, Port d'Alcudia, Mallorca. <a href="/">Visita nuestra web para mas informacion.</a></strong></p>`,

      en: `<p>If you're planning a bachelor or bachelorette party and want a destination that combines great food, terrace cocktails and a memorable night of clubbing, <strong>Alcudia and Port d'Alcudia</strong> have everything you need. Northern Mallorca offers quality venues, incredible atmosphere and the convenience of having everything within walking distance.</p>

<p>In this guide we show you how to put together the perfect hen or stag do in Alcudia step by step, from dinner to sunrise. The best part: you don't need a car because everything is on the same street.</p>

<h2>The perfect bachelor/bachelorette plan in Alcudia</h2>

<p>The best celebration plans in Port d'Alcudia follow a proven formula: <strong>group dinner, cocktails and party</strong>. The three venues run by <a href="/">Grupo Enjoy</a> are right next to each other, so logistics are effortless.</p>

<h3>Step 1: Dinner at Hiru Food &amp; Drinks</h3>
<p>Every great celebration starts with a great meal. <a href="/hiru">Hiru Food &amp; Drinks</a> is the ideal restaurant for large groups who want excellent food in a festive atmosphere. Their terrace accommodates big tables and the staff is experienced with celebration groups.</p>
<p>For parties, the <strong>seafood paella to share</strong> is one of the most popular choices: a generous rice dish served in the centre of the table that always gets a round of applause. You can also go for grilled meats to share or a selection of varied tapas so everyone can try everything. Hiru is open late, so there's no rush.</p>
<p>Tip: book your table in advance and mention you're a celebration group. The Hiru team will help organise the seating. Read more about their menu in our <a href="/blog/hiru-food-drinks-restaurante-alcudia">complete Hiru guide</a>.</p>

<h3>Step 2: Cocktails at Enjoy Terrace</h3>
<p>After dinner, the natural next step is to walk over to <a href="/enjoy">Enjoy Terrace</a>. This open-air cocktail lounge is the perfect spot for the group to unwind with signature cocktails and premium shisha while the night builds momentum.</p>
<p>Enjoy Terrace works particularly well for celebrations because the vibe is sophisticated yet relaxed, the music creates atmosphere without drowning out conversation, and the cocktails are among the best in the area. Plus, the terrace setting is ideal for group photos with a stylish backdrop.</p>
<p>Discover the cocktail and shisha menu in our <a href="/blog/cocteles-shisha-terraza-alcudia">article about Enjoy Terrace</a>.</p>

<h3>Step 3: Party at Outxide Club</h3>
<p>When the group is ready to dance, <a href="/outxide">Outxide Club</a> is literally next door. It's the top nightclub in northern Mallorca, with sessions on Thursdays, Fridays and Saturdays featuring national and international DJs, a top-tier sound system and a dance floor packed with energy.</p>
<p>For bachelor and bachelorette parties, booking a <strong>VIP table</strong> is the best decision. Having your own area with bottle service ensures the group stays together, well looked after and in the best possible spot. Outxide's VIP tables have direct views of the dance floor and DJ booth. Check availability and buy advance tickets on the <a href="/outxide">Outxide Club</a> website.</p>
<p>Want to know more about the experience? Read our <a href="/blog/outxide-club-discoteca-alcudia-mallorca">Outxide Club guide</a>.</p>

<h2>VIP tables at Outxide for groups</h2>
<p>If there's one thing that elevates a bachelor or bachelorette party, it's having a <strong>reserved VIP area</strong>. At Outxide Club, VIP tables are positioned in prime locations with direct views of the dance floor and stage. Premium bottle service includes dedicated attention throughout the night.</p>
<p>For celebration groups, we recommend booking at least one week in advance, especially in July and August. Contact directly through the <a href="/outxide">Outxide Club</a> website or social media to check options and availability.</p>

<h2>Celebration cocktails at Enjoy Terrace</h2>
<p><a href="/enjoy">Enjoy Terrace</a> is much more than a cocktail bar. For celebration groups, the Enjoy team can prepare special cocktail rounds, welcome shots and customised combinations. The terrace comfortably fits groups of 10, 15 or 20 people in an elegant setting with background music and the finest shisha in Alcudia.</p>
<p>If your party is in summer, arriving at Enjoy at sunset is a winning move: the colours over Port d'Alcudia provide the best backdrop you could wish for.</p>

<h2>Group dinner at Hiru: seafood paella for everyone</h2>
<p>One of the great advantages of <a href="/hiru">Hiru Food &amp; Drinks</a> for celebrations is its ability to serve large tables without compromising on quality. The <strong>seafood paella</strong> is made with fresh produce from the local fish market and served family-style, perfect for the whole group to share. There are also dry-aged grilled meats and a selection of starters for everyone to pick from.</p>
<p>The restaurant has its own cocktail bar, so anyone who wants to start with a gin and tonic or a mixed drink before dinner can do so without leaving the venue.</p>

<h2>Practical tips for your party in Alcudia</h2>
<p><strong>Accommodation:</strong> Port d'Alcudia has a wide range of hotels and apartments. For bachelor and bachelorette parties, villa-style apartments with a pool are the most popular, allowing the group to stay together during the day. The Bellevue area and Playa de Muro have great options.</p>
<p><strong>Transport:</strong> The big advantage of celebrating with Grupo Enjoy is that <a href="/hiru">Hiru</a>, <a href="/enjoy">Enjoy</a> and <a href="/outxide">Outxide</a> are on the same street, steps apart. No taxis or cars needed to move between venues.</p>
<p><strong>Bookings:</strong> Reserve your restaurant table and club VIP area in advance. During high season (June to September), demand is very high and large groups need forward planning.</p>
<p><strong>Day of the week:</strong> Fridays and Saturdays have the biggest atmosphere at Outxide. If you prefer something more relaxed, Thursdays also have sessions and tend to be less crowded.</p>

<p>For more ideas on what to do in the area, check out our <a href="/blog/guia-vida-nocturna-alcudia">Alcudia nightlife guide</a> and our article on <a href="/blog/fiestas-eventos-verano-alcudia-2026">summer events and parties 2026</a>.</p>

<p><strong>Grupo Enjoy — Hiru, Enjoy Terrace &amp; Outxide Club. All located on Av. Tucan / Ctra. d'Arta, Port d'Alcudia, Mallorca. <a href="/">Visit our website for more information.</a></strong></p>`,

      de: `<p>Ihr plant einen Junggesellenabschied oder Junggesellinnenabschied und sucht ein Reiseziel, das grossartiges Essen, Cocktails auf der Terrasse und eine unvergessliche Clubnacht vereint? <strong>Alcudia und Port d'Alcudia</strong> im Norden Mallorcas bieten alles, was ihr braucht: hochwertige Locations, tolle Atmosphaere und den Vorteil, dass alles zu Fuss erreichbar ist.</p>

<p>In diesem Guide zeigen wir euch, wie ihr den perfekten Junggesellenabschied in Alcudia Schritt fuer Schritt zusammenstellt — vom Abendessen bis zum Sonnenaufgang. Das Beste: Ihr braucht kein Auto, denn alles liegt in derselben Strasse.</p>

<h2>Der perfekte Junggesellenabschied-Plan in Alcudia</h2>

<p>Die besten Feier-Plaene in Port d'Alcudia folgen einer bewaehrten Formel: <strong>Gruppenessen, Cocktails und Party</strong>. Die drei Locations von <a href="/">Grupo Enjoy</a> liegen direkt nebeneinander, sodass die Logistik mueheloss ist.</p>

<h3>Schritt 1: Abendessen im Hiru Food &amp; Drinks</h3>
<p>Jede grosse Feier beginnt mit einem grossartigen Essen. <a href="/hiru">Hiru Food &amp; Drinks</a> ist das ideale Restaurant fuer grosse Gruppen, die hervorragend essen moechten und dabei eine festliche Atmosphaere geniessen wollen. Die Terrasse bietet Platz fuer grosse Tische und das Personal ist erfahren mit Feiergruppen.</p>
<p>Fuer Gruppen ist die <strong>Meeresfrueechte-Paella zum Teilen</strong> eine der beliebtesten Optionen: ein grosszuegiges Reisgericht, das in der Mitte des Tisches serviert wird. Alternativ koennt ihr gegrilltes Fleisch zum Teilen oder eine Auswahl an Tapas bestellen. Hiru hat bis spaet geoeffnet, also gibt es keinen Zeitdruck.</p>
<p>Tipp: Reserviert euren Tisch im Voraus und erwaehnt, dass ihr eine Feiergruppe seid. Mehr ueber die Speisekarte erfahrt ihr in unserem <a href="/blog/hiru-food-drinks-restaurante-alcudia">kompletten Hiru-Guide</a>.</p>

<h3>Schritt 2: Cocktails auf der Enjoy Terrace</h3>
<p>Nach dem Essen ist der naechste Schritt ein Spaziergang zur <a href="/enjoy">Enjoy Terrace</a>. Diese Open-Air-Cocktail-Lounge ist der perfekte Ort, um mit Signature-Cocktails und Premium-Shisha zu entspannen, waehrend der Abend an Fahrt aufnimmt.</p>
<p>Die Enjoy Terrace eignet sich besonders gut fuer Feiern, weil die Stimmung elegant, aber entspannt ist. Die Cocktails gehoeren zu den besten der Gegend und die Terrasse bietet eine stilvolle Kulisse fuer Gruppenfotos.</p>
<p>Entdeckt die Cocktail- und Shisha-Karte in unserem <a href="/blog/cocteles-shisha-terraza-alcudia">Artikel ueber die Enjoy Terrace</a>.</p>

<h3>Schritt 3: Party im Outxide Club</h3>
<p>Wenn die Gruppe bereit ist zu tanzen, ist der <a href="/outxide">Outxide Club</a> buchstaeblich nebenan. Er ist der Top-Nachtclub im Norden Mallorcas mit Sessions an Donnerstagen, Freitagen und Samstagen mit nationalen und internationalen DJs, einem erstklassigen Soundsystem und einer energiegeladenen Tanzflaeche.</p>
<p>Fuer Junggesellenabschiede ist die Buchung eines <strong>VIP-Tisches</strong> die beste Entscheidung. Mit eurer eigenen Zone und Flaschenservice bleibt die Gruppe zusammen und wird bestens betreut. Die VIP-Tische haben direkten Blick auf die Tanzflaeche und das DJ-Pult. Prueft die Verfuegbarkeit auf der <a href="/outxide">Outxide Club</a>-Website.</p>
<p>Mehr ueber die Erfahrung erfahrt ihr in unserem <a href="/blog/outxide-club-discoteca-alcudia-mallorca">Outxide Club Guide</a>.</p>

<h2>VIP-Tische im Outxide fuer Gruppen</h2>
<p>Wenn es etwas gibt, das einen Junggesellenabschied aufwertet, dann ist es ein <strong>reservierter VIP-Bereich</strong>. Im Outxide Club sind die VIP-Tische an Premium-Positionen mit direktem Blick auf Tanzflaeche und Buehne. Premium-Flaschenservice inklusive persoenlicher Betreuung die ganze Nacht.</p>
<p>Fuer Feiergruppen empfehlen wir, mindestens eine Woche im Voraus zu buchen, besonders im Juli und August. Kontaktiert den Club direkt ueber die <a href="/outxide">Outxide Club</a>-Website.</p>

<h2>Feier-Cocktails auf der Enjoy Terrace</h2>
<p>Die <a href="/enjoy">Enjoy Terrace</a> ist viel mehr als eine Cocktailbar. Fuer Feiergruppen kann das Enjoy-Team spezielle Cocktailrunden, Willkommens-Shots und individuelle Kreationen vorbereiten. Die Terrasse bietet bequem Platz fuer Gruppen von 10, 15 oder 20 Personen in eleganter Umgebung.</p>
<p>Wenn eure Feier im Sommer stattfindet, ist die Ankunft bei Sonnenuntergang ein Volltreffer: Die Farben ueber Port d'Alcudia sind die perfekte Kulisse fuer Gruppenfotos.</p>

<h2>Gruppenessen im Hiru</h2>
<p>Einer der grossen Vorteile von <a href="/hiru">Hiru Food &amp; Drinks</a> fuer Feiern ist die Faehigkeit, grosse Tische zu bedienen, ohne bei der Qualitaet Kompromisse zu machen. Die <strong>Meeresfrueechte-Paella</strong> wird mit frischen Produkten vom lokalen Fischmarkt zubereitet und im Familienstil serviert. Dazu gibt es gereifte Grillstuecke und eine Auswahl an Vorspeisen.</p>

<h2>Praktische Tipps fuer euren Junggesellenabschied</h2>
<p><strong>Unterkunft:</strong> Port d'Alcudia bietet eine grosse Auswahl an Hotels und Apartments. Fuer Junggesellenabschiede sind Villa-Apartments mit Pool am beliebtesten. Die Gegend um Bellevue und Playa de Muro hat gute Optionen.</p>
<p><strong>Transport:</strong> Der grosse Vorteil ist, dass <a href="/hiru">Hiru</a>, <a href="/enjoy">Enjoy</a> und <a href="/outxide">Outxide</a> in derselben Strasse liegen. Keine Taxis noetig.</p>
<p><strong>Reservierungen:</strong> Reserviert Restauranttisch und Club-VIP-Bereich im Voraus. In der Hochsaison (Juni bis September) ist die Nachfrage sehr hoch.</p>
<p><strong>Wochentag:</strong> Freitage und Samstage bieten die groesste Atmosphaere im Outxide. Donnerstage sind etwas ruhiger, aber es gibt ebenfalls Sessions.</p>

<p>Fuer weitere Ideen schaut euch unseren <a href="/blog/guia-vida-nocturna-alcudia">Alcudia Nachtleben-Guide</a> und unseren Artikel ueber <a href="/blog/fiestas-eventos-verano-alcudia-2026">Sommer-Events und Partys 2026</a> an.</p>

<p><strong>Grupo Enjoy — Hiru, Enjoy Terrace &amp; Outxide Club. Alles in Av. Tucan / Ctra. d'Arta, Port d'Alcudia, Mallorca. <a href="/">Besucht unsere Website fuer weitere Informationen.</a></strong></p>`,

      fr: `<p>Vous organisez un enterrement de vie de jeune fille ou de garcon et cherchez une destination qui combine gastronomie, cocktails en terrasse et une nuit de fete memorable ? <strong>Alcudia et Port d'Alcudia</strong> dans le nord de Majorque offrent tout ce qu'il faut : des etablissements de qualite, une ambiance exceptionnelle et la commodite d'avoir tout a distance de marche.</p>

<p>Dans ce guide, nous vous montrons comment organiser l'enterrement de vie parfait a Alcudia, etape par etape, du diner au lever du soleil. Le meilleur : pas besoin de voiture, tout est dans la meme rue.</p>

<h2>Le plan parfait pour un enterrement de vie a Alcudia</h2>

<p>Les meilleurs plans de fete a Port d'Alcudia suivent une formule eprouvee : <strong>diner en groupe, cocktails et fete</strong>. Les trois etablissements de <a href="/">Grupo Enjoy</a> sont cote a cote, donc la logistique est simple.</p>

<h3>Etape 1 : Diner au Hiru Food &amp; Drinks</h3>
<p>Toute grande celebration commence par un excellent repas. <a href="/hiru">Hiru Food &amp; Drinks</a> est le restaurant ideal pour les grands groupes qui veulent bien manger dans une ambiance festive. La terrasse accueille de grandes tables et le personnel est habitue aux groupes de celebration.</p>
<p>Pour les fetes, la <strong>paella aux fruits de mer a partager</strong> est l'un des choix les plus populaires : un plat genereux servi au centre de la table. Vous pouvez aussi opter pour des viandes grillees a partager ou une selection de tapas variees. Hiru est ouvert tard, donc pas de pression.</p>
<p>Conseil : reservez votre table a l'avance et mentionnez que vous etes un groupe de celebration. Decouvrez le menu dans notre <a href="/blog/hiru-food-drinks-restaurante-alcudia">guide complet de Hiru</a>.</p>

<h3>Etape 2 : Cocktails a l'Enjoy Terrace</h3>
<p>Apres le diner, direction naturelle : la <a href="/enjoy">Enjoy Terrace</a>. Ce lounge cocktail en plein air est l'endroit parfait pour que le groupe se detende avec des cocktails signatures et du chicha premium pendant que la soiree monte en intensite.</p>
<p>L'Enjoy Terrace fonctionne particulierement bien pour les celebrations : l'ambiance est sophistiquee mais decontractee, les cocktails sont parmi les meilleurs de la zone, et la terrasse est ideale pour les photos de groupe.</p>
<p>Decouvrez la carte dans notre <a href="/blog/cocteles-shisha-terraza-alcudia">article sur l'Enjoy Terrace</a>.</p>

<h3>Etape 3 : La fete a l'Outxide Club</h3>
<p>Quand le groupe est pret a danser, l'<a href="/outxide">Outxide Club</a> est juste a cote. C'est la boite de nuit de reference du nord de Majorque, avec des sessions les jeudis, vendredis et samedis animes par des DJs nationaux et internationaux, un systeme son de premier ordre et un dancefloor plein d'energie.</p>
<p>Pour les enterrements de vie, reserver une <strong>table VIP</strong> est la meilleure decision. Votre propre espace avec service bouteilles garantit que le groupe reste ensemble et bien servi. Consultez les disponibilites sur le site d'<a href="/outxide">Outxide Club</a>.</p>
<p>En savoir plus dans notre <a href="/blog/outxide-club-discoteca-alcudia-mallorca">guide Outxide Club</a>.</p>

<h2>Tables VIP a l'Outxide pour les groupes</h2>
<p>S'il y a une chose qui eleve un enterrement de vie, c'est d'avoir un <strong>espace VIP reserve</strong>. A l'Outxide Club, les tables VIP sont positionnees avec vue directe sur le dancefloor et la scene. Service bouteilles premium avec attention dediee toute la nuit.</p>
<p>Reservez au moins une semaine a l'avance, surtout en juillet et aout. Contactez directement via le site d'<a href="/outxide">Outxide Club</a>.</p>

<h2>Cocktails de celebration a l'Enjoy Terrace</h2>
<p>L'<a href="/enjoy">Enjoy Terrace</a> est bien plus qu'un bar a cocktails. Pour les groupes, l'equipe peut preparer des tournees speciales, des shots de bienvenue et des creations personnalisees. La terrasse accueille confortablement des groupes de 10, 15 ou 20 personnes dans un cadre elegant.</p>
<p>Si votre fete est en ete, arrivez au coucher du soleil : les couleurs sur Port d'Alcudia sont le meilleur decor possible pour les photos de groupe.</p>

<h2>Diner de groupe au Hiru</h2>
<p>L'un des grands avantages de <a href="/hiru">Hiru Food &amp; Drinks</a> pour les celebrations est sa capacite a servir de grandes tables sans compromettre la qualite. La <strong>paella aux fruits de mer</strong> est preparee avec des produits frais du marche local et servie a partager. Il y a aussi des viandes grillees maturees et une selection d'entrees.</p>

<h2>Conseils pratiques</h2>
<p><strong>Hebergement :</strong> Port d'Alcudia offre un large choix d'hotels et d'appartements. Les villas avec piscine sont les plus populaires pour les groupes. La zone de Bellevue et Playa de Muro offrent de bonnes options.</p>
<p><strong>Transport :</strong> <a href="/hiru">Hiru</a>, <a href="/enjoy">Enjoy</a> et <a href="/outxide">Outxide</a> sont dans la meme rue, a quelques pas. Pas besoin de taxi.</p>
<p><strong>Reservations :</strong> Reservez table et espace VIP a l'avance. En haute saison (juin-septembre), la demande est tres elevee.</p>
<p><strong>Jour de la semaine :</strong> Les vendredis et samedis offrent la meilleure ambiance a l'Outxide. Les jeudis sont plus tranquilles mais il y a aussi des sessions.</p>

<p>Pour plus d'idees, consultez notre <a href="/blog/guia-vida-nocturna-alcudia">guide de la vie nocturne a Alcudia</a> et notre article sur les <a href="/blog/fiestas-eventos-verano-alcudia-2026">evenements et fetes de l'ete 2026</a>.</p>

<p><strong>Grupo Enjoy — Hiru, Enjoy Terrace &amp; Outxide Club. Le tout sur l'Av. Tucan / Ctra. d'Arta, Port d'Alcudia, Majorque. <a href="/">Visitez notre site pour plus d'informations.</a></strong></p>`,

      it: `<p>State organizzando un addio al nubilato o al celibato e cercate una destinazione che combini ottima gastronomia, cocktail in terrazza e una notte di festa memorabile? <strong>Alcudia e Port d'Alcudia</strong> nel nord di Maiorca offrono tutto il necessario: locali di qualita', atmosfera incredibile e la comodita' di avere tutto a pochi passi.</p>

<p>In questa guida vi mostriamo come organizzare l'addio al nubilato o celibato perfetto ad Alcudia passo dopo passo, dalla cena all'alba. Il meglio: non serve l'auto, tutto e' nella stessa via.</p>

<h2>Il piano perfetto per un addio al nubilato ad Alcudia</h2>

<p>I migliori piani di festa a Port d'Alcudia seguono una formula collaudata: <strong>cena di gruppo, cocktail e festa</strong>. I tre locali di <a href="/">Grupo Enjoy</a> sono uno accanto all'altro, quindi la logistica e' semplicissima.</p>

<h3>Passo 1: Cena al Hiru Food &amp; Drinks</h3>
<p>Ogni grande celebrazione inizia con un'ottima cena. <a href="/hiru">Hiru Food &amp; Drinks</a> e' il ristorante ideale per grandi gruppi che vogliono mangiare bene in un'atmosfera festiva. La terrazza ospita tavoli grandi e il personale e' esperto nella gestione di gruppi.</p>
<p>Per le feste, la <strong>paella ai frutti di mare da condividere</strong> e' una delle opzioni piu' popolari: un piatto generoso servito al centro del tavolo. Si possono anche scegliere carni alla griglia da condividere o una selezione di tapas varie. Hiru e' aperto fino a tardi, quindi nessuna fretta.</p>
<p>Consiglio: prenotate il tavolo in anticipo e indicate che siete un gruppo di festeggiamento. Scoprite di piu' sul menu nella nostra <a href="/blog/hiru-food-drinks-restaurante-alcudia">guida completa di Hiru</a>.</p>

<h3>Passo 2: Cocktail all'Enjoy Terrace</h3>
<p>Dopo cena, la tappa naturale successiva e' l'<a href="/enjoy">Enjoy Terrace</a>. Questo cocktail lounge all'aperto e' il posto perfetto per rilassarsi con cocktail d'autore e shisha premium mentre la serata cresce di intensita'.</p>
<p>L'Enjoy Terrace funziona particolarmente bene per le celebrazioni: l'atmosfera e' sofisticata ma rilassata, i cocktail sono tra i migliori della zona, e la terrazza e' ideale per le foto di gruppo.</p>
<p>Scoprite la carta nel nostro <a href="/blog/cocteles-shisha-terraza-alcudia">articolo sull'Enjoy Terrace</a>.</p>

<h3>Passo 3: La festa all'Outxide Club</h3>
<p>Quando il gruppo e' pronto per ballare, l'<a href="/outxide">Outxide Club</a> e' letteralmente accanto. E' la discoteca di riferimento del nord di Maiorca, con serate il giovedi', venerdi' e sabato con DJ nazionali e internazionali, un impianto audio di primo livello e una pista piena di energia.</p>
<p>Per gli addii al nubilato e celibato, prenotare un <strong>tavolo VIP</strong> e' la scelta migliore. Avere la propria zona con servizio bottiglie garantisce che il gruppo resti unito e ben servito. I tavoli VIP hanno vista diretta sulla pista e sulla consolle DJ. Verificate la disponibilita' sul sito di <a href="/outxide">Outxide Club</a>.</p>
<p>Scoprite di piu' nella nostra <a href="/blog/outxide-club-discoteca-alcudia-mallorca">guida Outxide Club</a>.</p>

<h2>Tavoli VIP all'Outxide per gruppi</h2>
<p>Se c'e' qualcosa che eleva un addio al nubilato o celibato, e' avere un'<strong>area VIP riservata</strong>. All'Outxide Club, i tavoli VIP sono posizionati in punti privilegiati con vista diretta sulla pista e sul palco. Servizio bottiglie premium con attenzione dedicata tutta la notte.</p>
<p>Per gruppi di festeggiamento, raccomandiamo di prenotare almeno una settimana prima, soprattutto a luglio e agosto. Contattate direttamente tramite il sito di <a href="/outxide">Outxide Club</a>.</p>

<h2>Cocktail di celebrazione all'Enjoy Terrace</h2>
<p>L'<a href="/enjoy">Enjoy Terrace</a> e' molto piu' di un cocktail bar. Per i gruppi, il team di Enjoy puo' preparare giri speciali di cocktail, shot di benvenuto e creazioni personalizzate. La terrazza ospita comodamente gruppi di 10, 15 o 20 persone in un ambiente elegante.</p>
<p>Se la festa e' in estate, arrivare al tramonto e' una mossa vincente: i colori su Port d'Alcudia sono lo sfondo perfetto per le foto di gruppo.</p>

<h2>Cena di gruppo al Hiru</h2>
<p>Uno dei grandi vantaggi di <a href="/hiru">Hiru Food &amp; Drinks</a> per le celebrazioni e' la capacita' di servire tavoli grandi senza compromettere la qualita'. La <strong>paella ai frutti di mare</strong> e' preparata con prodotti freschi del mercato locale e servita da condividere. Ci sono anche carni alla griglia stagionate e una selezione di antipasti.</p>

<h2>Consigli pratici</h2>
<p><strong>Alloggio:</strong> Port d'Alcudia offre un'ampia scelta di hotel e appartamenti. Per addii al nubilato, gli appartamenti tipo villa con piscina sono i piu' popolari. La zona di Bellevue e Playa de Muro hanno buone opzioni.</p>
<p><strong>Trasporto:</strong> <a href="/hiru">Hiru</a>, <a href="/enjoy">Enjoy</a> e <a href="/outxide">Outxide</a> sono nella stessa via, a pochi passi. Niente taxi necessari.</p>
<p><strong>Prenotazioni:</strong> Prenotate tavolo ristorante e area VIP in anticipo. In alta stagione (giugno-settembre), la domanda e' molto alta.</p>
<p><strong>Giorno della settimana:</strong> Venerdi' e sabato offrono la migliore atmosfera all'Outxide. Il giovedi' e' piu' tranquillo ma ci sono comunque serate.</p>

<p>Per altre idee, consultate la nostra <a href="/blog/guia-vida-nocturna-alcudia">guida alla vita notturna di Alcudia</a> e il nostro articolo su <a href="/blog/fiestas-eventos-verano-alcudia-2026">eventi e feste dell'estate 2026</a>.</p>

<p><strong>Grupo Enjoy — Hiru, Enjoy Terrace &amp; Outxide Club. Tutto in Av. Tucan / Ctra. d'Arta, Port d'Alcudia, Maiorca. <a href="/">Visitate il nostro sito per maggiori informazioni.</a></strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    image: "/images/outxide/DSCF8103-9.jpg",
    tags: ["events", "nightlife", "alcudia", "mallorca", "enjoy", "outxide"],
    venue: "general",
    readingTime: 7,
  },
  {
    slug: "cena-romantica-alcudia-mallorca",
    title: {
      es: "Cena Romantica en Alcudia: Los Mejores Restaurantes para una Noche Especial",
      en: "Romantic Dinner in Alcudia: The Best Restaurants for a Special Night in Mallorca",
      de: "Romantisches Abendessen in Alcudia: Die besten Restaurants fuer einen besonderen Abend auf Mallorca",
      fr: "Diner Romantique a Alcudia : Les Meilleurs Restaurants pour une Soiree Speciale a Majorque",
      it: "Cena Romantica ad Alcudia: I Migliori Ristoranti per una Serata Speciale a Maiorca",
    },
    excerpt: {
      es: "Descubre donde disfrutar de la mejor cena romantica en Alcudia y Port d'Alcudia. Restaurantes con terraza, ambiente intimo y cocina de calidad para una velada inolvidable en Mallorca.",
      en: "Discover where to enjoy the best romantic dinner in Alcudia and Port d'Alcudia. Terrace restaurants, intimate atmosphere and quality cuisine for an unforgettable evening in Mallorca.",
      de: "Entdecken Sie die besten romantischen Abendessen in Alcudia und Port d'Alcudia. Terrassenrestaurants, intime Atmosphaere und hochwertige Kueche fuer einen unvergesslichen Abend auf Mallorca.",
      fr: "Decouvrez ou profiter du meilleur diner romantique a Alcudia et Port d'Alcudia. Restaurants en terrasse, ambiance intime et cuisine de qualite pour une soiree inoubliable a Majorque.",
      it: "Scoprite dove godervi la migliore cena romantica ad Alcudia e Port d'Alcudia. Ristoranti con terrazza, atmosfera intima e cucina di qualita' per una serata indimenticabile a Maiorca.",
    },
    content: {
      es: `<p>Si estas buscando un restaurante romantico en Alcudia para sorprender a tu pareja, el norte de Mallorca tiene opciones que van mucho mas alla del tipico restaurante turistico. Una cena romantica en Alcudia puede ser una experiencia memorable si eliges bien el sitio, el momento y el plan. En esta guia te contamos donde cenar en pareja en Alcudia y como completar la velada perfecta.</p>

<h2>Por que Hiru es perfecto para una cena romantica</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> se ha convertido en una de las mejores opciones para cenas romanticas en Port d'Alcudia, y no es casualidad. El restaurante combina tres elementos que hacen que una velada sea especial: <strong>cocina de alto nivel, ambiente cuidado y servicio atento sin ser invasivo</strong>.</p>
<p>La terraza de Hiru es el escenario ideal para una cena romantica de verano. Mesas bien espaciadas que ofrecen intimidad, iluminacion calida que crea atmosfera, y una brisa suave del Mediterraneo como banda sonora. El interior tambien funciona para veladas mas intimas, con una estetica contemporanea y acogedora que invita a quedarse.</p>
<p>Pero lo que realmente hace de Hiru un sitio especial para parejas es la calidad de su cocina. No es un restaurante donde simplemente comes bien: es un lugar donde cada plato esta pensado para disfrutarse, donde los sabores sorprenden y donde la experiencia gastronomica eleva toda la velada.</p>
<p>Descubre toda la propuesta en nuestra <a href="/blog/hiru-food-drinks-restaurante-alcudia">guia completa de Hiru Food &amp; Drinks</a>.</p>

<h2>Que pedir en una cena romantica en Hiru</h2>
<p>La carta de <a href="/hiru">Hiru</a> esta disenada para compartir, lo que la hace perfecta para una cena en pareja donde ambos podeis probar de todo.</p>
<h3>Para empezar</h3>
<p>Comenzad con una seleccion de entrantes para compartir. Los carpaccios, las croquetas caseras y los platos de temporada son un buen punto de partida. Acompanad con una copa de vino de la carta, que incluye referencias locales e internacionales bien seleccionadas.</p>
<h3>Platos principales</h3>
<p>Las <strong>carnes maduradas dry-aged</strong> son una de las grandes especialidades de Hiru. Piezas seleccionadas que se maduran durante semanas para alcanzar un sabor y una textura excepcionales, cocinadas a la brasa con la precision que solo el fuego directo permite. Para quien prefiera mar a montana, el <strong>pescado fresco del Mediterraneo a la brasa</strong> es otra opcion sobresaliente. Y si quereis algo para compartir con un toque especial, la <strong>paella para dos</strong> es una experiencia en si misma: arroz con marisco fresco, caldo casero y el punto perfecto de socarrat.</p>
<h3>Para terminar</h3>
<p>Los postres de Hiru cambian segun temporada, pero siempre hay opciones para cerrar la cena con un buen sabor de boca. Y si preferis alargar la sobremesa, el cocktail bar del propio restaurante ofrece combinados de autor sin necesidad de moveros.</p>

<h2>Continua la noche: cocteles en Enjoy Terrace</h2>
<p>Una cena romantica no tiene por que terminar con el postre. Si quereis alargar la velada, <a href="/enjoy">Enjoy Terrace</a> esta a pocos pasos de Hiru y ofrece el complemento perfecto: una terraza al aire libre con iluminacion ambiental, musica suave y una carta de cocteles de autor que incluye clasicos reinventados y creaciones exclusivas.</p>
<p>Sentaros en la terraza de Enjoy con un cocktail mientras la noche de Alcudia se despliega a vuestro alrededor es una de esas experiencias que convierten una buena cena en una velada inolvidable. La shisha premium tambien es una opcion para quienes quieran probar algo diferente en pareja.</p>
<p>Mas detalles en nuestro <a href="/blog/cocteles-shisha-terraza-alcudia">articulo sobre cocteles y shisha en Enjoy Terrace</a>.</p>

<h2>Otros restaurantes romanticos en Alcudia</h2>
<p>Aunque <a href="/hiru">Hiru Food &amp; Drinks</a> es nuestra recomendacion principal, Alcudia tiene otras opciones para cenas romanticas:</p>
<h3>El Patio de Alcudia</h3>
<p>Restaurante con un precioso patio interior ajardinado en el casco historico. Cocina fusion con base mediterranea en un ambiente intimo y cuidado. Ideal si buscais algo dentro de la muralla medieval.</p>
<h3>Sa Placa</h3>
<p>En la plaza principal del casco antiguo, con terraza con vistas a la muralla. Cocina mediterranea con toques mallorquines. El atardecer desde aqui es especialmente bonito.</p>
<h3>Can Simó</h3>
<p>Casa senorial del siglo XVII convertida en restaurante. Cocina de autor con producto local en un edificio historico lleno de encanto. Para una ocasion realmente especial.</p>

<h2>Consejos para tu cena romantica en Alcudia</h2>
<p><strong>Reserva con antelacion:</strong> Especialmente en temporada alta (junio-septiembre), los mejores restaurantes se llenan rapido. Reserva al menos con dos o tres dias de antelacion para asegurar una buena mesa. En Hiru puedes reservar a traves de su web o por telefono.</p>
<p><strong>El mejor momento:</strong> Para una cena romantica perfecta, llega entre las 20:00 y las 20:30. Asi podreis disfrutar de las ultimas luces del atardecer durante los entrantes y ver como la noche se va instalando mientras cenais. La terraza de Hiru es especialmente bonita en ese momento.</p>
<p><strong>Dress code:</strong> El ambiente en los restaurantes de Alcudia es smart-casual. No hace falta ir de etiqueta, pero una camisa o un vestido de verano elegante siempre suman puntos para la ocasion.</p>
<p><strong>Despues de cenar:</strong> Si quereis seguir la noche, <a href="/enjoy">Enjoy Terrace</a> os espera con cocteles y musica. Y si os apetece una noche mas larga, <a href="/outxide">Outxide Club</a> esta justo al lado. Consultad nuestra <a href="/blog/guia-vida-nocturna-alcudia">guia de vida nocturna en Alcudia</a> para planificar.</p>
<p><strong>Ocasiones especiales:</strong> Si celebrais un aniversario, cumpleanos o pedida de mano, el equipo de Hiru puede ayudar a preparar detalles especiales si avisais con antelacion.</p>

<p>Para mas ideas gastronomicas, no os perdais nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guia de los mejores restaurantes de Alcudia</a> y nuestro articulo sobre <a href="/blog/restaurante-brasa-parrilla-mallorca">restaurantes a la brasa en Mallorca</a>.</p>

<p><strong>Hiru Food &amp; Drinks — Ctra. d'Arta 40, Port d'Alcudia, Mallorca. Abierto de 12:00 a 23:30 (viernes y sabado hasta la 1:00). Cierra los martes. <a href="/hiru">Reserva tu mesa aqui.</a></strong></p>`,

      en: `<p>If you're looking for a romantic restaurant in Alcudia to surprise your partner, northern Mallorca has options that go well beyond the typical tourist restaurant. A romantic dinner in Alcudia can be a truly memorable experience if you choose the right place, the right moment and the right plan. In this guide we share where to dine as a couple in Alcudia and how to complete the perfect evening.</p>

<h2>Why Hiru is perfect for a romantic dinner</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> has become one of the best options for romantic dinners in Port d'Alcudia, and it's no coincidence. The restaurant combines three elements that make an evening special: <strong>high-quality cuisine, carefully crafted atmosphere and attentive service without being intrusive</strong>.</p>
<p>The Hiru terrace is the ideal setting for a summer romantic dinner. Well-spaced tables offering privacy, warm lighting that creates atmosphere, and a gentle Mediterranean breeze as background. The interior also works for more intimate evenings, with a contemporary and welcoming aesthetic that invites you to linger.</p>
<p>But what truly makes Hiru special for couples is the quality of its cooking. This isn't a restaurant where you simply eat well: it's a place where every dish is designed to be savoured, where flavours surprise and where the gastronomic experience elevates the entire evening.</p>
<p>Discover the full experience in our <a href="/blog/hiru-food-drinks-restaurante-alcudia">complete Hiru Food &amp; Drinks guide</a>.</p>

<h2>What to order at a romantic dinner at Hiru</h2>
<p>The <a href="/hiru">Hiru</a> menu is designed for sharing, making it perfect for a couple's dinner where you can both try everything.</p>
<h3>To start</h3>
<p>Begin with a selection of shared starters. Carpaccios, homemade croquettes and seasonal dishes are a great starting point. Pair them with a glass of wine from the carefully curated list, which includes both local and international references.</p>
<h3>Main courses</h3>
<p>The <strong>dry-aged meats</strong> are one of Hiru's signature specialities. Selected cuts aged for weeks to achieve exceptional flavour and texture, cooked over open flame with the precision that only direct fire allows. For those who prefer sea to land, the <strong>fresh Mediterranean fish cooked on the grill</strong> is another outstanding option. And if you want something to share with a special touch, the <strong>paella for two</strong> is an experience in itself: rice with fresh seafood, homemade stock and the perfect socarrat crust.</p>
<h3>To finish</h3>
<p>Hiru's desserts change with the seasons, but there are always options to end the dinner on a sweet note. And if you'd rather extend the after-dinner conversation, the restaurant's own cocktail bar offers signature mixed drinks without needing to move.</p>

<h2>Continue the night: cocktails at Enjoy Terrace</h2>
<p>A romantic dinner doesn't have to end with dessert. If you want to extend the evening, <a href="/enjoy">Enjoy Terrace</a> is just a few steps from Hiru and offers the perfect complement: an open-air terrace with ambient lighting, soft music and a signature cocktail menu featuring reinvented classics and exclusive creations.</p>
<p>Sitting on the Enjoy terrace with a cocktail while the Alcudia night unfolds around you is one of those experiences that turns a good dinner into an unforgettable evening. Premium shisha is also an option for couples who want to try something different.</p>
<p>More details in our <a href="/blog/cocteles-shisha-terraza-alcudia">article on cocktails and shisha at Enjoy Terrace</a>.</p>

<h2>Other romantic restaurants in Alcudia</h2>
<p>Although <a href="/hiru">Hiru Food &amp; Drinks</a> is our top recommendation, Alcudia has other options for romantic dinners:</p>
<h3>El Patio de Alcudia</h3>
<p>A restaurant with a beautiful garden courtyard in the historic centre. Fusion cuisine with a Mediterranean base in an intimate and refined setting. Ideal if you're looking for something within the medieval walls.</p>
<h3>Sa Placa</h3>
<p>On the main square of the old town, with a terrace overlooking the walls. Mediterranean cuisine with Mallorcan touches. The sunset from here is particularly beautiful.</p>
<h3>Can Simo</h3>
<p>A 17th-century manor house converted into a restaurant. Creative cuisine with local produce in a historic building full of charm. For a truly special occasion.</p>

<h2>Tips for your romantic dinner in Alcudia</h2>
<p><strong>Book in advance:</strong> Especially during high season (June to September), the best restaurants fill up quickly. Book at least two or three days ahead to secure a good table. You can reserve at Hiru through their website or by phone.</p>
<p><strong>Best time:</strong> For a perfect romantic dinner, arrive between 20:00 and 20:30. This way you'll enjoy the last sunset light during starters and watch the night settle in as you dine. The Hiru terrace is particularly lovely at this time.</p>
<p><strong>Dress code:</strong> The atmosphere in Alcudia's restaurants is smart-casual. No need for formal attire, but a nice shirt or an elegant summer dress always adds to the occasion.</p>
<p><strong>After dinner:</strong> If you want to continue the evening, <a href="/enjoy">Enjoy Terrace</a> awaits with cocktails and music. And if you fancy a longer night, <a href="/outxide">Outxide Club</a> is right next door. Check our <a href="/blog/guia-vida-nocturna-alcudia">Alcudia nightlife guide</a> for planning.</p>
<p><strong>Special occasions:</strong> If you're celebrating an anniversary, birthday or proposal, the Hiru team can help prepare special details if you let them know in advance.</p>

<p>For more dining ideas, don't miss our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to the best restaurants in Alcudia</a> and our article on <a href="/blog/restaurante-brasa-parrilla-mallorca">grill restaurants in Mallorca</a>.</p>

<p><strong>Hiru Food &amp; Drinks — Ctra. d'Arta 40, Port d'Alcudia, Mallorca. Open from 12:00 to 23:30 (Friday and Saturday until 1:00). Closed Tuesdays. <a href="/hiru">Reserve your table here.</a></strong></p>`,

      de: `<p>Wenn Sie ein romantisches Restaurant in Alcudia suchen, um Ihren Partner zu ueberraschen, bietet der Norden Mallorcas Optionen, die weit ueber das typische Touristenrestaurant hinausgehen. Ein romantisches Abendessen in Alcudia kann ein unvergessliches Erlebnis sein, wenn Sie den richtigen Ort, den richtigen Moment und den richtigen Plan waehlen. In diesem Guide verraten wir, wo Sie zu zweit in Alcudia essen koennen und wie Sie den perfekten Abend gestalten.</p>

<h2>Warum Hiru perfekt fuer ein romantisches Abendessen ist</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> hat sich zu einer der besten Optionen fuer romantische Abendessen in Port d'Alcudia entwickelt, und das kommt nicht von ungefaehr. Das Restaurant vereint drei Elemente, die einen Abend besonders machen: <strong>hochwertige Kueche, sorgfaeltig gestaltete Atmosphaere und aufmerksamer Service ohne aufdringlich zu sein</strong>.</p>
<p>Die Terrasse von Hiru ist die ideale Kulisse fuer ein romantisches Sommerabendessen. Gut platzierte Tische bieten Privatsphaere, warmes Licht schafft Atmosphaere, und eine sanfte Meeresbrise sorgt fuer die Hintergrundmelodie. Das Interieur funktioniert ebenfalls fuer intimere Abende, mit einer zeitgenoessischen und einladenden Aesthetik.</p>
<p>Aber was Hiru wirklich besonders fuer Paare macht, ist die Qualitaet der Kueche. Dies ist kein Restaurant, in dem man einfach gut isst: Es ist ein Ort, an dem jedes Gericht dazu einlaedt, genossen zu werden, wo Aromen ueberraschen und wo das gastronomische Erlebnis den gesamten Abend bereichert.</p>
<p>Entdecken Sie das volle Erlebnis in unserem <a href="/blog/hiru-food-drinks-restaurante-alcudia">kompletten Hiru Food &amp; Drinks Guide</a>.</p>

<h2>Was bei einem romantischen Abendessen im Hiru bestellen</h2>
<p>Die Speisekarte von <a href="/hiru">Hiru</a> ist zum Teilen konzipiert, perfekt fuer ein Dinner zu zweit.</p>
<h3>Zum Einstieg</h3>
<p>Beginnen Sie mit einer Auswahl an Vorspeisen zum Teilen. Carpaccios, hausgemachte Kroketten und saisonale Gerichte sind ein guter Ausgangspunkt. Begleitet von einem Glas Wein aus der sorgfaeltig kuratierten Weinkarte.</p>
<h3>Hauptgerichte</h3>
<p>Die <strong>dry-aged Fleischstuecke</strong> sind eine der grossen Spezialitaeten von Hiru. Ausgewaehlte Stuecke, die wochenlang gereift werden, um aussergewoehnlichen Geschmack und Textur zu erreichen, ueber offenem Feuer gegrillt. Fuer Fischliebhaber ist der <strong>frische Mittelmeerfisch vom Grill</strong> eine hervorragende Alternative. Und wenn Sie etwas Besonderes zum Teilen moechten, ist die <strong>Paella fuer zwei</strong> ein Erlebnis: Reis mit frischen Meeresfrueechten, hausgemachter Bruehe und perfektem Socarrat.</p>
<h3>Zum Abschluss</h3>
<p>Die Desserts wechseln saisonal, aber es gibt immer Optionen fuer einen suessen Abschluss. Und wenn Sie lieber das Gespraech verlaengern moechten, bietet die hauseigene Cocktailbar Signatur-Drinks ohne dass Sie sich bewegen muessen.</p>

<h2>Die Nacht fortsetzen: Cocktails auf der Enjoy Terrace</h2>
<p>Ein romantisches Abendessen muss nicht mit dem Dessert enden. Die <a href="/enjoy">Enjoy Terrace</a> ist nur wenige Schritte von Hiru entfernt und bietet die perfekte Ergaenzung: eine Open-Air-Terrasse mit stimmungsvoller Beleuchtung, sanfter Musik und einer Signatur-Cocktailkarte.</p>
<p>Auf der Enjoy-Terrasse mit einem Cocktail zu sitzen, waehrend die Nacht in Alcudia sich entfaltet, ist eines dieser Erlebnisse, die ein gutes Abendessen in einen unvergesslichen Abend verwandeln. Premium-Shisha ist ebenfalls eine Option fuer Paare.</p>
<p>Mehr Details in unserem <a href="/blog/cocteles-shisha-terraza-alcudia">Artikel ueber Cocktails und Shisha auf der Enjoy Terrace</a>.</p>

<h2>Weitere romantische Restaurants in Alcudia</h2>
<p>Obwohl <a href="/hiru">Hiru Food &amp; Drinks</a> unsere Top-Empfehlung ist, hat Alcudia weitere Optionen:</p>
<h3>El Patio de Alcudia</h3>
<p>Restaurant mit einem wunderschoenen Garteninnenhof im historischen Zentrum. Fusionskueche auf mediterraner Basis in einem intimen Ambiente. Ideal innerhalb der mittelalterlichen Mauern.</p>
<h3>Sa Placa</h3>
<p>Am Hauptplatz der Altstadt, mit Terrasse und Blick auf die Stadtmauer. Mediterrane Kueche mit mallorquinischen Akzenten. Der Sonnenuntergang hier ist besonders schoen.</p>
<h3>Can Simo</h3>
<p>Ein Herrenhaus aus dem 17. Jahrhundert, umgebaut zum Restaurant. Kreative Kueche mit lokalen Produkten in einem historischen Gebaeude voller Charme.</p>

<h2>Tipps fuer Ihr romantisches Abendessen</h2>
<p><strong>Im Voraus reservieren:</strong> Besonders in der Hochsaison (Juni-September) sind die besten Restaurants schnell voll. Reservieren Sie mindestens zwei bis drei Tage vorher.</p>
<p><strong>Beste Zeit:</strong> Kommen Sie zwischen 20:00 und 20:30 Uhr, um das letzte Sonnenlicht bei den Vorspeisen zu geniessen. Die Hiru-Terrasse ist zu dieser Zeit besonders schoen.</p>
<p><strong>Dresscode:</strong> Smart-Casual. Keine formelle Kleidung noetig, aber ein huebsches Hemd oder ein elegantes Sommerkleid runden den Anlass ab.</p>
<p><strong>Nach dem Essen:</strong> <a href="/enjoy">Enjoy Terrace</a> erwartet Sie mit Cocktails und Musik. Und wenn Sie eine laengere Nacht moechten, ist der <a href="/outxide">Outxide Club</a> gleich nebenan. Schauen Sie in unseren <a href="/blog/guia-vida-nocturna-alcudia">Alcudia Nachtleben-Guide</a>.</p>
<p><strong>Besondere Anlaesse:</strong> Bei Jahrestag, Geburtstag oder Heiratsantrag kann das Hiru-Team besondere Details vorbereiten, wenn Sie vorher Bescheid geben.</p>

<p>Fuer weitere Ideen lesen Sie unseren <a href="/blog/mejores-restaurantes-alcudia-mallorca">Guide der besten Restaurants in Alcudia</a> und unseren Artikel ueber <a href="/blog/restaurante-brasa-parrilla-mallorca">Grill-Restaurants auf Mallorca</a>.</p>

<p><strong>Hiru Food &amp; Drinks — Ctra. d'Arta 40, Port d'Alcudia, Mallorca. Geoeffnet von 12:00 bis 23:30 (Freitag und Samstag bis 1:00). Dienstags geschlossen. <a href="/hiru">Reservieren Sie Ihren Tisch hier.</a></strong></p>`,

      fr: `<p>Si vous cherchez un restaurant romantique a Alcudia pour surprendre votre partenaire, le nord de Majorque offre des options bien au-dela du restaurant touristique classique. Un diner romantique a Alcudia peut etre une experience vraiment memorable si vous choisissez le bon endroit, le bon moment et le bon plan. Dans ce guide, nous partageons ou diner en couple a Alcudia et comment completer la soiree parfaite.</p>

<h2>Pourquoi Hiru est parfait pour un diner romantique</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> est devenu l'une des meilleures options pour les diners romantiques a Port d'Alcudia, et ce n'est pas un hasard. Le restaurant combine trois elements qui rendent une soiree speciale : <strong>une cuisine de haut niveau, une atmosphere soignee et un service attentif sans etre intrusif</strong>.</p>
<p>La terrasse de Hiru est le cadre ideal pour un diner romantique d'ete. Des tables bien espacees offrant de l'intimite, un eclairage chaleureux qui cree l'ambiance, et une douce brise mediterraneenne en fond sonore. L'interieur fonctionne aussi pour des soirees plus intimes, avec une esthetique contemporaine et accueillante.</p>
<p>Mais ce qui rend vraiment Hiru special pour les couples, c'est la qualite de sa cuisine. Ce n'est pas un restaurant ou l'on mange simplement bien : c'est un lieu ou chaque plat est concu pour etre savoure, ou les saveurs surprennent et ou l'experience gastronomique eleve toute la soiree.</p>
<p>Decouvrez l'experience complete dans notre <a href="/blog/hiru-food-drinks-restaurante-alcudia">guide complet Hiru Food &amp; Drinks</a>.</p>

<h2>Que commander lors d'un diner romantique au Hiru</h2>
<p>La carte de <a href="/hiru">Hiru</a> est concue pour le partage, parfaite pour un diner en couple.</p>
<h3>Pour commencer</h3>
<p>Debutez avec une selection d'entrees a partager. Carpaccios, croquettes maison et plats de saison sont un excellent point de depart. Accompagnez d'un verre de vin de la carte soigneusement selectionnee.</p>
<h3>Plats principaux</h3>
<p>Les <strong>viandes maturees dry-aged</strong> sont l'une des grandes specialites de Hiru. Des pieces selectionnees, maturees pendant des semaines pour atteindre une saveur et une texture exceptionnelles, cuites au feu de braise. Pour ceux qui preferent la mer, le <strong>poisson frais de Mediterranee grille</strong> est une autre option remarquable. Et si vous voulez partager, la <strong>paella pour deux</strong> est une experience en soi : riz aux fruits de mer frais, bouillon maison et socarrat parfait.</p>
<h3>Pour finir</h3>
<p>Les desserts changent selon la saison, mais il y a toujours des options pour terminer sur une note sucree. Et si vous preferez prolonger l'apres-diner, le bar a cocktails du restaurant propose des creations signatures.</p>

<h2>Prolonger la soiree : cocktails a l'Enjoy Terrace</h2>
<p>Un diner romantique ne doit pas se terminer au dessert. L'<a href="/enjoy">Enjoy Terrace</a> est a quelques pas de Hiru et offre le complement parfait : une terrasse en plein air avec eclairage d'ambiance, musique douce et une carte de cocktails signatures.</p>
<p>S'asseoir sur la terrasse d'Enjoy avec un cocktail pendant que la nuit d'Alcudia se deploie autour de vous est une de ces experiences qui transforment un bon diner en soiree inoubliable. Le chicha premium est aussi une option pour les couples.</p>
<p>Plus de details dans notre <a href="/blog/cocteles-shisha-terraza-alcudia">article sur les cocktails et chicha a l'Enjoy Terrace</a>.</p>

<h2>Autres restaurants romantiques a Alcudia</h2>
<p>Bien que <a href="/hiru">Hiru Food &amp; Drinks</a> soit notre recommandation principale, Alcudia a d'autres options :</p>
<h3>El Patio de Alcudia</h3>
<p>Restaurant avec un beau patio jardine dans le centre historique. Cuisine fusion a base mediterraneenne dans un cadre intime et soigne. Ideal a l'interieur des remparts medievaux.</p>
<h3>Sa Placa</h3>
<p>Sur la place principale de la vieille ville, avec terrasse vue sur les remparts. Cuisine mediterraneenne aux touches majorquines. Le coucher de soleil d'ici est particulierement beau.</p>
<h3>Can Simo</h3>
<p>Maison seigneuriale du XVIIe siecle transformee en restaurant. Cuisine creative avec des produits locaux dans un batiment historique plein de charme.</p>

<h2>Conseils pour votre diner romantique</h2>
<p><strong>Reservez a l'avance :</strong> Surtout en haute saison (juin-septembre), les meilleurs restaurants se remplissent vite. Reservez au moins deux ou trois jours avant.</p>
<p><strong>Meilleur moment :</strong> Arrivez entre 20h00 et 20h30 pour profiter des dernieres lueurs du coucher de soleil. La terrasse de Hiru est particulierement belle a ce moment.</p>
<p><strong>Dress code :</strong> Smart-casual. Pas besoin de tenue formelle, mais une belle chemise ou une robe d'ete elegante completent l'occasion.</p>
<p><strong>Apres le diner :</strong> L'<a href="/enjoy">Enjoy Terrace</a> vous attend avec cocktails et musique. Et si vous voulez prolonger, l'<a href="/outxide">Outxide Club</a> est juste a cote. Consultez notre <a href="/blog/guia-vida-nocturna-alcudia">guide de la vie nocturne a Alcudia</a>.</p>
<p><strong>Occasions speciales :</strong> Pour un anniversaire, un anniversaire de mariage ou une demande en mariage, l'equipe Hiru peut preparer des details speciaux si vous prevenez a l'avance.</p>

<p>Pour plus d'idees, consultez notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des meilleurs restaurants d'Alcudia</a> et notre article sur les <a href="/blog/restaurante-brasa-parrilla-mallorca">restaurants grill a Majorque</a>.</p>

<p><strong>Hiru Food &amp; Drinks — Ctra. d'Arta 40, Port d'Alcudia, Majorque. Ouvert de 12h00 a 23h30 (vendredi et samedi jusqu'a 1h00). Ferme le mardi. <a href="/hiru">Reservez votre table ici.</a></strong></p>`,

      it: `<p>Se cercate un ristorante romantico ad Alcudia per sorprendere il vostro partner, il nord di Maiorca offre opzioni che vanno ben oltre il tipico ristorante turistico. Una cena romantica ad Alcudia puo' essere un'esperienza davvero memorabile se scegliete il posto giusto, il momento giusto e il piano giusto. In questa guida vi raccontiamo dove cenare in coppia ad Alcudia e come completare la serata perfetta.</p>

<h2>Perche' Hiru e' perfetto per una cena romantica</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> e' diventato una delle migliori opzioni per cene romantiche a Port d'Alcudia, e non e' un caso. Il ristorante unisce tre elementi che rendono una serata speciale: <strong>cucina di alto livello, atmosfera curata e servizio attento senza essere invadente</strong>.</p>
<p>La terrazza di Hiru e' lo scenario ideale per una cena romantica estiva. Tavoli ben distanziati che offrono privacy, illuminazione calda che crea atmosfera, e una leggera brezza mediterranea come colonna sonora. L'interno funziona anche per serate piu' intime, con un'estetica contemporanea e accogliente.</p>
<p>Ma cio' che rende davvero Hiru speciale per le coppie e' la qualita' della cucina. Non e' un ristorante dove si mangia semplicemente bene: e' un luogo dove ogni piatto e' pensato per essere gustato, dove i sapori sorprendono e dove l'esperienza gastronomica eleva l'intera serata.</p>
<p>Scoprite l'esperienza completa nella nostra <a href="/blog/hiru-food-drinks-restaurante-alcudia">guida completa di Hiru Food &amp; Drinks</a>.</p>

<h2>Cosa ordinare per una cena romantica al Hiru</h2>
<p>Il menu di <a href="/hiru">Hiru</a> e' pensato per la condivisione, perfetto per una cena di coppia.</p>
<h3>Per iniziare</h3>
<p>Cominciate con una selezione di antipasti da condividere. Carpacci, crocchette fatte in casa e piatti stagionali sono un ottimo inizio. Accompagnate con un calice di vino dalla carta accuratamente selezionata.</p>
<h3>Piatti principali</h3>
<p>Le <strong>carni stagionate dry-aged</strong> sono una delle grandi specialita' di Hiru. Tagli selezionati, stagionati per settimane per raggiungere un sapore e una consistenza eccezionali, cotti alla brace con la precisione che solo il fuoco diretto permette. Per chi preferisce il mare, il <strong>pesce fresco del Mediterraneo alla griglia</strong> e' un'altra opzione eccellente. E se volete qualcosa di speciale da condividere, la <strong>paella per due</strong> e' un'esperienza in se': riso con frutti di mare freschi, brodo fatto in casa e socarrat perfetto.</p>
<h3>Per finire</h3>
<p>I dessert cambiano stagionalmente, ma ci sono sempre opzioni per chiudere con dolcezza. E se preferite prolungare il dopocena, il cocktail bar del ristorante offre drink d'autore senza dovervi spostare.</p>

<h2>Continuare la serata: cocktail all'Enjoy Terrace</h2>
<p>Una cena romantica non deve finire con il dessert. L'<a href="/enjoy">Enjoy Terrace</a> e' a pochi passi da Hiru e offre il complemento perfetto: una terrazza all'aperto con illuminazione d'atmosfera, musica soft e una carta di cocktail d'autore.</p>
<p>Sedersi sulla terrazza di Enjoy con un cocktail mentre la notte di Alcudia si dispiega intorno a voi e' una di quelle esperienze che trasformano una buona cena in una serata indimenticabile. Lo shisha premium e' anche un'opzione per le coppie.</p>
<p>Piu' dettagli nel nostro <a href="/blog/cocteles-shisha-terraza-alcudia">articolo sui cocktail e shisha all'Enjoy Terrace</a>.</p>

<h2>Altri ristoranti romantici ad Alcudia</h2>
<p>Anche se <a href="/hiru">Hiru Food &amp; Drinks</a> e' la nostra raccomandazione principale, Alcudia ha altre opzioni:</p>
<h3>El Patio de Alcudia</h3>
<p>Ristorante con un bel cortile giardino nel centro storico. Cucina fusion su base mediterranea in un ambiente intimo e curato. Ideale all'interno delle mura medievali.</p>
<h3>Sa Placa</h3>
<p>Nella piazza principale del centro storico, con terrazza vista sulle mura. Cucina mediterranea con tocchi maiorchini. Il tramonto da qui e' particolarmente bello.</p>
<h3>Can Simo</h3>
<p>Casa signorile del XVII secolo trasformata in ristorante. Cucina creativa con prodotti locali in un edificio storico pieno di fascino.</p>

<h2>Consigli per la vostra cena romantica</h2>
<p><strong>Prenotate in anticipo:</strong> Soprattutto in alta stagione (giugno-settembre), i migliori ristoranti si riempiono velocemente. Prenotate almeno due o tre giorni prima.</p>
<p><strong>Momento migliore:</strong> Arrivate tra le 20:00 e le 20:30 per godervi le ultime luci del tramonto. La terrazza di Hiru e' particolarmente bella in quel momento.</p>
<p><strong>Dress code:</strong> Smart-casual. Non serve abbigliamento formale, ma una bella camicia o un vestito estivo elegante completano l'occasione.</p>
<p><strong>Dopo cena:</strong> L'<a href="/enjoy">Enjoy Terrace</a> vi aspetta con cocktail e musica. E se volete una notte piu' lunga, l'<a href="/outxide">Outxide Club</a> e' proprio accanto. Consultate la nostra <a href="/blog/guia-vida-nocturna-alcudia">guida alla vita notturna di Alcudia</a>.</p>
<p><strong>Occasioni speciali:</strong> Se festeggiate un anniversario, compleanno o proposta di matrimonio, il team di Hiru puo' preparare dettagli speciali se avvisate in anticipo.</p>

<p>Per altre idee gastronomiche, consultate la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai migliori ristoranti di Alcudia</a> e il nostro articolo sui <a href="/blog/restaurante-brasa-parrilla-mallorca">ristoranti alla griglia a Maiorca</a>.</p>

<p><strong>Hiru Food &amp; Drinks — Ctra. d'Arta 40, Port d'Alcudia, Maiorca. Aperto dalle 12:00 alle 23:30 (venerdi' e sabato fino all'1:00). Chiuso il martedi'. <a href="/hiru">Prenotate il vostro tavolo qui.</a></strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    image: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
    tags: ["food", "restaurants", "hiru", "alcudia", "mallorca"],
    venue: "hiru",
    readingTime: 6,
  },
  {
    slug: "plan-nocturno-port-alcudia-mallorca",
    title: {
      es: "Mejor Plan Nocturno en Port d'Alcudia: Guia Paso a Paso para la Noche Perfecta",
      en: "Best Night Out in Port d'Alcudia: Step-by-Step Guide to the Perfect Evening in Mallorca",
      de: "Bester Abendplan in Port d'Alcudia: Schritt-fuer-Schritt-Guide fuer den perfekten Abend auf Mallorca",
      fr: "Meilleur Plan Nocturne a Port d'Alcudia : Guide Etape par Etape pour la Soiree Parfaite a Majorque",
      it: "Miglior Piano Notturno a Port d'Alcudia: Guida Passo dopo Passo per la Serata Perfetta a Maiorca",
    },
    excerpt: {
      es: "Descubre el mejor plan nocturno en Port d'Alcudia: cena, cocteles en terraza y fiesta en el club. Guia completa paso a paso para disfrutar de la vida nocturna del norte de Mallorca.",
      en: "Discover the best night out plan in Port d'Alcudia: dinner, terrace cocktails and club night. Complete step-by-step guide to enjoying northern Mallorca's nightlife.",
      de: "Entdecken Sie den besten Abendplan in Port d'Alcudia: Abendessen, Terrassen-Cocktails und Clubnacht. Kompletter Schritt-fuer-Schritt-Guide fuer das Nachtleben im Norden Mallorcas.",
      fr: "Decouvrez le meilleur plan nocturne a Port d'Alcudia : diner, cocktails en terrasse et soiree en club. Guide complet etape par etape pour profiter de la vie nocturne du nord de Majorque.",
      it: "Scoprite il miglior piano notturno a Port d'Alcudia: cena, cocktail in terrazza e serata in club. Guida completa passo dopo passo per godervi la vita notturna del nord di Maiorca.",
    },
    content: {
      es: `<p>Port d'Alcudia tiene la mejor vida nocturna del norte de Mallorca, y eso no es opinion: es un hecho. Mientras que el sur de la isla concentra los grandes macroclubes, el norte ofrece algo diferente — una experiencia nocturna mas completa, mas cercana y con una calidad que sorprende a quienes la descubren por primera vez. Y lo mejor de todo es que <strong>el plan perfecto esta concentrado en una sola zona</strong>: Av. Tucan y Ctra. d'Arta, donde los tres locales de <a href="/">Grupo Enjoy</a> te permiten pasar de la cena a la fiesta sin necesitar un taxi.</p>

<p>En esta guia te explicamos paso a paso como montar la noche perfecta en Port d'Alcudia, con variaciones para todos los gustos.</p>

<h2>Paso 1: Cena en Hiru Food &amp; Drinks</h2>
<p>La mejor noche siempre empieza con una buena cena, y <a href="/hiru">Hiru Food &amp; Drinks</a> es el punto de partida ideal. Este restaurante se ha ganado la reputacion de ser el mejor de Port d'Alcudia por una razon: su cocina a la brasa con producto de primera, su terraza con ambiente, y un horario que se adapta perfectamente a los planes nocturnos.</p>
<p>Hiru abre de 12:00 a 23:30 entre semana y hasta la 1:00 los viernes y sabados. Eso significa que puedes cenar tranquilamente a las 21:00 o 21:30 sin sentir que te echan del sitio. La carta ofrece carnes maduradas dry-aged cocinadas a la brasa, pescado fresco del Mediterraneo a la parrilla, arroces y paellas elaborados con caldo casero y marisco de la lonja, y una seleccion de entrantes y tapas que funcionan perfectamente para compartir.</p>
<p>El cocktail bar de Hiru ya empieza a marcar el tono de la noche: puedes acompanar la cena con un buen vino de su carta o arrancar con un combinado de autor. Los viernes y sabados, el ambiente en Hiru se nota especialmente animado — es donde empieza todo.</p>
<p>Lee mas sobre la experiencia gastronomica en nuestra <a href="/blog/hiru-food-drinks-restaurante-alcudia">guia completa de Hiru</a> y en nuestro <a href="/blog/mejores-restaurantes-alcudia-mallorca">ranking de mejores restaurantes de Alcudia</a>.</p>

<h2>Paso 2: Cocteles en Enjoy Terrace</h2>
<p>Despues de cenar, el siguiente paso es cruzar a <a href="/enjoy">Enjoy Terrace</a>, el cocktail lounge y shisha bar que funciona como el puente perfecto entre la cena y la fiesta. Enjoy esta abierto todos los dias de 17:00 a 05:30, lo que significa que puedes llegar a cualquier hora y siempre encontraras ambiente.</p>
<p>La terraza al aire libre de Enjoy es uno de los secretos mejor guardados de Port d'Alcudia. Iluminacion calida, musica cuidadosamente seleccionada que va subiendo de intensidad segun avanza la noche, cocteles de autor preparados por mixologos profesionales y una seleccion de shisha premium con carbon natural y tabaco de primera calidad.</p>
<p>Si llegas al atardecer, el espectaculo de colores sobre Alcudia es impresionante. Pero incluso a medianoche, Enjoy tiene una energia especial: es el momento en que los grupos se juntan, las conversaciones fluyen y la noche empieza a coger velocidad.</p>
<p>Explora la carta de cocteles y la experiencia shisha en nuestro <a href="/blog/cocteles-shisha-terraza-alcudia">articulo dedicado a Enjoy Terrace</a>.</p>

<h2>Paso 3: La fiesta en Outxide Club</h2>
<p>Cuando la terraza ya no es suficiente y el cuerpo pide musica a todo volumen y pista de baile, <a href="/outxide">Outxide Club</a> esta literalmente a pocos metros. Es la discoteca de referencia del norte de Mallorca, y los que la conocen saben que la experiencia no tiene nada que envidiar a los clubs del sur.</p>
<p>Outxide tiene sesiones los <strong>jueves, viernes y sabados</strong>, con DJs nacionales e internacionales que pintan house, tech-house, R&amp;B y sesiones tematicas que cambian cada semana. El sistema de sonido es de primer nivel, la iluminacion esta disenada para crear una experiencia inmersiva y la pista se llena de gente con ganas de pasarlo bien.</p>
<p>Las opciones de entrada incluyen <strong>compra anticipada online</strong> (recomendada para asegurar tu plaza y a menudo con descuento) y taquilla en puerta. Para grupos y celebraciones, las <strong>mesas VIP con servicio de botellas</strong> son la opcion premium: tu propia zona con vista a la pista y atencion personalizada toda la noche.</p>
<p>Toda la informacion sobre las sesiones y las entradas en nuestra <a href="/blog/outxide-club-discoteca-alcudia-mallorca">guia de Outxide Club</a> y en el articulo sobre <a href="/blog/mejores-discotecas-clubs-alcudia">las mejores discotecas de Alcudia</a>.</p>

<h2>Variaciones del plan nocturno</h2>
<p>No todos los planes nocturnos tienen que ser iguales. Aqui van tres variaciones que funcionan segun lo que te apetezca:</p>

<h3>Plan casual: Enjoy + Outxide</h3>
<p>Si prefieres cenar por tu cuenta o en tu hotel y salir directamente a tomar cocteles, puedes empezar la noche directamente en <a href="/enjoy">Enjoy Terrace</a>. Un par de cocteles, algo de shisha, y cuando el ambiente suba lo suficiente, cruzas al <a href="/outxide">Outxide Club</a>. Es el plan mas ligero y funciona perfectamente para noches entre semana o cuando no quieres complicarte.</p>

<h3>Plan foodie: Hiru + Enjoy</h3>
<p>Si la gastronomia es lo tuyo y prefieres una noche mas tranquila sin discoteca, la combinacion de cena en <a href="/hiru">Hiru</a> seguida de cocteles en <a href="/enjoy">Enjoy</a> es una velada completa. Puedes alargar la sobremesa en el cocktail bar de Hiru y luego pasarte a Enjoy para cambiar de ambiente. La terraza de Enjoy esta abierta hasta las 05:30, asi que no hay prisa.</p>

<h3>Plan experiencia completa: Hiru + Enjoy + Outxide</h3>
<p>Este es el plan estrella. Cena en <a href="/hiru">Hiru</a> a las 21:00, cocteles en <a href="/enjoy">Enjoy</a> a partir de las 23:00, y fiesta en <a href="/outxide">Outxide</a> desde la 1:00. Es la formula que siguen los que conocen la zona y quieren exprimir cada momento de la noche. Todo sin coger un coche.</p>

<h2>Lo que necesitas saber</h2>
<p><strong>Horarios:</strong> Hiru abre de 12:00 a 23:30 (viernes y sabado hasta la 1:00, cierra martes). Enjoy Terrace de 17:00 a 05:30 todos los dias. Outxide Club abre jueves, viernes y sabado por la noche (consulta horarios exactos en su web).</p>
<p><strong>Ubicacion:</strong> Los tres locales estan en la misma zona de Port d'Alcudia, en Av. Tucan y Ctra. d'Arta. Puedes ir andando de uno a otro en menos de dos minutos. No necesitas coche ni taxi.</p>
<p><strong>Edad:</strong> Outxide Club tiene un requisito de edad de <strong>21+</strong>. Asegurate de llevar DNI o pasaporte. Hiru y Enjoy no tienen restriccion de edad para cenar y tomar cocteles, aunque el servicio de alcohol es solo para mayores de edad.</p>
<p><strong>Entradas de Outxide:</strong> Compra tus entradas online con antelacion para evitar colas y a menudo conseguir mejor precio. Disponible en la web de <a href="/outxide">Outxide Club</a>.</p>
<p><strong>Reservas:</strong> Recomendamos reservar mesa en Hiru, especialmente los viernes y sabados en temporada alta. Para mesas VIP en Outxide, contacta directamente por la web.</p>

<p>Para completar tu planificacion, no te pierdas nuestra <a href="/blog/guia-vida-nocturna-alcudia">guia completa de vida nocturna en Alcudia</a> y el articulo sobre <a href="/blog/planes-alcudia-mallorca">los mejores planes en Alcudia</a>.</p>

<p><strong>Grupo Enjoy — Hiru Food &amp; Drinks, Enjoy Terrace &amp; Outxide Club. Av. Tucan / Ctra. d'Arta, Port d'Alcudia, Mallorca. <a href="/">Toda la informacion en nuestra web.</a></strong></p>`,

      en: `<p>Port d'Alcudia has the best nightlife in northern Mallorca, and that's not just opinion — it's a fact. While the south of the island concentrates the mega-clubs, the north offers something different: a more complete night-out experience, more personal and with a quality that surprises first-time visitors. And the best part is that <strong>the perfect plan is concentrated in one area</strong>: Av. Tucan and Ctra. d'Arta, where the three venues by <a href="/">Grupo Enjoy</a> let you go from dinner to dancing without needing a taxi.</p>

<p>In this guide we walk you through step by step how to put together the perfect night in Port d'Alcudia, with variations for every taste.</p>

<h2>Step 1: Dinner at Hiru Food &amp; Drinks</h2>
<p>The best night always starts with a great dinner, and <a href="/hiru">Hiru Food &amp; Drinks</a> is the ideal starting point. This restaurant has earned its reputation as the best in Port d'Alcudia for a reason: its open-flame cuisine with premium ingredients, its terrace with atmosphere, and opening hours that fit perfectly into an evening plan.</p>
<p>Hiru is open from 12:00 to 23:30 on weekdays and until 1:00 on Fridays and Saturdays. That means you can dine comfortably at 21:00 or 21:30 without feeling rushed. The menu offers dry-aged meats cooked over open flame, fresh Mediterranean fish from the grill, rice dishes and paellas made with homemade stock and market-fresh seafood, and a selection of starters and tapas perfect for sharing.</p>
<p>Hiru's cocktail bar already sets the tone for the night: pair your dinner with a wine from the list or kick off with a signature mixed drink. On Fridays and Saturdays, the atmosphere at Hiru is especially lively — it's where it all begins.</p>
<p>Read more about the dining experience in our <a href="/blog/hiru-food-drinks-restaurante-alcudia">complete Hiru guide</a> and our <a href="/blog/mejores-restaurantes-alcudia-mallorca">best restaurants in Alcudia ranking</a>.</p>

<h2>Step 2: Cocktails at Enjoy Terrace</h2>
<p>After dinner, the next step is walking over to <a href="/enjoy">Enjoy Terrace</a>, the cocktail lounge and shisha bar that works as the perfect bridge between dinner and clubbing. Enjoy is open every day from 17:00 to 05:30, meaning you can arrive at any time and always find atmosphere.</p>
<p>The open-air terrace at Enjoy is one of Port d'Alcudia's best-kept secrets. Warm lighting, carefully curated music that builds in intensity as the night progresses, signature cocktails crafted by professional mixologists, and a premium shisha selection with natural charcoal and top-quality tobacco.</p>
<p>If you arrive at sunset, the colours over Alcudia are stunning. But even at midnight, Enjoy has a special energy: it's the moment when groups come together, conversations flow and the night starts picking up speed.</p>
<p>Explore the cocktail menu and shisha experience in our <a href="/blog/cocteles-shisha-terraza-alcudia">dedicated Enjoy Terrace article</a>.</p>

<h2>Step 3: The party at Outxide Club</h2>
<p>When the terrace isn't enough and your body is calling for loud music and a dance floor, <a href="/outxide">Outxide Club</a> is literally metres away. It's the leading nightclub in northern Mallorca, and those who know it will tell you the experience rivals the best clubs in the south.</p>
<p>Outxide has sessions on <strong>Thursdays, Fridays and Saturdays</strong>, with national and international DJs playing house, tech-house, R&amp;B and themed sessions that change every week. The sound system is top-tier, the lighting is designed for an immersive experience, and the dance floor is packed with people ready to have a great time.</p>
<p>Entry options include <strong>advance online purchase</strong> (recommended to secure your spot, often at a discount) and door tickets. For groups and celebrations, <strong>VIP tables with bottle service</strong> are the premium option: your own area with dance floor views and personal attention all night.</p>
<p>Full details on sessions and tickets in our <a href="/blog/outxide-club-discoteca-alcudia-mallorca">Outxide Club guide</a> and our article on <a href="/blog/mejores-discotecas-clubs-alcudia">the best clubs in Alcudia</a>.</p>

<h2>Night out variations</h2>
<p>Not every night out has to follow the same script. Here are three variations that work depending on your mood:</p>

<h3>Casual plan: Enjoy + Outxide</h3>
<p>If you'd rather dine at your hotel and head straight out for drinks, start the night at <a href="/enjoy">Enjoy Terrace</a>. A couple of cocktails, some shisha, and when the atmosphere peaks, cross over to <a href="/outxide">Outxide Club</a>. It's the lightest plan and works perfectly for midweek nights or when you want to keep things simple.</p>

<h3>Foodie plan: Hiru + Enjoy</h3>
<p>If gastronomy is your thing and you prefer a more relaxed night without clubbing, the combination of dinner at <a href="/hiru">Hiru</a> followed by cocktails at <a href="/enjoy">Enjoy</a> is a complete evening. You can linger over after-dinner drinks at Hiru's cocktail bar and then stroll to Enjoy for a change of scene. The terrace is open until 05:30, so there's no rush.</p>

<h3>Full experience plan: Hiru + Enjoy + Outxide</h3>
<p>This is the flagship plan. Dinner at <a href="/hiru">Hiru</a> at 21:00, cocktails at <a href="/enjoy">Enjoy</a> from 23:00, and party at <a href="/outxide">Outxide</a> from 1:00. It's the formula followed by those who know the area and want to make the most of every moment. All on foot.</p>

<h2>What you need to know</h2>
<p><strong>Opening hours:</strong> Hiru opens 12:00 to 23:30 (Friday and Saturday until 1:00, closed Tuesdays). Enjoy Terrace 17:00 to 05:30 every day. Outxide Club opens Thursday, Friday and Saturday nights (check exact times on their website).</p>
<p><strong>Location:</strong> All three venues are in the same area of Port d'Alcudia, on Av. Tucan and Ctra. d'Arta. You can walk between them in under two minutes. No car or taxi needed.</p>
<p><strong>Age requirement:</strong> Outxide Club has a <strong>21+</strong> age policy. Make sure you carry ID or passport. Hiru and Enjoy have no age restriction for dining and cocktails, though alcohol service is for legal adults only.</p>
<p><strong>Outxide tickets:</strong> Buy your tickets online in advance to skip queues and often get a better price. Available on the <a href="/outxide">Outxide Club</a> website.</p>
<p><strong>Reservations:</strong> We recommend booking a table at Hiru, especially on Fridays and Saturdays during high season. For VIP tables at Outxide, contact directly through the website.</p>

<p>To complete your planning, don't miss our <a href="/blog/guia-vida-nocturna-alcudia">complete Alcudia nightlife guide</a> and the article on <a href="/blog/planes-alcudia-mallorca">the best plans in Alcudia</a>.</p>

<p><strong>Grupo Enjoy — Hiru Food &amp; Drinks, Enjoy Terrace &amp; Outxide Club. Av. Tucan / Ctra. d'Arta, Port d'Alcudia, Mallorca. <a href="/">All information on our website.</a></strong></p>`,

      de: `<p>Port d'Alcudia hat das beste Nachtleben im Norden Mallorcas, und das ist keine blosse Meinung — es ist eine Tatsache. Waehrend der Sueden der Insel die Mega-Clubs konzentriert, bietet der Norden etwas anderes: ein vollstaendigeres Ausgeherlebnis, persoenlicher und mit einer Qualitaet, die Erstbesucher ueberrascht. Und das Beste ist, dass <strong>der perfekte Plan in einem einzigen Bereich konzentriert ist</strong>: Av. Tucan und Ctra. d'Arta, wo die drei Locations von <a href="/">Grupo Enjoy</a> es ermoeglichen, vom Abendessen zur Party zu wechseln, ohne ein Taxi zu brauchen.</p>

<p>In diesem Guide zeigen wir Ihnen Schritt fuer Schritt, wie Sie den perfekten Abend in Port d'Alcudia zusammenstellen, mit Variationen fuer jeden Geschmack.</p>

<h2>Schritt 1: Abendessen im Hiru Food &amp; Drinks</h2>
<p>Der beste Abend beginnt immer mit einem grossartigen Essen, und <a href="/hiru">Hiru Food &amp; Drinks</a> ist der ideale Startpunkt. Dieses Restaurant hat sich seinen Ruf als bestes in Port d'Alcudia verdient: Offene-Flamme-Kueche mit Premium-Zutaten, eine Terrasse mit Atmosphaere und Oeffnungszeiten, die perfekt in einen Abendplan passen.</p>
<p>Hiru oeffnet von 12:00 bis 23:30 Uhr unter der Woche und bis 1:00 Uhr an Freitagen und Samstagen. Die Karte bietet dry-aged Fleisch vom Grill, frischen Mittelmeerfisch, Reisgerichte und Paellas mit hausgemachter Bruehe sowie eine Auswahl an Vorspeisen und Tapas zum Teilen.</p>
<p>Die Cocktailbar von Hiru setzt bereits den Ton fuer den Abend: Begleiten Sie Ihr Essen mit einem Wein von der Karte oder starten Sie mit einem Signatur-Drink. An Freitagen und Samstagen ist die Stimmung besonders lebendig.</p>
<p>Mehr ueber das kulinarische Erlebnis in unserem <a href="/blog/hiru-food-drinks-restaurante-alcudia">kompletten Hiru-Guide</a> und unserem <a href="/blog/mejores-restaurantes-alcudia-mallorca">Ranking der besten Restaurants in Alcudia</a>.</p>

<h2>Schritt 2: Cocktails auf der Enjoy Terrace</h2>
<p>Nach dem Essen ist der naechste Schritt ein Spaziergang zur <a href="/enjoy">Enjoy Terrace</a>, der Cocktail-Lounge und Shisha-Bar, die als perfekte Bruecke zwischen Abendessen und Club funktioniert. Enjoy hat taeglich von 17:00 bis 05:30 Uhr geoeffnet, sodass Sie jederzeit kommen koennen und immer Atmosphaere finden.</p>
<p>Die Open-Air-Terrasse von Enjoy ist einer der bestgehueteten Geheimnisse von Port d'Alcudia. Warmes Licht, sorgfaeltig kuratierte Musik, die im Laufe des Abends an Intensitaet zunimmt, Signatur-Cocktails von professionellen Mixologen und eine Premium-Shisha-Auswahl mit Naturkohle.</p>
<p>Wenn Sie zum Sonnenuntergang ankommen, sind die Farben ueber Alcudia atemberaubend. Aber auch um Mitternacht hat Enjoy eine besondere Energie: der Moment, in dem sich Gruppen zusammenfinden und die Nacht Fahrt aufnimmt.</p>
<p>Entdecken Sie die Cocktailkarte in unserem <a href="/blog/cocteles-shisha-terraza-alcudia">Enjoy Terrace-Artikel</a>.</p>

<h2>Schritt 3: Die Party im Outxide Club</h2>
<p>Wenn die Terrasse nicht mehr reicht und der Koerper nach lauter Musik und Tanzflaeche verlangt, ist der <a href="/outxide">Outxide Club</a> buchstaeblich nur Meter entfernt. Er ist der fuehrende Nachtclub im Norden Mallorcas.</p>
<p>Outxide hat Sessions an <strong>Donnerstagen, Freitagen und Samstagen</strong> mit nationalen und internationalen DJs, die House, Tech-House, R&amp;B und wechselnde Themen-Sessions spielen. Das Soundsystem ist erstklassig, die Beleuchtung ist fuer ein immersives Erlebnis konzipiert.</p>
<p>Eintrittsmoegiichkeiten umfassen <strong>Online-Vorverkauf</strong> (empfohlen, oft mit Rabatt) und Abendkasse. Fuer Gruppen bieten <strong>VIP-Tische mit Flaschenservice</strong> die Premium-Option.</p>
<p>Alle Details in unserem <a href="/blog/outxide-club-discoteca-alcudia-mallorca">Outxide Club Guide</a> und im Artikel ueber <a href="/blog/mejores-discotecas-clubs-alcudia">die besten Clubs in Alcudia</a>.</p>

<h2>Variationen des Abendplans</h2>

<h3>Casual-Plan: Enjoy + Outxide</h3>
<p>Wenn Sie lieber im Hotel essen und direkt zum Trinken ausgehen moechten, starten Sie den Abend auf der <a href="/enjoy">Enjoy Terrace</a>. Ein paar Cocktails, etwas Shisha, und wenn die Stimmung stimmt, wechseln Sie zum <a href="/outxide">Outxide Club</a>. Der leichteste Plan, perfekt fuer Wochentage.</p>

<h3>Foodie-Plan: Hiru + Enjoy</h3>
<p>Wenn Gastronomie Ihr Ding ist und Sie einen entspannten Abend ohne Club bevorzugen, ist die Kombination aus Abendessen im <a href="/hiru">Hiru</a> und Cocktails auf der <a href="/enjoy">Enjoy Terrace</a> ein vollstaendiger Abend. Die Terrasse hat bis 05:30 Uhr geoeffnet.</p>

<h3>Volle-Erfahrung-Plan: Hiru + Enjoy + Outxide</h3>
<p>Der Flaggschiff-Plan. Abendessen im <a href="/hiru">Hiru</a> um 21:00, Cocktails auf der <a href="/enjoy">Enjoy Terrace</a> ab 23:00, Party im <a href="/outxide">Outxide</a> ab 1:00. Alles zu Fuss.</p>

<h2>Was Sie wissen muessen</h2>
<p><strong>Oeffnungszeiten:</strong> Hiru: 12:00-23:30 (Fr/Sa bis 1:00, Di geschlossen). Enjoy Terrace: 17:00-05:30 taeglich. Outxide Club: Do/Fr/Sa abends (genaue Zeiten auf der Website).</p>
<p><strong>Lage:</strong> Alle drei Locations liegen im selben Bereich von Port d'Alcudia, auf der Av. Tucan und Ctra. d'Arta. Unter zwei Minuten zu Fuss zwischen allen. Kein Auto oder Taxi noetig.</p>
<p><strong>Altersanforderung:</strong> Outxide Club hat eine <strong>21+</strong> Altersrichtlinie. Personalausweis oder Reisepass mitbringen. Hiru und Enjoy haben keine Altersbeschraenkung zum Essen und Cocktailtrinken, Alkoholausschank nur fuer Volljaehrige.</p>
<p><strong>Outxide-Tickets:</strong> Online im Voraus kaufen, um Warteschlangen zu vermeiden und oft einen besseren Preis zu bekommen. Verfuegbar auf der <a href="/outxide">Outxide Club</a>-Website.</p>
<p><strong>Reservierungen:</strong> Tischreservierung im Hiru empfohlen, besonders Fr/Sa in der Hochsaison. VIP-Tische im Outxide direkt ueber die Website anfragen.</p>

<p>Fuer die vollstaendige Planung lesen Sie unseren <a href="/blog/guia-vida-nocturna-alcudia">kompletten Alcudia Nachtleben-Guide</a> und den Artikel ueber <a href="/blog/planes-alcudia-mallorca">die besten Plaene in Alcudia</a>.</p>

<p><strong>Grupo Enjoy — Hiru Food &amp; Drinks, Enjoy Terrace &amp; Outxide Club. Av. Tucan / Ctra. d'Arta, Port d'Alcudia, Mallorca. <a href="/">Alle Informationen auf unserer Website.</a></strong></p>`,

      fr: `<p>Port d'Alcudia possede la meilleure vie nocturne du nord de Majorque, et ce n'est pas une simple opinion — c'est un fait. Alors que le sud de l'ile concentre les mega-clubs, le nord offre quelque chose de different : une experience nocturne plus complete, plus personnelle et d'une qualite qui surprend les visiteurs. Et le meilleur, c'est que <strong>le plan parfait est concentre dans une seule zone</strong> : Av. Tucan et Ctra. d'Arta, ou les trois etablissements de <a href="/">Grupo Enjoy</a> permettent de passer du diner a la fete sans taxi.</p>

<p>Dans ce guide, nous vous expliquons etape par etape comment organiser la soiree parfaite a Port d'Alcudia, avec des variations pour tous les gouts.</p>

<h2>Etape 1 : Diner au Hiru Food &amp; Drinks</h2>
<p>La meilleure soiree commence toujours par un excellent diner, et <a href="/hiru">Hiru Food &amp; Drinks</a> est le point de depart ideal. Ce restaurant s'est forge une reputation de meilleur de Port d'Alcudia : cuisine au feu ouvert avec des ingredients premium, terrasse avec ambiance, et horaires parfaitement adaptes aux plans nocturnes.</p>
<p>Hiru ouvre de 12h00 a 23h30 en semaine et jusqu'a 1h00 les vendredis et samedis. La carte propose des viandes maturees dry-aged cuites a la braise, du poisson frais de Mediterranee grille, des riz et paellas elabores avec bouillon maison et fruits de mer du marche, et une selection d'entrees et tapas a partager.</p>
<p>Le bar a cocktails de Hiru donne deja le ton : accompagnez votre diner d'un vin de la carte ou demarrez avec un cocktail signature. Les vendredis et samedis, l'ambiance est particulierement animee.</p>
<p>Decouvrez l'experience gastronomique dans notre <a href="/blog/hiru-food-drinks-restaurante-alcudia">guide complet Hiru</a> et notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">classement des meilleurs restaurants d'Alcudia</a>.</p>

<h2>Etape 2 : Cocktails a l'Enjoy Terrace</h2>
<p>Apres le diner, direction l'<a href="/enjoy">Enjoy Terrace</a>, le lounge cocktail et bar a chicha qui sert de pont parfait entre le diner et le club. Enjoy est ouvert tous les jours de 17h00 a 05h30, vous trouverez toujours de l'ambiance.</p>
<p>La terrasse en plein air d'Enjoy est l'un des secrets les mieux gardes de Port d'Alcudia. Eclairage chaleureux, musique soigneusement selectionnee qui monte en intensite, cocktails signatures prepares par des mixologues professionnels et une selection de chicha premium au charbon naturel.</p>
<p>Si vous arrivez au coucher du soleil, les couleurs sur Alcudia sont impressionnantes. Mais meme a minuit, Enjoy a une energie speciale : le moment ou les groupes se rassemblent et la nuit prend de la vitesse.</p>
<p>Explorez la carte dans notre <a href="/blog/cocteles-shisha-terraza-alcudia">article dedie a l'Enjoy Terrace</a>.</p>

<h2>Etape 3 : La fete a l'Outxide Club</h2>
<p>Quand la terrasse ne suffit plus et que le corps reclame de la musique a fond et un dancefloor, l'<a href="/outxide">Outxide Club</a> est a quelques metres. C'est la boite de nuit de reference du nord de Majorque.</p>
<p>Outxide a des sessions les <strong>jeudis, vendredis et samedis</strong>, avec des DJs nationaux et internationaux jouant house, tech-house, R&amp;B et des sessions thematiques qui changent chaque semaine. Le systeme son est de premier ordre et l'eclairage est concu pour une experience immersive.</p>
<p>Les options d'entree comprennent l'<strong>achat anticipe en ligne</strong> (recommande, souvent avec reduction) et la billetterie sur place. Pour les groupes, les <strong>tables VIP avec service bouteilles</strong> sont l'option premium.</p>
<p>Tous les details dans notre <a href="/blog/outxide-club-discoteca-alcudia-mallorca">guide Outxide Club</a> et l'article sur <a href="/blog/mejores-discotecas-clubs-alcudia">les meilleures discoteques d'Alcudia</a>.</p>

<h2>Variations du plan nocturne</h2>

<h3>Plan casual : Enjoy + Outxide</h3>
<p>Si vous preferez diner a votre hotel et sortir directement pour les verres, commencez a l'<a href="/enjoy">Enjoy Terrace</a>. Quelques cocktails, du chicha, et quand l'ambiance monte, traversez vers l'<a href="/outxide">Outxide Club</a>. Le plan le plus leger, parfait en semaine.</p>

<h3>Plan foodie : Hiru + Enjoy</h3>
<p>Si la gastronomie est votre passion et vous preferez une soiree tranquille sans club, la combinaison diner au <a href="/hiru">Hiru</a> puis cocktails a l'<a href="/enjoy">Enjoy</a> est une soiree complete. La terrasse est ouverte jusqu'a 05h30.</p>

<h3>Plan experience complete : Hiru + Enjoy + Outxide</h3>
<p>Le plan phare. Diner au <a href="/hiru">Hiru</a> a 21h00, cocktails a l'<a href="/enjoy">Enjoy</a> a partir de 23h00, fete a l'<a href="/outxide">Outxide</a> des 1h00. La formule des connaisseurs. Le tout a pied.</p>

<h2>Ce qu'il faut savoir</h2>
<p><strong>Horaires :</strong> Hiru : 12h00-23h30 (ven/sam jusqu'a 1h00, ferme mardi). Enjoy Terrace : 17h00-05h30 tous les jours. Outxide Club : jeu/ven/sam soir (consultez les horaires exacts sur le site).</p>
<p><strong>Emplacement :</strong> Les trois etablissements sont dans la meme zone de Port d'Alcudia, sur l'Av. Tucan et la Ctra. d'Arta. Moins de deux minutes a pied entre chaque. Pas besoin de voiture ni de taxi.</p>
<p><strong>Age requis :</strong> Outxide Club exige <strong>21 ans minimum</strong>. Pensez a apporter une piece d'identite. Hiru et Enjoy n'ont pas de restriction d'age pour diner et boire des cocktails, le service d'alcool est reserve aux majeurs.</p>
<p><strong>Billets Outxide :</strong> Achetez en ligne a l'avance pour eviter les files d'attente et souvent obtenir un meilleur prix. Disponible sur le site d'<a href="/outxide">Outxide Club</a>.</p>
<p><strong>Reservations :</strong> Reservez votre table au Hiru, surtout ven/sam en haute saison. Tables VIP a l'Outxide sur demande via le site.</p>

<p>Pour completer votre planification, consultez notre <a href="/blog/guia-vida-nocturna-alcudia">guide complet de la vie nocturne a Alcudia</a> et l'article sur <a href="/blog/planes-alcudia-mallorca">les meilleurs plans a Alcudia</a>.</p>

<p><strong>Grupo Enjoy — Hiru Food &amp; Drinks, Enjoy Terrace &amp; Outxide Club. Av. Tucan / Ctra. d'Arta, Port d'Alcudia, Majorque. <a href="/">Toutes les informations sur notre site.</a></strong></p>`,

      it: `<p>Port d'Alcudia ha la migliore vita notturna del nord di Maiorca, e non e' solo un'opinione — e' un fatto. Mentre il sud dell'isola concentra i mega-club, il nord offre qualcosa di diverso: un'esperienza notturna piu' completa, piu' personale e con una qualita' che sorprende chi la scopre per la prima volta. E il bello e' che <strong>il piano perfetto e' concentrato in un'unica zona</strong>: Av. Tucan e Ctra. d'Arta, dove i tre locali di <a href="/">Grupo Enjoy</a> permettono di passare dalla cena alla festa senza bisogno di un taxi.</p>

<p>In questa guida vi spieghiamo passo dopo passo come organizzare la serata perfetta a Port d'Alcudia, con variazioni per tutti i gusti.</p>

<h2>Passo 1: Cena al Hiru Food &amp; Drinks</h2>
<p>La serata migliore inizia sempre con un'ottima cena, e <a href="/hiru">Hiru Food &amp; Drinks</a> e' il punto di partenza ideale. Questo ristorante si e' guadagnato la reputazione di essere il migliore di Port d'Alcudia: cucina alla brace con ingredienti premium, terrazza con atmosfera e orari perfettamente adatti ai piani serali.</p>
<p>Hiru e' aperto dalle 12:00 alle 23:30 in settimana e fino all'1:00 il venerdi' e sabato. Il menu offre carni stagionate dry-aged alla brace, pesce fresco del Mediterraneo alla griglia, risi e paelle con brodo fatto in casa e frutti di mare del mercato, e una selezione di antipasti e tapas da condividere.</p>
<p>Il cocktail bar di Hiru da' gia' il tono alla serata: accompagnate la cena con un vino dalla carta o iniziate con un drink d'autore. Il venerdi' e sabato l'atmosfera e' particolarmente vivace.</p>
<p>Scoprite di piu' sull'esperienza gastronomica nella nostra <a href="/blog/hiru-food-drinks-restaurante-alcudia">guida completa di Hiru</a> e nella nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">classifica dei migliori ristoranti di Alcudia</a>.</p>

<h2>Passo 2: Cocktail all'Enjoy Terrace</h2>
<p>Dopo cena, il passo successivo e' attraversare verso l'<a href="/enjoy">Enjoy Terrace</a>, il cocktail lounge e shisha bar che funziona come ponte perfetto tra la cena e il club. Enjoy e' aperto tutti i giorni dalle 17:00 alle 05:30, quindi troverete sempre atmosfera.</p>
<p>La terrazza all'aperto di Enjoy e' uno dei segreti meglio custoditi di Port d'Alcudia. Illuminazione calda, musica accuratamente selezionata che cresce di intensita', cocktail d'autore preparati da mixologi professionisti e una selezione di shisha premium con carbone naturale.</p>
<p>Se arrivate al tramonto, i colori su Alcudia sono mozzafiato. Ma anche a mezzanotte, Enjoy ha un'energia speciale: il momento in cui i gruppi si riuniscono e la notte prende velocita'.</p>
<p>Esplorate la carta nel nostro <a href="/blog/cocteles-shisha-terraza-alcudia">articolo dedicato all'Enjoy Terrace</a>.</p>

<h2>Passo 3: La festa all'Outxide Club</h2>
<p>Quando la terrazza non basta piu' e il corpo chiede musica alta e pista da ballo, l'<a href="/outxide">Outxide Club</a> e' a pochi metri. E' la discoteca di riferimento del nord di Maiorca.</p>
<p>Outxide ha serate il <strong>giovedi', venerdi' e sabato</strong>, con DJ nazionali e internazionali che suonano house, tech-house, R&amp;B e serate a tema che cambiano ogni settimana. L'impianto audio e' di primo livello e l'illuminazione e' progettata per un'esperienza immersiva.</p>
<p>Le opzioni di ingresso includono l'<strong>acquisto online anticipato</strong> (consigliato, spesso con sconto) e la cassa in loco. Per i gruppi, i <strong>tavoli VIP con servizio bottiglie</strong> sono l'opzione premium.</p>
<p>Tutti i dettagli nella nostra <a href="/blog/outxide-club-discoteca-alcudia-mallorca">guida Outxide Club</a> e nell'articolo sui <a href="/blog/mejores-discotecas-clubs-alcudia">migliori club di Alcudia</a>.</p>

<h2>Variazioni del piano notturno</h2>

<h3>Piano casual: Enjoy + Outxide</h3>
<p>Se preferite cenare in hotel e uscire direttamente per i drink, iniziate all'<a href="/enjoy">Enjoy Terrace</a>. Un paio di cocktail, un po' di shisha, e quando l'atmosfera sale, attraversate verso l'<a href="/outxide">Outxide Club</a>. Il piano piu' leggero, perfetto in settimana.</p>

<h3>Piano foodie: Hiru + Enjoy</h3>
<p>Se la gastronomia e' la vostra passione e preferite una serata tranquilla senza discoteca, la combinazione cena al <a href="/hiru">Hiru</a> e cocktail all'<a href="/enjoy">Enjoy</a> e' una serata completa. La terrazza e' aperta fino alle 05:30.</p>

<h3>Piano esperienza completa: Hiru + Enjoy + Outxide</h3>
<p>Il piano di punta. Cena al <a href="/hiru">Hiru</a> alle 21:00, cocktail all'<a href="/enjoy">Enjoy</a> dalle 23:00, festa all'<a href="/outxide">Outxide</a> dall'1:00. La formula degli intenditori. Tutto a piedi.</p>

<h2>Quello che dovete sapere</h2>
<p><strong>Orari:</strong> Hiru: 12:00-23:30 (ven/sab fino all'1:00, chiuso martedi'). Enjoy Terrace: 17:00-05:30 tutti i giorni. Outxide Club: gio/ven/sab sera (consultate gli orari esatti sul sito).</p>
<p><strong>Posizione:</strong> Tutti e tre i locali sono nella stessa zona di Port d'Alcudia, su Av. Tucan e Ctra. d'Arta. Meno di due minuti a piedi tra uno e l'altro. Niente auto o taxi.</p>
<p><strong>Requisito di eta':</strong> Outxide Club richiede <strong>21+</strong>. Portate documento d'identita' o passaporto. Hiru e Enjoy non hanno restrizioni di eta' per cenare e bere cocktail, il servizio di alcolici e' riservato ai maggiorenni.</p>
<p><strong>Biglietti Outxide:</strong> Acquistate online in anticipo per evitare code e spesso ottenere un prezzo migliore. Disponibili sul sito di <a href="/outxide">Outxide Club</a>.</p>
<p><strong>Prenotazioni:</strong> Consigliamo di prenotare al Hiru, soprattutto ven/sab in alta stagione. Tavoli VIP all'Outxide su richiesta tramite il sito.</p>

<p>Per completare la pianificazione, consultate la nostra <a href="/blog/guia-vida-nocturna-alcudia">guida completa alla vita notturna di Alcudia</a> e l'articolo sui <a href="/blog/planes-alcudia-mallorca">migliori piani ad Alcudia</a>.</p>

<p><strong>Grupo Enjoy — Hiru Food &amp; Drinks, Enjoy Terrace &amp; Outxide Club. Av. Tucan / Ctra. d'Arta, Port d'Alcudia, Maiorca. <a href="/">Tutte le informazioni sul nostro sito.</a></strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    image: "/images/enjoy/485765269_1384374992965504_5931564430169011113_n.jpg",
    tags: ["nightlife", "guide", "alcudia", "mallorca", "enjoy", "outxide", "hiru"],
    venue: "general",
    readingTime: 8,
  },
  {
    slug: "musica-dj-fiestas-tematicas-alcudia-mallorca",
    title: {
      es: "Musica en Vivo, DJ Sessions y Fiestas Tematicas en Alcudia",
      en: "Live Music, DJ Sessions and Themed Parties in Alcudia",
      de: "Live-Musik, DJ-Sessions und Themenpartys in Alcudia",
      fr: "Musique Live, DJ Sessions et Soirees a Theme a Alcudia",
      it: "Musica dal Vivo, DJ Set e Feste a Tema ad Alcudia",
    },
    excerpt: {
      es: "Descubre las mejores noches de musica en vivo, DJ sets y fiestas tematicas en Alcudia. Outxide Club, Enjoy Terrace y Hiru te esperan en Port d'Alcudia, Mallorca.",
      en: "Discover the best nights of live music, DJ sets and themed parties in Alcudia. Outxide Club, Enjoy Terrace and Hiru await you in Port d'Alcudia, Mallorca.",
      de: "Entdecke die besten Naechte mit Live-Musik, DJ-Sets und Themenpartys in Alcudia. Outxide Club, Enjoy Terrace und Hiru erwarten dich in Port d'Alcudia, Mallorca.",
      fr: "Decouvrez les meilleures soirees de musique live, DJ sets et fetes a theme a Alcudia. Outxide Club, Enjoy Terrace et Hiru vous attendent a Port d'Alcudia, Majorque.",
      it: "Scopri le migliori serate di musica dal vivo, DJ set e feste a tema ad Alcudia. Outxide Club, Enjoy Terrace e Hiru ti aspettano a Port d'Alcudia, Maiorca.",
    },
    content: {
      es: `<p>Alcudia se ha consolidado como uno de los destinos mas vibrantes de Mallorca cuando cae el sol. Cada verano, miles de visitantes llegan al norte de la isla buscando noches inolvidables con musica en vivo, sesiones de DJ de primer nivel y fiestas tematicas que no encontraras en ningun otro lugar del Mediterraneo. Si estas planeando tu viaje y quieres saber donde disfrutar de la mejor musica en Alcudia, esta guia es para ti.</p>

<h2>La escena musical de Alcudia: mucho mas que turismo de sol y playa</h2>

<p>Port d'Alcudia ha evolucionado enormemente en los ultimos anos. Lo que antes era un destino conocido unicamente por sus playas de arena blanca y aguas turquesas ahora ofrece una vida nocturna a la altura de los mejores destinos europeos. La zona cuenta con locales que apuestan por experiencias musicales cuidadas, con sistemas de sonido profesionales, iluminacion de ultima generacion y una programacion que abarca desde house y techno hasta sesiones de musica comercial, reggaeton y festivales tematicos.</p>

<p>El epicentro de esta transformacion es <a href="/outxide">Outxide Club</a>, la discoteca de referencia en el norte de Mallorca. Junto a ella, <a href="/enjoy">Enjoy Terrace</a> completa la experiencia con cocktails de autor y un ambiente perfecto para comenzar la noche, mientras que <a href="/hiru">Hiru Food &amp; Drinks</a> aporta el componente gastronomico con cocina mallorquina a la brasa.</p>

<h2>DJ Sessions en Outxide Club: el sonido del norte de Mallorca</h2>

<p>Si buscas DJ en Alcudia con sesiones que realmente merezcan la pena, <a href="/outxide">Outxide Club</a> es tu destino. Situado en Av. Tuca, 1, en pleno corazon de Port d'Alcudia, este club apuesta por una programacion musical de calidad con residentes que dominan la pista y artistas invitados que elevan cada noche a otro nivel.</p>

<p>La sala combina un diseno contemporaneo y elegante con un sistema de sonido envolvente que hace justicia a cada genero musical. Desde sesiones de musica electronica con matices de deep house y tech house hasta noches de exitos comerciales donde la pista no para, Outxide ofrece una variedad que pocos clubs en la zona pueden igualar.</p>

<p>Entre sus formatos mas populares destacan las series DISCO FEVER, una celebracion del sonido disco y funk con un toque moderno, y las noches HYPE, donde la musica urbana, el reggaeton y los ritmos latinos se apoderan de la pista. Cada sesion esta disenada para crear una atmosfera unica donde la musica es la verdadera protagonista.</p>

<p>Si quieres conocer mas sobre el club y su propuesta, te recomendamos leer nuestra <a href="/blog/outxide-club-discoteca-alcudia-mallorca">guia completa sobre Outxide Club</a>.</p>

<h2>Fiestas tematicas en Alcudia: noches que no se repiten</h2>

<p>Una de las grandes senales de identidad de la vida nocturna en Alcudia son las fiestas tematicas. En <a href="/outxide">Outxide Club</a>, cada fin de semana trae consigo un concepto diferente. No se trata simplemente de cambiar la decoracion: la tematica define la musica, la estetica visual, la iluminacion y toda la experiencia sensorial del evento.</p>

<p>Desde noches de neon donde la luz ultravioleta transforma la sala en un escenario futurista, hasta eventos de inspiracion tropical con ritmos afrobeat y dancehall, pasando por celebraciones especiales en fechas senaladas del calendario, la programacion esta pensada para que cada visita sea diferente a la anterior.</p>

<p>Estas fiestas tematicas atraen tanto a turistas internacionales como a residentes locales, creando una mezcla de publico que aporta una energia unica. Puedes consultar nuestra seleccion de las <a href="/blog/mejores-discotecas-clubs-alcudia">mejores discotecas y clubs en Alcudia</a> para descubrir mas opciones nocturnas.</p>

<h2>Pre-party en Enjoy Terrace: donde la noche comienza</h2>

<p>Toda gran noche necesita un gran comienzo, y en Alcudia ese lugar es <a href="/enjoy">Enjoy Terrace</a>. Abierta todos los dias desde las 17:00, esta cocteleria es el punto de encuentro perfecto para prepararse antes de una sesion en Outxide. Con una carta de cocktails de autor, una seleccion de shisha premium y musica chill que marca el ritmo de la puesta de sol, Enjoy Terrace ofrece la transicion ideal entre la playa y la discoteca.</p>

<p>El ambiente es relajado pero sofisticado, con una terraza que invita a quedarse mientras el cielo de Alcudia se tine de naranja y rosa. Es el lugar donde los planes de la noche toman forma, donde los grupos se reunen y donde la anticipacion de lo que viene despues se convierte en parte de la experiencia.</p>

<p>Y si antes de salir prefieres disfrutar de una buena cena, <a href="/hiru">Hiru Food &amp; Drinks</a> te ofrece cocina mallorquina de producto y tradicion a pocos pasos de distancia. Carnes a la brasa, arroces y pescados frescos: la combinacion perfecta antes de una noche de musica.</p>

<h2>Como conseguir entradas y horarios</h2>

<p>Outxide Club abre sus puertas jueves, viernes y sabado a partir de las 23:00. Para garantizar tu entrada y evitar colas, te recomendamos comprar tus tickets con antelacion a traves de FourVenues, la plataforma oficial de venta de entradas del club. Alli encontraras tambien informacion actualizada sobre los proximos eventos, artistas confirmados y noches especiales.</p>

<p>Planificar con antelacion es especialmente importante durante los meses de julio y agosto, cuando la demanda es mas alta y algunas noches especiales pueden agotar entradas. Si quieres ideas para organizar tu plan completo, echa un vistazo a nuestra <a href="/blog/plan-nocturno-port-alcudia-mallorca">guia de plan nocturno en Port d'Alcudia</a>.</p>

<h2>Consejos para disfrutar de la musica en Alcudia al maximo</h2>

<p>Para aprovechar al maximo las noches de musica en vivo, DJ sets y fiestas tematicas en Alcudia, ten en cuenta estos consejos practicos:</p>

<p>Llega a <a href="/enjoy">Enjoy Terrace</a> sobre las 20:00 o 21:00 para disfrutar del atardecer con un cocktail antes de que la noche coja ritmo. Compra tus entradas para <a href="/outxide">Outxide Club</a> online con antelacion, especialmente en fin de semana. Consulta las redes sociales del club para conocer la tematica de cada noche y vestir acorde si asi lo deseas. El norte de Mallorca en verano tiene noches calidas, asi que la ropa ligera y comoda es siempre buena idea. Y recuerda: la zona de Av. Tuca concentra todo lo que necesitas para una noche completa, desde cena hasta la ultima cancion.</p>

<p>Alcudia te espera con la mejor musica del verano. Ya sea una sesion de musica electronica en la madrugada, una fiesta tematica irrepetible o un atardecer con musica chill en una terraza frente al mar, aqui encontraras tu noche perfecta.</p>`,
      en: `<p>Alcudia has established itself as one of Mallorca's most vibrant destinations after dark. Every summer, thousands of visitors travel to the north of the island seeking unforgettable nights filled with live music, world-class DJ sessions, and themed parties you will not find anywhere else in the Mediterranean. If you are planning your trip and want to know where to enjoy the best music in Alcudia, this guide is for you.</p>

<h2>The Alcudia music scene: far more than sun and beach tourism</h2>

<p>Port d'Alcudia has evolved dramatically in recent years. What was once a destination known exclusively for its white sand beaches and turquoise waters now offers a nightlife scene that rivals the best European destinations. The area features venues that invest in curated musical experiences, professional sound systems, cutting-edge lighting, and programming that spans house, techno, commercial hits, reggaeton, and themed festivals.</p>

<p>At the heart of this transformation is <a href="/outxide">Outxide Club</a>, the benchmark nightclub in northern Mallorca. Alongside it, <a href="/enjoy">Enjoy Terrace</a> completes the experience with signature cocktails and the perfect atmosphere to start your night, while <a href="/hiru">Hiru Food &amp; Drinks</a> brings the gastronomic element with traditional Mallorcan grill cuisine.</p>

<h2>DJ sessions at Outxide Club: the sound of northern Mallorca</h2>

<p>If you are looking for DJ sets in Alcudia that are truly worth your time, <a href="/outxide">Outxide Club</a> is your destination. Located at Av. Tuca, 1, in the heart of Port d'Alcudia, this club delivers quality music programming with resident DJs who command the dance floor and guest artists who take each night to another level.</p>

<p>The venue combines contemporary, sleek design with an immersive sound system that does justice to every genre. From electronic music sessions with deep house and tech house nuances to commercial hit nights where the dance floor never stops, Outxide offers a variety that few clubs in the area can match.</p>

<p>Among its most popular formats are the DISCO FEVER series, a celebration of disco and funk sound with a modern twist, and the HYPE nights, where urban music, reggaeton, and Latin rhythms take over the floor. Every session is designed to create a unique atmosphere where the music is the true protagonist.</p>

<p>For a deeper look at the club and everything it has to offer, we recommend reading our <a href="/blog/outxide-club-discoteca-alcudia-mallorca">complete guide to Outxide Club</a>.</p>

<h2>Themed parties in Alcudia: nights that never repeat</h2>

<p>One of the defining features of nightlife in Alcudia is the themed party culture. At <a href="/outxide">Outxide Club</a>, each weekend brings a different concept. This is not simply about changing the decoration: the theme defines the music, the visual aesthetic, the lighting, and the entire sensory experience of the event.</p>

<p>From neon nights where ultraviolet light transforms the venue into a futuristic stage, to tropical-inspired events with afrobeat and dancehall rhythms, to special celebrations on key calendar dates, the programming is designed to ensure each visit feels different from the last.</p>

<p>These themed parties attract international tourists and local residents alike, creating a blend of audiences that generates a unique energy. You can check our selection of the <a href="/blog/mejores-discotecas-clubs-alcudia">best clubs and discos in Alcudia</a> to discover more nightlife options.</p>

<h2>Pre-party at Enjoy Terrace: where the night begins</h2>

<p>Every great night needs a great beginning, and in Alcudia that place is <a href="/enjoy">Enjoy Terrace</a>. Open daily from 17:00, this cocktail bar is the perfect meeting point to get ready before a session at Outxide. With a menu of signature cocktails, a selection of premium shisha, and chill music that sets the pace for the sunset, Enjoy Terrace offers the ideal transition from the beach to the club.</p>

<p>The atmosphere is relaxed yet sophisticated, with a terrace that invites you to stay while the Alcudia sky turns orange and pink. It is the place where the night's plans take shape, where groups gather, and where the anticipation of what comes next becomes part of the experience itself.</p>

<p>And if you prefer to enjoy a proper dinner before heading out, <a href="/hiru">Hiru Food &amp; Drinks</a> offers traditional Mallorcan cuisine just steps away. Grilled meats, rice dishes, and fresh seafood: the perfect combination before a night of music.</p>

<h2>How to get tickets and opening hours</h2>

<p>Outxide Club opens its doors on Thursday, Friday, and Saturday from 23:00. To guarantee your entry and avoid queues, we recommend purchasing your tickets in advance through FourVenues, the official ticketing platform for the club. There you will also find updated information about upcoming events, confirmed artists, and special nights.</p>

<p>Planning ahead is especially important during July and August, when demand is at its peak and some special nights can sell out. If you want ideas for organising your complete evening, take a look at our <a href="/blog/plan-nocturno-port-alcudia-mallorca">nightlife plan guide for Port d'Alcudia</a>.</p>

<h2>Tips for making the most of live music in Alcudia</h2>

<p>To get the most out of the live music nights, DJ sets, and themed parties in Alcudia, keep these practical tips in mind:</p>

<p>Arrive at <a href="/enjoy">Enjoy Terrace</a> around 20:00 or 21:00 to enjoy the sunset with a cocktail before the night picks up pace. Buy your tickets for <a href="/outxide">Outxide Club</a> online in advance, especially on weekends. Check the club's social media to find out the theme of each night and dress accordingly if you wish. Northern Mallorca enjoys warm summer evenings, so light and comfortable clothing is always a good idea. And remember: the Av. Tuca area has everything you need for a complete night out, from dinner to the last track.</p>

<p>Alcudia is waiting for you with the best music of the summer. Whether it is an electronic music session in the early hours, an unrepeatable themed party, or a sunset with chill music on a terrace overlooking the sea, you will find your perfect night here.</p>`,
      de: `<p>Alcudia hat sich als eines der lebendigsten Reiseziele Mallorcas nach Sonnenuntergang etabliert. Jeden Sommer reisen Tausende von Besuchern in den Norden der Insel, auf der Suche nach unvergesslichen Naechten mit Live-Musik, erstklassigen DJ-Sessions und Themenpartys, die man nirgendwo sonst im Mittelmeerraum findet. Wenn du deinen Trip planst und wissen willst, wo du die beste Musik in Alcudia erleben kannst, ist dieser Guide genau richtig.</p>

<h2>Die Musikszene in Alcudia: weit mehr als Strand und Sonne</h2>

<p>Port d'Alcudia hat sich in den letzten Jahren enorm weiterentwickelt. Was einst ein Reiseziel war, das ausschliesslich fuer seine weissen Sandstraende und tuerkisfarbenes Wasser bekannt war, bietet heute ein Nachtleben, das mit den besten europaeischen Destinationen mithalten kann. Die Gegend verfuegt ueber Locations, die auf kuratierte Musikerlebnisse setzen, mit professionellen Soundsystemen, modernster Beleuchtung und einem Programm, das von House und Techno ueber kommerzielle Hits bis hin zu Reggaeton und Themenpartys reicht.</p>

<p>Im Zentrum dieser Verwandlung steht der <a href="/outxide">Outxide Club</a>, der Referenz-Nachtclub im Norden Mallorcas. Daneben vervollstaendigt die <a href="/enjoy">Enjoy Terrace</a> das Erlebnis mit Signature-Cocktails und der perfekten Atmosphaere, um den Abend zu beginnen, waehrend <a href="/hiru">Hiru Food &amp; Drinks</a> die gastronomische Komponente mit traditioneller mallorquinischer Grillkueche beisteuert.</p>

<h2>DJ-Sessions im Outxide Club: der Sound des Nordens von Mallorca</h2>

<p>Wenn du DJ-Sets in Alcudia suchst, die sich wirklich lohnen, ist der <a href="/outxide">Outxide Club</a> dein Ziel. An der Av. Tuca, 1, im Herzen von Port d'Alcudia gelegen, bietet dieser Club hochwertige Musikprogrammierung mit Resident-DJs, die die Tanzflaeche beherrschen, und Gastartisten, die jede Nacht auf ein neues Niveau heben.</p>

<p>Die Location verbindet zeitgenoessisches, elegantes Design mit einem immersiven Soundsystem, das jedem Genre gerecht wird. Von elektronischen Musiksessions mit Deep-House- und Tech-House-Nuancen bis hin zu kommerziellen Hit-Naechten, in denen die Tanzflaeche nie stillsteht, bietet Outxide eine Vielfalt, die nur wenige Clubs in der Region erreichen koennen.</p>

<p>Zu den beliebtesten Formaten gehoeren die DISCO FEVER-Reihe, eine Feier des Disco- und Funk-Sounds mit modernem Touch, und die HYPE-Naechte, bei denen urbane Musik, Reggaeton und lateinamerikanische Rhythmen die Tanzflaeche uebernehmen. Jede Session ist darauf ausgelegt, eine einzigartige Atmosphaere zu schaffen, in der die Musik die wahre Hauptrolle spielt.</p>

<p>Fuer einen tieferen Einblick in den Club empfehlen wir unseren <a href="/blog/outxide-club-discoteca-alcudia-mallorca">kompletten Guide zum Outxide Club</a>.</p>

<h2>Themenpartys in Alcudia: Naechte, die sich nie wiederholen</h2>

<p>Eines der grossen Markenzeichen des Nachtlebens in Alcudia sind die Themenpartys. Im <a href="/outxide">Outxide Club</a> bringt jedes Wochenende ein anderes Konzept mit sich. Es geht nicht einfach nur darum, die Dekoration zu aendern: Das Thema bestimmt die Musik, die visuelle Aesthetik, die Beleuchtung und das gesamte sensorische Erlebnis des Events.</p>

<p>Von Neon-Naechten, in denen UV-Licht die Location in eine futuristische Buehne verwandelt, ueber tropisch inspirierte Events mit Afrobeat- und Dancehall-Rhythmen bis hin zu besonderen Feiern an wichtigen Kalenderdaten ist das Programm so gestaltet, dass sich jeder Besuch anders anfuehlt als der vorherige.</p>

<p>Diese Themenpartys ziehen sowohl internationale Touristen als auch Einheimische an und schaffen eine Mischung aus Publikum, die eine einzigartige Energie erzeugt. In unserer Auswahl der <a href="/blog/mejores-discotecas-clubs-alcudia">besten Clubs und Diskotheken in Alcudia</a> findest du weitere Optionen fuer dein Nachtleben.</p>

<h2>Pre-Party auf der Enjoy Terrace: wo die Nacht beginnt</h2>

<p>Jede grossartige Nacht braucht einen grossartigen Anfang, und in Alcudia ist dieser Ort die <a href="/enjoy">Enjoy Terrace</a>. Taeglich ab 17:00 Uhr geoeffnet, ist diese Cocktailbar der perfekte Treffpunkt, um sich auf eine Session im Outxide vorzubereiten. Mit einer Karte voller Signature-Cocktails, einer Auswahl an Premium-Shisha und Chill-Musik, die den Rhythmus zum Sonnenuntergang vorgibt, bietet die Enjoy Terrace den idealen Uebergang vom Strand zum Club.</p>

<p>Die Atmosphaere ist entspannt und dennoch anspruchsvoll, mit einer Terrasse, die zum Verweilen einlaedt, waehrend sich der Himmel ueber Alcudia in Orange und Rosa faerbt. Es ist der Ort, an dem die Plaene fuer die Nacht entstehen, an dem sich Gruppen treffen und an dem die Vorfreude auf das, was kommt, Teil des Erlebnisses wird.</p>

<p>Und wenn du vor dem Ausgehen lieber ein gutes Abendessen geniessen moechtest, bietet dir <a href="/hiru">Hiru Food &amp; Drinks</a> traditionelle mallorquinische Kueche in unmittelbarer Naehe. Gegrilltes Fleisch, Reisgerichte und frischer Fisch: die perfekte Kombination vor einer Nacht voller Musik.</p>

<h2>Tickets und Oeffnungszeiten</h2>

<p>Der Outxide Club oeffnet seine Tueren donnerstags, freitags und samstags ab 23:00 Uhr. Um deinen Eintritt zu sichern und Warteschlangen zu vermeiden, empfehlen wir, deine Tickets im Voraus ueber FourVenues zu kaufen, die offizielle Ticketing-Plattform des Clubs. Dort findest du auch aktuelle Informationen ueber kommende Events, bestaetigte Kuenstler und besondere Naechte.</p>

<p>Vorausplanung ist besonders wichtig in den Monaten Juli und August, wenn die Nachfrage am hoechsten ist und einige Sonderveranstaltungen ausverkauft sein koennen. Wenn du Ideen fuer die Planung deines kompletten Abends suchst, wirf einen Blick auf unseren <a href="/blog/plan-nocturno-port-alcudia-mallorca">Nachtleben-Guide fuer Port d'Alcudia</a>.</p>

<h2>Tipps fuer das beste Musikerlebnis in Alcudia</h2>

<p>Um das Beste aus den Live-Musik-Naechten, DJ-Sets und Themenpartys in Alcudia herauszuholen, beachte diese praktischen Tipps:</p>

<p>Komm gegen 20:00 oder 21:00 Uhr zur <a href="/enjoy">Enjoy Terrace</a>, um den Sonnenuntergang bei einem Cocktail zu geniessen, bevor die Nacht Fahrt aufnimmt. Kaufe deine Tickets fuer den <a href="/outxide">Outxide Club</a> online im Voraus, besonders am Wochenende. Pruefe die Social-Media-Kanaele des Clubs, um das Thema jeder Nacht zu erfahren und dich entsprechend zu kleiden, wenn du moechtest. Der Norden Mallorcas bietet warme Sommerabende, daher ist leichte und bequeme Kleidung immer eine gute Idee. Und denk daran: Die Gegend rund um die Av. Tuca bietet alles, was du fuer eine komplette Nacht brauchst, vom Abendessen bis zum letzten Track.</p>

<p>Alcudia erwartet dich mit der besten Musik des Sommers. Ob eine elektronische Musiksession in den fruehen Morgenstunden, eine einmalige Themenparty oder ein Sonnenuntergang mit Chill-Musik auf einer Terrasse mit Meerblick, hier findest du deine perfekte Nacht.</p>`,
      fr: `<p>Alcudia s'est imposee comme l'une des destinations les plus vibrantes de Majorque apres le coucher du soleil. Chaque ete, des milliers de visiteurs se rendent dans le nord de l'ile a la recherche de nuits inoubliables rythmees par de la musique live, des sessions DJ de premier plan et des soirees a theme introuvables ailleurs en Mediterranee. Si vous planifiez votre voyage et souhaitez savoir ou profiter de la meilleure musique a Alcudia, ce guide est fait pour vous.</p>

<h2>La scene musicale d'Alcudia : bien plus que du tourisme balneaire</h2>

<p>Port d'Alcudia a considerablement evolue ces dernieres annees. Ce qui etait autrefois une destination connue uniquement pour ses plages de sable blanc et ses eaux turquoise offre desormais une vie nocturne a la hauteur des meilleures destinations europeennes. La zone compte des etablissements qui misent sur des experiences musicales soignees, avec des systemes son professionnels, un eclairage de derniere generation et une programmation qui couvre le house, la techno, les tubes commerciaux, le reggaeton et les festivals a theme.</p>

<p>Au coeur de cette transformation se trouve l'<a href="/outxide">Outxide Club</a>, la discotheque de reference du nord de Majorque. A ses cotes, l'<a href="/enjoy">Enjoy Terrace</a> complete l'experience avec des cocktails signatures et l'ambiance parfaite pour commencer la soiree, tandis que <a href="/hiru">Hiru Food &amp; Drinks</a> apporte la dimension gastronomique avec une cuisine majorquine au grill.</p>

<h2>Sessions DJ a l'Outxide Club : le son du nord de Majorque</h2>

<p>Si vous cherchez des DJ sets a Alcudia qui valent vraiment le detour, l'<a href="/outxide">Outxide Club</a> est votre destination. Situe Av. Tuca, 1, au coeur de Port d'Alcudia, ce club propose une programmation musicale de qualite avec des DJ residents qui maitrisent le dancefloor et des artistes invites qui elevent chaque soiree a un autre niveau.</p>

<p>L'espace allie un design contemporain et elegant a un systeme son immersif qui rend justice a chaque genre musical. Des sessions de musique electronique aux nuances deep house et tech house jusqu'aux soirees de tubes commerciaux ou le dancefloor ne desemplit pas, Outxide offre une variete que peu de clubs de la region peuvent egaler.</p>

<p>Parmi ses formats les plus populaires figurent les soirees DISCO FEVER, une celebration du son disco et funk avec une touche moderne, et les nuits HYPE, ou la musique urbaine, le reggaeton et les rythmes latinos prennent possession de la piste. Chaque session est concue pour creer une ambiance unique ou la musique est la veritable star.</p>

<p>Pour en savoir plus sur le club et son offre, nous vous recommandons de lire notre <a href="/blog/outxide-club-discoteca-alcudia-mallorca">guide complet de l'Outxide Club</a>.</p>

<h2>Soirees a theme a Alcudia : des nuits qui ne se repetent jamais</h2>

<p>L'un des grands signes distinctifs de la vie nocturne a Alcudia est la culture des soirees a theme. A l'<a href="/outxide">Outxide Club</a>, chaque week-end apporte un concept different. Il ne s'agit pas simplement de changer la decoration : le theme definit la musique, l'esthetique visuelle, l'eclairage et toute l'experience sensorielle de l'evenement.</p>

<p>Des soirees neon ou la lumiere ultraviolette transforme la salle en une scene futuriste, aux evenements d'inspiration tropicale avec des rythmes afrobeat et dancehall, en passant par des celebrations speciales aux dates cles du calendrier, la programmation est pensee pour que chaque visite soit differente de la precedente.</p>

<p>Ces soirees a theme attirent aussi bien les touristes internationaux que les residents locaux, creant un melange de publics qui genere une energie unique. Decouvrez notre selection des <a href="/blog/mejores-discotecas-clubs-alcudia">meilleurs clubs et discotheques a Alcudia</a> pour explorer d'autres options nocturnes.</p>

<h2>Pre-party a l'Enjoy Terrace : la ou la nuit commence</h2>

<p>Chaque grande soiree a besoin d'un grand debut, et a Alcudia ce lieu est l'<a href="/enjoy">Enjoy Terrace</a>. Ouverte tous les jours des 17h00, cette cocteleria est le point de rencontre ideal pour se preparer avant une session a l'Outxide. Avec une carte de cocktails signatures, une selection de chicha premium et une musique chill qui accompagne le coucher du soleil, l'Enjoy Terrace offre la transition ideale entre la plage et le club.</p>

<p>L'ambiance est detendue mais sophistiquee, avec une terrasse qui invite a rester tandis que le ciel d'Alcudia se pare d'orange et de rose. C'est l'endroit ou les plans de la soiree prennent forme, ou les groupes se retrouvent et ou l'anticipation de ce qui va suivre fait partie integrante de l'experience.</p>

<p>Et si vous preferez savourer un bon diner avant de sortir, <a href="/hiru">Hiru Food &amp; Drinks</a> vous propose une cuisine majorquine traditionnelle a quelques pas. Viandes grillees, riz et poissons frais : la combinaison parfaite avant une nuit de musique.</p>

<h2>Comment obtenir des billets et horaires</h2>

<p>L'Outxide Club ouvre ses portes le jeudi, vendredi et samedi a partir de 23h00. Pour garantir votre entree et eviter les files d'attente, nous vous recommandons d'acheter vos billets a l'avance via FourVenues, la plateforme officielle de billetterie du club. Vous y trouverez egalement des informations actualisees sur les prochains evenements, les artistes confirmes et les soirees speciales.</p>

<p>Planifier a l'avance est particulierement important pendant les mois de juillet et aout, lorsque la demande est la plus forte et que certaines soirees speciales peuvent afficher complet. Si vous cherchez des idees pour organiser votre soiree complete, consultez notre <a href="/blog/plan-nocturno-port-alcudia-mallorca">guide du plan nocturne a Port d'Alcudia</a>.</p>

<h2>Conseils pour profiter au maximum de la musique a Alcudia</h2>

<p>Pour tirer le meilleur des nuits de musique live, DJ sets et soirees a theme a Alcudia, gardez ces conseils pratiques en tete :</p>

<p>Arrivez a l'<a href="/enjoy">Enjoy Terrace</a> vers 20h00 ou 21h00 pour profiter du coucher de soleil avec un cocktail avant que la nuit ne batte son plein. Achetez vos billets pour l'<a href="/outxide">Outxide Club</a> en ligne a l'avance, surtout le week-end. Consultez les reseaux sociaux du club pour connaitre le theme de chaque soiree et vous habiller en consequence si vous le souhaitez. Le nord de Majorque offre des soirees d'ete chaudes, alors des vetements legers et confortables sont toujours une bonne idee. Et n'oubliez pas : le quartier autour de l'Av. Tuca concentre tout ce dont vous avez besoin pour une nuit complete, du diner jusqu'au dernier morceau.</p>

<p>Alcudia vous attend avec la meilleure musique de l'ete. Qu'il s'agisse d'une session de musique electronique au petit matin, d'une soiree a theme unique ou d'un coucher de soleil accompagne de musique chill sur une terrasse face a la mer, vous trouverez ici votre nuit parfaite.</p>`,
      it: `<p>Alcudia si e affermata come una delle destinazioni piu vibranti di Maiorca dopo il tramonto. Ogni estate, migliaia di visitatori raggiungono il nord dell'isola alla ricerca di notti indimenticabili con musica dal vivo, sessioni DJ di primo livello e feste a tema introvabili altrove nel Mediterraneo. Se stai pianificando il tuo viaggio e vuoi sapere dove goderti la migliore musica ad Alcudia, questa guida fa per te.</p>

<h2>La scena musicale di Alcudia: molto piu del turismo balneare</h2>

<p>Port d'Alcudia si e evoluta notevolmente negli ultimi anni. Quella che un tempo era una destinazione conosciuta esclusivamente per le sue spiagge di sabbia bianca e le acque turchesi, oggi offre una vita notturna all'altezza delle migliori destinazioni europee. La zona conta su locali che puntano su esperienze musicali curate, con impianti audio professionali, illuminazione di ultima generazione e una programmazione che spazia dall'house alla techno, dai successi commerciali al reggaeton fino ai festival a tema.</p>

<p>Al centro di questa trasformazione si trova l'<a href="/outxide">Outxide Club</a>, la discoteca di riferimento nel nord di Maiorca. Accanto ad esso, l'<a href="/enjoy">Enjoy Terrace</a> completa l'esperienza con cocktail d'autore e l'atmosfera perfetta per iniziare la serata, mentre <a href="/hiru">Hiru Food &amp; Drinks</a> aggiunge la componente gastronomica con cucina maiorchina alla brace.</p>

<h2>DJ set all'Outxide Club: il suono del nord di Maiorca</h2>

<p>Se cerchi DJ set ad Alcudia che valgano davvero la pena, l'<a href="/outxide">Outxide Club</a> e la tua destinazione. Situato in Av. Tuca, 1, nel cuore di Port d'Alcudia, questo club propone una programmazione musicale di qualita con DJ resident che dominano la pista e artisti ospiti che portano ogni serata a un livello superiore.</p>

<p>Lo spazio combina un design contemporaneo ed elegante con un impianto audio immersivo che rende giustizia a ogni genere musicale. Dalle sessioni di musica elettronica con sfumature deep house e tech house alle serate di successi commerciali dove la pista non si ferma mai, Outxide offre una varieta che pochi club della zona possono eguagliare.</p>

<p>Tra i formati piu apprezzati spiccano le serate DISCO FEVER, una celebrazione del sound disco e funk con un tocco moderno, e le notti HYPE, dove la musica urbana, il reggaeton e i ritmi latini si impossessano della pista. Ogni sessione e progettata per creare un'atmosfera unica in cui la musica e la vera protagonista.</p>

<p>Per uno sguardo approfondito sul club e sulla sua proposta, ti consigliamo di leggere la nostra <a href="/blog/outxide-club-discoteca-alcudia-mallorca">guida completa all'Outxide Club</a>.</p>

<h2>Feste a tema ad Alcudia: notti che non si ripetono mai</h2>

<p>Uno dei grandi tratti distintivi della vita notturna ad Alcudia sono le feste a tema. All'<a href="/outxide">Outxide Club</a>, ogni fine settimana porta con se un concept diverso. Non si tratta semplicemente di cambiare la decorazione: il tema definisce la musica, l'estetica visiva, l'illuminazione e l'intera esperienza sensoriale dell'evento.</p>

<p>Dalle serate neon in cui la luce ultravioletta trasforma il locale in un palcoscenico futuristico, agli eventi di ispirazione tropicale con ritmi afrobeat e dancehall, fino alle celebrazioni speciali nelle date chiave del calendario, la programmazione e pensata perche ogni visita sia diversa dalla precedente.</p>

<p>Queste feste a tema attraggono sia turisti internazionali che residenti locali, creando un mix di pubblico che genera un'energia unica. Scopri la nostra selezione dei <a href="/blog/mejores-discotecas-clubs-alcudia">migliori club e discoteche di Alcudia</a> per esplorare altre opzioni notturne.</p>

<h2>Pre-party all'Enjoy Terrace: dove la notte ha inizio</h2>

<p>Ogni grande serata ha bisogno di un grande inizio, e ad Alcudia quel posto e l'<a href="/enjoy">Enjoy Terrace</a>. Aperta tutti i giorni dalle 17:00, questa cocktail bar e il punto di ritrovo perfetto per prepararsi prima di una sessione all'Outxide. Con un menu di cocktail d'autore, una selezione di shisha premium e musica chill che accompagna il tramonto, l'Enjoy Terrace offre la transizione ideale dalla spiaggia al club.</p>

<p>L'atmosfera e rilassata ma sofisticata, con una terrazza che invita a restare mentre il cielo di Alcudia si tinge di arancione e rosa. E il luogo dove prendono forma i piani della serata, dove i gruppi si riuniscono e dove l'attesa di cio che verra diventa parte dell'esperienza stessa.</p>

<p>E se prima di uscire preferisci goderti una buona cena, <a href="/hiru">Hiru Food &amp; Drinks</a> ti propone cucina maiorchina tradizionale a pochi passi di distanza. Carni alla brace, riso e pesce fresco: la combinazione perfetta prima di una notte di musica.</p>

<h2>Come acquistare i biglietti e orari di apertura</h2>

<p>L'Outxide Club apre le sue porte il giovedi, venerdi e sabato dalle 23:00. Per garantirti l'ingresso ed evitare code, ti consigliamo di acquistare i biglietti in anticipo tramite FourVenues, la piattaforma ufficiale di biglietteria del club. Li troverai anche informazioni aggiornate sui prossimi eventi, gli artisti confermati e le serate speciali.</p>

<p>Pianificare in anticipo e particolarmente importante nei mesi di luglio e agosto, quando la domanda e piu alta e alcune serate speciali possono esaurirsi. Se cerchi idee per organizzare la tua serata completa, dai un'occhiata alla nostra <a href="/blog/plan-nocturno-port-alcudia-mallorca">guida al piano notturno a Port d'Alcudia</a>.</p>

<h2>Consigli per vivere al meglio la musica ad Alcudia</h2>

<p>Per sfruttare al massimo le serate di musica dal vivo, DJ set e feste a tema ad Alcudia, tieni a mente questi consigli pratici:</p>

<p>Arriva all'<a href="/enjoy">Enjoy Terrace</a> verso le 20:00 o le 21:00 per goderti il tramonto con un cocktail prima che la notte entri nel vivo. Acquista i biglietti per l'<a href="/outxide">Outxide Club</a> online in anticipo, soprattutto nel fine settimana. Controlla i social media del club per scoprire il tema di ogni serata e vestirti di conseguenza se lo desideri. Il nord di Maiorca gode di calde serate estive, quindi abbigliamento leggero e comodo e sempre una buona idea. E ricorda: la zona di Av. Tuca ha tutto cio che ti serve per una serata completa, dalla cena fino all'ultimo brano.</p>

<p>Alcudia ti aspetta con la migliore musica dell'estate. Che si tratti di una sessione di musica elettronica nelle prime ore del mattino, di una festa a tema irripetibile o di un tramonto con musica chill su una terrazza fronte mare, qui troverai la tua serata perfetta.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    image: "/images/outxide/DSCF8103-9.jpg",
    tags: ["nightlife", "music", "dj", "outxide", "enjoy", "alcudia", "mallorca"],
    venue: "outxide",
    readingTime: 7,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Returns up to `limit` related posts scored by shared tags + same venue.
 * Excludes the current post from results.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const currentTags = new Set(current.tags);

  return blogPosts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = p.tags.filter((t) => currentTags.has(t)).length;
      if (current.venue && p.venue === current.venue) score += 2;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, limit)
    .map((r) => r.post);
}
