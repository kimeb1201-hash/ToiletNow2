// =====================================================
// ✅ 1. Firebase 설정
//    Firebase Console → 프로젝트 설정 → 웹앱 추가 후
//    아래 firebaseConfig 값을 실제 값으로 교체하세요
// =====================================================
const firebaseConfig = {
   apiKey: "AIzaSyAdUf6LmkjFMNgNtenkTeKs6sxH-sYXRBQ",
    authDomain: "toilet-now-26b3d.firebaseapp.com",
    projectId: "toilet-now-26b3d",
    storageBucket: "toilet-now-26b3d.firebasestorage.app",
    messagingSenderId: "514569501313",
    appId: "1:514569501313:web:cca6374cf90f42262f6b80",
    measurementId: "G-S2E085YG58"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// =====================================================
// ✅ 2. 화장실 데이터 (이화여대 전체 건물)
// =====================================================
const toilets = [
  // ─── ECC (이화캠퍼스복합단지) ───
  {
    id: 1,
    name: "ECC B1층 화장실",
    building: "ECC",
    floor: "B1",
    distance: 2,
    cleanliness: 3.5,
    crowd: "보통",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "익명",
    time: "1 month",
    memo: "강의실 옆이라 쉬는시간에 사람 몰림. 그 외에는 쾌적함",
    lat: 37.56219,
    lng: 126.94682
  },
  {
    id: 2,
    name: "ECC B4층 화장실",
    building: "ECC",
    floor: "B4",
    distance: 2,
    cleanliness: 2,
    crowd: "보통",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "익명",
    time: "1 month",
    memo: "변기 8개중에 5개가 고장인데 현대예술임?",
    lat: 37.56219,
    lng: 126.94682
  },

  // ─── 학관 (학생문화관) ───
  {
    id: 3,
    name: "학관 구관 1층 화장실",
    building: "학관",
    floor: "1층",
    distance: 4,
    cleanliness: 3.0,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "지은",
    time: "3 days",
    memo: "낡긴 했지만 그래도 청결함. 비밀번호 필요 없음",
    lat: 37.56261,
    lng: 126.94751
  },
  {
    id: 4,
    name: "학관 신관 2층 화장실",
    building: "학관",
    floor: "2층",
    distance: 4,
    cleanliness: 4.2,
    crowd: "혼잡",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "서정",
    time: "15 minute",
    memo: "피크타임에 대기인원 많음. 휴지도 부족함",
    lat: 37.56261,
    lng: 126.94751
  },

  // ─── 포스코관 ───
  {
    id: 5,
    name: "포스코관 1층 화장실",
    building: "포스코관",
    floor: "1층",
    distance: 3,
    cleanliness: 1,
    crowd: "혼잡",
    soap: false,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "최민지",
    time: "now",
    memo: "악취 심하고 수압이 약해요. 변기뚜껑도 몇 개 없음..",
    lat: 37.56317,
    lng: 126.94804
  },
  {
    id: 6,
    name: "포스코관 3층 화장실",
    building: "포스코관",
    floor: "3층",
    distance: 3,
    cleanliness: 3.8,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "하늘",
    time: "1 day",
    memo: "3층이라 사람이 적어서 좋아요. 비교적 깨끗함",
    lat: 37.56317,
    lng: 126.94804
  },

  // ─── 아산공학관 ───
  {
    id: 7,
    name: "아산공학관 1층 화장실",
    building: "아산공학관",
    floor: "1층",
    distance: 6,
    cleanliness: 4.0,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "공학도",
    time: "2 days",
    memo: "공대건물이라 여자화장실 대기가 거의 없어요 ㅋㅋ",
    lat: 37.56396,
    lng: 126.94711
  },
  {
    id: 8,
    name: "아산공학관 지하 화장실",
    building: "아산공학관",
    floor: "B1",
    distance: 6,
    cleanliness: 3.5,
    crowd: "보통",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "수진",
    time: "5 days",
    memo: "지하라 약간 습함. 그래도 청결 관리는 됨",
    lat: 37.56396,
    lng: 126.94711
  },

  // ─── 신공학관 ───
  {
    id: 9,
    name: "신공학관 2층 화장실",
    building: "신공학관",
    floor: "2층",
    distance: 7,
    cleanliness: 4.3,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "박연",
    time: "1 day",
    memo: "신축 건물이라 시설이 깨끗해요! 강력 추천",
    lat: 37.56370,
    lng: 126.94648
  },
  {
    id: 10,
    name: "신공학관 4층 화장실",
    building: "신공학관",
    floor: "4층",
    distance: 7,
    cleanliness: 4.5,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "혜진",
    time: "3 hours",
    memo: "4층은 거의 아무도 없음. 시설도 최상급",
    lat: 37.56370,
    lng: 126.94648
  },

  // ─── 신세계관 ───
  {
    id: 11,
    name: "신세계관 1층 화장실",
    building: "신세계관",
    floor: "1층",
    distance: 5,
    cleanliness: 4.8,
    crowd: "보통",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "민아",
    time: "1 hour",
    memo: "신세계 지원이라 그런가 시설이 럭셔리함. 학교 화장실 맞나 싶을 정도",
    lat: 37.56243,
    lng: 126.94837
  },
  {
    id: 12,
    name: "신세계관 3층 화장실",
    building: "신세계관",
    floor: "3층",
    distance: 5,
    cleanliness: 4.6,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "지수",
    time: "30 minute",
    memo: "3층도 넓고 깨끗해요. 파우더룸도 있음!",
    lat: 37.56243,
    lng: 126.94837
  },

  // ─── 생활환경관 ───
  {
    id: 13,
    name: "생활환경관 지하 화장실",
    building: "생활환경관",
    floor: "B1",
    distance: 5,
    cleanliness: 2.5,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "yongchil choi",
    time: "2 days",
    memo: "와 학교안에서 이렇게 낡은 화장실 처음 봄. 그리고 물이 개뜨거움 손대임",
    lat: 37.56182,
    lng: 126.94609
  },
  {
    id: 14,
    name: "생활환경관 2층 화장실",
    building: "생활환경관",
    floor: "2층",
    distance: 5,
    cleanliness: 3.2,
    crowd: "보통",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "나연",
    time: "4 days",
    memo: "지하보다는 훨씬 나음. 그냥 평범한 화장실",
    lat: 37.56182,
    lng: 126.94609
  },

  // ─── 이화·삼성교육문화관 ───
  {
    id: 15,
    name: "이화·삼성교육문화관 1층 화장실",
    building: "이화·삼성교육문화관",
    floor: "1층",
    distance: 8,
    cleanliness: 4.4,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "예은",
    time: "2 days",
    memo: "깔끔하고 넓어요. 파우더룸도 있음",
    lat: 37.56146,
    lng: 126.94728
  },

  // ─── 법학관 ───
  {
    id: 16,
    name: "법학관 2층 화장실",
    building: "법학관",
    floor: "2층",
    distance: 6,
    cleanliness: 3.6,
    crowd: "보통",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "법대생",
    time: "1 day",
    memo: "무난함. 특이사항 없음",
    lat: 37.56298,
    lng: 126.94651
  },

  // ─── 교육관 ───
  {
    id: 17,
    name: "교육관 B1층 화장실",
    building: "교육관",
    floor: "B1",
    distance: 3,
    cleanliness: 2.8,
    crowd: "혼잡",
    soap: true,
    paper: false,
    available: true,
    favorite: false,
    reviewer: "수업중",
    time: "6 hours",
    memo: "쉬는시간에 줄 섬. 휴지 자주 떨어짐. 챙겨가세요",
    lat: 37.56348,
    lng: 126.94739
  },
  {
    id: 18,
    name: "교육관 3층 화장실",
    building: "교육관",
    floor: "3층",
    distance: 3,
    cleanliness: 3.4,
    crowd: "보통",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "예비교사",
    time: "2 days",
    memo: "3층은 비교적 한산함",
    lat: 37.56348,
    lng: 126.94739
  },

  // ─── 체육관 ───
  {
    id: 19,
    name: "체육관 1층 화장실",
    building: "체육관",
    floor: "1층",
    distance: 9,
    cleanliness: 3.0,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "운동인",
    time: "3 days",
    memo: "운동 후 샤워시설도 있음. 화장실은 무난",
    lat: 37.56113,
    lng: 126.94573
  },

  // ─── 대강당 ───
  {
    id: 20,
    name: "대강당 1층 화장실",
    building: "대강당",
    floor: "1층",
    distance: 7,
    cleanliness: 3.3,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "공연관람",
    time: "1 week",
    memo: "행사 때만 사람 몰림. 평소엔 여유로움",
    lat: 37.56168,
    lng: 126.94840
  },

  // ─── 음악관 ───
  {
    id: 21,
    name: "음악관 1층 화장실",
    building: "음악관",
    floor: "1층",
    distance: 5,
    cleanliness: 3.8,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "음대생",
    time: "4 days",
    memo: "연습실 가는 길에 들를 수 있어서 편해요",
    lat: 37.56211,
    lng: 126.94920
  },

  // ─── 인문관 ───
  {
    id: 22,
    name: "인문관 2층 화장실",
    building: "인문관",
    floor: "2층",
    distance: 4,
    cleanliness: 3.5,
    crowd: "보통",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "문과생",
    time: "2 days",
    memo: "평범하게 깨끗. 오래된 건물이지만 관리 됨",
    lat: 37.56328,
    lng: 126.94849
  },

  // ─── 사범대학 ───
  {
    id: 23,
    name: "사범대학 본관 2층 화장실",
    building: "사범대학",
    floor: "2층",
    distance: 6,
    cleanliness: 3.2,
    crowd: "보통",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "사범생",
    time: "3 days",
    memo: "그냥 보통. 딱히 불편한 점 없음",
    lat: 37.56449,
    lng: 126.94791
  },

  // ─── 학생회관 ───
  {
    id: 24,
    name: "학생회관 1층 화장실",
    building: "학생회관",
    floor: "1층",
    distance: 5,
    cleanliness: 3.0,
    crowd: "혼잡",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "총학생회",
    time: "1 day",
    memo: "점심시간에 엄청 붐빔. 다른 층 이용 권장",
    lat: 37.56379,
    lng: 126.94862
  },

  // ─── 이화관 ───
  {
    id: 25,
    name: "이화관 1층 화장실",
    building: "이화관",
    floor: "1층",
    distance: 4,
    cleanliness: 2.8,
    crowd: "보통",
    soap: false,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "오래된건물",
    time: "1 week",
    memo: "건물이 오래되어서 화장실도 낡음. 비누가 자주 없음",
    lat: 37.56295,
    lng: 126.94920
  },

  // ─── 약학관 ───
  {
    id: 26,
    name: "약학관 2층 화장실",
    building: "약학관",
    floor: "2층",
    distance: 8,
    cleanliness: 4.0,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "약대생",
    time: "2 days",
    memo: "사람 별로 없고 깨끗함. 캠퍼스 끝쪽이라 접근성이 아쉬움",
    lat: 37.56470,
    lng: 126.94680
  },

  // ─── 자연사박물관 ───
  {
    id: 27,
    name: "자연사박물관 1층 화장실",
    building: "자연사박물관",
    floor: "1층",
    distance: 6,
    cleanliness: 4.1,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "관람객",
    time: "5 days",
    memo: "관람객용 화장실이라 관리가 잘 됨",
    lat: 37.56148,
    lng: 126.94481
  },

  // ─── 의과대학 ───
  {
    id: 28,
    name: "의과대학 본관 1층 화장실",
    building: "의과대학",
    floor: "1층",
    distance: 10,
    cleanliness: 4.5,
    crowd: "여유",
    soap: true,
    paper: true,
    available: true,
    favorite: false,
    reviewer: "의대생",
    time: "1 day",
    memo: "의대라 위생 관리 철저. 제일 깨끗한 화장실 중 하나",
    lat: 37.56075,
    lng: 126.94386
  }
];

// =====================================================
// ✅ 3. 상태 변수
// =====================================================
let currentFilter = "all";
let selectedToiletId = 1;
let currentUser = null;
let isSignupMode = false;
let kakaoMap = null;
let kakaoMarkers = [];

// =====================================================
// ✅ 4. DOM 참조
// =====================================================
const listEl         = document.getElementById("toiletList");
const detailEl       = document.getElementById("detailPanel");
const mapCardListEl  = document.getElementById("mapCardList");
const reviewListEl   = document.getElementById("reviewList");
const searchInput    = document.getElementById("searchInput");
const form           = document.getElementById("feedbackForm");
const toiletSelect   = document.getElementById("toiletSelect");
const formMessage    = document.getElementById("formMessage");
const navItems       = document.querySelectorAll(".nav-item");
const pages          = document.querySelectorAll(".page");
const filterButtons  = document.querySelectorAll(".filter-chip");

const adModal        = document.getElementById("adModal");
const authModal      = document.getElementById("authModal");

const authEmail      = document.getElementById("authEmail");
const authPassword   = document.getElementById("authPassword");
const authNickname   = document.getElementById("authNickname");
const authError      = document.getElementById("authError");
const authModalTitle = document.getElementById("authModalTitle");
const authSubmitBtn  = document.getElementById("authSubmitBtn");
const authToggleBtn  = document.getElementById("authToggleBtn");
const signupExtra    = document.getElementById("signupExtra");

// =====================================================
// ✅ 5. Firebase 인증 상태 감지
// =====================================================
auth.onAuthStateChanged((user) => {
  currentUser = user;
  updateAuthUI(user);
});

function updateAuthUI(user) {
  const loginBtn   = document.getElementById("loginBtn");
  const myLoginBtn = document.getElementById("myLoginBtn");
  const myLogoutBtn = document.getElementById("myLogoutBtn");
  const profileName  = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profileAvatar = document.getElementById("profileAvatar");

  if (user) {
    // 로그인 상태
    loginBtn.textContent = "✅";
    loginBtn.title = user.displayName || user.email;

    profileName.textContent  = (user.displayName || "이화인") + "님의 Toilet Now";
    profileEmail.textContent = user.email;
    profileAvatar.textContent = user.displayName ? user.displayName[0] : "👤";

    myLoginBtn.classList.add("hidden");
    myLogoutBtn.classList.remove("hidden");
  } else {
    // 비로그인 상태
    loginBtn.textContent = "👤";
    loginBtn.title = "로그인";

    profileName.textContent  = "로그인이 필요합니다";
    profileEmail.textContent = "Toilet Now에 로그인해보세요!";
    profileAvatar.textContent = "👤";

    myLoginBtn.classList.remove("hidden");
    myLogoutBtn.classList.add("hidden");
  }
}

// =====================================================
// ✅ 6. 로그인 / 회원가입 모달 열기·닫기
// =====================================================
function openAuthModal() {
  authModal.classList.remove("hidden");
  authError.classList.add("hidden");
  authError.textContent = "";
  authEmail.value = "";
  authPassword.value = "";
  authNickname.value = "";
  setSignupMode(false);
}

function closeAuthModal() {
  authModal.classList.add("hidden");
}

function setSignupMode(mode) {
  isSignupMode = mode;
  authModalTitle.textContent = mode ? "회원가입" : "로그인";
  authSubmitBtn.textContent  = mode ? "✨ 회원가입" : "🔐 로그인";
  authToggleBtn.textContent  = mode ? "이미 계정이 있나요? 로그인" : "계정이 없나요? 회원가입";
  signupExtra.classList.toggle("hidden", !mode);
}

function showAuthError(msg) {
  authError.textContent = msg;
  authError.classList.remove("hidden");
}

// 이메일/비밀번호 로그인 or 회원가입
document.getElementById("authSubmitBtn").addEventListener("click", async () => {
  const email    = authEmail.value.trim();
  const password = authPassword.value.trim();
  const nickname = authNickname.value.trim();

  if (!email || !password) {
    showAuthError("이메일과 비밀번호를 입력해주세요.");
    return;
  }

  try {
    if (isSignupMode) {
      const result = await auth.createUserWithEmailAndPassword(email, password);
      if (nickname) {
        await result.user.updateProfile({ displayName: nickname });
      }
      showAuthError(""); 
      closeAuthModal();
      alert(`🎉 ${nickname || email}님, 환영해요!`);
    } else {
      await auth.signInWithEmailAndPassword(email, password);
      closeAuthModal();
    }
  } catch (e) {
    const messages = {
      "auth/email-already-in-use": "이미 사용 중인 이메일이에요.",
      "auth/invalid-email": "이메일 형식이 올바르지 않아요.",
      "auth/weak-password": "비밀번호는 6자 이상이어야 해요.",
      "auth/user-not-found": "등록되지 않은 이메일이에요.",
      "auth/wrong-password": "비밀번호가 틀렸어요.",
      "auth/invalid-credential": "이메일 또는 비밀번호가 틀렸어요.",
    };
    showAuthError(messages[e.code] || "오류가 발생했어요: " + e.message);
  }
});

// 모드 전환 (로그인 ↔ 회원가입)
document.getElementById("authToggleBtn").addEventListener("click", () => {
  setSignupMode(!isSignupMode);
  authError.classList.add("hidden");
});

// Google 로그인
document.getElementById("googleSignInBtn").addEventListener("click", async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    closeAuthModal();
  } catch (e) {
    showAuthError("Google 로그인 중 오류가 발생했어요.");
  }
});

