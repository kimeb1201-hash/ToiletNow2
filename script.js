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
// ✅ 2. 화장실 데이터
// =====================================================
const toilets = [
  {
    id: 1,
    name: "ECC 4층 화장실",
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
    lat: 37.56219,   // 이화여대 ECC 좌표 (실제 좌표로 교체 권장)
    lng: 126.94682
  },
  {
    id: 2,
    name: "학관 신관 2층 화장실",
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
  {
    id: 3,
    name: "포스코관 1층 화장실",
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
    id: 4,
    name: "생활환경관 지하 화장실",
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
function initKakaoMap(lat, lng) {
  // Kakao SDK 로드 여부 확인
  if (typeof kakao === "undefined" || typeof kakao.maps === "undefined") {
    document.getElementById("kakaoMap").innerHTML =
      `<div style="display:flex;align-items:center;justify-content:center;height:100%;
                   font-size:14px;color:#6c7b91;padding:20px;text-align:center;">
        🗺️ 카카오맵을 불러오는 중이에요.<br>
        <small>index.html의 YOUR_KAKAO_JS_KEY를 실제 키로 교체해주세요.</small>
      </div>`;
    return;
  }

  const container = document.getElementById("kakaoMap");
  const options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 4
  };

  kakaoMap = new kakao.maps.Map(container, options);

  // 내 위치 마커 (파란 점)
  const myMarkerImg = new kakao.maps.MarkerImage(
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
    new kakao.maps.Size(24, 35)
  );
  new kakao.maps.Marker({
    map: kakaoMap,
    position: new kakao.maps.LatLng(lat, lng),
    title: "내 위치",
    image: myMarkerImg
  });

  // 화장실 마커 추가
  toilets.forEach((t) => {
    const markerPos = new kakao.maps.LatLng(t.lat, t.lng);
    const marker = new kakao.maps.Marker({
      map: kakaoMap,
      position: markerPos,
      title: t.name
    });

    // 인포윈도우 (말풍선)
    const infowindow = new kakao.maps.InfoWindow({
      content: `
        <div style="padding:8px 12px;font-size:13px;font-weight:700;
                    color:#2d6fd2;white-space:nowrap;border-radius:10px;">
          🚻 ${t.name}<br>
          <span style="font-size:11px;color:#6c7b91;">청결도 ${t.cleanliness} · ${t.crowd}</span>
        </div>`
    });

    kakao.maps.event.addListener(marker, "click", () => {
      // 기존 인포윈도우 닫기
      kakaoMarkers.forEach(m => m.iw.close());
      infowindow.open(kakaoMap, marker);
      renderDetail(t.id);
    });

    kakaoMarkers.push({ marker, iw: infowindow });
  });
}

// =====================================================
// ✅ 8. 위치 정보 + 카카오맵 연동
// =====================================================
function initLiveLocation() {
  const locationText = document.getElementById("currentLocationText");
  const coordsText   = document.getElementById("currentCoords");
  const statusText   = document.getElementById("locationStatus");

  if (!navigator.geolocation) {
    if (statusText) statusText.textContent = "위치 지원 안 됨";
    // 이화여대 기본 좌표로 지도 초기화
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
    },
    () => {
      if (statusText) statusText.textContent = "위치 권한 필요";
      if (locationText) locationText.textContent = "이화여대 기본 위치로 표시됩니다";
      if (coordsText) coordsText.textContent = "위치 접근 실패";

      // 이화여대 ECC 기본 좌표
      initKakaoMap(37.5624, 126.9471);
    }
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
            <p>도보 ${t.distance}분 · ${t.available ? "바로 이용 가능" : "현재 사용 중"}</p>
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
          <p>도보 ${t.distance}분 · ${t.available ? "바로 이용 가능" : "현재 사용 중"}</p>
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
    option.innerText = t.name;
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
