const utils = {
  getIconType: (gameCategory) => {
    switch (gameCategory) {
      case "card":
        return 'style';
      case "board":
        return 'dashboard';
      case "dice":
        return 'casino';
      case "recreational sports":
        return "golf_course";
      default:
        return "fiber_manual_record"
    };
  },
  handleScroll: () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("top_arrow").className = "slideUp";
    } else {
      document.getElementById("top_arrow").className = "slideDown";
    };
  },
  scrollTo: (element) => {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: document.getElementById(element).offsetTop
    });
  }
};

export default utils;
