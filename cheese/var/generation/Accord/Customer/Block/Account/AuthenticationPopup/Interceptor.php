<?php
namespace Accord\Customer\Block\Account\AuthenticationPopup;

/**
 * Interceptor class for @see \Accord\Customer\Block\Account\AuthenticationPopup
 */
class Interceptor extends \Accord\Customer\Block\Account\AuthenticationPopup implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\View\Element\Template\Context $context, array $data, \Accord\FindNearestDepot\Helper\GeolocationHelper $geolocationHelper)
    {
        $this->___init();
        parent::__construct($context, $data, $geolocationHelper);
    }

    /**
     * {@inheritdoc}
     */
    public function getConfig()
    {
        $pluginInfo = $this->pluginList->getNext($this->subjectType, 'getConfig');
        if (!$pluginInfo) {
            return parent::getConfig();
        } else {
            return $this->___callPlugins('getConfig', func_get_args(), $pluginInfo);
        }
    }
}