// 닫기
document.getElementById("closeAuthBtn").addEventListener("click", closeAuthModal);

// 헤더 로그인 버튼
document.getElementById("loginBtn").addEventListener("click", () => {
  if (currentUser) {
    switchPage("my");
  } else {
    openAuthModal();
  }
});

// 마이페이지 로그인 버튼
document.getElementById("myLoginBtn").addEventListener("click", openAuthModal);

// 로그아웃
document.getElementById("myLogoutBtn").addEventListener("click", async () => {
  await auth.signOut();
  alert("로그아웃 되었어요 👋");
});

// =====================================================
// ✅ 7. 카카오맵 초기화
// =====================================================

// 건물별로 첫 번째 화장실 좌표만 마커 1개 표시 (같은 건물 중복 방지)
function getRepresentativeToilets() {
  const seen = {};
  return toilets.filter(t => {
    if (seen[t.building]) return false;
    seen[t.building] = true;
    return true;
  });
}

// 청결도에 따른 마커 색상
function getMarkerColor(cleanliness) {
  if (cleanliness >= 4.3) return "#2ecc71";  // 초록 - 청결 우수
  if (cleanliness >= 3.0) return "#f39c12";  // 주황 - 보통
  return "#e74c3c";                           // 빨강 - 주의
}

// SVG 커스텀 마커 (화장실 아이콘)
function makeToiletMarkerSVG(cleanliness) {
  const color = getMarkerColor(cleanliness);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
      <ellipse cx="18" cy="40" rx="8" ry="3" fill="rgba(0,0,0,0.15)"/>
      <path d="M18 0 C9 0 2 7 2 16 C2 28 18 40 18 40 C18 40 34 28 34 16 C34 7 27 0 18 0Z"
            fill="${color}" stroke="white" stroke-width="2"/>
      <text x="18" y="21" font-size="14" text-anchor="middle" fill="white">🚻</text>
    </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// 현재 위치 커스텀 마커 SVG (파란 펄스)
function makeMyLocationSVG() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="rgba(47,128,237,0.18)" stroke="#2f80ed" stroke-width="2"/>
      <circle cx="20" cy="20" r="9" fill="#2f80ed" stroke="white" stroke-width="3"/>
    </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

let myLocationOverlay = null; // 현재 위치 커스텀 오버레이

function initKakaoMap(lat, lng) {
  if (typeof kakao === "undefined" || typeof kakao.maps === "undefined") {
    document.getElementById("kakaoMap").innerHTML =
      `<div style="display:flex;align-items:center;justify-content:center;height:100%;
                   font-size:14px;color:#6c7b91;padding:20px;text-align:center;">
        🗺️ 카카오맵을 불러오는 중이에요.<br>
        <small>Kakao JS Key를 확인해주세요.</small>
      </div>`;
    return;
  }

  const container = document.getElementById("kakaoMap");
  const options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 4
  };
  kakaoMap = new kakao.maps.Map(container, options);

  // ── 현재 위치: 커스텀 오버레이 (파란 원 + 펄스 효과) ──
  const myLocContent = `
    <div style="position:relative;width:40px;height:40px;transform:translate(-50%,-50%);">
      <div style="
        position:absolute;inset:0;
        border-radius:50%;
        background:rgba(47,128,237,0.22);
        animation:pulse-ring 1.8s ease-out infinite;
      "></div>
      <div style="
        position:absolute;inset:8px;
        border-radius:50%;
        background:#2f80ed;
        border:3px solid white;
        box-shadow:0 2px 8px rgba(47,128,237,0.55);
      "></div>
    </div>`;

  // 펄스 CSS 주입 (한 번만)
  if (!document.getElementById("pulse-style")) {
    const styleEl = document.createElement("style");
    styleEl.id = "pulse-style";
    styleEl.textContent = `
      @keyframes pulse-ring {
        0%   { transform: scale(0.7); opacity: 0.8; }
        100% { transform: scale(2.2); opacity: 0; }
      }`;
    document.head.appendChild(styleEl);
  }

  myLocationOverlay = new kakao.maps.CustomOverlay({
    position: new kakao.maps.LatLng(lat, lng),
    content: myLocContent,
    zIndex: 10
  });
  myLocationOverlay.setMap(kakaoMap);

  // ── 화장실 마커: 건물별 대표 1개씩 ──
  kakaoMarkers = [];
  const repToilets = getRepresentativeToilets();

  repToilets.forEach((t) => {
    // 같은 건물 화장실 목록
    const buildingToilets = toilets.filter(x => x.building === t.building);
    const avgCleanliness = buildingToilets.reduce((s, x) => s + x.cleanliness, 0) / buildingToilets.length;

    const markerImg = new kakao.maps.MarkerImage(
      makeToiletMarkerSVG(avgCleanliness),
      new kakao.maps.Size(36, 44),
      { offset: new kakao.maps.Point(18, 44) }
    );

    const marker = new kakao.maps.Marker({
      map: kakaoMap,
      position: new kakao.maps.LatLng(t.lat, t.lng),
      title: t.building,
      image: markerImg
    });

    // 인포윈도우: 해당 건물 화장실 목록 표시
    const listItems = buildingToilets.map(bt =>
      `<div style="padding:3px 0;border-bottom:1px solid #f0f0f0;font-size:11px;color:#444;">
        🚻 ${bt.floor} &nbsp; ✨${bt.cleanliness} &nbsp;
        <span style="color:${bt.available ? '#27ae60' : '#e74c3c'};">${bt.available ? '이용가능' : '사용중'}</span>
      </div>`
    ).join("");

    const infowindow = new kakao.maps.InfoWindow({
      content: `
        <div style="padding:10px 14px;min-width:180px;max-width:220px;
                    font-family:'Pretendard','Noto Sans KR',sans-serif;">
          <div style="font-size:13px;font-weight:700;color:#2d6fd2;margin-bottom:6px;">
            🏛️ ${t.building}
            <span style="font-size:10px;font-weight:400;color:#999;margin-left:4px;">
              (${buildingToilets.length}개 화장실)
            </span>
          </div>
          ${listItems}
          <div style="margin-top:6px;font-size:10px;color:#aaa;">탭하여 상세 보기</div>
        </div>`
    });

    kakao.maps.event.addListener(marker, "click", () => {
      kakaoMarkers.forEach(m => m.iw.close());
      infowindow.open(kakaoMap, marker);
      // 첫 번째 화장실 상세 표시 후 홈으로 이동
      renderDetail(t.id);
    });

    kakaoMarkers.push({ marker, iw: infowindow });
  });
}

