<?php
namespace Accord\Quick\Controller\Ajax\Product;

/**
 * Interceptor class for @see \Accord\Quick\Controller\Ajax\Product
 */
class Interceptor extends \Accord\Quick\Controller\Ajax\Product implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Accord\Catalog\Model\CustomerProduct\Ko\ProductAjax $productAjax, \Magento\Catalog\Model\Product $product)
    {
        $this->___init();
        parent::__construct($context, $productAjax, $product);
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
