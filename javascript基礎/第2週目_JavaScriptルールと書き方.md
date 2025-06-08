# JavaScript 第 2 週目：ちょっとくわしく！ルールや書き方を覚える 📗

## 🎯 第 2 週目の学習目標

- JavaScript のデータ型（型）について理解する
- より詳しい演算子や条件分岐を使えるようになる
- 関数の基本概念を理解し、簡単な関数を作れるようになる
- const と let の違いを理解する

---

## 📖 ページ 9：数・文字・true/false って？

### 🌟 詳細解説

JavaScript では、データにいくつかの「型」があります。型を理解することで、より正確なプログラムが書けるようになります。

**主なデータ型：**

| 型名              | 説明       | 例                         |
| ----------------- | ---------- | -------------------------- |
| number（数値）    | 整数や小数 | 42, 3.14, -10              |
| string（文字列）  | 文字や文章 | "こんにちは", 'JavaScript' |
| boolean（真偽値） | 真か偽     | true, false                |

**typeof 演算子：**
変数や値の型を調べることができます。

```javascript
typeof 42; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
```

### 💡 課題

数値、文字列、真偽値を 1 つずつ宣言し、`typeof` で型を表示

### ✅ 模範解答

```javascript
// 数値
let age = 25;
console.log(age); // 25
console.log(typeof age); // "number"

// 文字列
let name = "たろう";
console.log(name); // たろう
console.log(typeof name); // "string"

// 真偽値
let isStudent = true;
console.log(isStudent); // true
console.log(typeof isStudent); // "boolean"

// 他の例
let score = 85.5; // 小数も number型
let message = "今日は晴れです"; // シングルクォートでも string型
let isFinished = false; // false も boolean型

console.log(typeof score); // "number"
console.log(typeof message); // "string"
console.log(typeof isFinished); // "boolean"
```

**解説：** `typeof` を使うことで、その値がどの型なのかを確認できます。型を意識することで、バグを防ぐことができます。

---

## 📖 ページ 10：演算子（比較・論理）

### 🌟 詳細解説

第 1 週目では四則演算を学びましたが、プログラミングではもっと多くの演算子があります。

**比較演算子：**
| 演算子 | 意味 | 例 | 結果 |
|--------|------|-----|------|
| `==` | 等しい（型変換あり） | 5 == "5" | true |
| `===` | 厳密に等しい | 5 === "5" | false |
| `!=` | 等しくない | 5 != 3 | true |
| `!==` | 厳密に等しくない | 5 !== "5" | true |
| `>` | より大きい | 10 > 5 | true |
| `<` | より小さい | 3 < 7 | true |
| `>=` | 以上 | 5 >= 5 | true |
| `<=` | 以下 | 4 <= 3 | false |

**論理演算子：**
| 演算子 | 意味 | 例 | 結果 |
|--------|------|-----|------|
| `&&` | かつ（AND） | true && true | true |
| `\|\|` | または（OR） | true \|\| false | true |
| `!` | でない（NOT） | !true | false |

### 💡 課題

`3 > 2`, `5 == "5"`, `true && false` の結果を確認

### ✅ 模範解答

```javascript
// 比較演算子
console.log(3 > 2); // true
console.log(5 == "5"); // true（型変換が行われる）
console.log(5 === "5"); // false（型が違うため）

// 論理演算子
console.log(true && false); // false
console.log(true || false); // true
console.log(!true); // false
console.log(!false); // true

// 実際の例
let age = 20;
let hasLicense = true;

// 20歳以上かつ免許を持っているか
console.log(age >= 20 && hasLicense); // true

// 18歳未満または免許を持っていない
console.log(age < 18 || !hasLicense); // false

// より複雑な例
let score = 85;
let attendance = 90;

// 成績が80点以上かつ出席率が80%以上
let canPass = score >= 80 && attendance >= 80;
console.log(canPass); // true
```

