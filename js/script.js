/**
 * JavaScript学習インフォグラフィック
 * メインJavaScriptファイル
 */

// ========================================
// グローバル変数
// ========================================
let learningProgress = {
	week1: {
		completed: [],
		current: 1,
		total: 8,
	},
	week2: {
		completed: [],
		current: 1,
		total: 7,
	},
	week3: {
		completed: [],
		current: 1,
		total: 6,
	},
};

// ========================================
// ページ読み込み時の初期化
// ========================================
document.addEventListener("DOMContentLoaded", function () {
	initializeApp();
});

/**
 * アプリケーションの初期化
 */
function initializeApp() {
	// 進捗データの読み込み
	loadProgress();

	// 進捗バーの更新
	updateProgressBar();

	// ナビゲーションの設定
	setupNavigation();

	// スムーズスクロールの設定
	setupSmoothScroll();

	// 学習時間の記録開始
	startLearningTimer();

	// キーボードショートカットの設定
	setupKeyboardShortcuts();

	// ページ固有の初期化
	initializePageSpecific();
}

// ========================================
// 進捗管理
// ========================================

/**
 * 進捗データをローカルストレージから読み込み
 */
function loadProgress() {
	const savedProgress = localStorage.getItem("js-learning-progress");
	if (savedProgress) {
		try {
			learningProgress = JSON.parse(savedProgress);
		} catch (error) {
			console.log("進捗データの読み込みに失敗しました:", error);
		}
	}
}

/**
 * 進捗データをローカルストレージに保存
 */
function saveProgress() {
	try {
		localStorage.setItem(
			"js-learning-progress",
			JSON.stringify(learningProgress)
		);
	} catch (error) {
		console.log("進捗データの保存に失敗しました:", error);
	}
}

/**
 * 進捗バーの更新
 */
function updateProgressBar() {
	const progressBar = document.querySelector(".progress-bar__fill");
	const progressText = document.querySelector(".progress-bar__text");

	if (!progressBar || !progressText) return;

	// 現在のページから週と進捗を判定
	const currentPage = getCurrentPageInfo();
	if (!currentPage) return;

	const week = currentPage.week;
	const pageNum = currentPage.page;
	const total = learningProgress[week].total;

	// 進捗率の計算
	const progressPercent = (pageNum / total) * 100;

	// 進捗バーの更新
	progressBar.style.width = progressPercent + "%";
	progressText.textContent = `進捗: ${progressPercent.toFixed(
		1
	)}% (${pageNum}/${total}ページ)`;

	// 完了ページのマーク
	markCompletedPage(week, pageNum);
}

/**
 * 現在のページ情報を取得
 */
function getCurrentPageInfo() {
	const path = window.location.pathname;

	// 週の判定
	let week = null;
	if (path.includes("/week1/")) week = "week1";
	else if (path.includes("/week2/")) week = "week2";
	else if (path.includes("/week3/")) week = "week3";

	if (!week) return null;

	// ページ番号の判定
	let page = 0;
	const pageMatch = path.match(/page(\d+)\.html/);
	if (pageMatch) {
		page = parseInt(pageMatch[1]);
	} else if (path.includes("index.html")) {
		page = 0;
	}

	return { week, page };
}

/**
 * ページ完了のマーク
 */
function markCompletedPage(week, pageNum) {
	if (pageNum > 0 && !learningProgress[week].completed.includes(pageNum)) {
		learningProgress[week].completed.push(pageNum);
		learningProgress[week].current = Math.max(
			learningProgress[week].current,
			pageNum + 1
		);
		saveProgress();

		// 完了アニメーション
		showCompletionAnimation();
	}
}

/**
 * 完了アニメーションの表示
 */
function showCompletionAnimation() {
	// 簡単な完了通知
	const notification = document.createElement("div");
	notification.className = "completion-notification";
	notification.innerHTML = "🎉 ページ完了！";
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

	document.body.appendChild(notification);

	// 3秒後に削除
	setTimeout(() => {
		notification.style.animation = "slideOut 0.3s ease-in";
		setTimeout(() => {
			if (notification.parentNode) {
				notification.parentNode.removeChild(notification);
			}
		}, 300);
	}, 3000);
}

