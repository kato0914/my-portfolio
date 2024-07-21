import React from 'react';
import './About.css';

function About() {
  const profile = {
    name: "加藤 潤一",
    title: "フロントエンドエンジニア",
    introduction: `
      はじめまして、加藤潤一と申します。

      私は、ユーザーの心に響くウェブ体験を創造することに情熱を注ぐフロントエンドエンジニアです。

      HTML、CSS、JavaScriptを基礎として、React.jsを用いた現代的なウェブアプリケーション開発に取り組んでいます。

      常に新しい技術トレンドにアンテナを張り、ユーザビリティとパフォーマンスの最適化に力を入れています。

      チーム開発では、コミュニケーションを大切にし、メンバーと協力してプロジェクトを成功に導くことを心がけています。

      このポートフォリオサイトでは、私のスキルセットと過去のプロジェクト実績をご覧いただけます。

      ぜひ、各プロジェクトの詳細をチェックしていただき、私の技術力と創造性をご確認ください。

      新しい挑戦や協業の機会を心よりお待ちしております。
    `,
    skills: [
      "HTML5 / CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "Responsive Web Design",
      "Version Control (Git)",
      "UI/UX Design Principles"
    ],
  };

  return (
    <section id="about">
      <div className="section-content">
        <h2>{profile.name}</h2>
        <h3>{profile.title}</h3>
        <div className="introduction">
          {profile.introduction.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="skills">
          <h4>スキルセット</h4>
          <ul>
            {profile.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;