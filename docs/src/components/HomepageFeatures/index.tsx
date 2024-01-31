import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Headless Components",
    Svg: require("@site/static/img/undraw_design_components_9vy6.svg").default,
    description: (
      <>
        Wix Smarts includes a wide range of headless components that you can use
        to build your own UI. <b>We'll take care of the heavy lifting</b> for
        you (data fetching, validations, domain logic, etc), so you can{" "}
        <b>focus on building your app</b>.
      </>
    ),
  },
  {
    title: "Your Design - Your Way",
    Svg: require("@site/static/img/undraw_designer_re_5v95.svg").default,
    description: (
      <>
        Design your UI using your favorite tools and libraries.{" "}
        <b>Wix Smarts is styling framework agnostic</b> and can be used with any
        styling solution (Tailwind CSS, CSS-in-JS, CSS Modules, etc).{" "}
        <b>Build your own design system</b> around Wix Smarts components.
      </>
    ),
  },
  {
    title: "First Class Composition",
    Svg: require("@site/static/img/undraw_fitting_piece_re_pxay.svg").default,
    description: (
      <>
        Wix Smarts is built with composition in mind.{" "}
        <b>Compose your UI from small, reusable components</b> and build your
        own component library.
      </>
    ),
  },
  {
    title: "Layed Architecture",
    Svg: require("@site/static/img/undraw_building_re_xfcm.svg").default,
    description: (
      <>
        The components are <b>layered</b>, from core <b>display components</b>,
        interactive
        <b> Client Components</b> and <b>Server Components</b> and can be used
        in any combination.
      </>
    ),
  },
  {
    title: "Performant & Accissible",
    Svg: require("@site/static/img/undraw_performance_overview_re_mqrq.svg")
      .default,
    description: (
      <>
        Performance and accessibility are baked in from the start.{" "}
        <b>It's fast by default</b> and includes <b>accessibility features</b>{" "}
        out of the box.
      </>
    ),
  },
  {
    title: "Best Practices",
    Svg: require("@site/static/img/undraw_growing_re_olpi.svg").default,
    description: (
      <>
        Years of experience building online experiences for millions of users
        have taught us a lot.{" "}
        <b>Wix Smarts is built on top of best practices</b> and includes{" "}
        <b>built-in support for common use cases.</b>
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