// ========================================
// ナビゲーション
// ========================================

/**
 * ナビゲーションの設定
 */
function setupNavigation() {
	// サイドバーのアクティブ状態更新
	updateSidebarActiveState();

	// ナビゲーションボタンのキーボード対応
	const navButtons = document.querySelectorAll(".navigation__button");
	navButtons.forEach((button) => {
		button.addEventListener("keydown", function (e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				this.click();
			}
		});
	});
}

/**
 * サイドバーのアクティブ状態更新
 */
function updateSidebarActiveState() {
	const currentPage = getCurrentPageInfo();
	if (!currentPage) return;

	const sidebarLinks = document.querySelectorAll(".sidebar__link");
	sidebarLinks.forEach((link) => {
		link.classList.remove("sidebar__link--current");

		// 現在のページに対応するリンクをアクティブに
		const href = link.getAttribute("href");
		if (href && href.includes(`page${currentPage.page}.html`)) {
			link.classList.add("sidebar__link--current");
		}
	});
}

// ========================================
// スムーズスクロール
// ========================================

/**
 * スムーズスクロールの設定
 */
function setupSmoothScroll() {
	// ページ内リンクのスムーズスクロール
	const internalLinks = document.querySelectorAll('a[href^="#"]');
	internalLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			const targetId = this.getAttribute("href").substring(1);
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	});
}

// ========================================
// 学習時間記録
// ========================================

let learningStartTime = null;
let totalLearningTime = 0;

/**
 * 学習時間の記録開始
 */
function startLearningTimer() {
	learningStartTime = Date.now();

	// ページを離れる時に学習時間を保存
	window.addEventListener("beforeunload", function () {
		if (learningStartTime) {
			const sessionTime = Date.now() - learningStartTime;
			totalLearningTime += sessionTime;

			// ローカルストレージに保存
			const savedTime = localStorage.getItem("js-learning-time") || "0";
			const newTotalTime = parseInt(savedTime) + sessionTime;
			localStorage.setItem("js-learning-time", newTotalTime.toString());
		}
	});

	// 定期的に学習時間を更新（5分ごと）
	setInterval(updateLearningTime, 5 * 60 * 1000);
}

/**
 * 学習時間の更新
 */
function updateLearningTime() {
	if (learningStartTime) {
		const sessionTime = Date.now() - learningStartTime;
		const savedTime = localStorage.getItem("js-learning-time") || "0";
		const newTotalTime = parseInt(savedTime) + sessionTime;
		localStorage.setItem("js-learning-time", newTotalTime.toString());
		learningStartTime = Date.now(); // リセット
	}
}

/**
 * 総学習時間の取得（分単位）
 */
function getTotalLearningTime() {
	const savedTime = localStorage.getItem("js-learning-time") || "0";
	return Math.floor(parseInt(savedTime) / (1000 * 60));
}

// ========================================
// キーボードショートカット
// ========================================

/**
 * キーボードショートカットの設定
 */
function setupKeyboardShortcuts() {
	document.addEventListener("keydown", function (e) {
		// Ctrl/Cmd + 矢印キーでページナビゲーション
		if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
			switch (e.key) {
				case "ArrowLeft":
					e.preventDefault();
					navigateToPreviousPage();
					break;
				case "ArrowRight":
					e.preventDefault();
					navigateToNextPage();
					break;
				case "Home":
					e.preventDefault();
					navigateToHome();
					break;
			}
		}

		// Escキーでホームに戻る
		if (e.key === "Escape") {
			navigateToHome();
		}
	});
}

/**
 * 前のページに移動
 */
function navigateToPreviousPage() {
	const backButton = document.querySelector(".navigation__button--back");
	if (backButton) {
		backButton.click();
	}
}

/**
 * 次のページに移動
 */
function navigateToNextPage() {
	const nextButton = document.querySelector(".navigation__button--next");
	if (nextButton) {
		nextButton.click();
	}
}

/**
 * ホームページに移動
 */
function navigateToHome() {
	window.location.href = "../index.html";
}

// ========================================
// ページ固有の初期化
// ========================================

/**
 * ページ固有の初期化処理
 */
