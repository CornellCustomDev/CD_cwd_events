<?php

namespace Drupal\cwd_events\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides an Events Block containing Localist Data.
 *
 * @Block(
 *   id = "cwd_events_block",
 *   admin_label = @Translation("Events block"),
 *   category = @Translation("Events Block"),
 * )
 */
class EventsBlock extends BlockBase implements BlockPluginInterface {

  /**
   * List of supported format options.
   *
   * @var array
   */
  private $formatOptions = [
    'standard' => 'standard',
    'compact' => 'compact',
    'inline_compact' => 'inline_compact',
    'modern_compact' => 'modern_compact',
    'modern_standard' => 'modern_standard',
    'archive' => 'archive',
  ];

  /**
   * List of supported filter options.
   *
   * @var array
   */
  private $filterOptions = [
    'group' => 'group',
    'dept' => 'dept',
    'type' => 'type',
  ];

  /**
   * {@inheritdoc}
   */
  public function build() {
    $uuid = \Drupal::service('uuid');
    $id = $uuid->generate();
    $teaser = $this->configuration['cwd_events_readmore']
      ? '<a class="cwd_events_readmore" href='
          . $this->configuration['cwd_events_url'] . '>'
          . $this->t('@readmore', ["@readmore" => $this->configuration['cwd_events_readmore']]) .
        '</a>'
      : '';
    $class = ($this->configuration['cwd_events_styling'] == 1) ? 'cwd-events-style' : '';
    return [
      '#attached' => ['library' => ["cwd_events/cwdeventslib"]],
      '#markup' => $teaser . "<div
                id = 'events-listing-" . $id . "'
                class = 'events-listing " . $class . "'
                data-target = 'events-listing-" . $id . "'
                data-depts = '" . $this->configuration['cwd_events_depts'] . "'
                data-entries = '" . $this->configuration['cwd_events_entries'] . "'
                data-format = '" . $this->configuration['cwd_events_format'] . "'
                data-group = '" . $this->configuration['cwd_events_group'] . "'
                data-keyword = '" . $this->configuration['cwd_events_keyword'] . "'
                data-addcal = '" . $this->configuration['cwd_events_addcal'] . "'
                data-calendarurl = '" . $this->configuration['cwd_events_calendarurl'] . "'
                data-apikey = '" . $this->configuration['cwd_events_apikey'] . "'
                data-pagination = '" . $this->configuration['cwd_events_pagination'] . "'
                data-filterby = '" . $this->configuration['cwd_events_filterby'] . "'
                data-heading = ''
              ></div>",
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $config = $this->getConfiguration();
    $formatOptions = $this->formatOptions;
    $filterOptions = $this->filterOptions;

    $form['cwd_events_localist_config'] = [
      '#type' => 'fieldset',
      '#title' => $this
        ->t('Localist Config'),
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
    ];

    $form['cwd_events_localist_config']['cwd_events_calendarurl'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Calendar url'),
      '#description' => $this->t('The localist calendar url.'),
      '#default_value' => isset($config['cwd_events_calendarurl']) ? $config['cwd_events_calendarurl'] : '//events.cornell.edu/api/2.1/events',
    ];

    $form['cwd_events_localist_config']['cwd_events_apikey'] = [
      '#type' => 'textfield',
      '#title' => $this->t('API key'),
      '#description' => $this->t('The localist API Key.'),
      '#default_value' => isset($config['cwd_events_apikey']) ? $config['cwd_events_apikey'] : 'KLhy2GtuSAGirYGY',
    ];

    $form['cwd_events_localist_config']['cwd_events_depts'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Departments'),
      '#description' => $this->t('The department to include by ID. A comma seperated list of groups can be used.'),
      '#default_value' => isset($config['cwd_events_depts']) ? $config['cwd_events_depts'] : 0,
    ];

    $form['cwd_events_localist_config']['cwd_events_entries'] = [
      '#type' => 'number',
      '#title' => $this->t('Entries'),
      '#description' => $this->t('Max number of entries to display, up to 100'),
      '#default_value' => isset($config['cwd_events_entries']) ? $config['cwd_events_entries'] : 3,
    ];

    $form['cwd_events_localist_config']['cwd_events_group'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Group'),
      '#description' => $this->t('Localist filter option'),
      '#default_value' => isset($config['cwd_events_group']) ? $config['cwd_events_group'] : 0,
    ];

    $form['cwd_events_localist_config']['cwd_events_keyword'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Keyword'),
      '#description' => $this->t('Display events with a specific tag or keyword (can be used alone or in combination with "depts" and "group")'),
      '#default_value' => isset($config['cwd_events_keyword']) ? $config['cwd_events_keyword'] : FALSE,
    ];

    $form['cwd_events_display_config'] = [
      '#type' => 'fieldset',
      '#title' => $this
        ->t('View Config'),
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
    ];

    $form['cwd_events_display_config']['cwd_events_readmore'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Read More Title'),
      '#description' => $this->t('Read More Title to be used with readmore url to link to the events page. Leave blank to remove from display.'),
      '#default_value' => isset($config['cwd_events_readmore']) ? $config['cwd_events_readmore'] : 'Read More',
    ];

    $form['cwd_events_display_config']['cwd_events_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Read More URL'),
      '#description' => $this->t('The Read More URL, provides href to main events page used in read more title.'),
      '#default_value' => isset($config['cwd_events_url']) ? $config['cwd_events_url'] : '/events',
    ];

    $form['cwd_events_display_config']['cwd_events_format'] = [
      '#type' => 'select',
      '#title' => $this->t('Format'),
      '#description' => $this->t('Choices are: standard (default), compact (omit thumbnail, type and end time), archive (past events in reverse order), calendar (date on left)'),
      '#options' => $formatOptions,
      '#default_value' => isset($config['cwd_events_format']) ? $config['cwd_events_format'] : 'standard',
    ];

    $form['cwd_events_display_config']['cwd_events_filterby'] = [
      '#type' => 'select',
      '#title' => $this->t('Filter By'),
      '#description' => $this->t('If the view supports filters, they can be configured to filterby: group (default), dept(department), and type'),
      '#options' => $filterOptions,
      '#default_value' => isset($config['cwd_events_filterby']) ? $config['cwd_events_filterby'] : 'group',
    ];

    $form['cwd_events_display_config']['cwd_events_addcal'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Add Calendar link'),
      '#description' => $this->t('Check this box to display linkts to add calendar .'),
      '#return_value' => 'true',
      '#default_value' => isset($config['cwd_events_addcal']) ? $config['cwd_events_addcal'] : 'false',
    ];

    $form['cwd_events_display_config']['cwd_events_pagination'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Pagination'),
      '#description' => $this->t('Use paging for long lists.'),
      '#return_value' => 'true',
      '#default_value' => isset($config['cwd_events_pagination']) ? $config['cwd_events_pagination'] : 'false',
    ];

    $form['cwd_events_display_config']['cwd_events_styling'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Styling'),
      '#description' => $this->t('Uncheck this box to remove all module styling.'),
      '#return_value' => 1,
      '#default_value' => isset($config['cwd_events_styling']) ? $config['cwd_events_styling'] : 1,
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    $values = $form_state->getValues();
    $formatOptions = $this->formatOptions;
    $this->configuration['cwd_events_calendarurl'] = $values['cwd_events_localist_config']['cwd_events_calendarurl'];
    $this->configuration['cwd_events_apikey'] = $values['cwd_events_localist_config']['cwd_events_apikey'];
    $this->configuration['cwd_events_depts'] = $values['cwd_events_localist_config']['cwd_events_depts'];
    $this->configuration['cwd_events_entries'] = $values['cwd_events_localist_config']['cwd_events_entries'];
    $this->configuration['cwd_events_group'] = $values['cwd_events_localist_config']['cwd_events_group'];
    $this->configuration['cwd_events_keyword'] = $values['cwd_events_localist_config']['cwd_events_keyword'];

    $this->configuration['cwd_events_readmore'] = $values['cwd_events_display_config']['cwd_events_readmore'];
    $this->configuration['cwd_events_url'] = $values['cwd_events_display_config']['cwd_events_url'];
    $this->configuration['cwd_events_format'] = $formatOptions[$values['cwd_events_display_config']['cwd_events_format']];
    $this->configuration['cwd_events_filterby'] = $values['cwd_events_display_config']['cwd_events_filterby'];
    $this->configuration['cwd_events_addcal'] = $values['cwd_events_display_config']['cwd_events_addcal'];
    $this->configuration['cwd_events_pagination'] = $values['cwd_events_display_config']['cwd_events_pagination'];
    $this->configuration['cwd_events_styling'] = $values['cwd_events_display_config']['cwd_events_styling'];

  }

}
