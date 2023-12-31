---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **Sloscribe in less than 5 minutes**.

## Getting Started

Get started by [**installing sloscribe**](/docs/installation/go).

## Add sloscribe annotations to your codebase
Add comments to your source code. See [**declarative comments**](/docs/annotations/sloth/service) for more info.

**metric.go**
```go
    // @sloth service chatgpt
    var (
        // @sloth.slo name chat-gpt-availability
        // @sloth.slo objective 95.0
        // @sloth.sli error_query sum(rate(tenant_failed_login_operations_total{client="chat-gpt"}[{{.window}}])) OR on() vector(0)
        // @sloth.sli total_query sum(rate(tenant_login_operations_total{client="chat-gpt"}[{{.window}}]))
        // @sloth.slo description 95% of logins to the chat-gpt app should be successful.
        // @sloth.alerting name ChatGPTAvailability
        metricTenantLogins = prometheus.NewGauge(
            prometheus.GaugeOpts{
                Namespace: "chatgpt",
                Subsystem: "auth0",
                Name:      "tenant_login_operations_total",
            })
        metricTenantFailedLogins = prometheus.NewCounter(
            prometheus.CounterOpts{
            Namespace: "chatgpt",
            Subsystem: "auth0",
            Name:      "tenant_failed_login_operations_total",
        })
    )
```

## Generate sloth SLO specifications from the codebase

Run **sloscribe init** in the project's root directory. This will parse the root directory's different source files for `@sloth` annotations and
generate a specification **(s)** for the SLO definitions, finally printing them to standard out.

```shell
sloscribe init
```

You can also specify a specific file to parse by using the `-f/--file` flag.

 ```shell
sloscribe init -f metrics.go
 ```

:::tip Note

Another way to parse a source file is to pass the input file through pipe to **sloscribe**.

 ```shell
cat metrics.go | ./sloscribe init -f -
 ```

:::

**Output:**
```yaml
# Code generated by sloscribe: https://github.com/slosive/sloscribe.
# DO NOT EDIT.
version: prometheus/v1
service: chatgpt
slos:
    - name: chat-gpt-availability
      description: 95% of logins to the chat-gpt app should be successful.
      objective: 95
      sli:
        events:
            error_query: sum(rate(tenant_failed_login_operations_total{client="chat-gpt"}[{{.window}}])) OR on() vector(0)
            total_query: sum(rate(tenant_login_operations_total{client="chat-gpt"}[{{.window}}]))
      alerting:
        name: ChatGPTAvailability
```

:::tip Note

The resulting specification can also be piped to a file rather than printed to the stdout.

```shell
sloscribe init > chatgpt.yaml
```

:::

## Generate Prometheus alerting group
The sloth SLO specification can be used to generate a Prometheus alert group `rules.yaml` which can be used by a Prometheus instance.

```shell
sloth generate -i chatgpt.yaml -o ./rules.yml
```

<details>
  <summary>Resulting alert groups.</summary>

