const hoverTooltip = () => {
  const tooltipContainers = document.querySelectorAll('[data-hover-tooltip]');

  if (document.documentElement.offsetWidth > 940) {
    bindTooltip();
  }

  function bindTooltip() {
    tooltipContainers.forEach(function(item) {
      item.addEventListener('mouseenter', function() {
        createTooltip(item);
      });

      item.addEventListener('mouseleave', function() {
        destroyTooltip();
      });

      item.addEventListener('mousemove', function(evt) {
        setTooltipPosition(evt);
      });
    });
  }

  function createTooltip(item) {
    const tooltipText = item.getAttribute('data-hover-tooltip'),
      newTooltip = `<span class="hover-tooltip">${tooltipText}</span>`;

    document.body.insertAdjacentHTML('beforeend', newTooltip);
  }

  function destroyTooltip() {
    const tooltip = document.querySelector('.hover-tooltip');

    try {
      tooltip.remove();
    } catch(err) {}
  }

  function setTooltipPosition(evt) {
    const tooltip = document.querySelector('.hover-tooltip'),
      tooltipWidth = tooltip.offsetWidth,
      tooltipHeight = tooltip.offsetHeight,
      tooltipRightPoint = Math.ceil(tooltip.getBoundingClientRect().right),
      windowWidth = document.documentElement.offsetWidth;

    let cursorX = evt.pageX,
      cursorY = evt.pageY;

    // let tooltipOnRight;

    // if (tooltipRightPoint < windowWidth) {
    //   tooltip.style.cssText = `top: ${cursorY}px; left: ${cursorX}px;`;
    // } else {
    //   tooltip.style.cssText = `top: ${cursorY}px; left: ${cursorX - tooltipWidth}px;`;
    // }

    tooltip.style.cssText = `top: ${cursorY}px; left: ${cursorX}px;`;

    if (evt.target.getAttribute('data-tooltip-left') || evt.target.closest('[data-tooltip-left]')) {
      tooltip.style.cssText = `top: ${cursorY - (tooltipHeight)}px; left: ${cursorX - tooltipWidth}px; transform: translateY(-4px);`;
    }
  }
};

export default hoverTooltip;
