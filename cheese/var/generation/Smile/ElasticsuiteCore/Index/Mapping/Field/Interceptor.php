<?php
namespace Smile\ElasticsuiteCore\Index\Mapping\Field;

/**
 * Interceptor class for @see \Smile\ElasticsuiteCore\Index\Mapping\Field
 */
class Interceptor extends \Smile\ElasticsuiteCore\Index\Mapping\Field implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct($name, $type = 'string', $nestedPath = null, $fieldConfig = array())
    {
        $this->___init();
        parent::__construct($name, $type, $nestedPath, $fieldConfig);
    }

    /**
     * {@inheritdoc}
     */
    public function getMappingPropertyConfig()
    {
        $pluginInfo = $this->pluginList->getNext($this->subjectType, 'getMappingPropertyConfig');
        if (!$pluginInfo) {
            return parent::getMappingPropertyConfig();
        } else {
            return $this->___callPlugins('getMappingPropertyConfig', func_get_args(), $pluginInfo);
        }
    }
}
