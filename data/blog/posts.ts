export interface BlogLocalizedText {
  es: string;
  en: string;
  de?: string;
  fr?: string;
  it?: string;
}

export interface HowToStep {
  name: BlogLocalizedText;
  text: BlogLocalizedText;
  url?: string;
}

/** Pregunta y respuesta de la sección FAQ visible del post (contenido, para
 *  People Also Ask / fragmentos destacados; el schema FAQPage es secundario). */
export interface BlogFaqItem {
  question: BlogLocalizedText;
  answer: BlogLocalizedText;
}

export interface BlogPost {
  slug: string;
  title: BlogLocalizedText;
  excerpt: BlogLocalizedText;
  content: BlogLocalizedText;
  author: string;
  date: string;
  /** Fecha de última edición real (ISO); si falta, se usa date. */
  updated?: string;
  image: string;
  tags: string[];
  venue?: "enjoy" | "outxide" | "hiru" | "general";
  readingTime: number;
  howToSteps?: HowToStep[];
  faq?: BlogFaqItem[];
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
    slug: "atardecer-puesta-sol-alcudia-donde-ver",
    title: {
      es: "Dónde ver el atardecer en Alcúdia: los mejores puntos (con cóctel en la mano)",
      en: "Where to Watch the Sunset in Alcúdia: The Best Spots (Cocktail in Hand)",
      de: "Wo man in Alcúdia den Sonnenuntergang sieht: die besten Spots (mit Cocktail in der Hand)",
      fr: "Où voir le coucher de soleil à Alcúdia : les meilleurs spots (un cocktail à la main)",
      it: "Dove vedere il tramonto ad Alcúdia: i posti migliori (con un cocktail in mano)",
    },
    excerpt: {
      es: "Guía local de los mejores rincones para ver la puesta de sol en Port d'Alcúdia, a qué hora se pone el sol cada mes y dónde brindar con un cóctel de autor frente a la bahía.",
      en: "A local guide to the best spots for the sunset in Port d'Alcúdia, what time the sun sets each month, and where to toast with a signature cocktail facing the bay.",
      de: "Lokaler Guide zu den besten Plätzen für den Sonnenuntergang in Port d'Alcúdia, wann die Sonne jeden Monat untergeht und wo man mit einem Signature-Cocktail an der Bucht anstößt.",
      fr: "Guide local des meilleurs coins pour le coucher de soleil à Port d'Alcúdia, l'heure du coucher du soleil chaque mois et où trinquer avec un cocktail signature face à la baie.",
      it: "Guida locale ai posti migliori per il tramonto a Port d'Alcúdia, a che ora tramonta il sole ogni mese e dove brindare con un cocktail d'autore davanti alla baia.",
    },
    content: {
      es: `<p>El norte de Mallorca guarda algunos de los atardeceres más bonitos de la isla, y <strong>Port d'Alcúdia</strong> es uno de esos sitios donde el cielo se tiñe de naranja sobre una bahía enorme y tranquila. Si buscas dónde ver la puesta de sol en Alcúdia con calma, buena vista y, mejor aún, con un cóctel en la mano, esta guía local te lleva a los mejores puntos y te dice a qué hora se esconde el sol según el mes.</p><h2>Los mejores puntos para ver la puesta de sol en Port d'Alcúdia</h2><p>La <strong>bahía de Alcúdia</strong> es el gran escenario: mira hacia el sureste, así que el sol no cae directamente sobre el mar, sino que la luz se derrama sobre la sierra de Tramuntana a tu espalda, pintando el agua y la arena de tonos rosados y dorados. Es un atardecer suave, de colores largos, ideal para pasear sin prisa.</p><h3>Playa y paseo marítimo</h3><p>El <strong>paseo marítimo de Port d'Alcúdia</strong> y su playa de arena fina son el sitio más accesible y agradecido. La playa mira al este, por lo que al atardecer se queda en una luz cálida y serena, perfecta para las fotos y para ese último baño del día. Si quieres exprimir la tarde de playa antes del cóctel, echa un vistazo a nuestra <a href="/blog/playas-alcudia-guia-completa">guía completa de playas de Alcúdia</a>.</p><h3>Alcanada y su faro</h3><p>A pocos minutos, la zona de <strong>Alcanada</strong> ofrece una estampa más íntima: el pequeño <strong>islote con el faro</strong> frente a la costa es uno de los rincones más fotografiados del norte. Las rocas, los pinos y ese faro recortado contra el cielo hacen de la última hora un momento de postal, con mucha menos gente que en la playa principal.</p><h3>El casco antiguo y las murallas</h3><p>Si prefieres altura y piedra, las <strong>murallas medievales de Alcúdia</strong> y los miradores del casco antiguo regalan una perspectiva distinta, con la bahía a lo lejos y la luz dorada colándose entre las callejuelas históricas.</p><h2>El atardecer con cóctel en Enjoy Terrace</h2><p>Cuando el sol empieza a bajar, no hay mejor plan que subir el nivel del atardecer con una copa bien hecha. En <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1, Port d'Alcúdia) hemos hecho de esa hora nuestra especialidad: <strong>cócteles de autor</strong> y <strong>shisha premium</strong> en una terraza pensada para ver caer la tarde con estilo. No en vano nuestro lema es <em>"Where nights begin"</em>: aquí es donde arranca la noche en Alcúdia.</p><p>Abrimos <strong>a diario desde las 17:00</strong>, justo a tiempo para coger sitio antes de la hora mágica. Un mojito, un negroni de autor o algo de la carta de temporada, la brasa suave de la shisha y el cielo cambiando de color: ese es el atardecer que recomendamos. Si quieres ideas de combinaciones, lee nuestra guía de <a href="/blog/cocteles-shisha-terraza-alcudia">cócteles y shisha en terraza en Alcúdia</a>.</p><h2>¿A qué hora se pone el sol en Alcúdia? Mes a mes</h2><p>La hora de la puesta de sol cambia mucho a lo largo del año, así que conviene calcular bien para no perderte el momento. Estas son las horas aproximadas en Port d'Alcúdia:</p><ul><li><strong>Junio y julio:</strong> el sol se pone tarde, en torno a las <strong>21:00-21:15</strong>. Es la mejor época para un atardecer largo y cálido.</li><li><strong>Agosto:</strong> hacia las <strong>20:30-20:45</strong>, todavía con noches suaves.</li><li><strong>Mayo y septiembre:</strong> alrededor de las <strong>20:00</strong>, con temperaturas muy agradables.</li><li><strong>Abril y octubre:</strong> entre las <strong>19:00 y las 20:00</strong> según la semana.</li><li><strong>Invierno (noviembre a febrero):</strong> mucho antes, entre las <strong>17:30 y las 18:15</strong>.</li></ul><p>Un consejo local: llega al menos <strong>media hora antes</strong> del ocaso para disfrutar de la luz previa, que suele ser la más espectacular. En verano, eso significa reservar mesa en la terraza a partir de las 20:00-20:30.</p><h2>¿Qué hacer después del atardecer? Sigue la noche</h2><p>La gracia de Port d'Alcúdia es que el atardecer es solo el principio. Cuando cae la noche y apetece cambiar de ritmo, la fiesta continúa a pocos metros. En <a href="/outxide">Outxide Club</a> (misma ubicación, Av. Tucán 1) la noche sigue con techno, house y reggaetón, DJs internacionales y servicio VIP, de jueves a sábado desde las 23:00. Su lema lo dice todo: <em>"The night continues"</em>.</p><p>Y si el plan pide cena antes o después, la zona tiene opciones para todos los gustos: puedes ver más ideas en nuestra <a href="/blog/guia-vida-nocturna-alcudia">guía de vida nocturna de Alcúdia</a>. Entre atardecer, cóctel, cena y baile, Port d'Alcúdia es la alternativa tranquila y con estilo al bullicio de Magaluf o Playa de Palma, sin renunciar a una gran noche.</p><p>Así que ya sabes: elige tu punto favorito de la bahía, calcula la hora del ocaso según el mes y reserva tu sitio en la terraza. El mejor atardecer del norte de Mallorca te espera con una copa lista.</p>`,
      en: `<p>Northern Majorca holds some of the island's most beautiful sunsets, and <strong>Port d'Alcúdia</strong> is one of those places where the sky turns orange over a huge, calm bay. If you're looking for where to watch the sunset in Alcúdia in peace, with a great view and, even better, a cocktail in hand, this local guide takes you to the best spots and tells you exactly when the sun goes down each month.</p><h2>The best spots to watch the sunset in Port d'Alcúdia</h2><p>The <strong>Bay of Alcúdia</strong> is the great stage: it faces southeast, so the sun doesn't drop straight into the sea. Instead, the light spills over the Tramuntana mountains behind you, painting the water and sand in pink and gold. It's a soft sunset with long-lasting colours, perfect for an unhurried stroll.</p><h3>Beach and seafront promenade</h3><p>The <strong>Port d'Alcúdia seafront promenade</strong> and its fine-sand beach are the most accessible and rewarding option. The beach faces east, so at dusk it's bathed in warm, serene light, ideal for photos and for one last swim of the day. To make the most of a beach afternoon before your cocktail, take a look at our <a href="/blog/playas-alcudia-guia-completa">complete guide to Alcúdia's beaches</a>.</p><h3>Alcanada and its lighthouse</h3><p>Just minutes away, the <strong>Alcanada</strong> area offers a more intimate scene: the small <strong>islet with a lighthouse</strong> off the coast is one of the most photographed corners in the north. The rocks, the pines and that lighthouse silhouetted against the sky make the golden hour a postcard moment, with far fewer people than the main beach.</p><h3>The old town and its walls</h3><p>If you prefer height and stone, the <strong>medieval walls of Alcúdia</strong> and the old town's viewpoints offer a different perspective, with the bay in the distance and golden light slipping through the historic lanes.</p><h2>The sunset with a cocktail at Enjoy Terrace</h2><p>When the sun starts to dip, there's no better plan than to raise the level of your sunset with a well-made drink. At <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1, Port d'Alcúdia) we've made that hour our speciality: <strong>signature cocktails</strong> and <strong>premium shisha</strong> on a terrace designed for watching the evening fall in style. Our motto says it all: <em>"Where nights begin"</em>. This is where the night starts in Alcúdia.</p><p>We open <strong>daily from 5:00 pm</strong>, just in time to grab a spot before the magic hour. A mojito, a signature negroni or something from the seasonal menu, the gentle glow of shisha and a sky changing colour: that's the sunset we recommend. For pairing ideas, read our guide to <a href="/blog/cocteles-shisha-terraza-alcudia">cocktails and shisha on a terrace in Alcúdia</a>.</p><h2>What time does the sun set in Alcúdia? Month by month</h2><p>Sunset times change a lot over the year, so it's worth planning ahead so you don't miss the moment. These are the approximate times in Port d'Alcúdia:</p><ul><li><strong>June and July:</strong> the sun sets late, around <strong>9:00-9:15 pm</strong>. It's the best season for a long, warm sunset.</li><li><strong>August:</strong> around <strong>8:30-8:45 pm</strong>, still with mild evenings.</li><li><strong>May and September:</strong> around <strong>8:00 pm</strong>, with very pleasant temperatures.</li><li><strong>April and October:</strong> between <strong>7:00 and 8:00 pm</strong> depending on the week.</li><li><strong>Winter (November to February):</strong> much earlier, between <strong>5:30 and 6:15 pm</strong>.</li></ul><p>A local tip: arrive at least <strong>half an hour before</strong> sunset to enjoy the pre-sunset light, which is usually the most spectacular. In summer, that means booking a terrace table from 8:00-8:30 pm.</p><h2>What to do after the sunset? Keep the night going</h2><p>The beauty of Port d'Alcúdia is that the sunset is only the beginning. When night falls and you fancy changing the pace, the party continues just steps away. At <a href="/outxide">Outxide Club</a> (same location, Av. Tucán 1) the night carries on with techno, house and reggaeton, international DJs and VIP service, Thursday to Saturday from 11:00 pm. Its motto says it all: <em>"The night continues"</em>.</p><p>And if the plan calls for dinner before or after, the area has options for every taste: find more ideas in our <a href="/blog/guia-vida-nocturna-alcudia">Alcúdia nightlife guide</a>. Between sunset, cocktails, dinner and dancing, Port d'Alcúdia is the calm, stylish alternative to the buzz of Magaluf or Playa de Palma, without giving up a great night out.</p><p>So there you have it: pick your favourite spot on the bay, work out sunset time by the month and reserve your place on the terrace. The best sunset in northern Majorca is waiting for you, drink ready.</p>`,
      de: `<p>Der Norden Mallorcas beheimatet einige der schönsten Sonnenuntergänge der Insel, und <strong>Port d'Alcúdia</strong> ist einer jener Orte, an denen sich der Himmel über einer riesigen, ruhigen Bucht orange färbt. Wenn du in Alcúdia in aller Ruhe, mit toller Aussicht und – noch besser – mit einem Cocktail in der Hand den Sonnenuntergang sehen möchtest, führt dich dieser lokale Guide zu den besten Spots und verrät dir, wann die Sonne in jedem Monat untergeht.</p><h2>Die besten Plätze für den Sonnenuntergang in Port d'Alcúdia</h2><p>Die <strong>Bucht von Alcúdia</strong> ist die große Bühne: Sie liegt nach Südosten, sodass die Sonne nicht direkt ins Meer fällt, sondern das Licht über die Tramuntana-Berge hinter dir strömt und Wasser und Sand rosa und golden färbt. Ein sanfter Sonnenuntergang mit lang anhaltenden Farben, ideal für einen gemächlichen Spaziergang.</p><h3>Strand und Strandpromenade</h3><p>Die <strong>Strandpromenade von Port d'Alcúdia</strong> und ihr feiner Sandstrand sind die zugänglichste und dankbarste Option. Der Strand liegt nach Osten, sodass er in der Abenddämmerung in warmes, ruhiges Licht getaucht ist – ideal für Fotos und für das letzte Bad des Tages. Um einen Strandnachmittag vor dem Cocktail optimal zu nutzen, wirf einen Blick auf unseren <a href="/blog/playas-alcudia-guia-completa">kompletten Guide zu den Stränden von Alcúdia</a>.</p><h3>Alcanada und sein Leuchtturm</h3><p>Nur wenige Minuten entfernt bietet die Gegend von <strong>Alcanada</strong> ein intimeres Bild: Die kleine <strong>Insel mit dem Leuchtturm</strong> vor der Küste ist eine der meistfotografierten Ecken im Norden. Die Felsen, die Pinien und der Leuchtturm vor dem Himmel machen die goldene Stunde zum Postkartenmoment – mit deutlich weniger Menschen als am Hauptstrand.</p><h3>Die Altstadt und ihre Mauern</h3><p>Wenn du Höhe und Stein bevorzugst, bieten die <strong>mittelalterlichen Mauern von Alcúdia</strong> und die Aussichtspunkte der Altstadt eine andere Perspektive, mit der Bucht in der Ferne und goldenem Licht, das durch die historischen Gassen dringt.</p><h2>Der Sonnenuntergang mit Cocktail im Enjoy Terrace</h2><p>Wenn die Sonne zu sinken beginnt, gibt es keinen besseren Plan, als deinen Sonnenuntergang mit einem gut gemachten Drink zu veredeln. Im <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1, Port d'Alcúdia) haben wir diese Stunde zu unserer Spezialität gemacht: <strong>Signature-Cocktails</strong> und <strong>Premium-Shisha</strong> auf einer Terrasse, die zum stilvollen Betrachten des Abends gemacht ist. Unser Motto sagt alles: <em>"Where nights begin"</em>. Hier beginnt die Nacht in Alcúdia.</p><p>Wir öffnen <strong>täglich ab 17:00 Uhr</strong>, gerade rechtzeitig, um vor der magischen Stunde einen Platz zu ergattern. Ein Mojito, ein Signature-Negroni oder etwas von der saisonalen Karte, das sanfte Glühen der Shisha und ein Himmel, der die Farbe wechselt: Das ist der Sonnenuntergang, den wir empfehlen. Für Kombinationsideen lies unseren Guide zu <a href="/blog/cocteles-shisha-terraza-alcudia">Cocktails und Shisha auf der Terrasse in Alcúdia</a>.</p><h2>Wann geht in Alcúdia die Sonne unter? Monat für Monat</h2><p>Die Zeit des Sonnenuntergangs ändert sich im Laufe des Jahres stark, also lohnt es sich, gut zu planen, um den Moment nicht zu verpassen. Das sind die ungefähren Zeiten in Port d'Alcúdia:</p><ul><li><strong>Juni und Juli:</strong> Die Sonne geht spät unter, gegen <strong>21:00-21:15 Uhr</strong>. Das ist die beste Zeit für einen langen, warmen Sonnenuntergang.</li><li><strong>August:</strong> gegen <strong>20:30-20:45 Uhr</strong>, noch mit milden Abenden.</li><li><strong>Mai und September:</strong> gegen <strong>20:00 Uhr</strong>, bei sehr angenehmen Temperaturen.</li><li><strong>April und Oktober:</strong> zwischen <strong>19:00 und 20:00 Uhr</strong>, je nach Woche.</li><li><strong>Winter (November bis Februar):</strong> viel früher, zwischen <strong>17:30 und 18:15 Uhr</strong>.</li></ul><p>Ein Tipp von Einheimischen: Komm mindestens <strong>eine halbe Stunde vorher</strong> zum Sonnenuntergang, um das Licht davor zu genießen, das meist am spektakulärsten ist. Im Sommer bedeutet das, ab 20:00-20:30 Uhr einen Terrassentisch zu reservieren.</p><h2>Was tun nach dem Sonnenuntergang? Lass die Nacht weitergehen</h2><p>Das Schöne an Port d'Alcúdia ist, dass der Sonnenuntergang erst der Anfang ist. Wenn die Nacht hereinbricht und du Lust auf einen Tempowechsel hast, geht die Party nur wenige Meter weiter. Im <a href="/outxide">Outxide Club</a> (gleicher Standort, Av. Tucán 1) geht die Nacht mit Techno, House und Reggaeton, internationalen DJs und VIP-Service weiter, von Donnerstag bis Samstag ab 23:00 Uhr. Sein Motto sagt alles: <em>"The night continues"</em>.</p><p>Und wenn der Plan davor oder danach ein Abendessen verlangt, hat die Gegend Optionen für jeden Geschmack: Mehr Ideen findest du in unserem <a href="/blog/guia-vida-nocturna-alcudia">Nachtleben-Guide für Alcúdia</a>. Zwischen Sonnenuntergang, Cocktail, Abendessen und Tanzen ist Port d'Alcúdia die ruhige, stilvolle Alternative zum Trubel von Magaluf oder Playa de Palma, ohne auf eine großartige Nacht zu verzichten.</p><p>Jetzt weißt du Bescheid: Wähle deinen Lieblingsplatz an der Bucht, berechne die Sonnenuntergangszeit je nach Monat und reserviere deinen Platz auf der Terrasse. Der beste Sonnenuntergang im Norden Mallorcas wartet mit einem fertigen Drink auf dich.</p>`,
      fr: `<p>Le nord de Majorque abrite certains des plus beaux couchers de soleil de l'île, et <strong>Port d'Alcúdia</strong> est l'un de ces endroits où le ciel se teinte d'orange au-dessus d'une immense baie tranquille. Si vous cherchez où voir le coucher de soleil à Alcúdia en toute quiétude, avec une belle vue et, mieux encore, un cocktail à la main, ce guide local vous emmène vers les meilleurs spots et vous dit à quelle heure le soleil se couche selon le mois.</p><h2>Les meilleurs spots pour voir le coucher de soleil à Port d'Alcúdia</h2><p>La <strong>baie d'Alcúdia</strong> est la grande scène : elle est orientée au sud-est, si bien que le soleil ne tombe pas directement dans la mer, mais la lumière se répand sur les montagnes de la Tramuntana derrière vous, peignant l'eau et le sable de tons roses et dorés. Un coucher de soleil doux, aux couleurs durables, idéal pour une promenade sans hâte.</p><h3>Plage et promenade maritime</h3><p>La <strong>promenade maritime de Port d'Alcúdia</strong> et sa plage de sable fin sont l'option la plus accessible et la plus gratifiante. La plage est orientée à l'est, de sorte qu'au crépuscule elle baigne dans une lumière chaude et sereine, idéale pour les photos et pour une dernière baignade de la journée. Pour profiter au maximum d'un après-midi à la plage avant votre cocktail, jetez un œil à notre <a href="/blog/playas-alcudia-guia-completa">guide complet des plages d'Alcúdia</a>.</p><h3>Alcanada et son phare</h3><p>À quelques minutes, la zone d'<strong>Alcanada</strong> offre un tableau plus intime : le petit <strong>îlot avec son phare</strong> face à la côte est l'un des coins les plus photographiés du nord. Les rochers, les pins et ce phare se découpant sur le ciel font de l'heure dorée un moment de carte postale, avec bien moins de monde que sur la plage principale.</p><h3>La vieille ville et ses remparts</h3><p>Si vous préférez la hauteur et la pierre, les <strong>remparts médiévaux d'Alcúdia</strong> et les points de vue de la vieille ville offrent une perspective différente, avec la baie au loin et la lumière dorée se glissant entre les ruelles historiques.</p><h2>Le coucher de soleil avec un cocktail à l'Enjoy Terrace</h2><p>Quand le soleil commence à descendre, il n'y a pas de meilleur plan que de rehausser votre coucher de soleil avec un verre bien préparé. À l'<a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1, Port d'Alcúdia), nous avons fait de cette heure notre spécialité : <strong>cocktails signature</strong> et <strong>chicha premium</strong> sur une terrasse pensée pour voir tomber le soir avec style. Notre devise dit tout : <em>"Where nights begin"</em>. C'est ici que commence la nuit à Alcúdia.</p><p>Nous ouvrons <strong>tous les jours dès 17h00</strong>, juste à temps pour prendre place avant l'heure magique. Un mojito, un negroni signature ou quelque chose de la carte de saison, la douce braise de la chicha et un ciel qui change de couleur : voilà le coucher de soleil que nous recommandons. Pour des idées d'accords, lisez notre guide des <a href="/blog/cocteles-shisha-terraza-alcudia">cocktails et chicha en terrasse à Alcúdia</a>.</p><h2>À quelle heure le soleil se couche-t-il à Alcúdia ? Mois par mois</h2><p>L'heure du coucher de soleil change beaucoup au fil de l'année, il vaut donc mieux bien calculer pour ne pas manquer le moment. Voici les heures approximatives à Port d'Alcúdia :</p><ul><li><strong>Juin et juillet :</strong> le soleil se couche tard, autour de <strong>21h00-21h15</strong>. C'est la meilleure période pour un coucher de soleil long et chaud.</li><li><strong>Août :</strong> vers <strong>20h30-20h45</strong>, avec encore des soirées douces.</li><li><strong>Mai et septembre :</strong> autour de <strong>20h00</strong>, avec des températures très agréables.</li><li><strong>Avril et octobre :</strong> entre <strong>19h00 et 20h00</strong> selon la semaine.</li><li><strong>Hiver (novembre à février) :</strong> bien plus tôt, entre <strong>17h30 et 18h15</strong>.</li></ul><p>Un conseil local : arrivez au moins <strong>une demi-heure avant</strong> le coucher pour profiter de la lumière qui précède, généralement la plus spectaculaire. En été, cela signifie réserver une table en terrasse à partir de 20h00-20h30.</p><h2>Que faire après le coucher de soleil ? Prolongez la nuit</h2><p>Le charme de Port d'Alcúdia, c'est que le coucher de soleil n'est que le début. Quand la nuit tombe et que l'envie de changer de rythme se fait sentir, la fête continue à quelques mètres. À l'<a href="/outxide">Outxide Club</a> (même emplacement, Av. Tucán 1), la nuit se poursuit avec techno, house et reggaeton, DJ internationaux et service VIP, du jeudi au samedi dès 23h00. Sa devise dit tout : <em>"The night continues"</em>.</p><p>Et si le programme appelle un dîner avant ou après, la zone a des options pour tous les goûts : trouvez plus d'idées dans notre <a href="/blog/guia-vida-nocturna-alcudia">guide de la vie nocturne d'Alcúdia</a>. Entre coucher de soleil, cocktail, dîner et danse, Port d'Alcúdia est l'alternative tranquille et élégante à l'agitation de Magaluf ou de Playa de Palma, sans renoncer à une belle soirée.</p><p>Vous savez donc tout : choisissez votre coin favori de la baie, calculez l'heure du coucher selon le mois et réservez votre place en terrasse. Le plus beau coucher de soleil du nord de Majorque vous attend, verre prêt.</p>`,
      it: `<p>Il nord di Maiorca custodisce alcuni dei tramonti più belli dell'isola, e <strong>Port d'Alcúdia</strong> è uno di quei luoghi dove il cielo si tinge di arancione sopra un'enorme baia tranquilla. Se cerchi dove vedere il tramonto ad Alcúdia con calma, con una bella vista e, ancora meglio, con un cocktail in mano, questa guida locale ti porta nei posti migliori e ti dice a che ora tramonta il sole a seconda del mese.</p><h2>I posti migliori per vedere il tramonto a Port d'Alcúdia</h2><p>La <strong>baia di Alcúdia</strong> è il grande palcoscenico: è orientata a sud-est, quindi il sole non cala direttamente nel mare, ma la luce si riversa sulle montagne della Tramuntana alle tue spalle, dipingendo l'acqua e la sabbia di toni rosati e dorati. È un tramonto morbido, dai colori duraturi, ideale per una passeggiata senza fretta.</p><h3>Spiaggia e lungomare</h3><p>Il <strong>lungomare di Port d'Alcúdia</strong> e la sua spiaggia di sabbia fine sono l'opzione più accessibile e gratificante. La spiaggia è rivolta a est, quindi al tramonto resta in una luce calda e serena, perfetta per le foto e per l'ultimo bagno della giornata. Per sfruttare al massimo un pomeriggio in spiaggia prima del cocktail, dai un'occhiata alla nostra <a href="/blog/playas-alcudia-guia-completa">guida completa alle spiagge di Alcúdia</a>.</p><h3>Alcanada e il suo faro</h3><p>A pochi minuti, la zona di <strong>Alcanada</strong> offre uno scenario più intimo: il piccolo <strong>isolotto con il faro</strong> di fronte alla costa è uno degli angoli più fotografati del nord. Le rocce, i pini e quel faro stagliato contro il cielo rendono l'ora d'oro un momento da cartolina, con molte meno persone rispetto alla spiaggia principale.</p><h3>Il centro storico e le sue mura</h3><p>Se preferisci l'altezza e la pietra, le <strong>mura medievali di Alcúdia</strong> e i punti panoramici del centro storico regalano una prospettiva diversa, con la baia in lontananza e la luce dorata che filtra tra i vicoli storici.</p><h2>Il tramonto con un cocktail all'Enjoy Terrace</h2><p>Quando il sole comincia a scendere, non c'è piano migliore che alzare il livello del tuo tramonto con un drink fatto bene. All'<a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1, Port d'Alcúdia) abbiamo fatto di quell'ora la nostra specialità: <strong>cocktail d'autore</strong> e <strong>shisha premium</strong> su una terrazza pensata per vedere calare la sera con stile. Il nostro motto dice tutto: <em>"Where nights begin"</em>. È qui che comincia la notte ad Alcúdia.</p><p>Apriamo <strong>tutti i giorni dalle 17:00</strong>, giusto in tempo per prendere posto prima dell'ora magica. Un mojito, un negroni d'autore o qualcosa dalla carta di stagione, la brace delicata della shisha e un cielo che cambia colore: ecco il tramonto che consigliamo. Per idee di abbinamento, leggi la nostra guida ai <a href="/blog/cocteles-shisha-terraza-alcudia">cocktail e shisha in terrazza ad Alcúdia</a>.</p><h2>A che ora tramonta il sole ad Alcúdia? Mese per mese</h2><p>L'ora del tramonto cambia molto nel corso dell'anno, quindi conviene calcolare bene per non perdere il momento. Questi sono gli orari approximativi a Port d'Alcúdia:</p><ul><li><strong>Giugno e luglio:</strong> il sole tramonta tardi, intorno alle <strong>21:00-21:15</strong>. È il periodo migliore per un tramonto lungo e caldo.</li><li><strong>Agosto:</strong> verso le <strong>20:30-20:45</strong>, ancora con serate miti.</li><li><strong>Maggio e settembre:</strong> intorno alle <strong>20:00</strong>, con temperature molto piacevoli.</li><li><strong>Aprile e ottobre:</strong> tra le <strong>19:00 e le 20:00</strong> a seconda della settimana.</li><li><strong>Inverno (da novembre a febbraio):</strong> molto prima, tra le <strong>17:30 e le 18:15</strong>.</li></ul><p>Un consiglio locale: arriva almeno <strong>mezz'ora prima</strong> del tramonto per goderti la luce che lo precede, di solito la più spettacolare. In estate, questo significa prenotare un tavolo in terrazza a partire dalle 20:00-20:30.</p><h2>Cosa fare dopo il tramonto? Continua la notte</h2><p>Il bello di Port d'Alcúdia è che il tramonto è solo l'inizio. Quando cala la notte e viene voglia di cambiare ritmo, la festa continua a pochi metri. All'<a href="/outxide">Outxide Club</a> (stessa posizione, Av. Tucán 1) la notte prosegue con techno, house e reggaeton, DJ internazionali e servizio VIP, dal giovedì al sabato dalle 23:00. Il suo motto dice tutto: <em>"The night continues"</em>.</p><p>E se il programma prevede una cena prima o dopo, la zona ha opzioni per tutti i gusti: trova altre idee nella nostra <a href="/blog/guia-vida-nocturna-alcudia">guida alla vita notturna di Alcúdia</a>. Tra tramonto, cocktail, cena e ballo, Port d'Alcúdia è l'alternativa tranquilla ed elegante al trambusto di Magaluf o Playa de Palma, senza rinunciare a una grande serata.</p><p>Quindi ora lo sai: scegli il tuo angolo preferito della baia, calcola l'ora del tramonto in base al mese e prenota il tuo posto in terrazza. Il miglior tramonto del nord di Maiorca ti aspetta, con un drink pronto.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-07-14",
    image: "/images/enjoy/484540703_1379118356824501_323153948800612459_n.jpg",
    tags: ["atardecer alcudia", "puesta de sol port alcudia", "sunset mallorca", "cocteles atardecer", "enjoy terrace"],
    venue: "enjoy",
    readingTime: 5,
    faq: [
      {
        question: {
          es: "¿A qué hora se pone el sol en Port d'Alcúdia en verano?",
          en: "What time does the sun set in Port d'Alcúdia in summer?",
          de: "Um wie viel Uhr geht die Sonne im Sommer in Port d'Alcúdia unter?",
          fr: "À quelle heure le soleil se couche-t-il à Port d'Alcúdia en été ?",
          it: "A che ora tramonta il sole a Port d'Alcúdia in estate?",
        },
        answer: {
          es: "En junio y julio el sol se pone tarde, en torno a las 21:00-21:15. En agosto es hacia las 20:30-20:45.",
          en: "In June and July the sun sets late, around 9:00-9:15 pm. In August it's around 8:30-8:45 pm.",
          de: "Im Juni und Juli geht die Sonne spät unter, gegen 21:00-21:15 Uhr. Im August gegen 20:30-20:45 Uhr.",
          fr: "En juin et juillet, le soleil se couche tard, vers 21h00-21h15. En août, vers 20h30-20h45.",
          it: "A giugno e luglio il sole tramonta tardi, verso le 21:00-21:15. Ad agosto verso le 20:30-20:45.",
        },
      },
      {
        question: {
          es: "¿Cuál es el mejor sitio para ver el atardecer en Alcúdia?",
          en: "What's the best place to watch the sunset in Alcúdia?",
          de: "Was ist der beste Ort, um den Sonnenuntergang in Alcúdia zu sehen?",
          fr: "Quel est le meilleur endroit pour voir le coucher de soleil à Alcúdia ?",
          it: "Qual è il posto migliore per vedere il tramonto ad Alcúdia?",
        },
        answer: {
          es: "El paseo marítimo y la playa de Port d'Alcúdia son los más accesibles; Alcanada y su faro ofrecen una vista más íntima. Para un atardecer con cóctel, la terraza de Enjoy Terrace.",
          en: "The seafront promenade and beach of Port d'Alcúdia are the most accessible; Alcanada and its lighthouse offer a more intimate view. For a sunset with a cocktail, the Enjoy Terrace terrace.",
          de: "Die Strandpromenade und der Strand von Port d'Alcúdia sind am zugänglichsten; Alcanada und sein Leuchtturm bieten einen intimeren Ausblick. Für einen Sonnenuntergang mit Cocktail die Terrasse von Enjoy Terrace.",
          fr: "La promenade et la plage de Port d'Alcúdia sont les plus accessibles ; Alcanada et son phare offrent une vue plus intime. Pour un coucher de soleil avec cocktail, la terrasse d'Enjoy Terrace.",
          it: "Il lungomare e la spiaggia di Port d'Alcúdia sono i più accessibili; Alcanada e il suo faro offrono una vista più intima. Per un tramonto con cocktail, la terrazza dell'Enjoy Terrace.",
        },
      },
      {
        question: {
          es: "¿A qué hora abre Enjoy Terrace para el atardecer?",
          en: "What time does Enjoy Terrace open for the sunset?",
          de: "Um wie viel Uhr öffnet Enjoy Terrace für den Sonnenuntergang?",
          fr: "À quelle heure ouvre Enjoy Terrace pour le coucher de soleil ?",
          it: "A che ora apre l'Enjoy Terrace per il tramonto?",
        },
        answer: {
          es: "Enjoy Terrace abre a diario desde las 17:00 en Av. Tucán 1, Port d'Alcúdia, con cócteles de autor y shisha premium en terraza.",
          en: "Enjoy Terrace opens daily from 5:00 pm at Av. Tucán 1, Port d'Alcúdia, with signature cocktails and premium shisha on the terrace.",
          de: "Enjoy Terrace öffnet täglich ab 17:00 Uhr in der Av. Tucán 1, Port d'Alcúdia, mit Signature-Cocktails und Premium-Shisha auf der Terrasse.",
          fr: "Enjoy Terrace ouvre tous les jours dès 17h00 au Av. Tucán 1, Port d'Alcúdia, avec cocktails signature et chicha premium en terrasse.",
          it: "L'Enjoy Terrace apre tutti i giorni dalle 17:00 in Av. Tucán 1, Port d'Alcúdia, con cocktail d'autore e shisha premium in terrazza.",
        },
      },
      {
        question: {
          es: "¿Qué hacer después del atardecer en Port d'Alcúdia?",
          en: "What is there to do after the sunset in Port d'Alcúdia?",
          de: "Was kann man nach dem Sonnenuntergang in Port d'Alcúdia unternehmen?",
          fr: "Que faire après le coucher de soleil à Port d'Alcúdia ?",
          it: "Cosa fare dopo il tramonto a Port d'Alcúdia?",
        },
        answer: {
          es: "La noche continúa en Outxide Club (misma ubicación, Av. Tucán 1) con techno, house y reggaetón, de jueves a sábado desde las 23:00, además de opciones de cena en la zona.",
          en: "The night continues at Outxide Club (same location, Av. Tucán 1) with techno, house and reggaeton, Thursday to Saturday from 11:00 pm, plus dining options in the area.",
          de: "Die Nacht geht im Outxide Club weiter (gleicher Standort, Av. Tucán 1) mit Techno, House und Reggaeton, von Donnerstag bis Samstag ab 23:00 Uhr, dazu Essensmöglichkeiten in der Gegend.",
          fr: "La nuit continue à l'Outxide Club (même emplacement, Av. Tucán 1) avec techno, house et reggaeton, du jeudi au samedi dès 23h00, sans oublier les options de dîner dans le secteur.",
          it: "La notte continua all'Outxide Club (stessa posizione, Av. Tucán 1) con techno, house e reggaeton, dal giovedì al sabato dalle 23:00, oltre alle opzioni per cenare in zona.",
        },
      },
    ],
  },
  {
    slug: "donde-ver-futbol-deporte-directo-alcudia",
    title: {
      es: "Dónde ver fútbol y deporte en directo en Alcúdia: pantalla gigante, Champions y grandes eventos",
      en: "Where to Watch Live Football and Sports in Alcúdia: Big Screen, Champions League and Major Events",
      de: "Wo man in Alcúdia Fußball und Sport live schaut: Großbildleinwand, Champions League und Top-Events",
      fr: "Où voir le football et le sport en direct à Alcúdia : écran géant, Ligue des Champions et grands événements",
      it: "Dove vedere calcio e sport in diretta ad Alcúdia: maxischermo, Champions League e grandi eventi",
    },
    excerpt: {
      es: "Guía práctica para ver LaLiga, Premier, Champions, F1 y grandes eventos deportivos en Port d'Alcúdia: pantalla gigante en Outxide, terraza en Enjoy y mesa reservada para los partidos importantes.",
      en: "A practical guide to watching LaLiga, the Premier League, the Champions League, F1 and major sporting events in Port d'Alcúdia: big screen at Outxide, terrace at Enjoy and a reserved table for the big matches.",
      de: "Ein praktischer Leitfaden, um LaLiga, Premier League, Champions League, F1 und große Sportevents in Port d'Alcúdia zu sehen: Großbildleinwand im Outxide, Terrasse im Enjoy und ein reservierter Tisch für die wichtigen Spiele.",
      fr: "Un guide pratique pour suivre la Liga, la Premier League, la Ligue des Champions, la F1 et les grands événements sportifs à Port d'Alcúdia : écran géant à l'Outxide, terrasse à l'Enjoy et table réservée pour les grands matchs.",
      it: "Una guida pratica per vedere LaLiga, Premier League, Champions League, F1 e i grandi eventi sportivi a Port d'Alcúdia: maxischermo all'Outxide, terrazza all'Enjoy e tavolo riservato per le partite importanti.",
    },
    content: {
      es: `<p>¿De vacaciones en el norte de Mallorca y no quieres perderte ese partido clave? En Port d'Alcúdia puedes ver <strong>fútbol y deporte en directo</strong> con buen ambiente, cócteles de calidad y una pantalla gigante que convierte cualquier encuentro en un plan de noche. Tanto si buscas LaLiga, Premier League, un cruce de Champions o una carrera de Fórmula 1, esta guía evergreen te dice dónde verlo y cómo organizarte para no quedarte sin sitio.</p><h2>Pantalla gigante en Outxide y terraza en Enjoy</h2><p>La referencia para ver deporte en grande en la zona es <a href="/outxide">Outxide Club</a>, en Av. Tucán 1. Su <strong>pantalla gigante</strong> está pensada para los grandes eventos deportivos: la imagen se ve desde prácticamente cualquier punto del local y el ambiente de club (con DJ antes y después) hace que un partido importante se viva casi como un evento. Es el mejor plan si buscas algo parecido a un <strong>sports bar en Alcúdia</strong> pero con energía de discoteca.</p><p>Justo en la misma ubicación tienes <a href="/enjoy">Enjoy Terrace</a>, abierto a diario desde las 17:00. Es la opción más relajada: cócteles de autor y shisha premium en terraza, ideal para llegar temprano, coger el mejor atardecer y calentar motores antes de un partido de noche. Entre los dos espacios cubres toda la velada, desde la caña tranquila en terraza hasta el gol celebrado frente a la pantalla.</p><h2>Qué competiciones se pueden ver y cómo enterarte del calendario</h2><p>La idea es sencilla: los <strong>grandes eventos deportivos</strong> son los que mejor se disfrutan en pantalla gigante. Hablamos de:</p><ul><li><strong>Fútbol</strong>: partidos destacados de LaLiga, Premier League y los cruces de <strong>Champions League</strong>, además de finales y grandes citas de selecciones.</li><li><strong>Fórmula 1</strong>: los grandes premios más seguidos de la temporada.</li><li><strong>Otros grandes eventos</strong>: finales y partidos señalados que muevan a los aficionados, sobre todo en temporada alta de verano.</li></ul><p>No todos los partidos de la jornada se emiten: los locales priorizan los encuentros con más tirón. Por eso, lo más práctico es <strong>confirmar antes qué se va a proyectar</strong>. La forma más fiable de enterarte del calendario y de si ponen tu partido es consultar las redes y los canales oficiales de <a href="/outxide">Outxide</a> o escribir directamente al local. Si te va la marcha después del pitido final, echa un ojo a nuestra <a href="/blog/plan-nocturno-port-alcudia-mallorca">guía del plan nocturno perfecto en Port d'Alcúdia</a> para encadenar partido y fiesta.</p><h2>Reservar mesa o grupo para los partidos grandes</h2><p>Cuando hay un partido importante, el sitio se llena. Si vais en grupo o queréis asegurar buena visibilidad de la pantalla, lo mejor es <strong>reservar con antelación</strong>. En Outxide puedes gestionar entradas y reservados online a través de FourVenues, lo que te garantiza mesa y servicio VIP sin depender de que haya hueco al llegar. Recuerda que el club es para mayores de 18 años y abre de jueves a sábado desde las 23:00; para eventos deportivos en otros horarios, confirma siempre antes.</p><p>Un buen reservado marca la diferencia en las grandes citas: una final de Champions o un derbi con la terraza y el club llenos se disfrutan mucho más con tu sitio garantizado. Ya lo vivimos con la última gran cita de selecciones, como contamos en el resumen de la <a href="/blog/espana-campeona-mundial-2026-outxide-alcudia">celebración de España campeona en Outxide</a>: cuando el partido es histórico, la pantalla gigante y el ambiente de club lo elevan todo.</p><h2>Cena antes del partido: llega con el estómago lleno</h2><p>Un partido de noche pide una buena cena previa. En el puerto tienes mesas para todos los gustos —arroces, brasa, cocina internacional—; en nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guía de restaurantes de Alcúdia</a> encontrarás dónde elegir. Reserva con antelación en temporada alta y llegarás a la pantalla gigante ya cenado, sin prisas ni colas.</p><p>La logística es cómoda: cenáis tranquilos en el puerto y después os movéis a la zona de Av. Tucán para el partido. Así encadenáis <strong>cena, deporte y noche</strong> en un radio muy pequeño, algo que en pocos sitios del norte de Mallorca resulta tan fácil.</p><h2>La alternativa tranquila a Magaluf y el Ballermann</h2><p>Frente a la saturación de Magaluf o Playa de Palma, Port d'Alcúdia ofrece una experiencia más cuidada para ver deporte: pantalla grande, buena coctelería y un ambiente internacional (español, inglés, alemán, francés e italiano) sin renunciar a la fiesta. Si quieres exprimir la zona más allá del partido, te ayudarán nuestras guías de <a href="/blog/guia-vida-nocturna-alcudia">vida nocturna en Alcúdia</a> y de <a href="/blog/que-hacer-alcudia-mallorca">qué hacer en Alcúdia</a>.</p><p>En resumen: para <strong>ver fútbol en Alcúdia</strong> con pantalla gigante, cena a la brasa antes y fiesta después, el tándem Enjoy–Outxide lo pone fácil. Confirma qué partido se proyecta, reserva tu mesa y disfruta del deporte como se merece.</p>`,
      en: `<p>On holiday in northern Majorca and don't want to miss that key match? In Port d'Alcúdia you can watch <strong>live football and sport</strong> with a great atmosphere, quality cocktails and a big screen that turns any game into a proper night out. Whether it's LaLiga, the Premier League, a Champions League tie or a Formula 1 race, this evergreen guide tells you where to watch it and how to plan so you don't end up without a spot.</p><h2>Big screen at Outxide and terrace at Enjoy</h2><p>The go-to place to watch sport on the big screen in the area is <a href="/outxide">Outxide Club</a>, on Av. Tucán 1. Its <strong>giant screen</strong> is designed for major sporting events: you can see the picture from almost anywhere in the venue, and the club vibe (with a DJ before and after) makes a big match feel like a real event. It's the best plan if you're after something like a <strong>sports bar in Alcudia</strong> but with the energy of a nightclub.</p><p>Right in the same location is <a href="/enjoy">Enjoy Terrace</a>, open daily from 17:00. It's the more relaxed option: signature cocktails and premium shisha on the terrace, ideal for arriving early, catching the best sunset and warming up before an evening game. Between the two spaces you've got the whole night covered, from a quiet drink on the terrace to the goal celebrated in front of the screen.</p><h2>Which competitions you can watch and how to check the schedule</h2><p>The idea is simple: <strong>major sporting events</strong> are the ones best enjoyed on the big screen. That means:</p><ul><li><strong>Football</strong>: top LaLiga and Premier League fixtures and the <strong>Champions League</strong> ties, plus finals and big international matches.</li><li><strong>Formula 1</strong>: the season's most-watched grands prix.</li><li><strong>Other big events</strong>: finals and standout matches that get fans moving, especially in the summer high season.</li></ul><p>Not every fixture of the round is shown: the venues prioritise the games with the biggest pull. So the smart move is to <strong>check in advance what's being shown</strong>. The most reliable way to see the schedule and whether your match is on is to check the official social channels of <a href="/outxide">Outxide</a> or message the venue directly. If you're up for more once the final whistle blows, take a look at our <a href="/blog/plan-nocturno-port-alcudia-mallorca">guide to the perfect night out in Port d'Alcúdia</a> to link match and party.</p><h2>Booking a table or group for the big matches</h2><p>When there's a big game on, the place fills up. If you're in a group or want to guarantee a good view of the screen, it's best to <strong>book ahead</strong>. At Outxide you can arrange tickets and VIP tables online through FourVenues, which secures your table and service without relying on there being room when you arrive. Remember the club is for over-18s and opens Thursday to Saturday from 23:00; for sporting events at other times, always confirm first.</p><p>A good table makes all the difference on the big nights: a Champions League final or a derby with the terrace and club packed out are far better enjoyed with your spot guaranteed. We saw it at the last big international occasion, as we described in our recap of the <a href="/blog/espana-campeona-mundial-2026-outxide-alcudia">celebration of Spain's title at Outxide</a>: when the match is historic, the big screen and club atmosphere lift everything.</p><h2>Dinner before the match: arrive on a full stomach</h2><p>An evening match calls for a proper dinner first. The port has tables for every taste — rice dishes, charcoal grill, international cooking — and our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to restaurants in Alcúdia</a> will help you choose. Book ahead in high season and you'll reach the big screen already fed, with no rush or queues.</p><p>The logistics are easy: enjoy a relaxed dinner by the port and then head to the Av. Tucán area for the match. That way you chain <strong>dinner, sport and nightlife</strong> within a tiny radius — few places in northern Mallorca make it this easy.</p><h2>The relaxed alternative to Magaluf and the Ballermann</h2><p>Compared with the crowds of Magaluf or Playa de Palma, Port d'Alcúdia offers a more refined way to watch sport: a big screen, good cocktails and an international crowd (Spanish, English, German, French and Italian) without giving up the party. If you want to make the most of the area beyond the match, our guides to <a href="/blog/guia-vida-nocturna-alcudia">nightlife in Alcúdia</a> and <a href="/blog/que-hacer-alcudia-mallorca">things to do in Alcúdia</a> will help.</p><p>In short: to <strong>watch football in Alcúdia</strong> with a big screen, a grill dinner beforehand and a party afterwards, the Enjoy–Outxide duo makes it easy. Confirm which match is being shown, book your table and enjoy the sport as it deserves.</p>`,
      de: `<p>Urlaub im Norden Mallorcas und du willst das entscheidende Spiel nicht verpassen? In Port d'Alcúdia kannst du <strong>Fußball und Sport live</strong> mit toller Stimmung, guten Cocktails und einer Großbildleinwand schauen, die jedes Spiel in einen richtigen Abend verwandelt. Ob LaLiga, Premier League, ein Champions-League-Duell oder ein Formel-1-Rennen: Dieser Evergreen-Guide sagt dir, wo du es siehst und wie du planst, damit du keinen Platz verpasst.</p><h2>Großbildleinwand im Outxide und Terrasse im Enjoy</h2><p>Die erste Adresse, um Sport groß zu schauen, ist <a href="/outxide">Outxide Club</a> in der Av. Tucán 1. Die <strong>Großbildleinwand</strong> ist für die großen Sportevents gemacht: Das Bild ist von fast jedem Punkt im Lokal zu sehen, und die Club-Atmosphäre (mit DJ davor und danach) lässt ein wichtiges Spiel wie ein echtes Event wirken. Das ist der beste Plan, wenn du so etwas wie eine <strong>Sportsbar in Alcudia</strong> suchst, aber mit der Energie eines Clubs.</p><p>Direkt am selben Standort liegt <a href="/enjoy">Enjoy Terrace</a>, täglich ab 17:00 Uhr geöffnet. Das ist die entspanntere Option: Signature-Cocktails und Premium-Shisha auf der Terrasse, ideal, um früh zu kommen, den besten Sonnenuntergang zu erwischen und sich vor einem Abendspiel warmzumachen. Mit beiden Locations hast du den ganzen Abend abgedeckt, vom ruhigen Drink auf der Terrasse bis zum Tor, das vor der Leinwand gefeiert wird.</p><h2>Welche Wettbewerbe man sehen kann und wie man den Spielplan erfährt</h2><p>Die Idee ist einfach: <strong>Große Sportevents</strong> genießt man am besten auf der Großbildleinwand. Das heißt:</p><ul><li><strong>Fußball</strong>: Topspiele der LaLiga und Premier League sowie die <strong>Champions-League</strong>-Duelle, dazu Finals und große Länderspiele.</li><li><strong>Formel 1</strong>: die meistgesehenen Grands Prix der Saison.</li><li><strong>Weitere Großevents</strong>: Finals und Topspiele, die die Fans bewegen, besonders in der Sommerhochsaison.</li></ul><p>Nicht jedes Spiel des Spieltags wird gezeigt: Die Locations priorisieren die Partien mit der größten Zugkraft. Am schlausten ist es daher, <strong>vorher zu prüfen, was übertragen wird</strong>. Am zuverlässigsten erfährst du den Spielplan und ob dein Spiel läuft über die offiziellen Social-Media-Kanäle von <a href="/outxide">Outxide</a> oder indem du das Lokal direkt anschreibst. Wenn du nach dem Schlusspfiff noch Lust auf mehr hast, wirf einen Blick in unseren <a href="/blog/plan-nocturno-port-alcudia-mallorca">Guide für den perfekten Abend in Port d'Alcúdia</a>, um Spiel und Party zu verbinden.</p><h2>Tisch oder Gruppe für die großen Spiele reservieren</h2><p>Bei einem großen Spiel wird es voll. Wenn ihr in einer Gruppe kommt oder gute Sicht auf die Leinwand sichern wollt, solltet ihr am besten <strong>im Voraus reservieren</strong>. Im Outxide kannst du Tickets und reservierte Bereiche online über FourVenues buchen, was dir Tisch und VIP-Service sichert, ohne auf freien Platz bei Ankunft angewiesen zu sein. Der Club ist ab 18 Jahren und öffnet Donnerstag bis Samstag ab 23:00 Uhr; für Sportevents zu anderen Zeiten bitte immer vorher bestätigen.</p><p>Ein guter Tisch macht bei den großen Abenden den Unterschied: Ein Champions-League-Finale oder ein Derby mit voller Terrasse und vollem Club genießt man mit gesichertem Platz viel mehr. Wir haben es beim letzten großen Länderspiel-Anlass erlebt, wie wir in unserem Rückblick auf die <a href="/blog/espana-campeona-mundial-2026-outxide-alcudia">Feier von Spaniens Titel im Outxide</a> beschreiben: Wenn das Spiel historisch ist, heben die Großbildleinwand und die Club-Atmosphäre alles auf ein neues Level.</p><h2>Vorher essen: mit vollem Magen ankommen</h2><p>Ein Abendspiel verlangt nach einem guten Abendessen vorab. Am Hafen gibt es Tische für jeden Geschmack — Reisgerichte, Grill, internationale Küche —; unser <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide für Alcúdia</a> hilft bei der Wahl. Reserviere in der Hochsaison rechtzeitig, und du kommst schon gesättigt zur Großbildleinwand, ohne Eile und Schlangen.</p><p>Die Logistik ist bequem: entspannt am Hafen essen und dann in die Gegend der Av. Tucán zum Spiel. So verbindest du <strong>Abendessen, Sport und Nachtleben</strong> in einem sehr kleinen Radius — kaum ein Ort im Norden Mallorcas macht das so einfach.</p><h2>Die entspannte Alternative zu Magaluf und dem Ballermann</h2><p>Gegenüber dem Trubel von Magaluf oder der Playa de Palma bietet Port d'Alcúdia ein gepflegteres Sport-Erlebnis: große Leinwand, gute Cocktails und ein internationales Publikum (spanisch, englisch, deutsch, französisch und italienisch), ohne auf die Party zu verzichten. Wenn du die Gegend über das Spiel hinaus auskosten willst, helfen dir unsere Guides zum <a href="/blog/guia-vida-nocturna-alcudia">Nachtleben in Alcúdia</a> und zu <a href="/blog/que-hacer-alcudia-mallorca">Aktivitäten in Alcúdia</a>.</p><p>Kurz gesagt: Um in <strong>Alcúdia Fußball</strong> auf der Großbildleinwand zu schauen, davor vom Grill zu essen und danach zu feiern, macht es das Duo Enjoy–Outxide leicht. Bestätige, welches Spiel übertragen wird, reserviere deinen Tisch und genieße den Sport, wie er es verdient.</p>`,
      fr: `<p>En vacances dans le nord de Majorque et tu ne veux pas rater ce match décisif ? À Port d'Alcúdia, tu peux voir le <strong>football et le sport en direct</strong> dans une bonne ambiance, avec des cocktails de qualité et un écran géant qui transforme n'importe quel match en vraie soirée. Que ce soit la Liga, la Premier League, un choc de Ligue des Champions ou une course de Formule 1, ce guide evergreen te dit où le voir et comment t'organiser pour ne pas te retrouver sans place.</p><h2>Écran géant à l'Outxide et terrasse à l'Enjoy</h2><p>La référence pour voir le sport en grand dans le secteur, c'est <a href="/outxide">Outxide Club</a>, Av. Tucán 1. Son <strong>écran géant</strong> est pensé pour les grands événements sportifs : l'image se voit depuis presque tous les points du club, et l'ambiance de discothèque (avec DJ avant et après) fait vivre un grand match comme un véritable événement. C'est le meilleur plan si tu cherches quelque chose comme un <strong>sports bar à Alcudia</strong> mais avec l'énergie d'un club.</p><p>Au même emplacement se trouve <a href="/enjoy">Enjoy Terrace</a>, ouvert tous les jours dès 17h00. C'est l'option plus détendue : cocktails signature et chicha premium en terrasse, idéal pour arriver tôt, profiter du plus beau coucher de soleil et se chauffer avant un match du soir. Entre les deux espaces, tu couvres toute la soirée, du verre tranquille en terrasse au but célébré devant l'écran.</p><h2>Quelles compétitions voir et comment connaître le calendrier</h2><p>L'idée est simple : les <strong>grands événements sportifs</strong> sont ceux qui se savourent le mieux sur écran géant. C'est-à-dire :</p><ul><li><strong>Football</strong> : les affiches de la Liga et de la Premier League et les chocs de <strong>Ligue des Champions</strong>, ainsi que les finales et les grands matchs de sélections.</li><li><strong>Formule 1</strong> : les grands prix les plus suivis de la saison.</li><li><strong>Autres grands événements</strong> : finales et matchs marquants qui font vibrer les supporters, surtout en haute saison estivale.</li></ul><p>Tous les matchs de la journée ne sont pas diffusés : les établissements privilégient les rencontres les plus attractives. Le plus malin est donc de <strong>vérifier à l'avance ce qui sera projeté</strong>. Le moyen le plus fiable de connaître le calendrier et de savoir si ton match passe est de consulter les réseaux officiels d'<a href="/outxide">Outxide</a> ou d'écrire directement au club. Si tu as encore de l'énergie après le coup de sifflet final, jette un œil à notre <a href="/blog/plan-nocturno-port-alcudia-mallorca">guide de la soirée parfaite à Port d'Alcúdia</a> pour enchaîner match et fête.</p><h2>Réserver une table ou un groupe pour les grands matchs</h2><p>Quand il y a un grand match, ça se remplit vite. Si vous venez en groupe ou voulez garantir une bonne visibilité de l'écran, mieux vaut <strong>réserver à l'avance</strong>. À l'Outxide, tu peux gérer les entrées et les carrés VIP en ligne via FourVenues, ce qui t'assure une table et un service VIP sans dépendre de la place disponible à l'arrivée. Rappelle-toi que le club est réservé aux plus de 18 ans et ouvre du jeudi au samedi dès 23h00 ; pour les événements sportifs à d'autres horaires, confirme toujours au préalable.</p><p>Un bon carré fait toute la différence lors des grands rendez-vous : une finale de Ligue des Champions ou un derby avec la terrasse et le club pleins se savourent bien mieux avec sa place garantie. Nous l'avons vécu lors du dernier grand rendez-vous des sélections, comme raconté dans notre récap de la <a href="/blog/espana-campeona-mundial-2026-outxide-alcudia">célébration du titre de l'Espagne à l'Outxide</a> : quand le match est historique, l'écran géant et l'ambiance de club subliment tout.</p><h2>Dîner avant le match : arriver le ventre plein</h2><p>Un match en soirée appelle un bon dîner au préalable. Le port offre des tables pour tous les goûts — riz, braise, cuisine internationale — ; notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants d'Alcúdia</a> vous aidera à choisir. Réservez à l'avance en haute saison et vous arriverez devant l'écran géant déjà rassasié, sans hâte ni files.</p><p>La logistique est simple : dînez tranquillement au port, puis rejoignez le secteur de l'Av. Tucán pour le match. Vous enchaînez ainsi <strong>dîner, sport et soirée</strong> dans un rayon très réduit — peu d'endroits du nord de Majorque rendent cela aussi facile.</p><h2>L'alternative tranquille à Magaluf et au Ballermann</h2><p>Face à la foule de Magaluf ou de Playa de Palma, Port d'Alcúdia propose une façon plus soignée de voir le sport : grand écran, bons cocktails et une clientèle internationale (espagnole, anglaise, allemande, française et italienne) sans renoncer à la fête. Pour profiter du secteur au-delà du match, nos guides de la <a href="/blog/guia-vida-nocturna-alcudia">vie nocturne à Alcúdia</a> et des <a href="/blog/que-hacer-alcudia-mallorca">choses à faire à Alcúdia</a> t'aideront.</p><p>En bref : pour <strong>voir le football à Alcúdia</strong> sur écran géant, dîner à la braise avant et faire la fête après, le tandem Enjoy–Outxide rend tout facile. Confirme quel match est diffusé, réserve ta table et profite du sport comme il se doit.</p>`,
      it: `<p>In vacanza nel nord di Maiorca e non vuoi perderti quella partita decisiva? A Port d'Alcúdia puoi vedere <strong>calcio e sport in diretta</strong> con una bella atmosfera, cocktail di qualità e un maxischermo che trasforma qualsiasi partita in una vera serata. Che si tratti di LaLiga, Premier League, un incrocio di Champions League o un Gran Premio di Formula 1, questa guida evergreen ti dice dove vederlo e come organizzarti per non restare senza posto.</p><h2>Maxischermo all'Outxide e terrazza all'Enjoy</h2><p>Il punto di riferimento per vedere lo sport in grande nella zona è <a href="/outxide">Outxide Club</a>, in Av. Tucán 1. Il suo <strong>maxischermo</strong> è pensato per i grandi eventi sportivi: l'immagine si vede praticamente da ogni punto del locale e l'atmosfera da club (con DJ prima e dopo) fa vivere una partita importante come un vero evento. È il piano migliore se cerchi qualcosa di simile a uno <strong>sports bar ad Alcudia</strong> ma con l'energia di una discoteca.</p><p>Nella stessa posizione trovi <a href="/enjoy">Enjoy Terrace</a>, aperto tutti i giorni dalle 17:00. È l'opzione più rilassata: cocktail d'autore e shisha premium in terrazza, ideale per arrivare presto, godersi il miglior tramonto e scaldarsi prima di una partita serale. Tra i due spazi copri tutta la serata, dal drink tranquillo in terrazza al gol festeggiato davanti allo schermo.</p><h2>Quali competizioni si possono vedere e come conoscere il calendario</h2><p>L'idea è semplice: i <strong>grandi eventi sportivi</strong> sono quelli che si godono meglio sul maxischermo. Cioè:</p><ul><li><strong>Calcio</strong>: le partite di punta di LaLiga e Premier League e gli incroci di <strong>Champions League</strong>, oltre a finali e grandi sfide delle nazionali.</li><li><strong>Formula 1</strong>: i Gran Premi più seguiti della stagione.</li><li><strong>Altri grandi eventi</strong>: finali e partite di rilievo che fanno muovere i tifosi, soprattutto in alta stagione estiva.</li></ul><p>Non tutte le partite della giornata vengono trasmesse: i locali danno priorità agli incontri di maggiore richiamo. Perciò la mossa più furba è <strong>verificare in anticipo cosa verrà proiettato</strong>. Il modo più affidabile per conoscere il calendario e sapere se trasmettono la tua partita è consultare i canali social ufficiali di <a href="/outxide">Outxide</a> o scrivere direttamente al locale. Se dopo il fischio finale hai ancora voglia di continuare, dai un'occhiata alla nostra <a href="/blog/plan-nocturno-port-alcudia-mallorca">guida alla serata perfetta a Port d'Alcúdia</a> per unire partita e festa.</p><h2>Prenotare tavolo o gruppo per le partite importanti</h2><p>Quando c'è una partita importante, il locale si riempie. Se venite in gruppo o volete garantirvi una buona visuale dello schermo, la cosa migliore è <strong>prenotare in anticipo</strong>. All'Outxide puoi gestire biglietti e tavoli riservati online tramite FourVenues, così assicuri tavolo e servizio VIP senza dipendere dallo spazio disponibile all'arrivo. Ricorda che il club è per maggiori di 18 anni e apre dal giovedì al sabato dalle 23:00; per eventi sportivi in altri orari, conferma sempre prima.</p><p>Un buon tavolo riservato fa la differenza nelle grandi serate: una finale di Champions o un derby con terrazza e club pieni si godono molto di più con il posto garantito. Lo abbiamo vissuto nell'ultimo grande appuntamento delle nazionali, come raccontiamo nel resoconto della <a href="/blog/espana-campeona-mundial-2026-outxide-alcudia">festa per il titolo della Spagna all'Outxide</a>: quando la partita è storica, il maxischermo e l'atmosfera da club elevano tutto.</p><h2>Cena prima della partita: arriva a stomaco pieno</h2><p>Una partita serale chiede una buona cena prima. Al porto ci sono tavoli per tutti i gusti — risi, brace, cucina internazionale —; la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti di Alcúdia</a> ti aiuta a scegliere. Prenota in anticipo in alta stagione e arriverai al maxischermo già cenato, senza fretta né code.</p><p>La logistica è comoda: cenate con calma al porto e poi vi spostate nella zona di Av. Tucán per la partita. Così concateni <strong>cena, sport e notte</strong> in un raggio molto piccolo, cosa che in pochi posti del nord di Maiorca è così facile.</p><h2>L'alternativa tranquilla a Magaluf e al Ballermann</h2><p>Rispetto alla ressa di Magaluf o Playa de Palma, Port d'Alcúdia offre un modo più curato di vedere lo sport: schermo grande, buoni cocktail e un pubblico internazionale (spagnolo, inglese, tedesco, francese e italiano) senza rinunciare alla festa. Se vuoi sfruttare la zona oltre la partita, ti aiutano le nostre guide alla <a href="/blog/guia-vida-nocturna-alcudia">vita notturna ad Alcúdia</a> e alle <a href="/blog/que-hacer-alcudia-mallorca">cose da fare ad Alcúdia</a>.</p><p>In sintesi: per <strong>vedere il calcio ad Alcúdia</strong> con il maxischermo, cena alla brace prima e festa dopo, il tandem Enjoy–Outxide rende tutto semplice. Conferma quale partita viene trasmessa, prenota il tuo tavolo e goditi lo sport come merita.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-07-15",
    updated: "2026-08-29",
    image: "/images/outxide/668998962_1705308414205492_561026873108522450_n.jpg",
    tags: ["ver futbol alcudia", "where to watch football mallorca", "pantalla gigante alcudia", "deporte en directo mallorca", "outxide club"],
    venue: "outxide",
    readingTime: 5,
    faq: [
      {
        question: {
          es: "¿Dónde puedo ver fútbol en pantalla gigante en Alcúdia?",
          en: "Where can I watch football on a big screen in Alcúdia?",
          de: "Wo kann ich in Alcúdia Fußball auf der Großbildleinwand schauen?",
          fr: "Où puis-je voir le football sur écran géant à Alcúdia ?",
          it: "Dove posso vedere il calcio su maxischermo ad Alcúdia?",
        },
        answer: {
          es: "En Outxide Club, en Av. Tucán 1 (Port d'Alcúdia), que cuenta con pantalla gigante para grandes eventos deportivos. Enjoy Terrace, en la misma ubicación, es ideal para el ambiente previo en terraza.",
          en: "At Outxide Club, on Av. Tucán 1 (Port d'Alcúdia), which has a big screen for major sporting events. Enjoy Terrace, at the same location, is ideal for the warm-up on the terrace.",
          de: "Im Outxide Club in der Av. Tucán 1 (Port d'Alcúdia), der eine Großbildleinwand für große Sportevents hat. Enjoy Terrace am selben Standort ist ideal für die Vorglüh-Atmosphäre auf der Terrasse.",
          fr: "À l'Outxide Club, Av. Tucán 1 (Port d'Alcúdia), qui dispose d'un écran géant pour les grands événements sportifs. Enjoy Terrace, au même endroit, est idéal pour l'ambiance d'avant-match en terrasse.",
          it: "All'Outxide Club, in Av. Tucán 1 (Port d'Alcúdia), che ha un maxischermo per i grandi eventi sportivi. Enjoy Terrace, nella stessa posizione, è ideale per l'atmosfera pre-partita in terrazza.",
        },
      },
      {
        question: {
          es: "¿Cómo sé qué partidos van a poner?",
          en: "How do I know which matches will be shown?",
          de: "Woher weiß ich, welche Spiele gezeigt werden?",
          fr: "Comment savoir quels matchs seront diffusés ?",
          it: "Come faccio a sapere quali partite verranno trasmesse?",
        },
        answer: {
          es: "Se priorizan los grandes eventos (LaLiga, Premier, Champions, F1 y citas destacadas). Lo más fiable es consultar los canales oficiales de Outxide o escribir al local antes de ir.",
          en: "Major events are prioritised (LaLiga, Premier League, Champions League, F1 and standout fixtures). The most reliable way is to check Outxide's official channels or message the venue before going.",
          de: "Große Events werden bevorzugt (LaLiga, Premier League, Champions League, F1 und Topspiele). Am zuverlässigsten prüfst du die offiziellen Kanäle von Outxide oder schreibst dem Lokal vor dem Besuch.",
          fr: "Les grands événements sont prioritaires (Liga, Premier League, Ligue des Champions, F1 et affiches marquantes). Le plus fiable est de consulter les canaux officiels d'Outxide ou d'écrire au club avant de venir.",
          it: "Vengono privilegiati i grandi eventi (LaLiga, Premier League, Champions League, F1 e sfide di rilievo). Il modo più affidabile è consultare i canali ufficiali di Outxide o scrivere al locale prima di andare.",
        },
      },
      {
        question: {
          es: "¿Puedo reservar mesa para un partido importante?",
          en: "Can I book a table for a big match?",
          de: "Kann ich für ein wichtiges Spiel einen Tisch reservieren?",
          fr: "Puis-je réserver une table pour un grand match ?",
          it: "Posso prenotare un tavolo per una partita importante?",
        },
        answer: {
          es: "Sí. En Outxide puedes reservar entradas y reservados VIP online a través de FourVenues, muy recomendable en las grandes citas porque el local se llena.",
          en: "Yes. At Outxide you can book tickets and VIP tables online through FourVenues, highly recommended for the big occasions because the venue fills up.",
          de: "Ja. Im Outxide kannst du Tickets und VIP-Tische online über FourVenues buchen, bei den großen Anlässen sehr empfehlenswert, da das Lokal voll wird.",
          fr: "Oui. À l'Outxide, tu peux réserver des entrées et des carrés VIP en ligne via FourVenues, vivement recommandé lors des grands rendez-vous car le club se remplit.",
          it: "Sì. All'Outxide puoi prenotare biglietti e tavoli VIP online tramite FourVenues, molto consigliato nelle grandi occasioni perché il locale si riempie.",
        },
      },
      {
        question: {
          es: "¿Dónde puedo cenar antes del partido?",
          en: "Where can I have dinner before the match?",
          de: "Wo kann ich vor dem Spiel essen?",
          fr: "Où puis-je dîner avant le match ?",
          it: "Dove posso cenare prima della partita?",
        },
        answer: {
          es: "En cualquiera de los restaurantes del puerto: reserva con antelación en temporada alta y luego acércate a la zona de Av. Tucán para ver el partido. Nuestra guía de restaurantes de Alcúdia te ayuda a elegir.",
          en: "At any of the restaurants by the port: book ahead in high season and then head to the Av. Tucán area to watch the match. Our guide to restaurants in Alcúdia will help you choose.",
          de: "In einem der Restaurants am Hafen: In der Hochsaison rechtzeitig reservieren und dann in die Gegend der Av. Tucán zum Spiel gehen. Unser Restaurant-Guide für Alcúdia hilft bei der Wahl.",
          fr: "Dans l'un des restaurants du port : réservez à l'avance en haute saison, puis rejoignez le secteur de l'Av. Tucán pour voir le match. Notre guide des restaurants d'Alcúdia vous aidera à choisir.",
          it: "In uno dei ristoranti del porto: prenota in anticipo in alta stagione e poi raggiungi la zona di Av. Tucán per vedere la partita. La nostra guida ai ristoranti di Alcúdia ti aiuta a scegliere.",
        },
      },
    ],
  },
  {
    slug: "norte-mallorca-alternativa-ballermann-magaluf",
    title: {
      es: "El norte de Mallorca: la alternativa tranquila al Ballermann y Magaluf",
      en: "Northern Majorca: the quieter alternative to Ballermann and Magaluf",
      de: "Der Norden Mallorcas: die entspannte Alternative zum Ballermann und Magaluf",
      fr: "Le nord de Majorque : l'alternative tranquille au Ballermann et à Magaluf",
      it: "Il nord di Maiorca: l'alternativa tranquilla al Ballermann e a Magaluf",
    },
    excerpt: {
      es: "Comparativa honesta del ocio nocturno del sur (Ballermann, Magaluf) frente al norte de Mallorca, y cómo es la noche perfecta en Port d'Alcúdia sin masificación.",
      en: "An honest comparison of southern nightlife (Ballermann, Magaluf) versus northern Majorca, and what a perfect night in Port d'Alcúdia looks like without the crowds.",
      de: "Ein ehrlicher Vergleich des Nachtlebens im Süden (Ballermann, Magaluf) mit dem Norden Mallorcas und wie die perfekte Nacht in Port d'Alcúdia ohne Massen aussieht.",
      fr: "Comparaison honnête de la vie nocturne du sud (Ballermann, Magaluf) et du nord de Majorque, et à quoi ressemble la soirée parfaite à Port d'Alcúdia sans la foule.",
      it: "Confronto onesto tra la vita notturna del sud (Ballermann, Magaluf) e il nord di Maiorca, e com'è la serata perfetta a Port d'Alcúdia senza ressa.",
    },
    content: {
      es: `<p>Mallorca no es una sola isla de fiesta. Cuando alguien piensa en salir de noche, casi siempre le vienen a la cabeza el <strong>Ballermann</strong> de la Playa de Palma o el bullicio de <strong>Magaluf</strong>. Pero hay otra Mallorca, la del norte, donde se puede disfrutar de una gran noche sin colas interminables, sin gritos y sin sentir que estás en una atracción de feria. Si buscas una <strong>alternativa al Ballermann en el norte de Mallorca</strong>, Port d'Alcúdia es la respuesta. Aquí te lo contamos con honestidad, sin vender humo.</p><h2>Qué ofrece cada zona: sur vs. norte</h2><p>Ninguna zona es mejor en abstracto; depende de lo que busques. El sur tiene un tipo de fiesta y el norte otro. Esta es la comparación sincera:</p><ul><li><strong>Playa de Palma / Ballermann:</strong> ambiente alemán muy marcado, música schlager, cerveza a litros, mega-discotecas y una fiesta que empieza de día y no para. Muy divertido si quieres desfase absoluto, pero también masificación, ruido constante y precios de zona turística intensiva.</li><li><strong>Magaluf:</strong> el clásico destino británico de despedidas y turismo joven. Bares de shots, pub crawls, mucho volumen. Energía altísima, pero también aglomeración y un ambiente que no todo el mundo busca.</li><li><strong>Port d'Alcúdia / norte:</strong> ocio nocturno de calidad a escala humana. Cocteles de autor, buena gastronomía, discoteca con DJs internacionales y ambiente internacional (alemán, británico, francés, italiano y español) sin la sensación de estar en una lata de sardinas. Ideal para quien quiere salir bien, no solo salir mucho.</li></ul><h2>Por qué elegir el norte para salir sin masificación</h2><p>El norte de Mallorca ha crecido como destino precisamente para el viajero que quiere ambiente pero valora su espacio. En Alcúdia encuentras playas enormes de arena fina, un casco histórico medieval y una oferta nocturna que ha subido mucho de nivel en los últimos años. Puedes tomar un cóctel viendo el atardecer, cenar sin prisas y acabar bailando, todo en la misma zona y a pocos minutos a pie. Si además quieres ideas para el resto del día, echa un vistazo a <a href="/blog/que-hacer-alcudia-mallorca">qué hacer en Alcúdia</a>.</p><p>La clave es la <strong>calidad frente a la cantidad</strong>: en lugar de mega-locales de miles de personas, aquí prima el servicio, la coctelería cuidada, la buena mesa y una pista donde suena buena música sin perder el trato cercano. Si quieres profundizar, tenemos una guía completa en <a href="/blog/guia-vida-nocturna-alcudia">vida nocturna de Alcúdia</a> y una panorámica de toda la isla en <a href="/blog/vida-nocturna-mallorca-guia">vida nocturna de Mallorca</a>.</p><h2>La noche tipo en Port d'Alcúdia</h2><p>Así es como muchos visitantes montan su noche perfecta con los tres locales de Grupo Enjoy, todos en Port d'Alcúdia.</p><h3>1. Cena tranquila en el puerto</h3><p>Empieza con una buena mesa. En Port d'Alcúdia tienes arroces, brasa y cocina para todos los gustos: nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guía de restaurantes de Alcúdia</a> te ayuda a elegir. Reserva con antelación para asegurar mesa en temporada alta.</p><h3>2. Cóctel y atardecer en Enjoy Terrace</h3><p>Después, cruza a la Av. Tucán 1 y sube el ritmo con calma en <a href="/enjoy">Enjoy Terrace</a>. Cócteles de autor y shisha premium en una terraza pensada para el mejor atardecer del Port. Abre a diario desde las 17:00 y su lema, "Where nights begin", no es casualidad: es el punto de partida perfecto antes de la fiesta.</p><h3>3. Club hasta tarde en Outxide</h3><p>Cuando cae la noche, la fiesta continúa en el mismo edificio. <a href="/outxide">Outxide Club</a> (Av. Tucán 1) es la discoteca de referencia del norte: techno, house y reggaetón, DJs internacionales, servicio VIP y reservados. Abre de jueves a sábado desde las 23:00, es solo para mayores de 18 y puedes sacar entradas y reservar mesa online en FourVenues. Su lema lo dice todo: "The night continues". Además tiene pantalla gigante para grandes eventos deportivos.</p><h2>Entonces, ¿norte o sur?</h2><p>Si tu plan ideal es fiesta extrema, precios bajos y no dormir, el sur cumple. Pero si quieres una noche redonda (buena cena, buen cóctel, buena música) en un entorno cuidado y sin masificación, el norte gana por goleada. Port d'Alcúdia te da todo eso a pocos metros de la playa y con un ambiente internacional relajado. Es, sencillamente, la mejor <strong>alternativa al Ballermann y a Magaluf</strong> para quien quiere salir sin renunciar a la calidad.</p>`,
      en: `<p>Majorca is not a single party island. When people think about going out, the first things that come to mind are usually the <strong>Ballermann</strong> in Playa de Palma or the buzz of <strong>Magaluf</strong>. But there is another Majorca, the north, where you can enjoy a great night out without endless queues, without the shouting and without feeling like you are inside a fairground ride. If you are looking for a <strong>quieter alternative to the Ballermann in northern Majorca</strong>, Port d'Alcúdia is the answer. Here is our honest take, no hype.</p><h2>What each area offers: south vs. north</h2><p>Neither area is better in the abstract; it depends on what you want. The south delivers one kind of party, the north another. Here is the honest comparison:</p><ul><li><strong>Playa de Palma / Ballermann:</strong> a very strong German scene, schlager music, beer by the litre, mega-clubs and a party that starts in daylight and never stops. Great fun if you want total mayhem, but also huge crowds, constant noise and intense-tourist-zone prices.</li><li><strong>Magaluf:</strong> the classic British destination for stag and hen dos and young travellers. Shot bars, pub crawls, high volume. Massive energy, but also crowds and a vibe that is not for everyone.</li><li><strong>Port d'Alcúdia / north:</strong> quality nightlife on a human scale. Signature cocktails, good food, a club with international DJs and an international crowd (German, British, French, Italian and Spanish) without feeling packed like sardines. Ideal for people who want to go out well, not just go out a lot.</li></ul><h2>Why choose the north for nightlife without the crowds</h2><p>Northern Majorca has grown as a destination precisely for the traveller who wants atmosphere but values their space. In Alcúdia you find huge fine-sand beaches, a medieval old town and a nightlife scene that has raised its game in recent years. You can enjoy a cocktail watching the sunset, have a relaxed dinner and end up dancing, all in the same area and just a few minutes on foot. For daytime ideas too, take a look at <a href="/blog/que-hacer-alcudia-mallorca">what to do in Alcúdia</a>.</p><p>The key is <strong>quality over quantity</strong>: instead of mega-venues holding thousands, here the focus is on service, careful mixology, good food and a dancefloor with great music that keeps a personal touch. To dig deeper, see our full guide to <a href="/blog/guia-vida-nocturna-alcudia">Alcúdia nightlife</a> and our island-wide overview of <a href="/blog/vida-nocturna-mallorca-guia">Majorca nightlife</a>.</p><h2>A typical night in Port d'Alcúdia</h2><p>This is how many visitors build their perfect night with the three Grupo Enjoy venues, all in Port d'Alcúdia.</p><h3>1. A relaxed dinner by the port</h3><p>Start with a good table. Port d'Alcúdia offers rice dishes, charcoal grill and cooking for every taste: our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to restaurants in Alcúdia</a> will help you choose. Book ahead to secure a table in high season.</p><h3>2. Cocktails and sunset at Enjoy Terrace</h3><p>Next, cross to Av. Tucán 1 and ease into the evening at <a href="/enjoy">Enjoy Terrace</a>. Signature cocktails and premium shisha on a terrace made for the best sunset in the Port. Open daily from 5:00 pm, and its motto, "Where nights begin", is no accident: it is the perfect launchpad before the party.</p><h3>3. Late-night clubbing at Outxide</h3><p>When night falls, the party continues in the same building. <a href="/outxide">Outxide Club</a> (Av. Tucán 1) is the north's leading club: techno, house and reggaeton, international DJs, VIP service and private tables. Open Thursday to Saturday from 11:00 pm, over-18s only, with tickets and table bookings online via FourVenues. Its motto says it all: "The night continues". It also has a giant screen for major sporting events.</p><h2>So, north or south?</h2><p>If your ideal plan is extreme partying, low prices and no sleep, the south delivers. But if you want a complete night (good dinner, good cocktail, good music) in a well-cared-for setting without the crowds, the north wins hands down. Port d'Alcúdia gives you all of that a few metres from the beach with a relaxed international atmosphere. It is, quite simply, the best <strong>alternative to the Ballermann and Magaluf</strong> for anyone who wants to go out without giving up on quality.</p>`,
      de: `<p>Mallorca ist nicht nur eine einzige Partyinsel. Wenn man ans Ausgehen denkt, kommen einem meist zuerst der <strong>Ballermann</strong> an der Playa de Palma oder der Trubel von <strong>Magaluf</strong> in den Sinn. Doch es gibt ein anderes Mallorca, den Norden, wo man eine großartige Nacht genießen kann, ohne endlose Schlangen, ohne Gebrüll und ohne das Gefühl, in einem Rummelplatz zu stecken. Wenn du eine <strong>ruhigere Alternative zum Ballermann im Norden Mallorcas</strong> suchst, ist Port d'Alcúdia die Antwort. Hier unsere ehrliche Einschätzung, ganz ohne leere Versprechen.</p><h2>Was jede Zone bietet: Süden vs. Norden</h2><p>Keine Zone ist grundsätzlich besser; es hängt davon ab, was du suchst. Der Süden bietet die eine Art Party, der Norden die andere. Hier der ehrliche Vergleich:</p><ul><li><strong>Playa de Palma / Ballermann:</strong> sehr deutsch geprägte Stimmung, Schlagermusik, Bier literweise, Mega-Discos und eine Party, die schon tagsüber beginnt und nicht aufhört. Riesig viel Spaß, wenn du den totalen Ausnahmezustand willst, aber auch Massenandrang, ständiger Lärm und Preise einer intensiven Touristenzone.</li><li><strong>Magaluf:</strong> das klassische britische Ziel für Junggesellenabschiede und junge Reisende. Shot-Bars, Pub-Crawls, hohe Lautstärke. Enorme Energie, aber auch Gedränge und eine Atmosphäre, die nicht jedem liegt.</li><li><strong>Port d'Alcúdia / Norden:</strong> hochwertiges Nachtleben auf menschlichem Maßstab. Signature-Cocktails, gute Gastronomie, ein Club mit internationalen DJs und internationalem Publikum (deutsch, britisch, französisch, italienisch und spanisch), ohne wie Sardinen zusammengepfercht zu sein. Ideal für alle, die gut ausgehen wollen, nicht nur viel.</li></ul><h2>Warum der Norden für Nachtleben ohne Massen</h2><p>Der Norden Mallorcas ist gerade für den Reisenden gewachsen, der Atmosphäre will, aber seinen Freiraum schätzt. In Alcúdia findest du riesige feinsandige Strände, eine mittelalterliche Altstadt und ein Nachtleben, das in den letzten Jahren deutlich an Niveau gewonnen hat. Du kannst einen Cocktail beim Sonnenuntergang genießen, in Ruhe zu Abend essen und schließlich tanzen gehen, alles in derselben Zone und wenige Gehminuten entfernt. Wenn du auch Ideen für den Tag suchst, wirf einen Blick auf <a href="/blog/que-hacer-alcudia-mallorca">was man in Alcúdia unternehmen kann</a>.</p><p>Der Schlüssel ist <strong>Qualität statt Quantität</strong>: Statt Mega-Locations für Tausende stehen hier Service, sorgfältige Cocktailkunst, gute Küche und eine Tanzfläche mit guter Musik und persönlicher Note im Vordergrund. Wenn du tiefer einsteigen möchtest, haben wir einen kompletten Guide zum <a href="/blog/guia-vida-nocturna-alcudia">Nachtleben von Alcúdia</a> und einen Überblick über die ganze Insel im <a href="/blog/vida-nocturna-mallorca-guia">Nachtleben von Mallorca</a>.</p><h2>Eine typische Nacht in Port d'Alcúdia</h2><p>So bauen sich viele Besucher ihre perfekte Nacht mit den drei Locations von Grupo Enjoy auf, alle in Port d'Alcúdia.</p><h3>1. Entspanntes Abendessen am Hafen</h3><p>Beginne mit einem guten Tisch. Port d'Alcúdia bietet Reisgerichte, Grill und Küche für jeden Geschmack: Unser <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide für Alcúdia</a> hilft bei der Wahl. Reserviere frühzeitig, um in der Hochsaison einen Tisch zu sichern.</p><h3>2. Cocktail und Sonnenuntergang im Enjoy Terrace</h3><p>Danach geht es zur Av. Tucán 1, wo du im <a href="/enjoy">Enjoy Terrace</a> gemächlich das Tempo steigerst. Signature-Cocktails und Premium-Shisha auf einer Terrasse, gemacht für den schönsten Sonnenuntergang im Port. Täglich ab 17:00 Uhr geöffnet, und das Motto "Where nights begin" ist kein Zufall: der perfekte Startpunkt vor der Party.</p><h3>3. Club bis spät im Outxide</h3><p>Wenn die Nacht hereinbricht, geht die Party im selben Gebäude weiter. <a href="/outxide">Outxide Club</a> (Av. Tucán 1) ist der führende Club des Nordens: Techno, House und Reggaeton, internationale DJs, VIP-Service und reservierte Bereiche. Geöffnet von Donnerstag bis Samstag ab 23:00 Uhr, nur für Personen ab 18 Jahren, mit Tickets und Tischreservierung online über FourVenues. Das Motto sagt alles: "The night continues". Außerdem gibt es eine Großleinwand für große Sportevents.</p><h2>Also, Norden oder Süden?</h2><p>Wenn dein Idealplan extremes Feiern, niedrige Preise und kein Schlaf ist, liefert der Süden. Aber wenn du eine runde Nacht willst (gutes Essen, guter Cocktail, gute Musik) in einem gepflegten Umfeld ohne Massen, gewinnt der Norden haushoch. Port d'Alcúdia bietet dir all das wenige Meter vom Strand entfernt, mit entspannter internationaler Atmosphäre. Es ist schlichtweg die beste <strong>Alternative zum Ballermann und zu Magaluf</strong> für alle, die ausgehen wollen, ohne auf Qualität zu verzichten.</p>`,
      fr: `<p>Majorque n'est pas qu'une seule île de fête. Quand on pense à sortir le soir, ce sont surtout le <strong>Ballermann</strong> de la Playa de Palma ou l'effervescence de <strong>Magaluf</strong> qui viennent à l'esprit. Mais il existe une autre Majorque, celle du nord, où l'on peut passer une superbe soirée sans files interminables, sans cris et sans avoir l'impression d'être dans une fête foraine. Si tu cherches une <strong>alternative plus tranquille au Ballermann dans le nord de Majorque</strong>, Port d'Alcúdia est la réponse. Voici notre avis honnête, sans esbroufe.</p><h2>Ce que chaque zone propose : sud vs. nord</h2><p>Aucune zone n'est meilleure dans l'absolu ; tout dépend de ce que tu recherches. Le sud offre un type de fête, le nord un autre. Voici la comparaison sincère :</p><ul><li><strong>Playa de Palma / Ballermann :</strong> ambiance très allemande, musique schlager, bière au litre, méga-discothèques et une fête qui commence en plein jour et ne s'arrête jamais. Très amusant si tu veux le débordement total, mais aussi foule immense, bruit constant et prix de zone touristique intensive.</li><li><strong>Magaluf :</strong> la destination britannique classique des enterrements de vie de garçon et de jeune fille et du tourisme jeune. Bars à shots, pub crawls, gros volume. Énergie énorme, mais aussi cohue et une ambiance qui ne convient pas à tout le monde.</li><li><strong>Port d'Alcúdia / nord :</strong> une vie nocturne de qualité à échelle humaine. Cocktails signature, bonne gastronomie, une discothèque avec des DJ internationaux et un public international (allemand, britannique, français, italien et espagnol) sans être serré comme des sardines. Idéal pour ceux qui veulent bien sortir, pas seulement sortir beaucoup.</li></ul><h2>Pourquoi choisir le nord pour sortir sans la foule</h2><p>Le nord de Majorque s'est développé précisément pour le voyageur qui veut de l'ambiance mais tient à son espace. À Alcúdia, tu trouves d'immenses plages de sable fin, une vieille ville médiévale et une offre nocturne qui a beaucoup monté en gamme ces dernières années. Tu peux prendre un cocktail face au coucher de soleil, dîner sans te presser et finir en dansant, le tout dans la même zone et à quelques minutes à pied. Pour des idées de journée, jette aussi un œil à <a href="/blog/que-hacer-alcudia-mallorca">que faire à Alcúdia</a>.</p><p>La clé, c'est la <strong>qualité plutôt que la quantité</strong> : au lieu de méga-établissements de plusieurs milliers de personnes, ici priment le service, la mixologie soignée, la bonne table et une piste où l'on passe de la bonne musique sans perdre le contact humain. Pour aller plus loin, consulte notre guide complet de la <a href="/blog/guia-vida-nocturna-alcudia">vie nocturne d'Alcúdia</a> et notre panorama de toute l'île sur la <a href="/blog/vida-nocturna-mallorca-guia">vie nocturne de Majorque</a>.</p><h2>Une soirée type à Port d'Alcúdia</h2><p>Voici comment de nombreux visiteurs organisent leur soirée parfaite avec les trois établissements de Grupo Enjoy, tous à Port d'Alcúdia.</p><h3>1. Dîner tranquille au port</h3><p>Commencez par une bonne table. Port d'Alcúdia offre des riz, de la braise et une cuisine pour tous les goûts : notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants d'Alcúdia</a> vous aidera à choisir. Réservez à l'avance pour assurer une table en haute saison.</p><h3>2. Cocktail et coucher de soleil à l'Enjoy Terrace</h3><p>Ensuite, traverse jusqu'à l'Av. Tucán 1 et monte doucement en régime à l'<a href="/enjoy">Enjoy Terrace</a>. Cocktails signature et chicha premium sur une terrasse pensée pour le plus beau coucher de soleil du Port. Ouvert tous les jours dès 17h00, et sa devise, "Where nights begin", n'est pas un hasard : c'est le point de départ parfait avant la fête.</p><h3>3. Club jusqu'au bout de la nuit à l'Outxide</h3><p>Quand la nuit tombe, la fête continue dans le même bâtiment. L'<a href="/outxide">Outxide Club</a> (Av. Tucán 1) est la discothèque de référence du nord : techno, house et reggaeton, DJ internationaux, service VIP et carrés privés. Ouvert du jeudi au samedi dès 23h00, réservé aux plus de 18 ans, avec billets et réservation de table en ligne via FourVenues. Sa devise dit tout : "The night continues". Il dispose aussi d'un écran géant pour les grands événements sportifs.</p><h2>Alors, nord ou sud ?</h2><p>Si ton plan idéal, c'est la fête extrême, les prix bas et zéro sommeil, le sud fait le job. Mais si tu veux une soirée réussie de bout en bout (bon dîner, bon cocktail, bonne musique) dans un cadre soigné et sans la foule, le nord gagne haut la main. Port d'Alcúdia t'offre tout cela à quelques mètres de la plage, avec une ambiance internationale détendue. C'est, tout simplement, la meilleure <strong>alternative au Ballermann et à Magaluf</strong> pour qui veut sortir sans renoncer à la qualité.</p>`,
      it: `<p>Maiorca non è una sola isola della festa. Quando si pensa a uscire la sera, la prima cosa che viene in mente sono di solito il <strong>Ballermann</strong> di Playa de Palma o il fermento di <strong>Magaluf</strong>. Ma c'è un'altra Maiorca, quella del nord, dove si può godere di una gran serata senza code interminabili, senza urla e senza sentirsi dentro un luna park. Se cerchi un'<strong>alternativa più tranquilla al Ballermann nel nord di Maiorca</strong>, Port d'Alcúdia è la risposta. Ecco il nostro parere onesto, senza fumo negli occhi.</p><h2>Cosa offre ciascuna zona: sud vs. nord</h2><p>Nessuna zona è migliore in assoluto; dipende da cosa cerchi. Il sud offre un tipo di festa, il nord un altro. Ecco il confronto sincero:</p><ul><li><strong>Playa de Palma / Ballermann:</strong> atmosfera molto tedesca, musica schlager, birra a litri, mega-discoteche e una festa che comincia di giorno e non si ferma mai. Divertentissimo se vuoi lo sballo totale, ma anche folla enorme, rumore continuo e prezzi da zona turistica intensiva.</li><li><strong>Magaluf:</strong> la classica meta britannica per addii al celibato e al nubilato e turismo giovane. Bar di shot, pub crawl, volume altissimo. Energia enorme, ma anche ressa e un'atmosfera che non è per tutti.</li><li><strong>Port d'Alcúdia / nord:</strong> vita notturna di qualità a misura d'uomo. Cocktail d'autore, buona gastronomia, una discoteca con DJ internazionali e un pubblico internazionale (tedesco, britannico, francese, italiano e spagnolo) senza essere stipati come sardine. Ideale per chi vuole uscire bene, non solo uscire tanto.</li></ul><h2>Perché scegliere il nord per uscire senza ressa</h2><p>Il nord di Maiorca è cresciuto proprio per il viaggiatore che vuole atmosfera ma tiene ai propri spazi. Ad Alcúdia trovi enormi spiagge di sabbia fine, un centro storico medievale e un'offerta notturna che negli ultimi anni ha alzato molto il livello. Puoi bere un cocktail guardando il tramonto, cenare con calma e finire ballando, tutto nella stessa zona e a pochi minuti a piedi. Per idee anche di giorno, dai un'occhiata a <a href="/blog/que-hacer-alcudia-mallorca">cosa fare ad Alcúdia</a>.</p><p>La chiave è la <strong>qualità sulla quantità</strong>: invece di mega-locali da migliaia di persone, qui contano il servizio, la mixology curata, la buona tavola e una pista con buona musica senza perdere il rapporto umano. Per approfondire, abbiamo una guida completa sulla <a href="/blog/guia-vida-nocturna-alcudia">vita notturna di Alcúdia</a> e una panoramica dell'intera isola sulla <a href="/blog/vida-nocturna-mallorca-guia">vita notturna di Maiorca</a>.</p><h2>Una serata tipo a Port d'Alcúdia</h2><p>Ecco come molti visitatori costruiscono la loro serata perfetta con i tre locali di Grupo Enjoy, tutti a Port d'Alcúdia.</p><h3>1. Cena tranquilla al porto</h3><p>Inizia con un buon tavolo. Port d'Alcúdia offre risi, brace e cucina per tutti i gusti: la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti di Alcúdia</a> ti aiuta a scegliere. Prenota in anticipo per assicurarti un tavolo in alta stagione.</p><h3>2. Cocktail e tramonto all'Enjoy Terrace</h3><p>Poi attraversa fino ad Av. Tucán 1 e alza il ritmo con calma all'<a href="/enjoy">Enjoy Terrace</a>. Cocktail d'autore e shisha premium su una terrazza pensata per il miglior tramonto del Port. Aperto tutti i giorni dalle 17:00, e il suo motto, "Where nights begin", non è un caso: è il punto di partenza perfetto prima della festa.</p><h3>3. Club fino a tardi all'Outxide</h3><p>Quando cala la notte, la festa continua nello stesso edificio. L'<a href="/outxide">Outxide Club</a> (Av. Tucán 1) è la discoteca di riferimento del nord: techno, house e reggaeton, DJ internazionali, servizio VIP e privé. Aperto dal giovedì al sabato dalle 23:00, solo per maggiori di 18 anni, con biglietti e prenotazione tavoli online tramite FourVenues. Il motto dice tutto: "The night continues". Dispone inoltre di un maxischermo per i grandi eventi sportivi.</p><h2>Quindi, nord o sud?</h2><p>Se il tuo piano ideale è festa estrema, prezzi bassi e niente sonno, il sud fa al caso tuo. Ma se vuoi una serata completa (buona cena, buon cocktail, buona musica) in un contesto curato e senza ressa, il nord vince a mani basse. Port d'Alcúdia ti offre tutto questo a pochi metri dalla spiaggia, con un'atmosfera internazionale rilassata. È, semplicemente, la migliore <strong>alternativa al Ballermann e a Magaluf</strong> per chi vuole uscire senza rinunciare alla qualità.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-07-16",
    updated: "2026-08-29",
    image: "/images/outxide/669619110_1705310767538590_886514651058288141_n.jpg",
    tags: ["ocio nocturno norte mallorca", "alternativa ballermann", "nightlife north mallorca", "alcudia vs magaluf", "salir de fiesta mallorca"],
    venue: "general",
    readingTime: 6,
    faq: [
      {
        question: {
          es: "¿Es el norte de Mallorca una buena alternativa al Ballermann o a Magaluf?",
          en: "Is northern Majorca a good alternative to the Ballermann or Magaluf?",
          de: "Ist der Norden Mallorcas eine gute Alternative zum Ballermann oder zu Magaluf?",
          fr: "Le nord de Majorque est-il une bonne alternative au Ballermann ou à Magaluf ?",
          it: "Il nord di Maiorca è una buona alternativa al Ballermann o a Magaluf?",
        },
        answer: {
          es: "Sí. Port d'Alcúdia ofrece cócteles de autor, buena gastronomía y discoteca con DJs internacionales, con ambiente internacional pero sin la masificación del sur.",
          en: "Yes. Port d'Alcúdia offers signature cocktails, good food and a club with international DJs, with an international crowd but without the crowds of the south.",
          de: "Ja. Port d'Alcúdia bietet Signature-Cocktails, gute Gastronomie und einen Club mit internationalen DJs, mit internationalem Publikum, aber ohne den Massenandrang des Südens.",
          fr: "Oui. Port d'Alcúdia propose des cocktails signature, une bonne gastronomie et une discothèque avec des DJ internationaux, dans une ambiance internationale mais sans la foule du sud.",
          it: "Sì. Port d'Alcúdia offre cocktail d'autore, buona gastronomia e una discoteca con DJ internazionali, con pubblico internazionale ma senza la ressa del sud.",
        },
      },
      {
        question: {
          es: "¿Qué locales forman el plan de noche en Port d'Alcúdia?",
          en: "Which venues make up a night out in Port d'Alcúdia?",
          de: "Welche Locations bilden den Abendplan in Port d'Alcúdia?",
          fr: "Quels établissements composent une soirée à Port d'Alcúdia ?",
          it: "Quali locali compongono la serata a Port d'Alcúdia?",
        },
        answer: {
          es: "Cena en uno de los restaurantes del puerto, cóctel y atardecer en Enjoy Terrace (Av. Tucán 1) y discoteca en Outxide Club (Av. Tucán 1).",
          en: "Dinner at one of the restaurants by the port, cocktails and sunset at Enjoy Terrace (Av. Tucán 1) and clubbing at Outxide Club (Av. Tucán 1).",
          de: "Abendessen in einem der Restaurants am Hafen, Cocktail und Sonnenuntergang im Enjoy Terrace (Av. Tucán 1) und Club im Outxide Club (Av. Tucán 1).",
          fr: "Dîner dans l'un des restaurants du port, cocktail et coucher de soleil à l'Enjoy Terrace (Av. Tucán 1) et discothèque à l'Outxide Club (Av. Tucán 1).",
          it: "Cena in uno dei ristoranti del porto, cocktail e tramonto all'Enjoy Terrace (Av. Tucán 1) e discoteca all'Outxide Club (Av. Tucán 1).",
        },
      },
      {
        question: {
          es: "¿Qué horarios y días tiene la discoteca Outxide Club?",
          en: "What are the opening days and hours of Outxide Club?",
          de: "Welche Öffnungstage und -zeiten hat der Outxide Club?",
          fr: "Quels sont les jours et horaires d'ouverture de l'Outxide Club ?",
          it: "Quali sono i giorni e gli orari di apertura dell'Outxide Club?",
        },
        answer: {
          es: "Outxide Club abre de jueves a sábado desde las 23:00, solo para mayores de 18 años. Entradas y reservados online en FourVenues.",
          en: "Outxide Club is open Thursday to Saturday from 11:00 pm, over-18s only. Tickets and private tables online via FourVenues.",
          de: "Der Outxide Club ist von Donnerstag bis Samstag ab 23:00 Uhr geöffnet, nur für Personen ab 18 Jahren. Tickets und reservierte Bereiche online über FourVenues.",
          fr: "L'Outxide Club est ouvert du jeudi au samedi dès 23h00, réservé aux plus de 18 ans. Billets et carrés privés en ligne via FourVenues.",
          it: "L'Outxide Club è aperto dal giovedì al sabato dalle 23:00, solo per maggiori di 18 anni. Biglietti e privé online tramite FourVenues.",
        },
      },
      {
        question: {
          es: "¿Dónde ver el atardecer con un cóctel en Port d'Alcúdia?",
          en: "Where can I watch the sunset with a cocktail in Port d'Alcúdia?",
          de: "Wo kann man in Port d'Alcúdia den Sonnenuntergang bei einem Cocktail genießen?",
          fr: "Où admirer le coucher de soleil avec un cocktail à Port d'Alcúdia ?",
          it: "Dove ammirare il tramonto con un cocktail a Port d'Alcúdia?",
        },
        answer: {
          es: "En Enjoy Terrace (Av. Tucán 1), con cócteles de autor y shisha premium en terraza. Abre a diario desde las 17:00.",
          en: "At Enjoy Terrace (Av. Tucán 1), with signature cocktails and premium shisha on the terrace. Open daily from 5:00 pm.",
          de: "Im Enjoy Terrace (Av. Tucán 1), mit Signature-Cocktails und Premium-Shisha auf der Terrasse. Täglich ab 17:00 Uhr geöffnet.",
          fr: "À l'Enjoy Terrace (Av. Tucán 1), avec des cocktails signature et de la chicha premium en terrasse. Ouvert tous les jours dès 17h00.",
          it: "All'Enjoy Terrace (Av. Tucán 1), con cocktail d'autore e shisha premium in terrazza. Aperto tutti i giorni dalle 17:00.",
        },
      },
    ],
  },
  {
    slug: "cuanto-cuesta-salir-fiesta-alcudia-precios",
    title: {
      es: "Cuánto Cuesta Salir de Fiesta en Alcúdia: Guía de Precios 2026",
      en: "How Much It Costs to Go Out in Alcúdia: 2026 Price Guide",
      de: "Was kostet Ausgehen in Alcúdia: Preis-Guide 2026",
      fr: "Combien Coûte une Sortie à Alcúdia : Guide des Prix 2026",
      it: "Quanto Costa Uscire a Divertirsi ad Alcúdia: Guida ai Prezzi 2026",
    },
    excerpt: {
      es: "¿Cuánto cuesta salir de fiesta en Alcúdia? Guía práctica de precios: entradas y reservados en FourVenues, copas, cócteles y shisha, presupuesto por tipo de noche y trucos para ahorrar en Port d'Alcúdia (Mallorca).",
      en: "How much does it cost to go out in Alcúdia? A practical price guide: tickets and VIP tables on FourVenues, drinks, cocktails and shisha, budget by type of night and tips to save in Port d'Alcúdia (Mallorca).",
      de: "Was kostet Ausgehen in Alcúdia? Ein praktischer Preis-Guide: Tickets und Reservados über FourVenues, Drinks, Cocktails und Shisha, Budget nach Art der Nacht und Spartipps in Port d'Alcúdia (Mallorca).",
      fr: "Combien coûte une sortie à Alcúdia ? Un guide pratique des prix : billets et tables VIP sur FourVenues, verres, cocktails et chicha, budget par type de soirée et astuces pour économiser à Port d'Alcúdia (Majorque).",
      it: "Quanto costa uscire a divertirsi ad Alcúdia? Una guida pratica ai prezzi: biglietti e tavoli riservati su FourVenues, drink, cocktail e shisha, budget per tipo di serata e trucchi per risparmiare a Port d'Alcúdia (Maiorca).",
    },
    content: {
      es: `<p>Planear una noche de fiesta en el norte de Mallorca es más fácil (y más barato) de lo que muchos creen. Si te preguntas <strong>cuánto cuesta salir de fiesta en Alcúdia</strong>, la respuesta honesta es: depende de la noche que busques. No es lo mismo tomar un cóctel al atardecer que reservar una mesa VIP un sábado con DJ internacional. En esta guía práctica te explicamos cómo se compran las entradas, qué esperar del gasto en copas y shisha, y cómo montar tu <strong>presupuesto de fiesta en Alcúdia</strong> sin sustos. Sin cifras infladas: solo cómo funciona y cómo pagar menos.</p>

<h2>Entradas y reservados: cómo y dónde se compran</h2>
<p>En <a href="/outxide">Outxide Club</a>, la discoteca de Port d'Alcúdia, tanto las entradas como los reservados VIP se compran online a través de <strong>FourVenues</strong>. El <strong>precio de la entrada de discoteca en Alcúdia</strong> no es fijo: varía según el evento, el día y el DJ que pinche esa noche. Una sesión de un jueves normal no cuesta lo mismo que un fin de semana con cartel especial. Por eso la única cifra fiable es la que aparece en la plataforma en el momento de comprar.</p>
<p>Lo mismo pasa con los reservados y el servicio VIP: el precio depende del tamaño de la mesa, su ubicación en la sala y las botellas incluidas. Para saber el importe exacto de tu noche, entra en la ficha del evento en <a href="/outxide">Outxide</a> y consulta la disponibilidad online. Reservar por adelantado es siempre la opción más lista, sobre todo en julio y agosto.</p>

<h2>Copas, cócteles y shisha: qué esperar del gasto</h2>
<p>Fuera de la entrada, el grueso del presupuesto se va en las consumiciones. En <a href="/enjoy">Enjoy Terrace</a>, el bar de cócteles de autor y shisha premium abierto a diario desde las 17:00, el gasto medio depende de si vienes a tomar una copa tranquila viendo el atardecer o a compartir shisha en grupo durante horas. Los cócteles de autor tienen un precio superior al de una copa básica, y la shisha premium se paga aparte, normalmente por cachimba para compartir.</p>
<p>Dentro de la discoteca, las copas y combinados siguen la tónica habitual de cualquier club de temporada en Mallorca. Un consejo local: si empiezas la noche con calma en la terraza y reservas la discoteca para el tramo final, controlas mucho mejor el gasto total. Para ver todas las opciones de la zona, echa un ojo a nuestra guía de <a href="/blog/mejores-discotecas-clubs-alcudia">mejores discotecas y clubs de Alcúdia</a>.</p>

<h2>Presupuesto por tipo de noche: tranquila, media o VIP</h2>
<p>No hay un único "cuánto cuesta salir en Mallorca", porque depende del plan. Te lo resumimos en tres perfiles:</p>
<ul>
<li><strong>Noche tranquila:</strong> un par de cócteles en la terraza de Enjoy al atardecer, quizá una shisha compartida, y a casa. Es el plan más económico y no necesitas entrada.</li>
<li><strong>Noche media:</strong> unas copas en la terraza y luego entrada a Outxide para bailar. Aquí sumas el precio de la entrada (comprada online) más las consumiciones dentro.</li>
<li><strong>Noche VIP:</strong> reservado con mesa y botellas en Outxide para un grupo. Es la opción más alta, pero repartida entre varios amigos sale más razonable de lo que parece, y te garantiza sitio y servicio toda la noche.</li>
</ul>
<p>Para organizar bien las horas y encadenar los tres locales, te ayudará nuestro <a href="/blog/plan-nocturno-port-alcudia-mallorca">plan nocturno por Port d'Alcúdia</a>.</p>

<h2>Cómo ahorrar en tu noche de fiesta</h2>
<p>Salir de fiesta en Alcúdia sin gastar de más es cuestión de planificar. Estos son los trucos que de verdad funcionan:</p>
<ul>
<li><strong>Compra la entrada online por adelantado:</strong> en FourVenues sueles encontrar mejores condiciones que pagando en puerta, y aseguras el acceso en noches de mucha demanda.</li>
<li><strong>Ve con tiempo:</strong> llegar pronto evita colas y a veces coincide con las mejores tarifas de acceso anticipado.</li>
<li><strong>Empieza en la terraza:</strong> aprovechar el ambiente de <a href="/enjoy">Enjoy</a> antes de entrar a la discoteca estira la noche sin disparar el gasto.</li>
<li><strong>Comparte reservado en grupo:</strong> si sois varios, la mesa VIP dividida por persona compensa y evita rondas sueltas en la barra.</li>
<li><strong>Consulta siempre el precio exacto en la web:</strong> como los importes cambian según el evento, el dato definitivo está en la ficha online de <a href="/outxide">Outxide</a>.</li>
</ul>
<p>La gran ventaja de Alcúdia es que ofrece una noche completa —terraza, discoteca y buen ambiente internacional— sin la masificación ni los precios de Magaluf o Playa de Palma. Planifica, compra online y disfruta: salir de fiesta en el norte de Mallorca sale a cuenta.</p>`,
      en: `<p>Planning a night out in northern Mallorca is easier (and cheaper) than many people think. If you're wondering <strong>how much it costs to go out in Alcúdia</strong>, the honest answer is: it depends on the night you're after. Sipping a cocktail at sunset is not the same as booking a VIP table on a Saturday with an international DJ. In this practical guide we explain how tickets are bought, what to expect to spend on drinks and shisha, and how to plan your <strong>Alcúdia party budget</strong> with no surprises. No inflated figures — just how it works and how to pay less.</p>

<h2>Tickets and VIP tables: how and where to buy</h2>
<p>At <a href="/outxide">Outxide Club</a>, the nightclub in Port d'Alcúdia, both tickets and VIP tables are bought online through <strong>FourVenues</strong>. The <strong>nightclub entry price in Alcúdia</strong> is not fixed: it varies depending on the event, the day and the DJ playing that night. A regular Thursday session doesn't cost the same as a weekend with a special line-up. That's why the only reliable figure is the one shown on the platform at the moment you buy.</p>
<p>The same goes for VIP tables and bottle service: the price depends on the table size, its location in the room and the bottles included. To find out the exact amount for your night, open the event page on <a href="/outxide">Outxide</a> and check availability online. Booking in advance is always the smart move, especially in July and August.</p>

<h2>Drinks, cocktails and shisha: what to expect to spend</h2>
<p>Beyond the entry ticket, the bulk of the budget goes on drinks. At <a href="/enjoy">Enjoy Terrace</a>, the signature-cocktail and premium-shisha bar open daily from 17:00, the average spend depends on whether you come for a relaxed drink watching the sunset or to share shisha in a group for hours. Signature cocktails cost more than a basic drink, and premium shisha is charged separately, usually per pipe to share.</p>
<p>Inside the club, drinks and mixers follow the usual pattern of any seasonal club in Mallorca. A local tip: if you start the night gently on the terrace and save the club for the final stretch, you'll control your total spend much better. To see every option in the area, take a look at our guide to the <a href="/blog/mejores-discotecas-clubs-alcudia">best nightclubs and clubs in Alcúdia</a>.</p>

<h2>Budget by type of night: relaxed, mid-range or VIP</h2>
<p>There's no single answer to "how much it costs to go out in Mallorca", because it depends on the plan. Here it is in three profiles:</p>
<ul>
<li><strong>Relaxed night:</strong> a couple of cocktails on the Enjoy terrace at sunset, maybe a shared shisha, and home. It's the most affordable plan and you don't need a ticket.</li>
<li><strong>Mid-range night:</strong> a few drinks on the terrace and then entry to Outxide to dance. Here you add the ticket price (bought online) plus drinks inside.</li>
<li><strong>VIP night:</strong> a table with bottle service at Outxide for a group. It's the highest option, but split between several friends it works out more reasonable than it looks, and it guarantees you a spot and service all night.</li>
</ul>
<p>To organise your hours well and link the three venues together, our <a href="/blog/plan-nocturno-port-alcudia-mallorca">night-out plan around Port d'Alcúdia</a> will help.</p>

<h2>How to save on your night out</h2>
<p>Going out in Alcúdia without overspending is all about planning. These are the tips that really work:</p>
<ul>
<li><strong>Buy your ticket online in advance:</strong> on FourVenues you usually find better conditions than paying at the door, and you secure entry on busy nights.</li>
<li><strong>Arrive early:</strong> getting there early avoids queues and sometimes coincides with the best early-access rates.</li>
<li><strong>Start on the terrace:</strong> making the most of the atmosphere at <a href="/enjoy">Enjoy</a> before entering the club stretches the night without pushing up the spend.</li>
<li><strong>Share a table as a group:</strong> if there are several of you, a VIP table split per person pays off and avoids loose rounds at the bar.</li>
<li><strong>Always check the exact price on the website:</strong> since amounts change by event, the definitive figure is on the online event page at <a href="/outxide">Outxide</a>.</li>
</ul>
<p>Alcúdia's big advantage is that it offers a complete night — terrace, club and a great international crowd — without the crowds or the prices of Magaluf or Playa de Palma. Plan ahead, buy online and enjoy: going out in northern Mallorca is well worth it.</p>`,
      de: `<p>Eine Partynacht im Norden Mallorcas zu planen ist einfacher (und günstiger), als viele denken. Wenn du dich fragst, <strong>wie viel es kostet, in Alcúdia auszugehen</strong>, lautet die ehrliche Antwort: Es kommt auf die Nacht an, die du suchst. Ein Cocktail bei Sonnenuntergang ist etwas anderes als ein VIP-Tisch an einem Samstag mit internationalem DJ. In diesem praktischen Ratgeber erklären wir, wie man Tickets kauft, womit du bei Drinks und Shisha rechnen solltest und wie du dein <strong>Party-Budget für Alcúdia</strong> ohne böse Überraschungen planst. Keine aufgeblasenen Zahlen — nur, wie es funktioniert und wie du weniger zahlst.</p>

<h2>Tickets und Reservados: wie und wo man kauft</h2>
<p>Im <a href="/outxide">Outxide Club</a>, der Diskothek in Port d'Alcúdia, werden sowohl Tickets als auch VIP-Reservados online über <strong>FourVenues</strong> gekauft. Der <strong>Eintrittspreis für die Disco in Alcúdia</strong> ist nicht fest: Er hängt vom Event, vom Tag und vom DJ ab, der an dem Abend auflegt. Eine normale Donnerstag-Session kostet nicht dasselbe wie ein Wochenende mit besonderem Line-up. Deshalb ist die einzige verlässliche Zahl diejenige, die im Moment des Kaufs auf der Plattform steht.</p>
<p>Dasselbe gilt für Reservados und VIP-Service: Der Preis hängt von der Größe des Tisches, seiner Lage im Saal und den enthaltenen Flaschen ab. Um den genauen Betrag für deine Nacht zu erfahren, öffne die Event-Seite bei <a href="/outxide">Outxide</a> und prüfe die Verfügbarkeit online. Im Voraus zu buchen ist immer die clevere Wahl, vor allem im Juli und August.</p>

<h2>Drinks, Cocktails und Shisha: womit du rechnen solltest</h2>
<p>Neben dem Eintritt fließt der Großteil des Budgets in die Getränke. In der <a href="/enjoy">Enjoy Terrace</a>, der Bar für Signature-Cocktails und Premium-Shisha, täglich ab 17:00 Uhr geöffnet, hängen die durchschnittlichen Ausgaben davon ab, ob du für einen entspannten Drink bei Sonnenuntergang kommst oder stundenlang in der Gruppe Shisha teilst. Signature-Cocktails kosten mehr als ein einfacher Drink, und die Premium-Shisha wird separat berechnet, meist pro Pfeife zum Teilen.</p>
<p>In der Disco folgen Drinks und Longdrinks dem üblichen Muster jedes Saisonclubs auf Mallorca. Ein Tipp von Einheimischen: Wenn du den Abend ruhig auf der Terrasse beginnst und die Disco für den Schlussteil aufhebst, kontrollierst du deine Gesamtausgaben viel besser. Alle Optionen der Gegend findest du in unserem Guide zu den <a href="/blog/mejores-discotecas-clubs-alcudia">besten Diskotheken und Clubs in Alcúdia</a>.</p>

<h2>Budget nach Art der Nacht: ruhig, mittel oder VIP</h2>
<p>Es gibt kein einziges "wie viel kostet Ausgehen auf Mallorca", denn es hängt vom Plan ab. Hier in drei Profilen:</p>
<ul>
<li><strong>Ruhige Nacht:</strong> ein paar Cocktails auf der Enjoy-Terrasse bei Sonnenuntergang, vielleicht eine geteilte Shisha, und nach Hause. Das ist der günstigste Plan und du brauchst kein Ticket.</li>
<li><strong>Mittlere Nacht:</strong> ein paar Drinks auf der Terrasse und dann Eintritt ins Outxide zum Tanzen. Hier kommt der Ticketpreis (online gekauft) plus die Getränke drinnen dazu.</li>
<li><strong>VIP-Nacht:</strong> ein Reservado mit Tisch und Flaschen im Outxide für eine Gruppe. Das ist die höchste Option, aber auf mehrere Freunde aufgeteilt fällt sie vernünftiger aus, als es scheint, und sichert dir Platz und Service die ganze Nacht.</li>
</ul>
<p>Um die Stunden gut zu planen und die drei Locations zu verbinden, hilft dir unser <a href="/blog/plan-nocturno-port-alcudia-mallorca">Nachtplan durch Port d'Alcúdia</a>.</p>

<h2>Wie du bei deiner Partynacht sparst</h2>
<p>In Alcúdia auszugehen, ohne zu viel auszugeben, ist eine Frage der Planung. Das sind die Tricks, die wirklich funktionieren:</p>
<ul>
<li><strong>Kauf dein Ticket im Voraus online:</strong> bei FourVenues findest du meist bessere Konditionen als an der Tür und sicherst dir den Zugang an stark nachgefragten Abenden.</li>
<li><strong>Sei früh dran:</strong> früh anzukommen erspart Warteschlangen und trifft manchmal die besten Early-Access-Tarife.</li>
<li><strong>Starte auf der Terrasse:</strong> das Ambiente im <a href="/enjoy">Enjoy</a> vor dem Club zu genießen, verlängert die Nacht, ohne die Ausgaben in die Höhe zu treiben.</li>
<li><strong>Teilt ein Reservado in der Gruppe:</strong> wenn ihr mehrere seid, lohnt sich der VIP-Tisch pro Person und ihr spart euch lose Runden an der Bar.</li>
<li><strong>Prüfe immer den genauen Preis auf der Website:</strong> da die Beträge je nach Event variieren, steht die endgültige Zahl auf der Online-Event-Seite von <a href="/outxide">Outxide</a>.</li>
</ul>
<p>Der große Vorteil von Alcúdia: Es bietet eine komplette Nacht — Terrasse, Disco und tolles internationales Publikum — ohne die Menschenmassen und die Preise von Magaluf oder Playa de Palma. Plane, kaufe online und genieße: Ausgehen im Norden Mallorcas lohnt sich.</p>`,
      fr: `<p>Organiser une soirée dans le nord de Majorque est plus simple (et moins cher) qu'on ne le croit. Si vous vous demandez <strong>combien coûte une sortie à Alcúdia</strong>, la réponse honnête est : cela dépend de la soirée que vous cherchez. Prendre un cocktail au coucher du soleil, ce n'est pas la même chose que réserver une table VIP un samedi avec un DJ international. Dans ce guide pratique, nous expliquons comment s'achètent les billets, à quoi s'attendre côté verres et chicha, et comment établir votre <strong>budget de sortie à Alcúdia</strong> sans mauvaise surprise. Aucun chiffre gonflé — juste comment ça marche et comment payer moins.</p>

<h2>Billets et tables VIP : comment et où les acheter</h2>
<p>À l'<a href="/outxide">Outxide Club</a>, la discothèque de Port d'Alcúdia, les billets comme les tables VIP s'achètent en ligne via <strong>FourVenues</strong>. Le <strong>prix d'entrée en discothèque à Alcúdia</strong> n'est pas fixe : il varie selon l'événement, le jour et le DJ qui mixe ce soir-là. Une soirée d'un jeudi ordinaire ne coûte pas la même chose qu'un week-end avec une affiche spéciale. C'est pourquoi le seul chiffre fiable est celui affiché sur la plateforme au moment de l'achat.</p>
<p>Il en va de même pour les tables VIP et le service bouteilles : le prix dépend de la taille de la table, de son emplacement dans la salle et des bouteilles incluses. Pour connaître le montant exact de votre soirée, ouvrez la fiche de l'événement sur <a href="/outxide">Outxide</a> et vérifiez la disponibilité en ligne. Réserver à l'avance est toujours le choix malin, surtout en juillet et en août.</p>

<h2>Verres, cocktails et chicha : à quoi s'attendre</h2>
<p>Au-delà du billet d'entrée, l'essentiel du budget part dans les consommations. À l'<a href="/enjoy">Enjoy Terrace</a>, le bar de cocktails signature et chicha premium ouvert tous les jours dès 17h00, la dépense moyenne dépend de si vous venez pour un verre tranquille face au coucher du soleil ou pour partager une chicha en groupe pendant des heures. Les cocktails signature coûtent plus qu'un verre basique, et la chicha premium se paie à part, généralement par narguilé à partager.</p>
<p>À l'intérieur de la discothèque, les verres et les alcools suivent la logique habituelle de tout club de saison à Majorque. Un conseil de locaux : si vous commencez la soirée en douceur sur la terrasse et gardez la discothèque pour la dernière partie, vous maîtrisez bien mieux la dépense totale. Pour voir toutes les options du secteur, jetez un œil à notre guide des <a href="/blog/mejores-discotecas-clubs-alcudia">meilleures discothèques et clubs d'Alcúdia</a>.</p>

<h2>Budget par type de soirée : tranquille, moyenne ou VIP</h2>
<p>Il n'y a pas de réponse unique à "combien coûte une sortie à Majorque", car tout dépend du plan. Voici trois profils :</p>
<ul>
<li><strong>Soirée tranquille :</strong> quelques cocktails sur la terrasse d'Enjoy au coucher du soleil, peut-être une chicha partagée, puis retour. C'est le plan le plus économique et vous n'avez pas besoin de billet.</li>
<li><strong>Soirée moyenne :</strong> quelques verres sur la terrasse puis entrée à l'Outxide pour danser. Ici, vous ajoutez le prix du billet (acheté en ligne) aux consommations à l'intérieur.</li>
<li><strong>Soirée VIP :</strong> une table avec bouteilles à l'Outxide pour un groupe. C'est l'option la plus élevée, mais répartie entre plusieurs amis elle revient plus raisonnable qu'il n'y paraît, et vous garantit une place et le service toute la nuit.</li>
</ul>
<p>Pour bien organiser vos horaires et enchaîner les trois établissements, notre <a href="/blog/plan-nocturno-port-alcudia-mallorca">plan de soirée à Port d'Alcúdia</a> vous aidera.</p>

<h2>Comment économiser sur votre soirée</h2>
<p>Sortir à Alcúdia sans trop dépenser, c'est une question d'organisation. Voici les astuces qui marchent vraiment :</p>
<ul>
<li><strong>Achetez votre billet en ligne à l'avance :</strong> sur FourVenues, vous trouvez souvent de meilleures conditions qu'en payant à l'entrée, et vous assurez votre accès les soirs de forte affluence.</li>
<li><strong>Arrivez tôt :</strong> venir tôt évite les files d'attente et coïncide parfois avec les meilleurs tarifs d'accès anticipé.</li>
<li><strong>Commencez sur la terrasse :</strong> profiter de l'ambiance de l'<a href="/enjoy">Enjoy</a> avant d'entrer en discothèque prolonge la soirée sans faire grimper la dépense.</li>
<li><strong>Partagez une table en groupe :</strong> si vous êtes plusieurs, la table VIP divisée par personne est rentable et évite les tournées à l'unité au bar.</li>
<li><strong>Vérifiez toujours le prix exact sur le site :</strong> comme les montants changent selon l'événement, le chiffre définitif est sur la fiche en ligne d'<a href="/outxide">Outxide</a>.</li>
</ul>
<p>Le grand atout d'Alcúdia, c'est d'offrir une soirée complète — terrasse, discothèque et belle ambiance internationale — sans la foule ni les prix de Magaluf ou de Playa de Palma. Planifiez, achetez en ligne et profitez : sortir dans le nord de Majorque, ça vaut le coup.</p>`,
      it: `<p>Organizzare una serata di festa nel nord di Maiorca è più facile (ed economico) di quanto molti pensino. Se ti stai chiedendo <strong>quanto costa uscire a divertirsi ad Alcúdia</strong>, la risposta onesta è: dipende dalla serata che cerchi. Bere un cocktail al tramonto non è come prenotare un tavolo VIP di sabato con un DJ internazionale. In questa guida pratica ti spieghiamo come si acquistano i biglietti, cosa aspettarti di spendere tra drink e shisha e come impostare il tuo <strong>budget per una serata ad Alcúdia</strong> senza sorprese. Nessuna cifra gonfiata — solo come funziona e come pagare meno.</p>

<h2>Biglietti e tavoli riservati: come e dove si comprano</h2>
<p>All'<a href="/outxide">Outxide Club</a>, la discoteca di Port d'Alcúdia, sia i biglietti sia i tavoli VIP si acquistano online tramite <strong>FourVenues</strong>. Il <strong>prezzo del biglietto della discoteca ad Alcúdia</strong> non è fisso: varia in base all'evento, al giorno e al DJ che suona quella sera. Una serata di un giovedì normale non costa come un fine settimana con un cartellone speciale. Per questo l'unica cifra affidabile è quella che appare sulla piattaforma al momento dell'acquisto.</p>
<p>Lo stesso vale per i tavoli riservati e il servizio VIP: il prezzo dipende dalla dimensione del tavolo, dalla sua posizione in sala e dalle bottiglie incluse. Per conoscere l'importo esatto della tua serata, apri la scheda dell'evento su <a href="/outxide">Outxide</a> e controlla la disponibilità online. Prenotare in anticipo è sempre la scelta più intelligente, soprattutto a luglio e agosto.</p>

<h2>Drink, cocktail e shisha: cosa aspettarti di spendere</h2>
<p>Oltre al biglietto, la maggior parte del budget se ne va nelle consumazioni. All'<a href="/enjoy">Enjoy Terrace</a>, il bar di cocktail d'autore e shisha premium aperto tutti i giorni dalle 17:00, la spesa media dipende dal fatto che tu venga per un drink tranquillo davanti al tramonto o per condividere una shisha in gruppo per ore. I cocktail d'autore costano più di un drink base, e la shisha premium si paga a parte, di solito a narghilè da condividere.</p>
<p>Dentro la discoteca, drink e long drink seguono la logica abituale di qualsiasi club di stagione a Maiorca. Un consiglio da local: se inizi la serata con calma in terrazza e tieni la discoteca per la parte finale, controlli molto meglio la spesa totale. Per vedere tutte le opzioni della zona, dai un'occhiata alla nostra guida alle <a href="/blog/mejores-discotecas-clubs-alcudia">migliori discoteche e club di Alcúdia</a>.</p>

<h2>Budget per tipo di serata: tranquilla, media o VIP</h2>
<p>Non c'è un'unica risposta a "quanto costa uscire a Maiorca", perché dipende dal piano. Ecco tre profili:</p>
<ul>
<li><strong>Serata tranquilla:</strong> un paio di cocktail sulla terrazza di Enjoy al tramonto, magari una shisha condivisa, e a casa. È il piano più economico e non serve il biglietto.</li>
<li><strong>Serata media:</strong> qualche drink in terrazza e poi ingresso all'Outxide per ballare. Qui aggiungi il prezzo del biglietto (acquistato online) più le consumazioni dentro.</li>
<li><strong>Serata VIP:</strong> un tavolo riservato con bottiglie all'Outxide per un gruppo. È l'opzione più alta, ma divisa tra più amici risulta più ragionevole di quanto sembri, e ti garantisce posto e servizio per tutta la notte.</li>
</ul>
<p>Per organizzare bene gli orari e collegare i tre locali, ti sarà utile il nostro <a href="/blog/plan-nocturno-port-alcudia-mallorca">piano notturno per Port d'Alcúdia</a>.</p>

<h2>Come risparmiare nella tua serata di festa</h2>
<p>Uscire ad Alcúdia senza spendere troppo è una questione di pianificazione. Ecco i trucchi che funzionano davvero:</p>
<ul>
<li><strong>Compra il biglietto online in anticipo:</strong> su FourVenues trovi spesso condizioni migliori che pagando all'ingresso, e assicuri l'accesso nelle serate molto richieste.</li>
<li><strong>Arriva per tempo:</strong> arrivare presto evita le code e a volte coincide con le migliori tariffe di accesso anticipato.</li>
<li><strong>Inizia in terrazza:</strong> sfruttare l'atmosfera dell'<a href="/enjoy">Enjoy</a> prima di entrare in discoteca allunga la serata senza far lievitare la spesa.</li>
<li><strong>Condividi il tavolo in gruppo:</strong> se siete in tanti, il tavolo VIP diviso a persona conviene ed evita i giri singoli al bancone.</li>
<li><strong>Controlla sempre il prezzo esatto sul sito:</strong> poiché gli importi cambiano in base all'evento, il dato definitivo è nella scheda online di <a href="/outxide">Outxide</a>.</li>
</ul>
<p>Il grande vantaggio di Alcúdia è che offre una serata completa — terrazza, discoteca e un bel pubblico internazionale — senza la folla e i prezzi di Magaluf o Playa de Palma. Pianifica, acquista online e goditela: uscire nel nord di Maiorca conviene.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-07-17",
    image: "/images/outxide/670925361_1705310784205255_7508334842195030055_n.jpg",
    tags: ["precio entrada discoteca alcudia", "cuanto cuesta salir mallorca", "presupuesto fiesta alcudia", "reservado vip alcudia", "outxide club"],
    venue: "outxide",
    readingTime: 5,
    faq: [
      {
        question: {
          es: "¿Cuánto cuesta la entrada a una discoteca en Alcúdia?",
          en: "How much is entry to a nightclub in Alcúdia?",
          de: "Was kostet der Eintritt in eine Diskothek in Alcúdia?",
          fr: "Combien coûte l'entrée en discothèque à Alcúdia ?",
          it: "Quanto costa l'ingresso in una discoteca ad Alcúdia?",
        },
        answer: {
          es: "El precio no es fijo: varía según el evento, el día y el DJ. Se compra online en FourVenues y el importe exacto aparece en la ficha del evento en la web de Outxide.",
          en: "The price isn't fixed: it varies by event, day and DJ. Tickets are bought online on FourVenues, and the exact amount appears on the event page on the Outxide website.",
          de: "Der Preis ist nicht fest: Er variiert je nach Event, Tag und DJ. Tickets werden online über FourVenues gekauft, und der genaue Betrag steht auf der Event-Seite der Outxide-Website.",
          fr: "Le prix n'est pas fixe : il varie selon l'événement, le jour et le DJ. Les billets s'achètent en ligne sur FourVenues et le montant exact figure sur la fiche de l'événement sur le site d'Outxide.",
          it: "Il prezzo non è fisso: varia in base all'evento, al giorno e al DJ. I biglietti si comprano online su FourVenues e l'importo esatto appare nella scheda dell'evento sul sito di Outxide.",
        },
      },
      {
        question: {
          es: "¿Dónde se compran las entradas y los reservados de Outxide?",
          en: "Where do you buy Outxide's tickets and VIP tables?",
          de: "Wo kauft man die Tickets und Reservados von Outxide?",
          fr: "Où acheter les billets et les tables VIP d'Outxide ?",
          it: "Dove si comprano i biglietti e i tavoli riservati dell'Outxide?",
        },
        answer: {
          es: "Online a través de FourVenues, desde la web de Outxide. Es recomendable comprar por adelantado, sobre todo en eventos y fines de semana de temporada alta.",
          en: "Online through FourVenues, from the Outxide website. It's advisable to buy in advance, especially for events and high-season weekends.",
          de: "Online über FourVenues, auf der Outxide-Website. Es empfiehlt sich, im Voraus zu kaufen, besonders bei Events und an Wochenenden der Hochsaison.",
          fr: "En ligne via FourVenues, depuis le site d'Outxide. Il est conseillé d'acheter à l'avance, surtout pour les événements et les week-ends de haute saison.",
          it: "Online tramite FourVenues, dal sito dell'Outxide. È consigliabile acquistare in anticipo, soprattutto per gli eventi e nei weekend di alta stagione.",
        },
      },
      {
        question: {
          es: "¿Se puede salir de fiesta barato en Alcúdia?",
          en: "Can you have a cheap night out in Alcúdia?",
          de: "Kann man in Alcúdia günstig ausgehen?",
          fr: "Peut-on sortir à Alcúdia sans se ruiner ?",
          it: "Si può uscire a divertirsi ad Alcúdia spendendo poco?",
        },
        answer: {
          es: "Sí. Empezar con cócteles en la terraza de Enjoy (sin entrada) y comprar la entrada de Outxide online por adelantado ayuda a controlar el gasto de la noche.",
          en: "Yes. Starting with cocktails on the Enjoy terrace (no ticket needed) and buying your Outxide ticket online in advance helps keep the night's spend under control.",
          de: "Ja. Mit Cocktails auf der Enjoy-Terrasse zu beginnen (ohne Eintritt) und das Outxide-Ticket im Voraus online zu kaufen, hilft, die Ausgaben des Abends im Griff zu behalten.",
          fr: "Oui. Commencer par des cocktails sur la terrasse d'Enjoy (sans billet) et acheter son billet Outxide en ligne à l'avance aide à maîtriser la dépense de la soirée.",
          it: "Sì. Iniziare con i cocktail sulla terrazza di Enjoy (senza biglietto) e comprare il biglietto dell'Outxide online in anticipo aiuta a controllare la spesa della serata.",
        },
      },
      {
        question: {
          es: "¿Cuánto cuesta un reservado VIP en Outxide?",
          en: "How much is a VIP table at Outxide?",
          de: "Was kostet ein VIP-Reservado im Outxide?",
          fr: "Combien coûte une table VIP à l'Outxide ?",
          it: "Quanto costa un tavolo VIP all'Outxide?",
        },
        answer: {
          es: "Depende del tamaño de la mesa, su ubicación y las botellas incluidas. Consulta disponibilidad y precio online; compartido en grupo sale más razonable por persona.",
          en: "It depends on the table size, its location and the bottles included. Check availability and price online; split among a group it works out more reasonable per person.",
          de: "Es hängt von der Größe des Tisches, seiner Lage und den enthaltenen Flaschen ab. Prüfe Verfügbarkeit und Preis online; in der Gruppe geteilt ist es pro Person vernünftiger.",
          fr: "Cela dépend de la taille de la table, de son emplacement et des bouteilles incluses. Vérifiez la disponibilité et le prix en ligne ; partagée en groupe, elle revient plus raisonnable par personne.",
          it: "Dipende dalla dimensione del tavolo, dalla sua posizione e dalle bottiglie incluse. Controlla disponibilità e prezzo online; diviso in gruppo risulta più ragionevole a persona.",
        },
      },
    ],
  },
  {
    slug: "que-hacer-alcudia-si-llueve-planes-interior",
    title: {
      es: "Qué hacer en Alcúdia si llueve: planes de interior para día y noche",
      en: "What to Do in Alcúdia When It Rains: Indoor Plans for Day and Night",
      de: "Was tun in Alcúdia bei Regen: Indoor-Pläne für Tag und Nacht",
      fr: "Que faire à Alcúdia quand il pleut : plans d'intérieur jour et nuit",
      it: "Cosa fare ad Alcúdia se piove: piani al coperto per giorno e notte",
    },
    excerpt: {
      es: "Un día de lluvia en el norte de Mallorca no arruina tus vacaciones. Casco antiguo, gastronomía a la brasa, shisha en terraza cubierta y noche de club: planes de interior en Port d'Alcúdia para cuando el tiempo no acompaña.",
      en: "A rainy day in northern Majorca won't ruin your holiday. Old town, char-grilled dining, shisha on a covered terrace and a night at the club: indoor plans in Port d'Alcúdia for when the weather turns.",
      de: "Ein Regentag im Norden Mallorcas verdirbt deinen Urlaub nicht. Altstadt, Grillküche, Shisha auf der überdachten Terrasse und Clubnacht: Indoor-Pläne in Port d'Alcúdia für schlechtes Wetter.",
      fr: "Un jour de pluie dans le nord de Majorque ne gâche pas les vacances. Vieille ville, cuisine à la braise, chicha en terrasse couverte et nuit en club : plans d'intérieur à Port d'Alcúdia quand le temps se gâte.",
      it: "Una giornata di pioggia nel nord di Maiorca non rovina la vacanza. Centro storico, cucina alla brace, shisha in terrazza coperta e nottata in discoteca: piani al coperto a Port d'Alcúdia per quando il tempo non aiuta.",
    },
    content: {
      es: `<p>Mallorca tiene más de 300 días de sol al año, pero cuando el norte de la isla se despierta con nubes y un chaparrón de verano, no hace falta quedarse encerrado en el hotel mirando por la ventana. Alcúdia y su Port ofrecen planes estupendos bajo techo, de la mañana a la madrugada. Aquí tienes una guía práctica de <strong>qué hacer en Alcúdia si llueve</strong>, con ideas para el día y para la noche que no dependen del cielo.</p><h2>Planes de día bajo techo: casco antiguo, cultura y gastronomía</h2><p>El <strong>casco antiguo de Alcúdia</strong> es el mejor refugio para un día gris. Sus calles empedradas dentro de la muralla medieval están llenas de tiendecitas, galerías y cafeterías donde puedes pasar horas resguardado. Piérdete entre los soportales, entra a curiosear en las boutiques y hazte con un buen café mientras esperas a que escampe.</p><p>Para los amantes de la cultura, Alcúdia guarda un pasado romano en el <strong>Museo Monográfico de Pol·lèntia</strong>, que recoge las piezas halladas en la antigua ciudad romana. Y si el respiro de lluvia lo permite, el yacimiento y el teatro romano están a un paso. También merece la pena la iglesia de Sant Jaume, adosada a la muralla, un plan tranquilo y a cubierto.</p><p>Cuando la mañana se alarga, la gastronomía toma el relevo. Los mercados cubiertos, las panaderías con ensaimada recién hecha y las cafeterías del centro convierten un día lluvioso en una excusa perfecta para comer sin prisa. Si quieres más ideas para llenar la jornada, echa un vistazo a nuestra guía de <a href="/blog/que-hacer-alcudia-mallorca">qué hacer en Alcúdia</a>.</p><h2>Comer a la brasa sin depender del tiempo</h2><p>Si hay un plan que sabe igual de bien llueva o haga sol, es una buena comida. En el puerto y el casco antiguo encontrarás comedores interiores acogedores donde refugiarte mientras fuera cae el agua: nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guía de restaurantes de Alcúdia</a> te ayuda a elegir mesa.</p><p>La especialidad son las <strong>carnes maduradas dry-aged</strong>, cocinadas a la brasa hasta el punto justo, pero la carta va mucho más allá: <strong>paella de marisco</strong>, arroces melosos, pescado fresco del día y una terraza para cuando vuelva el buen tiempo. El lema de la casa lo resume bien: producto, tradición y sabor. Es la clase de comida que convierte un día de lluvia en uno de los mejores recuerdos del viaje.</p><p>¿Buscas más sitios donde comer resguardado? Nuestra selección de <a href="/blog/mejores-restaurantes-alcudia-mallorca">los mejores restaurantes de Alcúdia</a> te da alternativas para cualquier antojo y presupuesto.</p><h2>La noche no se moja: shisha en terraza cubierta y club</h2><p>La lluvia de verano suele dar tregua al caer la tarde, y aunque no lo haga, la noche de Port d'Alcúdia sigue en marcha bajo techo. En <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1) puedes disfrutar de <strong>cócteles de autor y shisha premium</strong> en un ambiente cuidado, con zonas cubiertas donde la lluvia se convierte en banda sonora en lugar de en problema. Abre a diario desde las 17:00 y su lema, "Where nights begin", no es casualidad: es el punto de partida perfecto.</p><p>Cuando quieras subir el ritmo, el <a href="/outxide">Outxide Club</a> (misma dirección, Av. Tucán 1) toma el testigo de jueves a sábado desde las 23:00. Techno, house y reggaetón, DJs internacionales, servicio VIP con reservados y una pantalla gigante para eventos deportivos: aquí el tiempo que haga fuera da exactamente igual. Entradas y reservados se gestionan online a través de FourVenues, así que puedes asegurar tu sitio sin mojarte. Solo para mayores de 18.</p><p>Para montar tu noche perfecta, te ayudarán nuestra <a href="/blog/guia-vida-nocturna-alcudia">guía de vida nocturna en Alcúdia</a> y las ideas de <a href="/blog/cocteles-shisha-terraza-alcudia">cócteles y shisha en terraza</a>.</p><h2>Consejos para días de lluvia en Alcúdia</h2><ul><li><strong>Reserva con antelación:</strong> en días de lluvia los locales cubiertos se llenan antes. Reserva mesa con antelación en el restaurante que elijas y tu entrada o reservado en Outxide por FourVenues.</li><li><strong>Aprovecha las treguas:</strong> los chaparrones de verano en el norte de Mallorca suelen ser breves. Ten un plan de interior y otro de exterior por si escampa.</li><li><strong>Muévete cómodo:</strong> el casco antiguo y el Port están cerca; con un paraguas y calzado adecuado encadenas cultura, comida y copas sin complicarte.</li><li><strong>La noche no entiende de nubes:</strong> Enjoy y Outxide funcionan igual de bien con lluvia, así que tu plan nocturno está garantizado pase lo que pase.</li></ul><p>Un día gris en Alcúdia no es un día perdido: es una oportunidad para descubrir el lado más acogedor del norte de Mallorca, del café en el casco antiguo a la noche interminable de Port d'Alcúdia.</p>`,
      en: `<p>Majorca enjoys more than 300 days of sun a year, but when the north of the island wakes up cloudy with a summer downpour, there's no need to stay cooped up in your hotel staring out the window. Alcúdia and its Port offer great indoor plans, from morning to the small hours. Here's a practical guide to <strong>what to do in Alcúdia when it rains</strong>, with ideas for day and night that don't depend on the sky.</p><h2>Daytime indoor plans: old town, culture and food</h2><p>Alcúdia's <strong>old town</strong> is the best shelter for a grey day. Its cobbled streets inside the medieval walls are full of little shops, galleries and cafés where you can spend hours under cover. Wander beneath the arcades, browse the boutiques and grab a good coffee while you wait for the rain to ease.</p><p>For culture lovers, Alcúdia holds a Roman past at the <strong>Pol·lèntia Museum</strong>, home to the finds from the ancient Roman city. And if the rain lets up, the archaeological site and Roman theatre are just steps away. The church of Sant Jaume, built into the walls, is another calm, sheltered option.</p><p>When the morning stretches on, food takes over. Covered markets, bakeries with freshly made ensaïmada and the cafés of the centre turn a rainy day into the perfect excuse for a long, unhurried meal. For more ideas to fill your day, take a look at our guide to <a href="/blog/que-hacer-alcudia-mallorca">what to do in Alcúdia</a>.</p><h2>Char-grilled dining, whatever the weather</h2><p>If there's one plan that tastes just as good come rain or shine, it's a good meal. Around the port and the old town you'll find cosy indoor dining rooms to shelter in while the rain falls outside: our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to restaurants in Alcúdia</a> will help you pick a table.</p><p>The house specialty is <strong>dry-aged matured meats</strong>, char-grilled to perfection, but the menu goes far beyond that: <strong>seafood paella</strong>, creamy rice dishes, fresh fish of the day and a terrace for when the sun comes back. The motto sums it up nicely: produce, tradition and flavour. It's the kind of meal that turns a rainy day into one of the best memories of your trip.</p><p>Looking for more sheltered places to eat? Our pick of <a href="/blog/mejores-restaurantes-alcudia-mallorca">the best restaurants in Alcúdia</a> offers options for every craving and budget.</p><h2>The night doesn't get wet: shisha on a covered terrace and a club</h2><p>Summer rain usually eases off by evening, and even when it doesn't, Port d'Alcúdia's nightlife carries on under cover. At <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1) you can enjoy <strong>signature cocktails and premium shisha</strong> in a stylish setting, with covered areas where the rain becomes a soundtrack rather than a problem. It opens daily from 5 pm, and its motto, "Where nights begin", is no accident: it's the perfect starting point.</p><p>When you want to raise the tempo, <a href="/outxide">Outxide Club</a> (same address, Av. Tucán 1) takes over from Thursday to Saturday from 11 pm. Techno, house and reggaeton, international DJs, VIP table service and a giant screen for sporting events: here the weather outside makes absolutely no difference. Tickets and tables are handled online through FourVenues, so you can secure your spot without getting wet. Over-18s only.</p><p>To plan your perfect night, our <a href="/blog/guia-vida-nocturna-alcudia">guide to Alcúdia nightlife</a> and our ideas for <a href="/blog/cocteles-shisha-terraza-alcudia">cocktails and shisha on the terrace</a> will help.</p><h2>Tips for rainy days in Alcúdia</h2><ul><li><strong>Book ahead:</strong> on rainy days covered venues fill up sooner. Book a table ahead at the restaurant of your choice and your ticket or table at Outxide via FourVenues.</li><li><strong>Make the most of the breaks:</strong> summer showers in northern Majorca are usually brief. Keep an indoor plan and an outdoor plan ready in case it clears.</li><li><strong>Travel comfortably:</strong> the old town and the Port are close together; with an umbrella and the right shoes you can chain culture, food and drinks with no hassle.</li><li><strong>The night ignores the clouds:</strong> Enjoy and Outxide work just as well in the rain, so your night out is guaranteed whatever happens.</li></ul><p>A grey day in Alcúdia is not a day wasted: it's a chance to discover the cosiest side of northern Majorca, from coffee in the old town to the endless night of Port d'Alcúdia.</p>`,
      de: `<p>Mallorca hat mehr als 300 Sonnentage im Jahr, doch wenn der Norden der Insel bewölkt und mit einem Sommerschauer erwacht, muss man nicht im Hotel sitzen und aus dem Fenster starren. Alcúdia und sein Hafen bieten großartige Indoor-Pläne, vom Morgen bis in die frühen Morgenstunden. Hier ist ein praktischer Leitfaden, <strong>was man in Alcúdia bei Regen unternehmen kann</strong>, mit Ideen für Tag und Nacht, die nicht vom Himmel abhängen.</p><h2>Tagespläne unter Dach: Altstadt, Kultur und Gastronomie</h2><p>Die <strong>Altstadt von Alcúdia</strong> ist der beste Unterschlupf für einen grauen Tag. Die gepflasterten Gassen innerhalb der mittelalterlichen Stadtmauer sind voller kleiner Läden, Galerien und Cafés, in denen man Stunden geschützt verbringen kann. Bummle unter den Arkaden, stöbere in den Boutiquen und gönn dir einen guten Kaffee, während du wartest, dass der Regen nachlässt.</p><p>Für Kulturliebhaber bewahrt Alcúdia im <strong>Museum von Pol·lèntia</strong> seine römische Vergangenheit, mit den Funden der antiken Römerstadt. Und wenn der Regen eine Pause macht, sind die Ausgrabungsstätte und das römische Theater nur einen Schritt entfernt. Auch die in die Stadtmauer eingelassene Kirche Sant Jaume ist ein ruhiges, überdachtes Ziel.</p><p>Zieht sich der Vormittag in die Länge, übernimmt die Gastronomie. Überdachte Märkte, Bäckereien mit frischer Ensaïmada und die Cafés des Zentrums machen aus einem Regentag den perfekten Vorwand für ein gemütliches Essen. Für weitere Ideen wirf einen Blick in unseren Guide, <a href="/blog/que-hacer-alcudia-mallorca">was man in Alcúdia unternehmen kann</a>.</p><h2>Grillküche, ganz gleich bei welchem Wetter</h2><p>Wenn es einen Plan gibt, der bei Regen wie bei Sonne gleich gut schmeckt, dann ist es ein gutes Essen. Am Hafen und in der Altstadt findest du gemütliche Innenbereiche, in denen du dich unterstellen kannst, während draußen der Regen fällt: Unser <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide für Alcúdia</a> hilft bei der Tischwahl.</p><p>Die Spezialität sind <strong>dry-aged gereifte Fleischsorten</strong>, auf dem Grill auf den Punkt gegart, doch die Karte geht weit darüber hinaus: <strong>Meeresfrüchte-Paella</strong>, cremige Reisgerichte, fangfrischer Fisch und eine Terrasse für die Rückkehr der Sonne. Das Motto bringt es auf den Punkt: Produkt, Tradition und Geschmack. Es ist die Art von Essen, die einen Regentag in eine der schönsten Erinnerungen der Reise verwandelt.</p><p>Suchst du weitere überdachte Orte zum Essen? Unsere Auswahl der <a href="/blog/mejores-restaurantes-alcudia-mallorca">besten Restaurants in Alcúdia</a> bietet Optionen für jeden Geschmack und jedes Budget.</p><h2>Die Nacht wird nicht nass: Shisha auf der überdachten Terrasse und Club</h2><p>Sommerregen lässt am Abend meist nach, und selbst wenn nicht, geht das Nachtleben von Port d'Alcúdia unter Dach weiter. In der <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1) genießt du <strong>Signature-Cocktails und Premium-Shisha</strong> in stilvollem Ambiente, mit überdachten Bereichen, in denen der Regen zum Soundtrack statt zum Problem wird. Täglich ab 17:00 Uhr geöffnet, und das Motto "Where nights begin" kommt nicht von ungefähr: der perfekte Ausgangspunkt.</p><p>Wenn du das Tempo erhöhen willst, übernimmt der <a href="/outxide">Outxide Club</a> (gleiche Adresse, Av. Tucán 1) von Donnerstag bis Samstag ab 23:00 Uhr. Techno, House und Reggaeton, internationale DJs, VIP-Service mit Reservierungen und eine Großleinwand für Sportevents: Hier ist das Wetter draußen völlig egal. Tickets und Reservierungen laufen online über FourVenues, sodass du dir deinen Platz sichern kannst, ohne nass zu werden. Nur für Personen ab 18 Jahren.</p><p>Für deine perfekte Nacht helfen dir unser <a href="/blog/guia-vida-nocturna-alcudia">Guide zum Nachtleben in Alcúdia</a> und die Ideen zu <a href="/blog/cocteles-shisha-terraza-alcudia">Cocktails und Shisha auf der Terrasse</a>.</p><h2>Tipps für Regentage in Alcúdia</h2><ul><li><strong>Frühzeitig reservieren:</strong> An Regentagen füllen sich überdachte Lokale schneller. Reserviere im Restaurant deiner Wahl im Voraus einen Tisch und dein Ticket oder deinen Reservierten im Outxide über FourVenues.</li><li><strong>Nutze die Regenpausen:</strong> Sommerschauer im Norden Mallorcas sind meist kurz. Halte einen Indoor- und einen Outdoor-Plan bereit, falls es aufklart.</li><li><strong>Bequem unterwegs:</strong> Altstadt und Hafen liegen nah beieinander; mit Schirm und passenden Schuhen reihst du Kultur, Essen und Drinks mühelos aneinander.</li><li><strong>Die Nacht kennt keine Wolken:</strong> Enjoy und Outxide funktionieren bei Regen genauso gut, dein Nachtprogramm ist also garantiert, egal was passiert.</li></ul><p>Ein grauer Tag in Alcúdia ist kein verlorener Tag: Es ist die Gelegenheit, die gemütlichste Seite des Nordens von Mallorca zu entdecken, vom Kaffee in der Altstadt bis zur endlosen Nacht von Port d'Alcúdia.</p>`,
      fr: `<p>Majorque compte plus de 300 jours de soleil par an, mais quand le nord de l'île se réveille sous les nuages avec une averse d'été, inutile de rester enfermé à l'hôtel à regarder par la fenêtre. Alcúdia et son Port proposent d'excellents plans d'intérieur, du matin jusqu'au bout de la nuit. Voici un guide pratique de <strong>que faire à Alcúdia quand il pleut</strong>, avec des idées pour le jour et la nuit qui ne dépendent pas du ciel.</p><h2>Plans de journée à l'abri : vieille ville, culture et gastronomie</h2><p>La <strong>vieille ville d'Alcúdia</strong> est le meilleur refuge pour un jour gris. Ses ruelles pavées à l'intérieur des remparts médiévaux regorgent de petites boutiques, de galeries et de cafés où l'on peut passer des heures à l'abri. Flânez sous les arcades, chinez dans les boutiques et offrez-vous un bon café en attendant que la pluie faiblisse.</p><p>Pour les amateurs de culture, Alcúdia conserve son passé romain au <strong>musée de Pol·lèntia</strong>, qui rassemble les pièces découvertes dans l'ancienne cité romaine. Et si la pluie fait une pause, le site archéologique et le théâtre romain sont à deux pas. L'église Sant Jaume, adossée aux remparts, est une autre option calme et couverte.</p><p>Quand la matinée s'étire, la gastronomie prend le relais. Les marchés couverts, les boulangeries avec leur ensaïmada fraîche et les cafés du centre transforment un jour de pluie en prétexte idéal pour un repas sans hâte. Pour d'autres idées, jetez un œil à notre guide sur <a href="/blog/que-hacer-alcudia-mallorca">que faire à Alcúdia</a>.</p><h2>La cuisine à la braise, quel que soit le temps</h2><p>S'il y a un plan qui a le même goût qu'il pleuve ou qu'il fasse beau, c'est un bon repas. Autour du port et dans la vieille ville, vous trouverez des salles intérieures chaleureuses où vous abriter pendant que la pluie tombe dehors : notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants d'Alcúdia</a> vous aidera à choisir votre table.</p><p>La spécialité, ce sont les <strong>viandes maturées dry-aged</strong>, grillées à la braise à la perfection, mais la carte va bien plus loin : <strong>paella aux fruits de mer</strong>, riz crémeux, poisson frais du jour et une terrasse pour le retour du beau temps. La devise résume bien l'esprit : produit, tradition et saveur. C'est le genre de repas qui transforme un jour de pluie en l'un des meilleurs souvenirs du voyage.</p><p>Vous cherchez d'autres endroits couverts où manger ? Notre sélection des <a href="/blog/mejores-restaurantes-alcudia-mallorca">meilleurs restaurants d'Alcúdia</a> propose des options pour toutes les envies et tous les budgets.</p><h2>La nuit ne se mouille pas : chicha en terrasse couverte et club</h2><p>La pluie d'été faiblit généralement en soirée, et même quand ce n'est pas le cas, la vie nocturne de Port d'Alcúdia continue à couvert. À l'<a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1), vous pouvez savourer des <strong>cocktails signature et une chicha premium</strong> dans un cadre soigné, avec des zones couvertes où la pluie devient une bande-son plutôt qu'un problème. Ouvert tous les jours dès 17h, et sa devise "Where nights begin" n'a rien d'un hasard : c'est le point de départ parfait.</p><p>Quand vous voulez monter le rythme, l'<a href="/outxide">Outxide Club</a> (même adresse, Av. Tucán 1) prend le relais du jeudi au samedi dès 23h. Techno, house et reggaeton, DJs internationaux, service VIP avec carrés réservés et un écran géant pour les événements sportifs : ici, le temps qu'il fait dehors n'a aucune importance. Billets et réservations se gèrent en ligne via FourVenues, vous pouvez donc assurer votre place sans vous mouiller. Réservé aux plus de 18 ans.</p><p>Pour composer votre nuit parfaite, notre <a href="/blog/guia-vida-nocturna-alcudia">guide de la vie nocturne à Alcúdia</a> et nos idées de <a href="/blog/cocteles-shisha-terraza-alcudia">cocktails et chicha en terrasse</a> vous seront utiles.</p><h2>Conseils pour les jours de pluie à Alcúdia</h2><ul><li><strong>Réservez à l'avance :</strong> les jours de pluie, les lieux couverts se remplissent plus vite. Réservez une table à l'avance dans le restaurant de votre choix et votre billet ou carré à l'Outxide via FourVenues.</li><li><strong>Profitez des accalmies :</strong> les averses d'été dans le nord de Majorque sont généralement brèves. Gardez un plan intérieur et un plan extérieur au cas où ça se dégage.</li><li><strong>Déplacez-vous à l'aise :</strong> la vieille ville et le Port sont proches ; avec un parapluie et de bonnes chaussures, vous enchaînez culture, repas et verres sans souci.</li><li><strong>La nuit ignore les nuages :</strong> Enjoy et Outxide fonctionnent aussi bien sous la pluie, votre soirée est donc garantie quoi qu'il arrive.</li></ul><p>Un jour gris à Alcúdia n'est pas un jour perdu : c'est l'occasion de découvrir le côté le plus chaleureux du nord de Majorque, du café dans la vieille ville à la nuit sans fin de Port d'Alcúdia.</p>`,
      it: `<p>Maiorca gode di più di 300 giorni di sole all'anno, ma quando il nord dell'isola si sveglia nuvoloso con un acquazzone estivo, non serve restare chiusi in hotel a guardare fuori dalla finestra. Alcúdia e il suo Port offrono ottimi piani al coperto, dalla mattina fino a notte fonda. Ecco una guida pratica su <strong>cosa fare ad Alcúdia se piove</strong>, con idee per il giorno e per la notte che non dipendono dal cielo.</p><h2>Piani diurni al coperto: centro storico, cultura e gastronomia</h2><p>Il <strong>centro storico di Alcúdia</strong> è il miglior rifugio per una giornata grigia. I suoi vicoli acciottolati all'interno delle mura medievali sono pieni di botteghe, gallerie e caffè dove passare ore al riparo. Perditi tra i portici, curiosa nelle boutique e concediti un buon caffè aspettando che la pioggia diminuisca.</p><p>Per gli amanti della cultura, Alcúdia custodisce il suo passato romano nel <strong>Museo di Pol·lèntia</strong>, che raccoglie i reperti dell'antica città romana. E se la pioggia concede una tregua, il sito archeologico e il teatro romano sono a due passi. Anche la chiesa di Sant Jaume, addossata alle mura, è un'opzione tranquilla e al coperto.</p><p>Quando la mattinata si allunga, tocca alla gastronomia. I mercati coperti, i forni con l'ensaïmada appena sfornata e i caffè del centro trasformano una giornata di pioggia nella scusa perfetta per un pasto senza fretta. Per altre idee, dai un'occhiata alla nostra guida su <a href="/blog/que-hacer-alcudia-mallorca">cosa fare ad Alcúdia</a>.</p><h2>Mangiare alla brace, con qualsiasi tempo</h2><p>Se c'è un piano che è buono con la pioggia come con il sole, è un buon pasto. Al porto e nel centro storico troverai sale interne accoglienti dove ripararti mentre fuori piove: la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti di Alcúdia</a> ti aiuta a scegliere il tavolo.</p><p>La specialità sono le <strong>carni maturate dry-aged</strong>, cotte alla brace al punto giusto, ma il menù va ben oltre: <strong>paella di mare</strong>, risotti cremosi, pesce fresco del giorno e una terrazza per quando torna il bel tempo. Il motto della casa lo riassume bene: prodotto, tradizione e sapore. È il tipo di pasto che trasforma una giornata di pioggia in uno dei ricordi più belli del viaggio.</p><p>Cerchi altri posti al coperto dove mangiare? La nostra selezione dei <a href="/blog/mejores-restaurantes-alcudia-mallorca">migliori ristoranti di Alcúdia</a> offre alternative per ogni voglia e budget.</p><h2>La notte non si bagna: shisha in terrazza coperta e club</h2><p>La pioggia estiva di solito dà tregua verso sera, e anche quando non lo fa, la vita notturna di Port d'Alcúdia continua al coperto. All'<a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1) puoi goderti <strong>cocktail d'autore e shisha premium</strong> in un ambiente curato, con zone coperte dove la pioggia diventa colonna sonora anziché un problema. Aperto tutti i giorni dalle 17:00, e il suo motto "Where nights begin" non è un caso: è il punto di partenza perfetto.</p><p>Quando vuoi alzare il ritmo, l'<a href="/outxide">Outxide Club</a> (stesso indirizzo, Av. Tucán 1) prende il testimone dal giovedì al sabato dalle 23:00. Techno, house e reggaeton, DJ internazionali, servizio VIP con privé e un maxischermo per gli eventi sportivi: qui il tempo che fa fuori non conta affatto. Biglietti e privé si gestiscono online tramite FourVenues, così puoi assicurarti il posto senza bagnarti. Solo per maggiori di 18 anni.</p><p>Per organizzare la tua notte perfetta, ti saranno utili la nostra <a href="/blog/guia-vida-nocturna-alcudia">guida alla vita notturna di Alcúdia</a> e le idee su <a href="/blog/cocteles-shisha-terraza-alcudia">cocktail e shisha in terrazza</a>.</p><h2>Consigli per le giornate di pioggia ad Alcúdia</h2><ul><li><strong>Prenota in anticipo:</strong> nei giorni di pioggia i locali al coperto si riempiono prima. Prenota in anticipo un tavolo nel ristorante che preferisci e il tuo biglietto o privé all'Outxide tramite FourVenues.</li><li><strong>Sfrutta le tregue:</strong> gli acquazzoni estivi nel nord di Maiorca sono di solito brevi. Tieni pronto un piano al coperto e uno all'aperto nel caso schiarisca.</li><li><strong>Muoviti comodo:</strong> il centro storico e il Port sono vicini; con un ombrello e le scarpe giuste concateni cultura, cibo e drink senza complicazioni.</li><li><strong>La notte non conosce nuvole:</strong> Enjoy e Outxide funzionano ugualmente bene con la pioggia, quindi la tua serata è garantita qualunque cosa accada.</li></ul><p>Una giornata grigia ad Alcúdia non è una giornata persa: è l'occasione per scoprire il lato più accogliente del nord di Maiorca, dal caffè nel centro storico alla notte infinita di Port d'Alcúdia.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-07-18",
    updated: "2026-08-29",
    image: "/images/hiru/475426584_122217376988201104_7624273276245682480_n.jpg",
    tags: ["que hacer alcudia si llueve", "alcudia con lluvia", "planes interior mallorca", "rainy day alcudia", "restaurante alcudia"],
    venue: "hiru",
    readingTime: 5,
    faq: [
      {
        question: {
          es: "¿Qué se puede hacer en Alcúdia un día de lluvia?",
          en: "What can you do in Alcúdia on a rainy day?",
          de: "Was kann man in Alcúdia an einem Regentag unternehmen?",
          fr: "Que faire à Alcúdia un jour de pluie ?",
          it: "Cosa si può fare ad Alcúdia in una giornata di pioggia?",
        },
        answer: {
          es: "Puedes recorrer el casco antiguo amurallado y sus tiendas, visitar el Museo de Pol·lèntia, comer en alguno de los restaurantes del puerto y por la noche disfrutar de shisha en la terraza cubierta de Enjoy o del Outxide Club.",
          en: "You can explore the walled old town and its shops, visit the Pol·lèntia Museum, have a good meal at one of the port's restaurants and, at night, enjoy shisha on Enjoy's covered terrace or the Outxide Club.",
          de: "Du kannst die von Mauern umgebene Altstadt und ihre Läden erkunden, das Pol·lèntia-Museum besuchen, in einem der Restaurants am Hafen essen und abends Shisha auf der überdachten Terrasse des Enjoy oder im Outxide Club genießen.",
          fr: "Vous pouvez parcourir la vieille ville fortifiée et ses boutiques, visiter le musée de Pol·lèntia, manger dans l'un des restaurants du port et, le soir, savourer une chicha sur la terrasse couverte de l'Enjoy ou à l'Outxide Club.",
          it: "Puoi girare il centro storico fortificato e le sue botteghe, visitare il Museo di Pol·lèntia, mangiare in uno dei ristoranti del porto e la sera goderti la shisha nella terrazza coperta dell'Enjoy o all'Outxide Club.",
        },
      },
      {
        question: {
          es: "¿Hay restaurantes con espacio interior en Port d'Alcúdia?",
          en: "Are there restaurants with indoor space in Port d'Alcúdia?",
          de: "Gibt es Restaurants mit Innenbereich in Port d'Alcúdia?",
          fr: "Y a-t-il des restaurants avec un espace intérieur à Port d'Alcúdia ?",
          it: "Ci sono ristoranti con spazio interno a Port d'Alcúdia?",
        },
        answer: {
          es: "Sí. Muchos restaurantes del puerto y del casco antiguo cuentan con comedor interior, ideal para comer sin depender del tiempo. Reserva con antelación en temporada alta.",
          en: "Yes. Many restaurants around the port and the old town have indoor dining rooms, perfect for a good meal whatever the weather. Book ahead in high season.",
          de: "Ja. Viele Restaurants am Hafen und in der Altstadt haben einen Innenbereich, ideal zum Essen unabhängig vom Wetter. In der Hochsaison rechtzeitig reservieren.",
          fr: "Oui. De nombreux restaurants du port et de la vieille ville disposent d'une salle intérieure, idéale pour bien manger quel que soit le temps. Réservez à l'avance en haute saison.",
          it: "Sì. Molti ristoranti del porto e del centro storico hanno una sala interna, ideale per mangiare con qualsiasi tempo. Prenota in anticipo in alta stagione.",
        },
      },
      {
        question: {
          es: "¿Se puede salir de fiesta en Alcúdia aunque llueva?",
          en: "Can you go out clubbing in Alcúdia even if it rains?",
          de: "Kann man in Alcúdia auch bei Regen feiern gehen?",
          fr: "Peut-on faire la fête à Alcúdia même s'il pleut ?",
          it: "Si può andare a ballare ad Alcúdia anche se piove?",
        },
        answer: {
          es: "Sí. El Outxide Club (Av. Tucán 1) abre de jueves a sábado desde las 23:00 en espacio interior, y Enjoy Terrace ofrece zonas cubiertas para cócteles y shisha. La lluvia no afecta al plan.",
          en: "Yes. Outxide Club (Av. Tucán 1) opens Thursday to Saturday from 11 pm indoors, and Enjoy Terrace has covered areas for cocktails and shisha. The rain doesn't affect the plan.",
          de: "Ja. Der Outxide Club (Av. Tucán 1) öffnet von Donnerstag bis Samstag ab 23:00 Uhr im Innenbereich, und die Enjoy Terrace bietet überdachte Zonen für Cocktails und Shisha. Der Regen stört den Plan nicht.",
          fr: "Oui. L'Outxide Club (Av. Tucán 1) ouvre du jeudi au samedi dès 23h en intérieur, et l'Enjoy Terrace propose des zones couvertes pour cocktails et chicha. La pluie ne gêne pas le programme.",
          it: "Sì. L'Outxide Club (Av. Tucán 1) apre dal giovedì al sabato dalle 23:00 al chiuso, e l'Enjoy Terrace offre zone coperte per cocktail e shisha. La pioggia non rovina il piano.",
        },
      },
      {
        question: {
          es: "¿Llueve mucho en el norte de Mallorca en verano?",
          en: "Does it rain much in northern Majorca in summer?",
          de: "Regnet es im Sommer viel im Norden Mallorcas?",
          fr: "Pleut-il beaucoup dans le nord de Majorque en été ?",
          it: "Piove molto nel nord di Maiorca in estate?",
        },
        answer: {
          es: "No. En verano la lluvia es poco frecuente y suele presentarse en forma de chaparrones breves. Aun así, tener un plan de interior a mano te garantiza disfrutar del día pase lo que pase.",
          en: "No. In summer rain is infrequent and usually comes as brief showers. Even so, having an indoor plan ready guarantees you'll enjoy the day whatever happens.",
          de: "Nein. Im Sommer ist Regen selten und tritt meist als kurze Schauer auf. Dennoch garantiert dir ein Indoor-Plan, den Tag in jedem Fall zu genießen.",
          fr: "Non. En été, la pluie est rare et se présente généralement sous forme d'averses brèves. Malgré tout, avoir un plan d'intérieur sous la main vous garantit de profiter de la journée quoi qu'il arrive.",
          it: "No. In estate la pioggia è poco frequente e si presenta di solito con brevi acquazzoni. Tuttavia, avere un piano al coperto pronto ti garantisce di goderti la giornata qualunque cosa accada.",
        },
      },
    ],
  },
  {
    slug: "mejores-cocteles-probar-mallorca-verano",
    title: {
      es: "Los mejores cócteles para probar este verano en Mallorca",
      en: "The Best Cocktails to Try This Summer in Majorca",
      de: "Die besten Cocktails für diesen Sommer auf Mallorca",
      fr: "Les meilleurs cocktails à goûter cet été à Majorque",
      it: "I migliori cocktail da provare quest'estate a Maiorca",
    },
    excerpt: {
      es: "De clásicos imbatibles a cócteles de autor: nuestra guía para saber qué cóctel pedir en Alcúdia este verano, con opciones sin alcohol y el mejor sitio para tomarlos al atardecer.",
      en: "From unbeatable classics to signature creations: our guide to knowing which cocktail to order in Alcúdia this summer, with alcohol-free options and the best spot to enjoy them at sunset.",
      de: "Von unschlagbaren Klassikern bis zu Signature-Kreationen: unser Ratgeber, welchen Cocktail man diesen Sommer in Alcúdia bestellt, mit alkoholfreien Optionen und dem besten Ort für den Sonnenuntergang.",
      fr: "Des classiques imbattables aux créations signature : notre guide pour savoir quel cocktail commander à Alcúdia cet été, avec des options sans alcool et le meilleur endroit pour les déguster au coucher du soleil.",
      it: "Dai classici imbattibili alle creazioni d'autore: la nostra guida per sapere quale cocktail ordinare ad Alcúdia quest'estate, con opzioni analcoliche e il posto migliore per gustarli al tramonto.",
    },
    content: {
      es: `<p>El verano en el norte de Mallorca se bebe despacio, con hielo tintineando y el mar de fondo. En <a href="/enjoy">Enjoy Terrace</a>, en el corazón de Port d'Alcúdia, la coctelería es un arte: mezclamos clásicos de toda la vida con creaciones de autor pensadas para la terraza y el atardecer. Si te preguntas qué cóctel pedir en Alcúdia esta temporada, esta es nuestra guía honesta con los mejores cócteles para probar, cuándo pedirlos y por qué. Toma nota.</p><h2>Los clásicos que nunca fallan</h2><p>Antes de lanzarte a los cócteles de autor, conviene dominar los grandes básicos. Son la base de cualquier buena coctelería y siguen siendo los más pedidos en la terraza.</p><h3>1. Mojito</h3><ul><li><strong>Cuándo pedirlo:</strong> a media tarde, cuando aún aprieta el calor.</li><li><strong>Por qué:</strong> ron, lima, menta fresca y soda. Refrescante, ligero y perfecto como primer trago del día.</li></ul><h3>2. Aperol Spritz</h3><ul><li><strong>Cuándo pedirlo:</strong> justo antes de cenar, en pleno aperitivo mediterráneo.</li><li><strong>Por qué:</strong> su amargor cítrico abre el apetito y su color naranja es puro verano en la mesa.</li></ul><h3>3. Negroni</h3><ul><li><strong>Cuándo pedirlo:</strong> al caer la tarde, cuando quieres algo con más carácter.</li><li><strong>Por qué:</strong> ginebra, Campari y vermut rojo a partes iguales. Amargo, elegante e italiano hasta la médula.</li></ul><h3>4. Margarita</h3><ul><li><strong>Cuándo pedirlo:</strong> en una noche de tapeo y ambiente animado.</li><li><strong>Por qué:</strong> tequila, triple seco y lima con el borde escarchado de sal. Directo y con fuerza.</li></ul><h3>5. Daiquiri</h3><ul><li><strong>Cuándo pedirlo:</strong> cuando buscas sencillez bien ejecutada.</li><li><strong>Por qué:</strong> solo ron, lima y azúcar, pero equilibrado al milímetro es una obra maestra minimalista.</li></ul><h2>Cócteles de autor: la firma de Enjoy</h2><p>Aquí es donde nuestra terraza brilla de verdad. Los <strong>signature cocktails</strong> de <a href="/enjoy">Enjoy Terrace</a> juegan con destilados premium, frutas de temporada y presentaciones cuidadas. Son los cócteles de autor de Alcúdia que no encontrarás en cualquier sitio.</p><h3>6. Passion Sunset</h3><ul><li><strong>Cuándo pedirlo:</strong> con el sol bajando sobre la bahía.</li><li><strong>Por qué:</strong> fruta de la pasión, cítricos y un toque especiado. Su degradado naranja combina con el cielo del atardecer.</li></ul><h3>7. Espresso Martini</h3><ul><li><strong>Cuándo pedirlo:</strong> después de cenar, para arrancar la noche con energía.</li><li><strong>Por qué:</strong> vodka, licor de café y un espresso recién hecho. Es el puente perfecto entre la sobremesa y la pista.</li></ul><h3>8. Gin Tonic de autor</h3><ul><li><strong>Cuándo pedirlo:</strong> en cualquier momento; es el comodín elegante.</li><li><strong>Por qué:</strong> ginebra premium, tónica seleccionada y botánicos (pepino, enebro, cítricos) para personalizarlo a tu gusto.</li></ul><h3>9. Mai Tai</h3><ul><li><strong>Cuándo pedirlo:</strong> cuando te apetece evasión tropical sin salir de la isla.</li><li><strong>Por qué:</strong> ron, almendra, cítricos y curaçao. Complejo, afrutado y con espíritu de vacaciones.</li></ul><h3>10. Cóctel de la casa con shisha</h3><ul><li><strong>Cuándo pedirlo:</strong> para una velada larga y sin prisas.</li><li><strong>Por qué:</strong> la combinación de un cóctel de autor con nuestra <a href="/blog/cocteles-shisha-terraza-alcudia">shisha premium en terraza</a> es la seña de identidad de Enjoy. Descubre más sobre este ritual en nuestra guía del <a href="/blog/shisha-bar-terraza-lounge-mallorca">shisha bar y terraza lounge en Mallorca</a>.</li></ul><h2>Cócteles sin alcohol que también triunfan</h2><p>No hace falta beber alcohol para disfrutar de una buena coctelería. Nuestros <strong>mocktails</strong> están tan cuidados como el resto de la carta, ideales para quien conduce, para el mediodía o simplemente para variar.</p><ul><li><strong>Virgin Mojito:</strong> toda la frescura de la menta y la lima, sin ron.</li><li><strong>Piña colada sin alcohol:</strong> piña, coco y cremosidad tropical.</li><li><strong>Limonada de frutos rojos:</strong> cítrica, dulce y muy refrescante para las horas de más calor.</li><li><strong>Nojito de maracuyá:</strong> nuestra versión sin alcohol del clásico, con fruta de la pasión.</li></ul><h2>Dónde tomarlos al atardecer en Port d'Alcúdia</h2><p>Un buen cóctel merece un buen escenario. <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1, Port d'Alcúdia) abre a diario desde las 17:00 y está pensada precisamente para eso: cócteles de autor y shisha premium mientras el sol se pone sobre la bahía. Es, sin exagerar, uno de los mejores sitios de la zona para ver el <a href="/blog/atardecer-puesta-sol-alcudia-donde-ver">atardecer en Alcúdia</a> copa en mano. Nuestro lema lo resume: "Where nights begin".</p><p>Si buscas un plan completo, empieza con cócteles al atardecer en la terraza y deja que la noche siga su curso. Para inspirarte, echa un vistazo a nuestra <a href="/blog/cocteles-shisha-terraza-alcudia">guía de cócteles y shisha en terraza</a>. Este verano, en Alcúdia, la mejor forma de brindar es con una buena copa y el norte de Mallorca de fondo. Te esperamos.</p>`,
      en: `<p>Summer in northern Majorca is meant to be sipped slowly, with ice clinking and the sea in the background. At <a href="/enjoy">Enjoy Terrace</a>, in the heart of Port d'Alcúdia, cocktail-making is an art: we blend timeless classics with signature creations designed for the terrace and the sunset. If you're wondering which cocktail to order in Alcúdia this season, here's our honest guide to the best cocktails to try, when to order them and why. Take note.</p><h2>The classics that never fail</h2><p>Before diving into signature cocktails, it pays to master the great basics. They're the foundation of any good bar and remain the most ordered on the terrace.</p><h3>1. Mojito</h3><ul><li><strong>When to order it:</strong> mid-afternoon, when the heat is still on.</li><li><strong>Why:</strong> rum, lime, fresh mint and soda. Refreshing, light and perfect as your first drink of the day.</li></ul><h3>2. Aperol Spritz</h3><ul><li><strong>When to order it:</strong> just before dinner, right in the middle of the Mediterranean aperitivo.</li><li><strong>Why:</strong> its citrusy bitterness whets the appetite and its orange colour is pure summer on the table.</li></ul><h3>3. Negroni</h3><ul><li><strong>When to order it:</strong> as the afternoon fades, when you want something with more character.</li><li><strong>Why:</strong> gin, Campari and red vermouth in equal parts. Bitter, elegant and Italian to the core.</li></ul><h3>4. Margarita</h3><ul><li><strong>When to order it:</strong> on a lively night of tapas and buzz.</li><li><strong>Why:</strong> tequila, triple sec and lime with a salted rim. Direct and full of punch.</li></ul><h3>5. Daiquiri</h3><ul><li><strong>When to order it:</strong> when you're after simplicity done well.</li><li><strong>Why:</strong> just rum, lime and sugar, but balanced to the millimetre it's a minimalist masterpiece.</li></ul><h2>Signature cocktails: the Enjoy hallmark</h2><p>This is where our terrace truly shines. The <strong>signature cocktails</strong> at <a href="/enjoy">Enjoy Terrace</a> play with premium spirits, seasonal fruit and careful presentation. These are the signature cocktails of Alcúdia you won't find just anywhere.</p><h3>6. Passion Sunset</h3><ul><li><strong>When to order it:</strong> as the sun dips over the bay.</li><li><strong>Why:</strong> passion fruit, citrus and a spiced touch. Its orange gradient matches the sunset sky.</li></ul><h3>7. Espresso Martini</h3><ul><li><strong>When to order it:</strong> after dinner, to kick off the night with energy.</li><li><strong>Why:</strong> vodka, coffee liqueur and a freshly pulled espresso. The perfect bridge between the table and the dance floor.</li></ul><h3>8. Signature Gin &amp; Tonic</h3><ul><li><strong>When to order it:</strong> any time; it's the elegant all-rounder.</li><li><strong>Why:</strong> premium gin, a selected tonic and botanicals (cucumber, juniper, citrus) to make it your own.</li></ul><h3>9. Mai Tai</h3><ul><li><strong>When to order it:</strong> when you fancy a tropical escape without leaving the island.</li><li><strong>Why:</strong> rum, almond, citrus and curaçao. Complex, fruity and full of holiday spirit.</li></ul><h3>10. House cocktail with shisha</h3><ul><li><strong>When to order it:</strong> for a long, unhurried evening.</li><li><strong>Why:</strong> pairing a signature cocktail with our <a href="/blog/cocteles-shisha-terraza-alcudia">premium terrace shisha</a> is the Enjoy signature. Discover more about this ritual in our guide to the <a href="/blog/shisha-bar-terraza-lounge-mallorca">shisha bar and lounge terrace in Majorca</a>.</li></ul><h2>Alcohol-free cocktails that also deliver</h2><p>You don't need alcohol to enjoy great cocktail-making. Our <strong>mocktails</strong> are as carefully crafted as the rest of the menu, ideal for the designated driver, for midday or simply for a change.</p><ul><li><strong>Virgin Mojito:</strong> all the freshness of mint and lime, without the rum.</li><li><strong>Alcohol-free piña colada:</strong> pineapple, coconut and tropical creaminess.</li><li><strong>Red berry lemonade:</strong> citrusy, sweet and very refreshing for the hottest hours.</li><li><strong>Passion fruit nojito:</strong> our alcohol-free take on the classic, with passion fruit.</li></ul><h2>Where to enjoy them at sunset in Port d'Alcúdia</h2><p>A good cocktail deserves a good setting. <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1, Port d'Alcúdia) opens daily from 5:00 pm and is designed for exactly this: signature cocktails and premium shisha as the sun sets over the bay. It is, without exaggeration, one of the best spots in the area to watch the <a href="/blog/atardecer-puesta-sol-alcudia-donde-ver">sunset in Alcúdia</a> drink in hand. Our motto sums it up: "Where nights begin".</p><p>If you're after a full plan, start with cocktails at sunset on the terrace and let the night take its course. For inspiration, take a look at our <a href="/blog/cocteles-shisha-terraza-alcudia">guide to cocktails and terrace shisha</a>. This summer in Alcúdia, the best way to toast is with a great drink and northern Majorca as your backdrop. We'll be waiting.</p>`,
      de: `<p>Der Sommer im Norden Mallorcas will langsam getrunken werden, mit klirrendem Eis und dem Meer im Hintergrund. In der <a href="/enjoy">Enjoy Terrace</a>, im Herzen von Port d'Alcúdia, ist Cocktailmixen eine Kunst: Wir verbinden zeitlose Klassiker mit Signature-Kreationen, die für die Terrasse und den Sonnenuntergang gemacht sind. Wenn du dich fragst, welchen Cocktail du diese Saison in Alcúdia bestellen sollst, ist das unser ehrlicher Ratgeber mit den besten Cocktails, wann du sie bestellst und warum. Merk es dir.</p><h2>Die Klassiker, die nie enttäuschen</h2><p>Bevor du dich in die Signature-Cocktails stürzt, lohnt es sich, die großen Basics zu beherrschen. Sie sind die Grundlage jeder guten Bar und bleiben die meistbestellten auf der Terrasse.</p><h3>1. Mojito</h3><ul><li><strong>Wann bestellen:</strong> am Nachmittag, wenn die Hitze noch drückt.</li><li><strong>Warum:</strong> Rum, Limette, frische Minze und Soda. Erfrischend, leicht und perfekt als erster Drink des Tages.</li></ul><h3>2. Aperol Spritz</h3><ul><li><strong>Wann bestellen:</strong> kurz vor dem Abendessen, mitten im mediterranen Aperitivo.</li><li><strong>Warum:</strong> seine zitrische Bitterkeit regt den Appetit an, und sein Orange ist purer Sommer auf dem Tisch.</li></ul><h3>3. Negroni</h3><ul><li><strong>Wann bestellen:</strong> in der Abenddämmerung, wenn du etwas mit mehr Charakter willst.</li><li><strong>Warum:</strong> Gin, Campari und roter Wermut zu gleichen Teilen. Bitter, elegant und italienisch bis ins Mark.</li></ul><h3>4. Margarita</h3><ul><li><strong>Wann bestellen:</strong> in einer lebhaften Nacht mit Tapas und guter Stimmung.</li><li><strong>Warum:</strong> Tequila, Triple Sec und Limette mit Salzrand. Direkt und kraftvoll.</li></ul><h3>5. Daiquiri</h3><ul><li><strong>Wann bestellen:</strong> wenn du gut umgesetzte Schlichtheit suchst.</li><li><strong>Warum:</strong> nur Rum, Limette und Zucker, aber millimetergenau ausbalanciert ist er ein minimalistisches Meisterwerk.</li></ul><h2>Signature-Cocktails: die Handschrift von Enjoy</h2><p>Hier glänzt unsere Terrasse wirklich. Die <strong>Signature-Cocktails</strong> der <a href="/enjoy">Enjoy Terrace</a> spielen mit Premium-Spirituosen, saisonalen Früchten und liebevoller Präsentation. Das sind die Signature-Cocktails von Alcúdia, die du nicht überall findest.</p><h3>6. Passion Sunset</h3><ul><li><strong>Wann bestellen:</strong> wenn die Sonne über der Bucht sinkt.</li><li><strong>Warum:</strong> Maracuja, Zitrus und eine würzige Note. Sein orangener Verlauf passt zum Abendhimmel.</li></ul><h3>7. Espresso Martini</h3><ul><li><strong>Wann bestellen:</strong> nach dem Abendessen, um mit Energie in die Nacht zu starten.</li><li><strong>Warum:</strong> Wodka, Kaffeelikör und ein frisch gebrühter Espresso. Die perfekte Brücke zwischen Tisch und Tanzfläche.</li></ul><h3>8. Signature Gin &amp; Tonic</h3><ul><li><strong>Wann bestellen:</strong> jederzeit; der elegante Allrounder.</li><li><strong>Warum:</strong> Premium-Gin, ausgewähltes Tonic und Botanicals (Gurke, Wacholder, Zitrus), um ihn nach deinem Geschmack zu gestalten.</li></ul><h3>9. Mai Tai</h3><ul><li><strong>Wann bestellen:</strong> wenn dir nach tropischer Flucht ist, ohne die Insel zu verlassen.</li><li><strong>Warum:</strong> Rum, Mandel, Zitrus und Curaçao. Komplex, fruchtig und voller Urlaubsstimmung.</li></ul><h3>10. Haus-Cocktail mit Shisha</h3><ul><li><strong>Wann bestellen:</strong> für einen langen, gemütlichen Abend.</li><li><strong>Warum:</strong> die Kombination aus einem Signature-Cocktail und unserer <a href="/blog/cocteles-shisha-terraza-alcudia">Premium-Shisha auf der Terrasse</a> ist das Markenzeichen von Enjoy. Mehr über dieses Ritual erfährst du in unserem Guide zur <a href="/blog/shisha-bar-terraza-lounge-mallorca">Shisha-Bar und Lounge-Terrasse auf Mallorca</a>.</li></ul><h2>Alkoholfreie Cocktails, die ebenfalls überzeugen</h2><p>Man braucht keinen Alkohol, um gute Cocktailkunst zu genießen. Unsere <strong>Mocktails</strong> sind so sorgfältig gemacht wie der Rest der Karte, ideal für den Fahrer, für die Mittagszeit oder einfach zur Abwechslung.</p><ul><li><strong>Virgin Mojito:</strong> die ganze Frische von Minze und Limette, ohne Rum.</li><li><strong>Alkoholfreie Piña Colada:</strong> Ananas, Kokos und tropische Cremigkeit.</li><li><strong>Rote-Beeren-Limonade:</strong> zitrisch, süß und sehr erfrischend für die heißesten Stunden.</li><li><strong>Maracuja-Nojito:</strong> unsere alkoholfreie Version des Klassikers mit Maracuja.</li></ul><h2>Wo man sie bei Sonnenuntergang in Port d'Alcúdia genießt</h2><p>Ein guter Cocktail verdient eine gute Kulisse. Die <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1, Port d'Alcúdia) öffnet täglich ab 17:00 Uhr und ist genau dafür gemacht: Signature-Cocktails und Premium-Shisha, während die Sonne über der Bucht untergeht. Sie ist, ohne zu übertreiben, einer der besten Orte der Gegend, um den <a href="/blog/atardecer-puesta-sol-alcudia-donde-ver">Sonnenuntergang in Alcúdia</a> mit einem Drink in der Hand zu erleben. Unser Motto bringt es auf den Punkt: "Where nights begin".</p><p>Wenn du einen kompletten Plan suchst, beginne mit Cocktails bei Sonnenuntergang auf der Terrasse und lass die Nacht ihren Lauf nehmen. Zur Inspiration wirf einen Blick in unseren <a href="/blog/cocteles-shisha-terraza-alcudia">Guide zu Cocktails und Shisha auf der Terrasse</a>. Diesen Sommer in Alcúdia stößt man am besten mit einem guten Drink und dem Norden Mallorcas im Hintergrund an. Wir warten auf dich.</p>`,
      fr: `<p>L'été dans le nord de Majorque se boit lentement, avec les glaçons qui tintent et la mer en fond. À l'<a href="/enjoy">Enjoy Terrace</a>, au cœur de Port d'Alcúdia, la mixologie est un art : nous mêlons des classiques intemporels à des créations signature pensées pour la terrasse et le coucher du soleil. Si vous vous demandez quel cocktail commander à Alcúdia cette saison, voici notre guide honnête des meilleurs cocktails à goûter, quand les commander et pourquoi. Prenez note.</p><h2>Les classiques qui ne déçoivent jamais</h2><p>Avant de vous lancer dans les cocktails signature, mieux vaut maîtriser les grands basiques. Ils sont la base de tout bon bar et restent les plus commandés en terrasse.</p><h3>1. Mojito</h3><ul><li><strong>Quand le commander :</strong> en milieu d'après-midi, quand la chaleur persiste.</li><li><strong>Pourquoi :</strong> rhum, citron vert, menthe fraîche et soda. Rafraîchissant, léger et parfait comme premier verre de la journée.</li></ul><h3>2. Aperol Spritz</h3><ul><li><strong>Quand le commander :</strong> juste avant le dîner, en plein apéritif méditerranéen.</li><li><strong>Pourquoi :</strong> son amertume citronnée ouvre l'appétit et sa couleur orange, c'est l'été sur la table.</li></ul><h3>3. Negroni</h3><ul><li><strong>Quand le commander :</strong> à la tombée du jour, quand on veut quelque chose de plus caractériel.</li><li><strong>Pourquoi :</strong> gin, Campari et vermouth rouge à parts égales. Amer, élégant et italien jusqu'au bout.</li></ul><h3>4. Margarita</h3><ul><li><strong>Quand la commander :</strong> lors d'une soirée animée de tapas et de bonne humeur.</li><li><strong>Pourquoi :</strong> tequila, triple sec et citron vert avec le bord givré de sel. Direct et plein de peps.</li></ul><h3>5. Daiquiri</h3><ul><li><strong>Quand le commander :</strong> quand vous cherchez la simplicité bien exécutée.</li><li><strong>Pourquoi :</strong> juste rhum, citron vert et sucre, mais équilibré au millimètre, c'est un chef-d'œuvre minimaliste.</li></ul><h2>Cocktails signature : la griffe d'Enjoy</h2><p>C'est là que notre terrasse brille vraiment. Les <strong>cocktails signature</strong> de l'<a href="/enjoy">Enjoy Terrace</a> jouent avec des spiritueux premium, des fruits de saison et des présentations soignées. Ce sont les cocktails d'auteur d'Alcúdia que vous ne trouverez pas n'importe où.</p><h3>6. Passion Sunset</h3><ul><li><strong>Quand le commander :</strong> quand le soleil descend sur la baie.</li><li><strong>Pourquoi :</strong> fruit de la passion, agrumes et une touche épicée. Son dégradé orangé s'accorde au ciel du couchant.</li></ul><h3>7. Espresso Martini</h3><ul><li><strong>Quand le commander :</strong> après le dîner, pour lancer la nuit avec énergie.</li><li><strong>Pourquoi :</strong> vodka, liqueur de café et un espresso fraîchement tiré. Le pont parfait entre la table et la piste.</li></ul><h3>8. Gin Tonic signature</h3><ul><li><strong>Quand le commander :</strong> à tout moment ; c'est l'élégant passe-partout.</li><li><strong>Pourquoi :</strong> gin premium, tonic sélectionné et botaniques (concombre, genièvre, agrumes) pour le personnaliser à votre goût.</li></ul><h3>9. Mai Tai</h3><ul><li><strong>Quand le commander :</strong> quand vous avez envie d'évasion tropicale sans quitter l'île.</li><li><strong>Pourquoi :</strong> rhum, amande, agrumes et curaçao. Complexe, fruité et plein d'esprit vacances.</li></ul><h3>10. Cocktail maison avec shisha</h3><ul><li><strong>Quand le commander :</strong> pour une soirée longue et sans hâte.</li><li><strong>Pourquoi :</strong> associer un cocktail signature à notre <a href="/blog/cocteles-shisha-terraza-alcudia">shisha premium en terrasse</a> est la signature d'Enjoy. Découvrez-en plus sur ce rituel dans notre guide du <a href="/blog/shisha-bar-terraza-lounge-mallorca">shisha bar et terrasse lounge à Majorque</a>.</li></ul><h2>Cocktails sans alcool qui font aussi mouche</h2><p>Nul besoin d'alcool pour apprécier une belle mixologie. Nos <strong>mocktails</strong> sont aussi soignés que le reste de la carte, idéaux pour celui qui conduit, pour le midi ou simplement pour changer.</p><ul><li><strong>Virgin Mojito :</strong> toute la fraîcheur de la menthe et du citron vert, sans le rhum.</li><li><strong>Piña colada sans alcool :</strong> ananas, coco et onctuosité tropicale.</li><li><strong>Limonade aux fruits rouges :</strong> citronnée, douce et très rafraîchissante pour les heures les plus chaudes.</li><li><strong>Nojito au fruit de la passion :</strong> notre version sans alcool du classique, au fruit de la passion.</li></ul><h2>Où les déguster au coucher du soleil à Port d'Alcúdia</h2><p>Un bon cocktail mérite un beau décor. L'<a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1, Port d'Alcúdia) ouvre tous les jours dès 17h00 et est pensée précisément pour cela : cocktails signature et shisha premium pendant que le soleil se couche sur la baie. C'est, sans exagérer, l'un des meilleurs endroits du secteur pour admirer le <a href="/blog/atardecer-puesta-sol-alcudia-donde-ver">coucher de soleil à Alcúdia</a>, un verre à la main. Notre devise le résume : "Where nights begin".</p><p>Si vous cherchez un plan complet, commencez par des cocktails au coucher du soleil en terrasse et laissez la nuit suivre son cours. Pour vous inspirer, jetez un œil à notre <a href="/blog/cocteles-shisha-terraza-alcudia">guide des cocktails et de la shisha en terrasse</a>. Cet été à Alcúdia, la meilleure façon de trinquer, c'est avec un bon verre et le nord de Majorque en toile de fond. Nous vous attendons.</p>`,
      it: `<p>L'estate nel nord di Maiorca si beve lentamente, con il ghiaccio che tintinna e il mare sullo sfondo. All'<a href="/enjoy">Enjoy Terrace</a>, nel cuore di Port d'Alcúdia, la mixology è un'arte: uniamo classici intramontabili a creazioni d'autore pensate per la terrazza e il tramonto. Se ti stai chiedendo quale cocktail ordinare ad Alcúdia questa stagione, ecco la nostra guida onesta ai migliori cocktail da provare, quando ordinarli e perché. Prendi nota.</p><h2>I classici che non deludono mai</h2><p>Prima di lanciarti sui cocktail d'autore, conviene padroneggiare i grandi basici. Sono la base di ogni buon bar e restano i più ordinati in terrazza.</p><h3>1. Mojito</h3><ul><li><strong>Quando ordinarlo:</strong> nel pomeriggio, quando il caldo ancora stringe.</li><li><strong>Perché:</strong> rum, lime, menta fresca e soda. Rinfrescante, leggero e perfetto come primo drink della giornata.</li></ul><h3>2. Aperol Spritz</h3><ul><li><strong>Quando ordinarlo:</strong> poco prima di cena, nel pieno dell'aperitivo mediterraneo.</li><li><strong>Perché:</strong> il suo amaro agrumato apre l'appetito e il suo arancione è pura estate in tavola.</li></ul><h3>3. Negroni</h3><ul><li><strong>Quando ordinarlo:</strong> al calar della sera, quando vuoi qualcosa di più carattere.</li><li><strong>Perché:</strong> gin, Campari e vermut rosso in parti uguali. Amaro, elegante e italiano fino al midollo.</li></ul><h3>4. Margarita</h3><ul><li><strong>Quando ordinarla:</strong> in una serata vivace di tapas e buonumore.</li><li><strong>Perché:</strong> tequila, triple sec e lime con il bordo di sale. Diretto e pieno di grinta.</li></ul><h3>5. Daiquiri</h3><ul><li><strong>Quando ordinarlo:</strong> quando cerchi la semplicità ben eseguita.</li><li><strong>Perché:</strong> solo rum, lime e zucchero, ma bilanciato al millimetro è un capolavoro minimalista.</li></ul><h2>Cocktail d'autore: la firma di Enjoy</h2><p>È qui che la nostra terrazza brilla davvero. I <strong>signature cocktail</strong> dell'<a href="/enjoy">Enjoy Terrace</a> giocano con distillati premium, frutta di stagione e presentazioni curate. Sono i cocktail d'autore di Alcúdia che non trovi ovunque.</p><h3>6. Passion Sunset</h3><ul><li><strong>Quando ordinarlo:</strong> mentre il sole scende sulla baia.</li><li><strong>Perché:</strong> frutto della passione, agrumi e un tocco speziato. Il suo degradé arancione si abbina al cielo del tramonto.</li></ul><h3>7. Espresso Martini</h3><ul><li><strong>Quando ordinarlo:</strong> dopo cena, per iniziare la notte con energia.</li><li><strong>Perché:</strong> vodka, liquore al caffè e un espresso appena fatto. Il ponte perfetto tra la tavola e la pista.</li></ul><h3>8. Gin Tonic d'autore</h3><ul><li><strong>Quando ordinarlo:</strong> in qualsiasi momento; è l'elegante jolly.</li><li><strong>Perché:</strong> gin premium, tonica selezionata e botaniche (cetriolo, ginepro, agrumi) per personalizzarlo a tuo gusto.</li></ul><h3>9. Mai Tai</h3><ul><li><strong>Quando ordinarlo:</strong> quando hai voglia di evasione tropicale senza lasciare l'isola.</li><li><strong>Perché:</strong> rum, mandorla, agrumi e curaçao. Complesso, fruttato e pieno di spirito vacanziero.</li></ul><h3>10. Cocktail della casa con shisha</h3><ul><li><strong>Quando ordinarlo:</strong> per una serata lunga e senza fretta.</li><li><strong>Perché:</strong> abbinare un cocktail d'autore alla nostra <a href="/blog/cocteles-shisha-terraza-alcudia">shisha premium in terrazza</a> è il segno distintivo di Enjoy. Scopri di più su questo rituale nella nostra guida allo <a href="/blog/shisha-bar-terraza-lounge-mallorca">shisha bar e terrazza lounge a Maiorca</a>.</li></ul><h2>Cocktail analcolici che conquistano lo stesso</h2><p>Non serve l'alcol per godersi una buona mixology. I nostri <strong>mocktail</strong> sono curati quanto il resto della carta, ideali per chi guida, per il mezzogiorno o semplicemente per cambiare.</p><ul><li><strong>Virgin Mojito:</strong> tutta la freschezza di menta e lime, senza rum.</li><li><strong>Piña colada analcolica:</strong> ananas, cocco e cremosità tropicale.</li><li><strong>Limonata ai frutti rossi:</strong> agrumata, dolce e molto rinfrescante per le ore più calde.</li><li><strong>Nojito al maracuja:</strong> la nostra versione analcolica del classico, con frutto della passione.</li></ul><h2>Dove gustarli al tramonto a Port d'Alcúdia</h2><p>Un buon cocktail merita una bella cornice. L'<a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1, Port d'Alcúdia) apre ogni giorno dalle 17:00 ed è pensata proprio per questo: cocktail d'autore e shisha premium mentre il sole tramonta sulla baia. È, senza esagerare, uno dei posti migliori della zona per ammirare il <a href="/blog/atardecer-puesta-sol-alcudia-donde-ver">tramonto ad Alcúdia</a> con un drink in mano. Il nostro motto lo riassume: "Where nights begin".</p><p>Se cerchi un piano completo, inizia con cocktail al tramonto in terrazza e lascia che la notte faccia il suo corso. Per ispirarti, dai un'occhiata alla nostra <a href="/blog/cocteles-shisha-terraza-alcudia">guida ai cocktail e alla shisha in terrazza</a>. Quest'estate ad Alcúdia, il modo migliore per brindare è con un buon drink e il nord di Maiorca sullo sfondo. Ti aspettiamo.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-07-19",
    image: "/images/enjoy/484589155_1381489793254024_5556314981110024753_n.jpg",
    tags: ["mejores cocteles mallorca", "cocteles de autor alcudia", "que coctel pedir", "signature cocktails mallorca", "enjoy terrace"],
    venue: "enjoy",
    readingTime: 6,
    faq: [
      {
        question: {
          es: "¿Qué cóctel debería pedir en Alcúdia si es mi primera vez?",
          en: "Which cocktail should I order in Alcúdia if it's my first time?",
          de: "Welchen Cocktail sollte ich in Alcúdia bestellen, wenn ich zum ersten Mal hier bin?",
          fr: "Quel cocktail commander à Alcúdia pour une première fois ?",
          it: "Quale cocktail ordinare ad Alcúdia se è la prima volta?",
        },
        answer: {
          es: "Un mojito o un Aperol Spritz son apuestas seguras y refrescantes. Si quieres algo especial, prueba un cóctel de autor como el Passion Sunset en Enjoy Terrace.",
          en: "A mojito or an Aperol Spritz are safe, refreshing bets. If you want something special, try a signature cocktail like the Passion Sunset at Enjoy Terrace.",
          de: "Ein Mojito oder ein Aperol Spritz sind sichere, erfrischende Optionen. Für etwas Besonderes probiere einen Signature-Cocktail wie den Passion Sunset in der Enjoy Terrace.",
          fr: "Un mojito ou un Aperol Spritz sont des valeurs sûres et rafraîchissantes. Pour quelque chose de spécial, essayez un cocktail signature comme le Passion Sunset à l'Enjoy Terrace.",
          it: "Un mojito o un Aperol Spritz sono scelte sicure e rinfrescanti. Per qualcosa di speciale, prova un cocktail d'autore come il Passion Sunset all'Enjoy Terrace.",
        },
      },
      {
        question: {
          es: "¿Hay cócteles sin alcohol en Enjoy Terrace?",
          en: "Are there alcohol-free cocktails at Enjoy Terrace?",
          de: "Gibt es alkoholfreie Cocktails in der Enjoy Terrace?",
          fr: "Y a-t-il des cocktails sans alcool à l'Enjoy Terrace ?",
          it: "Ci sono cocktail analcolici all'Enjoy Terrace?",
        },
        answer: {
          es: "Sí. Hay mocktails como el virgin mojito, la piña colada sin alcohol o el nojito de maracuyá, elaborados con el mismo cuidado que la coctelería clásica.",
          en: "Yes. There are mocktails such as the virgin mojito, the alcohol-free piña colada or the passion fruit nojito, made with the same care as the classic cocktails.",
          de: "Ja. Es gibt Mocktails wie den Virgin Mojito, die alkoholfreie Piña Colada oder den Maracuja-Nojito, mit der gleichen Sorgfalt wie die klassischen Cocktails zubereitet.",
          fr: "Oui. Il y a des mocktails comme le virgin mojito, la piña colada sans alcool ou le nojito au fruit de la passion, préparés avec le même soin que les cocktails classiques.",
          it: "Sì. Ci sono mocktail come il virgin mojito, la piña colada analcolica o il nojito al maracuja, preparati con la stessa cura dei cocktail classici.",
        },
      },
      {
        question: {
          es: "¿A qué hora abre Enjoy Terrace para tomar cócteles al atardecer?",
          en: "What time does Enjoy Terrace open for sunset cocktails?",
          de: "Wann öffnet die Enjoy Terrace für Cocktails bei Sonnenuntergang?",
          fr: "À quelle heure ouvre l'Enjoy Terrace pour les cocktails au coucher du soleil ?",
          it: "A che ora apre l'Enjoy Terrace per i cocktail al tramonto?",
        },
        answer: {
          es: "Enjoy Terrace abre a diario desde las 17:00 en Av. Tucán 1, Port d'Alcúdia, ideal para llegar antes del atardecer y disfrutar de la puesta de sol copa en mano.",
          en: "Enjoy Terrace opens daily from 5:00 pm at Av. Tucán 1, Port d'Alcúdia, ideal for arriving before dusk and enjoying the sunset drink in hand.",
          de: "Die Enjoy Terrace öffnet täglich ab 17:00 Uhr in der Av. Tucán 1, Port d'Alcúdia, ideal, um vor der Dämmerung anzukommen und den Sonnenuntergang mit einem Drink zu genießen.",
          fr: "L'Enjoy Terrace ouvre tous les jours dès 17h00 au Av. Tucán 1, Port d'Alcúdia, idéal pour arriver avant le crépuscule et profiter du coucher de soleil un verre à la main.",
          it: "L'Enjoy Terrace apre ogni giorno dalle 17:00 in Av. Tucán 1, Port d'Alcúdia, ideale per arrivare prima del crepuscolo e godersi il tramonto con un drink in mano.",
        },
      },
      {
        question: {
          es: "¿Qué es un cóctel de autor o signature cocktail?",
          en: "What is a signature cocktail?",
          de: "Was ist ein Signature-Cocktail?",
          fr: "Qu'est-ce qu'un cocktail signature ?",
          it: "Cos'è un signature cocktail o cocktail d'autore?",
        },
        answer: {
          es: "Es una creación propia del bar, con combinaciones exclusivas de destilados, frutas y presentaciones que no encontrarás en otros locales, como los que elabora Enjoy Terrace.",
          en: "It's the bar's own creation, with exclusive combinations of spirits, fruit and presentations you won't find elsewhere, like those crafted at Enjoy Terrace.",
          de: "Es ist eine eigene Kreation der Bar mit exklusiven Kombinationen aus Spirituosen, Früchten und Präsentationen, die man anderswo nicht findet, wie jene der Enjoy Terrace.",
          fr: "C'est une création propre au bar, avec des combinaisons exclusives de spiritueux, de fruits et de présentations introuvables ailleurs, comme celles de l'Enjoy Terrace.",
          it: "È una creazione propria del bar, con combinazioni esclusive di distillati, frutta e presentazioni che non trovi altrove, come quelle dell'Enjoy Terrace.",
        },
      },
    ],
  },
  {
    slug: "espana-campeona-mundial-2026-outxide-alcudia",
    title: {
      es: "España Campeona del Mundo 2026: Así se Vivió la Final en Outxide (Alcúdia)",
      en: "Spain, 2026 World Champions: How the Final Was Lived at Outxide (Alcúdia)",
      de: "Spanien ist Weltmeister 2026: So haben wir das Finale im Outxide erlebt (Alcúdia)",
      fr: "L'Espagne Championne du Monde 2026 : la Finale Vécue à Outxide (Alcúdia)",
      it: "Spagna Campione del Mondo 2026: Come si è Vissuta la Finale all'Outxide (Alcúdia)",
    },
    excerpt: {
      es: "España es campeona del Mundial 2026 tras ganar 1-0 a Argentina. Te contamos cómo se vivió la final en pantalla gigante en Outxide Club, desde la terraza de Enjoy en Port d'Alcúdia. La segunda estrella de La Roja se celebró en Mallorca.",
      en: "Spain are the 2026 World Champions after beating Argentina 1-0. Here's how the final was lived on the big screen at Outxide Club, from the Enjoy terrace in Port d'Alcúdia. La Roja's second star was celebrated in Mallorca — the best place to watch football and the matches in Alcúdia.",
      de: "Spanien ist Weltmeister 2026 nach dem 1:0 gegen Argentinien. Wir erzählen dir, wie das Finale auf der Großleinwand im Outxide Club erlebt wurde, von der Enjoy-Terrasse in Port d'Alcúdia aus. Der zweite Stern von La Roja wurde auf Mallorca gefeiert — der beste Ort, um in Alcúdia Fußball und die Spiele zu schauen.",
      fr: "L'Espagne est championne du monde 2026 après sa victoire 1-0 contre l'Argentine. On vous raconte comment la finale a été vécue sur écran géant à Outxide Club, depuis la terrasse d'Enjoy à Port d'Alcúdia. La deuxième étoile de La Roja s'est fêtée à Majorque, le meilleur endroit pour regarder le foot et les matchs à Alcúdia.",
      it: "La Spagna è campione del mondo 2026 dopo la vittoria per 1-0 sull'Argentina. Ti raccontiamo come si è vissuta la finale sul maxischermo all'Outxide Club, dalla terrazza di Enjoy a Port d'Alcúdia. La seconda stella della Roja si è festeggiata a Maiorca, il posto migliore per vedere il calcio e le partite ad Alcúdia.",
    },
    content: {
      es: `<p>Ya es historia: <strong>España es campeona del Mundo 2026</strong>. La Roja se impuso <strong>1-0 a Argentina</strong> en la final y suma su <strong>segunda estrella</strong>, dieciséis años después del título de 2010. Y en Port d'Alcúdia lo vivimos como se merecía: con la final en <strong>pantalla gigante en Outxide Club</strong>, visible desde la terraza de <a href="/enjoy">Enjoy</a> y con un ambientazo que no olvidaremos.</p>

<h2>La final del Mundial, en pantalla gigante en Outxide</h2>
<p>Durante toda la tarde-noche, <a href="/outxide">Outxide Club</a> se convirtió en el mejor sitio para ver el fútbol en Alcúdia. Montamos las pantallas grandes con el partido y el marcador en directo, y la terraza de Enjoy se llenó de gente con ganas de vibrar. Sin entrada de discoteca, con las copas de siempre y el mejor plan para una noche irrepetible: ver a España jugarse el Mundial rodeado de aficionados de toda la zona.</p>
<p>El gol de la victoria desató la locura en Port d'Alcúdia. Bengalas de color, cánticos y una celebración que se alargó hasta bien entrada la madrugada en la que Outxide se convirtió en una fiesta por el título. Gracias a todos los que vinisteis a compartirlo con nosotros.</p>

<h2>El camino de España hacia la segunda estrella</h2>
<p>El título no llegó por casualidad. España firmó un torneo espectacular de principio a fin:</p>
<ul>
<li><strong>Fase de grupos:</strong> 0-0 con Cabo Verde, 4-0 a Arabia Saudí y 1-0 a Uruguay.</li>
<li><strong>Dieciseisavos:</strong> 3-0 a Austria.</li>
<li><strong>Octavos:</strong> 1-0 a Portugal en un duelo ibérico de altísima tensión.</li>
<li><strong>Cuartos:</strong> 2-1 a Bélgica, sufriendo hasta el final.</li>
<li><strong>Semifinal:</strong> 2-0 a Francia, un partidazo que metió a La Roja en la final.</li>
<li><strong>Final:</strong> 1-0 a Argentina para levantar la copa.</li>
</ul>
<p>Muchos de esos partidos también se vivieron en Outxide durante el mes de Mundial, con la terraza de Enjoy como grada de excepción.</p>

<h2>Un mes de Mundial en Port d'Alcúdia</h2>
<p>Desde el arranque del torneo retransmitimos en directo los partidos que caían en horario de tarde-noche, con el calendario completo, el cuadro de eliminatorias y el marcador en tiempo real en nuestra web. Alcúdia recibe cada verano a miles de turistas de Alemania, Reino Unido, Francia, Italia, Países Bajos y, por supuesto, España, y no hay mejor forma de unir a todos que un buen partido en pantalla gigante con una copa en la mano.</p>
<p>Si te preguntas <strong>dónde ver el fútbol en Alcúdia</strong> o <strong>dónde ver los partidos en Mallorca</strong>, ya sabes: Grupo Enjoy es tu sitio. Y esto no acaba aquí.</p>

<h2>Lo que viene: eventos todo el verano en Grupo Enjoy</h2>
<p>El Mundial ha terminado, pero el verano en Port d'Alcúdia no para. En <a href="/outxide">Outxide Club</a> seguimos con nuestras noches de DJ, sesiones y fiestas temáticas; en <a href="/enjoy">Enjoy Terrace</a> te esperan los mejores cócteles de autor y shisha frente al atardecer.</p>
<p>Consulta la <a href="/outxide">agenda de Outxide</a> para no perderte ningún evento, y celebra con nosotros lo que queda de temporada. ¡Gracias por hacer de este Mundial una fiesta inolvidable en Alcúdia!</p>`,
      en: `<p>It's now history: <strong>Spain are the 2026 World Champions</strong>. La Roja beat <strong>Argentina 1-0</strong> in the final to claim their <strong>second star</strong>, sixteen years after the 2010 title. And in Port d'Alcúdia we lived it exactly as it deserved: the final on the <strong>big screen at Outxide Club</strong>, visible from the <a href="/enjoy">Enjoy</a> terrace, with an atmosphere we'll never forget.</p>

<h2>The World Cup final on the big screen at Outxide</h2>
<p>All evening long, <a href="/outxide">Outxide Club</a> became the best place to watch football in Alcúdia. We set up the big screens with the match and the live score, and the Enjoy terrace filled up with people ready to cheer. No club entry fee, your usual drinks in hand, and the best plan for an unforgettable night: watching Spain fight for the World Cup surrounded by fans from all over the area.</p>
<p>The winning goal sparked pure joy across Port d'Alcúdia. Coloured flares, chants and a celebration that stretched well into the early hours, with Outxide turned into a party for the title. Thank you to everyone who came to share it with us.</p>

<h2>Spain's road to the second star</h2>
<p>The title was no accident. Spain put together a spectacular tournament from start to finish:</p>
<ul>
<li><strong>Group stage:</strong> 0-0 against Cape Verde, 4-0 against Saudi Arabia and 1-0 against Uruguay.</li>
<li><strong>Round of 32:</strong> 3-0 against Austria.</li>
<li><strong>Round of 16:</strong> 1-0 against Portugal in an Iberian derby of the highest tension.</li>
<li><strong>Quarter-finals:</strong> 2-1 against Belgium, sweating it out to the very end.</li>
<li><strong>Semi-final:</strong> 2-0 against France, a superb match that sent La Roja into the final.</li>
<li><strong>Final:</strong> 1-0 against Argentina to lift the trophy.</li>
</ul>
<p>Many of those matches were also lived at Outxide during the World Cup month, with the Enjoy terrace as a front-row stand.</p>

<h2>A month of World Cup in Port d'Alcúdia</h2>
<p>From the tournament's kick-off we broadcast live every match that fell in the evening slot, with the full schedule, the knockout bracket and the real-time score on our website. Every summer Alcúdia welcomes thousands of tourists from Germany, the United Kingdom, France, Italy, the Netherlands and, of course, Spain — and there's no better way to bring everyone together than a great match on the big screen with a drink in hand.</p>
<p>So if you're wondering <strong>where to watch football in Alcúdia</strong> or <strong>where to watch the matches in Mallorca</strong>, now you know: Grupo Enjoy is your place. And this isn't over.</p>

<h2>What's next: events all summer at Grupo Enjoy</h2>
<p>The World Cup is over, but summer in Port d'Alcúdia doesn't stop. At <a href="/outxide">Outxide Club</a> we carry on with our DJ nights, sessions and themed parties; at <a href="/enjoy">Enjoy Terrace</a> the best signature cocktails and shisha await you facing the sunset.</p>
<p>Check the <a href="/outxide">Outxide agenda</a> so you don't miss a single event, and celebrate the rest of the season with us. Thank you for making this World Cup an unforgettable party in Alcúdia!</p>`,
      de: `<p>Jetzt ist es Geschichte: <strong>Spanien ist Weltmeister 2026</strong>. La Roja gewann das Finale mit <strong>1:0 gegen Argentinien</strong> und holt seinen <strong>zweiten Stern</strong>, sechzehn Jahre nach dem Titel von 2010. Und in Port d'Alcúdia haben wir es so erlebt, wie es sein sollte: das Finale auf der <strong>Großleinwand im Outxide Club</strong>, sichtbar von der <a href="/enjoy">Enjoy</a>-Terrasse, mit einer Stimmung, die wir nie vergessen werden.</p>

<h2>Das WM-Finale auf der Großleinwand im Outxide</h2>
<p>Den ganzen Abend über war <a href="/outxide">Outxide Club</a> der beste Ort, um in Alcúdia Fußball zu schauen. Wir haben die großen Leinwände mit dem Spiel und dem Live-Spielstand aufgebaut, und die Enjoy-Terrasse füllte sich mit Menschen, die mitfiebern wollten. Ohne Disco-Eintritt, mit euren gewohnten Drinks und dem besten Plan für eine einmalige Nacht: Spanien um die WM kämpfen sehen, umgeben von Fans aus der ganzen Region.</p>
<p>Das Siegtor löste in Port d'Alcúdia den blanken Jubel aus. Bunte Bengalos, Fangesänge und eine Feier, die bis in die frühen Morgenstunden ging, in der sich das Outxide in eine Party für den Titel verwandelte. Danke an alle, die gekommen sind, um es mit uns zu teilen.</p>

<h2>Spaniens Weg zum zweiten Stern</h2>
<p>Der Titel kam nicht von ungefähr. Spanien lieferte von Anfang bis Ende ein spektakuläres Turnier ab:</p>
<ul>
<li><strong>Gruppenphase:</strong> 0:0 gegen Kap Verde, 4:0 gegen Saudi-Arabien und 1:0 gegen Uruguay.</li>
<li><strong>Sechzehntelfinale:</strong> 3:0 gegen Österreich.</li>
<li><strong>Achtelfinale:</strong> 1:0 gegen Portugal in einem iberischen Duell mit höchster Spannung.</li>
<li><strong>Viertelfinale:</strong> 2:1 gegen Belgien, bis zum Schluss gezittert.</li>
<li><strong>Halbfinale:</strong> 2:0 gegen Frankreich, ein starkes Spiel, das La Roja ins Finale brachte.</li>
<li><strong>Finale:</strong> 1:0 gegen Argentinien, um den Pokal zu heben.</li>
</ul>
<p>Viele dieser Spiele wurden während des WM-Monats auch im Outxide erlebt, mit der Enjoy-Terrasse als Tribüne der Extraklasse.</p>

<h2>Ein Monat WM in Port d'Alcúdia</h2>
<p>Vom Anpfiff des Turniers an übertrugen wir jedes Spiel live, das in die Abendzeit fiel — mit dem kompletten Spielplan, dem Turnierbaum und dem Live-Spielstand auf unserer Website. Jeden Sommer empfängt Alcúdia Tausende Touristen aus Deutschland, dem Vereinigten Königreich, Frankreich, Italien, den Niederlanden und natürlich Spanien, und es gibt keine bessere Art, alle zusammenzubringen, als ein großes Spiel auf der Großleinwand mit einem Drink in der Hand.</p>
<p>Wenn du dich also fragst, <strong>wo man in Alcúdia Fußball schauen kann</strong> oder <strong>wo man die Spiele auf Mallorca sehen kann</strong>, weißt du jetzt Bescheid: Grupo Enjoy ist dein Ort. Und das war noch nicht alles.</p>

<h2>Was kommt: Events den ganzen Sommer bei Grupo Enjoy</h2>
<p>Die WM ist vorbei, aber der Sommer in Port d'Alcúdia hört nicht auf. Im <a href="/outxide">Outxide Club</a> geht es weiter mit unseren DJ-Nächten, Sessions und Themenpartys; in der <a href="/enjoy">Enjoy Terrace</a> erwarten dich die besten Signature-Cocktails und Shisha mit Blick auf den Sonnenuntergang.</p>
<p>Schau in den <a href="/outxide">Outxide-Kalender</a>, damit dir kein Event entgeht, und feiere mit uns den Rest der Saison. Danke, dass ihr diese WM zu einem unvergesslichen Fest in Alcúdia gemacht habt!</p>`,
      fr: `<p>C'est désormais dans l'histoire : <strong>l'Espagne est championne du monde 2026</strong>. La Roja s'est imposée <strong>1-0 face à l'Argentine</strong> en finale et décroche sa <strong>deuxième étoile</strong>, seize ans après le titre de 2010. Et à Port d'Alcúdia, nous l'avons vécu comme il se doit : la finale sur <strong>écran géant à Outxide Club</strong>, visible depuis la terrasse d'<a href="/enjoy">Enjoy</a>, avec une ambiance que nous n'oublierons pas.</p>

<h2>La finale de la Coupe du monde sur écran géant à Outxide</h2>
<p>Toute la soirée, <a href="/outxide">Outxide Club</a> est devenu le meilleur endroit pour regarder le foot à Alcúdia. Nous avons installé les grands écrans avec le match et le score en direct, et la terrasse d'Enjoy s'est remplie de monde, prête à vibrer. Sans billet d'entrée en discothèque, avec vos verres habituels et le meilleur plan pour une soirée unique : voir l'Espagne jouer le Mondial, entouré de supporters de toute la région.</p>
<p>Le but de la victoire a déclenché la folie à Port d'Alcúdia. Fumigènes colorés, chants de supporters et une célébration qui s'est prolongée jusqu'au petit matin, avec Outxide transformé en fête pour le titre. Merci à toutes et à tous d'être venus le partager avec nous.</p>

<h2>Le parcours de l'Espagne vers la deuxième étoile</h2>
<p>Le titre n'est pas arrivé par hasard. L'Espagne a signé un tournoi spectaculaire du début à la fin :</p>
<ul>
<li><strong>Phase de groupes :</strong> 0-0 contre le Cap-Vert, 4-0 face à l'Arabie Saoudite et 1-0 contre l'Uruguay.</li>
<li><strong>Seizièmes de finale :</strong> 3-0 face à l'Autriche.</li>
<li><strong>Huitièmes de finale :</strong> 1-0 face au Portugal, dans un duel ibérique sous très haute tension.</li>
<li><strong>Quarts de finale :</strong> 2-1 face à la Belgique, dans la souffrance jusqu'au bout.</li>
<li><strong>Demi-finale :</strong> 2-0 face à la France, un grand match qui a envoyé La Roja en finale.</li>
<li><strong>Finale :</strong> 1-0 face à l'Argentine pour soulever le trophée.</li>
</ul>
<p>Beaucoup de ces matchs se sont aussi vécus à Outxide pendant le mois de Coupe du monde, avec la terrasse d'Enjoy en guise de tribune d'exception.</p>

<h2>Un mois de Coupe du monde à Port d'Alcúdia</h2>
<p>Dès le coup d'envoi du tournoi, nous avons retransmis en direct les matchs programmés en soirée, avec le calendrier complet, le tableau des éliminatoires et le score en temps réel sur notre site. Chaque été, Alcúdia accueille des milliers de touristes venus d'Allemagne, du Royaume-Uni, de France, d'Italie, des Pays-Bas et, bien sûr, d'Espagne : il n'y a pas de meilleure façon de réunir tout le monde qu'un beau match sur écran géant, un verre à la main.</p>
<p>Si vous vous demandez <strong>où regarder le foot à Alcúdia</strong> ou <strong>où voir les matchs à Majorque</strong>, vous savez maintenant où aller : Grupo Enjoy, c'est chez nous. Et ce n'est pas fini.</p>

<h2>La suite : des événements tout l'été chez Grupo Enjoy</h2>
<p>La Coupe du monde est terminée, mais l'été à Port d'Alcúdia ne s'arrête pas. À <a href="/outxide">Outxide Club</a>, on continue avec nos soirées DJ, nos sessions et nos soirées à thème ; à <a href="/enjoy">Enjoy Terrace</a>, les meilleurs cocktails signature et la chicha vous attendent face au coucher du soleil .</p>
<p>Consultez l'<a href="/outxide">agenda d'Outxide</a> pour ne manquer aucun événement, et fêtez avec nous tout ce qu'il reste de la saison. Merci d'avoir fait de cette Coupe du monde une fête inoubliable à Alcúdia !</p>`,
      it: `<p>Ormai è storia: <strong>la Spagna è campione del mondo 2026</strong>. La Roja si è imposta <strong>1-0 sull'Argentina</strong> in finale e conquista la sua <strong>seconda stella</strong>, sedici anni dopo il titolo del 2010. E a Port d'Alcúdia l'abbiamo vissuta come meritava: la finale sul <strong>maxischermo all'Outxide Club</strong>, visibile dalla terrazza di <a href="/enjoy">Enjoy</a>, con un'atmosfera che non dimenticheremo.</p>

<h2>La finale del Mondiale sul maxischermo all'Outxide</h2>
<p>Per tutta la serata, <a href="/outxide">Outxide Club</a> è diventato il posto migliore per vedere il calcio ad Alcúdia. Abbiamo montato i grandi schermi con la partita e il punteggio in diretta, e la terrazza di Enjoy si è riempita di gente pronta a emozionarsi. Senza ingresso in discoteca, con i drink di sempre e il piano migliore per una notte irripetibile: vedere la Spagna giocarsi il Mondiale circondati da tifosi di tutta la zona.</p>
<p>Il gol della vittoria ha scatenato la gioia a Port d'Alcúdia. Fumogeni colorati, cori e una festa che si è protratta fino alle prime ore del mattino, con l'Outxide trasformato in una festa per il titolo. Grazie a tutti quelli che sono venuti a condividerla con noi.</p>

<h2>Il cammino della Spagna verso la seconda stella</h2>
<p>Il titolo non è arrivato per caso. La Spagna ha disputato un torneo spettacolare dall'inizio alla fine:</p>
<ul>
<li><strong>Fase a gironi:</strong> 0-0 con Capo Verde, 4-0 all'Arabia Saudita e 1-0 all'Uruguay.</li>
<li><strong>Sedicesimi:</strong> 3-0 all'Austria.</li>
<li><strong>Ottavi:</strong> 1-0 al Portogallo in un derby iberico ad altissima tensione.</li>
<li><strong>Quarti:</strong> 2-1 al Belgio, soffrendo fino alla fine.</li>
<li><strong>Semifinale:</strong> 2-0 alla Francia, una grande partita che ha portato la Roja in finale.</li>
<li><strong>Finale:</strong> 1-0 all'Argentina per alzare la coppa.</li>
</ul>
<p>Molte di quelle partite si sono vissute anche all'Outxide durante il mese del Mondiale, con la terrazza di Enjoy come tribuna d'eccezione.</p>

<h2>Un mese di Mondiale a Port d'Alcúdia</h2>
<p>Fin dal fischio d'inizio del torneo abbiamo trasmesso in diretta le partite in programma in fascia serale, con il calendario completo, il tabellone a eliminazione e il punteggio in tempo reale sul nostro sito. Ogni estate Alcúdia accoglie migliaia di turisti da Germania, Regno Unito, Francia, Italia, Paesi Bassi e, naturalmente, Spagna, e non c'è modo migliore per unire tutti di una bella partita sul maxischermo con un drink in mano.</p>
<p>Se ti stai chiedendo <strong>dove vedere il calcio ad Alcúdia</strong> o <strong>dove vedere le partite a Maiorca</strong>, ora lo sai: Grupo Enjoy è il tuo posto. E non finisce qui.</p>

<h2>Cosa arriva: eventi per tutta l'estate da Grupo Enjoy</h2>
<p>Il Mondiale è finito, ma l'estate a Port d'Alcúdia non si ferma. All'<a href="/outxide">Outxide Club</a> continuiamo con le nostre serate DJ, i set e le feste a tema; all'<a href="/enjoy">Enjoy Terrace</a> ti aspettano i migliori cocktail d'autore e la shisha di fronte al tramonto.</p>
<p>Consulta l'<a href="/outxide">agenda di Outxide</a> per non perderti nessun evento, e festeggia con noi il resto della stagione. Grazie per aver reso questo Mondiale una festa indimenticabile ad Alcúdia!</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-07-20",
    updated: "2026-08-29",
    image: "/images/outxide/PIC06234-6.jpg",
    tags: ["mundial 2026", "españa campeona", "outxide club", "ver futbol alcudia", "eventos alcudia mallorca"],
    venue: "outxide",
    readingTime: 5,
  },
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

<h2>Donde Comer Paella en Alcudia</h2>
<p>La paella es, sin duda, uno de los platos que todo visitante quiere probar en Mallorca. En Alcudia hay varias opciones para disfrutar de un buen arroz, pero no todos los restaurantes la preparan con el mismo cuidado. Aqui van nuestras recomendaciones para comer paella en Alcudia.</p>
<p>Un apunte honesto: durante años, la paella de marisco de <a href="/hiru">Hiru Food &amp; Drinks</a> encabezó esta lista, pero el restaurante cerró definitivamente en agosto de 2026. Hoy el mejor consejo es elegir un restaurante del puerto que prepare el arroz al momento, preguntar por el arroz del día y pedirlo al llegar: la espera es la mejor señal.</p>

<h3>1. Can Costa</h3>
<p>Un clasico de la zona con anos de trayectoria. Especializado en cocina mallorquina y arroces. Buen sitio para probar platos tipicos de la isla en un ambiente familiar. Se encuentra en el casco antiguo de Alcudia.</p>

<h3>2. Bistro Mar</h3>
<p>Restaurante frente al paseo maritimo de Port d'Alcudia con vistas al mar. Ofrece paellas y fideuaes con marisco ademas de pescado fresco. Terraza agradable para comidas con brisa marina. Cocina de perfil mediterraneo.</p>

<h2>Restaurantes con Terraza en Alcudia</h2>
<p>Comer en terraza es casi obligatorio cuando visitas Mallorca. El buen clima del norte de la isla permite disfrutar de comidas y cenas al aire libre desde abril hasta bien entrado octubre. Estos son los mejores restaurantes con terraza en Alcudia.</p>
<p>Y un plan que sigue funcionando: cena en cualquiera de las terrazas de esta lista y remata la velada con un cóctel al atardecer en <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1), la terraza de referencia de Port d'Alcúdia.</p>

<h3>3. Sa Plaça</h3>
<p>Situado en la plaza principal del casco antiguo de Alcudia, ofrece cocina mediterranea con toques mallorquines. La terraza con vistas a la muralla medieval es especialmente encantadora al atardecer. Tapas, ensaladas y platos de temporada.</p>

<h3>4. El Patio de Alcudia</h3>
<p>Restaurante con un bonito patio interior ajardinado en el centro historico. Cocina fusion con base mediterranea. Ambiente intimo y cuidado. Ideal para cenas especiales o citas romanticas.</p>

<h2>Cocina Internacional en Port d'Alcudia</h2>

<h3>5. Ristorante Da Vinci</h3>
<p>Un restaurante italiano con buena pasta fresca, pizzas en horno de lena y una carta de vinos italianos. Ubicado cerca del puerto, tiene terraza y un ambiente familiar. Buena opcion para quienes buscan algo distinto al mediterraneo.</p>

<h3>6. Sushi Alcudia</h3>
<p>Para los amantes de la cocina asiatica, esta opcion ofrece sushi, sashimi y platos wok en un local moderno del paseo maritimo. Calidad decente del pescado y buena relacion calidad-precio para la zona.</p>

<h2>Tapas y Raciones</h2>

<h3>7. Bar Ponent</h3>
<p>Bar de tapas con sabor local en el casco antiguo. Raciones generosas de jamon iberico, pulpo a la gallega, gambas al ajillo y quesos artesanos. Terraza pequena pero con mucho encanto en una callejuela tranquila.</p>

<h3>8. Bodega d'es Port</h3>
<p>Una bodega con caracter marinero junto al puerto deportivo. Especializada en tapas de marisco y vinos locales. Buena opcion para un aperitivo antes de una cena mas formal. Ambiente informal y animado.</p>

<h2>Marisquerias y Pescado Fresco</h2>

<h3>9. Ca'n Lliro</h3>
<p>Restaurante familiar con decadas de historia en Port d'Alcudia. Pescado fresco del dia cocinado de forma sencilla pero eficaz: a la plancha, al horno o frito. Los calderetas de langosta y las fritures de peix son sus platos estrella. Ambiente tradicional y precio medio-alto.</p>

<h2>Una despedida: Hiru Food &amp; Drinks (cerrado en 2026)</h2>
<p>Durante años, <a href="/hiru">Hiru Food &amp; Drinks</a> fue la referencia gastronómica de esta guía: brasa, carnes dry-aged, arroces y una terraza inolvidable en la Ctra. d'Artà 40. En agosto de 2026 sirvió su último servicio y cerró definitivamente sus puertas. Gracias por todo; el espacio queda reservado para futuros proyectos de <a href="/">Grupo Enjoy</a>, aún sin confirmar. Le hemos dedicado una <a href="/blog/hiru-food-drinks-restaurante-alcudia">carta de homenaje y despedida</a>.</p>
<p>El plan nocturno del grupo sigue muy vivo: cócteles al atardecer en <a href="/enjoy">Enjoy Terrace</a> y fiesta en <a href="/outxide">Outxide Club</a>, ambos en Av. Tucán 1 de Port d'Alcúdia.</p>

<h2>Lectura Recomendada</h2>
<p>Lee nuestra <a href="/blog/hiru-food-drinks-restaurante-alcudia">despedida y homenaje a Hiru Food &amp; Drinks</a>. Tambien te puede interesar nuestra guia de <a href="/blog/donde-cenar-tarde-port-alcudia">donde cenar tarde en Port d'Alcudia</a> y la seleccion de <a href="/blog/cocteles-shisha-terraza-alcudia">cocteles y shisha en Alcudia</a> para despues de cenar.</p>`,

      en: `<p>If you are wondering where to eat in Alcudia, you are in the right place. Northern Mallorca has established itself as one of the island's most exciting dining destinations, offering everything from seafood paella by the sea to creative cuisine with top-quality local produce. This guide covers the best restaurants in Alcudia and Port d'Alcudia so you can eat well on every meal of your holiday.</p>

<h2>Where to Eat Paella in Alcudia</h2>
<p>Paella is undoubtedly one of the dishes every visitor wants to try in Mallorca. Alcudia has several options, but not every restaurant prepares it with the same care. Here are our recommendations for paella in Alcudia.</p>
<p>An honest note: for years the seafood paella at <a href="/hiru">Hiru Food &amp; Drinks</a> topped this list, but the restaurant closed for good in August 2026. Today the best advice is to pick a restaurant by the port that cooks its rice to order, ask about the rice of the day and order it as soon as you sit down — the wait is the best sign.</p>

<h3>1. Can Costa</h3>
<p>A long-established classic in the area specialising in Mallorcan cuisine and rice dishes. Good spot for trying traditional island dishes in a family-friendly setting. Located in Alcudia's old town.</p>

<h3>2. Bistro Mar</h3>
<p>A seafront restaurant on Port d'Alcudia's promenade with sea views. Offers paellas and seafood fideuaes alongside fresh fish. Pleasant terrace for meals with a sea breeze. Mediterranean profile.</p>

<h2>Best Terrace Restaurants in Alcudia</h2>
<p>Dining al fresco is practically mandatory when visiting Mallorca. The northern coast's mild climate allows for outdoor meals from April well into October. These are the best terrace restaurants in Alcudia.</p>
<p>And a plan that still works: have dinner on any of the terraces on this list and round off the evening with a sunset cocktail at <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1), Port d'Alcúdia's go-to terrace.</p>

<h3>3. Sa Placa</h3>
<p>Set on Alcudia old town's main square, serving Mediterranean cuisine with Mallorcan touches. The terrace overlooking the medieval walls is especially charming at sunset. Tapas, salads and seasonal plates.</p>

<h3>4. El Patio de Alcudia</h3>
<p>A restaurant with a lovely garden courtyard in the historic centre. Fusion cuisine with a Mediterranean base. Intimate, carefully designed setting. Ideal for special dinners or romantic dates.</p>

<h2>International Cuisine in Port d'Alcudia</h2>

<h3>5. Ristorante Da Vinci</h3>
<p>An Italian restaurant with good fresh pasta, wood-fired pizzas and an Italian wine list. Located near the port, it has a terrace and a family-friendly feel. A solid choice for those seeking something beyond Mediterranean.</p>

<h3>6. Sushi Alcudia</h3>
<p>For Asian-food enthusiasts, this spot offers sushi, sashimi and wok dishes in a modern promenade venue. Decent fish quality and good value for the area.</p>

<h2>Tapas and Small Plates</h2>

<h3>7. Bar Ponent</h3>
<p>A local-flavoured tapas bar in the old town. Generous portions of Iberian ham, Galician-style octopus, garlic prawns and artisan cheeses. Small terrace with plenty of charm on a quiet lane.</p>

<h3>8. Bodega d'es Port</h3>
<p>A bodega with nautical character beside the marina. Specialising in seafood tapas and local wines. Great option for an aperitif before a more formal dinner. Casual, lively atmosphere.</p>

<h2>Seafood Restaurants</h2>

<h3>9. Ca'n Lliro</h3>
<p>A family-run restaurant with decades of history in Port d'Alcudia. Daily-fresh fish cooked simply but effectively: grilled, oven-baked or fried. The lobster stew and mixed fish fry are their signature dishes. Traditional setting, mid-to-high price range.</p>

<h2>A farewell: Hiru Food &amp; Drinks (closed in 2026)</h2>
<p>For years, <a href="/hiru">Hiru Food &amp; Drinks</a> was the gastronomic benchmark of this guide: charcoal grill, dry-aged meats, rice dishes and an unforgettable terrace at Ctra. d'Artà 40. In August 2026 it served its last service and closed its doors for good. Thank you for everything; the space is being kept for future <a href="/">Grupo Enjoy</a> projects, still unconfirmed. We've dedicated a <a href="/blog/hiru-food-drinks-restaurante-alcudia">farewell tribute</a> to it.</p>
<p>The group's night plan is still going strong: sunset cocktails at <a href="/enjoy">Enjoy Terrace</a> and partying at <a href="/outxide">Outxide Club</a>, both at Av. Tucán 1 in Port d'Alcúdia.</p>`,

      de: `<p>Sie fragen sich, wo man in Alcudia gut essen kann? Dann sind Sie hier genau richtig. Der Norden Mallorcas hat sich zu einem der spannendsten gastronomischen Ziele der Insel entwickelt. Das Angebot reicht von Paella mit Meeresfruechten direkt am Meer bis hin zu kreativer Kueche mit erstklassigen lokalen Produkten. In diesem Guide stellen wir Ihnen die besten Restaurants in Alcudia und Port d'Alcudia vor, damit Sie bei jedem Essen im Urlaub die richtige Wahl treffen.</p>

<h2>Wo kann man Paella in Alcudia essen?</h2>
<p>Paella ist zweifellos eines der Gerichte, das jeder Mallorca-Besucher probieren moechte. In Alcudia gibt es mehrere Moeglichkeiten, aber nicht jedes Restaurant bereitet sie mit der gleichen Sorgfalt zu. Hier sind unsere Empfehlungen fuer Paella in Alcudia.</p>
<p>Eine ehrliche Anmerkung: Jahrelang führte die Meeresfrüchte-Paella von <a href="/hiru">Hiru Food &amp; Drinks</a> diese Liste an, doch das Restaurant hat im August 2026 endgültig geschlossen. Heute lautet der beste Rat: Wähle ein Restaurant am Hafen, das seinen Reis frisch zubereitet, frage nach dem Reis des Tages und bestelle ihn gleich bei der Ankunft — die Wartezeit ist das beste Zeichen.</p>

<h3>1. Can Costa</h3>
<p>Ein etablierter Klassiker in der Gegend, spezialisiert auf mallorquinische Kueche und Reisgerichte. Guter Ort, um traditionelle Inselgerichte in familiaerer Atmosphaere zu probieren. Im Altstadtkern von Alcudia gelegen.</p>

<h3>2. Bistro Mar</h3>
<p>Restaurant an der Strandpromenade von Port d'Alcudia mit Meerblick. Bietet Paellas und Meeresfruechte-Fideuas neben frischem Fisch. Angenehme Terrasse fuer Mahlzeiten mit Meeresbrise. Mediterranes Profil.</p>

<h2>Beste Terrassen-Restaurants in Alcudia</h2>
<p>Draussen essen gehoert auf Mallorca praktisch zum Pflichtprogramm. Das milde Klima an der Nordkueste ermoeglicht Mahlzeiten im Freien von April bis weit in den Oktober hinein. Das sind die besten Terrassen-Restaurants in Alcudia.</p>
<p>Und ein Plan, der weiterhin funktioniert: Abendessen auf einer der Terrassen dieser Liste und danach ein Sonnenuntergangs-Cocktail im <a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1), der Terrasse der Referenz in Port d'Alcúdia.</p>

<h3>3. Sa Placa</h3>
<p>Am Hauptplatz der Altstadt von Alcudia gelegen, mit mediterraner Kueche und mallorquinischen Akzenten. Die Terrasse mit Blick auf die mittelalterliche Stadtmauer ist besonders bei Sonnenuntergang bezaubernd. Tapas, Salate und saisonale Gerichte.</p>

<h3>4. El Patio de Alcudia</h3>
<p>Restaurant mit einem huebschen Garteninnenhof im historischen Zentrum. Fusionskueche auf mediterraner Basis. Intimes, sorgfaeltig gestaltetes Ambiente. Ideal fuer besondere Abendessen oder romantische Dates.</p>

<h2>Internationale Kueche in Port d'Alcudia</h2>

<h3>5. Ristorante Da Vinci</h3>
<p>Italienisches Restaurant mit guter frischer Pasta, Holzofenpizzen und italienischer Weinkarte. In Hafennaehe gelegen, mit Terrasse und familienfreundlichem Flair. Eine solide Wahl fuer alle, die ueber die mediterrane Kueche hinausschauen moechten.</p>

<h3>6. Sushi Alcudia</h3>
<p>Fuer Liebhaber der asiatischen Kueche bietet dieses Lokal Sushi, Sashimi und Wok-Gerichte in einem modernen Ambiente an der Promenade. Ordentliche Fischqualitaet und gutes Preis-Leistungs-Verhaeltnis fuer die Gegend.</p>

<h2>Tapas und kleine Gerichte</h2>

<h3>7. Bar Ponent</h3>
<p>Tapas-Bar mit lokalem Flair in der Altstadt. Grosszuegige Portionen Iberico-Schinken, Pulpo a la Gallega, Knoblauchgarnelen und handwerklich hergestellter Kaese. Kleine Terrasse mit viel Charme in einer ruhigen Gasse.</p>

<h3>8. Bodega d'es Port</h3>
<p>Bodega mit maritimem Charakter am Yachthafen. Spezialisiert auf Meeresfruechte-Tapas und lokale Weine. Tolle Option fuer einen Aperitif vor einem gehobeneren Abendessen. Ungezwungene, lebhafte Atmosphaere.</p>

<h2>Fischrestaurants und Meeresfruechte</h2>

<h3>9. Ca'n Lliro</h3>
<p>Familienrestaurant mit jahrzehntelanger Geschichte in Port d'Alcudia. Tagesfrischer Fisch, schlicht aber wirkungsvoll zubereitet: gegrillt, aus dem Ofen oder frittiert. Der Hummereintopf und die gemischte Fischplatte sind die Spezialitaeten des Hauses. Traditionelles Ambiente, mittlere bis gehobene Preisklasse.</p>

<h2>Ein Abschied: Hiru Food &amp; Drinks (2026 geschlossen)</h2>
<p>Jahrelang war <a href="/hiru">Hiru Food &amp; Drinks</a> die gastronomische Referenz dieses Guides: Glut, Dry-Aged-Fleisch, Reisgerichte und eine unvergessliche Terrasse in der Ctra. d'Artà 40. Im August 2026 servierte es seinen letzten Service und schloss endgültig. Danke für alles; der Raum bleibt künftigen Projekten von <a href="/">Grupo Enjoy</a> vorbehalten, noch unbestätigt. Wir haben ihm eine <a href="/blog/hiru-food-drinks-restaurante-alcudia">Abschieds-Hommage</a> gewidmet.</p>
<p>Der Abendplan der Gruppe lebt weiter: Cocktails zum Sonnenuntergang im <a href="/enjoy">Enjoy Terrace</a> und Party im <a href="/outxide">Outxide Club</a>, beide in der Av. Tucán 1 in Port d'Alcúdia.</p>`,

      fr: `<p>Vous vous demandez ou manger a Alcudia ? Vous etes au bon endroit. Le nord de Majorque s'est impose comme l'une des destinations gastronomiques les plus interessantes de l'ile, avec une offre allant de la paella aux fruits de mer face a la mer jusqu'a la cuisine creative a base de produits locaux de premier choix. Ce guide passe en revue les meilleurs restaurants d'Alcudia et de Port d'Alcudia pour que chaque repas de vos vacances soit une reussite.</p>

<h2>Ou manger une paella a Alcudia</h2>
<p>La paella est sans doute le plat que tout visiteur souhaite gouter a Majorque. Alcudia offre plusieurs possibilites, mais tous les restaurants ne la preparent pas avec le meme soin. Voici nos recommandations pour la paella a Alcudia.</p>
<p>Une note honnête : pendant des années, la paella de fruits de mer de <a href="/hiru">Hiru Food &amp; Drinks</a> a été en tête de cette liste, mais le restaurant a définitivement fermé en août 2026. Aujourd'hui, le meilleur conseil est de choisir un restaurant du port qui prépare son riz à la minute, de demander le riz du jour et de le commander dès votre arrivée — l'attente est le meilleur signe.</p>

<h3>1. Can Costa</h3>
<p>Un classique bien etabli dans la zone, specialise dans la cuisine majorquine et les plats de riz. Bon endroit pour gouter les plats traditionnels de l'ile dans un cadre familial. Situe dans la vieille ville d'Alcudia.</p>

<h3>2. Bistro Mar</h3>
<p>Restaurant en front de mer sur la promenade de Port d'Alcudia avec vue sur la mer. Propose des paellas et des fideuaes aux fruits de mer ainsi que du poisson frais. Terrasse agreable pour des repas avec la brise marine. Profil mediterraneen.</p>

<h2>Meilleurs restaurants avec terrasse a Alcudia</h2>
<p>Manger en terrasse est quasiment obligatoire a Majorque. Le climat doux de la cote nord permet de profiter de repas en plein air d'avril a octobre. Voici les meilleurs restaurants avec terrasse a Alcudia.</p>
<p>Et un plan qui fonctionne toujours : dînez sur l'une des terrasses de cette liste et terminez la soirée par un cocktail au coucher du soleil à l'<a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1), la terrasse de référence de Port d'Alcúdia.</p>

<h3>3. Sa Placa</h3>
<p>Sur la place principale de la vieille ville d'Alcudia, cuisine mediterraneenne avec des touches majorquines. La terrasse face aux remparts medievaux est particulierement charmante au coucher du soleil. Tapas, salades et plats de saison.</p>

<h3>4. El Patio de Alcudia</h3>
<p>Restaurant avec un joli patio-jardin dans le centre historique. Cuisine fusion a base mediterraneenne. Ambiance intime et soignee. Ideal pour un diner special ou une soiree romantique.</p>

<h2>Cuisine internationale a Port d'Alcudia</h2>

<h3>5. Ristorante Da Vinci</h3>
<p>Restaurant italien avec de bonnes pates fraiches, des pizzas au feu de bois et une carte de vins italiens. Situe pres du port, avec terrasse et ambiance familiale. Bonne option pour ceux qui cherchent autre chose que le mediterraneen.</p>

<h3>6. Sushi Alcudia</h3>
<p>Pour les amateurs de cuisine asiatique, cette adresse propose sushis, sashimis et plats au wok dans un local moderne sur la promenade. Qualite correcte du poisson et bon rapport qualite-prix pour la zone.</p>

<h2>Tapas et portions a partager</h2>

<h3>7. Bar Ponent</h3>
<p>Bar a tapas au caractere local dans la vieille ville. Portions genereuses de jambon iberique, poulpe a la galicienne, crevettes a l'ail et fromages artisanaux. Petite terrasse pleine de charme dans une ruelle tranquille.</p>

<h3>8. Bodega d'es Port</h3>
<p>Bodega au caractere marin pres du port de plaisance. Specialisee dans les tapas de fruits de mer et les vins locaux. Bonne option pour un aperitif avant un diner plus formel. Ambiance decontractee et animee.</p>

<h2>Poissons et fruits de mer</h2>

<h3>9. Ca'n Lliro</h3>
<p>Restaurant familial avec des decennies d'histoire a Port d'Alcudia. Poisson frais du jour cuisine simplement mais efficacement : grille, au four ou frit. Le ragoet de homard et la friture de poissons sont les specialites. Cadre traditionnel, gamme de prix moyenne a elevee.</p>

<h2>Un adieu : Hiru Food &amp; Drinks (fermé en 2026)</h2>
<p>Pendant des années, <a href="/hiru">Hiru Food &amp; Drinks</a> a été la référence gastronomique de ce guide : braise, viandes dry-aged, riz et une terrasse inoubliable au Ctra. d'Artà 40. En août 2026, il a assuré son dernier service et fermé définitivement ses portes. Merci pour tout ; l'espace est réservé aux futurs projets de <a href="/">Grupo Enjoy</a>, encore non confirmés. Nous lui avons dédié un <a href="/blog/hiru-food-drinks-restaurante-alcudia">hommage d'adieu</a>.</p>
<p>Le plan nocturne du groupe reste bien vivant : cocktails au coucher du soleil à l'<a href="/enjoy">Enjoy Terrace</a> et fête à l'<a href="/outxide">Outxide Club</a>, tous deux Av. Tucán 1 à Port d'Alcúdia.</p>`,

      it: `<p>Vi state chiedendo dove mangiare ad Alcudia? Siete nel posto giusto. Il nord di Maiorca si e' affermato come una delle destinazioni gastronomiche piu' interessanti dell'isola, con un'offerta che spazia dalla paella di pesce in riva al mare alla cucina creativa con prodotti locali di prima qualita'. Questa guida passa in rassegna i migliori ristoranti di Alcudia e Port d'Alcudia perche' ogni pasto delle vostre vacanze sia azzeccato.</p>

<h2>Dove mangiare la paella ad Alcudia</h2>
<p>La paella e' senza dubbio uno dei piatti che ogni visitatore vuole assaggiare a Maiorca. Ad Alcudia ci sono diverse opzioni, ma non tutti i ristoranti la preparano con la stessa cura. Ecco le nostre raccomandazioni per la paella ad Alcudia.</p>
<p>Una nota onesta: per anni la paella di frutti di mare di <a href="/hiru">Hiru Food &amp; Drinks</a> ha guidato questa lista, ma il ristorante ha chiuso definitivamente nell'agosto 2026. Oggi il consiglio migliore è scegliere un ristorante del porto che prepari il riso al momento, chiedere del riso del giorno e ordinarlo appena arrivati: l'attesa è il segnale migliore.</p>

<h3>1. Can Costa</h3>
<p>Un classico consolidato nella zona, specializzato in cucina maiorchina e piatti di riso. Buon posto per provare i piatti tradizionali dell'isola in un ambiente familiare. Situato nel centro storico di Alcudia.</p>

<h3>2. Bistro Mar</h3>
<p>Ristorante sul lungomare di Port d'Alcudia con vista sul mare. Offre paellas e fideuaes di frutti di mare oltre a pesce fresco. Terrazza piacevole per pasti con brezza marina. Profilo mediterraneo.</p>

<h2>Migliori ristoranti con terrazza ad Alcudia</h2>
<p>Mangiare all'aperto e' praticamente obbligatorio quando si visita Maiorca. Il clima mite della costa nord consente pasti en plein air da aprile fino a ottobre inoltrato. Questi sono i migliori ristoranti con terrazza ad Alcudia.</p>
<p>E un piano che funziona ancora: cena su una delle terrazze di questa lista e concludi la serata con un cocktail al tramonto all'<a href="/enjoy">Enjoy Terrace</a> (Av. Tucán 1), la terrazza di riferimento di Port d'Alcúdia.</p>

<h3>3. Sa Placa</h3>
<p>Nella piazza principale del centro storico di Alcudia, con cucina mediterranea e tocchi maiorchini. La terrazza affacciata sulle mura medievali e' particolarmente affascinante al tramonto. Tapas, insalate e piatti stagionali.</p>

<h3>4. El Patio de Alcudia</h3>
<p>Ristorante con un grazioso cortile-giardino nel centro storico. Cucina fusion su base mediterranea. Ambiente intimo e curato. Ideale per cene speciali o appuntamenti romantici.</p>

<h2>Cucina internazionale a Port d'Alcudia</h2>

<h3>5. Ristorante Da Vinci</h3>
<p>Ristorante italiano con buona pasta fresca, pizze cotte nel forno a legna e carta dei vini italiani. Situato vicino al porto, con terrazza e atmosfera familiare. Buona scelta per chi cerca qualcosa oltre il mediterraneo.</p>

<h3>6. Sushi Alcudia</h3>
<p>Per gli amanti della cucina asiatica, questo locale offre sushi, sashimi e piatti al wok in un ambiente moderno sul lungomare. Qualita' discreta del pesce e buon rapporto qualita'-prezzo per la zona.</p>

<h2>Tapas e piatti da condividere</h2>

<h3>7. Bar Ponent</h3>
<p>Tapas bar dal sapore locale nel centro storico. Porzioni generose di prosciutto iberico, polpo alla galiziana, gamberi all'aglio e formaggi artigianali. Piccola terrazza ricca di fascino in una viuzza tranquilla.</p>

<h3>8. Bodega d'es Port</h3>
<p>Bodega dal carattere marinaro accanto al porto turistico. Specializzata in tapas di pesce e vini locali. Ottima opzione per un aperitivo prima di una cena piu' formale. Atmosfera informale e vivace.</p>

<h2>Pesce e frutti di mare</h2>

<h3>9. Ca'n Lliro</h3>
<p>Ristorante familiare con decenni di storia a Port d'Alcudia. Pesce fresco del giorno cucinato in modo semplice ma efficace: alla griglia, al forno o fritto. Lo stufato di aragosta e il fritto misto di pesce sono i piatti simbolo. Ambiente tradizionale, fascia di prezzo media-alta.</p>

<h2>Un addio: Hiru Food &amp; Drinks (chiuso nel 2026)</h2>
<p>Per anni <a href="/hiru">Hiru Food &amp; Drinks</a> è stato il riferimento gastronomico di questa guida: brace, carni dry-aged, risi e una terrazza indimenticabile in Ctra. d'Artà 40. Nell'agosto 2026 ha servito il suo ultimo servizio e ha chiuso definitivamente. Grazie di tutto; lo spazio resta riservato ai futuri progetti di <a href="/">Grupo Enjoy</a>, ancora da confermare. Gli abbiamo dedicato un <a href="/blog/hiru-food-drinks-restaurante-alcudia">omaggio d'addio</a>.</p>
<p>Il piano serale del gruppo è più vivo che mai: cocktail al tramonto all'<a href="/enjoy">Enjoy Terrace</a> e festa all'<a href="/outxide">Outxide Club</a>, entrambi in Av. Tucán 1 a Port d'Alcúdia.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-27",
    updated: "2026-08-29",
    image: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
    tags: ["alcudia", "restaurants", "mallorca", "paella", "hiru", "gastronomy"],
    venue: "hiru",
    faq: [
      {
        question: {
          es: "¿Dónde se come buena paella en Alcúdia?",
          en: "Where can you eat good paella in Alcúdia?",
          de: "Wo isst man in Alcúdia gute Paella?",
          fr: "Où manger une bonne paella à Alcúdia ?",
          it: "Dove si mangia una buona paella ad Alcúdia?",
        },
        answer: {
          es: "Varios restaurantes del Port d'Alcúdia preparan buenos arroces al momento. La histórica paella de marisco de Hiru ya no está disponible: el restaurante cerró definitivamente en agosto de 2026.",
          en: "Several restaurants in Port d'Alcúdia cook good rice dishes to order. Hiru's famous seafood paella is no longer available: the restaurant closed for good in August 2026.",
          de: "Mehrere Restaurants in Port d'Alcúdia bereiten gute Reisgerichte frisch zu. Die berühmte Meeresfrüchte-Paella von Hiru gibt es nicht mehr: Das Restaurant hat im August 2026 endgültig geschlossen.",
          fr: "Plusieurs restaurants de Port d'Alcúdia préparent de bons riz à la minute. La célèbre paella de fruits de mer de Hiru n'est plus disponible : le restaurant a définitivement fermé en août 2026.",
          it: "Diversi ristoranti di Port d'Alcúdia preparano buoni risi al momento. La famosa paella di frutti di mare di Hiru non è più disponibile: il ristorante ha chiuso definitivamente nell'agosto 2026.",
        },
      },
      {
        question: {
          es: "¿Dónde cenar carne a la brasa en Alcúdia?",
          en: "Where can you have grilled meat for dinner in Alcúdia?",
          de: "Wo kann man in Alcúdia Fleisch vom Grill zu Abend essen?",
          fr: "Où dîner d'une viande à la braise à Alcúdia ?",
          it: "Dove cenare con carne alla brace ad Alcúdia?",
        },
        answer: {
          es: "Hiru, el asador de referencia del puerto, cerró definitivamente en agosto de 2026. Hoy lo mejor es elegir entre los restaurantes de esta guía y preguntar por las carnes a la brasa del día.",
          en: "Hiru, the port's benchmark grill house, closed for good in August 2026. Today your best bet is to pick from the restaurants in this guide and ask about the day's grilled meats.",
          de: "Hiru, das Grillrestaurant der Referenz am Hafen, hat im August 2026 endgültig geschlossen. Am besten wählst du heute eines der Restaurants aus diesem Guide und fragst nach dem Grillfleisch des Tages.",
          fr: "Hiru, le grill de référence du port, a définitivement fermé en août 2026. Le mieux aujourd'hui est de choisir parmi les restaurants de ce guide et de demander les viandes à la braise du jour.",
          it: "Hiru, la griglia di riferimento del porto, ha chiuso definitivamente nell'agosto 2026. Oggi conviene scegliere tra i ristoranti di questa guida e chiedere delle carni alla brace del giorno.",
        },
      },
      {
        question: {
          es: "¿Hace falta reservar para cenar en Alcúdia?",
          en: "Do you need to book to have dinner in Alcúdia?",
          de: "Muss man in Alcúdia zum Abendessen reservieren?",
          fr: "Faut-il réserver pour dîner à Alcúdia ?",
          it: "È necessario prenotare per cenare ad Alcúdia?",
        },
        answer: {
          es: "En temporada alta es muy recomendable reservar, sobre todo los fines de semana. La mayoría de restaurantes del puerto aceptan reservas por teléfono o desde su web.",
          en: "In high season booking is strongly recommended, especially at weekends. Most restaurants by the port take reservations by phone or through their websites.",
          de: "In der Hochsaison ist eine Reservierung sehr zu empfehlen, besonders am Wochenende. Die meisten Restaurants am Hafen nehmen Reservierungen telefonisch oder über ihre Website an.",
          fr: "En haute saison, la réservation est vivement conseillée, surtout le week-end. La plupart des restaurants du port prennent les réservations par téléphone ou via leur site web.",
          it: "In alta stagione è caldamente consigliato prenotare, soprattutto nei fine settimana. La maggior parte dei ristoranti del porto accetta prenotazioni per telefono o dal proprio sito.",
        },
      },
      {
        question: {
          es: "¿Dónde tomar algo en una terraza en Port d'Alcúdia?",
          en: "Where can you have a drink on a terrace in Port d'Alcúdia?",
          de: "Wo kann man in Port d'Alcúdia auf einer Terrasse etwas trinken?",
          fr: "Où prendre un verre en terrasse à Port d'Alcúdia ?",
          it: "Dove bere qualcosa in terrazza a Port d'Alcúdia?",
        },
        answer: {
          es: "Enjoy Terrace (Av. Tucán 1) ofrece cócteles de autor y shisha premium en terraza, abierto a diario desde las 17:00 y perfecto para el atardecer.",
          en: "Enjoy Terrace (Av. Tucán 1) offers signature cocktails and premium shisha on the terrace, open daily from 5 pm and perfect for sunset.",
          de: "Enjoy Terrace (Av. Tucán 1) bietet Signature-Cocktails und Premium-Shisha auf der Terrasse, täglich ab 17:00 Uhr geöffnet und ideal für den Sonnenuntergang.",
          fr: "Enjoy Terrace (Av. Tucán 1) propose des cocktails signature et une chicha premium en terrasse, ouvert tous les jours dès 17h00 et parfait pour le coucher du soleil.",
          it: "Enjoy Terrace (Av. Tucán 1) offre cocktail d'autore e shisha premium in terrazza, aperto tutti i giorni dalle 17:00 e perfetto per il tramonto.",
        },
      },
    ],
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

<h3>Paso 1: Cena en el puerto (20:00 - 22:00)</h3>
<p>Empieza la noche con una cena memorable. En Port d'Alcudia tienes arroces, carnes a la brasa y pescado fresco en varios restaurantes con terraza, ideales para cenar al aire libre en las noches de verano: nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guia de restaurantes de Alcudia</a> te ayuda a elegir. Reserva mesa con antelacion, especialmente viernes y sabado.</p>

<h3>Paso 2: Cocteles en Enjoy Terrace (22:00 - 00:00)</h3>
<p>Tras la cena, un paseo corto te lleva a <a href="/enjoy">Enjoy Terrace</a>. Aqui es donde la noche empieza a tomar forma: cocteles de autor, shisha, buena musica y un ambiente que sube progresivamente. Es el pre-party perfecto y el lugar donde los grupos se reencuentran antes de ir al club.</p>

<h3>Paso 3: Fiesta en Outxide Club (00:00 - 05:00)</h3>
<p>Cuando la energia esta al maximo, <a href="/outxide">Outxide Club</a> abre sus puertas. Sonido de primer nivel, produccion visual espectacular y sesiones que se alargan hasta las 5:00 o mas. Es el broche perfecto para una noche completa en el norte de Mallorca.</p>

<h2>Consejos Practicos para la Vida Nocturna en Mallorca</h2>

<h3>Dress code</h3>
<p>En la mayoria de clubs de calidad en Mallorca, el dress code es smart casual. Evita chanclas, camisetas de tirantes y ropa de playa. En Outxide Club, se espera un look cuidado pero sin excesiva formalidad. Zapatillas limpias, pantalon largo o corto elegante y camisa o camiseta de calidad funcionan bien.</p>

<h3>Transporte</h3>
<p>En Port d'Alcudia todo esta cerca y se puede ir andando entre los restaurantes del puerto, Enjoy Terrace y Outxide Club. Para volver al hotel, taxis y VTCs estan disponibles toda la noche. Si vienes desde Palma o Magaluf, el coche es la opcion mas practica (designa un conductor o usa un servicio de conductor privado). En verano hay servicios de bus nocturno en algunas rutas.</p>

<h3>Mejores noches</h3>
<p>En el norte de Mallorca, los sabados son la noche grande. Los jueves y viernes en verano tambien tienen muy buen ambiente, especialmente en julio y agosto. En Palma, hay opciones cada noche de la semana en temporada alta.</p>

<h3>Presupuesto orientativo</h3>
<p>Cena completa con bebida en un buen restaurante: 30-60 EUR por persona. Cocteles: 10-15 EUR cada uno. Entrada a club: 15-30 EUR dependiendo de la noche y si compras online o en puerta. Una noche completa de cena, cocteles y club puede rondar los 80-120 EUR por persona, una inversion razonable para una experiencia de primer nivel.</p>

<h2>Por que el norte de Mallorca es la mejor opcion para salir de fiesta</h2>
<p>Mientras que Magaluf y Palma tienen su publico, cada vez mas personas descubren que el norte de Mallorca ofrece una experiencia nocturna superior. Menos aglomeraciones, mejor calidad en todos los aspectos, un ambiente mas autentico y maduro, y la posibilidad de combinar gastronomia de alto nivel con fiesta de calidad en un radio de pocos minutos a pie. La combinacion de una buena cena en el puerto, <a href="/enjoy">Enjoy Terrace</a> y <a href="/outxide">Outxide Club</a> ofrece todo lo que necesitas para una noche perfecta en Mallorca, sin masificaciones y con mucho estilo.</p>`,

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

<h3>Step 1: Dinner by the port (20:00 - 22:00)</h3>
<p>Start the night with a memorable dinner. Port d'Alcudia offers rice dishes, charcoal-grilled meats and fresh fish at several restaurants with terraces, perfect for open-air summer dinners: our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to restaurants in Alcudia</a> will help you choose. Book a table in advance, especially on Fridays and Saturdays.</p>

<h3>Step 2: Cocktails at Enjoy Terrace (22:00 - 00:00)</h3>
<p>After dinner, a short walk brings you to <a href="/enjoy">Enjoy Terrace</a>. This is where the night starts to take shape: signature cocktails, shisha, great music and an atmosphere that builds steadily. It is the perfect pre-party and the spot where groups reunite before heading to the club.</p>

<h3>Step 3: Party at Outxide Club (00:00 - 05:00)</h3>
<p>When the energy peaks, <a href="/outxide">Outxide Club</a> opens its doors. Top-level sound, spectacular visual production and sets that run until 05:00 or beyond. It is the perfect finale to a complete night out in northern Mallorca.</p>

<h2>Practical Tips for Mallorca Nightlife</h2>

<h3>Dress Code</h3>
<p>At most quality clubs in Mallorca, the dress code is smart casual. Skip flip-flops, vest tops and beachwear. At Outxide Club, a polished look is expected but without excessive formality. Clean trainers, smart shorts or trousers and a quality shirt or tee work well.</p>

<h3>Getting Around</h3>
<p>In Port d'Alcudia everything is within walking distance between the port's restaurants, Enjoy Terrace and Outxide Club. Taxis and ride-hailing services are available all night for the journey back to your hotel. If coming from Palma or Magaluf, driving is the most practical option (designate a driver or use a private driver service). Some night bus services run on certain routes during summer.</p>

<h3>Best Nights</h3>
<p>In northern Mallorca, Saturday is the big night. Thursdays and Fridays during summer also have a strong atmosphere, especially in July and August. In Palma, there are options every night of the week in high season.</p>

<h3>Budget Guide</h3>
<p>A full dinner with drinks at a good restaurant: 30-60 EUR per person. Cocktails: 10-15 EUR each. Club entry: 15-30 EUR depending on the night and whether you buy online or at the door. A complete night of dinner, cocktails and clubbing can come to around 80-120 EUR per person, a reasonable investment for a top-level experience.</p>

<h2>Why Northern Mallorca Is the Best Place to Party</h2>
<p>While Magaluf and Palma have their audience, more and more people are discovering that northern Mallorca offers a superior night out. Fewer crowds, better quality across the board, a more authentic and mature atmosphere, and the ability to combine high-level dining with quality clubbing within a few minutes' walk. The combination of a good dinner by the port, <a href="/enjoy">Enjoy Terrace</a> and <a href="/outxide">Outxide Club</a> delivers everything you need for a perfect night in Mallorca, without the masses and with plenty of style.</p>`,

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

<h3>Schritt 1: Abendessen am Hafen (20:00 - 22:00)</h3>
<p>Beginne die Nacht mit einem denkwürdigen Abendessen. Port d'Alcudia bietet Reisgerichte, Fleisch vom Grill und frischen Fisch in mehreren Restaurants mit Terrasse, ideal für Sommerabende im Freien: Unser <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide für Alcudia</a> hilft bei der Wahl. Reserviere im Voraus, besonders freitags und samstags.</p>

<h3>Schritt 2: Cocktails in der Enjoy Terrace (22:00 - 00:00)</h3>
<p>Nach dem Essen fuehrt ein kurzer Spaziergang zur <a href="/enjoy">Enjoy Terrace</a>. Hier nimmt die Nacht Gestalt an: Signature-Cocktails, Shisha, gute Musik und eine Atmosphaere, die stetig aufbaut. Es ist das perfekte Pre-Party und der Ort, an dem sich Gruppen treffen, bevor es in den Club geht.</p>

<h3>Schritt 3: Party im Outxide Club (00:00 - 05:00)</h3>
<p>Wenn die Energie ihren Hoehepunkt erreicht, oeffnet <a href="/outxide">Outxide Club</a> seine Tueren. Erstklassiger Sound, spektakulaere visuelle Produktion und Sets, die bis 05:00 Uhr oder laenger laufen. Der perfekte Abschluss einer kompletten Nacht im Norden Mallorcas. Wer das beste Nachtleben auf Mallorca abseits der Massen sucht, findet hier genau das Richtige.</p>

<h2>Praktische Tipps fuer das Nachtleben auf Mallorca</h2>

<h3>Dresscode</h3>
<p>In den meisten Qualitaets-Clubs auf Mallorca gilt Smart Casual als Dresscode. Vermeiden Sie Flipflops, Traegershirts und Strandkleidung. Im Outxide Club wird ein gepflegter Look erwartet, aber ohne uebertriebene Formalitaet. Saubere Sneaker, eine elegante Hose oder Shorts und ein hochwertiges Hemd oder T-Shirt passen bestens.</p>

<h3>Anreise und Transport</h3>
<p>In Port d'Alcudia liegt alles in Gehdistanz: die Restaurants am Hafen, Enjoy Terrace und Outxide Club. Fuer die Rueckfahrt zum Hotel stehen die ganze Nacht Taxis und Fahrdienstleister zur Verfuegung. Wenn Sie aus Palma oder Magaluf kommen, ist das Auto die praktischste Option (bestimmen Sie einen Fahrer oder nutzen Sie einen privaten Fahrservice). Im Sommer verkehren auf einigen Strecken Nachtbusse.</p>

<h3>Beste Naechte</h3>
<p>Im Norden Mallorcas ist der Samstag die grosse Nacht. Donnerstage und Freitage im Sommer haben ebenfalls eine starke Atmosphaere, besonders im Juli und August. In Palma gibt es in der Hochsaison jeden Abend der Woche Angebote.</p>

<h3>Orientierungsbudget</h3>
<p>Komplettes Abendessen mit Getraenk in einem guten Restaurant: 30-60 EUR pro Person. Cocktails: 10-15 EUR pro Stueck. Clubeintritt: 15-30 EUR je nach Abend und ob online oder an der Abendkasse gekauft. Eine komplette Nacht mit Abendessen, Cocktails und Club liegt bei etwa 80-120 EUR pro Person, eine vernuenftige Investition fuer ein erstklassiges Erlebnis.</p>

<h2>Warum der Norden Mallorcas der beste Ort zum Feiern ist</h2>
<p>Waehrend Magaluf und Palma ihr Publikum haben, entdecken immer mehr Menschen, dass der Norden Mallorcas ein ueberlegenes Nachtleben bietet. Weniger Gedraenge, bessere Qualitaet in allen Bereichen, eine authentischere und reifere Atmosphaere und die Moeglichkeit, gehobene Gastronomie mit erstklassigem Clubbing innerhalb weniger Gehminuten zu verbinden. Die Kombination aus einem guten Abendessen am Hafen, <a href="/enjoy">Enjoy Terrace</a> und <a href="/outxide">Outxide Club</a> bietet alles, was Sie fuer eine perfekte Nacht auf Mallorca brauchen, ohne Massentourismus und mit viel Stil. Fuer deutsche Urlauber, die Mallorca abseits der Ballermann-Klischees erleben wollen, ist der Norden die klare Nummer eins.</p>`,

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

<h3>Etape 1 : Diner au port (20h00 - 22h00)</h3>
<p>Commencez la nuit par un diner memorable. Port d'Alcudia offre riz, viandes a la braise et poisson frais dans plusieurs restaurants avec terrasse, parfaits pour diner en plein air les soirs d'ete : notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants d'Alcudia</a> vous aidera a choisir. Reservez a l'avance, surtout le vendredi et le samedi.</p>

<h3>Etape 2 : Cocktails a l'Enjoy Terrace (22h00 - 00h00)</h3>
<p>Apres le diner, une courte promenade vous mene a l'<a href="/enjoy">Enjoy Terrace</a>. C'est la que la nuit prend forme : cocktails signatures, chicha, bonne musique et une ambiance qui monte progressivement. C'est le pre-party parfait et le lieu ou les groupes se retrouvent avant d'aller au club.</p>

<h3>Etape 3 : Fete a l'Outxide Club (00h00 - 05h00)</h3>
<p>Quand l'energie est a son comble, l'<a href="/outxide">Outxide Club</a> ouvre ses portes. Son de premier plan, production visuelle spectaculaire et sets qui s'etirent jusqu'a 05h00 ou plus. La fin parfaite d'une nuit complete dans le nord de Majorque.</p>

<h2>Conseils Pratiques pour la Vie Nocturne a Majorque</h2>

<h3>Dress code</h3>
<p>Dans la plupart des clubs de qualite a Majorque, le dress code est smart casual. Evitez les tongs, les debardeurs et les vetements de plage. A l'Outxide Club, un look soigne est attendu mais sans formalite excessive. Des baskets propres, un pantalon ou bermuda elegant et une chemise ou un t-shirt de qualite conviennent parfaitement.</p>

<h3>Se deplacer</h3>
<p>A Port d'Alcudia, tout est a distance de marche entre les restaurants du port, Enjoy Terrace et Outxide Club. Taxis et VTC sont disponibles toute la nuit pour le retour a l'hotel. Si vous venez de Palma ou Magaluf, la voiture est l'option la plus pratique (designez un conducteur ou utilisez un service de chauffeur prive). En ete, des services de bus de nuit fonctionnent sur certains itineraires.</p>

<h3>Meilleures nuits</h3>
<p>Dans le nord de Majorque, le samedi est la grande nuit. Les jeudis et vendredis en ete ont egalement une tres bonne ambiance, surtout en juillet et aout. A Palma, des options existent tous les soirs de la semaine en haute saison.</p>

<h3>Budget indicatif</h3>
<p>Diner complet avec boisson dans un bon restaurant : 30-60 EUR par personne. Cocktails : 10-15 EUR piece. Entree en club : 15-30 EUR selon la nuit et l'achat en ligne ou sur place. Une nuit complete diner, cocktails et club revient a environ 80-120 EUR par personne, un investissement raisonnable pour une experience haut de gamme.</p>

<h2>Pourquoi le nord de Majorque est le meilleur endroit pour sortir</h2>
<p>Alors que Magaluf et Palma ont leur public, de plus en plus de personnes decouvrent que le nord de Majorque offre une experience nocturne superieure. Moins de foule, meilleure qualite a tous les niveaux, une ambiance plus authentique et mature, et la possibilite de combiner gastronomie de haut niveau et clubbing de qualite en quelques minutes a pied. La combinaison d'une bonne table au port, de l'<a href="/enjoy">Enjoy Terrace</a> et de l'<a href="/outxide">Outxide Club</a> offre tout ce qu'il faut pour une nuit parfaite a Majorque, sans les masses et avec beaucoup de style.</p>`,

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

<h3>Passo 1: Cena al porto (20:00 - 22:00)</h3>
<p>Inizia la notte con una cena memorabile. Port d'Alcudia offre risi, carni alla brace e pesce fresco in diversi ristoranti con terrazza, ideali per cenare all'aperto nelle sere d'estate: la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti di Alcudia</a> ti aiuta a scegliere. Prenota in anticipo, soprattutto venerdi e sabato.</p>

<h3>Passo 2: Cocktail all'Enjoy Terrace (22:00 - 00:00)</h3>
<p>Dopo cena, una breve passeggiata vi porta all'<a href="/enjoy">Enjoy Terrace</a>. E' qui che la serata inizia a prendere forma: cocktail d'autore, shisha, buona musica e un'atmosfera che sale progressivamente. E' il pre-party perfetto e il luogo dove i gruppi si ritrovano prima di andare in discoteca.</p>

<h3>Passo 3: Festa all'Outxide Club (00:00 - 05:00)</h3>
<p>Quando l'energia e' al massimo, l'<a href="/outxide">Outxide Club</a> apre le sue porte. Suono di primo livello, produzione visiva spettacolare e set che si prolungano fino alle 05:00 o oltre. Il finale perfetto di una notte completa nel nord di Maiorca.</p>

<h2>Consigli Pratici per la Vita Notturna a Maiorca</h2>

<h3>Dress code</h3>
<p>Nella maggior parte dei club di qualita' a Maiorca, il dress code e' smart casual. Evitate infradito, canottiere e abbigliamento da spiaggia. All'Outxide Club ci si aspetta un look curato ma senza eccessiva formalita'. Sneakers pulite, pantaloni o bermuda eleganti e una camicia o maglietta di qualita' vanno benissimo.</p>

<h3>Come muoversi</h3>
<p>A Port d'Alcudia tutto e' raggiungibile a piedi: i ristoranti del porto, Enjoy Terrace e Outxide Club. Taxi e servizi di noleggio con conducente sono disponibili tutta la notte per il rientro in hotel. Se venite da Palma o Magaluf, l'auto e' l'opzione piu' pratica (designate un guidatore o usate un servizio di autista privato). In estate funzionano servizi di bus notturno su alcuni percorsi.</p>

<h3>Serate migliori</h3>
<p>Nel nord di Maiorca il sabato e' la serata clou. Giovedi' e venerdi' in estate hanno anch'essi un'ottima atmosfera, specialmente a luglio e agosto. A Palma ci sono opzioni ogni sera della settimana in alta stagione.</p>

<h3>Budget indicativo</h3>
<p>Cena completa con bevanda in un buon ristorante: 30-60 EUR a persona. Cocktail: 10-15 EUR ciascuno. Ingresso in discoteca: 15-30 EUR a seconda della serata e dell'acquisto online o alla porta. Una notte completa di cena, cocktail e discoteca si aggira intorno agli 80-120 EUR a persona, un investimento ragionevole per un'esperienza di primo livello.</p>

<h2>Perche' il nord di Maiorca e' il posto migliore per uscire la sera</h2>
<p>Mentre Magaluf e Palma hanno il loro pubblico, sempre piu' persone scoprono che il nord di Maiorca offre un'esperienza notturna superiore. Meno folla, qualita' migliore sotto ogni aspetto, un'atmosfera piu' autentica e matura, e la possibilita' di combinare alta gastronomia e clubbing di qualita' nel raggio di pochi minuti a piedi. La combinazione di una buona cena al porto, <a href="/enjoy">Enjoy Terrace</a> e <a href="/outxide">Outxide Club</a> offre tutto cio' che serve per una notte perfetta a Maiorca, senza masse e con molto stile.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-25",
    updated: "2026-08-29",
    image: "/images/outxide/DSCF8103-9.jpg",
    tags: ["nightlife", "mallorca", "outxide", "clubs", "alcudia", "cocktails", "enjoy"],
    venue: "outxide",
    faq: [
      {
        question: {
          es: "¿Dónde salir de fiesta en el norte de Mallorca?",
          en: "Where to go out at night in northern Mallorca?",
          de: "Wo kann man im Norden Mallorcas ausgehen?",
          fr: "Où sortir le soir dans le nord de Majorque ?",
          it: "Dove uscire la sera nel nord di Maiorca?",
        },
        answer: {
          es: "Port d'Alcúdia concentra la mejor oferta: discoteca (Outxide Club) y cócteles y shisha en terraza (Enjoy Terrace), con buenos restaurantes para cenar a pocos metros.",
          en: "Port d'Alcúdia has the best options: a nightclub (Outxide Club) and terrace cocktails and shisha (Enjoy Terrace), with good restaurants for dinner within a few metres.",
          de: "In Port d'Alcúdia gibt es das beste Angebot: Nachtclub (Outxide Club) sowie Cocktails und Shisha auf der Terrasse (Enjoy Terrace) – mit guten Restaurants zum Abendessen nur wenige Meter entfernt.",
          fr: "Port d'Alcúdia rassemble le meilleur : discothèque (Outxide Club) et cocktails et chicha en terrasse (Enjoy Terrace), avec de bonnes tables à quelques mètres.",
          it: "Port d'Alcúdia concentra il meglio: discoteca (Outxide Club) e cocktail e shisha in terrazza (Enjoy Terrace), con buoni ristoranti a pochi metri.",
        },
      },
      {
        question: {
          es: "¿Hasta qué hora abren las discotecas en Alcúdia?",
          en: "How late do nightclubs stay open in Alcúdia?",
          de: "Bis wann sind die Clubs in Alcúdia geöffnet?",
          fr: "Jusqu'à quelle heure les discothèques d'Alcúdia sont-elles ouvertes ?",
          it: "Fino a che ora sono aperte le discoteche ad Alcúdia?",
        },
        answer: {
          es: "Las discotecas como Outxide abren hasta la madrugada, y los locales de cócteles como Enjoy Terrace abren desde las 17:00 hasta bien entrada la noche.",
          en: "Nightclubs like Outxide stay open into the early hours, while cocktail venues like Enjoy Terrace open from 17:00 until late.",
          de: "Clubs wie das Outxide haben bis in die frühen Morgenstunden geöffnet, Cocktailbars wie die Enjoy Terrace ab 17:00 Uhr bis spät in die Nacht.",
          fr: "Les discothèques comme l'Outxide restent ouvertes jusqu'au petit matin, et les bars à cocktails comme l'Enjoy Terrace ouvrent de 17h00 jusque tard dans la nuit.",
          it: "Le discoteche come l'Outxide restano aperte fino all'alba, mentre i cocktail bar come l'Enjoy Terrace aprono dalle 17:00 fino a tarda notte.",
        },
      },
      {
        question: {
          es: "¿Hace falta reservar para salir de noche en Alcúdia?",
          en: "Do I need to book to go out at night in Alcúdia?",
          de: "Muss man für einen Abend in Alcúdia reservieren?",
          fr: "Faut-il réserver pour sortir le soir à Alcúdia ?",
          it: "Serve prenotare per uscire la sera ad Alcúdia?",
        },
        answer: {
          es: "Para la discoteca conviene comprar la entrada o el reservado online por adelantado, sobre todo en eventos y fines de semana de temporada alta.",
          en: "For the nightclub it's best to buy your ticket or VIP table online in advance, especially for events and high-season weekends.",
          de: "Für den Club kaufst du dein Ticket oder deinen VIP-Tisch am besten vorab online, besonders bei Events und an Wochenenden der Hochsaison.",
          fr: "Pour la discothèque, mieux vaut acheter son billet ou sa table VIP en ligne à l'avance, surtout pour les événements et les week-ends de haute saison.",
          it: "Per la discoteca conviene acquistare il biglietto o il tavolo VIP online in anticipo, soprattutto per gli eventi e nei weekend di alta stagione.",
        },
      },
      {
        question: {
          es: "¿Qué zona de Mallorca tiene buen ambiente nocturno sin masificación?",
          en: "Which part of Mallorca has good nightlife without the crowds?",
          de: "Welche Gegend Mallorcas hat gutes Nachtleben ohne Massen?",
          fr: "Quelle région de Majorque offre une bonne vie nocturne sans la foule ?",
          it: "Quale zona di Maiorca ha una buona vita notturna senza folla?",
        },
        answer: {
          es: "El norte de la isla, en Alcúdia y Port d'Alcúdia, ofrece buen ambiente y música sin la masificación de Magaluf o Playa de Palma.",
          en: "The north of the island, in Alcúdia and Port d'Alcúdia, offers a great atmosphere and music without the crowds of Magaluf or Playa de Palma.",
          de: "Der Norden der Insel, in Alcúdia und Port d'Alcúdia, bietet tolle Stimmung und Musik ohne die Menschenmassen von Magaluf oder Playa de Palma.",
          fr: "Le nord de l'île, à Alcúdia et Port d'Alcúdia, offre une belle ambiance et de la musique sans la foule de Magaluf ou de Playa de Palma.",
          it: "Il nord dell'isola, ad Alcúdia e Port d'Alcúdia, offre una bella atmosfera e buona musica senza la folla di Magaluf o Playa de Palma.",
        },
      },
    ],
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
<p>Despues de un dia explorando Alcudia, nada mejor que una buena cena con producto fresco. En Port d'Alcudia encontraras arroces de lonja, cocina a la brasa y pescados del Mediterraneo en varios buenos restaurantes, con ambientes perfectos para una cena larga con buena compania: nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guia de los mejores restaurantes de Alcudia</a> te ayuda a elegir.</p>
<p><strong>Horario:</strong> Abierto de 12:00 a 23:30 (viernes y sabado hasta la 1:00). Cierra los martes. Reservar mesa es recomendable, especialmente en fin de semana.</p>

<h2>11. Cocteles al atardecer con vistas</h2>
<p>Alcudia tiene algunos de los atardeceres mas bonitos de Mallorca, y no hay mejor forma de disfrutarlos que con un buen coctel en la mano. <a href="/enjoy">Enjoy Terrace</a>, en Av. Tucan 1 de Port d'Alcudia, es el lugar donde locales y visitantes se reúnen cada tarde para ver caer el sol. La carta de cocteles de autor, combinada con shisha premium y un ambiente sofisticado, hace que sea facil quedarse hasta bien entrada la noche. Abre todos los dias a partir de las 17:00.</p>
<p><strong>Consejo:</strong> Llega unos 30 minutos antes del atardecer para coger buen sitio. Los bartenders te pueden recomendar combinaciones segun tus gustos.</p>

<h2>12. Vida nocturna de nivel</h2>
<p>La noche en Port d'Alcudia tiene un nombre propio: <a href="/outxide">Outxide Club</a>. Es la referencia del clubbing en el norte de Mallorca, con sonido profesional de primer nivel, DJs nacionales e internacionales y una produccion visual espectacular. Abre de jueves a sabado a partir de las 23:00, de mayo a octubre. La ubicacion es perfecta para combinar con una cena en el puerto y cocteles en Enjoy Terrace antes de entrar al club.</p>
<p><strong>Entradas:</strong> Disponibles a traves de FourVenues (plataforma oficial) o en la puerta. Comprar online suele tener mejor precio.</p>

<h2>13. Visitar la Cueva de Sant Marti</h2>
<p>Cerca de la Ermita de la Victoria, la Cueva de Sant Marti es una gruta natural convertida en capilla que merece una visita. Las dos salas excavadas en la roca albergan altares y pinturas antiguas. El entorno es espectacular, rodeado de bosque de pinos y con vistas al mar. La visita es gratuita y se combina perfectamente con la ruta de senderismo a la Talaia.</p>

<h2>14. Alquilar un barco y explorar la costa</h2>
<p>Si quieres libertad total para explorar la costa norte de Mallorca, alquilar un barco sin titulacion es una opcion cada vez mas popular en Alcudia. Hay empresas que alquilan lanchas de hasta 15 CV que no requieren licencia, perfectas para recorrer la bahia, fondear en calas escondidas y llegar a playas como Coll Baix, Cala Morella o la costa de Formentor. Para embarcaciones mas grandes, necesitaras licencia o un patron incluido.</p>
<p><strong>Donde:</strong> En el puerto deportivo de Alcudia hay varias empresas de charter. Los precios varian segun el tipo de embarcacion y la temporada.</p>

<h2>15. Recorrer Alcudia en segway o bicicleta electrica</h2>
<p>Para quienes prefieren una actividad mas relajada, los tours en segway o bicicleta electrica son una forma divertida de explorar Port d'Alcudia, el paseo maritimo y los alrededores del parque de s'Albufera sin esfuerzo. Varias empresas ofrecen rutas guiadas que incluyen paradas en miradores y puntos de interes historico.</p>

<h2>Tu dia perfecto en Alcudia</h2>
<p>Si tuvieras que elegir un solo dia, aqui va nuestra recomendacion: empieza con una visita al casco antiguo y el mercado (si es martes o domingo), banate en la playa de Alcudia por la manana, come un arroz de lonja en el puerto, dedica la tarde a una excursion en barco o senderismo en la Victoria, disfruta del atardecer con cocteles en <a href="/enjoy">Enjoy Terrace</a>, y si es jueves, viernes o sabado, cierra la noche bailando en <a href="/outxide">Outxide Club</a>. Alcudia lo tiene todo, concentrado y a tu alcance.</p>`,
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
<p>After a day exploring Alcudia, nothing beats a good dinner with fresh produce. In Port d'Alcudia you'll find market rice dishes, charcoal-grilled cooking and Mediterranean fish at several good restaurants, perfect for a long dinner in good company: our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to the best restaurants in Alcudia</a> will help you choose.</p>
<p><strong>Hours:</strong> Open 12:00 to 23:30 (Friday and Saturday until 01:00). Closed Tuesdays. Booking is recommended, especially at weekends.</p>

<h2>11. Sunset cocktails with a view</h2>
<p>Alcudia enjoys some of the most stunning sunsets in Mallorca, and there is no better way to savour them than with a quality cocktail in hand. <a href="/enjoy">Enjoy Terrace</a>, at Av. Tucan 1 in Port d'Alcudia, is where locals and visitors gather every evening to watch the sun dip below the horizon. The menu of signature cocktails, paired with premium shisha and a sophisticated ambiance, makes it easy to stay well into the night. Open daily from 17:00.</p>
<p><strong>Tip:</strong> Arrive about 30 minutes before sunset to grab a good spot. The bartenders are happy to recommend combinations based on your taste.</p>

<h2>12. World-class nightlife</h2>
<p>When it comes to after-dark action in Port d'Alcudia, <a href="/outxide">Outxide Club</a> is the undisputed reference. It is the top clubbing destination in northern Mallorca, with professional-grade sound, national and international DJs and spectacular visual production. Open Thursday to Saturday from 23:00, May through October. The location is perfect for combining a dinner by the port and cocktails at Enjoy Terrace before heading into the club.</p>
<p><strong>Tickets:</strong> Available through FourVenues (the official platform) or at the door. Buying online usually means a better price.</p>

<h2>13. Visit the Cave of Sant Marti</h2>
<p>Near the Ermita de la Victoria, the Cave of Sant Marti is a natural grotto converted into a chapel that is well worth a visit. Two chambers carved into the rock house ancient altars and paintings. The setting is spectacular, surrounded by pine forest with sea views. Entry is free and the visit combines perfectly with the Talaia hiking route.</p>

<h2>14. Rent a boat and explore the coastline</h2>
<p>If you want total freedom to discover the northern Mallorcan coast, renting a boat without a licence is an increasingly popular option in Alcudia. Companies hire out small motorboats of up to 15 HP that require no licence, ideal for cruising the bay, anchoring in hidden coves and reaching beaches such as Coll Baix, Cala Morella and the Formentor coast. For larger vessels you will need a licence or a skipper included in the hire.</p>
<p><strong>Where:</strong> Several charter companies operate from Alcudia marina. Prices vary depending on the boat type and the season.</p>

<h2>15. Discover Alcudia by Segway or e-bike</h2>
<p>For a more laid-back activity, Segway or electric-bike tours are a fun way to explore Port d'Alcudia, the seafront promenade and the s'Albufera surroundings without breaking a sweat. Several operators run guided routes with stops at viewpoints and historical landmarks.</p>

<h2>Your perfect day in Alcudia</h2>
<p>If you only had one day, here is our recommendation: start with the old town and the market (if it is Tuesday or Sunday), swim at Alcudia beach in the morning, have a seafood rice dish for lunch by the port, spend the afternoon on a boat trip or hiking on the Victoria peninsula, enjoy sunset cocktails at <a href="/enjoy">Enjoy Terrace</a>, and if it is Thursday, Friday or Saturday, close the night dancing at <a href="/outxide">Outxide Club</a>. Alcudia has it all, compact and within reach.</p>`,
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
<p>Nach einem Tag voller Entdeckungen in Alcudia geht nichts über ein gutes Abendessen mit frischen Produkten. In Port d'Alcudia findest du Reisgerichte, Grillküche und Mittelmeerfisch in mehreren guten Restaurants, perfekt für ein langes Abendessen in guter Gesellschaft: Unser <a href="/blog/mejores-restaurantes-alcudia-mallorca">Guide zu den besten Restaurants in Alcudia</a> hilft bei der Wahl.</p>
<p><strong>Oeffnungszeiten:</strong> 12:00 bis 23:30 Uhr (Freitag und Samstag bis 1:00 Uhr). Dienstags geschlossen. Reservierung empfohlen, besonders am Wochenende.</p>

<h2>11. Cocktails bei Sonnenuntergang mit Aussicht</h2>
<p>Alcudia bietet einige der schoensten Sonnenuntergaenge Mallorcas, und es gibt keinen besseren Weg, sie zu geniessen, als mit einem erstklassigen Cocktail in der Hand. <a href="/enjoy">Enjoy Terrace</a> in der Av. Tucan 1 in Port d'Alcudia ist der Treffpunkt, an dem Einheimische und Besucher jeden Abend zusammenkommen, um die Sonne untergehen zu sehen. Die Karte mit Signature-Cocktails, gepaart mit Premium-Shisha und anspruchsvollem Ambiente, macht es leicht, bis tief in die Nacht zu bleiben. Taeglich geoeffnet ab 17:00 Uhr.</p>
<p><strong>Tipp:</strong> Komm etwa 30 Minuten vor Sonnenuntergang, um einen guten Platz zu ergattern. Die Bartender empfehlen dir gerne Kombinationen nach deinem Geschmack.</p>

<h2>12. Nachtleben auf Top-Niveau</h2>
<p>Wenn es um Nachtleben in Port d'Alcudia geht, ist <a href="/outxide">Outxide Club</a> die unangefochtene Nummer eins. Er ist die Top-Clubbing-Adresse im Norden Mallorcas mit professionellem Sound, nationalen und internationalen DJs und spektakulaerer visueller Produktion. Geoeffnet Donnerstag bis Samstag ab 23:00 Uhr, von Mai bis Oktober. Die Lage ist perfekt, um ein Abendessen am Hafen und Cocktails in der Enjoy Terrace mit einem Clubbesuch zu kombinieren.</p>
<p><strong>Tickets:</strong> Erhaeltlich ueber FourVenues (offizielle Plattform) oder an der Abendkasse. Online-Kauf bietet in der Regel einen besseren Preis.</p>

<h2>13. Die Hoehle von Sant Marti besuchen</h2>
<p>In der Naehe der Ermita de la Victoria ist die Hoehle von Sant Marti eine natuerliche Grotte, die in eine Kapelle umgewandelt wurde und einen Besuch wert ist. Zwei in den Fels gehauene Raeume beherbergen alte Altaere und Malereien. Die Umgebung ist spektakulaer, umgeben von Pinienwald mit Meerblick. Der Eintritt ist frei und der Besuch laesst sich hervorragend mit der Talaia-Wanderroute verbinden.</p>

<h2>14. Ein Boot mieten und die Kuste erkunden</h2>
<p>Wenn du die noerdliche Mallorca-Kuste in voelliger Freiheit entdecken moechtest, ist das Mieten eines fuehrerscheinfreien Bootes eine immer beliebtere Option in Alcudia. Unternehmen vermieten kleine Motorboote bis 15 PS, die keinen Fuehrerschein erfordern und ideal sind, um die Bucht zu erkunden, in versteckten Buchten zu ankern und Straende wie Coll Baix, Cala Morella und die Formentor-Kuste zu erreichen. Fuer groessere Boote brauchst du einen Fuehrerschein oder einen Skipper ist inklusive.</p>
<p><strong>Wo:</strong> Im Sporthafen von Alcudia gibt es mehrere Charterunternehmen. Die Preise variieren je nach Bootstyp und Saison.</p>

<h2>15. Alcudia per Segway oder E-Bike entdecken</h2>
<p>Fur eine entspanntere Aktivitaet sind Segway- oder E-Bike-Touren eine unterhaltsame Moeglichkeit, Port d'Alcudia, die Strandpromenade und die Umgebung von s'Albufera ohne Anstrengung zu erkunden. Mehrere Anbieter bieten gefuehrte Routen mit Stopps an Aussichtspunkten und historischen Sehenswuerdigkeiten an.</p>

<h2>Dein perfekter Tag in Alcudia</h2>
<p>Wenn du nur einen Tag haettest, hier ist unsere Empfehlung: Starte mit der Altstadt und dem Markt (falls Dienstag oder Sonntag), schwimm am Strand von Alcudia am Vormittag, iss mittags ein Reisgericht mit Fisch und Meeresfruechten am Hafen, verbringe den Nachmittag mit einem Bootsausflug oder einer Wanderung auf der Victoria-Halbinsel, geniesse Cocktails bei Sonnenuntergang auf der <a href="/enjoy">Enjoy Terrace</a>, und wenn es Donnerstag, Freitag oder Samstag ist, lass die Nacht tanzend im <a href="/outxide">Outxide Club</a> ausklingen. Alcudia hat alles, kompakt und in Reichweite.</p>`,
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
<p>Apres une journee a explorer Alcudia, rien de mieux qu'un bon diner avec des produits frais. A Port d'Alcudia, vous trouverez riz de la criee, cuisine a la braise et poissons de Mediterranee dans plusieurs bons restaurants, parfaits pour un long diner en bonne compagnie : notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des meilleurs restaurants d'Alcudia</a> vous aidera a choisir.</p>
<p><strong>Horaires :</strong> 12h00 a 23h30 (vendredi et samedi jusqu'a 1h00). Ferme le mardi. Reservation recommandee, surtout le week-end.</p>

<h2>11. Cocktails au coucher du soleil</h2>
<p>Alcudia offre certains des plus beaux couchers de soleil de Majorque, et il n'y a pas de meilleure facon d'en profiter qu'avec un cocktail de qualite a la main. <a href="/enjoy">Enjoy Terrace</a>, Av. Tucan 1 a Port d'Alcudia, est le point de rendez-vous ou locaux et visiteurs se retrouvent chaque soir pour regarder le soleil se coucher. La carte de cocktails signatures, associee a une chicha premium et une ambiance raffinee, rend facile d'y rester jusqu'au bout de la nuit. Ouvert tous les jours a partir de 17h00.</p>
<p><strong>Conseil :</strong> Arrivez environ 30 minutes avant le coucher du soleil pour avoir une bonne place. Les bartenders se feront un plaisir de vous recommander des combinaisons selon vos gouts.</p>

<h2>12. Vie nocturne haut de gamme</h2>
<p>Cote nuit a Port d'Alcudia, <a href="/outxide">Outxide Club</a> est la reference incontestee. C'est la premiere destination clubbing du nord de Majorque, avec un son professionnel, des DJ nationaux et internationaux et une production visuelle spectaculaire. Ouvert du jeudi au samedi a partir de 23h00, de mai a octobre. L'emplacement est parfait pour enchaîner un diner au port, des cocktails a l'Enjoy Terrace puis une soiree au club.</p>
<p><strong>Billets :</strong> Disponibles via FourVenues (plateforme officielle) ou sur place. L'achat en ligne offre generalement un meilleur tarif.</p>

<h2>13. Visiter la grotte de Sant Marti</h2>
<p>Pres de l'Ermita de la Victoria, la grotte de Sant Marti est une cavite naturelle transformee en chapelle qui merite le detour. Deux salles creusees dans la roche abritent des autels anciens et des peintures. Le cadre est spectaculaire, entoure de pinede avec vue sur la mer. L'entree est gratuite et la visite se combine parfaitement avec la randonnee de la Talaia.</p>

<h2>14. Louer un bateau et explorer la cote</h2>
<p>Pour une liberte totale dans l'exploration de la cote nord de Majorque, la location de bateau sans permis est une option de plus en plus prisee a Alcudia. Des societes louent des petits bateaux a moteur jusqu'a 15 CV ne necessitant aucun permis, parfaits pour parcourir la baie, mouiller dans des criques cachees et rejoindre des plages comme Coll Baix, Cala Morella ou la cote de Formentor. Pour des embarcations plus grandes, il vous faudra un permis ou un skipper inclus.</p>
<p><strong>Ou :</strong> Plusieurs societes de charter operent depuis le port de plaisance d'Alcudia. Les tarifs varient selon le type de bateau et la saison.</p>

<h2>15. Decouvrir Alcudia en Segway ou velo electrique</h2>
<p>Pour une activite plus tranquille, les tours en Segway ou velo electrique sont une facon amusante d'explorer Port d'Alcudia, le front de mer et les alentours de s'Albufera sans effort. Plusieurs operateurs proposent des circuits guides avec des arrets aux points de vue et sites historiques.</p>

<h2>Votre journee parfaite a Alcudia</h2>
<p>Si vous n'aviez qu'une journee, voici notre recommandation : commencez par la vieille ville et le marche (si c'est mardi ou dimanche), baignez-vous a la plage d'Alcudia le matin, dejeuner d'un riz aux fruits de mer au port, passez l'apres-midi en excursion en bateau ou en randonnee sur la Victoria, savourez des cocktails au coucher du soleil a la <a href="/enjoy">Enjoy Terrace</a>, et si c'est jeudi, vendredi ou samedi, terminez la nuit en dansant a l'<a href="/outxide">Outxide Club</a>. Alcudia a tout, compact et a portee de main.</p>`,
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
<p>Dopo una giornata a esplorare Alcudia, niente di meglio di una buona cena con prodotti freschi. A Port d'Alcudia troverai risi di mercato, cucina alla brace e pesci del Mediterraneo in diversi buoni ristoranti, perfetti per una cena lunga in buona compagnia: la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai migliori ristoranti di Alcudia</a> ti aiuta a scegliere.</p>
<p><strong>Orari:</strong> 12:00-23:30 (venerdi' e sabato fino all'1:00). Chiuso il martedi'. Prenotazione consigliata, specialmente nel fine settimana.</p>

<h2>11. Cocktail al tramonto con vista</h2>
<p>Alcudia regala alcuni dei tramonti piu' belli di Maiorca, e non c'e' modo migliore di goderseli che con un cocktail di qualita' in mano. <a href="/enjoy">Enjoy Terrace</a>, in Av. Tucan 1 a Port d'Alcudia, e' il punto d'incontro dove locali e visitatori si ritrovano ogni sera per guardare il sole scendere all'orizzonte. Il menu di cocktail d'autore, abbinato a shisha premium e un'atmosfera raffinata, rende facile restare fino a tarda notte. Aperto tutti i giorni dalle 17:00.</p>
<p><strong>Consiglio:</strong> Arriva circa 30 minuti prima del tramonto per assicurarti un buon posto. I bartender saranno felici di consigliarti combinazioni in base ai tuoi gusti.</p>

<h2>12. Vita notturna di alto livello</h2>
<p>Quando si parla di notte a Port d'Alcudia, <a href="/outxide">Outxide Club</a> e' il riferimento indiscusso. E' la prima destinazione per il clubbing nel nord di Maiorca, con impianto audio professionale, DJ nazionali e internazionali e una produzione visiva spettacolare. Aperto da giovedi' a sabato dalle 23:00, da maggio a ottobre. La posizione e' perfetta per combinare una cena al porto e cocktail all'Enjoy Terrace prima di entrare in discoteca.</p>
<p><strong>Biglietti:</strong> Disponibili tramite FourVenues (piattaforma ufficiale) o alla porta. L'acquisto online offre di solito un prezzo migliore.</p>

<h2>13. Visitare la grotta di Sant Marti</h2>
<p>Vicino all'Ermita de la Victoria, la grotta di Sant Marti e' una cavita' naturale trasformata in cappella che merita una visita. Due sale scavate nella roccia ospitano altari antichi e dipinti. Il contesto e' spettacolare, circondato da pineta con vista sul mare. L'ingresso e' gratuito e la visita si abbina perfettamente al trekking della Talaia.</p>

<h2>14. Noleggiare una barca ed esplorare la costa</h2>
<p>Se vuoi la totale liberta' di scoprire la costa nord di Maiorca, noleggiare una barca senza patente e' un'opzione sempre piu' popolare ad Alcudia. Aziende noleggiano piccoli motoscafi fino a 15 CV che non richiedono patente, perfetti per esplorare la baia, ancorare in calette nascoste e raggiungere spiagge come Coll Baix, Cala Morella e la costa di Formentor. Per imbarcazioni piu' grandi servira' la patente o uno skipper incluso.</p>
<p><strong>Dove:</strong> Nel porto turistico di Alcudia operano diverse societa' di charter. I prezzi variano in base al tipo di barca e alla stagione.</p>

<h2>15. Scoprire Alcudia in Segway o e-bike</h2>
<p>Per un'attivita' piu' rilassata, i tour in Segway o bici elettrica sono un modo divertente di esplorare Port d'Alcudia, il lungomare e i dintorni di s'Albufera senza fatica. Diversi operatori propongono percorsi guidati con soste ai punti panoramici e ai siti storici.</p>

<h2>La tua giornata perfetta ad Alcudia</h2>
<p>Se avessi un solo giorno, ecco il nostro consiglio: inizia con il centro storico e il mercato (se e' martedi' o domenica), fai il bagno alla spiaggia di Alcudia la mattina, pranza con un riso ai frutti di mare al porto, dedica il pomeriggio a un'escursione in barca o al trekking sulla Victoria, goditi i cocktail al tramonto all'<a href="/enjoy">Enjoy Terrace</a>, e se e' giovedi', venerdi' o sabato, chiudi la notte ballando all'<a href="/outxide">Outxide Club</a>. Alcudia ha tutto, compatto e a portata di mano.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    updated: "2026-08-29",
    image: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
    tags: ["alcudia", "mallorca", "activities", "guide"],
    venue: "general",
    faq: [
      {
        question: {
          es: "¿Qué ver imprescindible en Alcúdia?",
          en: "What are the must-see sights in Alcúdia?",
          de: "Was muss man in Alcúdia unbedingt sehen?",
          fr: "Que voir absolument à Alcúdia ?",
          it: "Cosa vedere assolutamente ad Alcúdia?",
        },
        answer: {
          es: "El casco antiguo con sus murallas medievales, la playa de Alcúdia y el Port d'Alcúdia. Al atardecer, una parada por Enjoy Terrace en la Av. Tucán 1 es de las mejores vistas de la zona.",
          en: "The old town with its medieval walls, Alcúdia beach and the Port d'Alcúdia. At sunset, a stop at Enjoy Terrace on Av. Tucán 1 offers one of the best views in the area.",
          de: "Die Altstadt mit ihren mittelalterlichen Mauern, der Strand von Alcúdia und der Port d'Alcúdia. Zum Sonnenuntergang bietet ein Stopp in der Enjoy Terrace in der Av. Tucán 1 einen der schönsten Ausblicke der Gegend.",
          fr: "La vieille ville et ses remparts médiévaux, la plage d'Alcúdia et le Port d'Alcúdia. Au coucher du soleil, une halte à l'Enjoy Terrace, Av. Tucán 1, offre l'une des plus belles vues du secteur.",
          it: "Il centro storico con le sue mura medievali, la spiaggia di Alcúdia e il Port d'Alcúdia. Al tramonto, una sosta all'Enjoy Terrace in Av. Tucán 1 regala una delle viste più belle della zona.",
        },
      },
      {
        question: {
          es: "¿Qué hacer de noche en Port d'Alcúdia?",
          en: "What is there to do at night in Port d'Alcúdia?",
          de: "Was kann man abends im Port d'Alcúdia unternehmen?",
          fr: "Que faire le soir à Port d'Alcúdia ?",
          it: "Cosa fare la sera a Port d'Alcúdia?",
        },
        answer: {
          es: "Empieza con cócteles de autor y shisha en Enjoy Terrace desde las 17:00 y sigue la fiesta en Outxide Club (jueves a sábado desde las 23:00, +18) con DJs internacionales. Compra tu entrada online en FourVenues.",
          en: "Start with signature cocktails and shisha at Enjoy Terrace from 5 pm, then keep the party going at Outxide Club (Thursday to Saturday from 11 pm, 18+) with international DJs. Buy your ticket online via FourVenues.",
          de: "Beginne mit Signature-Cocktails und Shisha in der Enjoy Terrace ab 17 Uhr und feiere weiter im Outxide Club (Donnerstag bis Samstag ab 23 Uhr, ab 18) mit internationalen DJs. Tickets gibt es online bei FourVenues.",
          fr: "Commencez par des cocktails signature et une chicha à l'Enjoy Terrace dès 17 h, puis prolongez la fête à l'Outxide Club (du jeudi au samedi dès 23 h, +18) avec des DJ internationaux. Achetez votre billet en ligne sur FourVenues.",
          it: "Inizia con cocktail d'autore e shisha all'Enjoy Terrace dalle 17:00, poi continua la festa all'Outxide Club (dal giovedì al sabato dalle 23:00, +18) con DJ internazionali. Acquista il biglietto online su FourVenues.",
        },
      },
      {
        question: {
          es: "¿Qué planes hay en Alcúdia en pareja?",
          en: "What are some good things to do in Alcúdia as a couple?",
          de: "Welche Aktivitäten gibt es in Alcúdia für Paare?",
          fr: "Quelles activités faire en couple à Alcúdia ?",
          it: "Cosa fare ad Alcúdia in coppia?",
        },
        answer: {
          es: "Un paseo al atardecer por el puerto seguido de cócteles en la terraza de Enjoy es un plan perfecto en pareja. Para cenar, elige una de las terrazas del puerto y reserva con antelación en temporada alta.",
          en: "A sunset stroll along the port followed by cocktails on the Enjoy terrace makes a perfect couple's evening. For dinner, pick one of the terraces by the port and book ahead in high season.",
          de: "Ein Spaziergang zum Sonnenuntergang am Hafen und anschließend Cocktails auf der Terrasse von Enjoy sind ideal für Paare. Zum Abendessen wählst du am besten eine der Terrassen am Hafen; in der Hochsaison rechtzeitig reservieren.",
          fr: "Une balade au coucher du soleil le long du port suivie de cocktails sur la terrasse d'Enjoy est parfaite en couple. Pour dîner, choisissez l'une des terrasses du port et réservez à l'avance en haute saison.",
          it: "Una passeggiata al tramonto lungo il porto seguita da cocktail sulla terrazza dell'Enjoy è perfetta in coppia. Per cena, scegli una delle terrazze del porto e prenota in anticipo in alta stagione.",
        },
      },
      {
        question: {
          es: "¿Cuántos días hacen falta para ver Alcúdia?",
          en: "How many days do you need to see Alcúdia?",
          de: "Wie viele Tage braucht man für Alcúdia?",
          fr: "Combien de jours faut-il pour visiter Alcúdia ?",
          it: "Quanti giorni servono per visitare Alcúdia?",
        },
        answer: {
          es: "Con dos o tres días te da tiempo a ver el casco antiguo, disfrutar de la playa y salir de noche. Si buscas un plan más tranquilo entre cala y cala, una semana se aprovecha de sobra.",
          en: "Two or three days are enough to see the old town, enjoy the beach and go out at night. For a more relaxed pace hopping between coves, a full week is easily worthwhile.",
          de: "Zwei bis drei Tage reichen, um die Altstadt zu sehen, den Strand zu genießen und abends auszugehen. Für ein entspannteres Tempo von Bucht zu Bucht lohnt sich problemlos eine ganze Woche.",
          fr: "Deux à trois jours suffisent pour voir la vieille ville, profiter de la plage et sortir le soir. Pour un rythme plus tranquille de crique en crique, une semaine entière se justifie sans peine.",
          it: "Due o tre giorni bastano per vedere il centro storico, godersi la spiaggia e uscire la sera. Per un ritmo più tranquillo tra una cala e l'altra, una settimana intera vale sicuramente la pena.",
        },
      },
    ],
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
<p>Después de horas al sol, el cuerpo pide una buena comida. En Port d'Alcúdia hay arroces, cocina a la brasa y opciones para todos los gustos, tanto para un almuerzo largo como para una cena tranquila: encuentra nuestra selección al día en la <a href="/blog/mejores-restaurantes-alcudia-mallorca">guía de los mejores restaurantes de Alcúdia</a>.</p>

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
<p>After hours in the sun, you'll have earned a proper meal. Port d'Alcúdia has rice dishes, charcoal-grilled cooking and options for every taste, whether it's a long lunch or a relaxed dinner: find our up-to-date selection in the <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to the best restaurants in Alcúdia</a>.</p>

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
<p>Nach Stunden in der Sonne hat man sich ein gutes Essen verdient. Port d'Alcúdia bietet Reisgerichte, Grillküche und Optionen für jeden Geschmack, ob langes Mittagessen oder entspanntes Abendessen: Unsere aktuelle Auswahl findest du im <a href="/blog/mejores-restaurantes-alcudia-mallorca">Guide zu den besten Restaurants in Alcúdia</a>.</p>

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
<p>Après des heures au soleil, un bon repas s'impose. Port d'Alcúdia offre des riz, une cuisine à la braise et des options pour tous les goûts, pour un long déjeuner comme pour un dîner tranquille : retrouvez notre sélection à jour dans le <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des meilleurs restaurants d'Alcúdia</a>.</p>

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
<p>Dopo ore al sole, un buon pasto è d'obbligo. Port d'Alcúdia offre risi, cucina alla brace e opzioni per tutti i gusti, per un pranzo lungo o una cena tranquilla: trovi la nostra selezione aggiornata nella <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai migliori ristoranti di Alcúdia</a>.</p>

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
    updated: "2026-08-29",
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
<p>Lo que hace única la noche en Port d'Alcúdia es la proximidad de todo. Puedes empezar con cócteles al atardecer, cenar en uno de los restaurantes del puerto, volver a la terraza para una shisha y terminar bailando en el club. Todo en la misma zona, a pocos pasos. Eso, combinado con la brisa del Mediterráneo, el ambiente internacional y una oferta de calidad, convierte a Alcúdia en un destino nocturno que no tiene nada que envidiar al sur de la isla.</p>

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
<p>What makes Port d'Alcudia's nightlife unique is the proximity of everything. You can start with sunset cocktails, dine at one of the restaurants by the port, return to the terrace for shisha and end up dancing at the club. All in the same area, just steps apart. That, combined with the Mediterranean breeze, the international atmosphere and a quality offering, makes Alcudia a nightlife destination that rivals the south of the island.</p>`,
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
<p>Was die Nacht in Port d'Alcudia einzigartig macht, ist die Nähe von allem. Du kannst mit Cocktails bei Sonnenuntergang starten, in einem der Restaurants am Hafen essen, zurück auf die Terrasse für eine Shisha und den Abend tanzend im Club ausklingen lassen. Alles in der gleichen Gegend, nur wenige Schritte voneinander entfernt. Das, kombiniert mit der Mittelmeerbrise, der internationalen Atmosphäre und einem hochwertigen Angebot, macht Alcudia zu einem Nachtleben-Ziel, das dem Süden der Insel in nichts nachsteht.</p>`,
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
<p>Ce qui rend la nuit a Port d'Alcudia unique, c'est la proximite de tout. Vous pouvez commencer par des cocktails au coucher du soleil, diner dans l'un des restaurants du port, revenir sur la terrasse pour une chicha et terminer en dansant au club. Le tout dans la meme zone, a quelques pas. Cela, combine a la brise mediterraneenne, a l'ambiance internationale et a une offre de qualite, fait d'Alcudia une destination nocturne qui n'a rien a envier au sud de l'ile.</p>`,
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
<p>Cio' che rende unica la notte a Port d'Alcudia e' la vicinanza di tutto. Puoi iniziare con cocktail al tramonto, cenare in uno dei ristoranti del porto, tornare in terrazza per una shisha e finire ballando in discoteca. Tutto nella stessa zona, a pochi passi. Questo, unito alla brezza del Mediterraneo, all'atmosfera internazionale e a un'offerta di qualita', rende Alcudia una destinazione notturna che non ha nulla da invidiare al sud dell'isola.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-04-15",
    updated: "2026-08-29",
    image: "/images/outxide/DSCF8230-13.jpg",
    tags: ["nightlife", "alcudia", "mallorca", "outxide"],
    venue: "outxide",
    faq: [
      {
        question: {
          es: "¿Dónde salir de noche en Alcúdia?",
          en: "Where can you go out at night in Alcúdia?",
          de: "Wo kann man in Alcúdia nachts ausgehen?",
          fr: "Où sortir le soir à Alcúdia ?",
          it: "Dove uscire la sera ad Alcúdia?",
        },
        answer: {
          es: "En el Port d'Alcúdia se concentra el ambiente: la terraza de Enjoy (Av. Tucán 1) para cócteles de autor y shisha al atardecer, y la discoteca Outxide Club, en la misma dirección, para bailar techno, house y reggaetón con DJs internacionales.",
          en: "The action is in Port d'Alcúdia: the Enjoy terrace (Av. Tucán 1) for signature cocktails and shisha at sunset, and Outxide Club at the same address for techno, house and reggaeton with international DJs.",
          de: "Alles spielt sich in Port d'Alcúdia ab: die Enjoy-Terrasse (Av. Tucán 1) für Signature-Cocktails und Shisha bei Sonnenuntergang und der Outxide Club unter derselben Adresse für Techno, House und Reggaeton mit internationalen DJs.",
          fr: "Tout se passe à Port d'Alcúdia : la terrasse Enjoy (Av. Tucán 1) pour des cocktails signature et la chicha au coucher du soleil, et l'Outxide Club à la même adresse pour techno, house et reggaeton avec des DJs internationaux.",
          it: "Il cuore della movida è a Port d'Alcúdia: la terrazza Enjoy (Av. Tucán 1) per cocktail d'autore e shisha al tramonto, e l'Outxide Club, allo stesso indirizzo, per techno, house e reggaeton con DJ internazionali.",
        },
      },
      {
        question: {
          es: "¿Hasta qué hora hay ambiente de noche en Alcúdia?",
          en: "How late does the nightlife go in Alcúdia?",
          de: "Bis wann geht das Nachtleben in Alcúdia?",
          fr: "Jusqu'à quelle heure dure la vie nocturne à Alcúdia ?",
          it: "Fino a che ora si fa festa ad Alcúdia?",
        },
        answer: {
          es: "La terraza de Enjoy abre a diario desde las 17:00 para el atardecer y la primera copa. Para seguir de fiesta, Outxide Club abre de jueves a sábado desde las 23:00 y alarga la noche hasta la madrugada.",
          en: "The Enjoy terrace opens daily from 17:00 for sunset and the first drink. To keep the party going, Outxide Club opens Thursday to Saturday from 23:00 and runs into the early hours.",
          de: "Die Enjoy-Terrasse öffnet täglich ab 17:00 Uhr für Sonnenuntergang und den ersten Drink. Zum Weiterfeiern öffnet der Outxide Club von Donnerstag bis Samstag ab 23:00 Uhr und geht bis in die frühen Morgenstunden.",
          fr: "La terrasse Enjoy ouvre tous les jours dès 17h00 pour le coucher du soleil et le premier verre. Pour prolonger la fête, l'Outxide Club ouvre du jeudi au samedi à partir de 23h00 et se poursuit jusqu'au petit matin.",
          it: "La terrazza Enjoy apre tutti i giorni dalle 17:00 per il tramonto e il primo drink. Per continuare la festa, l'Outxide Club apre da giovedì a sabato dalle 23:00 e va avanti fino a notte fonda.",
        },
      },
      {
        question: {
          es: "¿El ambiente de Alcúdia está masificado como Magaluf?",
          en: "Is Alcúdia as crowded and rowdy as Magaluf?",
          de: "Ist Alcúdia so überlaufen wie Magaluf?",
          fr: "L'ambiance d'Alcúdia est-elle aussi bondée que Magaluf ?",
          it: "Ad Alcúdia c'è la stessa ressa di Magaluf?",
        },
        answer: {
          es: "No. El norte de Mallorca ofrece una noche más selecta y relajada, sin el turismo de excesos de Magaluf. Locales como la terraza de Enjoy y Outxide Club apuestan por un ambiente cuidado, música de calidad y espacio VIP.",
          en: "No. The north of Mallorca offers a more refined, relaxed night out, without the party-excess tourism of Magaluf. Venues like the Enjoy terrace and Outxide Club focus on a curated atmosphere, quality music and a VIP area.",
          de: "Nein. Der Norden Mallorcas bietet ein gepflegteres, entspannteres Nachtleben ohne den Exzess-Tourismus von Magaluf. Locations wie die Enjoy-Terrasse und der Outxide Club setzen auf ein stilvolles Ambiente, gute Musik und einen VIP-Bereich.",
          fr: "Non. Le nord de Majorque offre une nuit plus raffinée et détendue, sans le tourisme d'excès de Magaluf. Des lieux comme la terrasse Enjoy et l'Outxide Club misent sur une ambiance soignée, une musique de qualité et un espace VIP.",
          it: "No. Il nord di Maiorca offre una serata più ricercata e rilassata, senza il turismo degli eccessi di Magaluf. Locali come la terrazza Enjoy e l'Outxide Club puntano su un'atmosfera curata, musica di qualità e area VIP.",
        },
      },
      {
        question: {
          es: "¿Cómo organizar un plan de noche completo en Alcúdia?",
          en: "How do you plan a full night out in Alcúdia?",
          de: "Wie plant man einen kompletten Abend in Alcúdia?",
          fr: "Comment organiser une soirée complète à Alcúdia ?",
          it: "Come organizzare una serata completa ad Alcúdia?",
        },
        answer: {
          es: "El plan ideal: cena en uno de los restaurantes del puerto; sigue con cócteles al atardecer en la terraza de Enjoy; y termina bailando en Outxide Club, con entradas online por FourVenues.",
          en: "The ideal plan: dinner at one of the restaurants by the port; then sunset cocktails on the Enjoy terrace; and finish dancing at Outxide Club, with tickets online via FourVenues.",
          de: "Der ideale Ablauf: Abendessen in einem der Restaurants am Hafen; danach Cocktails zum Sonnenuntergang auf der Enjoy-Terrasse; und zum Abschluss Tanzen im Outxide Club, Tickets online über FourVenues.",
          fr: "Le plan idéal : dîner dans l'un des restaurants du port ; puis des cocktails au coucher du soleil sur la terrasse Enjoy ; et pour finir, danser à l'Outxide Club, billets en ligne via FourVenues.",
          it: "Il piano ideale: cena in uno dei ristoranti del porto; poi cocktail al tramonto sulla terrazza Enjoy; e per finire si balla all'Outxide Club, biglietti online su FourVenues.",
        },
      },
    ],
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
<p>Si buscas cenar antes de la discoteca, en el puerto hay opciones para todos los gustos, de arroces a cocina internacional: consulta nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guía de restaurantes de Alcúdia</a> y reserva con tiempo en temporada alta para llegar al club sin prisas.</p>

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
<p>If you want dinner before the club, the port has options for every taste, from rice dishes to international cooking: check our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to restaurants in Alcúdia</a> and book ahead in high season so you reach the club without rushing.</p>

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
<p>Wer vor dem Club zu Abend essen möchte, findet am Hafen Optionen für jeden Geschmack, von Reisgerichten bis internationaler Küche: Wirf einen Blick in unseren <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide für Alcúdia</a> und reserviere in der Hochsaison rechtzeitig, um entspannt in den Club zu kommen.</p>

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
<p>Pour dîner avant la discothèque, le port offre des options pour tous les goûts, des riz à la cuisine internationale : consultez notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants d'Alcúdia</a> et réservez à l'avance en haute saison pour arriver au club sans stress.</p>

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
<p>Se vuoi cenare prima della discoteca, il porto offre opzioni per tutti i gusti, dai risi alla cucina internazionale: consulta la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti di Alcúdia</a> e prenota per tempo in alta stagione per arrivare al club senza fretta.</p>

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
    updated: "2026-08-29",
    image: "/images/outxide/PIC06225-3.jpg",
    tags: ["nightlife", "alcudia", "mallorca", "clubs"],
    venue: "outxide",
    faq: [
      {
        question: {
          es: "¿Cuál es la mejor discoteca del norte de Mallorca?",
          en: "What is the best nightclub in the north of Mallorca?",
          de: "Was ist der beste Nachtclub im Norden Mallorcas?",
          fr: "Quelle est la meilleure discothèque du nord de Majorque?",
          it: "Qual è la migliore discoteca del nord di Maiorca?",
        },
        answer: {
          es: "Outxide Club, en el Port d'Alcúdia, es la referencia de la vida nocturna del norte. Techno, house y reggaetón con DJs internacionales y zona VIP.",
          en: "Outxide Club, in Port d'Alcúdia, is the benchmark for nightlife in the north. Techno, house and reggaeton with international DJs and a VIP area.",
          de: "Outxide Club in Port d'Alcúdia ist die Referenz für das Nachtleben im Norden. Techno, House und Reggaeton mit internationalen DJs und VIP-Bereich.",
          fr: "Outxide Club, à Port d'Alcúdia, est la référence de la vie nocturne du nord. Techno, house et reggaeton avec des DJ internationaux et un espace VIP.",
          it: "Outxide Club, a Port d'Alcúdia, è il punto di riferimento della vita notturna del nord. Techno, house e reggaeton con DJ internazionali e area VIP.",
        },
      },
      {
        question: {
          es: "¿Qué días abre Outxide Club en Alcúdia?",
          en: "What days is Outxide Club in Alcúdia open?",
          de: "An welchen Tagen ist der Outxide Club in Alcúdia geöffnet?",
          fr: "Quels jours le Outxide Club d'Alcúdia est-il ouvert?",
          it: "Che giorni è aperto l'Outxide Club ad Alcúdia?",
        },
        answer: {
          es: "Outxide abre de jueves a sábado a partir de las 23:00. Es la mejor opción para salir de fiesta el fin de semana en el norte.",
          en: "Outxide is open Thursday to Saturday from 11 pm. It's the best option for a weekend night out in the north.",
          de: "Outxide ist von Donnerstag bis Samstag ab 23:00 Uhr geöffnet. Die beste Wahl zum Feiern am Wochenende im Norden.",
          fr: "Outxide est ouvert du jeudi au samedi à partir de 23h. La meilleure option pour faire la fête le week-end dans le nord.",
          it: "Outxide è aperto dal giovedì al sabato dalle 23:00. La scelta migliore per uscire nel weekend al nord.",
        },
      },
      {
        question: {
          es: "¿Cuál es la edad mínima para entrar a la discoteca?",
          en: "What is the minimum age to enter the nightclub?",
          de: "Was ist das Mindestalter für den Einlass in den Club?",
          fr: "Quel est l'âge minimum pour entrer en discothèque?",
          it: "Qual è l'età minima per entrare in discoteca?",
        },
        answer: {
          es: "La edad mínima en Outxide Club es 18 años. Lleva siempre un documento de identidad válido para acreditarla en la entrada.",
          en: "The minimum age at Outxide Club is 18. Always bring valid photo ID to prove your age at the door.",
          de: "Das Mindestalter im Outxide Club beträgt 18 Jahre. Bring immer einen gültigen Ausweis mit, um es am Eingang nachzuweisen.",
          fr: "L'âge minimum au Outxide Club est de 18 ans. Munissez-vous toujours d'une pièce d'identité valide pour le prouver à l'entrée.",
          it: "L'età minima all'Outxide Club è 18 anni. Porta sempre un documento d'identità valido per dimostrarla all'ingresso.",
        },
      },
      {
        question: {
          es: "¿Cómo comprar entradas para Outxide Club?",
          en: "How do I buy tickets for Outxide Club?",
          de: "Wie kaufe ich Tickets für den Outxide Club?",
          fr: "Comment acheter des billets pour le Outxide Club?",
          it: "Come acquistare i biglietti per l'Outxide Club?",
        },
        answer: {
          es: "Las entradas se compran online a través de FourVenues. Reserva con antelación las noches de DJ invitado, ya que suelen agotarse.",
          en: "Tickets are bought online through FourVenues. Book ahead for guest DJ nights, as they usually sell out.",
          de: "Tickets gibt es online über FourVenues. Sichere dir für Gast-DJ-Nächte frühzeitig einen Platz, da sie oft ausverkauft sind.",
          fr: "Les billets s'achètent en ligne via FourVenues. Réservez à l'avance pour les soirées DJ invité, souvent complètes.",
          it: "I biglietti si acquistano online tramite FourVenues. Prenota in anticipo per le serate con DJ ospite, di solito vanno esaurite.",
        },
      },
    ],
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
      es: "La cocina a la brasa hizo grande a Hiru Food & Drinks, cerrado en agosto de 2026. Recordamos su fuego — carnes maduradas, arroces de lonja y producto mallorquín — y te contamos dónde comer hoy en Alcúdia.",
      en: "Charcoal-grill cooking made Hiru Food & Drinks great; it closed in August 2026. We look back at its fire — aged meats, market rice dishes and Mallorcan produce — and point you to where to eat in Alcúdia today.",
      de: "Die Holzkohlegrillküche machte Hiru Food & Drinks groß; im August 2026 hat es geschlossen. Wir erinnern an sein Feuer — gereiftes Fleisch, Reisgerichte vom Markt, mallorquinische Produkte — und zeigen, wo man heute in Alcúdia isst.",
      fr: "La cuisine à la braise a fait la grandeur de Hiru Food & Drinks, fermé en août 2026. Retour sur son feu — viandes maturées, riz de la criée, produits majorquins — et nos adresses où manger aujourd'hui à Alcúdia.",
      it: "La cucina alla brace ha reso grande Hiru Food & Drinks, chiuso nell'agosto 2026. Ricordiamo il suo fuoco — carni frollate, risi del mercato, prodotti maiorchini — e ti diciamo dove mangiare oggi ad Alcúdia.",
    },
    content: {
      es: `<p><strong>Nota: Hiru Food &amp; Drinks, el restaurante a la brasa que protagonizaba esta pieza, cerró definitivamente en agosto de 2026.</strong> Mantenemos este artículo como homenaje a su manera de entender el fuego y como pequeña guía de lo que hace especial a la cocina a la brasa en Mallorca. Para mesas abiertas hoy, consulta nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guía de los mejores restaurantes de Alcúdia</a>.</p>

<h2>La magia del carbón de leña</h2>
<p>La diferencia entre cocinar a la brasa de carbón y cualquier otro método es el sabor. El carbón de leña aporta matices ahumados sutiles que impregnan la carne y el pescado sin dominarlos. La alta temperatura sella el exterior, creando una costra caramelizada mientras el interior se mantiene jugoso y tierno. Es una técnica que exige experiencia y atención constante — y que en <a href="/hiru">Hiru</a> se ejecutó con maestría hasta su último servicio.</p>

<h2>Así era la brasa de Hiru</h2>
<h3>Carnes maduradas</h3>
<p>La selección de carnes de Hiru se basaba en cortes premium sometidos a una maduración cuidadosa que concentraba los sabores y afinaba la textura. Al combinarse con la brasa de carbón, el resultado era espectacular: del chuletón a los cortes más selectos, cada pieza cocinada en su punto óptimo.</p>
<h3>Arroces de lonja</h3>
<p>El pescado y el marisco llegaban cada día de la lonja de Alcúdia. Los arroces de Hiru aprovechaban esa frescura al máximo: caldosos, melosos o secos, cada uno preparado con caldo casero y el producto más fresco del Mediterráneo. Los arroces de marisco merecían cada minuto de espera.</p>
<h3>Pescados del Mediterráneo y producto local</h3>
<p>Los tomates ramallet, el aceite de oliva de la sierra de Tramuntana, las almendras de la isla y las hierbas aromáticas del campo mallorquín eran protagonistas en la cocina de Hiru. Esa filosofía de proximidad se notaba en cada plato: ingredientes que no necesitaban esconderse porque su calidad hablaba por sí sola.</p>

<h2>El legado — y lo que viene</h2>
<p>Hiru sirvió su último servicio en agosto de 2026. El espacio de la Ctra. d'Artà 40 queda reservado para futuros proyectos de <a href="/">Grupo Enjoy</a> — nada confirmado todavía. Hemos escrito una <a href="/blog/hiru-food-drinks-restaurante-alcudia">carta de despedida y homenaje</a> para quien quiera recordarlo.</p>

<h2>De la cena a la noche</h2>
<p>La noche en Port d'Alcúdia sigue: cócteles de autor y shisha en <a href="/enjoy">Enjoy Terrace</a> y fiesta hasta el amanecer en <a href="/outxide">Outxide Club</a>. Y para elegir dónde cenar hoy, nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guía de restaurantes</a> está al día.</p>`,
      en: `<p><strong>Note: Hiru Food &amp; Drinks, the charcoal-grill restaurant at the heart of this piece, closed for good in August 2026.</strong> We keep this article as a tribute to its way of understanding fire, and as a short guide to what makes charcoal-grill cooking in Mallorca special. For tables open today, see our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to the best restaurants in Alcúdia</a>.</p>

<h2>The magic of wood charcoal</h2>
<p>The difference between cooking over charcoal embers and any other method is flavour. Wood charcoal adds subtle smoky notes that permeate meat and fish without overpowering them. The high heat sears the outside, creating a caramelised crust while the inside stays juicy and tender. It's a technique that demands experience and constant attention — and one that <a href="/hiru">Hiru</a> executed masterfully until its very last service.</p>

<h2>What Hiru's grill was like</h2>
<h3>Matured meats</h3>
<p>Hiru's meat selection was built on premium cuts put through a careful dry-ageing process that concentrated flavour and refined texture. Combined with the charcoal embers, the result was spectacular: from chuletones to more select cuts, every piece cooked to its precise point.</p>
<h3>Market rice dishes</h3>
<p>Fish and seafood arrived daily from Alcúdia's fish market. Hiru's rice dishes made the most of that freshness: brothy, creamy or dry, each cooked with homemade stock and the freshest Mediterranean produce. The seafood rices were worth every minute of the wait.</p>
<h3>Mediterranean fish and local produce</h3>
<p>Ramallet tomatoes, olive oil from the Tramuntana mountains, island almonds and aromatic herbs from the Mallorcan countryside starred in Hiru's kitchen. That philosophy of proximity showed in every dish: ingredients that had nothing to hide because their quality spoke for itself.</p>

<h2>The legacy — and what comes next</h2>
<p>Hiru served its last service in August 2026. The space at Ctra. d'Artà 40 is being kept for future <a href="/">Grupo Enjoy</a> projects — nothing confirmed yet. We've written a <a href="/blog/hiru-food-drinks-restaurante-alcudia">farewell letter and tribute</a> for anyone who wants to remember it.</p>

<h2>From dinner to the night</h2>
<p>The night in Port d'Alcúdia goes on: signature cocktails and shisha at <a href="/enjoy">Enjoy Terrace</a> and partying until dawn at <a href="/outxide">Outxide Club</a>. And to choose where to eat today, our <a href="/blog/mejores-restaurantes-alcudia-mallorca">restaurant guide</a> is up to date.</p>`,
      de: `<p><strong>Hinweis: Hiru Food &amp; Drinks, das Grillrestaurant im Mittelpunkt dieses Artikels, hat im August 2026 endgültig geschlossen.</strong> Wir behalten diesen Text als Hommage an seine Art, das Feuer zu verstehen — und als kleinen Guide dazu, was die Grillküche auf Mallorca besonders macht. Für heute geöffnete Tische siehe unseren <a href="/blog/mejores-restaurantes-alcudia-mallorca">Guide zu den besten Restaurants in Alcúdia</a>.</p>

<h2>Die Magie der Holzkohle</h2>
<p>Der Unterschied zwischen dem Garen über Holzkohleglut und jeder anderen Methode ist der Geschmack. Holzkohle bringt subtile Rauchnoten, die Fleisch und Fisch durchdringen, ohne sie zu dominieren. Die hohe Hitze versiegelt das Äußere und schafft eine karamellisierte Kruste, während das Innere saftig und zart bleibt. Eine Technik, die Erfahrung und ständige Aufmerksamkeit verlangt — und die im <a href="/hiru">Hiru</a> bis zum allerletzten Service meisterhaft ausgeführt wurde.</p>

<h2>So war die Glut von Hiru</h2>
<h3>Gereiftes Fleisch</h3>
<p>Hirus Fleischauswahl basierte auf Premium-Cuts, die einen sorgfältigen Dry-Aging-Prozess durchliefen, der den Geschmack konzentrierte und die Textur verfeinerte. In Kombination mit der Holzkohleglut war das Ergebnis spektakulär: vom Chuletón bis zu edleren Cuts, jedes Stück auf den Punkt gegart.</p>
<h3>Reisgerichte vom Markt</h3>
<p>Fisch und Meeresfrüchte kamen täglich von der Fischauktion in Alcúdia. Hirus Reisgerichte nutzten diese Frische maximal: brühig, cremig oder trocken, jeder Reis mit hausgemachtem Fond und dem frischesten Produkt des Mittelmeers. Die Meeresfrüchte-Reise waren jede Minute des Wartens wert.</p>
<h3>Mittelmeerfisch und lokales Produkt</h3>
<p>Ramallet-Tomaten, Olivenöl aus der Tramuntana, Mandeln der Insel und aromatische Kräuter vom mallorquinischen Land spielten die Hauptrolle in Hirus Küche. Diese Philosophie der Nähe zeigte sich in jedem Gericht: Zutaten, die sich nicht verstecken mussten, weil ihre Qualität für sich sprach.</p>

<h2>Das Vermächtnis — und was kommt</h2>
<p>Hiru servierte seinen letzten Service im August 2026. Der Raum in der Ctra. d'Artà 40 bleibt künftigen Projekten von <a href="/">Grupo Enjoy</a> vorbehalten — noch ist nichts bestätigt. Wir haben einen <a href="/blog/hiru-food-drinks-restaurante-alcudia">Abschiedsbrief und eine Hommage</a> geschrieben, für alle, die sich erinnern möchten.</p>

<h2>Vom Abendessen in die Nacht</h2>
<p>Die Nacht in Port d'Alcúdia geht weiter: Signature-Cocktails und Shisha im <a href="/enjoy">Enjoy Terrace</a> und Party bis zum Morgengrauen im <a href="/outxide">Outxide Club</a>. Und wer heute einen Tisch sucht: Unser <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide</a> ist auf dem neuesten Stand.</p>`,
      fr: `<p><strong>Note : Hiru Food &amp; Drinks, le restaurant de braise au cœur de cet article, a définitivement fermé en août 2026.</strong> Nous conservons ce texte en hommage à sa manière de comprendre le feu — et comme petit guide de ce qui rend la cuisine à la braise si spéciale à Majorque. Pour des tables ouvertes aujourd'hui, consultez notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des meilleurs restaurants d'Alcúdia</a>.</p>

<h2>La magie du charbon de bois</h2>
<p>La différence entre cuisiner sur des braises de charbon et toute autre méthode, c'est la saveur. Le charbon de bois apporte des nuances fumées subtiles qui imprègnent la viande et le poisson sans les dominer. La haute température saisit l'extérieur, créant une croûte caramélisée tandis que l'intérieur reste juteux et tendre. Une technique qui exige expérience et attention constante — et que <a href="/hiru">Hiru</a> a exécutée avec maestria jusqu'à son tout dernier service.</p>

<h2>Ce qu'était la braise de Hiru</h2>
<h3>Viandes maturées</h3>
<p>La sélection de viandes de Hiru reposait sur des pièces premium soumises à une maturation soignée qui concentrait les saveurs et affinait la texture. Combinée à la braise de charbon, le résultat était spectaculaire : du chuletón aux pièces les plus select, chaque morceau cuit à son point optimal.</p>
<h3>Riz de la criée</h3>
<p>Poissons et fruits de mer arrivaient chaque jour de la criée d'Alcúdia. Les riz de Hiru exploitaient cette fraîcheur au maximum : caldosos, crémeux ou secs, chacun préparé avec un bouillon maison et le produit le plus frais de la Méditerranée. Les riz aux fruits de mer valaient chaque minute d'attente.</p>
<h3>Poissons de Méditerranée et produits locaux</h3>
<p>Tomates ramallet, huile d'olive de la Tramuntana, amandes de l'île et herbes aromatiques de la campagne majorquine étaient les protagonistes de la cuisine de Hiru. Cette philosophie de proximité se voyait dans chaque plat : des ingrédients qui n'avaient rien à cacher, parce que leur qualité parlait d'elle-même.</p>

<h2>L'héritage — et la suite</h2>
<p>Hiru a assuré son dernier service en août 2026. Le local du Ctra. d'Artà 40 est réservé aux futurs projets de <a href="/">Grupo Enjoy</a> — rien de confirmé pour l'instant. Nous avons écrit une <a href="/blog/hiru-food-drinks-restaurante-alcudia">lettre d'adieu et un hommage</a> pour ceux qui veulent s'en souvenir.</p>

<h2>Du dîner à la nuit</h2>
<p>La nuit à Port d'Alcúdia continue : cocktails signature et chicha à l'<a href="/enjoy">Enjoy Terrace</a> et fête jusqu'à l'aube à l'<a href="/outxide">Outxide Club</a>. Et pour choisir où manger aujourd'hui, notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants</a> est à jour.</p>`,
      it: `<p><strong>Nota: Hiru Food &amp; Drinks, il ristorante alla brace al centro di questo articolo, ha chiuso definitivamente nell'agosto 2026.</strong> Manteniamo questo testo come omaggio al suo modo di intendere il fuoco — e come piccola guida a ciò che rende speciale la cucina alla brace a Maiorca. Per tavoli aperti oggi, consulta la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai migliori ristoranti di Alcúdia</a>.</p>

<h2>La magia del carbone di legna</h2>
<p>La differenza tra cucinare sulla brace di carbone e qualsiasi altro metodo è il sapore. Il carbone di legna aggiunge sfumature affumicate sottili che impregnano carne e pesce senza dominarli. L'alta temperatura sigilla l'esterno, creando una crosta caramellata mentre l'interno resta succoso e tenero. Una tecnica che esige esperienza e attenzione costante — e che da <a href="/hiru">Hiru</a> è stata eseguita con maestria fino all'ultimo servizio.</p>

<h2>Com'era la brace di Hiru</h2>
<h3>Carni frollate</h3>
<p>La selezione di carni di Hiru si basava su tagli premium sottoposti a una frollatura attenta che concentrava i sapori e affinava la consistenza. Combinata con la brace di carbone, il risultato era spettacolare: dal chuletón ai tagli più pregiati, ogni pezzo cotto al punto giusto.</p>
<h3>Risi del mercato</h3>
<p>Pesce e frutti di mare arrivavano ogni giorno dal mercato del pesce di Alcúdia. I risi di Hiru sfruttavano al massimo quella freschezza: brodosi, cremosi o secchi, ognuno preparato con brodo fatto in casa e il prodotto più fresco del Mediterraneo. I risi ai frutti di mare valevano ogni minuto d'attesa.</p>
<h3>Pesci del Mediterraneo e prodotto locale</h3>
<p>Pomodori ramallet, olio d'oliva della Tramuntana, mandorle dell'isola ed erbe aromatiche della campagna maiorchina erano protagonisti nella cucina di Hiru. Quella filosofia di prossimità si notava in ogni piatto: ingredienti che non dovevano nascondersi, perché la loro qualità parlava da sola.</p>

<h2>L'eredità — e ciò che verrà</h2>
<p>Hiru ha servito il suo ultimo servizio nell'agosto 2026. Lo spazio di Ctra. d'Artà 40 resta riservato ai futuri progetti di <a href="/">Grupo Enjoy</a> — nulla di confermato per ora. Abbiamo scritto una <a href="/blog/hiru-food-drinks-restaurante-alcudia">lettera di addio e un omaggio</a> per chi vuole ricordarlo.</p>

<h2>Dalla cena alla notte</h2>
<p>La notte a Port d'Alcúdia continua: cocktail d'autore e shisha all'<a href="/enjoy">Enjoy Terrace</a> e festa fino all'alba all'<a href="/outxide">Outxide Club</a>. E per scegliere dove mangiare oggi, la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti</a> è aggiornata.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-04-05",
    updated: "2026-08-29",
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
<li><strong>Cenar:</strong> reserva mesa con antelación en el puerto; en nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guía de restaurantes de Alcúdia</a> encontrarás opciones para cenar antes de cualquier evento nocturno</li>
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
<li><strong>Dinner:</strong> book a table ahead by the port; our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to restaurants in Alcúdia</a> has options for dinner before any evening event</li>
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
<li><strong>Abendessen:</strong> reserviere frühzeitig einen Tisch am Hafen; unser <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide für Alcúdia</a> bietet Optionen für das Abendessen vor jedem Abend-Event</li>
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
<li><strong>Dîner :</strong> réservez une table à l'avance au port ; notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants d'Alcúdia</a> propose des options pour dîner avant tout événement nocturne</li>
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
<li><strong>Cena:</strong> prenota un tavolo in anticipo al porto; la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti di Alcúdia</a> offre opzioni per cenare prima di qualsiasi evento serale</li>
<li><strong>Pre-evento:</strong> <a href="/enjoy">Enjoy Terrace</a> apre dalle 17:00, ideale per cocktail e shisha prima delle feste</li>
<li><strong>Trasporto:</strong> durante le feste principali, il servizio di autobus e taxi viene ampliato</li>
<li><strong>Lingua:</strong> Alcudia e' molto internazionale, ti muoverai bene in spagnolo, inglese e tedesco</li>
</ul>

<h2>Un'estate da ricordare</h2>
<p>Alcudia combina tradizione e modernita' in un modo che poche destinazioni riescono a ottenere. Puoi vivere l'autenticita' di feste patronali centenarie nel pomeriggio e finire in un club con produzione di primo livello la sera. Questa e' la magia di questo angolo del nord di Maiorca.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-25",
    updated: "2026-08-29",
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

<h2>Un aviso: Hiru, la referencia de las cenas tardias, cerro en 2026</h2>
<p>Durante anos, <a href="/hiru">Hiru Food &amp; Drinks</a> fue la respuesta facil a esta pregunta: cocina completa hasta las 23:30 entre semana y hasta la 1:00 los viernes y sabados, con la carta integra a cualquier hora. En agosto de 2026 cerro definitivamente sus puertas; le hemos dedicado una <a href="/blog/hiru-food-drinks-restaurante-alcudia">despedida y homenaje</a>. Las opciones que siguen estan actualizadas a dia de hoy.</p>

<h2>Por qué cenar tarde tiene sentido en Mallorca</h2>
<p>El ritmo de vida en Mallorca durante el verano invita a cenar tarde. Los días son largos, el sol no se pone hasta las 21:30, y la temperatura es más agradable a partir de las 22:00. Cenar a las 23:00 no es una excentricidad: es adaptarse al ritmo natural de la isla. Además, si planeas salir de noche, cenar tarde te permite disfrutar del día completo en la playa o de excursión sin interrupciones.</p>

<h2>La cena como preludio de la noche</h2>
<p>Cenar tarde en Port d'Alcudia es tambien una estrategia inteligente para la noche. Despues de una buena cena, el siguiente paso natural es un coctel o una copa. <a href="/enjoy">Enjoy Terrace</a>, en Av. Tucan 1, esta abierta hasta las 05:30 con cocteles de autor y shisha premium. Y si la noche pide mas, <a href="/outxide">Outxide Club</a> abre a las 23:00 de jueves a sabado.</p>

<h3>La secuencia perfecta para un viernes o sábado</h3>
<ul>
<li><strong>22:30 - 00:00:</strong> cena tardia en uno de los restaurantes del paseo maritimo</li>
<li><strong>00:00 - 01:30:</strong> cócteles y shisha en Enjoy Terrace</li>
<li><strong>01:30 en adelante:</strong> baile en Outxide Club hasta el amanecer</li>
</ul>

<h2>Otras opciones para cenar tarde en la zona</h2>
<p>El paseo maritimo de Port d'Alcudia tiene varios restaurantes que mantienen horarios amplios durante el verano. Los bares de tapas y algunos restaurantes italianos de la zona tambien sirven platos ligeros hasta tarde, y la zona del puerto deportivo tiene opciones informales para quienes buscan algo rapido. En temporada alta, pregunta siempre hasta que hora sirve la cocina antes de sentarte.</p>

<h2>Consejos para cenar tarde en Alcúdia</h2>
<ul>
<li><strong>Reserva siempre:</strong> las mesas para cenas tardías los fines de semana se agotan rápido</li>
<li><strong>No tengas prisa:</strong> cenar tarde en Mallorca es un ritual, disfruta cada plato</li>
<li><strong>Pregunta por las sugerencias del día:</strong> el pescado y el producto fresco cambian a diario</li>
<li><strong>Lleva ropa cómoda pero arreglada:</strong> si piensas ir al club después, viste para ambas ocasiones</li>
</ul>`,
      en: `<p>One of the great challenges of a summer holiday is finding somewhere to eat late. Many restaurants close the kitchen at 22:00 or even earlier, just when the night is starting to come alive. In Port d'Alcudia, however, there are options for those who prefer to dine at a relaxed pace, without rushing, at hours the rest of the world considers late.</p>

<h2>A heads-up: Hiru, the late-dinner reference, closed in 2026</h2>
<p>For years, <a href="/hiru">Hiru Food &amp; Drinks</a> was the easy answer to this question: full kitchen until 23:30 on weekdays and until 1:00 on Fridays and Saturdays, with the complete menu at any hour. In August 2026 it closed its doors for good; we've dedicated a <a href="/blog/hiru-food-drinks-restaurante-alcudia">farewell tribute</a> to it. The options below are up to date.</p>

<h2>Why late dining makes sense in Mallorca</h2>
<p>The pace of life in Mallorca during summer invites late dining. Days are long, the sun does not set until 21:30, and the temperature is more pleasant from 22:00 onwards. Eating at 23:00 is not eccentric: it is adapting to the island's natural rhythm. Moreover, if you are planning a night out, eating late allows you to enjoy a full day at the beach or on an excursion without interruption.</p>

<h2>Dinner as a prelude to the night</h2>
<p>Eating late in Port d'Alcudia is also a smart strategy for the night. After a good dinner, the natural next step is a cocktail or a drink. <a href="/enjoy">Enjoy Terrace</a>, at Av. Tucan 1, is open until 05:30 with signature cocktails and premium shisha. And if the night calls for more, <a href="/outxide">Outxide Club</a> opens at 23:00 from Thursday to Saturday.</p>

<h3>The perfect Friday or Saturday sequence</h3>
<ul>
<li><strong>22:30 - 00:00:</strong> late dinner at one of the seafront restaurants</li>
<li><strong>00:00 - 01:30:</strong> cocktails and shisha at Enjoy Terrace</li>
<li><strong>01:30 onwards:</strong> dancing at Outxide Club until sunrise</li>
</ul>

<h2>Other late dining options in the area</h2>
<p>The Port d'Alcudia seafront has several restaurants that keep long hours during the summer. The area's tapas bars and some Italian restaurants also serve light dishes late, and the marina area has informal options for those after something quick. In high season, always ask how late the kitchen serves before sitting down.</p>

<h2>Tips for late dining in Alcudia</h2>
<ul>
<li><strong>Always book:</strong> tables for late weekend dinners sell out quickly</li>
<li><strong>Do not rush:</strong> late dining in Mallorca is a ritual, savour every course</li>
<li><strong>Ask about daily specials:</strong> the fish and fresh produce change daily</li>
<li><strong>Dress smart-casual:</strong> if you plan to hit the club afterwards, dress for both occasions</li>
</ul>`,
      de: `<p>Eine der großen Herausforderungen im Sommerurlaub ist es, spät am Abend noch ein gutes Restaurant zu finden. Viele Küchen schließen um 22:00 Uhr oder sogar früher -- genau dann, wenn die Nacht erst beginnt. In Port d'Alcudia gibt es jedoch Optionen für alle, die lieber in Ruhe und ohne Hektik zu Abend essen, auch zu Uhrzeiten, die anderswo als spät gelten.</p>

<h2>Ein Hinweis: Hiru, die Referenz für späte Abendessen, hat 2026 geschlossen</h2>
<p>Jahrelang war <a href="/hiru">Hiru Food &amp; Drinks</a> die einfache Antwort auf diese Frage: volle Küche bis 23:30 Uhr unter der Woche und bis 1:00 Uhr freitags und samstags, mit der kompletten Karte zu jeder Stunde. Im August 2026 hat es endgültig geschlossen; wir haben ihm eine <a href="/blog/hiru-food-drinks-restaurante-alcudia">Abschieds-Hommage</a> gewidmet. Die folgenden Optionen sind auf dem aktuellen Stand.</p>

<h2>Warum spätes Essen auf Mallorca Sinn macht</h2>
<p>Der Lebensrhythmus auf Mallorca im Sommer lädt zum späten Essen ein. Die Tage sind lang, die Sonne geht erst um 21:30 Uhr unter, und die Temperatur wird ab 22:00 Uhr angenehmer. Um 23:00 Uhr zu essen ist keine Extravaganz: es ist die Anpassung an den natürlichen Rhythmus der Insel. Außerdem kannst du, wenn du abends ausgehen willst, den ganzen Tag am Strand oder bei einem Ausflug genießen, ohne Unterbrechung.</p>

<h2>Das Abendessen als Auftakt der Nacht</h2>
<p>Spät zu Abend zu essen ist in Port d'Alcudia auch eine kluge Strategie für die Nacht. Nach einem guten Essen ist der nächste natürliche Schritt ein Cocktail oder ein Drink. Das <a href="/enjoy">Enjoy Terrace</a> in der Av. Tucan 1 hat bis 05:30 Uhr geöffnet, mit Signature-Cocktails und Premium-Shisha. Und wenn die Nacht mehr verlangt, öffnet der <a href="/outxide">Outxide Club</a> von Donnerstag bis Samstag um 23:00 Uhr.</p>

<h3>Der perfekte Freitag- oder Samstagabend</h3>
<ul>
<li><strong>22:30 - 00:00:</strong> spätes Abendessen in einem der Restaurants an der Promenade</li>
<li><strong>00:00 - 01:30:</strong> Cocktails und Shisha in der Enjoy Terrace</li>
<li><strong>Ab 01:30:</strong> tanzen im Outxide Club bis zum Sonnenaufgang</li>
</ul>

<h2>Weitere Möglichkeiten für spätes Essen in der Umgebung</h2>
<p>An der Promenade von Port d'Alcudia halten mehrere Restaurants im Sommer lange Öffnungszeiten. Die Tapas-Bars und einige italienische Restaurants der Gegend servieren ebenfalls bis spät leichte Gerichte, und rund um den Sporthafen gibt es informelle Optionen für alle, die etwas Schnelles suchen. Frag in der Hochsaison immer, bis wann die Küche serviert, bevor du dich setzt.</p>

<h2>Tipps für spätes Essen in Alcudia</h2>
<ul>
<li><strong>Immer reservieren:</strong> Tische für späte Wochenendessen sind schnell vergeben</li>
<li><strong>Keine Eile:</strong> spätes Essen auf Mallorca ist ein Ritual -- genieße jeden Gang</li>
<li><strong>Frag nach den Tagesempfehlungen:</strong> Fisch und frische Produkte wechseln täglich</li>
<li><strong>Smart-Casual anziehen:</strong> wenn du danach in den Club willst, kleide dich für beides passend</li>
</ul>`,
      fr: `<p>L'un des grands defis des vacances d'ete est de trouver ou diner tard. De nombreux restaurants ferment la cuisine a 22h00 voire plus tot, juste au moment ou la nuit commence a s'animer. A Port d'Alcudia, cependant, il existe des options pour ceux qui preferent diner tranquillement, sans se presser, a des heures que le reste du monde considere comme tardives.</p>

<h2>Un avertissement : Hiru, la référence du dîner tardif, a fermé en 2026</h2>
<p>Pendant des années, <a href="/hiru">Hiru Food &amp; Drinks</a> a été la réponse facile à cette question : cuisine complète jusqu'à 23h30 en semaine et jusqu'à 1h00 les vendredis et samedis, avec la carte intégrale à toute heure. En août 2026, il a définitivement fermé ses portes ; nous lui avons dédié un <a href="/blog/hiru-food-drinks-restaurante-alcudia">hommage d'adieu</a>. Les options ci-dessous sont à jour.</p>

<h2>Pourquoi diner tard a du sens a Majorque</h2>
<p>Le rythme de vie a Majorque en ete invite a diner tard. Les journees sont longues, le soleil ne se couche qu'a 21h30 et la temperature devient plus agreable a partir de 22h00. Diner a 23h00 n'est pas une excentricite : c'est s'adapter au rythme naturel de l'ile. De plus, si vous prevoyez de sortir le soir, diner tard vous permet de profiter pleinement de la journee a la plage ou en excursion sans interruption.</p>

<h2>Le diner comme prelude a la nuit</h2>
<p>Dîner tard à Port d'Alcudia est aussi une stratégie intelligente pour la nuit. Après un bon dîner, l'étape naturelle suivante est un cocktail ou un verre. L'<a href="/enjoy">Enjoy Terrace</a>, Av. Tucan 1, est ouverte jusqu'à 05h30 avec cocktails signature et chicha premium. Et si la nuit en demande plus, l'<a href="/outxide">Outxide Club</a> ouvre à 23h00 du jeudi au samedi.</p>

<h3>La sequence parfaite pour un vendredi ou samedi</h3>
<ul>
<li><strong>22h30 - 00h00 :</strong> dîner tardif dans l'un des restaurants du front de mer</li>
<li><strong>00h00 - 01h30 :</strong> cocktails et chicha a Enjoy Terrace</li>
<li><strong>A partir de 01h30 :</strong> danser a Outxide Club jusqu'a l'aube</li>
</ul>

<h2>Autres options pour diner tard dans la zone</h2>
<p>Le front de mer de Port d'Alcudia compte plusieurs restaurants aux horaires étendus pendant l'été. Les bars à tapas et certains restaurants italiens de la zone servent aussi des plats légers jusqu'à tard, et le port de plaisance offre des options informelles pour ceux qui cherchent quelque chose de rapide. En haute saison, demandez toujours jusqu'à quelle heure la cuisine sert avant de vous installer.</p>

<h2>Conseils pour diner tard a Alcudia</h2>
<ul>
<li><strong>Reservez toujours :</strong> les tables pour les diners tardifs du week-end partent vite</li>
<li><strong>Ne vous pressez pas :</strong> diner tard a Majorque est un rituel, savourez chaque plat</li>
<li><strong>Demandez les suggestions du jour :</strong> le poisson et les produits frais changent quotidiennement</li>
<li><strong>Habillez-vous smart-casual :</strong> si vous comptez aller en club ensuite, habillez-vous pour les deux occasions</li>
</ul>`,
      it: `<p>Una delle grandi sfide delle vacanze estive e' trovare dove cenare tardi. Molti ristoranti chiudono la cucina alle 22:00 o addirittura prima, proprio quando la notte inizia a prendere vita. A Port d'Alcudia, tuttavia, ci sono opzioni per chi preferisce cenare con calma, senza fretta e ad orari che il resto del mondo considera tardivi.</p>

<h2>Un avviso: Hiru, la referenza delle cene tardive, ha chiuso nel 2026</h2>
<p>Per anni <a href="/hiru">Hiru Food &amp; Drinks</a> è stato la risposta facile a questa domanda: cucina completa fino alle 23:30 in settimana e fino all'1:00 venerdì e sabato, con il menu integrale a qualsiasi ora. Nell'agosto 2026 ha chiuso definitivamente; gli abbiamo dedicato un <a href="/blog/hiru-food-drinks-restaurante-alcudia">omaggio d'addio</a>. Le opzioni che seguono sono aggiornate.</p>

<h2>Perche' cenare tardi ha senso a Maiorca</h2>
<p>Il ritmo di vita a Maiorca durante l'estate invita a cenare tardi. Le giornate sono lunghe, il sole non tramonta fino alle 21:30, e la temperatura e' piu' gradevole a partire dalle 22:00. Cenare alle 23:00 non e' un'eccentricita': e' adattarsi al ritmo naturale dell'isola. Inoltre, se hai in programma di uscire la sera, cenare tardi ti permette di goderti l'intera giornata in spiaggia o in escursione senza interruzioni.</p>

<h2>La cena come preludio della serata</h2>
<p>Cenare tardi a Port d'Alcudia è anche una strategia intelligente per la notte. Dopo una buona cena, il passo successivo naturale è un cocktail o un drink. L'<a href="/enjoy">Enjoy Terrace</a>, in Av. Tucan 1, è aperta fino alle 05:30 con cocktail d'autore e shisha premium. E se la notte chiede di più, l'<a href="/outxide">Outxide Club</a> apre alle 23:00 dal giovedì al sabato.</p>

<h3>La sequenza perfetta per un venerdi' o sabato</h3>
<ul>
<li><strong>22:30 - 00:00:</strong> cena tardiva in uno dei ristoranti del lungomare</li>
<li><strong>00:00 - 01:30:</strong> cocktail e shisha da Enjoy Terrace</li>
<li><strong>Dall'01:30 in poi:</strong> ballare all'Outxide Club fino all'alba</li>
</ul>

<h2>Altre opzioni per cenare tardi nella zona</h2>
<p>Il lungomare di Port d'Alcudia ha diversi ristoranti con orari lunghi durante l'estate. I bar di tapas e alcuni ristoranti italiani della zona servono piatti leggeri fino a tardi, e la zona del porto turistico offre opzioni informali per chi cerca qualcosa di veloce. In alta stagione, chiedi sempre fino a che ora serve la cucina prima di sederti.</p>

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
    updated: "2026-08-29",
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
<p>Una de las grandes ventajas de Enjoy Terrace es su ubicación estratégica. Para quienes quieran cenar, el puerto ofrece buenas mesas a poca distancia: nuestra <a href="/blog/donde-cenar-tarde-port-alcudia">guía para cenar tarde en Port d'Alcúdia</a> te ayuda a elegir. Y para los que buscan alargar la noche, <a href="/outxide">Outxide Club</a> está justo al lado, con las mejores sesiones de DJ del norte de Mallorca de jueves a sábado.</p>`,
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
<p>One of Enjoy Terrace's great advantages is its strategic location. If you fancy dinner, there are good tables a short walk away: our <a href="/blog/donde-cenar-tarde-port-alcudia">guide to late dinners in Port d'Alcúdia</a> will help you choose. And for those looking to extend the night, <a href="/outxide">Outxide Club</a> is right next door, with the best DJ sessions in northern Mallorca from Thursday to Saturday.</p>`,
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
<p>Einer der großen Vorteile der Enjoy Terrace ist ihre strategische Lage. Wer zu Abend essen möchte, findet gute Restaurants in kurzer Entfernung: Unser <a href="/blog/donde-cenar-tarde-port-alcudia">Guide zum späten Abendessen in Port d'Alcúdia</a> hilft bei der Wahl. Und wer die Nacht verlängern will, hat mit dem <a href="/outxide">Outxide Club</a> direkt nebenan die besten DJ-Sessions im Norden Mallorcas, von Donnerstag bis Samstag.</p>`,
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
<p>L'un des grands avantages d'Enjoy Terrace est son emplacement strategique. Pour dîner, de bonnes tables se trouvent à quelques pas : notre <a href="/blog/donde-cenar-tarde-port-alcudia">guide pour dîner tard à Port d'Alcúdia</a> vous aidera à choisir. Et pour ceux qui veulent prolonger la nuit, <a href="/outxide">Outxide Club</a> est juste a cote, avec les meilleures sessions DJ du nord de Majorque du jeudi au samedi.</p>`,
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
<p>Uno dei grandi vantaggi di Enjoy Terrace e' la sua posizione strategica. Per chi vuole cenare, ci sono buoni tavoli a pochi passi: la nostra <a href="/blog/donde-cenar-tarde-port-alcudia">guida per cenare tardi a Port d'Alcúdia</a> ti aiuta a scegliere. E per chi cerca di prolungare la serata, <a href="/outxide">Outxide Club</a> e' proprio accanto, con le migliori sessioni DJ del nord di Maiorca da giovedi' a sabato.</p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-15",
    updated: "2026-08-29",
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

<h3>21:00 - Cena mediterránea en el puerto</h3>
<p>Para cenar, el puerto ofrece cocina a la brasa, arroces y pescados del Mediterráneo en varios restaurantes con comedor interior y terraza. Consulta nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guía de restaurantes de Alcúdia</a> y reserva con antelación en temporada alta.</p>

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

<h3>21:00 - Mediterranean dinner by the port</h3>
<p>For dinner, the port offers charcoal-grilled cooking, rice dishes and Mediterranean fish at several restaurants with indoor dining and terraces. Check our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to restaurants in Alcúdia</a> and book ahead in high season.</p>

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

<h3>21:00 Uhr -- Mediterranes Abendessen am Hafen</h3>
<p>Zum Abendessen bietet der Hafen Grillküche, Reisgerichte und Mittelmeerfisch in mehreren Restaurants mit Innenbereich und Terrasse. Wirf einen Blick in unseren <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide für Alcúdia</a> und reserviere in der Hochsaison rechtzeitig.</p>

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
<p>Viele deutsche Urlauber fragen sich, ob sie für das Nachtleben nach Palma oder Magaluf fahren müssen. Die kurze Antwort: Nein. Alcudia bietet eine eigenständige Ausgehszene, die alles hat, was du brauchst -- ohne die Massen und langen Wege des Südens. Der Outxide Club bringt erstklassige DJs in den Norden, und die Kombination aus Enjoy Terrace und dem Club macht eine Nacht komplett, ohne dass du je ein Taxi rufen musst.</p>

<h2>Für deutsche Urlauber: gut zu wissen</h2>
<p>Alcudia ist seit Jahrzehnten ein beliebtes Ziel für deutsche Urlauber, und das Nachtleben spiegelt das wider. Viele Lokale haben deutschsprachiges Personal, und du wirst dich sprachlich problemlos zurechtfinden. Die Direktflüge aus vielen deutschen Städten nach Palma machen die Anreise einfach, und vom Flughafen nach Alcudia sind es etwa 50 Minuten mit dem Transfer. Mallorca ist mehr als nur Ballermann -- und Alcudia beweist das jeden Abend.</p>`,
      fr: `<p>Port d'Alcudia s'est positionne comme la destination nocturne la plus complete du nord de Majorque. Loin du tourisme de masse du sud, Alcudia offre une scene de loisirs nocturnes qui allie qualite, variete et ambiance internationale. Ce guide vous emmene pas a pas a travers la soiree parfaite a Alcudia.</p>

<h2>Le plan parfait : de la terrasse au club</h2>
<p>La nuit a Alcudia a son propre rythme qui merite d'etre suivi. Le plan ideal commence au coucher du soleil et peut se prolonger jusqu'a l'aube.</p>

<h3>17h00 - Cocktails au coucher du soleil a Enjoy Terrace</h3>
<p>La nuit commence a <a href="/enjoy">Enjoy Terrace</a>, au Av. Tucan 1. Ouverture a 17h00, c'est l'endroit ideal pour commencer avec un cocktail signature et une chicha premium tandis que le soleil descend sur Port d'Alcudia. L'ambiance est sophistiquee mais decontractee, avec de la musique chill et une terrasse concue pour profiter sans se presser.</p>

<h3>21h00 - Diner mediterraneen au port</h3>
<p>Pour le diner, le port offre cuisine a la braise, riz et poissons de Mediterranee dans plusieurs restaurants avec salle et terrasse. Consultez notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants d'Alcudia</a> et reservez a l'avance en haute saison.</p>

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

<h3>21:00 - Cena mediterranea al porto</h3>
<p>Per cena, il porto offre cucina alla brace, risi e pesci del Mediterraneo in diversi ristoranti con sala interna e terrazza. Consulta la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti di Alcudia</a> e prenota in anticipo in alta stagione.</p>

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
    updated: "2026-08-29",
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
<p><a href="/outxide">Outxide Club</a> es la discoteca de referencia en el norte de Mallorca. Ubicada en la Av. Tucan 1, Port d'Alcudia, Outxide ofrece una experiencia de club premium que combina un sistema de sonido de primer nivel, produccion visual profesional y una seleccion musical cuidada que abarca house, tech house, techno y reggaeton. El club forma parte de <a href="/">Grupo Enjoy</a>, junto con <a href="/enjoy">Enjoy Terrace</a>.</p>

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
<p>La combinación ganadora es empezar con una cena tranquila en el puerto (nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guía de restaurantes de Alcúdia</a> te ayuda a elegir), continuar con cocktails al atardecer en <a href="/enjoy">Enjoy Terrace</a> y terminar la noche bailando en Outxide Club. Enjoy y Outxide comparten ubicación en Av. Tucán 1, así que la noche fluye de forma natural sin coches ni taxis.</p>

<h2>Outxide Club vs Otras Discotecas de Mallorca</h2>
<p>Frente a las macrodiscotecas de Magaluf o Palma, Outxide Club ofrece una alternativa premium: sonido de calidad, ambiente selecto, produccion cuidada y una ubicacion privilegiada junto al mar en Port d'Alcudia. No es una fiesta masiva; es una experiencia de club pensada para quienes valoran la calidad por encima de la cantidad.</p>

<h2>Mas Guias sobre Vida Nocturna en Alcudia</h2>
<p>Si quieres descubrir mas opciones de ocio nocturno, consulta nuestra <a href="/blog/guia-vida-nocturna-alcudia">guia completa de vida nocturna en Alcudia</a>, la seleccion de las <a href="/blog/mejores-discotecas-clubs-alcudia">mejores discotecas y clubs de Alcudia</a> y nuestro calendario de <a href="/blog/fiestas-eventos-verano-alcudia-2026">fiestas y eventos del verano 2026</a>. Y para cenar antes de la fiesta, no te pierdas la guia de los <a href="/blog/mejores-restaurantes-alcudia-mallorca">mejores restaurantes en Alcudia</a>.</p>

<p><strong>Outxide Club — Av. Tucan 1, Port d'Alcudia, Mallorca. Jueves, viernes y sabado. <a href="/outxide">Visita nuestra web para mas informacion y entradas.</a></strong></p>`,

      en: `<p>Looking for information about <strong>Outxide Club</strong>? You are on the official website of Grupo Enjoy, the company behind Outxide Club in Port d'Alcudia, Mallorca. Here you will find everything you need to know before your visit: from how to get here to what to expect from a night at Outxide.</p>

<h2>What Is Outxide Club</h2>
<p><a href="/outxide">Outxide Club</a> is the premier nightclub in northern Mallorca. Located at Av. Tucan 1, Port d'Alcudia, Outxide delivers a premium clubbing experience combining a top-tier sound system, professional visual production and a carefully curated music selection spanning house, tech house, techno and reggaeton. The club is part of <a href="/">Grupo Enjoy</a>, alongside <a href="/enjoy">Enjoy Terrace</a>.</p>

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
<p>The winning combination is to start with a relaxed dinner by the port (our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to restaurants in Alcúdia</a> will help you choose), carry on with sunset cocktails at <a href="/enjoy">Enjoy Terrace</a> and end the night dancing at Outxide Club. Enjoy and Outxide share the same spot at Av. Tucán 1, so the night flows naturally with no cars or taxis needed.</p>

<h2>Outxide Club vs Other Mallorca Nightclubs</h2>
<p>Compared to the mega-clubs of Magaluf or Palma, Outxide Club offers a premium alternative: quality sound, a selective atmosphere, polished production and a privileged location by the sea in Port d'Alcudia. It is not a massive rave; it is a club experience designed for those who value quality over quantity.</p>

<h2>More Nightlife Guides for Alcudia</h2>
<p>Discover more options in our <a href="/blog/guia-vida-nocturna-alcudia">complete nightlife guide to Alcudia</a>, browse the <a href="/blog/mejores-discotecas-clubs-alcudia">best clubs and discos in Alcudia</a> and check out the <a href="/blog/fiestas-eventos-verano-alcudia-2026">summer 2026 events calendar</a>. For dinner before the party, see our guide to the <a href="/blog/mejores-restaurantes-alcudia-mallorca">best restaurants in Alcudia</a>.</p>

<p><strong>Outxide Club — Av. Tucan 1, Port d'Alcudia, Mallorca. Thursday, Friday and Saturday. <a href="/outxide">Visit our website for more information and tickets.</a></strong></p>`,

      de: `<p>Sie suchen Informationen ueber <strong>Outxide Club</strong>? Sie sind auf der offiziellen Website von Grupo Enjoy, dem Unternehmen hinter dem Outxide Club in Port d'Alcudia, Mallorca. Hier finden Sie alles, was Sie vor Ihrem Besuch wissen muessen: von der Anreise bis zu dem, was Sie bei einer Nacht im Outxide erwartet.</p>

<h2>Was ist der Outxide Club</h2>
<p><a href="/outxide">Outxide Club</a> ist der fuehrende Nachtclub im Norden Mallorcas. In der Av. Tucan 1, Port d'Alcudia gelegen, bietet Outxide ein Premium-Cluberlebnis mit erstklassigem Soundsystem, professioneller visueller Produktion und sorgfaeltig kuratierter Musik von House ueber Tech House und Techno bis Reggaeton. Der Club gehoert zu <a href="/">Grupo Enjoy</a>, zusammen mit <a href="/enjoy">Enjoy Terrace</a>.</p>

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
<p>Die Gewinnerkombination: Beginne mit einem entspannten Abendessen am Hafen (unser <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide für Alcúdia</a> hilft bei der Wahl), weiter mit Cocktails zum Sonnenuntergang im <a href="/enjoy">Enjoy Terrace</a> und zum Abschluss Tanzen im Outxide Club. Enjoy und Outxide teilen sich den Standort in der Av. Tucán 1 — die Nacht fließt ganz natürlich, ohne Auto oder Taxi.</p>

<p><strong>Outxide Club — Av. Tucan 1, Port d'Alcudia, Mallorca. Donnerstag, Freitag und Samstag. <a href="/outxide">Besuchen Sie unsere Website fuer weitere Informationen und Tickets.</a></strong></p>`,

      fr: `<p>Vous cherchez des informations sur <strong>Outxide Club</strong> ? Vous etes sur le site officiel de Grupo Enjoy, l'entreprise derrière Outxide Club à Port d'Alcudia, Majorque. Voici tout ce que vous devez savoir avant votre visite : de comment y arriver à ce qui vous attend lors d'une soiree à Outxide.</p>

<h2>Qu'est-ce que Outxide Club</h2>
<p><a href="/outxide">Outxide Club</a> est la discothèque de reference dans le nord de Majorque. Situe Av. Tucan 1, Port d'Alcudia, Outxide offre une experience clubbing premium combinant un système sonore de premier plan, une production visuelle professionnelle et une selection musicale soignee allant de la house au tech house, techno et reggaeton. Le club fait partie de <a href="/">Grupo Enjoy</a>, aux cotes de <a href="/enjoy">Enjoy Terrace</a>.</p>

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
<p>La combinaison gagnante : commencez par un dîner tranquille au port (notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants d'Alcúdia</a> vous aidera à choisir), poursuivez avec des cocktails au coucher du soleil à l'<a href="/enjoy">Enjoy Terrace</a> et terminez la nuit en dansant à l'Outxide Club. Enjoy et Outxide partagent la même adresse, Av. Tucán 1 : la soirée s'enchaîne naturellement, sans voiture ni taxi.</p>

<p><strong>Outxide Club — Av. Tucan 1, Port d'Alcudia, Majorque. Jeudi, vendredi et samedi. <a href="/outxide">Visitez notre site pour plus d'informations et billets.</a></strong></p>`,

      it: `<p>Cercate informazioni su <strong>Outxide Club</strong>? Siete sul sito ufficiale di Grupo Enjoy, l'azienda che gestisce Outxide Club a Port d'Alcudia, Maiorca. Qui troverete tutto cio' che dovete sapere prima della vostra visita: da come arrivare a cosa aspettarvi da una serata all'Outxide.</p>

<h2>Cos'e' Outxide Club</h2>
<p><a href="/outxide">Outxide Club</a> e' la discoteca di riferimento nel nord di Maiorca. Situato in Av. Tucan 1, Port d'Alcudia, Outxide offre un'esperienza di clubbing premium che combina un impianto audio di primo livello, produzione visiva professionale e una selezione musicale curata che spazia da house, tech house, techno e reggaeton. Il club fa parte di <a href="/">Grupo Enjoy</a>, insieme a <a href="/enjoy">Enjoy Terrace</a>.</p>

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
<p>La combinazione vincente: inizia con una cena tranquilla al porto (la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti di Alcúdia</a> ti aiuta a scegliere), prosegui con i cocktail al tramonto all'<a href="/enjoy">Enjoy Terrace</a> e chiudi la notte ballando all'Outxide Club. Enjoy e Outxide condividono la posizione in Av. Tucán 1: la serata scorre naturale, senza auto né taxi.</p>

<p><strong>Outxide Club — Av. Tucan 1, Port d'Alcudia, Maiorca. Giovedi', venerdi' e sabato. <a href="/outxide">Visitate il nostro sito per maggiori informazioni e biglietti.</a></strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    updated: "2026-08-29",
    image: "/images/outxide/DSCF8530-21.jpg",
    tags: ["outxide", "clubs", "nightlife", "alcudia", "mallorca"],
    venue: "outxide",
    faq: [
      {
        question: {
          es: "¿Qué días abre Outxide Club?",
          en: "What days is Outxide Club open?",
          de: "An welchen Tagen ist der Outxide Club geöffnet?",
          fr: "Quels jours l'Outxide Club est-il ouvert ?",
          it: "In che giorni è aperto l'Outxide Club?",
        },
        answer: {
          es: "Outxide Club abre de jueves a sábado desde las 23:00 en Port d'Alcúdia. Consulta la agenda de eventos para fechas y fiestas especiales.",
          en: "Outxide Club is open Thursday to Saturday from 23:00 in Port d'Alcúdia. Check the events calendar for special dates and parties.",
          de: "Der Outxide Club ist von Donnerstag bis Samstag ab 23:00 Uhr in Port d'Alcúdia geöffnet. Termine und Sonderpartys findest du im Veranstaltungskalender.",
          fr: "L'Outxide Club est ouvert du jeudi au samedi à partir de 23h00 à Port d'Alcúdia. Consultez l'agenda des événements pour les dates et soirées spéciales.",
          it: "L'Outxide Club è aperto dal giovedì al sabato dalle 23:00 a Port d'Alcúdia. Consulta il calendario eventi per date e feste speciali.",
        },
      },
      {
        question: {
          es: "¿Cómo se compran las entradas de Outxide?",
          en: "How do I buy tickets for Outxide?",
          de: "Wie kaufe ich Tickets für das Outxide?",
          fr: "Comment acheter des billets pour l'Outxide ?",
          it: "Come si comprano i biglietti per l'Outxide?",
        },
        answer: {
          es: "Las entradas y los reservados VIP se compran online a través de FourVenues. El precio varía según el evento y el DJ de cada noche.",
          en: "Tickets and VIP tables are purchased online through FourVenues. The price varies depending on the event and the DJ of the night.",
          de: "Tickets und VIP-Tische werden online über FourVenues gekauft. Der Preis variiert je nach Event und DJ des Abends.",
          fr: "Les billets et les tables VIP s'achètent en ligne via FourVenues. Le prix varie selon l'événement et le DJ de la soirée.",
          it: "I biglietti e i tavoli VIP si acquistano online tramite FourVenues. Il prezzo varia in base all'evento e al DJ della serata.",
        },
      },
      {
        question: {
          es: "¿Cuál es la edad mínima para entrar en Outxide?",
          en: "What is the minimum age to enter Outxide?",
          de: "Was ist das Mindestalter für den Eintritt ins Outxide?",
          fr: "Quel est l'âge minimum pour entrer à l'Outxide ?",
          it: "Qual è l'età minima per entrare all'Outxide?",
        },
        answer: {
          es: "Outxide es una discoteca para mayores de 18 años. Puede solicitarse un documento de identidad en la puerta.",
          en: "Outxide is a nightclub for over-18s. Photo ID may be requested at the door.",
          de: "Das Outxide ist ein Nachtclub ab 18 Jahren. Am Eingang kann ein Ausweis verlangt werden.",
          fr: "L'Outxide est une discothèque réservée aux plus de 18 ans. Une pièce d'identité peut être demandée à l'entrée.",
          it: "L'Outxide è una discoteca per maggiori di 18 anni. All'ingresso può essere richiesto un documento d'identità.",
        },
      },
      {
        question: {
          es: "¿Dónde está Outxide Club?",
          en: "Where is Outxide Club located?",
          de: "Wo befindet sich der Outxide Club?",
          fr: "Où se trouve l'Outxide Club ?",
          it: "Dove si trova l'Outxide Club?",
        },
        answer: {
          es: "Outxide Club está en la Av. Tucán 1, Port d'Alcúdia (Mallorca), la misma ubicación que la terraza de Enjoy.",
          en: "Outxide Club is at Av. Tucán 1, Port d'Alcúdia (Mallorca), the same location as the Enjoy terrace.",
          de: "Der Outxide Club liegt in der Av. Tucán 1, Port d'Alcúdia (Mallorca), am selben Standort wie die Enjoy-Terrasse.",
          fr: "L'Outxide Club se trouve Av. Tucán 1, Port d'Alcúdia (Majorque), au même endroit que la terrasse d'Enjoy.",
          it: "L'Outxide Club si trova in Av. Tucán 1, Port d'Alcúdia (Maiorca), nella stessa sede della terrazza di Enjoy.",
        },
      },
    ],
    readingTime: 8,
  },
  {
    slug: "hiru-food-drinks-restaurante-alcudia",
    title: {
      es: "Hiru Food & Drinks: despedida y homenaje a nuestro restaurante a la brasa en Alcúdia",
      en: "Hiru Food & Drinks: A Farewell Tribute to Our Charcoal Grill Restaurant in Alcúdia",
      de: "Hiru Food & Drinks: Abschied und Hommage an unser Grillrestaurant in Alcúdia",
      fr: "Hiru Food & Drinks : adieu et hommage à notre restaurant de braise à Alcúdia",
      it: "Hiru Food & Drinks: addio e omaggio al nostro ristorante alla brace ad Alcúdia",
    },
    excerpt: {
      es: "Hiru Food & Drinks cerró definitivamente sus puertas en agosto de 2026. Recordamos lo que hizo especial a nuestro restaurante a la brasa de Port d'Alcúdia: carnes dry-aged, paella de marisco y una terraza inolvidable. Gracias por todo.",
      en: "Hiru Food & Drinks closed its doors for good in August 2026. We look back at what made our charcoal grill restaurant in Port d'Alcúdia special: dry-aged meats, seafood paella and an unforgettable terrace. Thank you for everything.",
      de: "Hiru Food & Drinks hat im August 2026 endgültig seine Türen geschlossen. Wir erinnern uns an das, was unser Grillrestaurant in Port d'Alcúdia besonders machte: Dry-Aged-Fleisch, Meeresfrüchte-Paella und eine unvergessliche Terrasse. Danke für alles.",
      fr: "Hiru Food & Drinks a définitivement fermé ses portes en août 2026. Retour sur ce qui rendait notre restaurant de braise de Port d'Alcúdia si spécial : viandes dry-aged, paella de fruits de mer et une terrasse inoubliable. Merci pour tout.",
      it: "Hiru Food & Drinks ha chiuso definitivamente le sue porte nell'agosto 2026. Ricordiamo ciò che rendeva speciale il nostro ristorante alla brace di Port d'Alcúdia: carni dry-aged, paella di frutti di mare e una terrazza indimenticabile. Grazie di tutto.",
    },
    content: {
      es: `<p><strong>Nota: Hiru Food &amp; Drinks cerró definitivamente sus puertas en agosto de 2026.</strong> Esta página se queda como homenaje a lo que fue nuestro restaurante a la brasa en Port d'Alcúdia. Ya no es posible reservar mesa; si buscas dónde comer hoy en la zona, consulta nuestra guía de los <a href="/blog/mejores-restaurantes-alcudia-mallorca">mejores restaurantes de Alcúdia</a>.</p>

<h2>Gracias por todo, Hiru</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> nació en la Carretera d'Artà 40 de Alcúdia con una idea sencilla: fuego, buen producto y buena gente. El nombre —"tres" en euskera— resumía sus tres pilares: producto de primera, la brasa como técnica y un ambiente donde la gastronomía y el buen rato iban de la mano. Formó parte de la familia de <a href="/">Grupo Enjoy</a> hasta su último servicio, en agosto de 2026.</p>

<h2>Lo que hizo especial a Hiru</h2>
<h3>La brasa y las carnes dry-aged</h3>
<p>Su gran especialidad fueron las carnes maduradas dry-aged: chuletón, tomahawk, entraña y costilla, piezas seleccionadas que se maduraban durante semanas y se terminaban a la brasa con madera natural. Ese sabor concentrado, a fuego lento y sin prisas, fue la seña de identidad de la casa.</p>

<h3>Arroces y paella de marisco</h3>
<p>La paella de marisco, con caldo casero y producto fresco de la lonja de Alcúdia, fue durante años uno de los platos más pedidos, junto al arroz caldoso con bogavante y el arroz negro con chipirones. Cada arroz se preparaba al momento, y esa espera formaba parte del ritual.</p>

<h3>La terraza y las sobremesas</h3>
<p>Y luego estaba la terraza: comidas familiares al mediodía, cenas de verano al aire libre, cócteles de autor y sobremesas que se alargaban hasta la madrugada. Más que un restaurante, Hiru fue un punto de encuentro en el norte de Mallorca.</p>

<h2>El espacio descansa: se está cocinando algo nuevo</h2>
<p>No lo llamamos adiós. El fuego se apaga, pero las brasas siguen calientes: el local de la Ctra. d'Artà 40 se toma un respiro mientras en Grupo Enjoy imaginamos el próximo proyecto para este rincón de Alcúdia. Todavía no hay nada confirmado; cuando lo haya, lo contaremos en esta web y en la <a href="/hiru">página de despedida de Hiru</a>.</p>

<h2>La experiencia Grupo Enjoy continúa</h2>
<p>Aunque Hiru haya cerrado, el plan en Port d'Alcúdia sigue muy vivo: cócteles de autor y shisha al atardecer en <a href="/enjoy">Enjoy Terrace</a> y fiesta hasta la madrugada en <a href="/outxide">Outxide Club</a>, ambos en Av. Tucán 1. Y si lo que buscas es mesa, nuestras guías de <a href="/blog/donde-cenar-tarde-port-alcudia">dónde cenar tarde en Port d'Alcúdia</a> y de <a href="/blog/cena-romantica-alcudia-mallorca">cenas románticas en Alcúdia</a> están actualizadas con alternativas abiertas.</p>

<p><strong>Gracias a cada persona que se sentó a nuestra mesa y al equipo que dejó el alma en cada plato. Hasta pronto.</strong></p>`,
      en: `<p><strong>Note: Hiru Food &amp; Drinks closed its doors for good in August 2026.</strong> This page remains as a tribute to what our charcoal grill restaurant in Port d'Alcúdia used to be. Table reservations are no longer possible; if you're looking for somewhere to eat in the area today, see our guide to the <a href="/blog/mejores-restaurantes-alcudia-mallorca">best restaurants in Alcúdia</a>.</p>

<h2>Thank you for everything, Hiru</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> was born at Carretera d'Artà 40 in Alcúdia with a simple idea: fire, great produce and good people. The name — "three" in Basque — summed up its three pillars: top-quality produce, charcoal grilling as a technique and an atmosphere where good food and good times went hand in hand. It was part of the <a href="/">Grupo Enjoy</a> family until its very last service, in August 2026.</p>

<h2>What made Hiru special</h2>
<h3>The grill and dry-aged meats</h3>
<p>Its great speciality was dry-aged meat: chuletón, tomahawk, skirt steak and ribs, selected cuts matured for weeks and finished over natural wood embers. That concentrated, slow-fire flavour was the house signature.</p>

<h3>Rice dishes and seafood paella</h3>
<p>The seafood paella, made with homemade stock and fresh produce from Alcúdia's fish market, was one of the most requested dishes for years, alongside the lobster rice stew and the black rice with baby squid. Every rice dish was cooked to order, and that wait was part of the ritual.</p>

<h3>The terrace and long after-dinner hours</h3>
<p>And then there was the terrace: family lunches, open-air summer dinners, signature cocktails and after-dinner conversations that stretched into the early hours. More than a restaurant, Hiru was a meeting point in northern Mallorca.</p>

<h2>The space takes a rest: something new is cooking</h2>
<p>We're not calling it goodbye. The fire goes out, but the embers stay warm: the premises at Ctra. d'Artà 40 are taking a break while Grupo Enjoy dreams up the next project for this corner of Alcúdia. Nothing is confirmed yet; when it is, we'll share it on this website and on the <a href="/hiru">Hiru farewell page</a>.</p>

<h2>The Grupo Enjoy experience continues</h2>
<p>Even with Hiru closed, the Port d'Alcúdia plan is very much alive: signature cocktails and shisha at sunset at <a href="/enjoy">Enjoy Terrace</a> and partying into the early hours at <a href="/outxide">Outxide Club</a>, both at Av. Tucán 1. And if what you need is a table, our guides to <a href="/blog/donde-cenar-tarde-port-alcudia">late dinners in Port d'Alcúdia</a> and <a href="/blog/cena-romantica-alcudia-mallorca">romantic dinners in Alcúdia</a> are up to date with open alternatives.</p>

<p><strong>Thank you to every person who sat at our table and to the team who poured their soul into every dish. See you soon.</strong></p>`,
      de: `<p><strong>Hinweis: Hiru Food &amp; Drinks hat im August 2026 endgültig seine Türen geschlossen.</strong> Diese Seite bleibt als Hommage an das, was unser Grillrestaurant in Port d'Alcúdia einmal war. Tischreservierungen sind nicht mehr möglich; wer heute in der Gegend essen gehen möchte, findet Alternativen in unserem Guide zu den <a href="/blog/mejores-restaurantes-alcudia-mallorca">besten Restaurants in Alcúdia</a>.</p>

<h2>Danke für alles, Hiru</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> entstand in der Carretera d'Artà 40 in Alcúdia mit einer einfachen Idee: Feuer, gutes Produkt und gute Menschen. Der Name — „drei" auf Baskisch — stand für seine drei Säulen: erstklassiges Produkt, die Glut als Technik und eine Atmosphäre, in der Gastronomie und gute Zeiten Hand in Hand gingen. Bis zu seinem allerletzten Service im August 2026 war es Teil der Familie von <a href="/">Grupo Enjoy</a>.</p>

<h2>Was Hiru besonders machte</h2>
<h3>Die Glut und das Dry-Aged-Fleisch</h3>
<p>Seine große Spezialität war Dry-Aged-Fleisch: Chuletón, Tomahawk, Entraña und Rippe — ausgewählte Stücke, die wochenlang reiften und über natürlicher Holzglut vollendet wurden. Dieser konzentrierte Geschmack, langsam und ohne Eile, war das Markenzeichen des Hauses.</p>

<h3>Reisgerichte und Meeresfrüchte-Paella</h3>
<p>Die Meeresfrüchte-Paella mit hausgemachtem Fond und frischem Produkt aus der Fischauktion von Alcúdia war jahrelang eines der meistbestellten Gerichte, neben dem Reistopf mit Hummer und dem schwarzen Reis mit Tintenfisch. Jeder Reis wurde frisch zubereitet, und dieses Warten gehörte zum Ritual.</p>

<h3>Die Terrasse und die langen Abende</h3>
<p>Und dann war da die Terrasse: Familienessen am Mittag, Sommerabende unter freiem Himmel, Signature-Cocktails und Gespräche, die sich bis in die frühen Morgenstunden zogen. Hiru war mehr als ein Restaurant — es war ein Treffpunkt im Norden Mallorcas.</p>

<h2>Der Ort ruht sich aus: Etwas Neues wird gekocht</h2>
<p>Wir nennen es nicht Abschied. Das Feuer erlischt, aber die Glut bleibt warm: Das Lokal in der Ctra. d'Artà 40 gönnt sich eine Pause, während Grupo Enjoy das nächste Projekt für diese Ecke von Alcúdia erdenkt. Noch ist nichts bestätigt; sobald es so weit ist, erfahrt ihr es auf dieser Website und auf der <a href="/hiru">Abschiedsseite von Hiru</a>.</p>

<h2>Das Grupo-Enjoy-Erlebnis geht weiter</h2>
<p>Auch ohne Hiru ist Port d'Alcúdia sehr lebendig: Signature-Cocktails und Shisha zum Sonnenuntergang im <a href="/enjoy">Enjoy Terrace</a> und Party bis in die Morgenstunden im <a href="/outxide">Outxide Club</a>, beide in der Av. Tucán 1. Und wer einen Tisch sucht: Unsere Guides zum <a href="/blog/donde-cenar-tarde-port-alcudia">späten Abendessen in Port d'Alcúdia</a> und zu <a href="/blog/cena-romantica-alcudia-mallorca">romantischen Dinners in Alcúdia</a> sind mit geöffneten Alternativen auf dem neuesten Stand.</p>

<p><strong>Danke an jede Person, die an unserem Tisch saß, und an das Team, das in jedes Gericht seine Seele legte. Bis bald.</strong></p>`,
      fr: `<p><strong>Note : Hiru Food &amp; Drinks a définitivement fermé ses portes en août 2026.</strong> Cette page demeure en hommage à ce que fut notre restaurant de braise à Port d'Alcúdia. Il n'est plus possible de réserver une table ; si vous cherchez où manger aujourd'hui dans la zone, consultez notre guide des <a href="/blog/mejores-restaurantes-alcudia-mallorca">meilleurs restaurants d'Alcúdia</a>.</p>

<h2>Merci pour tout, Hiru</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> est né au Carretera d'Artà 40, à Alcúdia, avec une idée simple : le feu, le bon produit et les bonnes personnes. Son nom — « trois » en basque — résumait ses trois piliers : un produit de première qualité, la braise comme technique et une ambiance où gastronomie et bons moments allaient de pair. Il a fait partie de la famille <a href="/">Grupo Enjoy</a> jusqu'à son tout dernier service, en août 2026.</p>

<h2>Ce qui rendait Hiru spécial</h2>
<h3>La braise et les viandes dry-aged</h3>
<p>Sa grande spécialité : les viandes maturées dry-aged — chuletón, tomahawk, entraña et côte — des pièces sélectionnées, maturées pendant des semaines et finies sur des braises de bois naturel. Cette saveur concentrée, à feu lent et sans hâte, était la signature de la maison.</p>

<h3>Riz et paella de fruits de mer</h3>
<p>La paella de fruits de mer, au bouillon maison et aux produits frais de la criée d'Alcúdia, fut pendant des années l'un des plats les plus demandés, aux côtés du riz crémeux au homard et du riz noir aux chipirons. Chaque riz était préparé à la minute, et cette attente faisait partie du rituel.</p>

<h3>La terrasse et les longues soirées</h3>
<p>Et puis il y avait la terrasse : déjeuners en famille, dîners d'été en plein air, cocktails signature et conversations qui s'étiraient jusqu'au petit matin. Plus qu'un restaurant, Hiru était un point de rencontre du nord de Majorque.</p>

<h2>Le lieu se repose : quelque chose de nouveau mijote</h2>
<p>Nous ne disons pas adieu. Le feu s'éteint, mais les braises restent chaudes : le local du Ctra. d'Artà 40 fait une pause pendant que Grupo Enjoy imagine le prochain projet pour ce coin d'Alcúdia. Rien n'est encore confirmé ; dès que ce sera le cas, nous l'annoncerons sur ce site et sur la <a href="/hiru">page d'adieu de Hiru</a>.</p>

<h2>L'expérience Grupo Enjoy continue</h2>
<p>Même sans Hiru, Port d'Alcúdia reste bien vivant : cocktails signature et chicha au coucher du soleil à l'<a href="/enjoy">Enjoy Terrace</a> et fête jusqu'au bout de la nuit à l'<a href="/outxide">Outxide Club</a>, tous deux Av. Tucán 1. Et s'il vous faut une table, nos guides pour <a href="/blog/donde-cenar-tarde-port-alcudia">dîner tard à Port d'Alcúdia</a> et pour un <a href="/blog/cena-romantica-alcudia-mallorca">dîner romantique à Alcúdia</a> sont à jour avec des alternatives ouvertes.</p>

<p><strong>Merci à chaque personne qui s'est assise à notre table et à l'équipe qui a mis son âme dans chaque plat. À bientôt.</strong></p>`,
      it: `<p><strong>Nota: Hiru Food &amp; Drinks ha chiuso definitivamente le sue porte nell'agosto 2026.</strong> Questa pagina resta come omaggio a ciò che è stato il nostro ristorante alla brace di Port d'Alcúdia. Non è più possibile prenotare un tavolo; se cerchi dove mangiare oggi in zona, consulta la nostra guida ai <a href="/blog/mejores-restaurantes-alcudia-mallorca">migliori ristoranti di Alcúdia</a>.</p>

<h2>Grazie di tutto, Hiru</h2>
<p><a href="/hiru">Hiru Food &amp; Drinks</a> è nato in Carretera d'Artà 40 ad Alcúdia con un'idea semplice: fuoco, buon prodotto e buona gente. Il nome — "tre" in basco — riassumeva i suoi tre pilastri: prodotto di prima qualità, la brace come tecnica e un ambiente dove gastronomia e bei momenti andavano di pari passo. Ha fatto parte della famiglia di <a href="/">Grupo Enjoy</a> fino al suo ultimo servizio, nell'agosto 2026.</p>

<h2>Cosa rendeva speciale Hiru</h2>
<h3>La brace e le carni dry-aged</h3>
<p>La sua grande specialità erano le carni frollate dry-aged: chuletón, tomahawk, entraña e costata, tagli selezionati maturati per settimane e finiti sulla brace di legna naturale. Quel sapore concentrato, a fuoco lento e senza fretta, era la firma della casa.</p>

<h3>Risi e paella di frutti di mare</h3>
<p>La paella di frutti di mare, con brodo fatto in casa e prodotto fresco del mercato del pesce di Alcúdia, è stata per anni uno dei piatti più richiesti, insieme al riso brodoso con astice e al riso nero con calamaretti. Ogni riso era preparato al momento, e quell'attesa faceva parte del rituale.</p>

<h3>La terrazza e i lunghi dopocena</h3>
<p>E poi c'era la terrazza: pranzi in famiglia, cene estive all'aperto, cocktail d'autore e dopocena che si allungavano fino a notte fonda. Più che un ristorante, Hiru era un punto d'incontro del nord di Maiorca.</p>

<h2>Lo spazio riposa: qualcosa di nuovo bolle in pentola</h2>
<p>Non lo chiamiamo addio. Il fuoco si spegne, ma le braci restano calde: il locale di Ctra. d'Artà 40 si prende una pausa mentre Grupo Enjoy immagina il prossimo progetto per questo angolo di Alcúdia. Non c'è ancora nulla di confermato; quando ci sarà, lo racconteremo su questo sito e sulla <a href="/hiru">pagina di addio di Hiru</a>.</p>

<h2>L'esperienza Grupo Enjoy continua</h2>
<p>Anche senza Hiru, Port d'Alcúdia resta vivissima: cocktail d'autore e shisha al tramonto all'<a href="/enjoy">Enjoy Terrace</a> e festa fino all'alba all'<a href="/outxide">Outxide Club</a>, entrambi in Av. Tucán 1. E se cerchi un tavolo, le nostre guide su <a href="/blog/donde-cenar-tarde-port-alcudia">dove cenare tardi a Port d'Alcúdia</a> e sulla <a href="/blog/cena-romantica-alcudia-mallorca">cena romantica ad Alcúdia</a> sono aggiornate con alternative aperte.</p>

<p><strong>Grazie a ogni persona che si è seduta alla nostra tavola e al team che ha messo l'anima in ogni piatto. A presto.</strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    updated: "2026-08-29",
    image: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
    tags: ["hiru", "restaurants", "food", "alcudia", "mallorca"],
    venue: "hiru",
    faq: [
      {
        question: {
          es: "¿Ha cerrado Hiru Food & Drinks?",
          en: "Has Hiru Food & Drinks closed?",
          de: "Hat Hiru Food & Drinks geschlossen?",
          fr: "Hiru Food & Drinks a-t-il fermé ?",
          it: "Hiru Food & Drinks ha chiuso?",
        },
        answer: {
          es: "Sí. Hiru cerró definitivamente sus puertas en agosto de 2026 y ya no acepta reservas ni sirve comidas o cenas.",
          en: "Yes. Hiru closed its doors for good in August 2026 and no longer takes reservations or serves lunch or dinner.",
          de: "Ja. Hiru hat im August 2026 endgültig geschlossen und nimmt keine Reservierungen mehr an.",
          fr: "Oui. Hiru a définitivement fermé ses portes en août 2026 et ne prend plus de réservations.",
          it: "Sì. Hiru ha chiuso definitivamente nell'agosto 2026 e non accetta più prenotazioni.",
        },
      },
      {
        question: {
          es: "¿Qué pasará con el local de la Ctra. d'Artà 40?",
          en: "What will happen to the premises at Ctra. d'Artà 40?",
          de: "Was passiert mit dem Lokal in der Ctra. d'Artà 40?",
          fr: "Que va devenir le local du Ctra. d'Artà 40 ?",
          it: "Cosa succederà al locale di Ctra. d'Artà 40?",
        },
        answer: {
          es: "El espacio queda reservado para futuros proyectos de Grupo Enjoy. Todavía no hay nada confirmado; lo anunciaremos en la web y en la newsletter cuando llegue el momento.",
          en: "The space is being kept for future Grupo Enjoy projects. Nothing is confirmed yet; we'll announce it on the website and newsletter when the time comes.",
          de: "Der Raum bleibt künftigen Projekten von Grupo Enjoy vorbehalten. Noch ist nichts bestätigt; wir kündigen es auf der Website und im Newsletter an, wenn es so weit ist.",
          fr: "L'espace est réservé aux futurs projets de Grupo Enjoy. Rien n'est encore confirmé ; nous l'annoncerons sur le site et la newsletter le moment venu.",
          it: "Lo spazio resta riservato ai futuri progetti di Grupo Enjoy. Non c'è ancora nulla di confermato; lo annunceremo sul sito e nella newsletter quando sarà il momento.",
        },
      },
      {
        question: {
          es: "¿Dónde puedo comer ahora en Alcúdia?",
          en: "Where can I eat in Alcúdia now?",
          de: "Wo kann ich jetzt in Alcúdia essen?",
          fr: "Où manger à Alcúdia maintenant ?",
          it: "Dove posso mangiare adesso ad Alcúdia?",
        },
        answer: {
          es: "En nuestra guía de los mejores restaurantes de Alcúdia encontrarás alternativas abiertas. Y para el plan de tarde-noche, Enjoy Terrace sigue sirviendo cócteles y shisha a diario en Av. Tucán 1.",
          en: "Our guide to the best restaurants in Alcúdia lists open alternatives. And for the evening plan, Enjoy Terrace still serves cocktails and shisha daily at Av. Tucán 1.",
          de: "Unser Guide zu den besten Restaurants in Alcúdia listet geöffnete Alternativen. Und für den Abend serviert das Enjoy Terrace weiterhin täglich Cocktails und Shisha in der Av. Tucán 1.",
          fr: "Notre guide des meilleurs restaurants d'Alcúdia recense des alternatives ouvertes. Et pour la soirée, l'Enjoy Terrace sert toujours cocktails et chicha tous les jours, Av. Tucán 1.",
          it: "La nostra guida ai migliori ristoranti di Alcúdia elenca alternative aperte. E per la sera, l'Enjoy Terrace serve ancora cocktail e shisha tutti i giorni in Av. Tucán 1.",
        },
      },
    ],
    readingTime: 5,
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
<p><a href="/enjoy">Enjoy Terrace</a> es un cocktail lounge y shisha bar premium ubicado en la Av. Tucan 1, Port d'Alcudia. Es el lugar donde las noches comienzan en el norte de Mallorca: una terraza al aire libre con ambiente sofisticado, los mejores cocteles de la zona y shisha premium mientras disfrutas del atardecer mediterraneo. Enjoy Terrace forma parte de <a href="/">Grupo Enjoy</a>, junto con <a href="/outxide">Outxide Club</a>.</p>

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
<p>Los locales lo tienen claro: cena tranquila en el puerto (en nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guía de restaurantes de Alcúdia</a> tienes dónde elegir), cocktails y shisha en <a href="/enjoy">Enjoy Terrace</a> y, si es jueves, viernes o sábado, la noche continúa en <a href="/outxide">Outxide Club</a>, justo al lado. Todo parte de la misma experiencia <a href="/">Grupo Enjoy</a>, y es el plan que cada vez más gente repite.</p>

<h2>Mas Guias de Ocio en Alcudia</h2>
<p>Explora mas planes en nuestra guia de <a href="/blog/cocteles-shisha-terraza-alcudia">cocteles y shisha en Alcudia</a>, descubre la <a href="/blog/guia-vida-nocturna-alcudia">vida nocturna de Alcudia al completo</a> o planifica tu dia con nuestra guia de <a href="/blog/que-hacer-alcudia-mallorca">que hacer en Alcudia</a>. Si buscas un plan con shisha, te gustara nuestra seleccion de los <a href="/blog/shisha-bar-terraza-lounge-mallorca">mejores shisha bars de Mallorca</a>.</p>

<p><strong>Enjoy Terrace — Av. Tucan 1, Port d'Alcudia, Mallorca. Abierto a diario desde las 17:00. <a href="/enjoy">Visita nuestra web para mas informacion.</a></strong></p>`,

      en: `<p>Looking for the best cocktail terrace in Port d'Alcudia? <strong>Enjoy Terrace</strong> is the place. This is the official website of Grupo Enjoy, the company behind Enjoy Terrace in Mallorca. Here is everything you need to know before your visit.</p>

<h2>What Is Enjoy Terrace</h2>
<p><a href="/enjoy">Enjoy Terrace</a> is a premium cocktail lounge and shisha bar located at Av. Tucan 1, Port d'Alcudia. It is where nights begin in northern Mallorca: an open-air terrace with a sophisticated atmosphere, the best cocktails in the area and premium shisha while you enjoy the Mediterranean sunset. Enjoy Terrace is part of <a href="/">Grupo Enjoy</a>, alongside <a href="/outxide">Outxide Club</a>.</p>

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
<p>Locals know the drill: a relaxed dinner by the port (our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to restaurants in Alcúdia</a> gives you plenty to choose from), cocktails and shisha at <a href="/enjoy">Enjoy Terrace</a> and, on Thursdays, Fridays and Saturdays, the night carries on at <a href="/outxide">Outxide Club</a> right next door. It's all part of the same <a href="/">Grupo Enjoy</a> experience — and a plan more and more people repeat.</p>

<h2>More Leisure Guides for Alcudia</h2>
<p>Explore more plans in our <a href="/blog/cocteles-shisha-terraza-alcudia">cocktails and shisha guide for Alcudia</a>, discover <a href="/blog/guia-vida-nocturna-alcudia">the complete Alcudia nightlife scene</a> or plan your day with our <a href="/blog/que-hacer-alcudia-mallorca">things to do in Alcudia guide</a>. If you love shisha, check out the <a href="/blog/shisha-bar-terraza-lounge-mallorca">best shisha bars in Mallorca</a>.</p>

<p><strong>Enjoy Terrace — Av. Tucan 1, Port d'Alcudia, Mallorca. Open daily from 17:00. <a href="/enjoy">Visit our website for more information.</a></strong></p>`,

      de: `<p>Suchen Sie die beste Cocktail-Terrasse in Port d'Alcudia? <strong>Enjoy Terrace</strong> ist der richtige Ort. Dies ist die offizielle Website von Grupo Enjoy, dem Unternehmen hinter Enjoy Terrace auf Mallorca. Hier finden Sie alles Wissenswerte fuer Ihren Besuch.</p>

<h2>Was ist Enjoy Terrace</h2>
<p><a href="/enjoy">Enjoy Terrace</a> ist eine Premium-Cocktailbar und Shisha-Lounge an der Av. Tucan 1, Port d'Alcudia. Hier beginnen die Naechte im Norden Mallorcas: eine Freiluft-Terrasse mit gehobener Atmosphaere, die besten Cocktails der Gegend und Premium-Shisha zum mediterranen Sonnenuntergang. Enjoy Terrace gehoert zu <a href="/">Grupo Enjoy</a>, zusammen mit <a href="/outxide">Outxide Club</a>.</p>

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
<p>Die Einheimischen wissen es längst: entspanntes Abendessen am Hafen (unser <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide für Alcúdia</a> bietet reichlich Auswahl), Cocktails und Shisha im <a href="/enjoy">Enjoy Terrace</a>, und donnerstags, freitags und samstags geht die Nacht direkt nebenan im <a href="/outxide">Outxide Club</a> weiter. Alles Teil desselben <a href="/">Grupo-Enjoy</a>-Erlebnisses — ein Plan, den immer mehr Leute wiederholen.</p>

<p><strong>Enjoy Terrace — Av. Tucan 1, Port d'Alcudia, Mallorca. Taeglich ab 17:00 Uhr geoeffnet. <a href="/enjoy">Besuchen Sie unsere Website fuer weitere Informationen.</a></strong></p>`,

      fr: `<p>Vous cherchez la meilleure terrasse cocktails à Port d'Alcudia ? <strong>Enjoy Terrace</strong> est l'endroit ideal. Ceci est le site officiel de Grupo Enjoy, l'entreprise derrière Enjoy Terrace à Majorque. Voici tout ce que vous devez savoir.</p>

<h2>Qu'est-ce qu'Enjoy Terrace</h2>
<p><a href="/enjoy">Enjoy Terrace</a> est un cocktail lounge et bar à chicha premium situe Av. Tucan 1, Port d'Alcudia. C'est là que les nuits commencent dans le nord de Majorque : une terrasse en plein air avec une ambiance sophistiquee, les meilleurs cocktails de la zone et une chicha premium face au coucher de soleil mediterraneen. Enjoy Terrace fait partie de <a href="/">Grupo Enjoy</a>, avec <a href="/outxide">Outxide Club</a>.</p>

<h2>Carte des Cocktails</h2>
<p>La carte de cocktails d'Enjoy Terrace est l'une des plus complètes d'Alcudia. Notre equipe de mixologie cree des boissons signature avec des spiritueux premium, des jus frais, des sirops artisanaux et des ingredients de saison.</p>

<h2>Chicha Premium</h2>
<p>Enjoy Terrace propose un service de chicha premium avec une large selection de saveurs et de melanges. Charbon naturel et tabacs de première qualite pour une experience superieure.</p>

<h2>Terrasse et Ambiance</h2>
<p>La terrasse est le coeur d'Enjoy. Un espace en plein air avec eclairage chaleureux, musique soignee, mobilier confortable et une esthetique melant style moderne et chaleur mediterraneenne.</p>

<h2>Horaires</h2>
<p>Enjoy Terrace est ouvert tous les jours de 17h00 à 05h30. Le pont parfait entre le diner et le dancefloor. Commencez au coucher du soleil et prolongez au <a href="/outxide">Outxide Club</a> juste à cote.</p>

<h2>Le plan parfait à Port d'Alcudia</h2>
<p>Les habitués le savent : dîner tranquille au port (notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants d'Alcúdia</a> offre l'embarras du choix), cocktails et chicha à l'<a href="/enjoy">Enjoy Terrace</a> et, du jeudi au samedi, la nuit continue à l'<a href="/outxide">Outxide Club</a>, juste à côté. Le tout fait partie de la même expérience <a href="/">Grupo Enjoy</a> — un plan que de plus en plus de monde répète.</p>

<p><strong>Enjoy Terrace — Av. Tucan 1, Port d'Alcudia, Majorque. Ouvert tous les jours dès 17h00. <a href="/enjoy">Visitez notre site pour plus d'informations.</a></strong></p>`,

      it: `<p>Cercate la miglior terrazza cocktail a Port d'Alcudia? <strong>Enjoy Terrace</strong> e' il posto giusto. Questo e' il sito ufficiale di Grupo Enjoy, l'azienda che gestisce Enjoy Terrace a Maiorca. Ecco tutto quello che dovete sapere.</p>

<h2>Cos'e' Enjoy Terrace</h2>
<p><a href="/enjoy">Enjoy Terrace</a> e' un cocktail lounge e shisha bar premium situato in Av. Tucan 1, Port d'Alcudia. E' qui che le serate iniziano nel nord di Maiorca: una terrazza all'aperto con atmosfera sofisticata, i migliori cocktail della zona e shisha premium mentre godetevi il tramonto mediterraneo. Enjoy Terrace fa parte di <a href="/">Grupo Enjoy</a>, insieme a <a href="/outxide">Outxide Club</a>.</p>

<h2>Carta Cocktail</h2>
<p>La carta cocktail di Enjoy Terrace e' una delle piu' complete di Alcudia. Il nostro team di mixology crea drink d'autore con distillati premium, succhi freschi, sciroppi artigianali e ingredienti stagionali.</p>

<h2>Shisha Premium</h2>
<p>Enjoy Terrace offre un servizio shisha premium con un'ampia selezione di gusti e miscele. Carbone naturale e tabacchi di prima qualita' per un'esperienza superiore.</p>

<h2>Terrazza e Atmosfera</h2>
<p>La terrazza e' il cuore di Enjoy. Uno spazio all'aperto con illuminazione calda, musica curata, arredi comodi e un'estetica che unisce stile moderno e calore mediterraneo.</p>

<h2>Orari</h2>
<p>Enjoy Terrace e' aperto tutti i giorni dalle 17:00 alle 05:30. Il ponte perfetto tra la cena e la pista da ballo. Iniziate al tramonto e proseguite all'<a href="/outxide">Outxide Club</a> proprio accanto.</p>

<h2>Il piano perfetto a Port d'Alcudia</h2>
<p>I local lo sanno bene: cena tranquilla al porto (la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti di Alcúdia</a> offre ampia scelta), cocktail e shisha all'<a href="/enjoy">Enjoy Terrace</a> e, giovedì, venerdì e sabato, la notte continua all'<a href="/outxide">Outxide Club</a>, proprio accanto. Tutto parte della stessa esperienza <a href="/">Grupo Enjoy</a> — un piano che sempre più gente ripete.</p>

<p><strong>Enjoy Terrace — Av. Tucan 1, Port d'Alcudia, Maiorca. Aperto tutti i giorni dalle 17:00. <a href="/enjoy">Visitate il nostro sito per maggiori informazioni.</a></strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    updated: "2026-08-29",
    image: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
    tags: ["enjoy", "cocktails", "shisha", "terrace", "alcudia"],
    venue: "enjoy",
    faq: [
      {
        question: {
          es: "¿Qué horario tiene Enjoy Terrace?",
          en: "What are Enjoy Terrace's opening hours?",
          de: "Welche Öffnungszeiten hat die Enjoy Terrace?",
          fr: "Quels sont les horaires d'Enjoy Terrace ?",
          it: "Quali sono gli orari di Enjoy Terrace?",
        },
        answer: {
          es: "Enjoy Terrace abre a diario desde las 17:00, el momento ideal para llegar a tiempo al atardecer con un cóctel.",
          en: "Enjoy Terrace opens daily from 17:00, the perfect time to arrive for sunset with a cocktail.",
          de: "Die Enjoy Terrace öffnet täglich ab 17:00 Uhr – perfekt, um rechtzeitig zum Sonnenuntergang mit einem Cocktail da zu sein.",
          fr: "Enjoy Terrace ouvre tous les jours à partir de 17h00, le moment idéal pour arriver au coucher du soleil avec un cocktail.",
          it: "Enjoy Terrace apre tutti i giorni dalle 17:00, il momento ideale per arrivare al tramonto con un cocktail.",
        },
      },
      {
        question: {
          es: "¿Hace falta reservar en Enjoy Terrace?",
          en: "Do I need to book at Enjoy Terrace?",
          de: "Muss man in der Enjoy Terrace reservieren?",
          fr: "Faut-il réserver à Enjoy Terrace ?",
          it: "È necessario prenotare a Enjoy Terrace?",
        },
        answer: {
          es: "No es imprescindible, pero en verano y a la hora del atardecer se recomienda reservar mesa en la terraza para asegurar sitio.",
          en: "It's not essential, but in summer and around sunset we recommend booking a table on the terrace to be sure of a spot.",
          de: "Nicht zwingend, aber im Sommer und zur Sonnenuntergangszeit empfehlen wir, einen Tisch auf der Terrasse zu reservieren.",
          fr: "Ce n'est pas indispensable, mais en été et à l'heure du coucher du soleil, nous conseillons de réserver une table en terrasse.",
          it: "Non è indispensabile, ma in estate e all'ora del tramonto consigliamo di prenotare un tavolo in terrazza.",
        },
      },
      {
        question: {
          es: "¿Qué ofrece Enjoy Terrace?",
          en: "What does Enjoy Terrace offer?",
          de: "Was bietet die Enjoy Terrace?",
          fr: "Que propose Enjoy Terrace ?",
          it: "Cosa offre Enjoy Terrace?",
        },
        answer: {
          es: "Cócteles de autor y shisha premium en una terraza con el mejor ambiente y atardecer de Port d'Alcúdia.",
          en: "Signature cocktails and premium shisha on a terrace with the best atmosphere and sunset in Port d'Alcúdia.",
          de: "Signature-Cocktails und Premium-Shisha auf einer Terrasse mit dem besten Ambiente und Sonnenuntergang in Port d'Alcúdia.",
          fr: "Des cocktails signature et de la chicha premium sur une terrasse avec la meilleure ambiance et le plus beau coucher de soleil de Port d'Alcúdia.",
          it: "Cocktail d'autore e shisha premium su una terrazza con la migliore atmosfera e il tramonto più bello di Port d'Alcúdia.",
        },
      },
      {
        question: {
          es: "¿Dónde está Enjoy Terrace?",
          en: "Where is Enjoy Terrace located?",
          de: "Wo befindet sich die Enjoy Terrace?",
          fr: "Où se trouve Enjoy Terrace ?",
          it: "Dove si trova Enjoy Terrace?",
        },
        answer: {
          es: "En la Av. Tucán 1, Port d'Alcúdia, la misma ubicación que Outxide Club.",
          en: "At Av. Tucán 1, Port d'Alcúdia, the same location as Outxide Club.",
          de: "In der Av. Tucán 1, Port d'Alcúdia, am selben Standort wie der Outxide Club.",
          fr: "Av. Tucán 1, Port d'Alcúdia, au même endroit que l'Outxide Club.",
          it: "In Av. Tucán 1, Port d'Alcúdia, nella stessa sede dell'Outxide Club.",
        },
      },
    ],
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

<h3>Paso 1: Cena de grupo en el puerto</h3>
<p>Toda buena despedida empieza con una gran cena. En Port d'Alcudia hay restaurantes acostumbrados a mesas grandes y ambiente festivo: arroces y paellas para compartir, carnes a la brasa y menus de picoteo para que todo el grupo pruebe de todo. Nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guia de restaurantes de Alcudia</a> te ayuda a elegir.</p>
<p>Consejo: reserva mesa con antelacion e indica que sois un grupo de celebracion, asi el equipo del restaurante os prepara la disposicion perfecta.</p>

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

<h2>Cena de grupo: paella para compartir</h2>
<p>Para despedidas, la <strong>paella de marisco para compartir</strong> es un clasico que siempre arranca aplausos: un arrozon generoso servido en el centro de la mesa. Varios restaurantes del puerto la preparan por encargo para grupos; pidela al reservar y pregunta tambien por carnes a la brasa para compartir o menus de tapas variadas.</p>

<h2>Consejos practicos para tu despedida en Alcudia</h2>
<p><strong>Alojamiento:</strong> Port d'Alcudia tiene una gran oferta de hoteles y apartamentos. Para despedidas, los apartamentos tipo villa con piscina son los mas populares, ya que permiten que el grupo este junto durante el dia. La zona de Bellevue y la Playa de Muro tienen buenas opciones.</p>
<p><strong>Transporte:</strong> La gran ventaja de organizar tu despedida en Port d'Alcudia es que todo queda cerca: <a href="/enjoy">Enjoy</a> y <a href="/outxide">Outxide</a> comparten direccion en Av. Tucan 1 y los restaurantes del puerto estan a pocos pasos. No necesitas taxis ni coches para moverte entre locales.</p>
<p><strong>Reservas:</strong> Reserva la mesa del restaurante y la zona VIP del club con antelacion. En temporada alta (junio-septiembre), la demanda es muy alta y los grupos grandes necesitan planificacion previa.</p>
<p><strong>Dia de la semana:</strong> Los viernes y sabados son los dias con mas ambiente en Outxide. Si prefieres algo mas relajado, los jueves tambien hay sesion y suele haber menos gente.</p>

<p>Si quieres mas ideas sobre que hacer en la zona, consulta nuestra <a href="/blog/guia-vida-nocturna-alcudia">guia de vida nocturna en Alcudia</a> y nuestro articulo sobre <a href="/blog/fiestas-eventos-verano-alcudia-2026">fiestas y eventos de verano 2026</a>.</p>

<p><strong>Grupo Enjoy — Enjoy Terrace &amp; Outxide Club. Av. Tucan 1, Port d'Alcudia, Mallorca. <a href="/">Visita nuestra web para mas informacion.</a></strong></p>`,

      en: `<p>If you're planning a bachelor or bachelorette party and want a destination that combines great food, terrace cocktails and a memorable night of clubbing, <strong>Alcudia and Port d'Alcudia</strong> have everything you need. Northern Mallorca offers quality venues, incredible atmosphere and the convenience of having everything within walking distance.</p>

<p>In this guide we show you how to put together the perfect hen or stag do in Alcudia step by step, from dinner to sunrise. The best part: you don't need a car because everything is on the same street.</p>

<h2>The perfect bachelor/bachelorette plan in Alcudia</h2>

<p>The best celebration plans in Port d'Alcudia follow a proven formula: <strong>group dinner, cocktails and party</strong>. The three venues run by <a href="/">Grupo Enjoy</a> are right next to each other, so logistics are effortless.</p>

<h3>Step 1: Group dinner by the port</h3>
<p>Every good send-off starts with a great dinner. Port d'Alcudia has restaurants used to big tables and a festive mood: rice dishes and paellas to share, charcoal-grilled meats and picking menus so the whole group can try everything. Our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to restaurants in Alcudia</a> will help you choose.</p>
<p>Tip: book ahead and mention you're a celebration group, so the restaurant team can set up the perfect table arrangement.</p>

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

<h2>Group dinner: paella to share</h2>
<p>For send-offs, a <strong>seafood paella to share</strong> is a classic that always gets applause: a generous pan served in the middle of the table. Several restaurants by the port prepare it to order for groups; ask for it when booking, along with charcoal-grilled meats to share or mixed tapas menus.</p>

<h2>Practical tips for your party in Alcudia</h2>
<p><strong>Accommodation:</strong> Port d'Alcudia has a wide range of hotels and apartments. For bachelor and bachelorette parties, villa-style apartments with a pool are the most popular, allowing the group to stay together during the day. The Bellevue area and Playa de Muro have great options.</p>
<p><strong>Transport:</strong> The big advantage of organising your send-off in Port d'Alcudia is that everything is close: <a href="/enjoy">Enjoy</a> and <a href="/outxide">Outxide</a> share the same address at Av. Tucan 1, and the port's restaurants are a short walk away. No taxis or cars needed between venues.</p>
<p><strong>Bookings:</strong> Reserve your restaurant table and club VIP area in advance. During high season (June to September), demand is very high and large groups need forward planning.</p>
<p><strong>Day of the week:</strong> Fridays and Saturdays have the biggest atmosphere at Outxide. If you prefer something more relaxed, Thursdays also have sessions and tend to be less crowded.</p>

<p>For more ideas on what to do in the area, check out our <a href="/blog/guia-vida-nocturna-alcudia">Alcudia nightlife guide</a> and our article on <a href="/blog/fiestas-eventos-verano-alcudia-2026">summer events and parties 2026</a>.</p>

<p><strong>Grupo Enjoy — Enjoy Terrace &amp; Outxide Club. Av. Tucan 1, Port d'Alcudia, Mallorca. <a href="/">Visit our website for more information.</a></strong></p>`,

      de: `<p>Ihr plant einen Junggesellenabschied oder Junggesellinnenabschied und sucht ein Reiseziel, das grossartiges Essen, Cocktails auf der Terrasse und eine unvergessliche Clubnacht vereint? <strong>Alcudia und Port d'Alcudia</strong> im Norden Mallorcas bieten alles, was ihr braucht: hochwertige Locations, tolle Atmosphaere und den Vorteil, dass alles zu Fuss erreichbar ist.</p>

<p>In diesem Guide zeigen wir euch, wie ihr den perfekten Junggesellenabschied in Alcudia Schritt fuer Schritt zusammenstellt — vom Abendessen bis zum Sonnenaufgang. Das Beste: Ihr braucht kein Auto, denn alles liegt in derselben Strasse.</p>

<h2>Der perfekte Junggesellenabschied-Plan in Alcudia</h2>

<p>Die besten Feier-Plaene in Port d'Alcudia folgen einer bewaehrten Formel: <strong>Gruppenessen, Cocktails und Party</strong>. Die drei Locations von <a href="/">Grupo Enjoy</a> liegen direkt nebeneinander, sodass die Logistik mueheloss ist.</p>

<h3>Schritt 1: Gruppendinner am Hafen</h3>
<p>Jeder gute Junggesellenabschied beginnt mit einem großartigen Abendessen. In Port d'Alcudia gibt es Restaurants, die an große Tische und Feierstimmung gewöhnt sind: Reisgerichte und Paellas zum Teilen, Fleisch vom Grill und Häppchen-Menüs, damit die ganze Gruppe alles probieren kann. Unser <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide für Alcudia</a> hilft bei der Wahl.</p>
<p>Tipp: Reserviere frühzeitig und gib an, dass ihr eine Feiergruppe seid — so bereitet das Team die perfekte Tischordnung vor.</p>

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

<h2>Gruppendinner: Paella zum Teilen</h2>
<p>Für Abschiedsfeiern ist eine <strong>Meeresfrüchte-Paella zum Teilen</strong> ein Klassiker, der immer Applaus bekommt: eine großzügige Pfanne, serviert in der Tischmitte. Mehrere Restaurants am Hafen bereiten sie auf Vorbestellung für Gruppen zu; frag bei der Reservierung danach, ebenso nach Grillfleisch zum Teilen oder gemischten Tapas-Menüs.</p>

<h2>Praktische Tipps fuer euren Junggesellenabschied</h2>
<p><strong>Unterkunft:</strong> Port d'Alcudia bietet eine grosse Auswahl an Hotels und Apartments. Fuer Junggesellenabschiede sind Villa-Apartments mit Pool am beliebtesten. Die Gegend um Bellevue und Playa de Muro hat gute Optionen.</p>
<p><strong>Transport:</strong> Der große Vorteil, deinen Abschied in Port d'Alcudia zu organisieren: Alles liegt nah beieinander. <a href="/enjoy">Enjoy</a> und <a href="/outxide">Outxide</a> teilen sich die Adresse Av. Tucan 1, und die Restaurants am Hafen sind wenige Schritte entfernt. Keine Taxis oder Autos zwischen den Locations nötig.</p>
<p><strong>Reservierungen:</strong> Reserviert Restauranttisch und Club-VIP-Bereich im Voraus. In der Hochsaison (Juni bis September) ist die Nachfrage sehr hoch.</p>
<p><strong>Wochentag:</strong> Freitage und Samstage bieten die groesste Atmosphaere im Outxide. Donnerstage sind etwas ruhiger, aber es gibt ebenfalls Sessions.</p>

<p>Fuer weitere Ideen schaut euch unseren <a href="/blog/guia-vida-nocturna-alcudia">Alcudia Nachtleben-Guide</a> und unseren Artikel ueber <a href="/blog/fiestas-eventos-verano-alcudia-2026">Sommer-Events und Partys 2026</a> an.</p>

<p><strong>Grupo Enjoy — Enjoy Terrace &amp; Outxide Club. Av. Tucan 1, Port d'Alcudia, Mallorca. <a href="/">Alle Infos auf unserer Website.</a></strong></p>`,

      fr: `<p>Vous organisez un enterrement de vie de jeune fille ou de garcon et cherchez une destination qui combine gastronomie, cocktails en terrasse et une nuit de fete memorable ? <strong>Alcudia et Port d'Alcudia</strong> dans le nord de Majorque offrent tout ce qu'il faut : des etablissements de qualite, une ambiance exceptionnelle et la commodite d'avoir tout a distance de marche.</p>

<p>Dans ce guide, nous vous montrons comment organiser l'enterrement de vie parfait a Alcudia, etape par etape, du diner au lever du soleil. Le meilleur : pas besoin de voiture, tout est dans la meme rue.</p>

<h2>Le plan parfait pour un enterrement de vie a Alcudia</h2>

<p>Les meilleurs plans de fete a Port d'Alcudia suivent une formule eprouvee : <strong>diner en groupe, cocktails et fete</strong>. Les trois etablissements de <a href="/">Grupo Enjoy</a> sont cote a cote, donc la logistique est simple.</p>

<h3>Etape 1 : Diner de groupe au port</h3>
<p>Tout bon enterrement de vie de celibataire commence par un grand diner. Port d'Alcudia compte des restaurants habitues aux grandes tablees et a l'ambiance festive : riz et paellas a partager, viandes a la braise et menus a picorer pour que tout le groupe goute a tout. Notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants d'Alcudia</a> vous aidera a choisir.</p>
<p>Conseil : reservez a l'avance et precisez que vous etes un groupe en fete, l'equipe preparera la disposition parfaite.</p>

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

<h2>Diner de groupe : paella a partager</h2>
<p>Pour les enterrements de vie de celibataire, la <strong>paella de fruits de mer a partager</strong> est un classique qui fait toujours son effet : une poele genereuse servie au centre de la table. Plusieurs restaurants du port la preparent sur commande pour les groupes ; demandez-la a la reservation, ainsi que des viandes a la braise a partager ou des menus de tapas varies.</p>

<h2>Conseils pratiques</h2>
<p><strong>Hebergement :</strong> Port d'Alcudia offre un large choix d'hotels et d'appartements. Les villas avec piscine sont les plus populaires pour les groupes. La zone de Bellevue et Playa de Muro offrent de bonnes options.</p>
<p><strong>Transport :</strong> Le grand avantage d'organiser votre soiree a Port d'Alcudia, c'est que tout est proche : <a href="/enjoy">Enjoy</a> et <a href="/outxide">Outxide</a> partagent la meme adresse, Av. Tucan 1, et les restaurants du port sont a quelques pas. Pas besoin de taxis ni de voitures entre les lieux.</p>
<p><strong>Reservations :</strong> Reservez table et espace VIP a l'avance. En haute saison (juin-septembre), la demande est tres elevee.</p>
<p><strong>Jour de la semaine :</strong> Les vendredis et samedis offrent la meilleure ambiance a l'Outxide. Les jeudis sont plus tranquilles mais il y a aussi des sessions.</p>

<p>Pour plus d'idees, consultez notre <a href="/blog/guia-vida-nocturna-alcudia">guide de la vie nocturne a Alcudia</a> et notre article sur les <a href="/blog/fiestas-eventos-verano-alcudia-2026">evenements et fetes de l'ete 2026</a>.</p>

<p><strong>Grupo Enjoy — Enjoy Terrace &amp; Outxide Club. Av. Tucan 1, Port d'Alcudia, Majorque. <a href="/">Toutes les infos sur notre site.</a></strong></p>`,

      it: `<p>State organizzando un addio al nubilato o al celibato e cercate una destinazione che combini ottima gastronomia, cocktail in terrazza e una notte di festa memorabile? <strong>Alcudia e Port d'Alcudia</strong> nel nord di Maiorca offrono tutto il necessario: locali di qualita', atmosfera incredibile e la comodita' di avere tutto a pochi passi.</p>

<p>In questa guida vi mostriamo come organizzare l'addio al nubilato o celibato perfetto ad Alcudia passo dopo passo, dalla cena all'alba. Il meglio: non serve l'auto, tutto e' nella stessa via.</p>

<h2>Il piano perfetto per un addio al nubilato ad Alcudia</h2>

<p>I migliori piani di festa a Port d'Alcudia seguono una formula collaudata: <strong>cena di gruppo, cocktail e festa</strong>. I tre locali di <a href="/">Grupo Enjoy</a> sono uno accanto all'altro, quindi la logistica e' semplicissima.</p>

<h3>Passo 1: Cena di gruppo al porto</h3>
<p>Ogni buon addio al celibato o nubilato inizia con una grande cena. A Port d'Alcudia ci sono ristoranti abituati a tavolate grandi e atmosfera di festa: risi e paella da condividere, carni alla brace e menu da stuzzicare perche tutto il gruppo assaggi di tutto. La nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti di Alcudia</a> ti aiuta a scegliere.</p>
<p>Consiglio: prenota in anticipo e specifica che siete un gruppo in festa, cosi il team preparera la disposizione perfetta.</p>

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

<h2>Cena di gruppo: paella da condividere</h2>
<p>Per gli addii al celibato, la <strong>paella di frutti di mare da condividere</strong> e un classico che strappa sempre applausi: una padella generosa servita al centro del tavolo. Diversi ristoranti del porto la preparano su ordinazione per i gruppi; chiedila al momento della prenotazione, insieme a carni alla brace da condividere o menu di tapas misti.</p>

<h2>Consigli pratici</h2>
<p><strong>Alloggio:</strong> Port d'Alcudia offre un'ampia scelta di hotel e appartamenti. Per addii al nubilato, gli appartamenti tipo villa con piscina sono i piu' popolari. La zona di Bellevue e Playa de Muro hanno buone opzioni.</p>
<p><strong>Trasporti:</strong> Il grande vantaggio di organizzare il tuo addio a Port d'Alcudia e che tutto e vicino: <a href="/enjoy">Enjoy</a> e <a href="/outxide">Outxide</a> condividono l'indirizzo di Av. Tucan 1 e i ristoranti del porto sono a pochi passi. Niente taxi ne auto tra i locali.</p>
<p><strong>Prenotazioni:</strong> Prenotate tavolo ristorante e area VIP in anticipo. In alta stagione (giugno-settembre), la domanda e' molto alta.</p>
<p><strong>Giorno della settimana:</strong> Venerdi' e sabato offrono la migliore atmosfera all'Outxide. Il giovedi' e' piu' tranquillo ma ci sono comunque serate.</p>

<p>Per altre idee, consultate la nostra <a href="/blog/guia-vida-nocturna-alcudia">guida alla vita notturna di Alcudia</a> e il nostro articolo su <a href="/blog/fiestas-eventos-verano-alcudia-2026">eventi e feste dell'estate 2026</a>.</p>

<p><strong>Grupo Enjoy — Enjoy Terrace &amp; Outxide Club. Av. Tucan 1, Port d'Alcudia, Maiorca. <a href="/">Tutte le info sul nostro sito.</a></strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    updated: "2026-08-29",
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

<h2>Una nota antes de empezar: adios, Hiru</h2>
<p>Durante anos, <a href="/hiru">Hiru Food &amp; Drinks</a> fue nuestra recomendacion estrella para una cena romantica en Port d'Alcudia: terraza intima, carnes maduradas a la brasa y una paella para dos con socarrat perfecto. En agosto de 2026 cerro definitivamente sus puertas; le hemos dedicado una <a href="/blog/hiru-food-drinks-restaurante-alcudia">despedida y homenaje</a>. La buena noticia: Alcudia sigue teniendo mesas perfectas para una velada en pareja, y las encontraras justo aqui debajo.</p>

<h2>Continua la noche: cocteles en Enjoy Terrace</h2>
<p>Una cena romantica no tiene por que terminar con el postre. Si quereis alargar la velada, <a href="/enjoy">Enjoy Terrace</a> (Av. Tucan 1, junto al puerto) ofrece el complemento perfecto: una terraza al aire libre con iluminacion ambiental, musica suave y una carta de cocteles de autor que incluye clasicos reinventados y creaciones exclusivas.</p>
<p>Sentaros en la terraza de Enjoy con un cocktail mientras la noche de Alcudia se despliega a vuestro alrededor es una de esas experiencias que convierten una buena cena en una velada inolvidable. La shisha premium tambien es una opcion para quienes quieran probar algo diferente en pareja.</p>
<p>Mas detalles en nuestro <a href="/blog/cocteles-shisha-terraza-alcudia">articulo sobre cocteles y shisha en Enjoy Terrace</a>.</p>

<h2>Los mejores restaurantes romanticos de Alcudia</h2>
<p>Estas son nuestras recomendaciones para una cena romantica en Alcudia:</p>
<h3>El Patio de Alcudia</h3>
<p>Restaurante con un precioso patio interior ajardinado en el casco historico. Cocina fusion con base mediterranea en un ambiente intimo y cuidado. Ideal si buscais algo dentro de la muralla medieval.</p>
<h3>Sa Placa</h3>
<p>En la plaza principal del casco antiguo, con terraza con vistas a la muralla. Cocina mediterranea con toques mallorquines. El atardecer desde aqui es especialmente bonito.</p>
<h3>Can Simó</h3>
<p>Casa senorial del siglo XVII convertida en restaurante. Cocina de autor con producto local en un edificio historico lleno de encanto. Para una ocasion realmente especial.</p>

<h2>Consejos para tu cena romantica en Alcudia</h2>
<p><strong>Reserva con antelacion:</strong> Especialmente en temporada alta (junio-septiembre), los mejores restaurantes se llenan rapido. Reserva al menos con dos o tres dias de antelacion para asegurar una buena mesa.</p>
<p><strong>El mejor momento:</strong> Para una cena romantica perfecta, llega entre las 20:00 y las 20:30. Asi podreis disfrutar de las ultimas luces del atardecer durante los entrantes y ver como la noche se va instalando mientras cenais.</p>
<p><strong>Dress code:</strong> El ambiente en los restaurantes de Alcudia es smart-casual. No hace falta ir de etiqueta, pero una camisa o un vestido de verano elegante siempre suman puntos para la ocasion.</p>
<p><strong>Despues de cenar:</strong> Si quereis seguir la noche, <a href="/enjoy">Enjoy Terrace</a> os espera con cocteles y musica. Y si os apetece una noche mas larga, <a href="/outxide">Outxide Club</a> esta justo al lado. Consultad nuestra <a href="/blog/guia-vida-nocturna-alcudia">guia de vida nocturna en Alcudia</a> para planificar.</p>
<p><strong>Ocasiones especiales:</strong> Si celebrais un aniversario, cumpleanos o pedida de mano, avisa al restaurante con antelacion: la mayoria puede preparar detalles especiales.</p>

<p>Para mas ideas gastronomicas, no os perdais nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guia de los mejores restaurantes de Alcudia</a> y nuestro articulo sobre <a href="/blog/restaurante-brasa-parrilla-mallorca">restaurantes a la brasa en Mallorca</a>.</p>

<p><strong>Grupo Enjoy — Port d'Alcudia, Mallorca. Cocteles al atardecer en <a href="/enjoy">Enjoy Terrace</a> y fiesta en <a href="/outxide">Outxide Club</a>. <a href="/">Toda la informacion en nuestra web.</a></strong></p>`,

      en: `<p>If you're looking for a romantic restaurant in Alcudia to surprise your partner, northern Mallorca has options that go well beyond the typical tourist restaurant. A romantic dinner in Alcudia can be a truly memorable experience if you choose the right place, the right moment and the right plan. In this guide we share where to dine as a couple in Alcudia and how to complete the perfect evening.</p>

<h2>A note before we start: farewell, Hiru</h2>
<p>For years, <a href="/hiru">Hiru Food &amp; Drinks</a> was our star recommendation for a romantic dinner in Port d'Alcudia: an intimate terrace, charcoal-grilled dry-aged meats and a paella for two with perfect socarrat. In August 2026 it closed its doors for good; we've dedicated a <a href="/blog/hiru-food-drinks-restaurante-alcudia">farewell tribute</a> to it. The good news: Alcudia still has perfect tables for a night out as a couple, and you'll find them right below.</p>

<h2>Continue the night: cocktails at Enjoy Terrace</h2>
<p>A romantic dinner doesn't have to end with dessert. If you want to stretch the evening, <a href="/enjoy">Enjoy Terrace</a> (Av. Tucan 1, by the port) offers the perfect follow-up: an open-air terrace with ambient lighting, soft music and a signature cocktail list of reinvented classics and exclusive creations.</p>
<p>Sitting on the Enjoy terrace with a cocktail while the Alcudia night unfolds around you is one of those experiences that turns a good dinner into an unforgettable evening. Premium shisha is also an option for couples who want to try something different.</p>
<p>More details in our <a href="/blog/cocteles-shisha-terraza-alcudia">article on cocktails and shisha at Enjoy Terrace</a>.</p>

<h2>The best romantic restaurants in Alcudia</h2>
<p>These are our recommendations for a romantic dinner in Alcudia:</p>
<h3>El Patio de Alcudia</h3>
<p>A restaurant with a beautiful garden courtyard in the historic centre. Fusion cuisine with a Mediterranean base in an intimate and refined setting. Ideal if you're looking for something within the medieval walls.</p>
<h3>Sa Placa</h3>
<p>On the main square of the old town, with a terrace overlooking the walls. Mediterranean cuisine with Mallorcan touches. The sunset from here is particularly beautiful.</p>
<h3>Can Simo</h3>
<p>A 17th-century manor house converted into a restaurant. Creative cuisine with local produce in a historic building full of charm. For a truly special occasion.</p>

<h2>Tips for your romantic dinner in Alcudia</h2>
<p><strong>Book ahead:</strong> Especially in high season (June-September), the best restaurants fill up fast. Book at least two or three days in advance to secure a good table.</p>
<p><strong>The best time:</strong> For a perfect romantic dinner, arrive between 20:00 and 20:30. That way you can enjoy the last light of sunset over the starters and watch the night settle in as you dine.</p>
<p><strong>Dress code:</strong> The atmosphere in Alcudia's restaurants is smart-casual. No need for formal attire, but a nice shirt or an elegant summer dress always adds to the occasion.</p>
<p><strong>After dinner:</strong> If you want to continue the evening, <a href="/enjoy">Enjoy Terrace</a> awaits with cocktails and music. And if you fancy a longer night, <a href="/outxide">Outxide Club</a> is right next door. Check our <a href="/blog/guia-vida-nocturna-alcudia">Alcudia nightlife guide</a> for planning.</p>
<p><strong>Special occasions:</strong> If you're celebrating an anniversary, birthday or proposal, let the restaurant know in advance: most can prepare special touches.</p>

<p>For more dining ideas, don't miss our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to the best restaurants in Alcudia</a> and our article on <a href="/blog/restaurante-brasa-parrilla-mallorca">grill restaurants in Mallorca</a>.</p>

<p><strong>Grupo Enjoy — Port d'Alcudia, Mallorca. Sunset cocktails at <a href="/enjoy">Enjoy Terrace</a> and the party at <a href="/outxide">Outxide Club</a>. <a href="/">All the information on our website.</a></strong></p>`,

      de: `<p>Wenn Sie ein romantisches Restaurant in Alcudia suchen, um Ihren Partner zu ueberraschen, bietet der Norden Mallorcas Optionen, die weit ueber das typische Touristenrestaurant hinausgehen. Ein romantisches Abendessen in Alcudia kann ein unvergessliches Erlebnis sein, wenn Sie den richtigen Ort, den richtigen Moment und den richtigen Plan waehlen. In diesem Guide verraten wir, wo Sie zu zweit in Alcudia essen koennen und wie Sie den perfekten Abend gestalten.</p>

<h2>Eine Notiz vorab: Abschied von Hiru</h2>
<p>Jahrelang war <a href="/hiru">Hiru Food &amp; Drinks</a> unsere Top-Empfehlung für ein romantisches Abendessen in Port d'Alcudia: intime Terrasse, Dry-Aged-Fleisch vom Grill und eine Paella für zwei mit perfektem Socarrat. Im August 2026 hat es endgültig geschlossen; wir haben ihm eine <a href="/blog/hiru-food-drinks-restaurante-alcudia">Abschieds-Hommage</a> gewidmet. Die gute Nachricht: Alcudia hat weiterhin perfekte Tische für einen Abend zu zweit — du findest sie direkt hier unten.</p>

<h2>Die Nacht fortsetzen: Cocktails auf der Enjoy Terrace</h2>
<p>Ein romantisches Abendessen muss nicht mit dem Dessert enden. Wer den Abend verlängern möchte: Das <a href="/enjoy">Enjoy Terrace</a> (Av. Tucan 1, am Hafen) bietet die perfekte Fortsetzung — eine Terrasse unter freiem Himmel mit stimmungsvoller Beleuchtung, sanfter Musik und einer Signature-Cocktailkarte aus neu interpretierten Klassikern und exklusiven Kreationen.</p>
<p>Auf der Enjoy-Terrasse mit einem Cocktail zu sitzen, waehrend die Nacht in Alcudia sich entfaltet, ist eines dieser Erlebnisse, die ein gutes Abendessen in einen unvergesslichen Abend verwandeln. Premium-Shisha ist ebenfalls eine Option fuer Paare.</p>
<p>Mehr Details in unserem <a href="/blog/cocteles-shisha-terraza-alcudia">Artikel ueber Cocktails und Shisha auf der Enjoy Terrace</a>.</p>

<h2>Die besten romantischen Restaurants in Alcudia</h2>
<p>Das sind unsere Empfehlungen für ein romantisches Abendessen in Alcudia:</p>
<h3>El Patio de Alcudia</h3>
<p>Restaurant mit einem wunderschoenen Garteninnenhof im historischen Zentrum. Fusionskueche auf mediterraner Basis in einem intimen Ambiente. Ideal innerhalb der mittelalterlichen Mauern.</p>
<h3>Sa Placa</h3>
<p>Am Hauptplatz der Altstadt, mit Terrasse und Blick auf die Stadtmauer. Mediterrane Kueche mit mallorquinischen Akzenten. Der Sonnenuntergang hier ist besonders schoen.</p>
<h3>Can Simo</h3>
<p>Ein Herrenhaus aus dem 17. Jahrhundert, umgebaut zum Restaurant. Kreative Kueche mit lokalen Produkten in einem historischen Gebaeude voller Charme.</p>

<h2>Tipps fuer Ihr romantisches Abendessen</h2>
<p><strong>Im Voraus reservieren:</strong> Besonders in der Hochsaison (Juni-September) sind die besten Restaurants schnell voll. Reservieren Sie mindestens zwei bis drei Tage vorher.</p>
<p><strong>Der beste Zeitpunkt:</strong> Für ein perfektes romantisches Abendessen komm zwischen 20:00 und 20:30 Uhr. So genießt ihr das letzte Abendlicht zu den Vorspeisen und seht zu, wie sich die Nacht über den Hafen legt.</p>
<p><strong>Dresscode:</strong> Smart-Casual. Keine formelle Kleidung noetig, aber ein huebsches Hemd oder ein elegantes Sommerkleid runden den Anlass ab.</p>
<p><strong>Nach dem Essen:</strong> <a href="/enjoy">Enjoy Terrace</a> erwartet Sie mit Cocktails und Musik. Und wenn Sie eine laengere Nacht moechten, ist der <a href="/outxide">Outxide Club</a> gleich nebenan. Schauen Sie in unseren <a href="/blog/guia-vida-nocturna-alcudia">Alcudia Nachtleben-Guide</a>.</p>
<p><strong>Besondere Anlässe:</strong> Wenn ihr einen Jahrestag, Geburtstag oder Heiratsantrag feiert, sag dem Restaurant vorher Bescheid: Die meisten bereiten gern besondere Details vor.</p>

<p>Fuer weitere Ideen lesen Sie unseren <a href="/blog/mejores-restaurantes-alcudia-mallorca">Guide der besten Restaurants in Alcudia</a> und unseren Artikel ueber <a href="/blog/restaurante-brasa-parrilla-mallorca">Grill-Restaurants auf Mallorca</a>.</p>

<p><strong>Grupo Enjoy — Port d'Alcudia, Mallorca. Cocktails zum Sonnenuntergang im <a href="/enjoy">Enjoy Terrace</a> und Party im <a href="/outxide">Outxide Club</a>. <a href="/">Alle Informationen auf unserer Website.</a></strong></p>`,

      fr: `<p>Si vous cherchez un restaurant romantique a Alcudia pour surprendre votre partenaire, le nord de Majorque offre des options bien au-dela du restaurant touristique classique. Un diner romantique a Alcudia peut etre une experience vraiment memorable si vous choisissez le bon endroit, le bon moment et le bon plan. Dans ce guide, nous partageons ou diner en couple a Alcudia et comment completer la soiree parfaite.</p>

<h2>Une note avant de commencer : adieu, Hiru</h2>
<p>Pendant des années, <a href="/hiru">Hiru Food &amp; Drinks</a> a été notre recommandation phare pour un dîner romantique à Port d'Alcudia : terrasse intime, viandes dry-aged à la braise et paella pour deux au socarrat parfait. En août 2026, il a définitivement fermé ses portes ; nous lui avons dédié un <a href="/blog/hiru-food-drinks-restaurante-alcudia">hommage d'adieu</a>. La bonne nouvelle : Alcudia a toujours des tables parfaites pour une soirée en amoureux, juste ci-dessous.</p>

<h2>Prolonger la soiree : cocktails a l'Enjoy Terrace</h2>
<p>Un dîner romantique ne doit pas forcément se terminer avec le dessert. Pour prolonger la soirée, l'<a href="/enjoy">Enjoy Terrace</a> (Av. Tucan 1, près du port) offre le complément parfait : une terrasse en plein air avec éclairage d'ambiance, musique douce et une carte de cocktails signature entre classiques réinventés et créations exclusives.</p>
<p>S'asseoir sur la terrasse d'Enjoy avec un cocktail pendant que la nuit d'Alcudia se deploie autour de vous est une de ces experiences qui transforment un bon diner en soiree inoubliable. Le chicha premium est aussi une option pour les couples.</p>
<p>Plus de details dans notre <a href="/blog/cocteles-shisha-terraza-alcudia">article sur les cocktails et chicha a l'Enjoy Terrace</a>.</p>

<h2>Les meilleurs restaurants romantiques d'Alcudia</h2>
<p>Voici nos recommandations pour un dîner romantique à Alcudia :</p>
<h3>El Patio de Alcudia</h3>
<p>Restaurant avec un beau patio jardine dans le centre historique. Cuisine fusion a base mediterraneenne dans un cadre intime et soigne. Ideal a l'interieur des remparts medievaux.</p>
<h3>Sa Placa</h3>
<p>Sur la place principale de la vieille ville, avec terrasse vue sur les remparts. Cuisine mediterraneenne aux touches majorquines. Le coucher de soleil d'ici est particulierement beau.</p>
<h3>Can Simo</h3>
<p>Maison seigneuriale du XVIIe siecle transformee en restaurant. Cuisine creative avec des produits locaux dans un batiment historique plein de charme.</p>

<h2>Conseils pour votre diner romantique</h2>
<p><strong>Reservez a l'avance :</strong> Surtout en haute saison (juin-septembre), les meilleurs restaurants se remplissent vite. Reservez au moins deux ou trois jours avant.</p>
<p><strong>Le meilleur moment :</strong> Pour un dîner romantique parfait, arrivez entre 20h00 et 20h30. Vous profiterez des dernières lueurs du coucher de soleil pendant les entrées et verrez la nuit s'installer pendant le dîner.</p>
<p><strong>Dress code :</strong> Smart-casual. Pas besoin de tenue formelle, mais une belle chemise ou une robe d'ete elegante completent l'occasion.</p>
<p><strong>Apres le diner :</strong> L'<a href="/enjoy">Enjoy Terrace</a> vous attend avec cocktails et musique. Et si vous voulez prolonger, l'<a href="/outxide">Outxide Club</a> est juste a cote. Consultez notre <a href="/blog/guia-vida-nocturna-alcudia">guide de la vie nocturne a Alcudia</a>.</p>
<p><strong>Occasions spéciales :</strong> Si vous fêtez un anniversaire ou préparez une demande en mariage, prévenez le restaurant à l'avance : la plupart peuvent préparer des attentions spéciales.</p>

<p>Pour plus d'idees, consultez notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des meilleurs restaurants d'Alcudia</a> et notre article sur les <a href="/blog/restaurante-brasa-parrilla-mallorca">restaurants grill a Majorque</a>.</p>

<p><strong>Grupo Enjoy — Port d'Alcudia, Majorque. Cocktails au coucher du soleil à l'<a href="/enjoy">Enjoy Terrace</a> et fête à l'<a href="/outxide">Outxide Club</a>. <a href="/">Toutes les informations sur notre site.</a></strong></p>`,

      it: `<p>Se cercate un ristorante romantico ad Alcudia per sorprendere il vostro partner, il nord di Maiorca offre opzioni che vanno ben oltre il tipico ristorante turistico. Una cena romantica ad Alcudia puo' essere un'esperienza davvero memorabile se scegliete il posto giusto, il momento giusto e il piano giusto. In questa guida vi raccontiamo dove cenare in coppia ad Alcudia e come completare la serata perfetta.</p>

<h2>Una nota prima di iniziare: addio, Hiru</h2>
<p>Per anni <a href="/hiru">Hiru Food &amp; Drinks</a> è stato il nostro consiglio di punta per una cena romantica a Port d'Alcudia: terrazza intima, carni dry-aged alla brace e una paella per due con socarrat perfetto. Nell'agosto 2026 ha chiuso definitivamente; gli abbiamo dedicato un <a href="/blog/hiru-food-drinks-restaurante-alcudia">omaggio d'addio</a>. La buona notizia: Alcudia ha ancora tavoli perfetti per una serata in coppia, e li trovi qui sotto.</p>

<h2>Continuare la serata: cocktail all'Enjoy Terrace</h2>
<p>Una cena romantica non deve finire con il dessert. Se volete allungare la serata, l'<a href="/enjoy">Enjoy Terrace</a> (Av. Tucan 1, vicino al porto) offre il complemento perfetto: una terrazza all'aperto con luci d'atmosfera, musica soft e una carta di cocktail d'autore tra classici reinventati e creazioni esclusive.</p>
<p>Sedersi sulla terrazza di Enjoy con un cocktail mentre la notte di Alcudia si dispiega intorno a voi e' una di quelle esperienze che trasformano una buona cena in una serata indimenticabile. Lo shisha premium e' anche un'opzione per le coppie.</p>
<p>Piu' dettagli nel nostro <a href="/blog/cocteles-shisha-terraza-alcudia">articolo sui cocktail e shisha all'Enjoy Terrace</a>.</p>

<h2>I migliori ristoranti romantici di Alcudia</h2>
<p>Ecco i nostri consigli per una cena romantica ad Alcudia:</p>
<h3>El Patio de Alcudia</h3>
<p>Ristorante con un bel cortile giardino nel centro storico. Cucina fusion su base mediterranea in un ambiente intimo e curato. Ideale all'interno delle mura medievali.</p>
<h3>Sa Placa</h3>
<p>Nella piazza principale del centro storico, con terrazza vista sulle mura. Cucina mediterranea con tocchi maiorchini. Il tramonto da qui e' particolarmente bello.</p>
<h3>Can Simo</h3>
<p>Casa signorile del XVII secolo trasformata in ristorante. Cucina creativa con prodotti locali in un edificio storico pieno di fascino.</p>

<h2>Consigli per la vostra cena romantica</h2>
<p><strong>Prenotate in anticipo:</strong> Soprattutto in alta stagione (giugno-settembre), i migliori ristoranti si riempiono velocemente. Prenotate almeno due o tre giorni prima.</p>
<p><strong>Il momento migliore:</strong> Per una cena romantica perfetta, arriva tra le 20:00 e le 20:30. Cosi godrete delle ultime luci del tramonto durante gli antipasti e vedrete la notte arrivare mentre cenate.</p>
<p><strong>Dress code:</strong> Smart-casual. Non serve abbigliamento formale, ma una bella camicia o un vestito estivo elegante completano l'occasione.</p>
<p><strong>Dopo cena:</strong> L'<a href="/enjoy">Enjoy Terrace</a> vi aspetta con cocktail e musica. E se volete una notte piu' lunga, l'<a href="/outxide">Outxide Club</a> e' proprio accanto. Consultate la nostra <a href="/blog/guia-vida-nocturna-alcudia">guida alla vita notturna di Alcudia</a>.</p>
<p><strong>Occasioni speciali:</strong> Se festeggiate un anniversario, un compleanno o una proposta, avvisa il ristorante in anticipo: la maggior parte puo preparare dettagli speciali.</p>

<p>Per altre idee gastronomiche, consultate la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai migliori ristoranti di Alcudia</a> e il nostro articolo sui <a href="/blog/restaurante-brasa-parrilla-mallorca">ristoranti alla griglia a Maiorca</a>.</p>

<p><strong>Grupo Enjoy — Port d'Alcudia, Maiorca. Cocktail al tramonto all'<a href="/enjoy">Enjoy Terrace</a> e festa all'<a href="/outxide">Outxide Club</a>. <a href="/">Tutte le informazioni sul nostro sito.</a></strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    updated: "2026-08-29",
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

<h2>Paso 1: Cena en el puerto</h2>
<p>La mejor noche siempre empieza con una buena cena, y Port d'Alcudia lo pone facil: arroces y paellas con marisco de la lonja, carnes a la brasa, pescado fresco y cocina internacional, muchos locales con terraza y horarios amplios en verano. Cena tranquilamente a las 21:00 o 21:30 y llegaras a la siguiente parada sin prisas.</p>
<p>Encuentra tu mesa en nuestro <a href="/blog/mejores-restaurantes-alcudia-mallorca">ranking de mejores restaurantes de Alcudia</a> y, si se os hace tarde, en la <a href="/blog/donde-cenar-tarde-port-alcudia">guia para cenar tarde en Port d'Alcudia</a>. Reserva con antelacion en temporada alta.</p>

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

<h3>Plan foodie: cena + Enjoy</h3>
<p>Si la gastronomia es lo tuyo y prefieres una noche mas tranquila sin discoteca, la combinacion de una buena cena en el puerto seguida de cocteles en <a href="/enjoy">Enjoy</a> es una velada completa. La terraza de Enjoy esta abierta hasta las 05:30, asi que no hay prisa.</p>

<h3>Plan experiencia completa: cena + Enjoy + Outxide</h3>
<p>Este es el plan estrella. Cena en el puerto a las 21:00, cocteles en <a href="/enjoy">Enjoy</a> a partir de las 23:00, y fiesta en <a href="/outxide">Outxide</a> desde la 1:00. Es la formula que siguen los que conocen la zona y quieren exprimir cada momento de la noche. Todo sin coger un coche.</p>

<h2>Lo que necesitas saber</h2>
<p><strong>Horarios:</strong> Enjoy Terrace abre de 17:00 a 05:30 todos los dias. Outxide Club abre jueves, viernes y sabado por la noche (consulta horarios exactos en su web). Los restaurantes del puerto suelen servir hasta las 23:00-23:30 en verano.</p>
<p><strong>Ubicacion:</strong> Los tres locales estan en la misma zona de Port d'Alcudia, en Av. Tucan y Ctra. d'Arta. Puedes ir andando de uno a otro en menos de dos minutos. No necesitas coche ni taxi.</p>
<p><strong>Edad:</strong> Outxide Club tiene un requisito de edad de <strong>18+</strong>. Asegurate de llevar DNI o pasaporte. En Enjoy no hay restriccion de edad para tomar algo, aunque el servicio de alcohol es solo para mayores de edad.</p>
<p><strong>Entradas de Outxide:</strong> Compra tus entradas online con antelacion para evitar colas y a menudo conseguir mejor precio. Disponible en la web de <a href="/outxide">Outxide Club</a>.</p>
<p><strong>Reservas:</strong> Recomendamos reservar mesa para cenar, especialmente los viernes y sabados en temporada alta. Para mesas VIP en Outxide, contacta directamente por la web.</p>

<p>Para completar tu planificacion, no te pierdas nuestra <a href="/blog/guia-vida-nocturna-alcudia">guia completa de vida nocturna en Alcudia</a> y el articulo sobre <a href="/blog/que-hacer-alcudia-mallorca">los mejores planes en Alcudia</a>.</p>

<p><strong>Grupo Enjoy — Enjoy Terrace &amp; Outxide Club. Av. Tucan 1, Port d'Alcudia, Mallorca. <a href="/">Toda la informacion en nuestra web.</a></strong></p>`,

      en: `<p>Port d'Alcudia has the best nightlife in northern Mallorca, and that's not just opinion — it's a fact. While the south of the island concentrates the mega-clubs, the north offers something different: a more complete night-out experience, more personal and with a quality that surprises first-time visitors. And the best part is that <strong>the perfect plan is concentrated in one area</strong>: Av. Tucan and Ctra. d'Arta, where the three venues by <a href="/">Grupo Enjoy</a> let you go from dinner to dancing without needing a taxi.</p>

<p>In this guide we walk you through step by step how to put together the perfect night in Port d'Alcudia, with variations for every taste.</p>

<h2>Step 1: Dinner by the port</h2>
<p>The best night always starts with a good dinner, and Port d'Alcudia makes it easy: rice dishes and paellas with market seafood, charcoal-grilled meats, fresh fish and international cooking, many venues with terraces and long summer hours. Have a relaxed dinner at 21:00 or 21:30 and you'll reach the next stop without rushing.</p>
<p>Find your table in our <a href="/blog/mejores-restaurantes-alcudia-mallorca">ranking of the best restaurants in Alcudia</a> and, if it gets late, in our <a href="/blog/donde-cenar-tarde-port-alcudia">guide to late dinners in Port d'Alcudia</a>. Book ahead in high season.</p>

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

<h3>Foodie plan: dinner + Enjoy</h3>
<p>If food is your thing and you prefer a quieter night without clubbing, a good dinner by the port followed by cocktails at <a href="/enjoy">Enjoy</a> makes a complete evening. The Enjoy terrace is open until 05:30, so there's no rush.</p>

<h3>Full experience plan: dinner + Enjoy + Outxide</h3>
<p>This is the star plan. Dinner by the port at 21:00, cocktails at <a href="/enjoy">Enjoy</a> from 23:00, and the party at <a href="/outxide">Outxide</a> from 1:00. It's the formula followed by those who know the area and want to squeeze every moment out of the night. All without getting in a car.</p>

<h2>What you need to know</h2>
<p><strong>Hours:</strong> Enjoy Terrace opens daily from 17:00 to 05:30. Outxide Club opens Thursday, Friday and Saturday nights (check exact times on its website). Restaurants by the port usually serve until 23:00-23:30 in summer.</p>
<p><strong>Location:</strong> All three venues are in the same area of Port d'Alcudia, on Av. Tucan and Ctra. d'Arta. You can walk between them in under two minutes. No car or taxi needed.</p>
<p><strong>Age:</strong> Outxide Club has an <strong>18+</strong> age requirement. Make sure you bring ID or a passport. Enjoy has no age restriction for drinks and shisha, although alcohol is served to adults only.</p>
<p><strong>Outxide tickets:</strong> Buy your tickets online in advance to skip queues and often get a better price. Available on the <a href="/outxide">Outxide Club</a> website.</p>
<p><strong>Reservations:</strong> We recommend booking a table for dinner, especially on Fridays and Saturdays in high season. For VIP tables at Outxide, get in touch directly through the website.</p>

<p>To complete your planning, don't miss our <a href="/blog/guia-vida-nocturna-alcudia">complete Alcudia nightlife guide</a> and the article on <a href="/blog/que-hacer-alcudia-mallorca">the best plans in Alcudia</a>.</p>

<p><strong>Grupo Enjoy — Enjoy Terrace &amp; Outxide Club. Av. Tucan 1, Port d'Alcudia, Mallorca. <a href="/">All the information on our website.</a></strong></p>`,

      de: `<p>Port d'Alcudia hat das beste Nachtleben im Norden Mallorcas, und das ist keine blosse Meinung — es ist eine Tatsache. Waehrend der Sueden der Insel die Mega-Clubs konzentriert, bietet der Norden etwas anderes: ein vollstaendigeres Ausgeherlebnis, persoenlicher und mit einer Qualitaet, die Erstbesucher ueberrascht. Und das Beste ist, dass <strong>der perfekte Plan in einem einzigen Bereich konzentriert ist</strong>: Av. Tucan und Ctra. d'Arta, wo die drei Locations von <a href="/">Grupo Enjoy</a> es ermoeglichen, vom Abendessen zur Party zu wechseln, ohne ein Taxi zu brauchen.</p>

<p>In diesem Guide zeigen wir Ihnen Schritt fuer Schritt, wie Sie den perfekten Abend in Port d'Alcudia zusammenstellen, mit Variationen fuer jeden Geschmack.</p>

<h2>Schritt 1: Abendessen am Hafen</h2>
<p>Die beste Nacht beginnt immer mit einem guten Abendessen, und Port d'Alcudia macht es einfach: Reisgerichte und Paellas mit Meeresfrüchten vom Markt, Fleisch vom Grill, frischer Fisch und internationale Küche, viele Lokale mit Terrasse und langen Öffnungszeiten im Sommer. Iss entspannt um 21:00 oder 21:30 Uhr, und du erreichst die nächste Station ohne Eile.</p>
<p>Finde deinen Tisch in unserem <a href="/blog/mejores-restaurantes-alcudia-mallorca">Ranking der besten Restaurants in Alcudia</a> und, falls es spät wird, im <a href="/blog/donde-cenar-tarde-port-alcudia">Guide zum späten Abendessen in Port d'Alcudia</a>. In der Hochsaison rechtzeitig reservieren.</p>

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

<h3>Foodie-Plan: Abendessen + Enjoy</h3>
<p>Wenn Gastronomie dein Ding ist und du eine ruhigere Nacht ohne Disco bevorzugst, ist ein gutes Abendessen am Hafen gefolgt von Cocktails im <a href="/enjoy">Enjoy</a> ein kompletter Abend. Die Terrasse des Enjoy ist bis 05:30 Uhr geöffnet — keine Eile.</p>

<h3>Komplett-Plan: Abendessen + Enjoy + Outxide</h3>
<p>Das ist der Star-Plan. Abendessen am Hafen um 21:00 Uhr, Cocktails im <a href="/enjoy">Enjoy</a> ab 23:00 Uhr und Party im <a href="/outxide">Outxide</a> ab 1:00 Uhr. Die Formel derer, die die Gegend kennen und jeden Moment der Nacht auskosten wollen. Alles ohne Auto.</p>

<h2>Was Sie wissen muessen</h2>
<p><strong>Öffnungszeiten:</strong> Enjoy Terrace täglich von 17:00 bis 05:30 Uhr. Outxide Club öffnet Donnerstag-, Freitag- und Samstagnacht (genaue Zeiten auf der Website). Die Restaurants am Hafen servieren im Sommer meist bis 23:00-23:30 Uhr.</p>
<p><strong>Lage:</strong> Alle drei Locations liegen im selben Bereich von Port d'Alcudia, auf der Av. Tucan und Ctra. d'Arta. Unter zwei Minuten zu Fuss zwischen allen. Kein Auto oder Taxi noetig.</p>
<p><strong>Alter:</strong> Der Outxide Club hat eine Altersgrenze von <strong>18+</strong>. Denk an Ausweis oder Reisepass. Im Enjoy gibt es keine Altersbeschränkung, Alkohol wird jedoch nur an Volljährige ausgeschenkt.</p>
<p><strong>Outxide-Tickets:</strong> Online im Voraus kaufen, um Warteschlangen zu vermeiden und oft einen besseren Preis zu bekommen. Verfuegbar auf der <a href="/outxide">Outxide Club</a>-Website.</p>
<p><strong>Reservierungen:</strong> Wir empfehlen, einen Tisch zum Abendessen zu reservieren, besonders freitags und samstags in der Hochsaison. Für VIP-Tische im Outxide direkt über die Website anfragen.</p>

<p>Fuer die vollstaendige Planung lesen Sie unseren <a href="/blog/guia-vida-nocturna-alcudia">kompletten Alcudia Nachtleben-Guide</a> und den Artikel ueber <a href="/blog/que-hacer-alcudia-mallorca">die besten Plaene in Alcudia</a>.</p>

<p><strong>Grupo Enjoy — Enjoy Terrace &amp; Outxide Club. Av. Tucan 1, Port d'Alcudia, Mallorca. <a href="/">Alle Informationen auf unserer Website.</a></strong></p>`,

      fr: `<p>Port d'Alcudia possede la meilleure vie nocturne du nord de Majorque, et ce n'est pas une simple opinion — c'est un fait. Alors que le sud de l'ile concentre les mega-clubs, le nord offre quelque chose de different : une experience nocturne plus complete, plus personnelle et d'une qualite qui surprend les visiteurs. Et le meilleur, c'est que <strong>le plan parfait est concentre dans une seule zone</strong> : Av. Tucan et Ctra. d'Arta, ou les trois etablissements de <a href="/">Grupo Enjoy</a> permettent de passer du diner a la fete sans taxi.</p>

<p>Dans ce guide, nous vous expliquons etape par etape comment organiser la soiree parfaite a Port d'Alcudia, avec des variations pour tous les gouts.</p>

<h2>Etape 1 : Diner au port</h2>
<p>La meilleure nuit commence toujours par un bon diner, et Port d'Alcudia rend cela facile : riz et paellas aux fruits de mer de la criee, viandes a la braise, poisson frais et cuisine internationale, souvent avec terrasse et de longs horaires en ete. Dinez tranquillement a 21h00 ou 21h30 et vous rejoindrez la prochaine etape sans hate.</p>
<p>Trouvez votre table dans notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">classement des meilleurs restaurants d'Alcudia</a> et, s'il se fait tard, dans notre <a href="/blog/donde-cenar-tarde-port-alcudia">guide pour diner tard a Port d'Alcudia</a>. Reservez a l'avance en haute saison.</p>

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

<h3>Plan foodie : diner + Enjoy</h3>
<p>Si la gastronomie est votre truc et que vous preferez une nuit plus calme sans discotheque, un bon diner au port suivi de cocktails a l'<a href="/enjoy">Enjoy</a> compose une soiree complete. La terrasse de l'Enjoy est ouverte jusqu'a 05h30, donc pas de hate.</p>

<h3>Plan experience complete : diner + Enjoy + Outxide</h3>
<p>C'est le plan star. Diner au port a 21h00, cocktails a l'<a href="/enjoy">Enjoy</a> a partir de 23h00, et fete a l'<a href="/outxide">Outxide</a> des 1h00. C'est la formule de ceux qui connaissent la zone et veulent profiter de chaque instant de la nuit. Le tout sans prendre la voiture.</p>

<h2>Ce qu'il faut savoir</h2>
<p><strong>Horaires :</strong> Enjoy Terrace ouvre tous les jours de 17h00 a 05h30. L'Outxide Club ouvre les nuits du jeudi au samedi (horaires exacts sur son site). Les restaurants du port servent generalement jusqu'a 23h00-23h30 en ete.</p>
<p><strong>Emplacement :</strong> Les trois etablissements sont dans la meme zone de Port d'Alcudia, sur l'Av. Tucan et la Ctra. d'Arta. Moins de deux minutes a pied entre chaque. Pas besoin de voiture ni de taxi.</p>
<p><strong>Age :</strong> L'Outxide Club impose un age minimum de <strong>18+</strong>. Pensez a votre piece d'identite ou passeport. L'Enjoy n'a pas de restriction d'age, mais l'alcool n'est servi qu'aux majeurs.</p>
<p><strong>Billets Outxide :</strong> Achetez en ligne a l'avance pour eviter les files d'attente et souvent obtenir un meilleur prix. Disponible sur le site d'<a href="/outxide">Outxide Club</a>.</p>
<p><strong>Reservations :</strong> Nous recommandons de reserver une table pour diner, surtout les vendredis et samedis en haute saison. Pour les tables VIP a l'Outxide, contactez directement via le site.</p>

<p>Pour completer votre planification, consultez notre <a href="/blog/guia-vida-nocturna-alcudia">guide complet de la vie nocturne a Alcudia</a> et l'article sur <a href="/blog/que-hacer-alcudia-mallorca">les meilleurs plans a Alcudia</a>.</p>

<p><strong>Grupo Enjoy — Enjoy Terrace &amp; Outxide Club. Av. Tucan 1, Port d'Alcudia, Majorque. <a href="/">Toutes les informations sur notre site.</a></strong></p>`,

      it: `<p>Port d'Alcudia ha la migliore vita notturna del nord di Maiorca, e non e' solo un'opinione — e' un fatto. Mentre il sud dell'isola concentra i mega-club, il nord offre qualcosa di diverso: un'esperienza notturna piu' completa, piu' personale e con una qualita' che sorprende chi la scopre per la prima volta. E il bello e' che <strong>il piano perfetto e' concentrato in un'unica zona</strong>: Av. Tucan e Ctra. d'Arta, dove i tre locali di <a href="/">Grupo Enjoy</a> permettono di passare dalla cena alla festa senza bisogno di un taxi.</p>

<p>In questa guida vi spieghiamo passo dopo passo come organizzare la serata perfetta a Port d'Alcudia, con variazioni per tutti i gusti.</p>

<h2>Passo 1: Cena al porto</h2>
<p>La notte migliore inizia sempre con una buona cena, e Port d'Alcudia lo rende facile: risi e paella con frutti di mare del mercato, carni alla brace, pesce fresco e cucina internazionale, molti locali con terrazza e orari lunghi in estate. Cena con calma alle 21:00 o 21:30 e arriverai alla tappa successiva senza fretta.</p>
<p>Trova il tuo tavolo nella nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">classifica dei migliori ristoranti di Alcudia</a> e, se si fa tardi, nella <a href="/blog/donde-cenar-tarde-port-alcudia">guida per cenare tardi a Port d'Alcudia</a>. Prenota in anticipo in alta stagione.</p>

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

<h3>Piano foodie: cena + Enjoy</h3>
<p>Se la gastronomia e il tuo forte e preferisci una notte piu tranquilla senza discoteca, una buona cena al porto seguita dai cocktail all'<a href="/enjoy">Enjoy</a> e una serata completa. La terrazza dell'Enjoy e aperta fino alle 05:30, quindi nessuna fretta.</p>

<h3>Piano esperienza completa: cena + Enjoy + Outxide</h3>
<p>Questo e il piano top. Cena al porto alle 21:00, cocktail all'<a href="/enjoy">Enjoy</a> dalle 23:00 e festa all'<a href="/outxide">Outxide</a> dall'1:00. E la formula di chi conosce la zona e vuole spremere ogni momento della notte. Tutto senza prendere l'auto.</p>

<h2>Quello che dovete sapere</h2>
<p><strong>Orari:</strong> Enjoy Terrace apre tutti i giorni dalle 17:00 alle 05:30. L'Outxide Club apre giovedi, venerdi e sabato notte (orari esatti sul sito). I ristoranti del porto di solito servono fino alle 23:00-23:30 in estate.</p>
<p><strong>Posizione:</strong> Tutti e tre i locali sono nella stessa zona di Port d'Alcudia, su Av. Tucan e Ctra. d'Arta. Meno di due minuti a piedi tra uno e l'altro. Niente auto o taxi.</p>
<p><strong>Eta:</strong> L'Outxide Club richiede <strong>18+</strong>. Porta documento o passaporto. L'Enjoy non ha restrizioni di eta, ma l'alcol si serve solo ai maggiorenni.</p>
<p><strong>Biglietti Outxide:</strong> Acquistate online in anticipo per evitare code e spesso ottenere un prezzo migliore. Disponibili sul sito di <a href="/outxide">Outxide Club</a>.</p>
<p><strong>Prenotazioni:</strong> Consigliamo di prenotare un tavolo per cena, soprattutto venerdi e sabato in alta stagione. Per i tavoli VIP all'Outxide, contatta direttamente dal sito.</p>

<p>Per completare la pianificazione, consultate la nostra <a href="/blog/guia-vida-nocturna-alcudia">guida completa alla vita notturna di Alcudia</a> e l'articolo sui <a href="/blog/que-hacer-alcudia-mallorca">migliori piani ad Alcudia</a>.</p>

<p><strong>Grupo Enjoy — Enjoy Terrace &amp; Outxide Club. Av. Tucan 1, Port d'Alcudia, Maiorca. <a href="/">Tutte le informazioni sul nostro sito.</a></strong></p>`,
    },
    author: "Grupo Enjoy",
    date: "2026-05-28",
    updated: "2026-08-29",
    image: "/images/enjoy/485765269_1384374992965504_5931564430169011113_n.jpg",
    tags: ["nightlife", "guide", "alcudia", "mallorca", "enjoy", "outxide"],
    venue: "general",
    readingTime: 8,
    howToSteps: [
      {
        name: {
          es: "Cena en el puerto",
          en: "Dinner by the port",
          de: "Abendessen am Hafen",
          fr: "Diner au port",
          it: "Cena al porto",
        },
        text: {
          es: "Reserva mesa en uno de los restaurantes del puerto para las 21:00: arroces, carnes a la brasa o pescado fresco. Reserva con antelacion en temporada alta.",
          en: "Book a table at one of the restaurants by the port for 21:00: rice dishes, charcoal-grilled meats or fresh fish. Book ahead in high season.",
          de: "Reservieren Sie fuer 21:00 Uhr einen Tisch in einem der Restaurants am Hafen: Reisgerichte, Fleisch vom Grill oder frischer Fisch. In der Hochsaison rechtzeitig reservieren.",
          fr: "Reservez une table dans l'un des restaurants du port pour 21h00 : riz, viandes a la braise ou poisson frais. Reservez a l'avance en haute saison.",
          it: "Prenota un tavolo in uno dei ristoranti del porto per le 21:00: risi, carni alla brace o pesce fresco. Prenota in anticipo in alta stagione.",
        },
        url: "https://www.grupoenjoy.es/blog/mejores-restaurantes-alcudia-mallorca",
      },
      {
        name: {
          es: "Cocktails en Enjoy Terrace",
          en: "Cocktails at Enjoy Terrace",
          de: "Cocktails auf der Enjoy Terrace",
          fr: "Cocktails a l'Enjoy Terrace",
          it: "Cocktail all'Enjoy Terrace",
        },
        text: {
          es: "Cruza a Enjoy Terrace (Av. Tucan 1) sobre las 23:00. Pide un cocktail de autor, disfruta de la shisha premium y deja que la musica chill marque el ritmo. La terraza esta abierta hasta las 05:30.",
          en: "Walk over to Enjoy Terrace (Av. Tucan 1) around 23:00. Order a signature cocktail, enjoy premium shisha and let the chill music set the pace. The terrace is open until 05:30.",
          de: "Gehen Sie gegen 23:00 Uhr zur Enjoy Terrace (Av. Tucan 1). Bestellen Sie einen Signature-Cocktail, geniessen Sie Premium-Shisha und lassen Sie sich von der Chill-Musik treiben. Die Terrasse ist bis 05:30 geoeffnet.",
          fr: "Rendez-vous a l'Enjoy Terrace (Av. Tucan 1) vers 23h00. Commandez un cocktail signature, profitez du chicha premium et laissez la musique chill donner le rythme. La terrasse est ouverte jusqu'a 05h30.",
          it: "Dirigiti all'Enjoy Terrace (Av. Tucan 1) verso le 23:00. Ordina un cocktail d'autore, goditi la shisha premium e lasciati trasportare dalla musica chill. La terrazza e aperta fino alle 05:30.",
        },
        url: "https://www.grupoenjoy.es/enjoy",
      },
      {
        name: {
          es: "Fiesta en Outxide Club",
          en: "Party at Outxide Club",
          de: "Party im Outxide Club",
          fr: "Soiree a l'Outxide Club",
          it: "Festa all'Outxide Club",
        },
        text: {
          es: "Compra tu entrada online via FourVenues y entra en Outxide Club (Av. Tucan 1) desde la 1:00. DJs internacionales, techno, house y reggaeton. Opcion VIP con servicio de botellas. Abierto hasta las 05:30.",
          en: "Buy your ticket online via FourVenues and enter Outxide Club (Av. Tucan 1) from 1:00. International DJs, techno, house and reggaeton. VIP option with bottle service. Open until 05:30.",
          de: "Kaufen Sie Ihr Ticket online ueber FourVenues und betreten Sie den Outxide Club (Av. Tucan 1) ab 1:00 Uhr. Internationale DJs, Techno, House und Reggaeton. VIP-Option mit Flaschenservice. Geoeffnet bis 05:30.",
          fr: "Achetez votre billet en ligne via FourVenues et entrez a l'Outxide Club (Av. Tucan 1) des 1h00. DJs internationaux, techno, house et reggaeton. Option VIP avec service bouteilles. Ouvert jusqu'a 05h30.",
          it: "Acquista il biglietto online via FourVenues ed entra all'Outxide Club (Av. Tucan 1) dall'1:00. DJ internazionali, techno, house e reggaeton. Opzione VIP con servizio bottiglie. Aperto fino alle 05:30.",
        },
        url: "https://www.grupoenjoy.es/outxide",
      },
    ],
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
      es: "Descubre las mejores noches de musica en vivo, DJ sets y fiestas tematicas en Alcudia. Outxide Club y Enjoy Terrace te esperan en Port d'Alcudia, Mallorca.",
      en: "Discover the best nights of live music, DJ sets and themed parties in Alcudia. Outxide Club and Enjoy Terrace await you in Port d'Alcudia, Mallorca.",
      de: "Entdecke die besten Naechte mit Live-Musik, DJ-Sets und Themenpartys in Alcudia. Outxide Club und Enjoy Terrace erwarten dich in Port d'Alcudia, Mallorca.",
      fr: "Decouvrez les meilleures soirees de musique live, DJ sets et fetes a theme a Alcudia. Outxide Club et Enjoy Terrace vous attendent a Port d'Alcudia, Majorque.",
      it: "Scopri le migliori serate di musica dal vivo, DJ set e feste a tema ad Alcudia. Outxide Club ed Enjoy Terrace ti aspettano a Port d'Alcudia, Maiorca.",
    },
    content: {
      es: `<p>Alcudia se ha consolidado como uno de los destinos mas vibrantes de Mallorca cuando cae el sol. Cada verano, miles de visitantes llegan al norte de la isla buscando noches inolvidables con musica en vivo, sesiones de DJ de primer nivel y fiestas tematicas que no encontraras en ningun otro lugar del Mediterraneo. Si estas planeando tu viaje y quieres saber donde disfrutar de la mejor musica en Alcudia, esta guia es para ti.</p>

<h2>La escena musical de Alcudia: mucho mas que turismo de sol y playa</h2>

<p>Port d'Alcudia ha evolucionado enormemente en los ultimos anos. Lo que antes era un destino conocido unicamente por sus playas de arena blanca y aguas turquesas ahora ofrece una vida nocturna a la altura de los mejores destinos europeos. La zona cuenta con locales que apuestan por experiencias musicales cuidadas, con sistemas de sonido profesionales, iluminacion de ultima generacion y una programacion que abarca desde house y techno hasta sesiones de musica comercial, reggaeton y festivales tematicos.</p>

<p>El epicentro de esta transformacion es <a href="/outxide">Outxide Club</a>, la discoteca de referencia en el norte de Mallorca. Junto a ella, <a href="/enjoy">Enjoy Terrace</a> completa la experiencia con cocktails de autor y un ambiente perfecto para comenzar la noche.</p>

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

<p>Y si antes de salir prefieres disfrutar de una buena cena, a pocos pasos tienes varias opciones: nuestra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guia de restaurantes de Alcudia</a> te ayuda a elegir. Carnes a la brasa, arroces y pescados frescos: la combinacion perfecta antes de una noche de musica.</p>

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

<p>At the heart of this transformation is <a href="/outxide">Outxide Club</a>, the benchmark nightclub in northern Mallorca. Alongside it, <a href="/enjoy">Enjoy Terrace</a> completes the experience with signature cocktails and the perfect atmosphere to start your night.</p>

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

<p>And if you prefer to enjoy a proper dinner before heading out, there are several options just steps away: our <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide to restaurants in Alcudia</a> will help you choose. Grilled meats, rice dishes, and fresh seafood: the perfect combination before a night of music.</p>

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

<p>Im Zentrum dieser Verwandlung steht der <a href="/outxide">Outxide Club</a>, der Referenz-Nachtclub im Norden Mallorcas. Daneben vervollstaendigt die <a href="/enjoy">Enjoy Terrace</a> das Erlebnis mit Signature-Cocktails und der perfekten Atmosphaere, um den Abend zu beginnen.</p>

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

<p>Und wenn du vor dem Ausgehen lieber ein gutes Abendessen geniessen moechtest, findest du in unmittelbarer Naehe mehrere Optionen: Unser <a href="/blog/mejores-restaurantes-alcudia-mallorca">Restaurant-Guide fuer Alcudia</a> hilft bei der Wahl. Gegrilltes Fleisch, Reisgerichte und frischer Fisch: die perfekte Kombination vor einer Nacht voller Musik.</p>

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

<p>Au coeur de cette transformation se trouve l'<a href="/outxide">Outxide Club</a>, la discotheque de reference du nord de Majorque. A ses cotes, l'<a href="/enjoy">Enjoy Terrace</a> complete l'experience avec des cocktails signatures et l'ambiance parfaite pour commencer la soiree.</p>

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

<p>Et si vous preferez savourer un bon diner avant de sortir, plusieurs options s'offrent a vous a quelques pas : notre <a href="/blog/mejores-restaurantes-alcudia-mallorca">guide des restaurants d'Alcudia</a> vous aidera a choisir. Viandes grillees, riz et poissons frais : la combinaison parfaite avant une nuit de musique.</p>

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

<p>Al centro di questa trasformazione si trova l'<a href="/outxide">Outxide Club</a>, la discoteca di riferimento nel nord di Maiorca. Accanto ad esso, l'<a href="/enjoy">Enjoy Terrace</a> completa l'esperienza con cocktail d'autore e l'atmosfera perfetta per iniziare la serata.</p>

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

<p>E se prima di uscire preferisci goderti una buona cena, a pochi passi trovi diverse opzioni: la nostra <a href="/blog/mejores-restaurantes-alcudia-mallorca">guida ai ristoranti di Alcudia</a> ti aiuta a scegliere. Carni alla brace, riso e pesce fresco: la combinazione perfetta prima di una notte di musica.</p>

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
    updated: "2026-08-29",
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