// =====================================================
// ✅ 8. 위치 정보 + 카카오맵 연동
// =====================================================
let watchId = null;

function initLiveLocation() {
  const locationText = document.getElementById("currentLocationText");
  const coordsText   = document.getElementById("currentCoords");
  const statusText   = document.getElementById("locationStatus");

  if (!navigator.geolocation) {
    if (statusText) statusText.textContent = "위치 지원 안 됨";
    initKakaoMap(37.5624, 126.9471);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      if (statusText) statusText.textContent = "현재 위치 반영됨";
      if (locationText) locationText.textContent = "내 현재 위치 기준";
      if (coordsText) coordsText.textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

      initKakaoMap(lat, lng);

      // 실시간 위치 추적 (오버레이만 이동, 지도 재초기화 없음)
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
      watchId = navigator.geolocation.watchPosition((pos2) => {
        const la = pos2.coords.latitude;
        const lo = pos2.coords.longitude;
        if (coordsText) coordsText.textContent = `${la.toFixed(5)}, ${lo.toFixed(5)}`;
        if (myLocationOverlay && kakaoMap) {
          myLocationOverlay.setPosition(new kakao.maps.LatLng(la, lo));
        }
      }, null, { enableHighAccuracy: true, maximumAge: 5000 });
    },
    () => {
      if (statusText) statusText.textContent = "위치 권한 필요";
      if (locationText) locationText.textContent = "이화여대 기본 위치로 표시됩니다";
      if (coordsText) coordsText.textContent = "위치 접근 실패";
      initKakaoMap(37.5624, 126.9471);
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
}

// 지도 탭 클릭 시 카카오맵 리사이즈 (탭 전환 버그 방지)
function onMapPageShow() {
  if (kakaoMap) {
    kakaoMap.relayout();
    kakaoMap.setCenter(new kakao.maps.LatLng(37.5624, 126.9471));
  } else {
    initLiveLocation();
  }
}

// =====================================================
// ✅ 9. 기존 렌더링 로직 (원본 유지)
// =====================================================
function getFilteredToilets() {
  const keyword = (searchInput?.value || "").trim().toLowerCase();
  return toilets.filter((t) => {
    const keywordMatch = t.name.toLowerCase().includes(keyword);
    let filterMatch = true;
    if (currentFilter === "available") filterMatch = t.available;
    if (currentFilter === "clean")     filterMatch = t.cleanliness >= 4.3;
    if (currentFilter === "crowd")     filterMatch = t.crowd === "여유";
    if (currentFilter === "soap")      filterMatch = t.soap;
    if (currentFilter === "paper")     filterMatch = t.paper;
    return keywordMatch && filterMatch;
  });
}

function renderList() {
  if (!listEl) return;
  const data = getFilteredToilets();
  listEl.innerHTML = "";
  data.forEach((t) => {
    const card = document.createElement("div");
    card.className = "place-card";
    card.innerHTML = `
      <div class="place-top">
        <div class="place-left">
          <div class="place-icon">${t.available ? "🚻" : "⏳"}</div>
          <div class="place-info">
            <h4>${t.name}</h4>
            <p>🏛️ ${t.building || ""} · 도보 ${t.distance}분 · ${t.available ? "바로 이용 가능" : "현재 사용 중"}</p>
          </div>
        </div>
        <button type="button" class="favorite favorite-toggle" data-id="${t.id}">
          ${t.favorite ? "💙" : "🤍"}
        </button>
      </div>
      <div class="meta-row">
        <div class="meta-badge">📍 거리 ${t.distance}분</div>
        <div class="meta-badge">✨ 청결도 ${t.cleanliness}</div>
        <div class="meta-badge">${t.soap ? "🧼 비누 있음" : "❌ 비누 없음"}</div>
        <div class="meta-badge">${t.paper ? "🧻 휴지 있음" : "❌ 휴지 없음"}</div>
        <div class="meta-badge">${t.crowd === "여유" ? "🟢 혼잡도 낮음" : t.crowd === "보통" ? "🟡 보통" : "🔴 혼잡"}</div>
        <div class="meta-badge">${t.available ? "🟢 바로 이용 가능" : "🔴 현재 이용 어려움"}</div>
      </div>
      <div class="card-actions">
        <button type="button" class="gloss-btn detail-btn" data-id="${t.id}">상세보기</button>
        <button type="button" class="ghost-btn route-btn" data-id="${t.id}">길찾기</button>
      </div>`;
    listEl.appendChild(card);
  });
  const listStatus = document.getElementById("listStatus");
  if (listStatus) listStatus.textContent = `${data.length}개 표시 중`;
}

function renderDetail(id) {
  if (!detailEl) return;
  const t = toilets.find((x) => x.id === id);
  if (!t) return;
  selectedToiletId = id;
  detailEl.innerHTML = `
    <div class="place-top">
      <div class="place-left">
        <div class="place-icon">${t.available ? "🚻" : "⏳"}</div>
        <div class="place-info">
          <h4>${t.name}</h4>
          <p>🏛️ ${t.building || ""} ${t.floor || ""} · 도보 ${t.distance}분 · ${t.available ? "바로 이용 가능" : "현재 사용 중"}</p>
        </div>
      </div>
    </div>
    <div class="meta-row">
      <div class="meta-badge">📍 거리 ${t.distance}분</div>
      <div class="meta-badge">✨ 청결도 ${t.cleanliness}</div>
      <div class="meta-badge">${t.password ? "🔐 비밀번호 필요" : "🔓 비밀번호 없음"}</div>
      <div class="meta-badge">${t.available ? "🟢 바로 이용 가능" : "🔴 현재 이용 어려움"}</div>
    </div>
    <p style="margin-top:12px;font-size:13px;color:#6c7b91;line-height:1.6;">
      ${t.memo || "등록된 후기가 아직 없어요."}
    </p>
    <div class="card-actions">
      <button type="button" class="gloss-btn route-btn" data-id="${t.id}">길찾기</button>
      <button type="button" class="ghost-btn favorite-toggle" data-id="${t.id}">
        ${t.favorite ? "💙 즐겨찾기됨" : "🤍 즐겨찾기"}
      </button>
    </div>`;
  updateMyPage();
}

function renderMapCards() {
  if (!mapCardListEl) return;
  mapCardListEl.innerHTML = "";
  toilets.forEach((t) => {
    const card = document.createElement("div");
    card.className = "place-card";
    card.innerHTML = `
      <div class="place-top">
        <div class="place-left">
          <div class="place-icon">🗺️</div>
          <div class="place-info">
            <h4>${t.name}</h4>
            <p>지도에서 선택 가능 · 도보 ${t.distance}분</p>
          </div>
        </div>
      </div>
      <div class="meta-row">
        <div class="meta-badge">📍 ${t.distance}분</div>
        <div class="meta-badge">✨ ${t.cleanliness}</div>
        <div class="meta-badge">${t.available ? "🟢 이용 가능" : "🔴 사용중"}</div>
      </div>
      <div class="card-actions">
        <button type="button" class="gloss-btn detail-btn" data-id="${t.id}">상세보기</button>
      </div>`;
    mapCardListEl.appendChild(card);
  });
}

function renderReviews() {
  if (!reviewListEl) return;
  reviewListEl.innerHTML = "";
  toilets.forEach((t) => {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <h4>${t.name}</h4>
      <p class="review-user">👤 ${t.reviewer || "익명 사용자"} · ${t.time || "최근 작성"}</p>
      <p>${t.memo || "아직 등록된 후기가 없어요."}</p>
      <div class="review-meta">
        <div class="meta-badge">✨ 청결도 ${t.cleanliness}</div>
        <div class="meta-badge">${t.crowd === "여유" ? "👥 여유" : t.crowd === "보통" ? "👥 보통" : "👥 혼잡"}</div>
        <div class="meta-badge">${t.soap ? "🧼 비누 있음" : "❌ 비누 없음"}</div>
        <div class="meta-badge">${t.paper ? "🧻 휴지 있음" : "❌ 휴지 없음"}</div>
        <div class="meta-badge">${t.available ? "🟢 이용 가능" : "🔴 사용중"}</div>
      </div>`;
    reviewListEl.appendChild(card);
  });
}

function updateStats() {
  const nearby    = document.getElementById("nearbyCount");
  const available = document.getElementById("availableCount");
  const avgClean  = document.getElementById("avgCleanliness");
  if (nearby)    nearby.innerText = toilets.length + "개";
  if (available) available.innerText = toilets.filter((t) => t.available).length + "개";
  const avg = toilets.reduce((sum, t) => sum + t.cleanliness, 0) / toilets.length;
  if (avgClean) avgClean.innerText = avg.toFixed(1);
}

function updateMyPage() {
  const favCount     = document.getElementById("favCount");
  const reviewCount  = document.getElementById("reviewCount");
  const recentToilet = document.getElementById("recentToilet");
  if (favCount)    favCount.innerText = toilets.filter((t) => t.favorite).length;
  if (reviewCount) reviewCount.innerText = toilets.filter((t) => t.memo && t.memo.trim() !== "").length;
  const recent = toilets.find((t) => t.id === selectedToiletId);
  if (recentToilet) recentToilet.innerText = recent ? recent.name.split(" ")[0] : "-";
}

function initSelect() {
  if (!toiletSelect) return;
  toiletSelect.innerHTML = `<option value="">선택하세요</option>`;
  toilets.forEach((t) => {
    const option = document.createElement("option");
    option.value = t.id;
    option.innerText = `${t.building ? "[" + t.building + "] " : ""}${t.name}`;
    toiletSelect.appendChild(option);
  });
}

function switchPage(pageName) {
  pages.forEach((page) => page.classList.remove("active"));
  navItems.forEach((item) => item.classList.remove("active"));
  document.getElementById(`page-${pageName}`)?.classList.add("active");
  document.querySelector(`.nav-item[data-page="${pageName}"]`)?.classList.add("active");

  // 지도 탭 전환 시 카카오맵 리렌더
  if (pageName === "map") {
    setTimeout(onMapPageShow, 100);
  }
}

function toggleFavorite(id) {
  // 로그인 필요
  if (!currentUser) {
    openAuthModal();
    return;
  }
  const t = toilets.find((x) => x.id === id);
  if (!t) return;
  t.favorite = !t.favorite;
  renderList();
  renderDetail(selectedToiletId || id);
  updateMyPage();
}

// =====================================================
// ✅ 10. 이벤트 리스너
// =====================================================
document.addEventListener("click", (e) => {
  const nav = e.target.closest(".nav-item");
  if (nav) { switchPage(nav.dataset.page); return; }

  const detailBtn = e.target.closest(".detail-btn");
  if (detailBtn) {
    renderDetail(Number(detailBtn.dataset.id));
    switchPage("home");
    return;
  }

  const favoriteBtn = e.target.closest(".favorite-toggle");
  if (favoriteBtn) {
    toggleFavorite(Number(favoriteBtn.dataset.id));
    return;
  }

  const routeBtn = e.target.closest(".route-btn");
  if (routeBtn) {
    const t = toilets.find((x) => x.id === Number(routeBtn.dataset.id));
    if (t) {
      // 카카오맵 길찾기 URL
      const url = `https://map.kakao.com/link/to/${encodeURIComponent(t.name)},${t.lat},${t.lng}`;
      window.open(url, "_blank");
    }
    return;
  }
});

