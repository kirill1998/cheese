<?php
namespace Accord\Catalog\Controller\Ajax\Sub;

/**
 * Interceptor class for @see \Accord\Catalog\Controller\Ajax\Sub
 */
class Interceptor extends \Accord\Catalog\Controller\Ajax\Sub implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory, \Magento\Framework\ObjectManagerInterface $objectManager, \Accord\Catalog\Model\CustomerProduct\Ko\Collection $collection, \Accord\Catalog\Model\CustomerProduct\Repository $repository, \Psr\Log\LoggerInterface $logger)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $resultJsonFactory, $objectManager, $collection, $repository, $logger);
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
