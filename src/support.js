//  Data untuk 5 komponen (Ikon diganti angka, sisa data disederhanakan)
const nodesData = [
    {
        id: 'step3', label: 'Praktik Langsung', baseAngle: 0,
        icon: '1',
        desc: 'Kami tidak hanya mengajarkan teori, namun memberikan kesempatan bagi peserta didik untuk praktik secara langsung.'
    },
    {
        id: 'step2', label: 'Kelas Industri', baseAngle: 72,
        icon: '2',
        desc: 'Kami memngundang beberapa industri untuk memberikan materi di kelas industri sehingga peserta didik dapat belajar secara nyata.'
    },
    {
        id: 'step3', label: 'Moving Class', baseAngle: 144,
        icon: '3',
        desc: 'Kami menerapkan sistem pembelajaran Moving Class agar suasana belajar tidak bosan dan melatih stamina peserta didik.'
    },
    {
        id: 'step4', label: 'Kerja dan Kuliah Luar Negeri', baseAngle: 216,
        icon: '4',
        desc: 'Kami menyediakan kesempatan bagi peserta didik bagi yang berkeinginan untuk kerja atau kuliah di luarnegeri.'
    },
    {
        id: 'step5', label: 'Program SIMI', baseAngle: 288,
        icon: '5',
        desc: 'Program SIMI kami memberikan peluang kerja bagi peserta didik dan alumni kami yang berkompeten dan berkeinginan untuk bekerja.'
    }
];

//  Setup Referensi DOM & Variabel State
const orbitRing = document.getElementById('orbit-ring');
const centerOrb = document.getElementById('center-orb');
const detailsCard = document.getElementById('details-card');
const resumeBtn = document.getElementById('resume-btn');

let currentRotation = 0;
let isOrbiting = true;
let targetRotation = null;
let activeNodeId = null;

const itemInners = [];
const itemWrappers = [];

//  Render Node Komponen ke dalam DOM
nodesData.forEach((node) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'absolute inset-0 pointer-events-none';
    wrapper.style.transform = `rotate(${node.baseAngle}deg)`;

    const itemPositioner = document.createElement('div');
    itemPositioner.className = 'absolute top-[-28px] left-1/2 -translate-x-1/2 pointer-events-auto';
    
    const itemContent = document.createElement('div');
    itemContent.className = 'item-content flex flex-col items-center gap-3 cursor-pointer group';
    
    itemContent.innerHTML = `
        <div class="icon-box w-14 h-14 rounded-full border border-white/10 bg-[#050505] flex items-center justify-center text-xl font-bold text-gray-500 group-hover:text-white group-hover:border-gray-400 group-hover:scale-110 shadow-lg transition-all duration-300">
            ${node.icon}
        </div>
        <span class="label-text text-sm text-gray-500 font-medium tracking-wide group-hover:text-gray-300 transition-colors duration-300">${node.label}</span>
    `;

    itemContent.addEventListener('click', () => activateNode(node));

    itemPositioner.appendChild(itemContent);
    wrapper.appendChild(itemPositioner);
    orbitRing.appendChild(wrapper);

    itemInners.push({ element: itemContent, baseAngle: node.baseAngle });
    itemWrappers.push({ id: node.id, iconBox: itemContent.querySelector('.icon-box'), labelText: itemContent.querySelector('.label-text') });
});

//  Logika Mengaktifkan Node
function activateNode(node) {
    isOrbiting = false;
    activeNodeId = node.id;

    const totalCurrent = currentRotation + node.baseAngle;
    const remainder = totalCurrent % 360;
    let dist = (360 - remainder) % 360;
    
    if (dist > 180) dist -= 360; 
    
    targetRotation = currentRotation + dist;

    updateActiveStyles();

    centerOrb.style.opacity = '0';
    centerOrb.style.transform = 'scale(0.3)';
    
    setTimeout(() => {
        resumeBtn.style.opacity = '1';
        resumeBtn.style.pointerEvents = 'auto';
    }, 500);

    populateCard(node);
    setTimeout(() => {
        detailsCard.style.opacity = '1';
        detailsCard.style.pointerEvents = 'auto';
        detailsCard.style.transform = 'scale(1) translateY(0)';
    }, 300);
}

//  Logika Melanjutkan Orbit
function resumeOrbit() {
    isOrbiting = true;
    targetRotation = null;
    activeNodeId = null;

    updateActiveStyles();

    centerOrb.style.opacity = '1';
    centerOrb.style.transform = 'scale(1)';
    resumeBtn.style.opacity = '0';
    resumeBtn.style.pointerEvents = 'none';

    detailsCard.style.opacity = '0';
    detailsCard.style.pointerEvents = 'none';
    detailsCard.style.transform = 'scale(0.9) translateY(20px)';
}
resumeBtn.addEventListener('click', resumeOrbit);

// 6. Update Gaya Visual (Style) Node
function updateActiveStyles() {
    itemWrappers.forEach(w => {
        if (w.id === activeNodeId) {
            w.iconBox.classList.remove('text-gray-500', 'border-white/10', 'bg-[#050505]');
            w.iconBox.classList.add('text-black', 'border-white', 'bg-white', 'shadow-[0_0_20px_rgba(255,255,255,0.4)]', 'scale-110');
            w.labelText.classList.remove('text-gray-500');
            w.labelText.classList.add('text-white', 'font-semibold');
        } else {
            w.iconBox.classList.add('text-gray-500', 'border-white/10', 'bg-[#050505]');
            w.iconBox.classList.remove('text-black', 'border-white', 'bg-white', 'shadow-[0_0_20px_rgba(255,255,255,0.4)]', 'scale-110');
            w.labelText.classList.add('text-gray-500');
            w.labelText.classList.remove('text-white', 'font-semibold');
            
            if (activeNodeId) {
                w.iconBox.style.opacity = '0.3';
                w.labelText.style.opacity = '0.3';
            } else {
                w.iconBox.style.opacity = '1';
                w.labelText.style.opacity = '1';
            }
        }
    });
}

// 7. Inject Data ke Box Detail (Sudah disederhanakan)
function populateCard(node) {
    detailsCard.innerHTML = `
        <h3 class="text-white text-2xl font-semibold tracking-wide mb-3">${node.label}</h3>
        <p class="text-gray-400 text-base leading-relaxed">${node.desc}</p>
    `;
}

// 8. Animation Loop Utama
export function animate() {
    if (isOrbiting) {
        currentRotation += 0.08; 
    } else if (targetRotation !== null) {
        const diff = targetRotation - currentRotation;
        if (Math.abs(diff) > 0.05) {
            currentRotation += diff * 0.06;
        } else {
            currentRotation = targetRotation;
        }
    }

    orbitRing.style.transform = `rotate(${currentRotation}deg)`;
    
    itemInners.forEach(item => {
        item.element.style.transform = `rotate(${-(currentRotation + item.baseAngle)}deg)`;
    });

    requestAnimationFrame(animate);
}