function initializePageSpecific() {
	// ホームページの場合
	if (
		window.location.pathname.endsWith("index.html") ||
		window.location.pathname.endsWith("/")
	) {
		initializeHomePage();
	}

	// 学習ページの場合
	if (window.location.pathname.includes("page")) {
		initializeLearningPage();
	}

	// 週のインデックスページの場合
	if (
		window.location.pathname.includes("week") &&
		window.location.pathname.includes("index.html")
	) {
		initializeWeekIndexPage();
	}
}

/**
 * ホームページの初期化
 */
function initializeHomePage() {
	// 学習統計の表示
	displayLearningStats();

	// コースカードのアニメーション
	animateCourseCards();
}

/**
 * 学習ページの初期化
 */
function initializeLearningPage() {
	// コードハイライトの設定
	setupCodeHighlighting();

	// インタラクティブ要素の初期化
	initializeInteractiveElements();

	// 学習進捗の自動保存
	autoSaveProgress();
}

/**
 * 週インデックスページの初期化
 */
function initializeWeekIndexPage() {
	// ページカードの進捗表示
	updatePageCardProgress();
}

// ========================================
// 学習統計
// ========================================

/**
 * 学習統計の表示
 */
function displayLearningStats() {
	const totalTime = getTotalLearningTime();
	const totalPages = Object.values(learningProgress).reduce(
		(sum, week) => sum + week.completed.length,
		0
	);

	// 統計情報を表示する要素があれば更新
	const statsElement = document.querySelector(".learning-stats");
	if (statsElement) {
		statsElement.innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${totalPages}</span>
                <span class="stat-label">完了ページ</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${totalTime}</span>
                <span class="stat-label">学習時間（分）</span>
            </div>
        `;
	}
}

// ========================================
// アニメーション
// ========================================

/**
 * コースカードのアニメーション
 */
function animateCourseCards() {
	const cards = document.querySelectorAll(".course-card");
	cards.forEach((card, index) => {
		card.style.opacity = "0";
		card.style.transform = "translateY(20px)";

		setTimeout(() => {
			card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
			card.style.opacity = "1";
			card.style.transform = "translateY(0)";
		}, index * 200);
	});
}

// ========================================
// コードハイライト
// ========================================

/**
 * コードハイライトの設定
 */
function setupCodeHighlighting() {
	const codeBlocks = document.querySelectorAll("pre code");
	codeBlocks.forEach((block) => {
		// 簡単なシンタックスハイライト
		highlightJavaScript(block);
	});
}

/**
 * JavaScriptのシンタックスハイライト
 */
function highlightJavaScript(element) {
	let code = element.innerHTML;

	// キーワードのハイライト
	const keywords = [
		"let",
		"const",
		"var",
		"function",
		"if",
		"else",
		"for",
		"while",
		"return",
		"console",
		"log",
	];
	keywords.forEach((keyword) => {
		const regex = new RegExp(`\\b${keyword}\\b`, "g");
		code = code.replace(regex, `<span class="keyword">${keyword}</span>`);
	});

	// 文字列のハイライト
	code = code.replace(
		/(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
		'<span class="string">$1$2$3</span>'
	);

	// 数値のハイライト
	code = code.replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$&</span>');

	// コメントのハイライト
	code = code.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');

	element.innerHTML = code;
}

// ========================================
// インタラクティブ要素
// ========================================

/**
 * インタラクティブ要素の初期化
 */
function initializeInteractiveElements() {
	// ツールチップの設定
	setupTooltips();

	// アコーディオンの設定
	setupAccordions();

	// タブの設定
	setupTabs();
}

/**
 * ツールチップの設定
 */
function setupTooltips() {
	const tooltipElements = document.querySelectorAll("[data-tooltip]");
	tooltipElements.forEach((element) => {
		element.addEventListener("mouseenter", showTooltip);
		element.addEventListener("mouseleave", hideTooltip);
	});
}

/**
 * ツールチップの表示
 */
function showTooltip(e) {
	const text = e.target.getAttribute("data-tooltip");
	const tooltip = document.createElement("div");
	tooltip.className = "tooltip";
	tooltip.textContent = text;
	tooltip.style.cssText = `
        position: absolute;
        background: #2c3e50;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1000;
        pointer-events: none;
    `;

	document.body.appendChild(tooltip);

	// 位置の調整
	const rect = e.target.getBoundingClientRect();
	tooltip.style.left = rect.left + "px";
	tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + "px";

	e.target._tooltip = tooltip;
}

/**
 * ツールチップの非表示
 */
function hideTooltip(e) {
        if (e.target._tooltip) {
                document.body.removeChild(e.target._tooltip);
                delete e.target._tooltip;
        }
}

/**
 * アコーディオンの設定
 */
function setupAccordions() {
        const accordions = document.querySelectorAll(".accordion");
        accordions.forEach((accordion) => {
                const header = accordion.querySelector(".accordion__header");
                const content = accordion.querySelector(".accordion__content");
                if (!header || !content) return;

                if (!accordion.classList.contains("accordion--open")) {
                        content.style.display = "none";
                }

                header.addEventListener("click", () => {
                        const isOpen = accordion.classList.toggle("accordion--open");
                        content.style.display = isOpen ? "" : "none";
                });
        });
}

/**
 * タブの設定
 */
function setupTabs() {
        const tabContainers = document.querySelectorAll("[data-tabs]");
        tabContainers.forEach((container) => {
                const buttons = container.querySelectorAll("[data-tab-target]");
                const panels = container.querySelectorAll("[data-tab-content]");

                buttons.forEach((btn) => {
                        btn.addEventListener("click", () => {
                                const target = btn.getAttribute("data-tab-target");

                                buttons.forEach((b) => b.classList.remove("active"));
                                panels.forEach((panel) => {
                                        if (
                                                panel.getAttribute("data-tab-content") ===
                                                target
                                        ) {
                                                panel.style.display = "";
                                        } else {
                                                panel.style.display = "none";
                                        }
                                });

                                btn.classList.add("active");
                        });
                });
        });
}

// ========================================
// 自動保存
// ========================================

/**
 * 学習進捗の自動保存
 */
function autoSaveProgress() {
	// 5秒間操作がない場合に進捗を保存
	let saveTimeout;

	function scheduleSave() {
		clearTimeout(saveTimeout);
		saveTimeout = setTimeout(() => {
			saveProgress();
		}, 5000);
	}

	// ユーザーの操作を監視
	["click", "keydown", "scroll"].forEach((eventType) => {
		document.addEventListener(eventType, scheduleSave);
	});
}

// ========================================
// ページカード進捗更新
// ========================================

/**
 * ページカードの進捗表示更新
 */
function updatePageCardProgress() {
	const currentPage = getCurrentPageInfo();
	if (!currentPage) return;

	const week = currentPage.week;
	const completed = learningProgress[week].completed;

	const pageCards = document.querySelectorAll(".page-card");
	pageCards.forEach((card, index) => {
		const pageNum = index + 1;
		if (completed.includes(pageNum)) {
			card.classList.add("page-card--completed");

			// 完了マークを追加
			const completedMark = document.createElement("div");
			completedMark.className = "page-card__completed-mark";
			completedMark.innerHTML = "✅";
			completedMark.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 1.5rem;
            `;
			card.style.position = "relative";
			card.appendChild(completedMark);
		}
	});
}

