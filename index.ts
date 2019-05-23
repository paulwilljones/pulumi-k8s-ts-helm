import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";

const jenkins = new k8s.helm.v2.Chart("pulumi-jenkins", {
    repo: "stable",
    chart: "jenkins"
});

const frontend = jenkins.getResourceProperty("v1/Service", "pulumi-jenkins", "status");
export const frontendIp = frontend.apply(status => status.loadBalancer.ingress[0].hostname);