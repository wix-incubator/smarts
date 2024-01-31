import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Layout from "@theme/Layout";
import GitHubButton from "react-github-btn";

import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./index.module.css";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="The React framework for the Wix Developer Platform"
    >
      <HeaderHero />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

function HeaderHero() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Section background="dark" className={styles.HeaderHero}>
      <div className={styles.socialLinks}>
        <TwitterButton accountName="DevsOnWix" />
        <GitHubStarButton />
      </div>
      <TwoColumns
        reverse
        columnOne={<></>}
        columnTwo={
          <>
            <h1 className={styles.title}>{siteConfig.title}</h1>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
            <div className="buttons">
              <HomeCallToAction />
            </div>
          </>
        }
      />
    </Section>
  );
}

export function Section({ children, className, background = "light" }) {
  return (
    <section
      className={
        className
          ? `${styles.Section} ${className} ${background}`
          : `${styles.Section} ${background}`
      }
    >
      {children}
    </section>
  );
}

function TwoColumns({ columnOne, columnTwo, reverse }) {
  return (
    <div className={`${styles.TwoColumns} ${reverse ? styles.reverse : ""}`}>
      <div
        className={`${styles.column} ${styles.first} ${reverse ? styles.right : styles.left}`}
      >
        {columnOne}
      </div>
      <div
        className={`${styles.column} ${styles.last} ${reverse ? styles.left : styles.right}`}
      >
        {columnTwo}
      </div>
    </div>
  );
}

function GitHubStarButton() {
  return (
    <div className={styles["github-button"]}>
      <GitHubButton
        href="https://github.com/wix-incubator/smarts"
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star incubator/smarts on GitHub"
      >
        Star
      </GitHubButton>
    </div>
  );
}

function TwitterButton({ accountName }) {
  return (
    <a
      href={`https://twitter.com/intent/follow?screen_name=${accountName}&region=follow_link`}
      className={styles["twitter-follow-button"]}
    >
      <div className={styles.icon} />
      Follow @{accountName}
    </a>
  );
}

function HomeCallToAction() {
  return (
    <>
      <ActionButton
        type="primary"
        href={useBaseUrl("docs/getting-started")}
        target="_self"
      >
        Get started
      </ActionButton>
      <ActionButton
        type="secondary"
        href={useBaseUrl("docs/intro")}
        target="_self"
      >
        Learn the basics
      </ActionButton>
    </>
  );
}

function ActionButton({ href, type = "primary", target, children }) {
  return (
    <a
      className={`${styles.ActionButton} ${styles[type]}`}
      href={href}
      target={target}
    >
      {children}
    </a>
  );
}