**解説：** `==` と `===` の違いは重要です。`===` を使うことで、より安全なプログラムが書けます。

---

## 📖 ページ 11：if 文のくわしい使い方

### 🌟 詳細解説

第 1 週目では基本的な `if` 文を学びましたが、`else` や `else if` を使うことで、より複雑な条件分岐ができます。

**if 文の完全な形：**

```javascript
if (条件1) {
	// 条件1が真の時の処理
} else if (条件2) {
	// 条件1が偽で、条件2が真の時の処理
} else {
	// すべての条件が偽の時の処理
}
```

**複数条件の組み合わせ：**

```javascript
if (条件A && 条件B) {
	// AとBの両方が真の時
}

if (条件A || 条件B) {
	// AまたはBのどちらかが真の時
}
```

### 💡 課題

変数 `score` を使い、90 以上:「A」, 70 以上:「B」, それ以外:「C」と表示

### ✅ 模範解答

```javascript
let score = 85;

if (score >= 90) {
	console.log("A");
} else if (score >= 70) {
	console.log("B");
} else {
	console.log("C");
}
// 結果：B

// 他のテストケース
let scores = [95, 75, 65, 100, 45];

for (let i = 0; i < scores.length; i++) {
	let currentScore = scores[i];

	if (currentScore >= 90) {
		console.log(currentScore + "点: A");
	} else if (currentScore >= 70) {
		console.log(currentScore + "点: B");
	} else {
		console.log(currentScore + "点: C");
	}
}

// より詳細な成績判定
let testScore = 88;
let homework = true;
let attendance = 95;

if (testScore >= 90 && homework && attendance >= 90) {
	console.log("優秀");
} else if (testScore >= 70 && attendance >= 80) {
	console.log("良好");
} else if (testScore >= 60) {
	console.log("及第");
} else {
	console.log("再試験");
}
```

**解説：** `else if` を使うことで、複数の条件を順番にチェックできます。最初に真になった条件の処理だけが実行されます。

---

## 📖 ページ 12：for 文のくわしい使い方

### 🌟 詳細解説

`for`文では、カウンター変数（通常は `i`）を使って、より柔軟な繰り返し処理ができます。

**for 文の応用パターン：**

```javascript
// 基本形（0から始める）
for (let i = 0; i < 5; i++) {
	// 0, 1, 2, 3, 4
}

// 1から始める
for (let i = 1; i <= 5; i++) {
	// 1, 2, 3, 4, 5
}

// 2ずつ増加
for (let i = 0; i < 10; i += 2) {
	// 0, 2, 4, 6, 8
}

// 逆順（減少）
for (let i = 5; i > 0; i--) {
	// 5, 4, 3, 2, 1
}
```

**条件を組み合わせた処理：**

```javascript
for (let i = 1; i <= 10; i++) {
	if (i % 2 === 0) {
		// 偶数の時の処理
	}
}
```

### 💡 課題

0〜10 の偶数だけを表示するプログラムを書こう

### ✅ 模範解答

```javascript
// 方法1: if文を使って偶数だけを表示
for (let i = 0; i <= 10; i++) {
	if (i % 2 === 0) {
		console.log(i);
	}
}
// 結果：0 2 4 6 8 10

// 方法2: 初期値とステップを調整
for (let i = 0; i <= 10; i += 2) {
	console.log(i);
}
// 結果：0 2 4 6 8 10

// 方法3: 奇数も表示しながら偶数を特別扱い
for (let i = 0; i <= 10; i++) {
	if (i % 2 === 0) {
		console.log(i + " は偶数です");
	} else {
		console.log(i + " は奇数です");
	}
}

// 応用: 1から20までの数字で、3の倍数は"Fizz"、5の倍数は"Buzz"
for (let i = 1; i <= 20; i++) {
	if (i % 3 === 0 && i % 5 === 0) {
		console.log("FizzBuzz");
	} else if (i % 3 === 0) {
		console.log("Fizz");
	} else if (i % 5 === 0) {
		console.log("Buzz");
	} else {
		console.log(i);
	}
}
```