// ========================================
// ユーティリティ関数
// ========================================

/**
 * 要素の表示/非表示切り替え
 */
function toggleElement(element) {
	if (element.style.display === "none") {
		element.style.display = "";
	} else {
		element.style.display = "none";
	}
}

/**
 * 要素のフェードイン
 */
function fadeIn(element, duration = 300) {
	element.style.opacity = "0";
	element.style.display = "";

	let start = null;
	function animate(timestamp) {
		if (!start) start = timestamp;
		const progress = timestamp - start;
		const opacity = Math.min(progress / duration, 1);

		element.style.opacity = opacity;

		if (progress < duration) {
			requestAnimationFrame(animate);
		}
	}

	requestAnimationFrame(animate);
}

/**
 * 要素のフェードアウト
 */
function fadeOut(element, duration = 300) {
	let start = null;
	const initialOpacity = parseFloat(getComputedStyle(element).opacity);

	function animate(timestamp) {
		if (!start) start = timestamp;
		const progress = timestamp - start;
		const opacity = Math.max(initialOpacity - progress / duration, 0);

		element.style.opacity = opacity;

		if (progress < duration) {
			requestAnimationFrame(animate);
		} else {
			element.style.display = "none";
		}
	}

	requestAnimationFrame(animate);
}

/**
 * デバウンス関数
 */
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

