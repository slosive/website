import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use CLI 💻',
    Svg: require('@site/static/img/terminal.svg').default,
    description: (
      <>
      </>
    ),
  },
  {
    title: 'Simple integration with Sloth 🦥',
    Svg: require('@site/static/img/sloth.svg').default,
    description: (
      <>
      </>
    ),
  },
  {
    title: 'Multi architecture support for 🐧|🍎',
    Svg: require('@site/static/img/linux.svg').default,
    description: (
      <>
      </>
    ),
  },
  {
    title: 'Github Action (coming soon...)',
    Svg: require('@site/static/img/github.svg').default,
    description: (
       <>
       </>
    ),
    },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
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
