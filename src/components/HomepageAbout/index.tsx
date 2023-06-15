import React from 'react';
import styles from './styles.module.css';

export default function HomepageAbout(): JSX.Element {
  return (
    <section className={styles.about}>
      <div className="container">
        <div className="row">
          <div className="container text--center padding-horiz--md">
              <h3 className="hero__subtitle">What is Slotalk?</h3>
              <p>
                  <span className="text--primary">Slotalk</span> is an open source CLI tool that allows developers to embed Sloth SLO/SLI specifications
                  as in-code annotations rather than a YAML file.
                  <p>
                      <strong>The project was started as an experiment to verify how developers would feel about embedding external specifications within the sourcecode.</strong>
                  </p>

              </p>
          </div>
        </div>
      </div>
    </section>
  );
}