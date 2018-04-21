<?php
namespace Accord\Sales\Controller\Order\Reorder;

/**
 * Interceptor class for @see \Accord\Sales\Controller\Order\Reorder
 */
class Interceptor extends \Accord\Sales\Controller\Order\Reorder implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Sales\Controller\AbstractController\OrderLoaderInterface $orderLoader, \Magento\Framework\Registry $registry, \Accord\Sales\Helper\Order\Item\OptionManager $orderItemOptionManager)
    {
        $this->___init();
        parent::__construct($context, $orderLoader, $registry, $orderItemOptionManager);
    }

    /**
     * {@inheritdoc}
     */
    public function dispatch(\Magento\Framework\App\RequestInterface $request)
    {
        $pluginInfo = $this->pluginList->getNext($this->subjectType, 'dispatch');
        if (!$pluginInfo) {
            return parent::dispatch($request);
        } else {
            return $this->___callPlugins('dispatch', func_get_args(), $pluginInfo);
        }
    }
}