searchInput?.addEventListener("input", () => renderList());

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderList();
  });
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  // 로그인 후 후기 작성 가능
  if (!currentUser) {
    openAuthModal();
    if (formMessage) formMessage.textContent = "💡 후기 작성은 로그인 후 이용 가능해요!";
    return;
  }

  const id           = Number(document.getElementById("toiletSelect")?.value);
  const cleanliness  = Number(document.getElementById("cleanlinessSelect")?.value);
  const availability = document.getElementById("availabilitySelect")?.value;
  const memo         = document.getElementById("memoInput")?.value.trim();
  const crowd        = document.getElementById("crowdSelect")?.value;
  const soap         = document.getElementById("soapSelect")?.value;
  const paper        = document.getElementById("paperSelect")?.value;

  const t = toilets.find((x) => x.id === id);
  if (!t) return;

  if (cleanliness) t.cleanliness = cleanliness;
  if (availability === "available") t.available = true;
  if (availability === "busy" || availability === "closed") t.available = false;
  if (memo) { t.memo = memo; t.reviewer = currentUser.displayName || currentUser.email; t.time = "방금"; }
  if (crowd) t.crowd = crowd;
  if (soap !== "")  t.soap  = soap === "true";
  if (paper !== "") t.paper = paper === "true";

  if (formMessage) formMessage.textContent = "후기가 등록되었어요 💙";
  form.reset();

  renderList();
  renderDetail(id);
  renderReviews();
  renderMapCards();
  updateStats();
  updateMyPage();
});

document.getElementById("findNearbyBtn")?.addEventListener("click", () => switchPage("map"));

document.getElementById("closeAdBtn")?.addEventListener("click", () => adModal?.classList.add("hidden"));
document.getElementById("adLaterBtn")?.addEventListener("click", () => adModal?.classList.add("hidden"));
document.getElementById("adVisitBtn")?.addEventListener("click", () => {
  alert("티앙팡: 오후의 홍차\nToilet Now 앱을 통해 방문하면 다과를 서비스로 제공합니다.");
});
document.getElementById("adVisitBtnFixed")?.addEventListener("click", () => {
  alert("티앙팡: 오후의 홍차\nToilet Now 앱 방문 시 다과 50% 할인 혜택 제공");
});

// =====================================================
// ✅ 11. 초기화
// =====================================================
renderList();
renderMapCards();
renderReviews();
updateStats();
updateMyPage();
initSelect();
renderDetail(1);
initLiveLocation();   // 카카오맵 + 위치 동시 초기화
switchPage("home");
