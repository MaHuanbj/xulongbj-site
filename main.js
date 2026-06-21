// ==================== 模拟学员数据 ====================
const studentDatabase = [
  { name: '张三', phone: '1234', status: 'admitted', level: '金牌', comment: '逻辑思维与创新能力突出，评审组一致推荐录取。' },
  { name: '李四', phone: '5678', status: 'admitted', level: '银牌', comment: '编程基础扎实，具有良好的AI学习潜力。' },
  { name: '王五', phone: '9012', status: 'pending', level: '待评', comment: '材料审核中，预计3个工作日内出结果。' },
  { name: '赵六', phone: '3456', status: 'admitted', level: '铜牌', comment: '综合素养良好，具有发展潜力。' },
  { name: '刘七', phone: '7890', status: 'rejected', level: '未录取', comment: '本次未达录取标准，建议参加下期选拔。' },
];

// ==================== 导航栏滚动效果 ====================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-highlight)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // 导航栏阴影
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // 导航高亮
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ==================== 汉堡菜单 ====================
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksContainer.classList.toggle('open');
});

// 点击导航链接关闭菜单
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinksContainer.classList.remove('open');
  });
});

// ==================== 滚动显示动画 ====================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // 添加延迟，让元素依次出现
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// ==================== 录取查询功能 ====================
const queryForm = document.getElementById('queryForm');
const queryResult = document.getElementById('queryResult');
const queryError = document.getElementById('queryError');
const resultStatus = document.getElementById('resultStatus');
const resultName = document.getElementById('resultName');
const resultComment = document.getElementById('resultComment');

queryForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('studentName').value.trim();
  const phone = document.getElementById('phoneLastFour').value.trim();

  // 隐藏之前的结果
  queryResult.style.display = 'none';
  queryError.style.display = 'none';

  // 搜索学员
  const student = studentDatabase.find(s => {
    if (name && phone) {
      return s.name === name && s.phone === phone;
    } else if (name) {
      return s.name === name;
    } else if (phone) {
      return s.phone === phone;
    }
    return false;
  });

  if (student) {
    // 显示结果
    resultStatus.className = 'result-status';
    if (student.status === 'admitted') {
      resultStatus.classList.add('admitted');
      resultStatus.textContent = `✅ 已录取 · ${student.level}`;
    } else if (student.status === 'pending') {
      resultStatus.classList.add('pending');
      resultStatus.textContent = '⏳ 审核中';
    } else {
      resultStatus.classList.add('rejected');
      resultStatus.textContent = '❌ 未录取';
    }

    resultName.textContent = student.name;
    resultComment.textContent = student.comment;
    queryResult.style.display = 'block';
  } else {
    queryError.style.display = 'block';
  }
});

// ==================== 平滑滚动 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
