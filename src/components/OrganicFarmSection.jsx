const FEATURES = [
  {
    image: "/icons/wheat.png",
    circleClass: "green",
    titlePlain: "fresh from",
    titleStrong: "our farm",
    text: "Freshly harvested produce, carefully grown and delivered straight from local farms.",
  },
  {
    image: "/icons/herb.png",
    circleClass: "yellow",
    titlePlain: "100%",
    titleStrong: "organic produce",
    text: "Naturally grown fruits, vegetables and herbs with responsible farming practices.",
  },
  {
    image: "/icons/carrot.png",
    circleClass: "peach",
    titlePlain: "",
    titleStrong: "premium harvest",
    text: "Carefully selected seasonal produce chosen for freshness, quality and natural flavor.",
  },
  {
    image: "/icons/apple.png",
    circleClass: "beige",
    titlePlain: "naturally",
    titleStrong: "grown",
    text: "Good food starts with healthy soil, mindful cultivation and respect for nature.",
  },
];

function OrganicFarmSection() {
  const handleScrollClick = () => {
    window.scrollBy({
      top: window.innerHeight * 0.7,
      behavior: "smooth",
    });
  };

  return (
    <section className="organic-section">
      <div className="leaf-cluster leaf-left">
        <span className="leaf leaf-1"></span>
        <span className="leaf leaf-2"></span>
        <span className="leaf leaf-3"></span>
        <span className="leaf leaf-4"></span>
        <span className="stem"></span>
      </div>

      <div className="leaf-cluster leaf-right">
        <span className="leaf leaf-1"></span>
        <span className="leaf leaf-2"></span>
        <span className="leaf leaf-3"></span>
        <span className="leaf leaf-4"></span>
        <span className="stem"></span>
      </div>

      <div className="content">
        <div className="heading">
          <h1>
            <span>We Grow</span> <strong>Fresh From Nature</strong>
          </h1>

          <div className="heading-line">
            <span></span>
            <small>ABOUT FARMS</small>
            <span></span>
          </div>

          <p>
            We connect you with fresh, seasonal produce grown with care by local
            farmers. From naturally cultivated fruits and vegetables to
            wholesome farm products, we bring the goodness of the harvest closer
            to you.
          </p>
        </div>

        <div className="features">
          {FEATURES.map((f, i) => (
            <div className="feature" key={i}>
              <div className={`icon-circle ${f.circleClass}`}>
                <img
                  src={f.image}
                  alt={`${f.titlePlain} ${f.titleStrong}`.trim()}
                  className="icon-img"
                />
              </div>

              <h3>
                {f.titlePlain && <>{f.titlePlain} </>}
                <strong>{f.titleStrong}</strong>
              </h3>

              <p>{f.text}</p>
            </div>
          ))}
        </div>

        <div className="fruit-area">
          <img
            src="https://pngimg.com/d/grapefruit_PNG15250.png"
            className="fruit-image"
            alt="Fresh grapefruit"
          />
        </div>
      </div>

      <button
        className="scroll-button"
        id="scrollButton"
        aria-label="Scroll"
        onClick={handleScrollClick}
      >
        <i className="fa-solid fa-angle-down"></i>
      </button>
    </section>
  );
}

export default OrganicFarmSection;
