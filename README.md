# 🎰 Betting Calculator

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)

> 🚀 **Живе демо:** [https://betverse-calculator.vercel.app/]

SPA (Single Page Application) калькулятор для миттєвого розрахунку потенційного виграшу та прибутку зі ставок. Проєкт розроблено з акцентом на чисту архітектуру, строгу типізацію та найкращі практики UX/UI.

## ✨ Основний функціонал

- **Real-time розрахунок:** Використання `useMemo` для миттєвого оновлення результатів без зайвих рендерів.
- **Продвинута валідація:** Форма побудована на `react-hook-form` із суворим контролем мінімальних/максимальних значень та блокуванням від'ємних чисел на рівні HTML-семантики.
- **Локальна історія:** Збереження останніх 5 ставок у `localStorage` з використанням принципу FIFO (First-In, First-Out).
- **Плавні анімації:** Реалізовано CSS-анімації для появи результату (`pop-in`), появи карток історії та їх плавного видалення.
- **Семантика та DRY:** Використання семантичних зв'язок (`label` + `id`), винесення логіки форматування у спільні `utils`.

## 🎁 Реалізовані бонусні завдання

1. **💱 Мультивалютність:** Підтримка конвертації ставок (UAH, USD, EUR, PLN, GBP) у реальному часі зі збереженням еквіваленту виграшу.
2. **📊 Графік динаміки:** Візуалізація чистого прибутку останніх ставок за допомогою бібліотеки `recharts` (з'являється при наявності ≥ 2 ставок).
3. **🛡️ TypeScript:** Проєкт повністю типізовано (інтерфейси даних, пропси, типи подій).

## 🛠 Технологічний стек

- **Core:** React 19  (Functional Components, Hooks)
- **Збірка:** Vite
- **Мова:** TypeScript
- **Робота з формами:** React Hook Form
- **Стилізація:** CSS Modules + `classnames` (cn) + CSS Variables
- **Візуалізація даних:** Recharts

## 📂 Архітектура проєкту

Логіка додатку повністю відділена від UI. Уся математика, робота з `localStorage` та станами форми інкапсульована у кастомний хук `useBetCalculator`.

```text
src/
├── components/          # UI компоненти (кожен у своїй папці з .module.css)
│   ├── BetForm/
│   ├── BetResult/
│   ├── BetHistory/
│   └── BetChart/
├── hooks/               # Кастомні хуки
│   └── useBetCalculator.ts
├── types/               # TypeScript інтерфейси
├── utils/               # Хелпери (форматування валют, пошук по константам)
├── constants/           # Статичні дані (типи ігор, курси валют)
└── index.css            # Глобальні змінні та reset
```
