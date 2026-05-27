import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('backdrop', [
      transition(':enter', [style({ opacity: 0 }), animate('200ms ease', style({ opacity: 1 }))]),
      transition(':leave', [animate('200ms ease', style({ opacity: 0 }))])
    ]),
    trigger('drawer', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms cubic-bezier(0.32, 0.72, 0, 1)', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('250ms cubic-bezier(0.32, 0.72, 0, 1)', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
  template: `
    <ng-container *ngIf="cart.isOpen()">
      <!-- Backdrop -->
      <div @backdrop (click)="cart.close()"
           class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"></div>

      <!-- Drawer panel -->
      <div @drawer
           class="fixed right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-[#0f0f0f] border-l border-white/5 z-[201] flex flex-col shadow-2xl">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div class="flex items-center gap-3">
            <iconify-icon icon="solar:cart-large-2-bold" width="22" class="text-[#C65A1E]"></iconify-icon>
            <h2 class="font-['Forum'] text-xl text-white tracking-tight">Your Cart</h2>
            <span class="text-xs font-medium text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full">
              {{ cart.count() }} {{ cart.count() === 1 ? 'item' : 'items' }}
            </span>
          </div>
          <button (click)="cart.close()" class="text-neutral-500 hover:text-white transition-colors p-1">
            <iconify-icon icon="solar:close-circle-linear" width="24"></iconify-icon>
          </button>
        </div>

        <!-- Empty state -->
        <div *ngIf="cart.isEmpty()" class="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div class="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-5">
            <iconify-icon icon="solar:cart-large-2-linear" width="28" class="text-neutral-500"></iconify-icon>
          </div>
          <p class="text-white font-['Forum'] text-xl mb-2">Your cart is empty</p>
          <p class="text-sm text-neutral-500 leading-relaxed">Add items from our menu to get started.</p>
          <button (click)="cart.close()" class="mt-6 px-6 py-2.5 text-sm text-white border border-white/15 rounded-xl hover:bg-white/5 transition-all">
            Browse Menu
          </button>
        </div>

        <!-- Items list -->
        <div *ngIf="!cart.isEmpty()" class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div *ngFor="let item of cart.items()"
               class="flex items-start gap-4 p-4 bg-[#111] rounded-xl border border-white/5">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white leading-tight truncate">{{ item.name }}</p>
              <p class="text-xs text-neutral-500 mt-0.5">{{ item.category }}</p>
              <p class="text-sm text-[#C65A1E] font-medium mt-1.5">£{{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
            <!-- Quantity controls -->
            <div class="flex items-center gap-2 shrink-0">
              <button (click)="cart.decrement(item.menuItemId)"
                      class="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
                <iconify-icon icon="solar:minus-square-linear" width="16"></iconify-icon>
              </button>
              <span class="text-sm text-white w-5 text-center font-medium">{{ item.quantity }}</span>
              <button (click)="cart.increment(item.menuItemId)"
                      class="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
                <iconify-icon icon="solar:add-square-linear" width="16"></iconify-icon>
              </button>
              <button (click)="cart.remove(item.menuItemId)"
                      class="w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-neutral-500 hover:text-red-400 transition-colors ml-1">
                <iconify-icon icon="solar:trash-bin-trash-linear" width="15"></iconify-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div *ngIf="!cart.isEmpty()" class="px-6 py-5 border-t border-white/5 space-y-3">
          <div class="flex items-center justify-between text-sm">
            <span class="text-neutral-400">Subtotal</span>
            <span class="text-white font-medium">{{ cart.formattedTotal() }}</span>
          </div>
          <div class="flex items-center justify-between text-xs text-neutral-600">
            <span>Delivery fee calculated at checkout</span>
          </div>
          <button (click)="goToCheckout()"
                  class="w-full py-3.5 text-sm font-medium text-[#0a0a0a] bg-white rounded-xl hover:bg-[#C65A1E] hover:text-white hover:shadow-[0_0_20px_rgba(198,90,30,0.35)] transition-all duration-300 flex items-center justify-center gap-2 mt-1">
            Proceed to Checkout
            <iconify-icon icon="solar:arrow-right-linear" width="16"></iconify-icon>
          </button>
        </div>

      </div>
    </ng-container>
  `
})
export class CartDrawerComponent {
  readonly cart = inject(CartService);
  private readonly router = inject(Router);

  goToCheckout(): void {
    this.cart.close();
    this.router.navigate(['/checkout']);
  }
}
