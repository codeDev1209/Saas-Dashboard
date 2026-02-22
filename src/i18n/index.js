import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: {
        overview: 'Overview',
        analytics: 'Analytics',
        products: 'Products',
        orders: 'Orders',
        users: 'Users',
        settings: 'Settings'
      },
      common: {
        search: 'Search...',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        export: 'Export',
        filter: 'Filter',
        loading: 'Loading...',
        noData: 'No data available',
        confirmDelete: 'Are you sure you want to delete this?',
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Info'
      },
      login: {
        welcomeBack: 'Welcome back',
        enterCredentials: 'Enter your credentials to access your dashboard',
        email: 'Email Address',
        password: 'Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        signIn: 'Sign In',
        signingIn: 'Signing in...',
        invalidEmail: 'Please enter a valid email',
        passwordRequired: 'Password must be at least 6 characters',
        demoCredentials: 'Demo: bugbie@demo.com / password'
      },
      stats: {
        totalRevenue: 'Total Revenue',
        totalOrders: 'Total Orders',
        activeUsers: 'Active Users',
        conversionRate: 'Conversion Rate',
        vsLastMonth: 'vs last month'
      },
      dashboard: {
        revenueOverview: 'Revenue Overview',
        salesByCategory: 'Sales by Category',
        monthlyRevenue: 'Monthly revenue performance',
        categoryDistribution: 'Product category distribution',
        recentTransactions: 'Recent Transactions',
        latestFinancial: 'Latest financial activities',
        currentPlan: 'Current Plan',
        proAnalytics: 'Pro Analytics',
        teamMembers: 'Team Members',
        apiCalls: 'API Calls',
        upgradePlan: 'Upgrade Plan'
      },
      products: {
        allProducts: 'All Products',
        manageInventory: 'Manage your product inventory',
        addProduct: 'Add Product',
        productName: 'Product Name',
        sku: 'SKU',
        category: 'Category',
        price: 'Price',
        stock: 'Stock',
        status: 'Status',
        sales: 'Sales',
        actions: 'Actions',
        active: 'Active',
        lowStock: 'Low Stock',
        outOfStock: 'Out of Stock'
      },
      orders: {
        allOrders: 'All Orders',
        trackOrders: 'Track and manage customer orders',
        newOrder: 'New Order',
        orderId: 'Order ID',
        customer: 'Customer',
        product: 'Product',
        amount: 'Amount',
        payment: 'Payment',
        date: 'Date',
        completed: 'Completed',
        processing: 'Processing',
        pending: 'Pending',
        cancelled: 'Cancelled',
        paid: 'Paid',
        refunded: 'Refunded'
      },
      users: {
        allUsers: 'All Users',
        teamMembers: 'Manage your team members',
        addUser: 'Add User',
        fullName: 'Full Name',
        role: 'Role',
        roleAdmin: 'Admin',
        roleEditor: 'Editor',
        roleViewer: 'Viewer',
        statusActive: 'Active',
        statusInactive: 'Inactive',
        statusPending: 'Pending',
        totalSpent: 'Total Spent',
        lastActive: 'Last Active'
      },
      settings: {
        general: 'General Settings',
        security: 'Security Settings',
        notifications: 'Notification Preferences',
        billing: 'Billing & Plans',
        manageAccount: 'Manage your general account settings',
        securityPrefs: 'Manage your security preferences',
        notifPrefs: 'Control how you receive notifications',
        billingInfo: 'Manage your subscription',
        fullName: 'Full Name',
        email: 'Email Address',
        company: 'Company',
        timezone: 'Timezone',
        twoFactor: 'Two-Factor Authentication',
        twoFactorDesc: 'Add an extra layer of security',
        loginNotif: 'Login Notifications',
        loginNotifDesc: 'Get notified of new login attempts',
        sessionTimeout: 'Session Timeout',
        sessionTimeoutDesc: 'Auto logout after 30 min inactivity',
        emailNotif: 'Email Notifications',
        emailNotifDesc: 'Receive email updates',
        pushNotif: 'Push Notifications',
        pushNotifDesc: 'Receive push notifications',
        weeklyReports: 'Weekly Reports',
        weeklyReportsDesc: 'Get weekly activity summary',
        currentPlan: 'Current Plan',
        proPlan: 'Pro Analytics',
        renewsOn: 'Renewed on',
        upgradePlan: 'Upgrade Plan',
        paymentMethod: 'Payment Method',
        saveChanges: 'Save Changes'
      },
      header: {
        welcome: 'Welcome back, Bugbie!'
      }
    }
  },
  es: {
    translation: {
      nav: {
        overview: 'Resumen',
        analytics: 'Analíticas',
        products: 'Productos',
        orders: 'Pedidos',
        users: 'Usuarios',
        settings: 'Configuración'
      },
      common: {
        search: 'Buscar...',
        save: 'Guardar',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        edit: 'Editar',
        add: 'Agregar',
        export: 'Exportar',
        filter: 'Filtrar',
        loading: 'Cargando...',
        noData: 'No hay datos disponibles',
        confirmDelete: '¿Estás seguro de que quieres eliminar esto?',
        success: 'Éxito',
        error: 'Error',
        warning: 'Advertencia',
        info: 'Info'
      },
      login: {
        welcomeBack: 'Bienvenido de nuevo',
        enterCredentials: 'Ingresa tus credenciales para acceder',
        email: 'Correo electrónico',
        password: 'Contraseña',
        rememberMe: 'Recordarme',
        forgotPassword: '¿Olvidaste tu contraseña?',
        signIn: 'Iniciar sesión',
        signingIn: 'Iniciando sesión...',
        invalidEmail: 'Ingresa un correo válido',
        passwordRequired: 'La contraseña debe tener al menos 6 caracteres',
        demoCredentials: 'Demo: bugbie@demo.com / password'
      },
      stats: {
        totalRevenue: 'Ingresos totales',
        totalOrders: 'Pedidos totales',
        activeUsers: 'Usuarios activos',
        conversionRate: 'Tasa de conversión',
        vsLastMonth: 'vs mes anterior'
      },
      dashboard: {
        revenueOverview: 'Resumen de ingresos',
        salesByCategory: 'Ventas por categoría',
        monthlyRevenue: 'Rendimiento mensual',
        categoryDistribution: 'Distribución por categoría',
        recentTransactions: 'Transacciones recientes',
        latestFinancial: 'Últimas actividades financieras',
        currentPlan: 'Plan actual',
        proAnalytics: 'Analíticas Pro',
        teamMembers: 'Miembros del equipo',
        apiCalls: 'Llamadas API',
        upgradePlan: 'Mejorar plan'
      },
      products: {
        allProducts: 'Todos los productos',
        manageInventory: 'Administra tu inventario',
        addProduct: 'Agregar producto',
        productName: 'Nombre del producto',
        sku: 'SKU',
        category: 'Categoría',
        price: 'Precio',
        stock: 'Stock',
        status: 'Estado',
        sales: 'Ventas',
        actions: 'Acciones',
        active: 'Activo',
        lowStock: 'Stock bajo',
        outOfStock: 'Sin stock'
      },
      orders: {
        allOrders: 'Todos los pedidos',
        trackOrders: 'Gestiona los pedidos de clientes',
        newOrder: 'Nuevo pedido',
        orderId: 'ID del pedido',
        customer: 'Cliente',
        product: 'Producto',
        amount: 'Monto',
        payment: 'Pago',
        date: 'Fecha',
        completed: 'Completado',
        processing: 'Procesando',
        pending: 'Pendiente',
        cancelled: 'Cancelado',
        paid: 'Pagado',
        refunded: 'Reembolsado'
      },
      users: {
        allUsers: 'Todos los usuarios',
        teamMembers: 'Administra los miembros del equipo',
        addUser: 'Agregar usuario',
        fullName: 'Nombre completo',
        role: 'Rol',
        roleAdmin: 'Administrador',
        roleEditor: 'Editor',
        roleViewer: 'Visor',
        statusActive: 'Activo',
        statusInactive: 'Inactivo',
        statusPending: 'Pendiente',
        totalSpent: 'Total gastado',
        lastActive: 'Última actividad'
      },
      settings: {
        general: 'Configuración general',
        security: 'Configuración de seguridad',
        notifications: 'Preferencias de notificaciones',
        billing: 'Facturación y planes',
        manageAccount: 'Administra tu cuenta',
        securityPrefs: 'Administra tu seguridad',
        notifPrefs: 'Controla cómo recibes notificaciones',
        billingInfo: 'Administra tu suscripción',
        fullName: 'Nombre completo',
        email: 'Correo electrónico',
        company: 'Empresa',
        timezone: 'Zona horaria',
        twoFactor: 'Autenticación de dos factores',
        twoFactorDesc: 'Añade seguridad adicional',
        loginNotif: 'Notificaciones de inicio',
        loginNotifDesc: 'Recibe alertas de nuevos ingresos',
        sessionTimeout: 'Tiempo de sesión',
        sessionTimeoutDesc: 'Cerrar sesión después de 30 min',
        emailNotif: 'Notificaciones por correo',
        emailNotifDesc: 'Recibe actualizaciones por correo',
        pushNotif: 'Notificaciones push',
        pushNotifDesc: 'Recibe notificaciones push',
        weeklyReports: 'Reportes semanales',
        weeklyReportsDesc: 'Recibe resumen semanal',
        currentPlan: 'Plan actual',
        proPlan: 'Analíticas Pro',
        renewsOn: 'Se renueva el',
        upgradePlan: 'Mejorar plan',
        paymentMethod: 'Método de pago',
        saveChanges: 'Guardar cambios'
      },
      header: {
        welcome: '¡Bienvenido de nuevo, Bugbie!'
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
