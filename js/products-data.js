// ======================================================
// SHARED PRODUCT DATA (MULTI-PAGE DETAIL SUPPORT)
// Used by: products.js (carousel) and product-detail.js
// ======================================================

const PRODUCTS_DATA = [
  {
    slug: "flue-cured-virginia",
    badge: "Flue-Cured Virginia",
    image: "assets/images/c_flue-cured.jpg",
    title: "Flue-Cured Virginia",
    tagline: "Bright, aromatic leaf grown across Lombok and Bali",
    summary:
      "In Indonesia, Flue-Cured Virginia (FCV) tobaccos are grown mainly in the Lombok and Bali regions. Leaves from each region carry distinct characteristics — Lombok FCVs lean toward a flavorful, aromatic profile, while Bali FCVs are known for their bold, high-impact character.",
    pages: [
      {
        pageTitle: "Overview",
        content:
          "Flue-Cured Virginia is one of the most widely cultivated tobacco styles in Indonesia, grown primarily across Lombok and Bali. It forms the backbone of many blended cigarette products thanks to its bright color, natural sweetness, and reliable combustibility."
      },
      {
        pageTitle: "Curing Method",
        content:
          "The leaf is cured using heated air circulated through enclosed barns, allowing precise control over color, sugar retention, and leaf texture. The process locks in the natural sweetness of the leaf while producing the bright golden-orange color the style is known for."
      },
      {
        pageTitle: "Regional Character",
        content:
          "Indonesian FCV is separated by growing region because soil and microclimate shift the finished character noticeably. Lombok's volcanic soils and drier growing season tend to produce a more aromatic, flavor-forward leaf, while Bali's conditions push toward a fuller, higher-impact smoke."
      },
      {
        pageTitle: "Grading & Selection",
        content:
          "Leaves are hand-graded by stalk position, color uniformity, and body before baling. Upper-stalk leaves typically carry more strength and are used sparingly, while lower and middle leaves provide the lighter, sweeter notes that make up the bulk of a blend."
      },
      {
        pageTitle: "Usage & Blending",
        content:
          "This style is widely used as a base component in blended cigarette products, prized for its combustibility and consistent burn. It is frequently paired with Burley and a touch of Oriental leaf to round out a finished blend."
      }
    ],
    specs: [
      { label: "Curing Method", value: "Flue-cured (heated air)" },
      { label: "Growing Regions", value: "Lombok, Bali" },
      { label: "Leaf Color", value: "Bright orange to golden" },
      { label: "Typical Use", value: "Blended cigarette tobacco" }
    ]
  },
  {
    slug: "rajangan",
    badge: "Rajangan",
    image: "assets/images/rajangan.jpg",
    title: "Rajangan",
    tagline: "Indonesia's signature hand-cut rag tobacco",
    summary:
      "Indonesia is well known for its Rajangan tobacco, a farmer's hand-cut rag variety. Unlike cut rag produced elsewhere, Rajangan leaves are cut while still green, giving the tobacco its distinctive texture and character.",
    pages: [
      {
        pageTitle: "Overview",
        content:
          "Rajangan is one of Indonesia's most distinctive tobacco styles — a hand-cut rag produced directly on smallholder farms rather than in industrial processing lines. It is deeply woven into the country's traditional kretek culture."
      },
      {
        pageTitle: "Hand-Cut Tradition",
        content:
          "Rajangan is produced directly by smallholder farmers, who hand-cut the tobacco leaf while it is still green rather than after full curing. This early cutting is what sets Rajangan apart from cut-rag tobaccos produced in other parts of the world, and it demands considerable skill from the farmer."
      },
      {
        pageTitle: "Drying Process",
        content:
          "After cutting, the shredded leaf is spread out and dried under open sun on bamboo mats or racks. Drying time is adjusted daily by the farmer based on humidity and sunlight, a practice passed down through generations rather than fixed by machine."
      },
      {
        pageTitle: "Regional & Varietal Diversity",
        content:
          "Because the leaf is processed close to harvest and largely by hand, Rajangan carries strong regional and varietal diversity, with texture and aroma shaped heavily by local growing traditions passed down through generations of farming families."
      },
      {
        pageTitle: "Role in Kretek Industry",
        content:
          "Rajangan is closely tied to Indonesia's traditional kretek (clove cigarette) industry, where its distinctive cut and character play an important role in the finished blend, contributing much of the texture and aroma associated with kretek products."
      }
    ],
    specs: [
      { label: "Curing Method", value: "Sun-dried, hand-cut green" },
      { label: "Origin", value: "Smallholder farms, Indonesia" },
      { label: "Leaf Texture", value: "Coarse, hand-rolled cut" },
      { label: "Typical Use", value: "Kretek and traditional blends" }
    ]
  },
  {
    slug: "sun-cured",
    badge: "Sun-Cured",
    image: "assets/images/b_sun-cured.jpg",
    title: "Sun-Cured",
    tagline: "Naturally dried under the Indonesian sun",
    summary:
      "Sun-Cured tobaccos are cured naturally under direct sunlight. Popular Indonesian varieties include Kasturi, Madura, Jatim, Lombok, Jombang, Paiton, Weleri, Kedu, Tulungagung, Besuki, Garut, Galek, and Lumajang VO — each named after the region where it is grown.",
    pages: [
      {
        pageTitle: "Overview",
        content:
          "Sun-Cured tobacco represents one of Indonesia's oldest and most regionally diverse leaf categories, with dozens of named varieties grown across East Java and beyond, each tied to a specific growing area."
      },
      {
        pageTitle: "Natural Curing Process",
        content:
          "Sun-Curing relies entirely on natural sunlight rather than artificial heat, allowing the leaf to dry gradually. This slower, weather-dependent process gives each regional variety its own character, shaped by local humidity, sunlight hours, and soil."
      },
      {
        pageTitle: "Regional Naming & Character",
        content:
          "Indonesia's sun-cured varieties are typically named directly after their region of origin, a reflection of how strongly local growing conditions define the finished leaf's aroma, color, and body."
      },
      {
        pageTitle: "Notable Varieties",
        content:
          "Kasturi and Madura are prized for their aromatic qualities and are frequently sought after for wrapper use, while Besuki is known for its elasticity and is widely used as a binder. Garut and Lumajang VO round out the family with fuller-bodied, filler-grade character."
      },
      {
        pageTitle: "Global Demand & Usage",
        content:
          "Varieties such as Besuki and Kasturi are particularly well known internationally, and are often sought after as wrapper or filler components depending on the leaf grade, supplying both domestic kretek producers and export markets."
      }
    ],
    specs: [
      { label: "Curing Method", value: "Natural sun-drying" },
      { label: "Key Varieties", value: "Kasturi, Madura, Besuki, Garut, and more" },
      { label: "Growing Regions", value: "East Java and surrounding areas" },
      { label: "Typical Use", value: "Wrapper, binder, and filler blends" }
    ]
  },
  {
    slug: "dark-air-cured",
    badge: "Dark Air Cured",
    image: "assets/images/dark-air.jpg",
    title: "Dark Air Cured",
    tagline: "Slow-dried in open barns for a full-bodied leaf",
    summary:
      "Dark Air-Cured tobacco is left to dry slowly in open, well-ventilated barns without added heat or smoke. The slow process develops a rich, dark leaf with a full-bodied character prized in traditional blends.",
    pages: [
      {
        pageTitle: "Overview",
        content:
          "Dark Air-Cured tobacco is defined by patience: the leaf is given weeks of unhurried, ambient drying time to develop the deep color and full body that lighter, faster-cured styles cannot match."
      },
      {
        pageTitle: "Barn Curing Method",
        content:
          "Dark Air-Cured leaf hangs in open, well-ventilated barns for an extended period, relying entirely on ambient airflow rather than artificial heat or smoke to remove moisture from the leaf."
      },
      {
        pageTitle: "Flavor & Leaf Development",
        content:
          "This unhurried curing window allows sugars and starches in the leaf to break down more fully than in flue-cured tobacco, producing a darker, more full-bodied leaf with a fuller, earthier character."
      },
      {
        pageTitle: "Fermentation",
        content:
          "Following air-curing, the leaf is often bulked and left to ferment, generating gentle heat that further deepens color and rounds out any harshness, a step that distinguishes the finest dark air-cured lots."
      },
      {
        pageTitle: "Blending Application",
        content:
          "The resulting tobacco is commonly used where a heavier, richer note is desired in a finished blend, balancing brighter or milder components and adding weight to the overall smoke."
      }
    ],
    specs: [
      { label: "Curing Method", value: "Air-cured (no added heat)" },
      { label: "Curing Duration", value: "Several weeks in open barns" },
      { label: "Leaf Color", value: "Dark brown" },
      { label: "Typical Use", value: "Full-bodied traditional blends" }
    ]
  },
  {
    slug: "dark-fired-cured",
    badge: "Dark Fired Cured",
    image: "assets/images/dark-fired.jpg",
    title: "Dark Fired Cured",
    tagline: "Cured over hardwood fires for a smoky, bold profile",
    summary:
      "Dark Fired-Cured tobacco is cured over smoldering hardwood fires, giving the leaves a distinctive smoky aroma and deep, dark color. This traditional method is valued for the bold flavor it brings to a blend.",
    pages: [
      {
        pageTitle: "Overview",
        content:
          "Dark Fired-Cured tobacco is the boldest style in the portfolio, defined by direct exposure to hardwood smoke during curing — a labor-intensive method reserved for leaf destined to add real character to a blend."
      },
      {
        pageTitle: "Hardwood Firing Method",
        content:
          "Unlike air-cured or sun-cured methods, Dark Fired-Cured leaf is cured directly over smoldering hardwood fires. The smoke permeates the hanging leaf over an extended period, infusing it with a distinctive smoky aroma alongside its deep, dark coloration."
      },
      {
        pageTitle: "Process Monitoring",
        content:
          "The firing process is labor-intensive and closely monitored, since fire intensity and duration directly shape the final smokiness and body of the leaf. Skilled firemen adjust the smolder continuously to avoid scorching the hanging leaf."
      },
      {
        pageTitle: "Aroma Profile",
        content:
          "The finished leaf carries a signature smoky, almost resinous aroma that sets it apart from every other curing style in the range, along with a heavier body and darker coloration than sun- or air-cured tobaccos."
      },
      {
        pageTitle: "Blend Profile & Accent",
        content:
          "This style is valued as a bold flavor and aroma component, typically used in smaller proportions within a blend to add depth and character without overwhelming the lighter leaves around it."
      }
    ],
    specs: [
      { label: "Curing Method", value: "Fired over smoldering hardwood" },
      { label: "Leaf Color", value: "Deep, dark brown" },
      { label: "Signature Trait", value: "Smoky aroma" },
      { label: "Typical Use", value: "Flavor and aroma accent in blends" }
    ]
  },
  {
    slug: "burley",
    badge: "Burley",
    image: "assets/images/burley.jpg",
    title: "Burley",
    tagline: "A light, low-sugar leaf prized for its absorbency",
    summary:
      "Burley tobacco is air-cured in barns, resulting in a light, low-sugar leaf with a naturally mild flavor. Its high absorbency makes it a popular base for a wide range of tobacco blends.",
    pages: [
      {
        pageTitle: "Overview",
        content:
          "Burley is the quiet workhorse of a tobacco blend — light in color, mild in flavor, and exceptionally good at carrying casings and flavorings, which makes it a foundational component across many finished products."
      },
      {
        pageTitle: "Air-Curing & Low Sugar",
        content:
          "Burley is air-cured rather than flue-cured, which allows the leaf's sugar content to break down almost entirely during the curing process. The result is a light-colored leaf with a naturally mild, low-sugar flavor profile."
      },
      {
        pageTitle: "High Absorbency",
        content:
          "One of Burley's defining traits is its high absorbency, which makes it especially receptive to casings and flavorings applied during blend production, allowing manufacturers to shape a consistent finished taste."
      },
      {
        pageTitle: "Growing Conditions",
        content:
          "Burley favors well-drained, fertile soils and a moderate growing season. Careful field management keeps the plant's natural sugar and nicotine levels within the narrow range that defines a clean, mild-cured leaf."
      },
      {
        pageTitle: "Blend Versatility",
        content:
          "Because of this versatility, Burley is a foundational component in many international blended tobacco products, valued for the neutral base it provides and the flexibility it gives blenders."
      }
    ],
    specs: [
      { label: "Curing Method", value: "Air-cured (barn dried)" },
      { label: "Leaf Color", value: "Light tan to reddish-brown" },
      { label: "Signature Trait", value: "High absorbency, low sugar" },
      { label: "Typical Use", value: "Base leaf for blended tobacco products" }
    ]
  }
];

if (typeof window !== "undefined") {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
}