**解説：** `%` は余りを求める演算子です。`i % 2 === 0` は「i を 2 で割った余りが 0」つまり「偶数」という意味です。

---

## 📖 ページ 13：関数ってなに？（入門編）

### 🌟 詳細解説

関数は、一連の処理をまとめて名前を付けたものです。同じ処理を何度も使いたい時に便利です。

**関数の基本構文：**

```javascript
function 関数名(引数1, 引数2) {
	// 処理
	return 戻り値; // 省略可能
}

// 関数の呼び出し
関数名(値1, 値2);
```

**関数の要素：**

- **関数名**：関数を識別する名前
- **引数（パラメータ）**：関数に渡すデータ
- **戻り値**：関数が返すデータ
- **処理**：関数が実行する内容

**関数の例：**

```javascript
// 引数を2倍にする関数
function double(x) {
	return x * 2;
}

let result = double(5); // 10
```

### 💡 課題

関数 `double` を定義し、`double(4)` の結果を表示

### ✅ 模範解答

```javascript
// 基本的な関数
function double(x) {
	return x * 2;
}

console.log(double(4)); // 8
console.log(double(7)); // 14

// 他の例
function greet(name) {
	return "こんにちは、" + name + "さん！";
}

console.log(greet("たろう")); // こんにちは、たろうさん！

// 複数の引数を持つ関数
function add(a, b) {
	return a + b;
}

console.log(add(3, 5)); // 8
console.log(add(10, 20)); // 30

// 戻り値のない関数
function sayHello() {
	console.log("Hello, World!");
}

sayHello(); // Hello, World!

// より実用的な例
function calculateArea(width, height) {
	let area = width * height;
	return area;
}

let roomArea = calculateArea(5, 3);
console.log("部屋の面積は" + roomArea + "平方メートルです");

// 条件分岐を含む関数
function checkGrade(score) {
	if (score >= 90) {
		return "A";
	} else if (score >= 70) {
		return "B";
	} else {
		return "C";
	}
}

console.log(checkGrade(85)); // B
console.log(checkGrade(95)); // A
```

**解説：** 関数を使うことで、同じ処理を何度も書く必要がなくなります。また、コードが読みやすくなります。

---

## 📖 ページ 14：const の紹介と注意点

### 🌟 詳細解説

`const` は「定数」を宣言するキーワードです。一度値を代入すると、後から変更できません。

**let と const の違い：**

| キーワード | 再代入 | 使い場面                   |
| ---------- | ------ | -------------------------- |
| `let`      | 可能   | 値が変わる可能性がある変数 |
| `const`    | 不可能 | 値が変わらない定数         |

**const の使い方：**

```javascript
const PI = 3.14159;
const MESSAGE = "こんにちは";

// これはエラーになる
// PI = 3.14;  // TypeError: Assignment to constant variable.
```

**const 使用のメリット：**

- 意図しない値の変更を防げる
- コードの意図が明確になる
- バグを減らせる

### 💡 課題

定数 `PI=3.14` を宣言し、再代入してみてエラーを確認

### ✅ 模範解答