```yaml
# Code generated by Sloth (v0.11.0): https://github.com/slok/sloth.
# DO NOT EDIT.

groups:
- name: sloth-slo-sli-recordings-foo-chat-gpt-availability
  rules:
  - record: slo:sli_error:ratio_rate5m
    expr: |
      (sum(rate(tenant_failed_login_operations_total{client="chat-gpt"}[5m])) OR on() vector(0))
      /
      (sum(rate(tenant_login_operations_total{client="chat-gpt"}[5m])))
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
      sloth_window: 5m
  - record: slo:sli_error:ratio_rate30m
    expr: |
      (sum(rate(tenant_failed_login_operations_total{client="chat-gpt"}[30m])) OR on() vector(0))
      /
      (sum(rate(tenant_login_operations_total{client="chat-gpt"}[30m])))
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
      sloth_window: 30m
  - record: slo:sli_error:ratio_rate1h
    expr: |
      (sum(rate(tenant_failed_login_operations_total{client="chat-gpt"}[1h])) OR on() vector(0))
      /
      (sum(rate(tenant_login_operations_total{client="chat-gpt"}[1h])))
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
      sloth_window: 1h
  - record: slo:sli_error:ratio_rate2h
    expr: |
      (sum(rate(tenant_failed_login_operations_total{client="chat-gpt"}[2h])) OR on() vector(0))
      /
      (sum(rate(tenant_login_operations_total{client="chat-gpt"}[2h])))
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
      sloth_window: 2h
  - record: slo:sli_error:ratio_rate6h
    expr: |
      (sum(rate(tenant_failed_login_operations_total{client="chat-gpt"}[6h])) OR on() vector(0))
      /
      (sum(rate(tenant_login_operations_total{client="chat-gpt"}[6h])))
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
      sloth_window: 6h
  - record: slo:sli_error:ratio_rate1d
    expr: |
      (sum(rate(tenant_failed_login_operations_total{client="chat-gpt"}[1d])) OR on() vector(0))
      /
      (sum(rate(tenant_login_operations_total{client="chat-gpt"}[1d])))
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
      sloth_window: 1d
  - record: slo:sli_error:ratio_rate3d
    expr: |
      (sum(rate(tenant_failed_login_operations_total{client="chat-gpt"}[3d])) OR on() vector(0))
      /
      (sum(rate(tenant_login_operations_total{client="chat-gpt"}[3d])))
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
      sloth_window: 3d
  - record: slo:sli_error:ratio_rate30d
    expr: |
      sum_over_time(slo:sli_error:ratio_rate5m{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"}[30d])
      / ignoring (sloth_window)
      count_over_time(slo:sli_error:ratio_rate5m{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"}[30d])
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
      sloth_window: 30d
- name: sloth-slo-meta-recordings-foo-chat-gpt-availability
  rules:
  - record: slo:objective:ratio
    expr: vector(0.95)
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
  - record: slo:error_budget:ratio
    expr: vector(1-0.95)
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
  - record: slo:time_period:days
    expr: vector(30)
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
  - record: slo:current_burn_rate:ratio
    expr: |
      slo:sli_error:ratio_rate5m{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"}
      / on(sloth_id, sloth_slo, sloth_service) group_left
      slo:error_budget:ratio{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"}
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
  - record: slo:period_burn_rate:ratio
    expr: |
      slo:sli_error:ratio_rate30d{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"}
      / on(sloth_id, sloth_slo, sloth_service) group_left
      slo:error_budget:ratio{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"}
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
  - record: slo:period_error_budget_remaining:ratio
    expr: 1 - slo:period_burn_rate:ratio{sloth_id="foo-chat-gpt-availability", sloth_service="foo",
      sloth_slo="chat-gpt-availability"}
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_service: foo
      sloth_slo: chat-gpt-availability
  - record: sloth_slo_info
    expr: vector(1)
    labels:
      foo: bar
      sloth_id: foo-chat-gpt-availability
      sloth_mode: cli-gen-prom
      sloth_objective: "95"
      sloth_service: foo
      sloth_slo: chat-gpt-availability
      sloth_spec: prometheus/v1
      sloth_version: v0.11.0
- name: sloth-slo-alerts-foo-chat-gpt-availability
  rules:
  - alert: K8sApiserverAvailabilityAlert
    expr: |
      (
          max(slo:sli_error:ratio_rate5m{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"} > (14.4 * 0.05)) without (sloth_window)
          and
          max(slo:sli_error:ratio_rate1h{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"} > (14.4 * 0.05)) without (sloth_window)
      )
      or
      (
          max(slo:sli_error:ratio_rate30m{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"} > (6 * 0.05)) without (sloth_window)
          and
          max(slo:sli_error:ratio_rate6h{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"} > (6 * 0.05)) without (sloth_window)
      )
    labels:
      sloth_severity: page
    annotations:
      summary: '{{$labels.sloth_service}} {{$labels.sloth_slo}} SLO error budget burn
        rate is over expected.'
      title: (page) {{$labels.sloth_service}} {{$labels.sloth_slo}} SLO error budget
        burn rate is too fast.
  - alert: K8sApiserverAvailabilityAlert
    expr: |
      (
          max(slo:sli_error:ratio_rate2h{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"} > (3 * 0.05)) without (sloth_window)
          and
          max(slo:sli_error:ratio_rate1d{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"} > (3 * 0.05)) without (sloth_window)
      )
      or
      (
          max(slo:sli_error:ratio_rate6h{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"} > (1 * 0.05)) without (sloth_window)
          and
          max(slo:sli_error:ratio_rate3d{sloth_id="foo-chat-gpt-availability", sloth_service="foo", sloth_slo="chat-gpt-availability"} > (1 * 0.05)) without (sloth_window)
      )
    labels:
      sloth_severity: ticket
    annotations:
      summary: '{{$labels.sloth_service}} {{$labels.sloth_slo}} SLO error budget burn
        rate is over expected.'
      title: (ticket) {{$labels.sloth_service}} {{$labels.sloth_slo}} SLO error budget
        burn rate is too fast.
```

</details>

## Add Prometheus alert group to a Prometheus configuration

The `rules.yml` from the previous steps can then be referenced in the Prometheus instance configuration, under the `rule_files` field.

```yaml
# my global config
global:
  scrape_interval: 5s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 5s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
 - "rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "exporter"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ["localhost:9301"]
```
