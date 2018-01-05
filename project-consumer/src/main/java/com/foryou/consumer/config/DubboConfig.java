package com.foryou.consumer.config;

import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ConsumerConfig;
import com.alibaba.dubbo.config.MonitorConfig;
import com.alibaba.dubbo.config.ProtocolConfig;
import com.alibaba.dubbo.config.ProviderConfig;
import com.alibaba.dubbo.config.RegistryConfig;
import com.alibaba.dubbo.config.spring.AnnotationBean;
import com.alibaba.dubbo.rpc.Exporter;
import com.alibaba.dubbo.rpc.Invoker;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Dubbo Config
 */
@Configuration
public class DubboConfig {

    /**
     * 应用名称
     */
    @Value("${dubbo.application.name}")
    private String applicationName;

    /**
     * 应用版本号
     */
    @Value("${dubbo.application.version}")
    private String applicationVersion;

    /**
     * 组织
     */
    @Value("${dubbo.application.organization}")
    private String organization;

    /**
     * 负责人
     */
    @Value("${dubbo.application.owner}")
    private String owner;

    /**
     * 注册中心地址
     */
    @Value("${dubbo.registry.address}")
    private String registryAddress;

    /**
     * 缓存文件地址
     */
    @Value("${dubbo.registry.file}")
    private String registryFile;

    /**
     * dubbo协议端口号
     */
    @Value("${dubbo.protocol.port}")
    private Integer protocolPort;

    /**
     * 应用相关配置
     *
     * @return
     */
    @Bean
    public ApplicationConfig applicationConfig() {
        ApplicationConfig applicationConfig = new ApplicationConfig();
        applicationConfig.setName(applicationName);
        applicationConfig.setVersion(applicationVersion);
        applicationConfig.setOrganization(organization);
        applicationConfig.setOwner(owner);
        return applicationConfig;
    }

    /**
     * 注册中心配置
     * 基于zookeeper
     *
     * @return
     */
    @Bean
    public RegistryConfig registryConfig() {
        RegistryConfig registryConfig = new RegistryConfig();
        registryConfig.setProtocol("zookeeper");
        registryConfig.setAddress(registryAddress);
        registryConfig.setFile(registryFile);
        registryConfig.setTimeout(30000);
        return registryConfig;
    }

    /**
     * 协议配置
     * 基于dubbo
     *
     * @return
     */
    @Bean
    public ProtocolConfig protocolConfig() {
        ProtocolConfig protocolConfig = new ProtocolConfig();
        protocolConfig.setName("dubbo");
        protocolConfig.setPort(protocolPort);
        return protocolConfig;
    }

    /**
     * 监控配置
     * 监控的地址从注册中心中找
     *
     * @return
     */
    @Bean
    public MonitorConfig monitorConfig() {
        MonitorConfig monitorConfig = new MonitorConfig();
        monitorConfig.setProtocol("registry");
        return monitorConfig;
    }

    /**
     * 设置dubbo扫描包
     *
     * @return
     */
    @Bean
    public static AnnotationBean annotationBean() {
        AnnotationBean annotationBean = new AnnotationBean();
        annotationBean.setPackage("com.foryou.consumer.service.dubbo");
        return annotationBean;
    }

    /**
     * 提供者配置
     *
     * @return
     */
    @Bean(name = "defaultProvider")
    @ConditionalOnClass(Exporter.class)
    public ProviderConfig providerConfig() {
        ProviderConfig providerConfig = new ProviderConfig();
        providerConfig.setApplication(applicationConfig());
        providerConfig.setProtocol(protocolConfig());
        providerConfig.setRegistry(registryConfig());
        providerConfig.setMonitor(monitorConfig());
        providerConfig.setTimeout(30000);
        providerConfig.setRetries(0);
        providerConfig.setDelay(30000);
        return providerConfig;
    }

    /**
     * 消费者配置
     *
     * @return
     */
    @Bean(name = "defaultConsumer")
    @ConditionalOnClass(Invoker.class)
    public ConsumerConfig consumerConfig() {
        ConsumerConfig consumerConfig = new ConsumerConfig();
        consumerConfig.setApplication(applicationConfig());
        consumerConfig.setRegistry(registryConfig());
        consumerConfig.setMonitor(monitorConfig());
        consumerConfig.setCheck(false);
        consumerConfig.setTimeout(60000);
        consumerConfig.setRetries(0);
        return consumerConfig;
    }
}