```javascript
// 定数の宣言
const PI = 3.14;
console.log(PI); // 3.14

// 円の面積を計算する関数
function calculateCircleArea(radius) {
	return PI * radius * radius;
}

console.log(calculateCircleArea(5)); // 78.5

// エラーが発生する例（コメントアウトして安全に表示）
// const NAME = "たろう";
// NAME = "花子";  // TypeError: Assignment to constant variable.

// 正しい使い分けの例
const TAX_RATE = 0.1; // 税率（変わらない値）
let price = 1000; // 価格（変わる可能性がある値）
let totalPrice = price * (1 + TAX_RATE);

console.log("税込価格: " + totalPrice); // 税込価格: 1100

// 配列やオブジェクトのconst（中身は変更可能）
const colors = ["赤", "青", "緑"];
colors.push("黄"); // これは可能（配列の中身の変更）
console.log(colors); // ["赤", "青", "緑", "黄"]

// colors = ["白", "黒"];  // これはエラー（配列自体の再代入）

// 実用的な例
const MAX_SCORE = 100;
const MIN_SCORE = 0;

function validateScore(score) {
	if (score > MAX_SCORE) {
		return "スコアが最大値を超えています";
	} else if (score < MIN_SCORE) {
		return "スコアが最小値を下回っています";
	} else {
		return "有効なスコアです";
	}
}

console.log(validateScore(85)); // 有効なスコアです
console.log(validateScore(150)); // スコアが最大値を超えています
```

**解説：** 変わらない値には `const` を使う習慣をつけましょう。エラーメッセージでバグを早期発見できます。

---

## 📖 ページ 15：まとめ＆チャレンジ課題

### 🌟 第 2 週目で学んだこと

1. **データ型**：number、string、boolean と typeof
2. **比較演算子**：`==`, `===`, `>`, `<`, `>=`, `<=`, `!=`, `!==`
3. **論理演算子**：`&&`（かつ）, `||`（または）, `!`（でない）
4. **if 文の応用**：`else if`, `else` を使った複雑な条件分岐
5. **for 文の応用**：様々なパターンの繰り返し処理
6. **関数の基本**：`function` で処理をまとめる
7. **const**：再代入できない定数の宣言

### 🎨 良いコードの書き方のコツ

- セミコロン（;）を付ける習慣をつける
- 変数名は分かりやすい英語にする（name, age, score など）
- インデント（字下げ）を正しく使う
- 変わらない値には `const` を使う

### 💡 週末チャレンジ課題

1〜30 の FizzBuzz（3 の倍数:Fizz, 5 の倍数:Buzz, 両方:FizzBuzz）を表示

### ✅ 模範解答

```javascript
// 基本的なFizzBuzz
function fizzBuzz() {
	for (let i = 1; i <= 30; i++) {
		if (i % 3 === 0 && i % 5 === 0) {
			console.log("FizzBuzz");
		} else if (i % 3 === 0) {
			console.log("Fizz");
		} else if (i % 5 === 0) {
			console.log("Buzz");
		} else {
			console.log(i);
		}
	}
}

fizzBuzz();

/* 実行結果（一部）：
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
...
*/

// 関数化してより使いやすく
function createFizzBuzz(start, end) {
	console.log(start + "から" + end + "までのFizzBuzz:");
	console.log("------------------------");

	for (let i = start; i <= end; i++) {
		let output = "";

		if (i % 3 === 0) {
			output += "Fizz";
		}
		if (i % 5 === 0) {
			output += "Buzz";
		}

		if (output === "") {
			output = i;
		}

		console.log(output);
	}
}

// 使用例
createFizzBuzz(1, 30);

// さらに応用：7の倍数も追加
function advancedFizzBuzz(max) {
	console.log("高度なFizzBuzz (1〜" + max + "):");
	console.log("3の倍数:Fizz, 5の倍数:Buzz, 7の倍数:Bang");
	console.log("------------------------------------------");

	for (let i = 1; i <= max; i++) {
		let result = "";

		if (i % 3 === 0) result += "Fizz";
		if (i % 5 === 0) result += "Buzz";
		if (i % 7 === 0) result += "Bang";

		console.log(result === "" ? i : result);
	}
}

advancedFizzBuzz(30);
```

**解説：** FizzBuzz は条件分岐と繰り返しの理解を確認する定番の問題です。複数の条件を組み合わせる練習になります。

---

## 🎉 第 2 週目完了！

お疲れさまでした！第 2 週目では、JavaScript のより詳しいルールや書き方を学びました。次の第 3 週目では、配列やオブジェクトなど、データのまとまりを扱う方法を学んでいきます。
