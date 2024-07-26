import React from 'react';
import './About.css';

function About() {
  const profile = {
    name: "",
    title: "デザイナー・コーダー",
    introduction: `
      私は、お客様の困りごとを解決することに情熱を注ぐデザイナー・コーダーです。

      HTML、CSS、JavaScriptを基礎として、React.jsを用いた現代的なウェブアプリケーション開発に取り組んでいます。

      常に新しい技術トレンドにアンテナを張り、ユーザビリティとパフォーマンスの最適化に力を入れています。

      ExcelVBAやGoogleAppScriptを用いた業務効率化アプリの作成も行なっております。

      このポートフォリオサイトでは、私のスキルセットと制作例をご覧いただけます。

      ぜひ、各プロジェクトの詳細をチェックしていただき、私の技術力と創造性をご確認ください。

      新しい挑戦や協業の機会を心よりお待ちしております。
    `,
    skills: [
      "HTML5 / CSS3",
      "JavaScript (ES6+)",
      "React/Next.js",
      "Responsive Web Design",
      "Microsoft Excel VBA",
      "Google App Script",
      "Version Control (Git)",
      "UI/UX Design Principles"
    ],
  };

  const showIntroduction = true; // 条件に応じて表示を切り替え

  return (
    <div className="about-content">
      <h3>{profile.title}</h3>
      {showIntroduction && (
        <div className="introduction">
          {profile.introduction.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
      <div className="skills">
        <h4>スキルセット</h4>
        <div className="skills-grid">
          {profile.skills.map((skill, index) => (
            <div key={index} className="skill-item">{skill}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;