const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const menuLinks = document.querySelectorAll('.menu-link');
const sections = document.querySelectorAll('main > section');

// Open the menu overlay
menuToggle.addEventListener('click', function(e) {
  menuOverlay.classList.add('open');
  document.body.style.overflow = "hidden";
});

// Close overlay when clicking X or outside menu content
menuClose.addEventListener('click', function(e) {
  menuOverlay.classList.remove('open');
  document.body.style.overflow = "";
});
menuOverlay.addEventListener('click', function(e) {
  if (e.target === this) {
    menuOverlay.classList.remove('open');
    document.body.style.overflow = "";
  }
});

// Show correct section on menu link click
menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    menuLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(sec => sec.classList.remove('section-active'));
    this.classList.add('active');
    const sectionId = this.getAttribute('data-section');
    document.getElementById(sectionId).classList.add('section-active');
    menuOverlay.classList.remove('open');
    document.body.style.overflow = "";
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
});

// Show Home on load
document.addEventListener('DOMContentLoaded', () => {
  menuLinks[0].classList.add('active');
  sections[0].classList.add('section-active');
});

// Typewriter effect
const phrases = [
  { type: 'text', content: "Motto: Low Code To No Code" },
  { type: 'text', content: "I build scalable Salesforce solutions." },
  { type: 'text', content: "Apex | LWC | Integrations | Automation." },
  { type: 'text', content: "Let's create business impact together!" },
  { type: 'image', src: "2021-03_Badge_SF-Certified_Administrator_High-Res.png", alt: "Salesforce Certified Admin", width: 68 },
  { type: 'image', src: "2021-03_Badge_SF-Certified_Platform-Developer-I_High-Res.png", alt: "Salesforce Certified Admin", width: 68 },
  { type: 'image', src: "2021-03_Badge_SF-Certified_Platform-Developer-II_High-Res.png", alt: "Salesforce Certified Admin", width: 68 },
  { type: 'image', src: "2021-03_Badge_SF-Certified_Sales-Cloud-Consultant_High-Res.png", alt: "Salesforce Certified Admin", width: 68 },
  { type: 'image', src: "2021-03_Badge_SF-Certified_Service-Cloud-Consultant_High-Res.png", alt: "Salesforce Certified Admin", width: 68 },
  // Add more! {type:'image',src:'anotherbadge.png',alt:'Badge',width:60}
];

const container = document.getElementById('typewriter-multi-flex');
let lines = Array(phrases.length).fill('');
let typingStep = 0;
let deletingStep = 3; // only delete text lines (not images)
let mode = 'typing';
let badgeShowStep = 0; // which badge to show/hide

function updateLines(showCount = 0) {
  container.innerHTML = '';
  // Render text lines
  for (let i = 0; i < phrases.length; i++) {
    if (phrases[i].type === 'text') {
      let lineDiv = document.createElement('div');
      lineDiv.textContent = lines[i];
      lineDiv.style.fontFamily = 'Fira Mono, Consolas, monospace';
      lineDiv.style.color = '#4e54c8';
      lineDiv.style.fontSize = '1.13rem';
      lineDiv.style.letterSpacing = '1px';
      lineDiv.style.marginBottom = '3px';
      container.appendChild(lineDiv);
    }
  }
  // Render images in a row, and only show up to showCount images
  const imageRow = document.createElement('div');
  imageRow.className = 'typewriter-image-row';
  let imageIdx = 0;
  for (let i = 0; i < phrases.length; i++) {
    if (phrases[i].type === 'image') {
      let img = document.createElement('img');
      img.src = phrases[i].src;
      img.alt = phrases[i].alt || '';
      img.style.width = (phrases[i].width || 60) + 'px';
      img.style.height = 'auto';
      img.style.verticalAlign = 'middle';
      img.className = 'typewriter-badge' + (imageIdx < showCount ? ' show' : '');
      imageRow.appendChild(img);
      imageIdx++;
    }
  }
  if (imageRow.children.length) container.appendChild(imageRow);
}

function multiTypewriterFlex() {
  if (mode === 'typing') {
    if (typingStep < 4) { // Only for text lines
      if (lines[typingStep].length < phrases[typingStep].content.length) {
        lines[typingStep] += phrases[typingStep].content[lines[typingStep].length];
        updateLines();
        setTimeout(multiTypewriterFlex, 60);
      } else {
        typingStep++;
        setTimeout(multiTypewriterFlex, 350);
      }
    } else {
      // After all text is typed, show badges/images one after another
      let imageCount = phrases.filter(p => p.type === 'image').length;
      if (badgeShowStep < imageCount) {
        badgeShowStep++;
        updateLines(badgeShowStep);
        setTimeout(multiTypewriterFlex, 380);
      } else {
        // All images are visible, pause, then start deleting
        setTimeout(() => { mode = 'deleting'; multiTypewriterFlex(); }, 1600);
      }
    }
  } else if (mode === 'deleting') {
    // Hide images one by one in reverse
    let imageCount = phrases.filter(p => p.type === 'image').length;
    if (badgeShowStep > 0) {
      badgeShowStep--;
      updateLines(badgeShowStep);
      setTimeout(multiTypewriterFlex, 210);
    } else if (deletingStep >= 0) {
      if (lines[deletingStep].length > 0) {
        lines[deletingStep] = lines[deletingStep].slice(0, -1);
        updateLines();
        setTimeout(multiTypewriterFlex, 32);
      } else {
        deletingStep--;
        setTimeout(multiTypewriterFlex, 160);
      }
    } else {
      // All lines and images deleted, reset
      lines = Array(phrases.length).fill('');
      typingStep = 0;
      deletingStep = 3;
      badgeShowStep = 0;
      mode = 'typing';
      setTimeout(multiTypewriterFlex, 500);
    }
  }
}

multiTypewriterFlex();
