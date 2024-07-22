import React, { useState } from 'react';
import './Projects.css';
import project1Image from '../img/project1.webp';
import project1ModalImage from '../img/project1_modal.webp'; // モーダル用の新しい画像
import project8ModalImage from '../img/project8_modal.webp'; // モーダル用の新しい画像
import project2Image from '../img/project2.webp';
import project3Image from '../img/project3.webp';
import project4Image from '../img/project4.webp';
import project5Image from '../img/project5.webp';
import project6Image from '../img/project6.webp';
import project7Image from '../img/project7.webp';
import project8Image from '../img/project8.webp';
import ImageModal from './ImageModal'; // モーダルコンポーネントをインポート

function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomable, setIsZoomable] = useState(false);

  const projects = [
    { 
      id: 1, 
      title: 'KodomoBijutukan', 
      description: 'お子様が作った作品の写真を登録できるWebアプリを作成しました。\nチーム開発でFlaskを担当しました。\n使用言語：HTML,CSS,Flask,JavaScript',
      image: project1Image,
      modalImage: project1ModalImage, // モーダル用の新しい画像
      link: '' // プロジェクトのリンクを追加
    },
    { 
      id: 7, 
      title: '筋トレ記録・分析アプリ', 
      description: '筋トレを記録してデータを分析し、継続していくためのアプリを作成しました。\nHTML,CSS,React,GAS,Googleスプレッドシート',
      image: project7Image,
      link: 'https://kintore-react-mirror.vercel.app/' // プロジェクトのリンクを追加
    },
    { 
      id: 8, 
      title: '架空の講座LP', 
      description: 'WordPressを使って１から作りました。',
      image: project8Image,
      modalImage: project8ModalImage, // モーダル用の新しい画像
      link: '' // プロジェクトのリンク追加
    },
    { 
      id: 2, 
      title: '架空の水族館LP', 
      description: '使用言語：HTML,CSS',
      image: project2Image,
      link: 'https://kato0914.github.io/seazoo/' // プロジェクトのリンクを追加
    },
    { 
      id: 3, 
      title: '架空の夏祭りLP', 
      description: '使用言語：HTML,CSS',
      image: project3Image,
      link: 'https://kato0914.github.io/natumaturi-0729bootstrap-/' // プロジェクトのリンクを追加
    },
    { 
      id: 4, 
      title: '架空の講演イベントLP', 
      description: '使用プラットフォーム：STUDIO',
      image: project4Image,
      link: 'https://silver579744.studio.site/' // プロジェクトのリンクを追加
    },
    { 
      id: 5, 
      title: '架空のコーヒーショップ・キッチンカーLPのイメージ', 
      description: '使用プラットフォーム：STUDIO',
      image: project5Image,
      link: 'https://white390100.studio.site/' // プロジェクトのリンクを追加
    },
    { 
      id: 6, 
      title: '架空の英会話スクールLPのイメー', 
      description: '使用プラットフォーム：STUDIO',
      image: project6Image,
      link: 'https://pink163040.studio.site/' // プロジェクトのリンクを追加
    },
    // らにプロジェクトを追加
  ];

  const handleProjectClick = (project) => {
    if (project.modalImage) {
      setSelectedImage(project.modalImage);
      setIsZoomable(project.id === 1 || project.id === 8);
      setModalOpen(true);
    } else if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  return (
    <section id="projects">
      <div className="section-content">
        <div className="project-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
      <ImageModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        imageSrc={selectedImage}
        isZoomable={isZoomable}
      />
    </section>
  );
}

export default Projects;