/**
 * スロットル関数
 */
function throttle(func, limit) {
	let inThrottle;
	return function () {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

// ========================================
// エラーハンドリング
// ========================================

/**
 * グローバルエラーハンドラー
 */
window.addEventListener("error", function (e) {
	console.error("JavaScript Error:", e.error);

	// ユーザーフレンドリーなエラーメッセージ
	showErrorMessage(
		"申し訳ございません。エラーが発生しました。ページを再読み込みしてください。"
	);
});

/**
 * エラーメッセージの表示
 */
function showErrorMessage(message) {
	const errorDiv = document.createElement("div");
	errorDiv.className = "error-message";
	errorDiv.textContent = message;
	errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #e74c3c;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
    `;

	document.body.appendChild(errorDiv);

	// 5秒後に削除
	setTimeout(() => {
		if (errorDiv.parentNode) {
			errorDiv.parentNode.removeChild(errorDiv);
		}
	}, 5000);
}

// ========================================
// パフォーマンス監視
// ========================================

/**
 * ページ読み込み時間の測定
 */
window.addEventListener("load", function () {
	const loadTime = performance.now();
	console.log(`ページ読み込み時間: ${loadTime.toFixed(2)}ms`);

	// 読み込み時間が長い場合の警告
	if (loadTime > 3000) {
		console.warn(
			"ページの読み込みが遅いです。ネットワーク接続を確認してください。"
		);
	}
});

// ========================================
// アクセシビリティ
// ========================================

/**
 * フォーカス管理の改善
 */
document.addEventListener("keydown", function (e) {
	// Tabキーでのフォーカス移動を視覚的に分かりやすく
	if (e.key === "Tab") {
		document.body.classList.add("keyboard-navigation");
	}
});

document.addEventListener("mousedown", function () {
	document.body.classList.remove("keyboard-navigation");
});

// ========================================
// 開発者向けデバッグ機能
// ========================================

/**
 * デバッグ情報の表示（開発環境のみ）
 */
if (
	window.location.hostname === "localhost" ||
	window.location.hostname === "127.0.0.1"
) {
	console.log("🚀 JavaScript学習インフォグラフィック - 開発モード");
	console.log("進捗データ:", learningProgress);
	console.log("総学習時間:", getTotalLearningTime(), "分");

	// デバッグ用のグローバル関数を追加
	window.debugLearning = {
		getProgress: () => learningProgress,
		resetProgress: () => {
			localStorage.removeItem("js-learning-progress");
			localStorage.removeItem("js-learning-time");
			location.reload();
		},
		setProgress: (week, pages) => {
			learningProgress[week].completed = pages;
			saveProgress();
			updateProgressBar();
		},
	};
}

// ========================================
// ページ固有の関数
// ========================================

/**
 * 進捗状況の更新（レガシー関数 - 互換性のため）
 * @param {string} week - 週の識別子 (例: "week1")
 * @param {number} pageNum - ページ番号
 */
function updateProgress(week, pageNum) {
	if (learningProgress[week] && pageNum > 0) {
		if (!learningProgress[week].completed.includes(pageNum)) {
			learningProgress[week].completed.push(pageNum);
		}
		learningProgress[week].current = Math.max(
			learningProgress[week].current,
			pageNum
		);
		saveProgress();
		updateProgressBar();
	}
}

/**
 * 現在のページをハイライト
 */
function highlightCurrentPage() {
	const currentPage = getCurrentPageInfo();
	if (!currentPage) return;

	// サイドバーのアクティブ状態を更新
	const progressItems = document.querySelectorAll(".progress-item");
	progressItems.forEach((item) => {
		item.classList.remove("current");

		const href = item.getAttribute("href");
		if (href && href.includes(`page${currentPage.page}.html`)) {
			item.classList.add("current");
		}
	});
}

/**
 * インタラクティブコンソールでコードを実行
 * @param {string} code - 実行するJavaScriptコード
 * @param {HTMLElement} consoleElement - 出力先のコンソール要素
 */
function runCodeInConsole(code, consoleElement) {
	if (!code.trim()) {
		showConsoleMessage(consoleElement, "コードを入力してください", "warning");
		return;
	}

	// コンソールをクリア
	consoleElement.innerHTML = "";

	// console.logを捕獲するためのカスタムオブジェクト
	const customConsole = {
		log: function (...args) {
			const message = args
				.map((arg) => {
					if (typeof arg === "string") {
						return arg;
					} else {
						return JSON.stringify(arg, null, 2);
					}
				})
				.join(" ");
			showConsoleMessage(consoleElement, message, "output");
		},
		error: function (...args) {
			const message = args.map((arg) => String(arg)).join(" ");
			showConsoleMessage(consoleElement, message, "error");
		},
		warn: function (...args) {
			const message = args.map((arg) => String(arg)).join(" ");
			showConsoleMessage(consoleElement, message, "warning");
		},
	};

	try {
		// 安全な環境でコードを実行
		const func = new Function("console", code);
		func(customConsole);

		// 何も出力されなかった場合
		if (consoleElement.children.length === 0) {
			showConsoleMessage(
				consoleElement,
				"コードが実行されました（出力はありません）",
				"info"
			);
		}
	} catch (error) {
		showConsoleMessage(consoleElement, `エラー: ${error.message}`, "error");
	}
}

/**
 * コンソールにメッセージを表示
 * @param {HTMLElement} consoleElement - コンソール要素
 * @param {string} message - メッセージ
 * @param {string} type - メッセージタイプ (output, error, warning, info)
 */
function showConsoleMessage(consoleElement, message, type = "output") {
	const line = document.createElement("div");
	line.className = `output-line output-line--${type}`;
	line.textContent = message;
	consoleElement.appendChild(line);

	// スクロールを最下部に
	consoleElement.scrollTop = consoleElement.scrollHeight;
}

/**
 * コードブロックをクリップボードにコピー
 * @param {HTMLElement} button - コピーボタン要素
 */
function copyCode(button) {
	const codeBlock = button.closest(".code-example").querySelector("code");
	if (!codeBlock) {
		showErrorMessage("コピーするコードが見つかりません");
		return;
	}

	const code = codeBlock.textContent;

	if (navigator.clipboard && navigator.clipboard.writeText) {
		navigator.clipboard
			.writeText(code)
			.then(() => {
				showCopySuccess(button);
			})
			.catch((err) => {
				console.error("クリップボードへのコピーに失敗:", err);
				fallbackCopyCode(code, button);
			});
	} else {
		fallbackCopyCode(code, button);
	}
}

/**
 * フォールバック方式でコードをコピー
 * @param {string} code - コピーするコード
 * @param {HTMLElement} button - コピーボタン要素
 */
function fallbackCopyCode(code, button) {
	const textArea = document.createElement("textarea");
	textArea.value = code;
	textArea.style.position = "fixed";
	textArea.style.left = "-999999px";
	textArea.style.top = "-999999px";
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		document.execCommand("copy");
		showCopySuccess(button);
	} catch (err) {
		console.error("コピーに失敗:", err);
		showErrorMessage("コードのコピーに失敗しました");
	}

	document.body.removeChild(textArea);
}

/**
 * コピー成功の表示
 * @param {HTMLElement} button - コピーボタン要素
 */
function showCopySuccess(button) {
	const originalText = button.textContent;
	button.textContent = "コピー完了！";
	button.style.background = "#2ecc71";

	setTimeout(() => {
		button.textContent = originalText;
		button.style.background = "";
	}, 2000);
}

/**
 * コンソールの内容をクリア
 * @param {string} consoleId - コンソール要素のID
 */
function clearConsole(consoleId) {
	const consoleElement = document.getElementById(consoleId);
	if (consoleElement) {
		consoleElement.innerHTML =
			'<div class="output-line">コードを実行すると結果がここに表示されます</div>';
	}
}
