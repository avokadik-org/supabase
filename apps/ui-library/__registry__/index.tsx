
// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {
  "default": {
    
    "password-based-auth-nextjs": {
      name: "password-based-auth-nextjs",
      type: "registry:block",
      registryDependencies: ["button","card","input","label"],
      component: React.lazy(() => import("@/registry/default/blocks/password-based-auth-nextjs/app/login/page.tsx")),
      source: "",
      files: ["registry/default/blocks/password-based-auth-nextjs/app/login/page.tsx","registry/default/blocks/password-based-auth-nextjs/app/error/page.tsx","registry/default/blocks/password-based-auth-nextjs/app/protected/page.tsx","registry/default/blocks/password-based-auth-nextjs/app/confirm/route.ts","registry/default/blocks/password-based-auth-nextjs/components/login-form.tsx","registry/default/blocks/password-based-auth-nextjs/middleware.ts","registry/default/blocks/password-based-auth-nextjs/app/sign-up/page.tsx","registry/default/blocks/password-based-auth-nextjs/app/sign-up-success/page.tsx","registry/default/blocks/password-based-auth-nextjs/components/sign-up-form.tsx","registry/default/blocks/password-based-auth-nextjs/app/forgot-password/page.tsx","registry/default/blocks/password-based-auth-nextjs/app/update-password/page.tsx","registry/default/blocks/password-based-auth-nextjs/components/forgot-password-form.tsx","registry/default/blocks/password-based-auth-nextjs/components/update-password-form.tsx","registry/default/clients/nextjs/lib/supabase/client.ts","registry/default/clients/nextjs/lib/supabase/middleware.ts","registry/default/clients/nextjs/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "password-based-auth-react": {
      name: "password-based-auth-react",
      type: "registry:block",
      registryDependencies: ["button","card","input","label"],
      component: React.lazy(() => import("@/registry/default/blocks/password-based-auth-react/components/login-form.tsx")),
      source: "",
      files: ["registry/default/blocks/password-based-auth-react/components/login-form.tsx","registry/default/blocks/password-based-auth-react/components/sign-up-form.tsx","registry/default/blocks/password-based-auth-react/components/forgot-password-form.tsx","registry/default/blocks/password-based-auth-react/components/update-password-form.tsx","registry/default/clients/react/lib/supabase/client.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "password-based-auth-tanstack": {
      name: "password-based-auth-tanstack",
      type: "registry:block",
      registryDependencies: ["button","card","input","label"],
      component: React.lazy(() => import("@/registry/default/blocks/password-based-auth-tanstack/routes/login.tsx")),
      source: "",
      files: ["registry/default/blocks/password-based-auth-tanstack/routes/login.tsx","registry/default/blocks/password-based-auth-tanstack/routes/auth/error.tsx","registry/default/blocks/password-based-auth-tanstack/routes/_protected.tsx","registry/default/blocks/password-based-auth-tanstack/routes/_protected/info.tsx","registry/default/blocks/password-based-auth-tanstack/routes/auth/confirm.ts","registry/default/blocks/password-based-auth-tanstack/components/login-form.tsx","registry/default/blocks/password-based-auth-tanstack/routes/sign-up.tsx","registry/default/blocks/password-based-auth-tanstack/routes/sign-up-success.tsx","registry/default/blocks/password-based-auth-tanstack/components/sign-up-form.tsx","registry/default/blocks/password-based-auth-tanstack/routes/forgot-password.tsx","registry/default/blocks/password-based-auth-tanstack/routes/update-password.tsx","registry/default/blocks/password-based-auth-tanstack/components/forgot-password-form.tsx","registry/default/blocks/password-based-auth-tanstack/components/update-password-form.tsx","registry/default/blocks/password-based-auth-tanstack/lib/supabase/fetch-user-server-fn.ts","registry/default/clients/tanstack/lib/supabase/client.ts","registry/default/clients/tanstack/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "dropzone-nextjs": {
      name: "dropzone-nextjs",
      type: "registry:component",
      registryDependencies: ["button","tooltip","progress"],
      component: React.lazy(() => import("@/registry/default/blocks/dropzone/components/dropzone.tsx")),
      source: "",
      files: ["registry/default/blocks/dropzone/components/dropzone.tsx","registry/default/blocks/dropzone/hooks/use-supabase-upload.ts","registry/default/clients/nextjs/lib/supabase/client.ts","registry/default/clients/nextjs/lib/supabase/middleware.ts","registry/default/clients/nextjs/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "dropzone-react": {
      name: "dropzone-react",
      type: "registry:component",
      registryDependencies: ["button","tooltip","progress"],
      component: React.lazy(() => import("@/registry/default/blocks/dropzone/components/dropzone.tsx")),
      source: "",
      files: ["registry/default/blocks/dropzone/components/dropzone.tsx","registry/default/blocks/dropzone/hooks/use-supabase-upload.ts","registry/default/clients/react/lib/supabase/client.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "dropzone-react-router": {
      name: "dropzone-react-router",
      type: "registry:component",
      registryDependencies: ["button","tooltip","progress"],
      component: React.lazy(() => import("@/registry/default/blocks/dropzone/components/dropzone.tsx")),
      source: "",
      files: ["registry/default/blocks/dropzone/components/dropzone.tsx","registry/default/blocks/dropzone/hooks/use-supabase-upload.ts","registry/default/clients/react-router/lib/supabase.client.ts","registry/default/clients/react-router/lib/supabase.server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "dropzone-tanstack": {
      name: "dropzone-tanstack",
      type: "registry:component",
      registryDependencies: ["button","tooltip","progress"],
      component: React.lazy(() => import("@/registry/default/blocks/dropzone/components/dropzone.tsx")),
      source: "",
      files: ["registry/default/blocks/dropzone/components/dropzone.tsx","registry/default/blocks/dropzone/hooks/use-supabase-upload.ts","registry/default/clients/tanstack/lib/supabase/client.ts","registry/default/clients/tanstack/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "realtime-cursor-nextjs": {
      name: "realtime-cursor-nextjs",
      type: "registry:component",
      registryDependencies: [],
      component: React.lazy(() => import("@/registry/default/blocks/realtime-cursor/components/cursor.tsx")),
      source: "",
      files: ["registry/default/blocks/realtime-cursor/components/cursor.tsx","registry/default/blocks/realtime-cursor/components/realtime-cursors.tsx","registry/default/blocks/realtime-cursor/hooks/use-realtime-cursors.ts","registry/default/clients/nextjs/lib/supabase/client.ts","registry/default/clients/nextjs/lib/supabase/middleware.ts","registry/default/clients/nextjs/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "realtime-cursor-react": {
      name: "realtime-cursor-react",
      type: "registry:component",
      registryDependencies: [],
      component: React.lazy(() => import("@/registry/default/blocks/realtime-cursor/components/cursor.tsx")),
      source: "",
      files: ["registry/default/blocks/realtime-cursor/components/cursor.tsx","registry/default/blocks/realtime-cursor/components/realtime-cursors.tsx","registry/default/blocks/realtime-cursor/hooks/use-realtime-cursors.ts","registry/default/clients/react/lib/supabase/client.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "realtime-cursor-react-router": {
      name: "realtime-cursor-react-router",
      type: "registry:component",
      registryDependencies: [],
      component: React.lazy(() => import("@/registry/default/blocks/realtime-cursor/components/cursor.tsx")),
      source: "",
      files: ["registry/default/blocks/realtime-cursor/components/cursor.tsx","registry/default/blocks/realtime-cursor/components/realtime-cursors.tsx","registry/default/blocks/realtime-cursor/hooks/use-realtime-cursors.ts","registry/default/clients/react-router/lib/supabase.client.ts","registry/default/clients/react-router/lib/supabase.server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "realtime-cursor-tanstack": {
      name: "realtime-cursor-tanstack",
      type: "registry:component",
      registryDependencies: [],
      component: React.lazy(() => import("@/registry/default/blocks/realtime-cursor/components/cursor.tsx")),
      source: "",
      files: ["registry/default/blocks/realtime-cursor/components/cursor.tsx","registry/default/blocks/realtime-cursor/components/realtime-cursors.tsx","registry/default/blocks/realtime-cursor/hooks/use-realtime-cursors.ts","registry/default/clients/tanstack/lib/supabase/client.ts","registry/default/clients/tanstack/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "current-user-avatar-nextjs": {
      name: "current-user-avatar-nextjs",
      type: "registry:component",
      registryDependencies: ["avatar"],
      component: React.lazy(() => import("@/registry/default/blocks/current-user-avatar/components/current-user-avatar.tsx")),
      source: "",
      files: ["registry/default/blocks/current-user-avatar/components/current-user-avatar.tsx","registry/default/blocks/current-user-avatar/hooks/use-current-user-name.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-image.ts","registry/default/clients/nextjs/lib/supabase/client.ts","registry/default/clients/nextjs/lib/supabase/middleware.ts","registry/default/clients/nextjs/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "current-user-avatar-react": {
      name: "current-user-avatar-react",
      type: "registry:component",
      registryDependencies: ["avatar"],
      component: React.lazy(() => import("@/registry/default/blocks/current-user-avatar/components/current-user-avatar.tsx")),
      source: "",
      files: ["registry/default/blocks/current-user-avatar/components/current-user-avatar.tsx","registry/default/blocks/current-user-avatar/hooks/use-current-user-name.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-image.ts","registry/default/clients/react/lib/supabase/client.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "current-user-avatar-react-router": {
      name: "current-user-avatar-react-router",
      type: "registry:component",
      registryDependencies: ["avatar"],
      component: React.lazy(() => import("@/registry/default/blocks/current-user-avatar/components/current-user-avatar.tsx")),
      source: "",
      files: ["registry/default/blocks/current-user-avatar/components/current-user-avatar.tsx","registry/default/blocks/current-user-avatar/hooks/use-current-user-name.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-image.ts","registry/default/clients/react-router/lib/supabase.client.ts","registry/default/clients/react-router/lib/supabase.server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "current-user-avatar-tanstack": {
      name: "current-user-avatar-tanstack",
      type: "registry:component",
      registryDependencies: ["avatar"],
      component: React.lazy(() => import("@/registry/default/blocks/current-user-avatar/components/current-user-avatar.tsx")),
      source: "",
      files: ["registry/default/blocks/current-user-avatar/components/current-user-avatar.tsx","registry/default/blocks/current-user-avatar/hooks/use-current-user-name.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-image.ts","registry/default/clients/tanstack/lib/supabase/client.ts","registry/default/clients/tanstack/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "realtime-avatar-stack-nextjs": {
      name: "realtime-avatar-stack-nextjs",
      type: "registry:component",
      registryDependencies: ["avatar","tooltip"],
      component: React.lazy(() => import("@/registry/default/blocks/realtime-avatar-stack/components/avatar-stack.tsx")),
      source: "",
      files: ["registry/default/blocks/realtime-avatar-stack/components/avatar-stack.tsx","registry/default/blocks/realtime-avatar-stack/components/realtime-avatar-stack.tsx","registry/default/blocks/realtime-avatar-stack/hooks/use-realtime-presence-room.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-name.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-image.ts","registry/default/clients/nextjs/lib/supabase/client.ts","registry/default/clients/nextjs/lib/supabase/middleware.ts","registry/default/clients/nextjs/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "realtime-avatar-stack-react": {
      name: "realtime-avatar-stack-react",
      type: "registry:component",
      registryDependencies: ["avatar","tooltip"],
      component: React.lazy(() => import("@/registry/default/blocks/realtime-avatar-stack/components/avatar-stack.tsx")),
      source: "",
      files: ["registry/default/blocks/realtime-avatar-stack/components/avatar-stack.tsx","registry/default/blocks/realtime-avatar-stack/components/realtime-avatar-stack.tsx","registry/default/blocks/realtime-avatar-stack/hooks/use-realtime-presence-room.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-name.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-image.ts","registry/default/clients/react/lib/supabase/client.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "realtime-avatar-stack-react-router": {
      name: "realtime-avatar-stack-react-router",
      type: "registry:component",
      registryDependencies: ["avatar","tooltip"],
      component: React.lazy(() => import("@/registry/default/blocks/realtime-avatar-stack/components/avatar-stack.tsx")),
      source: "",
      files: ["registry/default/blocks/realtime-avatar-stack/components/avatar-stack.tsx","registry/default/blocks/realtime-avatar-stack/components/realtime-avatar-stack.tsx","registry/default/blocks/realtime-avatar-stack/hooks/use-realtime-presence-room.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-name.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-image.ts","registry/default/clients/react-router/lib/supabase.client.ts","registry/default/clients/react-router/lib/supabase.server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "realtime-avatar-stack-tanstack": {
      name: "realtime-avatar-stack-tanstack",
      type: "registry:component",
      registryDependencies: ["avatar","tooltip"],
      component: React.lazy(() => import("@/registry/default/blocks/realtime-avatar-stack/components/avatar-stack.tsx")),
      source: "",
      files: ["registry/default/blocks/realtime-avatar-stack/components/avatar-stack.tsx","registry/default/blocks/realtime-avatar-stack/components/realtime-avatar-stack.tsx","registry/default/blocks/realtime-avatar-stack/hooks/use-realtime-presence-room.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-name.ts","registry/default/blocks/current-user-avatar/hooks/use-current-user-image.ts","registry/default/clients/tanstack/lib/supabase/client.ts","registry/default/clients/tanstack/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "supabase-client-nextjs": {
      name: "supabase-client-nextjs",
      type: "registry:lib",
      registryDependencies: [],
      
      source: "",
      files: ["registry/default/clients/nextjs/lib/supabase/client.ts","registry/default/clients/nextjs/lib/supabase/middleware.ts","registry/default/clients/nextjs/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "supabase-client-react": {
      name: "supabase-client-react",
      type: "registry:lib",
      registryDependencies: [],
      
      source: "",
      files: ["registry/default/clients/react/lib/supabase/client.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "supabase-client-react-router": {
      name: "supabase-client-react-router",
      type: "registry:lib",
      registryDependencies: [],
      
      source: "",
      files: ["registry/default/clients/react-router/lib/supabase.client.ts","registry/default/clients/react-router/lib/supabase.server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "supabase-client-tanstack": {
      name: "supabase-client-tanstack",
      type: "registry:lib",
      registryDependencies: [],
      
      source: "",
      files: ["registry/default/clients/tanstack/lib/supabase/client.ts","registry/default/clients/tanstack/lib/supabase/server.ts"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "ai-editor-rules": {
      name: "ai-editor-rules",
      type: "registry:file",
      registryDependencies: [],
      
      source: "",
      files: ["registry/default/ai-editor-rules/create-db-functions.md","registry/default/ai-editor-rules/create-migration.md","registry/default/ai-editor-rules/create-rls-policies.md","registry/default/ai-editor-rules/postgres-sql-style-guide.md","registry/default/ai-editor-rules/writing-supabase-edge-functions.md"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "dropzone-demo": {
      name: "dropzone-demo",
      type: "registry:example",
      registryDependencies: [],
      component: React.lazy(() => import("@/registry/default/examples/dropzone-demo.tsx")),
      source: "",
      files: ["registry/default/examples/dropzone-demo.tsx"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    ,
    "realtime-cursor-demo": {
      name: "realtime-cursor-demo",
      type: "registry:example",
      registryDependencies: [],
      component: React.lazy(() => import("@/registry/default/examples/realtime-cursor-demo.tsx")),
      source: "",
      files: ["registry/default/examples/realtime-cursor-demo.tsx"],
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
    
  },
}
