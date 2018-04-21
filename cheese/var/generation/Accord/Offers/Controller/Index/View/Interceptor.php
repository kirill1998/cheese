<?php
namespace Accord\Offers\Controller\Index\View;

/**
 * Interceptor class for @see \Accord\Offers\Controller\Index\View
 */
class Interceptor extends \Accord\Offers\Controller\Index\View implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Accord\Offers\Model\SpecialOffers\Repository $repository, \Magento\Framework\Controller\Result\ForwardFactory $resultForwardFactory, \Magento\Framework\Registry $coreRegistry, \Magento\Store\Model\StoreManagerInterface $storeManager, \Magento\Catalog\Helper\Category $categoryHelper, \Magento\Catalog\Api\CategoryRepositoryInterface $categoryRepository, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Magento\Catalog\Model\Session $catalogSession, \Magento\Framework\App\Action\Context $context)
    {
        $this->___init();
        parent::__construct($repository, $resultForwardFactory, $coreRegistry, $storeManager, $categoryHelper, $categoryRepository, $resultPageFactory, $catalogSession, $context);
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
