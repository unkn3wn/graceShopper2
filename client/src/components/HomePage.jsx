import styles from "../syles/Homepage.module.css";
import { useNavigate } from "react-router-dom";
import wilson from "../assets/wilson pfp.jpeg";
import ferni from "../assets/fernando pfp.png";
import ugo from "../assets/ugonna pfp.png";
function Home() {
  const nav = useNavigate();
  return (
    <div className="h-screen">
      <div className={styles.front}>
        <h1 className={styles.title}>Real Fake Clothes</h1>
        <button
          href="#_"
          class="relative inline-flex items-center px-8 py-1 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-50 mt-14"
          onClick={() => {
            nav("/products");
          }}
        >
          <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span class="relative p-4 ">Shop Now</span>
        </button>
        <footer>
          <div className={styles.cards}>
            <img className={styles.profilePic} src={wilson} alt="model" />
            <p className={styles.name}>Wilson Chen</p>
            <div>
              <a href="https://github.com/Wilsonrchen" target="_blank" class>
                <img className={styles.gitImg} src="githublogo.jpg" />
              </a>
              <a
                href="https://www.linkedin.com/in/wilsonrchen/"
                target="_blank"
                
              >
                {" "}
                <img  className={styles.linkLog} src="LinkedIn.jpg" />
              </a>
            </div>
          </div>

          <div className={styles.cards}>
            <img className={styles.profilePic} src={ferni} alt="model" />
            <p className={styles.name}>Fernando Reyes</p>
            <div>
              <a href="https://github.com/unkn3wn" target="_blank">
                <img className={styles.gitImg} src="githublogo.jpg" />
              </a>
              <a
                href="https://www.linkedin.com/in/fernando-reyes-673860240/"
                target="_blank"
              >
                {" "}
                <img className={styles.linkLog} src="LinkedIn.jpg" />
              </a>
            </div>
          </div>

          <div className={styles.cards}>
            <img className={styles.profilePic} src={ugo} alt="model" />
            <p className={styles.name}> Ugonna Duru</p>
            <div>
              <a href="https://github.com/Uduru10" target="_blank">
                <img className={styles.gitImg} src="githublogo.jpg" />
              </a>
              <a
                href="https://www.linkedin.com/in/ugo-duru-780aa6257/"
                target="_blank"
              >
                {" "}
                <img className={styles.linkLog} src="LinkedIn.jpg" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
